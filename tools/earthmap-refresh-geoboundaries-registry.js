#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const geobBase = path.join(repoRoot, "assets", "earthmap-engine", "boundary-sets", "geoboundaries", "current");
const registryPath = path.join(geobBase, "registry.json");
const registryJsPath = path.join(geobBase, "registry.js");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function listDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}

function collectLevels() {
  const levels = [];
  for (const iso3 of listDirs(geobBase)) {
    for (const adm of listDirs(path.join(geobBase, iso3))) {
      const indexPath = path.join(geobBase, iso3, adm, "index.json");
      const chunkPath = path.join(geobBase, iso3, adm, "chunks", `geoboundaries-${iso3.toLowerCase()}-${adm.toLowerCase()}.geojson`);
      if (!fs.existsSync(indexPath) || !fs.existsSync(chunkPath)) continue;
      const index = readJson(indexPath);
      levels.push({
        provider: "geoboundaries",
        iso3,
        adm,
        base: "../assets/earthmap-engine/boundary-sets/geoboundaries/current/",
        windowIndex: "EarthMapBoundarySetIndexesGeoBoundaries",
        windowChunks: "EarthMapBoundarySetChunksGeoBoundaries",
        feature_count: index.feature_count || index.features?.length || 0,
        bytes: fs.statSync(chunkPath).size,
        source: index.source || `https://www.geoboundaries.org/api/current/gbOpen/${iso3}/${adm}/`,
        generated_at: index.generated_at || null,
      });
    }
  }
  return levels;
}

function main() {
  const previous = fs.existsSync(registryPath) ? readJson(registryPath) : {};
  const registry = {
    schema: "ziselin-geoboundaries-provider-registry-v1",
    generated_at: new Date().toISOString(),
    rule: "Only normalized and consolidated Boundary-Set-v1 country/ADM datasets are registered for EarthMap provider search.",
    levels: collectLevels(),
    failures: previous.failures || [],
    missing_without_failure: previous.missing_without_failure || [],
  };
  writeJson(registryPath, registry);
  fs.writeFileSync(
    registryJsPath,
    `window.EarthMapBoundarySetRegistryGeoBoundaries = ${JSON.stringify(registry, null, 2)};\n`,
    "utf8",
  );
  console.log(JSON.stringify({
    levels: registry.levels.length,
    failures: registry.failures.length,
    missing_without_failure: registry.missing_without_failure.length,
  }, null, 2));
}

main();
