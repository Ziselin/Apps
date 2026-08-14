const fs = require("fs");
const path = require("path");

const workspaceRoot = path.resolve(__dirname, "..", "..", "..");
const baseDir = path.join(workspaceRoot, "assets", "geojson", "natural-earth", "10m");
const landPath = path.join(baseDir, "ne_10m_land.geojson");
const admin1Path = path.join(baseDir, "ne_10m_admin_1_states_provinces.geojson");
const outputGeojsonPath = path.join(baseDir, "ne_10m_admin_1_states_provinces.coast-aligned.geojson");
const outputBoundariesPath = path.join(baseDir, "ne_10m_admin_1_states_provinces.coastless.boundaries.js");
const reportPath = path.join(baseDir, "ne_10m_admin_1_states_provinces.coast-aligned.report.json");

const GRID_SIZE_DEGREES = 0.5;
const SNAP_DISTANCE_DEGREES = 0.01;
const MIN_DIRECTION_ALIGNMENT = 0.9;
const COORDINATE_PRECISION = 6;
const DUPLICATE_EPSILON = 1e-7;
const BOUNDARY_SIMPLIFICATION_TOLERANCE = 0.01;

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data)}\n`, "utf8");
}

function writeBoundaryScript(filePath, data) {
  fs.writeFileSync(
    filePath,
    [
      "window.EarthMapNaturalEarthAdmin1Boundaries10m =",
      JSON.stringify(data),
      ";",
      "",
    ].join("\n"),
    "utf8",
  );
}

function extractPolygons(feature) {
  const geometry = feature?.geometry || {};
  if (geometry.type === "Polygon") return [geometry.coordinates || []];
  if (geometry.type === "MultiPolygon") return geometry.coordinates || [];
  return [];
}

function closeRing(ring) {
  if (!ring.length) return ring;
  const first = ring[0];
  const last = ring[ring.length - 1];
  if (Math.abs(first[0] - last[0]) <= DUPLICATE_EPSILON && Math.abs(first[1] - last[1]) <= DUPLICATE_EPSILON) {
    return ring;
  }
  return [...ring, [...first]];
}

function cleanRing(rawRing) {
  const cleaned = [];
  for (const point of rawRing || []) {
    const lon = Number(point?.[0]);
    const lat = Number(point?.[1]);
    if (!Number.isFinite(lon) || !Number.isFinite(lat)) continue;
    const rounded = [
      Number(lon.toFixed(COORDINATE_PRECISION)),
      Number(lat.toFixed(COORDINATE_PRECISION)),
    ];
    const previous = cleaned[cleaned.length - 1];
    if (previous && Math.abs(previous[0] - rounded[0]) <= DUPLICATE_EPSILON && Math.abs(previous[1] - rounded[1]) <= DUPLICATE_EPSILON) {
      continue;
    }
    cleaned.push(rounded);
  }
  return closeRing(cleaned);
}

function getCellIndex(value) {
  return Math.floor(value / GRID_SIZE_DEGREES);
}

function getCellKey(lonIndex, latIndex) {
  return `${lonIndex}:${latIndex}`;
}

function forEachCoveredCell(minLon, minLat, maxLon, maxLat, callback) {
  for (let lonIndex = getCellIndex(minLon); lonIndex <= getCellIndex(maxLon); lonIndex += 1) {
    for (let latIndex = getCellIndex(minLat); latIndex <= getCellIndex(maxLat); latIndex += 1) {
      callback(getCellKey(lonIndex, latIndex));
    }
  }
}

function addSegmentToIndex(index, segment) {
  const minLon = Math.min(segment.a[0], segment.b[0]) - SNAP_DISTANCE_DEGREES;
  const maxLon = Math.max(segment.a[0], segment.b[0]) + SNAP_DISTANCE_DEGREES;
  const minLat = Math.min(segment.a[1], segment.b[1]) - SNAP_DISTANCE_DEGREES;
  const maxLat = Math.max(segment.a[1], segment.b[1]) + SNAP_DISTANCE_DEGREES;
  forEachCoveredCell(minLon, minLat, maxLon, maxLat, (key) => {
    const bucket = index.get(key) || [];
    bucket.push(segment);
    index.set(key, bucket);
  });
}

function buildCoastlineSegmentIndex(land) {
  const index = new Map();
  let segmentCount = 0;
  for (const feature of land.features || []) {
    for (const polygon of extractPolygons(feature)) {
      for (const ring of polygon || []) {
        const clean = cleanRing(ring);
        for (let indexInRing = 1; indexInRing < clean.length; indexInRing += 1) {
          const a = clean[indexInRing - 1];
          const b = clean[indexInRing];
          if (Math.abs(a[0] - b[0]) > 180) continue;
          addSegmentToIndex(index, { a, b });
          segmentCount += 1;
        }
      }
    }
  }
  return { index, segmentCount };
}

function getCandidateSegments(index, point) {
  const lonIndex = getCellIndex(point[0]);
  const latIndex = getCellIndex(point[1]);
  const candidates = [];
  for (let dx = -1; dx <= 1; dx += 1) {
    for (let dy = -1; dy <= 1; dy += 1) {
      const bucket = index.get(getCellKey(lonIndex + dx, latIndex + dy));
      if (bucket) candidates.push(...bucket);
    }
  }
  return candidates;
}

function getProjectedPointOnSegment(point, segment) {
  const latScale = Math.max(0.15, Math.cos((((point[1] + segment.a[1] + segment.b[1]) / 3) * Math.PI) / 180));
  const x = point[0] * latScale;
  const y = point[1];
  const x1 = segment.a[0] * latScale;
  const y1 = segment.a[1];
  const x2 = segment.b[0] * latScale;
  const y2 = segment.b[1];
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lengthSquared = (dx * dx) + (dy * dy);
  const t = lengthSquared === 0 ? 0 : Math.max(0, Math.min(1, (((x - x1) * dx) + ((y - y1) * dy)) / lengthSquared));
  const projected = [
    segment.a[0] + ((segment.b[0] - segment.a[0]) * t),
    segment.a[1] + ((segment.b[1] - segment.a[1]) * t),
  ];
  const distance = Math.sqrt(((x - (projected[0] * latScale)) ** 2) + ((y - projected[1]) ** 2));
  return { projected, distance, segment };
}

function getDirection(a, b) {
  if (!a || !b) return null;
  const dx = Number(b[0]) - Number(a[0]);
  const dy = Number(b[1]) - Number(a[1]);
  if (!Number.isFinite(dx) || !Number.isFinite(dy) || (dx === 0 && dy === 0)) return null;
  const length = Math.sqrt((dx * dx) + (dy * dy));
  return [dx / length, dy / length];
}

function getPointDirections(ring, index) {
  const previous = index > 0 ? ring[index - 1] : ring[ring.length - 2];
  const current = ring[index];
  const next = index < ring.length - 1 ? ring[index + 1] : ring[1];
  return [getDirection(previous, current), getDirection(current, next)].filter(Boolean);
}

function hasCompatibleDirection(segment, directions) {
  if (!directions.length) return false;
  const coastDirection = getDirection(segment.a, segment.b);
  if (!coastDirection) return false;
  return directions.some((direction) => {
    const dot = Math.abs((direction[0] * coastDirection[0]) + (direction[1] * coastDirection[1]));
    return dot >= MIN_DIRECTION_ALIGNMENT;
  });
}

function findNearestCoastPoint(segmentIndex, point, directions) {
  let best = null;
  for (const segment of getCandidateSegments(segmentIndex, point)) {
    if (!hasCompatibleDirection(segment, directions)) continue;
    const projection = getProjectedPointOnSegment(point, segment);
    if (!best || projection.distance < best.distance) best = projection;
  }
  if (!best || best.distance > SNAP_DISTANCE_DEGREES) return null;
  return best;
}

function isPointNearCompatibleCoast(segmentIndex, point, directions, maxDistance = SNAP_DISTANCE_DEGREES) {
  const nearest = findNearestCoastPoint(segmentIndex, point, directions);
  return Boolean(nearest && nearest.distance <= maxDistance);
}

function isBoundarySegmentCoastal(segmentIndex, start, end) {
  const direction = getDirection(start, end);
  if (!direction) return false;
  const midpoint = [
    (Number(start[0]) + Number(end[0])) / 2,
    (Number(start[1]) + Number(end[1])) / 2,
  ];
  const directions = [direction];
  // Anzeige-Regel: Admin-1-Grenzen zeigen Verwaltungslinien, nicht Küsten.
  // Küstenabschnitte werden in EarthMap ausschließlich von der physischen
  // Grundkarte gezeichnet. Start, Mitte und Ende müssen nahe an einer
  // kompatiblen Küste liegen, damit Binnen- oder Quergrenzen nicht versehentlich
  // verschwinden.
  return isPointNearCompatibleCoast(segmentIndex, start, directions)
    && isPointNearCompatibleCoast(segmentIndex, midpoint, directions)
    && isPointNearCompatibleCoast(segmentIndex, end, directions);
}

function alignRingToCoastline(rawRing, segmentIndex, stats) {
  const aligned = [];
  const sourceRing = cleanRing(rawRing);
  for (let index = 0; index < sourceRing.length; index += 1) {
    const rawPoint = sourceRing[index];
    const point = [Number(rawPoint?.[0]), Number(rawPoint?.[1])];
    if (!Number.isFinite(point[0]) || !Number.isFinite(point[1])) continue;
    stats.points += 1;
    const directions = getPointDirections(sourceRing, index);
    const nearest = findNearestCoastPoint(segmentIndex, point, directions);
    const nextPoint = nearest
      ? [
        Number(nearest.projected[0].toFixed(COORDINATE_PRECISION)),
        Number(nearest.projected[1].toFixed(COORDINATE_PRECISION)),
      ]
      : [
        Number(point[0].toFixed(COORDINATE_PRECISION)),
        Number(point[1].toFixed(COORDINATE_PRECISION)),
      ];
    if (nearest) {
      stats.snapped += 1;
      stats.maxSnapDistance = Math.max(stats.maxSnapDistance, nearest.distance);
    }
    const previous = aligned[aligned.length - 1];
    if (previous && Math.abs(previous[0] - nextPoint[0]) <= DUPLICATE_EPSILON && Math.abs(previous[1] - nextPoint[1]) <= DUPLICATE_EPSILON) {
      stats.droppedDuplicatePoints += 1;
      continue;
    }
    aligned.push(nextPoint);
  }
  const closed = closeRing(aligned);
  return closed.length >= 4 ? closed : cleanRing(rawRing);
}

function alignGeometryToCoastline(geometry, segmentIndex, stats) {
  if (!geometry) return geometry;
  if (geometry.type === "Polygon") {
    return {
      ...geometry,
      coordinates: (geometry.coordinates || []).map((ring) => alignRingToCoastline(ring, segmentIndex, stats)),
    };
  }
  if (geometry.type === "MultiPolygon") {
    return {
      ...geometry,
      coordinates: (geometry.coordinates || []).map((polygon) => (
        (polygon || []).map((ring) => alignRingToCoastline(ring, segmentIndex, stats))
      )),
    };
  }
  return geometry;
}

function getSquaredDistance(point, start, end) {
  const x = point[0];
  const y = point[1];
  const x1 = start[0];
  const y1 = start[1];
  const x2 = end[0];
  const y2 = end[1];
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0 && dy === 0) return ((x - x1) ** 2) + ((y - y1) ** 2);
  const t = Math.max(0, Math.min(1, (((x - x1) * dx) + ((y - y1) * dy)) / ((dx * dx) + (dy * dy))));
  const px = x1 + (t * dx);
  const py = y1 + (t * dy);
  return ((x - px) ** 2) + ((y - py) ** 2);
}

function simplifyOpenLine(rawLine, tolerance) {
  const line = (rawLine || []).filter((point) => Array.isArray(point) && point.length >= 2);
  if (line.length <= 3) return line;
  const keep = new Array(line.length).fill(false);
  keep[0] = true;
  keep[line.length - 1] = true;
  const stack = [[0, line.length - 1]];
  const toleranceSquared = tolerance * tolerance;
  while (stack.length) {
    const [start, end] = stack.pop();
    let maxDistance = 0;
    let split = -1;
    for (let index = start + 1; index < end; index += 1) {
      const distance = getSquaredDistance(line[index], line[start], line[end]);
      if (distance > maxDistance) {
        maxDistance = distance;
        split = index;
      }
    }
    if (split !== -1 && maxDistance > toleranceSquared) {
      keep[split] = true;
      if (split - start > 1) stack.push([start, split]);
      if (end - split > 1) stack.push([split, end]);
    }
  }
  return line.filter((_, index) => keep[index]);
}

function createCoastlessBoundaryLinesFromRing(rawRing, segmentIndex, stats) {
  const ring = cleanRing(rawRing);
  const lines = [];
  let current = [];
  const flush = () => {
    if (current.length >= 2) {
      const simplified = simplifyOpenLine(current, BOUNDARY_SIMPLIFICATION_TOLERANCE);
      if (simplified.length >= 2) lines.push(simplified);
    }
    current = [];
  };
  for (let index = 1; index < ring.length; index += 1) {
    const start = ring[index - 1];
    const end = ring[index];
    stats.boundarySegments += 1;
    if (isBoundarySegmentCoastal(segmentIndex, start, end)) {
      stats.omittedCoastalBoundarySegments += 1;
      flush();
      continue;
    }
    if (!current.length) current.push(start);
    current.push(end);
  }
  flush();
  stats.boundaryLines += lines.length;
  return lines;
}

function createBoundaryLinesFromGeometry(geometry, segmentIndex, stats) {
  if (!geometry) return [];
  const lines = [];
  if (geometry.type === "Polygon") {
    (geometry.coordinates || []).forEach((ring) => {
      lines.push(...createCoastlessBoundaryLinesFromRing(ring, segmentIndex, stats));
    });
  }
  if (geometry.type === "MultiPolygon") {
    (geometry.coordinates || []).forEach((polygon) => {
      (polygon || []).forEach((ring) => {
        lines.push(...createCoastlessBoundaryLinesFromRing(ring, segmentIndex, stats));
      });
    });
  }
  return lines;
}

function getSegmentKey(a, b) {
  const format = (point) => `${Number(point[0]).toFixed(5)},${Number(point[1]).toFixed(5)}`;
  const first = format(a);
  const second = format(b);
  return first < second ? `${first}|${second}` : `${second}|${first}`;
}

function getAdminKey(properties) {
  return String(properties?.adm0_a3 || properties?.admin || "").trim() || "unknown";
}

function addSharedBoundaryCandidate(registry, feature, start, end, stats) {
  const properties = feature.properties || {};
  const key = getSegmentKey(start, end);
  const entry = registry.get(key) || {
    start,
    end,
    refs: [],
  };
  entry.refs.push({
    adminKey: getAdminKey(properties),
    name: properties.name || "",
    admin: properties.admin || "",
  });
  registry.set(key, entry);
  stats.boundarySegments += 1;
}

function collectSharedBoundaryCandidatesFromRing(registry, feature, rawRing, stats) {
  const ring = cleanRing(rawRing);
  for (let index = 1; index < ring.length; index += 1) {
    addSharedBoundaryCandidate(registry, feature, ring[index - 1], ring[index], stats);
  }
}

function collectSharedBoundaryCandidates(registry, feature, stats) {
  const geometry = feature.geometry;
  if (!geometry) return;
  if (geometry.type === "Polygon") {
    (geometry.coordinates || []).forEach((ring) => collectSharedBoundaryCandidatesFromRing(registry, feature, ring, stats));
  }
  if (geometry.type === "MultiPolygon") {
    (geometry.coordinates || []).forEach((polygon) => {
      (polygon || []).forEach((ring) => collectSharedBoundaryCandidatesFromRing(registry, feature, ring, stats));
    });
  }
}

function createSharedAdmin1BoundaryCollection(features, stats) {
  const registry = new Map();
  features.forEach((feature) => collectSharedBoundaryCandidates(registry, feature, stats));
  const linesByAdmin = new Map();
  registry.forEach((entry) => {
    const refsByAdmin = new Map();
    entry.refs.forEach((ref) => {
      const refs = refsByAdmin.get(ref.adminKey) || [];
      refs.push(ref);
      refsByAdmin.set(ref.adminKey, refs);
    });
    let kept = false;
    refsByAdmin.forEach((refs, adminKey) => {
      const uniqueNames = new Set(refs.map((ref) => ref.name).filter(Boolean));
      // Admin-1-Standardlayer: Wir zeigen nur Binnenverwaltungsgrenzen. Eine
      // Linie muss daher von zwei unterschiedlichen Admin-1-Objekten desselben
      // Staates geteilt werden. Küsten, Staatsgrenzen und singuläre Außenränder
      // fallen dadurch automatisch heraus.
      if (refs.length < 2 || uniqueNames.size < 2) return;
      const lines = linesByAdmin.get(adminKey) || [];
      lines.push([entry.start, entry.end]);
      linesByAdmin.set(adminKey, lines);
      kept = true;
    });
    if (kept) stats.sharedInternalBoundarySegments += 1;
    else stats.omittedExternalBoundarySegments += 1;
  });
  stats.boundaryLines = Array.from(linesByAdmin.values()).reduce((sum, lines) => sum + lines.length, 0);
  return {
    type: "FeatureCollection",
    name: "ne_10m_admin_1_states_provinces_internal_boundaries",
    features: Array.from(linesByAdmin.entries()).map(([adminKey, lines]) => ({
      type: "Feature",
      properties: {
        adm0_a3: adminKey,
        _ziselinBoundaryRole: "admin-1-internal-only",
      },
      geometry: {
        type: "MultiLineString",
        coordinates: lines,
      },
    })),
  };
}

function buildCoastAlignedAdmin1() {
  const land = readJson(landPath);
  const admin1 = readJson(admin1Path);
  const { index: segmentIndex, segmentCount } = buildCoastlineSegmentIndex(land);
  const stats = {
    strategy: "authoritative-land-coastline-snap",
    sourceLand: path.relative(workspaceRoot, landPath).replace(/\\/g, "/"),
    sourceAdmin1: path.relative(workspaceRoot, admin1Path).replace(/\\/g, "/"),
    outputGeojson: path.relative(workspaceRoot, outputGeojsonPath).replace(/\\/g, "/"),
    outputBoundaries: path.relative(workspaceRoot, outputBoundariesPath).replace(/\\/g, "/"),
    coastlineSegments: segmentCount,
    snapDistanceDegrees: SNAP_DISTANCE_DEGREES,
    minimumDirectionAlignment: MIN_DIRECTION_ALIGNMENT,
    boundarySimplificationToleranceDegrees: BOUNDARY_SIMPLIFICATION_TOLERANCE,
    points: 0,
    snapped: 0,
    droppedDuplicatePoints: 0,
    maxSnapDistance: 0,
    boundarySegments: 0,
    omittedCoastalBoundarySegments: 0,
    omittedExternalBoundarySegments: 0,
    sharedInternalBoundarySegments: 0,
    boundaryLines: 0,
  };
  const aligned = {
    ...admin1,
    name: "ne_10m_admin_1_states_provinces_coast_aligned",
    features: (admin1.features || []).map((feature) => ({
      ...feature,
      properties: {
        ...(feature.properties || {}),
        _ziselinTopology: "coast-aligned-to-ne_10m_land",
      },
      geometry: alignGeometryToCoastline(feature.geometry, segmentIndex, stats),
    })),
  };
  const boundaries = createSharedAdmin1BoundaryCollection(aligned.features, stats);
  boundaries.simplification_tolerance_degrees = BOUNDARY_SIMPLIFICATION_TOLERANCE;
  stats.snappedRatio = stats.points ? Number((stats.snapped / stats.points).toFixed(6)) : 0;
  stats.sharedInternalBoundarySegmentRatio = stats.boundarySegments
    ? Number((stats.sharedInternalBoundarySegments / stats.boundarySegments).toFixed(6))
    : 0;
  stats.maxSnapDistance = Number(stats.maxSnapDistance.toFixed(6));
  writeJson(outputGeojsonPath, aligned);
  writeBoundaryScript(outputBoundariesPath, boundaries);
  writeJson(reportPath, stats);
  return stats;
}

const stats = buildCoastAlignedAdmin1();
console.log(JSON.stringify(stats, null, 2));
