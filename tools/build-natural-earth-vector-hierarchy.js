const fs = require("fs");
const path = require("path");

const workspaceRoot = path.resolve(__dirname, "..", "..");
const sourcePath = path.join(workspaceRoot, "assets", "geojson", "natural-earth", "10m", "ne_10m_land.geojson");
const outputDir = path.join(workspaceRoot, "assets", "geojson", "natural-earth", "10m", "tiles-vector-hierarchy");

const TILE_STEP = 20;
const GLOBAL_SPAN = TILE_STEP * 1.35;

function ensureCleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function closeRing(ring) {
  if (ring.length < 3) return ring;
  const first = ring[0];
  const last = ring[ring.length - 1];
  if (first[0] === last[0] && first[1] === last[1]) return ring;
  return [...ring, first];
}

function cleanRing(rawRing) {
  return closeRing((rawRing || [])
    .filter((point) => Array.isArray(point) && Number.isFinite(point[0]) && Number.isFinite(point[1]))
    .map(([lon, lat]) => [Number(lon), Number(lat)]));
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
  const t = Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / ((dx * dx) + (dy * dy))));
  const px = x1 + t * dx;
  const py = y1 + t * dy;
  return ((x - px) ** 2) + ((y - py) ** 2);
}

function getPointImportance(openRing) {
  const importance = new Array(openRing.length).fill(0);
  if (openRing.length < 3) return importance;
  importance[0] = Infinity;
  importance[openRing.length - 1] = Infinity;
  const stack = [[0, openRing.length - 1]];
  while (stack.length) {
    const [start, end] = stack.pop();
    let maxDistance = 0;
    let split = -1;
    for (let index = start + 1; index < end; index += 1) {
      const distance = getSquaredDistance(openRing[index], openRing[start], openRing[end]);
      if (distance > maxDistance) {
        maxDistance = distance;
        split = index;
      }
    }
    if (split !== -1) {
      importance[split] = Math.sqrt(maxDistance);
      if (split - start > 1) stack.push([start, split]);
      if (end - split > 1) stack.push([split, end]);
    }
  }
  return importance;
}

function encodeHierarchicalRing(rawRing) {
  const ring = cleanRing(rawRing);
  if (ring.length < 4) return [];
  const openRing = ring.slice(0, -1);
  const importance = getPointImportance(openRing);
  return closeRing(openRing.map(([lon, lat], index) => [
    Number(lon.toFixed(6)),
    Number(lat.toFixed(6)),
    importance[index] === Infinity ? 999 : Number(importance[index].toFixed(6)),
  ]));
}

function extractPolygons(feature) {
  const geometry = feature?.geometry || {};
  if (geometry.type === "Polygon") return [geometry.coordinates || []];
  if (geometry.type === "MultiPolygon") return geometry.coordinates || [];
  return [];
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

function getBboxCenter(bbox) {
  return [(bbox[0] + bbox[2]) / 2, (bbox[1] + bbox[3]) / 2];
}

function tileKey(lon, lat) {
  const part = (value) => (value < 0 ? `m${Math.abs(value)}` : `p${value}`);
  return `${part(lon)}_${part(lat)}`;
}

function tileContainsPoint(tile, point) {
  return point[0] >= tile.minLon
    && point[0] < tile.maxLon
    && point[1] >= tile.minLat
    && point[1] < tile.maxLat;
}

function getTiles() {
  const tiles = [];
  for (let lon = -180; lon < 180; lon += TILE_STEP) {
    for (let lat = -90; lat < 90; lat += TILE_STEP) {
      tiles.push({
        key: tileKey(lon, lat),
        minLon: lon,
        maxLon: lon + TILE_STEP,
        minLat: lat,
        maxLat: lat + TILE_STEP,
        features: [],
      });
    }
  }
  return tiles;
}

function bboxIntersectsTile(bbox, tile) {
  return bbox[0] <= tile.maxLon
    && bbox[2] >= tile.minLon
    && bbox[1] <= tile.maxLat
    && bbox[3] >= tile.minLat;
}

function tileFileName(tile) {
  return `ne_10m_land_hierarchy_${tile.key}.js`;
}

function writeDataFile(filePath, dataKey, collection) {
  fs.writeFileSync(
    filePath,
    [
      "window.EarthMapNaturalEarthTileData = window.EarthMapNaturalEarthTileData || {};",
      `window.EarthMapNaturalEarthTileData['${dataKey}'] = ${JSON.stringify(collection)};`,
      "",
    ].join("\n"),
    "utf8",
  );
}

function buildHierarchy(source) {
  const tiles = getTiles();
  const globalFeatures = [];
  let featureId = 0;

  for (const feature of source.features || []) {
    for (const polygon of extractPolygons(feature)) {
      const encodedOuter = encodeHierarchicalRing(polygon?.[0] || []);
      if (encodedOuter.length < 4) continue;
      const encodedPolygon = [encodedOuter];
      const bbox = getPolygonBbox(encodedPolygon);
      if (!bbox.every(Number.isFinite)) continue;
      const bboxWidth = bbox[2] - bbox[0];
      const bboxHeight = bbox[3] - bbox[1];
      const hierarchyFeature = {
        type: "Feature",
        properties: { _earthMapFeatureId: `ne10m-h-${featureId}` },
        bbox,
        geometry: { type: "Polygon", coordinates: encodedPolygon },
      };
      featureId += 1;
      if (bboxWidth > GLOBAL_SPAN || bboxHeight > GLOBAL_SPAN) {
        globalFeatures.push(hierarchyFeature);
        continue;
      }
      const center = getBboxCenter(bbox);
      const tile = tiles.find((candidate) => tileContainsPoint(candidate, center))
        || tiles.find((candidate) => bboxIntersectsTile(bbox, candidate));
      if (tile) tile.features.push(hierarchyFeature);
    }
  }

  ensureCleanDir(outputDir);
  const globalFile = "ne_10m_land_hierarchy_global.js";
  writeDataFile(
    path.join(outputDir, globalFile),
    "10m-land-hierarchy-global",
    { type: "FeatureCollection", name: "ne_10m_land_hierarchy_global", features: globalFeatures },
  );

  const nonEmptyTiles = tiles.filter((tile) => tile.features.length);
  for (const tile of nonEmptyTiles) {
    const file = tileFileName(tile);
    tile.file = file;
    writeDataFile(
      path.join(outputDir, file),
      `10m-land-hierarchy-${tile.key}`,
      { type: "FeatureCollection", name: `ne_10m_land_hierarchy_${tile.key}`, features: tile.features },
    );
  }

  return {
    source: "Natural Earth 10m land",
    strategy: "single-master-vector-hierarchy",
    tileStep: TILE_STEP,
    // Detailkurve: Wir speichern keine separaten Weltkopien pro Zoomstufe.
    // Stattdessen hält jeder Punkt eine Bedeutung im 10m-Master. Die Anzeige
    // schaltet die Schwellwerte jetzt etwa dreimal früher frei, damit beim
    // Hineinzoomen schneller mehr Geometrie sichtbar wird, ohne mehr MB zu
    // erzeugen.
    // Aktuelle Regel: Die Freigabe läuft bis Zoom 24 weiter; dort werden alle
    // Punkte des 10m-Masters sichtbar. Die alte "dreimal früher"-Kurve endete
    // schon bei Zoom 6.33 und ließ den Tiefzoom dadurch künstlich grob.
    thresholds: [
      [1, 0.52],
      [1.3, 0.38],
      [1.6, 0.27],
      [2, 0.19],
      [2.4, 0.13],
      [2.8, 0.09],
      [3.2, 0.062],
      [3.7, 0.043],
      [4.2, 0.03],
      [4.8, 0.021],
      [5.5, 0.015],
      [6.3, 0.0105],
      [7.2, 0.0074],
      [8.2, 0.0052],
      [9.4, 0.0037],
      [10.7, 0.0026],
      [12.1, 0.0018],
      [13.7, 0.00125],
      [15.2, 0.00086],
      [16.6, 0.00058],
      [18, 0.00038],
      [19.5, 0.00025],
      [21, 0.00016],
      [22.5, 0.00008],
      [24, 0],
    ].map(([zoom, importance]) => ({ zoom, importance })),
    global: { key: "global", file: globalFile, featureCount: globalFeatures.length },
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
const index = buildHierarchy(source);
fs.writeFileSync(
  path.join(outputDir, "ne_10m_land_vector_hierarchy_index.js"),
  [
    "window.EarthMapNaturalEarthTileIndex = window.EarthMapNaturalEarthTileIndex || {};",
    `window.EarthMapNaturalEarthTileIndex['10m-land-vector-hierarchy'] = ${JSON.stringify(index)};`,
    "",
  ].join("\n"),
  "utf8",
);

console.log(`Wrote Natural Earth 10m vector hierarchy tiles to ${outputDir}.`);
