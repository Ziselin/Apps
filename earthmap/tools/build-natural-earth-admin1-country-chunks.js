const fs = require("fs");
const path = require("path");

const baseDir = path.join(__dirname, "..", "..", "assets", "geojson", "natural-earth", "10m");
const inputPath = path.join(baseDir, "ne_10m_admin_1_states_provinces.coast-aligned.geojson");
const outputDir = path.join(baseDir, "admin1-by-country");
const outputScriptDir = path.join(baseDir, "admin1-by-country-js");
const indexPath = path.join(baseDir, "ne_10m_admin_1_states_provinces.by-country-index.json");
const indexScriptPath = path.join(baseDir, "ne_10m_admin_1_states_provinces.by-country-index.js");

function safeIso(value) {
  return String(value || "UNK").toUpperCase().replace(/[^A-Z0-9_-]/g, "") || "UNK";
}

fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(outputScriptDir, { recursive: true });
const source = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const groups = new Map();

for (const feature of source.features || []) {
  const properties = feature.properties || {};
  const iso = safeIso(properties.adm0_a3 || properties.sov_a3);
  if (!groups.has(iso)) groups.set(iso, []);
  groups.get(iso).push(feature);
}

const index = {
  type: "FeatureCollectionIndex",
  name: "ne_10m_admin_1_states_provinces_by_country",
  generated_at: new Date().toISOString(),
  source: "ne_10m_admin_1_states_provinces.coast-aligned.geojson",
  chunks: [],
};

for (const [iso, features] of [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  const featureCollection = {
    type: "FeatureCollection",
    name: `ne_10m_admin_1_states_provinces_${iso}`,
    features,
  };
  const json = JSON.stringify(featureCollection);
  const file = `${iso}.geojson`;
  const scriptFile = `${iso}.js`;
  fs.writeFileSync(path.join(outputDir, file), json);
  fs.writeFileSync(
    path.join(outputScriptDir, scriptFile),
    `window.EarthMapNaturalEarthAdmin1CountryChunks10m=window.EarthMapNaturalEarthAdmin1CountryChunks10m||{};window.EarthMapNaturalEarthAdmin1CountryChunks10m[${JSON.stringify(iso)}]=${json};`,
  );
  index.chunks.push({
    iso3: iso,
    file: `admin1-by-country/${file}`,
    scriptFile: `admin1-by-country-js/${scriptFile}`,
    featureCount: features.length,
    bytes: Buffer.byteLength(json),
  });
}

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
fs.writeFileSync(indexScriptPath, `window.EarthMapNaturalEarthAdmin1ChunkIndex10m=${JSON.stringify(index)};`);

console.log(`chunks=${index.chunks.length}`);
for (const chunk of [...index.chunks].sort((a, b) => b.bytes - a.bytes).slice(0, 12)) {
  console.log(`${chunk.iso3} ${(chunk.bytes / 1048576).toFixed(2)} MB ${chunk.featureCount} features`);
}
