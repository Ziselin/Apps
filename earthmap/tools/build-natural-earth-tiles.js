const fs = require("fs");
const path = require("path");

const workspaceRoot = path.resolve(__dirname, "..", "..");
const sourcePath = path.join(workspaceRoot, "assets", "geojson", "natural-earth", "10m", "ne_10m_land.geojson");
const outputDir = path.join(workspaceRoot, "assets", "geojson", "natural-earth", "10m", "tiles");
const tileStep = 30;

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function closeRing(ring) {
  if (ring.length < 3) return ring;
  const first = ring[0];
  const last = ring[ring.length - 1];
  if (first[0] === last[0] && first[1] === last[1]) return ring;
  return [...ring, first];
}

function getRingBbox(ring) {
  const lons = ring.map(([lon]) => lon);
  const lats = ring.map(([, lat]) => lat);
  return [Math.min(...lons), Math.min(...lats), Math.max(...lons), Math.max(...lats)];
}

function intersects(bbox, tile) {
  return bbox[0] <= tile.maxLon
    && bbox[2] >= tile.minLon
    && bbox[1] <= tile.maxLat
    && bbox[3] >= tile.minLat;
}

function clipAgainstEdge(points, inside, intersect) {
  const output = [];
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index];
    const previous = points[(index + points.length - 1) % points.length];
    const currentInside = inside(current);
    const previousInside = inside(previous);
    if (currentInside) {
      if (!previousInside) output.push(intersect(previous, current));
      output.push(current);
    } else if (previousInside) {
      output.push(intersect(previous, current));
    }
  }
  return output;
}

function clipRingToTile(rawRing, tile) {
  let ring = rawRing
    .filter((point) => Array.isArray(point) && Number.isFinite(point[0]) && Number.isFinite(point[1]))
    .map(([lon, lat]) => [lon, lat]);
  if (ring.length < 3) return [];
  if (ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1]) {
    ring = ring.slice(0, -1);
  }

  const verticalIntersect = (lon) => ([a, b]) => {
    const t = (lon - a[0]) / ((b[0] - a[0]) || 1);
    return [lon, a[1] + (b[1] - a[1]) * t];
  };
  const horizontalIntersect = (lat) => ([a, b]) => {
    const t = (lat - a[1]) / ((b[1] - a[1]) || 1);
    return [a[0] + (b[0] - a[0]) * t, lat];
  };

  ring = clipAgainstEdge(ring, ([lon]) => lon >= tile.minLon, (a, b) => verticalIntersect(tile.minLon)([a, b]));
  if (ring.length < 3) return [];
  ring = clipAgainstEdge(ring, ([lon]) => lon <= tile.maxLon, (a, b) => verticalIntersect(tile.maxLon)([a, b]));
  if (ring.length < 3) return [];
  ring = clipAgainstEdge(ring, ([, lat]) => lat >= tile.minLat, (a, b) => horizontalIntersect(tile.minLat)([a, b]));
  if (ring.length < 3) return [];
  ring = clipAgainstEdge(ring, ([, lat]) => lat <= tile.maxLat, (a, b) => horizontalIntersect(tile.maxLat)([a, b]));
  if (ring.length < 3) return [];
  return closeRing(ring);
}

function tileKey(lon, lat) {
  const part = (value) => (value < 0 ? `m${Math.abs(value)}` : `p${value}`);
  return `${part(lon)}_${part(lat)}`;
}

function tileFileName(lon, lat) {
  return `ne_10m_land_tile_${tileKey(lon, lat)}.js`;
}

function extractOuterRings(feature) {
  const geometry = feature.geometry || {};
  if (geometry.type === "Polygon") return [geometry.coordinates?.[0] || []];
  if (geometry.type === "MultiPolygon") return (geometry.coordinates || []).map((polygon) => polygon?.[0] || []);
  return [];
}

const geojson = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const tiles = [];
for (let lon = -180; lon < 180; lon += tileStep) {
  for (let lat = -90; lat < 90; lat += tileStep) {
    tiles.push({
      key: tileKey(lon, lat),
      minLon: lon,
      maxLon: lon + tileStep,
      minLat: lat,
      maxLat: lat + tileStep,
      file: tileFileName(lon, lat),
      features: [],
    });
  }
}

for (const feature of geojson.features || []) {
  for (const ring of extractOuterRings(feature)) {
    if (ring.length < 3) continue;
    const bbox = getRingBbox(ring);
    if (!bbox.every(Number.isFinite)) continue;
    for (const tile of tiles) {
      if (!intersects(bbox, tile)) continue;
      const clipped = clipRingToTile(ring, tile);
      if (clipped.length < 4) continue;
      tiles.find((candidate) => candidate.key === tile.key).features.push({
        type: "Feature",
        properties: feature.properties || {},
        bbox: getRingBbox(clipped),
        geometry: {
          type: "Polygon",
          coordinates: [clipped],
        },
      });
    }
  }
}

ensureDir(outputDir);
const nonEmptyTiles = tiles.filter((tile) => tile.features.length);
for (const tile of nonEmptyTiles) {
  const collection = {
    type: "FeatureCollection",
    name: `ne_10m_land_${tile.key}`,
    features: tile.features,
  };
  const js = [
    "window.EarthMapNaturalEarthTileData = window.EarthMapNaturalEarthTileData || {};",
    `window.EarthMapNaturalEarthTileData['10m-land-${tile.key}'] = ${JSON.stringify(collection)};`,
    "",
  ].join("\n");
  fs.writeFileSync(path.join(outputDir, tile.file), js, "utf8");
}

const index = {
  detail: "10m",
  step: tileStep,
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

fs.writeFileSync(
  path.join(outputDir, "ne_10m_land_tiles_index.js"),
  [
    "window.EarthMapNaturalEarthTileIndex = window.EarthMapNaturalEarthTileIndex || {};",
    `window.EarthMapNaturalEarthTileIndex['10m-land'] = ${JSON.stringify(index)};`,
    "",
  ].join("\n"),
  "utf8",
);

console.log(`Wrote ${nonEmptyTiles.length} clipped Natural Earth 10m land tiles.`);
