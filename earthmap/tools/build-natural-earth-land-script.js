const fs = require("fs");
const path = require("path");

const sourcePath = path.join(__dirname, "..", "..", "assets", "geojson", "natural-earth", "10m", "ne_10m_land.geojson");
const outputPath = path.join(__dirname, "..", "..", "assets", "geojson", "natural-earth", "10m", "ne_10m_land.js");

const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

// Runtime-Fallback für lokale App-Kontexte: MapLibre kann GeoJSON direkt per
// URL laden, aber file-/WebView-Kontexte blockieren fetch() gelegentlich.
// Dieses Script hält dieselbe Referenzgeometrie als kontrolliert ladbares
// Asset vor, ohne die semantische GeoJSON-Quelle zu ersetzen.
const assignment = [
  "window.EarthMapNaturalEarthData = window.EarthMapNaturalEarthData || {};",
  `window.EarthMapNaturalEarthData.land10m = ${JSON.stringify(source)};`,
  "",
].join("\n");

fs.writeFileSync(outputPath, assignment, "utf8");
console.log(`Wrote ${outputPath}`);
