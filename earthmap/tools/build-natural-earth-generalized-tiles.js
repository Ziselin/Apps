const fs = require("fs");
const path = require("path");

const workspaceRoot = path.resolve(__dirname, "..", "..");
const sourcePath = path.join(workspaceRoot, "assets", "geojson", "natural-earth", "10m", "ne_10m_land.geojson");
const outputDir = path.join(workspaceRoot, "assets", "geojson", "natural-earth", "10m", "tiles-generalized");

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function expLerp(start, end, t) {
  return start * ((end / start) ** t);
}

function round(value, digits = 4) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

// Budgetregel: EarthMap erzeugt bewusst 17 fein abgestufte Ableitungen aus der
// Natural-Earth-10m-Mastergeometrie. Dadurch werden Details beim Zoomen nicht
// in groben Sprüngen nachgeladen, sondern fast kontinuierlich dichter.
const levels = Array.from({ length: 17 }, (_, index) => {
  const t = index / 16;
  const minZoom = index === 0 ? 1 : 1 + index * (16 / 17);
  const maxZoom = index === 16 ? 24 : 1 + (index + 1) * (16 / 17);
  return {
    id: `z${index + 1}`,
    minZoom: round(minZoom, 3),
    maxZoom: round(maxZoom, 3),
    tileStep: index < 4 ? 60 : index < 8 ? 45 : index < 12 ? 30 : index < 15 ? 20 : 10,
    tolerance: round(expLerp(1.55, 0.0048, t), 5),
    miniStep: round(expLerp(3.2, 0.32, t), 4),
    clusterDistance: round(expLerp(3.45, 0.30, t), 4),
    maxAggregateSpan: round(expLerp(5.6, 0.42, t), 4),
    miniVectorBudget: Math.round(lerp(7, 92, t)),
    dropAreaBelow: round(expLerp(0.04, 0.000008, t), 7),
    aggregateAreaBelow: round(expLerp(2.8, 0.0013, t), 6),
    aggregatePadding: round(expLerp(0.095, 0.0018, t), 5),
  };
});

function ensureCleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
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
  if (dx === 0 && dy === 0) {
    const singleDx = x - x1;
    const singleDy = y - y1;
    return singleDx * singleDx + singleDy * singleDy;
  }
  const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)));
  const projectedX = x1 + t * dx;
  const projectedY = y1 + t * dy;
  const projectedDx = x - projectedX;
  const projectedDy = y - projectedY;
  return projectedDx * projectedDx + projectedDy * projectedDy;
}

function simplifyOpenLine(points, tolerance) {
  if (points.length <= 2) return points;
  const keep = new Array(points.length).fill(false);
  const toleranceSquared = tolerance * tolerance;
  keep[0] = true;
  keep[points.length - 1] = true;
  const stack = [[0, points.length - 1]];

  while (stack.length) {
    const [startIndex, endIndex] = stack.pop();
    let maxDistance = 0;
    let splitIndex = -1;
    for (let index = startIndex + 1; index < endIndex; index += 1) {
      const distance = getSquaredDistance(points[index], points[startIndex], points[endIndex]);
      if (distance > maxDistance) {
        maxDistance = distance;
        splitIndex = index;
      }
    }
    if (maxDistance > toleranceSquared && splitIndex !== -1) {
      keep[splitIndex] = true;
      stack.push([startIndex, splitIndex], [splitIndex, endIndex]);
    }
  }

  return points.filter((_, index) => keep[index]);
}

function closeRing(ring) {
  if (ring.length < 3) return ring;
  const first = ring[0];
  const last = ring[ring.length - 1];
  if (first[0] === last[0] && first[1] === last[1]) return ring;
  return [...ring, first];
}

function simplifyRing(rawRing, tolerance) {
  const cleanRing = (rawRing || [])
    .filter((point) => Array.isArray(point) && Number.isFinite(point[0]) && Number.isFinite(point[1]))
    .map(([lon, lat]) => [lon, lat]);
  if (cleanRing.length < 4) return [];
  const openRing = cleanRing.slice(0, -1);
  const simplified = closeRing(simplifyOpenLine(openRing, tolerance));
  return simplified.length >= 4 ? simplified : closeRing(openRing);
}

function getRingArea(ring) {
  let area = 0;
  for (let index = 0; index < ring.length - 1; index += 1) {
    const current = ring[index];
    const next = ring[index + 1];
    area += (current[0] * next[1]) - (next[0] * current[1]);
  }
  return Math.abs(area) / 2;
}

function getPolygonArea(polygon) {
  return Math.max(0, getRingArea(polygon?.[0] || []));
}

function getPolygonPointCount(polygon) {
  return (polygon || []).reduce((sum, ring) => sum + Math.max(0, (ring || []).length - 1), 0);
}

function getPolygonBbox(polygon) {
  let minLon = Infinity;
  let minLat = Infinity;
  let maxLon = -Infinity;
  let maxLat = -Infinity;
  for (const ring of polygon || []) {
    for (const point of ring || []) {
      const lon = Number(point?.[0]);
      const lat = Number(point?.[1]);
      if (!Number.isFinite(lon) || !Number.isFinite(lat)) continue;
      minLon = Math.min(minLon, lon);
      minLat = Math.min(minLat, lat);
      maxLon = Math.max(maxLon, lon);
      maxLat = Math.max(maxLat, lat);
    }
  }
  return [minLon, minLat, maxLon, maxLat];
}

function bboxIntersectsTile(bbox, tile) {
  return bbox[0] <= tile.maxLon
    && bbox[2] >= tile.minLon
    && bbox[1] <= tile.maxLat
    && bbox[3] >= tile.minLat;
}

function getBboxCenter(bbox) {
  return [(bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2];
}

function mergeBbox(target, source) {
  if (!target) return [...source];
  target[0] = Math.min(target[0], source[0]);
  target[1] = Math.min(target[1], source[1]);
  target[2] = Math.max(target[2], source[2]);
  target[3] = Math.max(target[3], source[3]);
  return target;
}

function tileContainsPoint(tile, point) {
  return point[0] >= tile.minLon
    && point[0] < tile.maxLon
    && point[1] >= tile.minLat
    && point[1] < tile.maxLat;
}

function tileKey(lon, lat) {
  const part = (value) => (value < 0 ? `m${Math.abs(value)}` : `p${value}`);
  return `${part(lon)}_${part(lat)}`;
}

function getMiniTileKey(tile, point, miniStep) {
  const lonIndex = Math.floor((point[0] - tile.minLon) / miniStep);
  const latIndex = Math.floor((point[1] - tile.minLat) / miniStep);
  return `${Math.max(0, lonIndex)}_${Math.max(0, latIndex)}`;
}

function getPointKey(point) {
  return `${point[0].toFixed(6)},${point[1].toFixed(6)}`;
}

function getCrossProduct(origin, a, b) {
  return (a[0] - origin[0]) * (b[1] - origin[1]) - (a[1] - origin[1]) * (b[0] - origin[0]);
}

function getConvexHull(points) {
  const uniquePoints = [];
  const seen = new Set();
  for (const point of points) {
    if (!Array.isArray(point) || !Number.isFinite(point[0]) || !Number.isFinite(point[1])) continue;
    const key = getPointKey(point);
    if (seen.has(key)) continue;
    seen.add(key);
    uniquePoints.push([point[0], point[1]]);
  }
  if (uniquePoints.length <= 3) return uniquePoints;

  uniquePoints.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const lower = [];
  for (const point of uniquePoints) {
    while (lower.length >= 2 && getCrossProduct(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
      lower.pop();
    }
    lower.push(point);
  }
  const upper = [];
  for (let index = uniquePoints.length - 1; index >= 0; index -= 1) {
    const point = uniquePoints[index];
    while (upper.length >= 2 && getCrossProduct(upper[upper.length - 2], upper[upper.length - 1], point) <= 0) {
      upper.pop();
    }
    upper.push(point);
  }
  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

function reduceClosedHull(points, maxPoints) {
  if (points.length <= maxPoints) return points;
  const reduced = [];
  for (let index = 0; index < maxPoints; index += 1) {
    reduced.push(points[Math.floor((index / maxPoints) * points.length)]);
  }
  return reduced;
}

function padHull(points, padding) {
  if (!padding || points.length < 3) return points;
  const center = [
    points.reduce((sum, point) => sum + point[0], 0) / points.length,
    points.reduce((sum, point) => sum + point[1], 0) / points.length,
  ];
  return points.map((point) => {
    const dx = point[0] - center[0];
    const dy = point[1] - center[1];
    const length = Math.hypot(dx, dy) || 1;
    return [
      Math.max(-180, Math.min(180, point[0] + (dx / length) * padding)),
      Math.max(-90, Math.min(90, point[1] + (dy / length) * padding)),
    ];
  });
}

function createDiamondAggregateFeature(bbox, properties, padding = 0) {
  const center = getBboxCenter(bbox);
  const lonRadius = Math.max((bbox[2] - bbox[0]) / 2 + padding, padding * 1.6, 0.02);
  const latRadius = Math.max((bbox[3] - bbox[1]) / 2 + padding, padding * 1.6, 0.02);
  const ring = closeRing([
    [center[0], Math.min(90, center[1] + latRadius)],
    [Math.min(180, center[0] + lonRadius), center[1]],
    [center[0], Math.max(-90, center[1] - latRadius)],
    [Math.max(-180, center[0] - lonRadius), center[1]],
  ]);
  return {
    type: "Feature",
    properties,
    bbox: getPolygonBbox([ring]),
    geometry: {
      type: "Polygon",
      coordinates: [ring],
    },
  };
}

function createHullAggregateFeature(bucket, level, properties) {
  const points = [];
  for (const feature of bucket.features) {
    const ring = feature.geometry?.coordinates?.[0] || [];
    for (const point of ring) points.push(point);
  }

  const maxHullPoints = Math.max(4, Math.min(9, Math.floor(level.miniVectorBudget / 3)));
  const hull = reduceClosedHull(getConvexHull(points), maxHullPoints);
  if (hull.length < 3) return createDiamondAggregateFeature(bucket.bbox, properties, level.aggregatePadding);
  const ring = closeRing(padHull(hull, level.aggregatePadding));
  return {
    type: "Feature",
    properties: {
      ...properties,
      _earthMapPointCount: Math.max(0, ring.length - 1),
    },
    bbox: getPolygonBbox([ring]),
    geometry: {
      type: "Polygon",
      coordinates: [ring],
    },
  };
}

function getFeatureCenter(feature) {
  return getBboxCenter(feature.bbox || getPolygonBbox(feature.geometry?.coordinates || []));
}

function getFeatureDistance(a, b) {
  const centerA = getFeatureCenter(a);
  const centerB = getFeatureCenter(b);
  const lonDistance = centerA[0] - centerB[0];
  const latDistance = centerA[1] - centerB[1];
  return Math.hypot(lonDistance, latDistance);
}

function createClusterFromFeature(feature) {
  return {
    features: [feature],
    bbox: [...feature.bbox],
    area: Number(feature.properties?._earthMapArea || 0),
    pointCount: Number(feature.properties?._earthMapPointCount || 0),
  };
}

function addFeatureToCluster(cluster, feature) {
  cluster.features.push(feature);
  cluster.bbox = mergeBbox(cluster.bbox, feature.bbox);
  cluster.area += Number(feature.properties?._earthMapArea || 0);
  cluster.pointCount += Number(feature.properties?._earthMapPointCount || 0);
}

function splitBucketIntoDistanceClusters(bucket, level) {
  const features = [...bucket.features].sort((a, b) => (
    Number(b.properties?._earthMapArea || 0) - Number(a.properties?._earthMapArea || 0)
  ));
  const clusters = [];
  for (const feature of features) {
    let bestCluster = null;
    let bestDistance = Infinity;
    for (const cluster of clusters) {
      const distance = Math.min(...cluster.features.map((candidate) => getFeatureDistance(candidate, feature)));
      if (distance < bestDistance) {
        bestDistance = distance;
        bestCluster = cluster;
      }
    }
    if (bestCluster && bestDistance <= level.clusterDistance) {
      addFeatureToCluster(bestCluster, feature);
    } else {
      clusters.push(createClusterFromFeature(feature));
    }
  }
  return clusters;
}

function clusterSpan(cluster) {
  return Math.max(cluster.bbox[2] - cluster.bbox[0], cluster.bbox[3] - cluster.bbox[1]);
}

function simplifyToleranceForPolygon(level, bbox, area) {
  const bboxWidth = Math.max(0, bbox[2] - bbox[0]);
  const bboxHeight = Math.max(0, bbox[3] - bbox[1]);
  const longestSide = Math.max(bboxWidth, bboxHeight);
  // Kartografische Regel: GroÃŸe Landmassen prÃ¤gen die Orientierung und dÃ¼rfen
  // nicht mit derselben HÃ¤rte reduziert werden wie Inselstaub. Die Toleranz
  // wird deshalb nach realer Ausdehnung und FlÃ¤che gedÃ¤mpft.
  if (longestSide > level.tileStep * 0.85 || area > level.aggregateAreaBelow * 80) return level.tolerance * 0.32;
  if (longestSide > level.tileStep * 0.35 || area > level.aggregateAreaBelow * 16) return level.tolerance * 0.55;
  if (area < level.dropAreaBelow * 3) return level.tolerance * 1.7;
  if (area < level.aggregateAreaBelow) return level.tolerance * 1.18;
  return level.tolerance;
}

function applyMiniTileBudget(tile, level) {
  const protectedFeatures = [];
  const buckets = new Map();

  for (const feature of tile.features) {
    const area = Number(feature.properties?._earthMapArea || 0);
    const pointCount = Number(feature.properties?._earthMapPointCount || 0);
    const bbox = feature.bbox || getPolygonBbox(feature.geometry?.coordinates || []);
    const bboxWidth = bbox[2] - bbox[0];
    const bboxHeight = bbox[3] - bbox[1];
    const isStructuralLand = area >= level.aggregateAreaBelow
      || bboxWidth >= level.miniStep * 1.2
      || bboxHeight >= level.miniStep * 1.2;

    if (isStructuralLand) {
      protectedFeatures.push(feature);
      continue;
    }

    if (area < level.dropAreaBelow || pointCount < 3) continue;
    const center = getBboxCenter(bbox);
    const key = getMiniTileKey(tile, center, level.miniStep);
    if (!buckets.has(key)) {
      buckets.set(key, { key, features: [], bbox: null, area: 0, pointCount: 0 });
    }
    const bucket = buckets.get(key);
    bucket.features.push(feature);
    bucket.bbox = mergeBbox(bucket.bbox, bbox);
    bucket.area += area;
    bucket.pointCount += pointCount;
  }

  const budgetedFeatures = [...protectedFeatures];
  for (const bucket of buckets.values()) {
    const clusters = splitBucketIntoDistanceClusters(bucket, level);
    clusters.forEach((cluster, clusterIndex) => {
      if (cluster.pointCount <= level.miniVectorBudget) {
        budgetedFeatures.push(...cluster.features);
        return;
      }

      // Mini-Tile-Regel: Inseln werden nur aggregiert, wenn sie auch räumlich
      // als Inselgruppe lesbar sind. Zu weit auseinanderliegende Cluster werden
      // nicht zu Origami-Hüllen verbunden, sondern in dieser Zoomstufe
      // reduziert oder ausgeblendet.
      if (
        level.miniVectorBudget < 4
        || cluster.area < level.dropAreaBelow * 3
        || clusterSpan(cluster) > level.maxAggregateSpan
      ) {
        const fallback = cluster.features
          .sort((a, b) => Number(b.properties?._earthMapArea || 0) - Number(a.properties?._earthMapArea || 0))
          .filter((feature) => Number(feature.properties?._earthMapArea || 0) >= level.dropAreaBelow * 4)
          .slice(0, Math.max(1, Math.floor(level.miniVectorBudget / 4)));
        budgetedFeatures.push(...fallback);
        return;
      }

      const aggregate = createHullAggregateFeature(cluster, level, {
        _earthMapFeatureId: `aggregate-${level.id}-${tile.key}-${bucket.key}-${clusterIndex}`,
        _earthMapAggregate: true,
        _earthMapSourceFeatures: cluster.features.length,
        _earthMapArea: cluster.area,
      });
      if (aggregate) budgetedFeatures.push(aggregate);
    });
  }

  tile.features = budgetedFeatures;
}

function tileFileName(levelId, lon, lat) {
  return `ne_10m_land_${levelId}_${tileKey(lon, lat)}.js`;
}

function extractPolygons(feature) {
  const geometry = feature?.geometry || {};
  if (geometry.type === "Polygon") return [geometry.coordinates || []];
  if (geometry.type === "MultiPolygon") return geometry.coordinates || [];
  return [];
}

function getTiles(tileStep) {
  const tiles = [];
  for (let lon = -180; lon < 180; lon += tileStep) {
    for (let lat = -90; lat < 90; lat += tileStep) {
      tiles.push({
        key: tileKey(lon, lat),
        minLon: lon,
        maxLon: lon + tileStep,
        minLat: lat,
        maxLat: lat + tileStep,
        features: [],
      });
    }
  }
  return tiles;
}

function buildLevel(source, level) {
  const tiles = getTiles(level.tileStep);
  const largeFeatures = [];
  let featureId = 0;

  // Architekturregel: Wir kacheln fÃ¼r den Zugriff, nicht durch Zuschneiden.
  // Polygone bleiben vollstÃ¤ndig. GroÃŸe KontinentalflÃ¤chen werden einmal pro
  // Detailstufe gespeichert, kleine Insel-/KÃ¼stenpolygone wandern in die
  // Schwerpunkt-Kachel. So vermeiden wir Schnittkanten und zugleich die
  // explosive Duplizierung eines Polygons in sehr vielen Kacheln.
  for (const feature of source.features || []) {
    for (const polygon of extractPolygons(feature)) {
      const rawOuter = polygon?.[0] || [];
      const cleanOuter = closeRing((rawOuter || [])
        .filter((point) => Array.isArray(point) && Number.isFinite(point[0]) && Number.isFinite(point[1]))
        .map(([lon, lat]) => [lon, lat]));
      if (cleanOuter.length < 4) continue;
      const rawPolygon = [cleanOuter];
      const rawBbox = getPolygonBbox(rawPolygon);
      const rawArea = getPolygonArea(rawPolygon);
      if (!rawBbox.every(Number.isFinite) || rawArea < level.dropAreaBelow) continue;
      const adaptiveTolerance = simplifyToleranceForPolygon(level, rawBbox, rawArea);
      const simplifiedOuter = simplifyRing(cleanOuter, adaptiveTolerance);
      if (simplifiedOuter.length < 4) continue;
      const simplifiedPolygon = [simplifiedOuter];
      const bbox = getPolygonBbox(simplifiedPolygon);
      if (!bbox.every(Number.isFinite)) continue;
      const simplifiedArea = getPolygonArea(simplifiedPolygon);
      if (simplifiedArea < level.dropAreaBelow) continue;
      const id = `ne10m-${featureId}`;
      featureId += 1;
      const tileFeature = {
        type: "Feature",
        properties: {
          _earthMapFeatureId: id,
          _earthMapArea: simplifiedArea,
          _earthMapPointCount: getPolygonPointCount(simplifiedPolygon),
        },
        bbox,
        geometry: {
          type: "Polygon",
          coordinates: simplifiedPolygon,
        },
      };
      const bboxWidth = bbox[2] - bbox[0];
      const bboxHeight = bbox[3] - bbox[1];
      if (bboxWidth > level.tileStep * 1.2 || bboxHeight > level.tileStep * 1.2) {
        largeFeatures.push(tileFeature);
        continue;
      }
      const center = getBboxCenter(bbox);
      const tile = tiles.find((candidate) => tileContainsPoint(candidate, center))
        || tiles.find((candidate) => bboxIntersectsTile(bbox, candidate));
      if (tile) tile.features.push(tileFeature);
    }
  }

  tiles.forEach((tile) => applyMiniTileBudget(tile, level));

  const levelDir = path.join(outputDir, level.id);
  fs.mkdirSync(levelDir, { recursive: true });
  const globalFile = `${level.id}/ne_10m_land_${level.id}_global.js`;
  const globalCollection = {
    type: "FeatureCollection",
    name: `ne_10m_land_${level.id}_global`,
    features: largeFeatures,
  };
  fs.writeFileSync(
    path.join(outputDir, globalFile),
    [
      "window.EarthMapNaturalEarthTileData = window.EarthMapNaturalEarthTileData || {};",
      `window.EarthMapNaturalEarthTileData['10m-land-${level.id}-global'] = ${JSON.stringify(globalCollection)};`,
      "",
    ].join("\n"),
    "utf8",
  );

  const nonEmptyTiles = tiles.filter((tile) => tile.features.length);
  for (const tile of nonEmptyTiles) {
    const file = tileFileName(level.id, tile.minLon, tile.minLat);
    tile.file = `${level.id}/${file}`;
    const collection = {
      type: "FeatureCollection",
      name: `ne_10m_land_${level.id}_${tile.key}`,
      features: tile.features,
    };
    const js = [
      "window.EarthMapNaturalEarthTileData = window.EarthMapNaturalEarthTileData || {};",
      `window.EarthMapNaturalEarthTileData['10m-land-${level.id}-${tile.key}'] = ${JSON.stringify(collection)};`,
      "",
    ].join("\n");
    fs.writeFileSync(path.join(levelDir, file), js, "utf8");
  }

  return {
    id: level.id,
    minZoom: level.minZoom,
    maxZoom: level.maxZoom,
    tileStep: level.tileStep,
    tolerance: level.tolerance,
    global: {
      key: `${level.id}-global`,
      file: globalFile,
      featureCount: largeFeatures.length,
    },
    tiles: nonEmptyTiles.map(({ key, minLon, maxLon, minLat, maxLat, file, features }) => ({
      key,
      minLon,
      maxLon,
      minLat,
      maxLat,
      file,
      featureCount: features.length,
    })),
  };
}

const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
ensureCleanDir(outputDir);
const index = {
  source: "Natural Earth 10m land",
  strategy: "10m-master-mini-tile-budget-generalization",
  levels: levels.map((level) => buildLevel(source, level)),
};

fs.writeFileSync(
  path.join(outputDir, "ne_10m_land_generalized_tiles_index.js"),
  [
    "window.EarthMapNaturalEarthTileIndex = window.EarthMapNaturalEarthTileIndex || {};",
    `window.EarthMapNaturalEarthTileIndex['10m-land-generalized'] = ${JSON.stringify(index)};`,
    "",
  ].join("\n"),
  "utf8",
);

console.log(`Wrote generalized Natural Earth 10m GeoJSON tiles to ${outputDir}.`);
