const fs = require("fs");
const path = require("path");

const workspaceRoot = path.resolve(__dirname, "..", "..");
const sourcePath = path.join(workspaceRoot, "assets", "geojson", "natural-earth", "10m", "ne_10m_land.geojson");
const outputPath = path.join(workspaceRoot, "assets", "geojson", "natural-earth", "10m", "ne_10m_land.js");

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

function extractPolygons(feature) {
  const geometry = feature?.geometry || {};
  if (geometry.type === "Polygon") return [geometry.coordinates || []];
  if (geometry.type === "MultiPolygon") return geometry.coordinates || [];
  return [];
}

const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
const features = [];

// Architekturregel: 10m wird für die Livekarte nicht mehr in rechteckige
// Kacheln geschnitten. Rechteck-Clipping erzeugt künstliche Polygonränder,
// die auf der Orthographic-Projektion als Keile sichtbar werden. Stattdessen
// zerlegen wir MultiPolygone nur in vollständige Einzelpolygone mit eigener
// BBox. So kann der Renderer den Sichtbereich filtern, ohne Geometrie zu
// beschädigen.
for (const feature of source.features || []) {
  for (const polygon of extractPolygons(feature)) {
    const bbox = getPolygonBbox(polygon);
    if (!bbox.every(Number.isFinite)) continue;
    features.push({
      type: "Feature",
      properties: {},
      bbox,
      geometry: {
        type: "Polygon",
        coordinates: polygon,
      },
    });
  }
}

const collection = {
  type: "FeatureCollection",
  name: "ne_10m_land_polygons",
  features,
  bbox: source.bbox,
};

const js = [
  "window.EarthMapNaturalEarthData = window.EarthMapNaturalEarthData || {};",
  `window.EarthMapNaturalEarthData['10m-land'] = ${JSON.stringify(collection)};`,
  "",
].join("\n");

fs.writeFileSync(outputPath, js, "utf8");
console.log(`Wrote ${features.length} Natural Earth 10m polygon features to ${outputPath}.`);
