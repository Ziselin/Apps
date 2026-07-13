const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "..", "..", "assets", "geojson", "natural-earth", "10m", "tiles-vector-hierarchy", "ne_10m_land_hierarchy_global.js");
const outputPath = path.join(__dirname, "..", "..", "assets", "geojson", "natural-earth", "10m", "tiles-vector-hierarchy", "ne_10m_land_hierarchy_global_start.js");
const threshold = 0.52;

function decodeRingForThreshold(ring) {
  const decoded = (ring || [])
    .filter((point, index) => index === 0 || index === ring.length - 1 || Number(point?.[2] || 0) >= threshold)
    .map(([lon, lat]) => [lon, lat, 999]);
  if (decoded.length < 4) return [];
  const first = decoded[0];
  const last = decoded[decoded.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) decoded.push([...first]);
  return decoded;
}

function simplifyFeature(feature) {
  const geometry = feature?.geometry || {};
  const rawPolygons = geometry.type === "MultiPolygon"
    ? geometry.coordinates || []
    : geometry.type === "Polygon"
      ? [geometry.coordinates || []]
      : [];
  const simplified = rawPolygons
    .map((polygon) => {
      const outer = decodeRingForThreshold(polygon?.[0] || []);
      return outer.length >= 4 ? [outer] : null;
    })
    .filter(Boolean);
  if (!simplified.length) return null;
  return {
    ...feature,
    geometry: {
      type: simplified.length === 1 ? "Polygon" : "MultiPolygon",
      coordinates: simplified.length === 1 ? simplified[0] : simplified,
    },
  };
}

const source = fs.readFileSync(inputPath, "utf8");
const assignment = source.match(/window\.EarthMapNaturalEarthTileData\['10m-land-hierarchy-global'\]\s*=\s*(\{[\s\S]*\});?\s*$/);
if (!assignment) {
  throw new Error("Global hierarchy assignment not found.");
}
const json = JSON.parse(assignment[1]);
const simplified = {
  ...json,
  name: "ne_10m_land_hierarchy_global_start",
  features: (json.features || []).map(simplifyFeature).filter(Boolean),
};

const output = [
  "window.EarthMapNaturalEarthTileData = window.EarthMapNaturalEarthTileData || {};",
  `window.EarthMapNaturalEarthTileData['10m-land-hierarchy-global-start'] = ${JSON.stringify(simplified)};`,
  "",
].join("\n");

fs.writeFileSync(outputPath, output, "utf8");
const before = Buffer.byteLength(source);
const after = Buffer.byteLength(output);
console.log(`Wrote ${path.basename(outputPath)} (${before} -> ${after} bytes)`);
