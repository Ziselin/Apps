const fs = require("fs");
const path = require("path");

const workspaceRoot = path.resolve(__dirname, "..", "..");
const sourceRoot = path.join(workspaceRoot, "assets", "geojson", "natural-earth", "10m", "admin1-by-country");
const outputRoot = path.join(
  workspaceRoot,
  "assets",
  "earthmap-engine",
  "boundary-sets",
  "natural-earth",
  "10m",
  "admin1",
);
const chunksDir = path.join(outputRoot, "chunks");
const chunkScriptsDir = path.join(outputRoot, "chunks-js");
const indexPath = path.join(outputRoot, "index.json");
const indexScriptPath = path.join(outputRoot, "index.js");
const reportPath = path.join(outputRoot, "build-report.json");

const BOUNDARY_SET_INDEX_SCHEMA = "ziselin-boundary-set-index-v1";
const VERSION_LABEL = "natural-earth-10m-reference";

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function writeCompactJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data)}\n`, "utf8");
}

function writeScript(filePath, globalName, data) {
  fs.writeFileSync(filePath, `window.${globalName}=window.${globalName}||{};window.${globalName}[${JSON.stringify(data.iso3)}]=${JSON.stringify(data)};\n`, "utf8");
}

function normalizeText(value) {
  return String(value || "").trim();
}

function slugify(value, fallback = "boundary") {
  const slug = normalizeText(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

function normalizeWikidataId(value) {
  const match = normalizeText(value).match(/^Q\d+$/i);
  return match ? match[0].toUpperCase() : "";
}

function getCountryIso3(properties = {}, fallback = "") {
  return normalizeText(properties.adm0_a3 || properties.sov_a3 || fallback).toUpperCase();
}

function getProviderBoundaryId(properties = {}, index = 0) {
  return normalizeText(properties.iso_3166_2 || properties.adm1_code || properties.code_hasc || properties.ne_id || `admin1-${index + 1}`);
}

function getFeatureTitle(properties = {}) {
  return normalizeText(properties.name_de || properties.name || properties.name_en || properties.name_local || properties.iso_3166_2 || "Unbenannte Region");
}

function getBboxFromCoordinates(coordinates, bbox = [Infinity, Infinity, -Infinity, -Infinity]) {
  if (!Array.isArray(coordinates)) return bbox;
  if (typeof coordinates[0] === "number" && typeof coordinates[1] === "number") {
    const lon = Number(coordinates[0]);
    const lat = Number(coordinates[1]);
    if (Number.isFinite(lon) && Number.isFinite(lat)) {
      bbox[0] = Math.min(bbox[0], lon);
      bbox[1] = Math.min(bbox[1], lat);
      bbox[2] = Math.max(bbox[2], lon);
      bbox[3] = Math.max(bbox[3], lat);
    }
    return bbox;
  }
  coordinates.forEach((entry) => getBboxFromCoordinates(entry, bbox));
  return bbox;
}

function getFeatureBbox(feature) {
  const bbox = getBboxFromCoordinates(feature?.geometry?.coordinates);
  return bbox.every(Number.isFinite) ? bbox.map((value) => Number(value.toFixed(6))) : null;
}

function getGeometryPointCount(coordinates) {
  if (!Array.isArray(coordinates)) return 0;
  if (typeof coordinates[0] === "number" && typeof coordinates[1] === "number") return 1;
  return coordinates.reduce((sum, entry) => sum + getGeometryPointCount(entry), 0);
}

function createMatchKeys(properties, stableId, title, wikidataId) {
  return [
    stableId,
    properties.iso_3166_2,
    properties.adm1_code,
    properties.code_hasc,
    properties.postal,
    properties.name_de,
    properties.name,
    properties.name_en,
    properties.name_local,
    properties.name_alt,
    properties.woe_name,
    properties.gn_name,
    properties.gns_name,
    title,
    wikidataId,
  ]
    .map(normalizeText)
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index);
}

function createEngineFeature(feature, iso3, index) {
  const properties = feature.properties || {};
  const providerId = getProviderBoundaryId(properties, index);
  const stableId = `natural-earth:10m:admin1:${slugify(iso3, "country")}:${slugify(providerId, `feature-${index + 1}`)}`;
  const versionId = `${stableId}@${VERSION_LABEL}`;
  const title = getFeatureTitle(properties);
  const wikidataId = normalizeWikidataId(properties.wikidataid || properties.WIKIDATAID);
  const matchTokens = createMatchKeys(properties, stableId, title, wikidataId);
  return {
    type: "Feature",
    id: stableId,
    stable_id: stableId,
    version_id: versionId,
    name: title,
    wikidata_id: wikidataId,
    parent_id: iso3,
    rank: 2,
    valid_from: "",
    valid_to: null,
    valid_precision: "unknown",
    temporal_status: "undated_reference",
    properties: {
      ...properties,
      ziselin_archive_type: normalizeText(properties.type || properties.type_en || "Gliedstaat / Provinz"),
    },
    match_tokens: matchTokens,
    bbox: getFeatureBbox(feature),
    geometry: feature.geometry,
  };
}

function createChunk(iso3, sourceCollection) {
  const features = (sourceCollection.features || [])
    .map((feature, index) => createEngineFeature(feature, iso3, index))
    .filter((feature) => feature.geometry);
  return {
    schema: "ziselin-boundary-set-country-chunk-v1",
    id: `natural-earth:10m:admin1:${slugify(iso3)}`,
    title: `Natural Earth 10m Admin1 · ${iso3}`,
    provider: "Natural Earth",
    admin_level: "ADM1",
    rank: 2,
    country_iso3: iso3,
    generated_from: "admin1-by-country",
    source: {
      label: "Natural Earth",
      url: "https://www.naturalearthdata.com/",
      note: "Local EarthMap engine pilot build from Natural Earth 10m Admin-1, coast-aligned to the Natural Earth land layer.",
    },
    license: {
      id: "public-domain",
      label: "Public Domain",
      url: "https://www.naturalearthdata.com/about/terms-of-use/",
      detail: "Natural Earth public domain map data.",
      compatibility: {
        wikimedia: true,
        openstreetmap: true,
        attribution_required: false,
      },
    },
    features,
  };
}

function createFeatureIndexEntry(feature, iso3, file, scriptFile) {
  const properties = feature.properties || {};
  return {
    stable_id: feature.stable_id,
    version_id: feature.version_id,
    title: feature.name,
    provider_boundary_id: getProviderBoundaryId(properties),
    admin_level: "ADM1",
    rank: 2,
    country_iso3: iso3,
    wikidata_id: feature.wikidata_id,
    iso_3166_2: properties.iso_3166_2 || "",
    adm1_code: properties.adm1_code || "",
    file,
    scriptFile,
    bbox: feature.bbox,
    point_count: getGeometryPointCount(feature.geometry?.coordinates),
    match_keys: feature.match_tokens || [],
  };
}

function buildAdmin1BoundarySetArchive() {
  fs.mkdirSync(chunksDir, { recursive: true });
  fs.mkdirSync(chunkScriptsDir, { recursive: true });

  const files = fs.readdirSync(sourceRoot)
    .filter((file) => file.toLowerCase().endsWith(".geojson"))
    .sort((a, b) => a.localeCompare(b));

  const index = {
    schema: BOUNDARY_SET_INDEX_SCHEMA,
    id: "natural-earth:10m:admin1",
    title: "Natural Earth 10m Admin1",
    boundary_set_schema: "ziselin-boundary-set-country-chunk-v1",
    generated_at: new Date().toISOString(),
    source: "assets/geojson/natural-earth/10m/admin1-by-country",
    chunk_strategy: "one-country-chunk-containing-admin1-boundary-features",
    chunks: [],
    feature_index: [],
  };

  let totalBytes = 0;
  let totalFeatures = 0;
  const largestChunks = [];

  for (const fileName of files) {
    const iso3 = path.basename(fileName, ".geojson").toUpperCase();
    const sourceCollection = readJson(path.join(sourceRoot, fileName));
    const chunk = createChunk(iso3, sourceCollection);
    const chunkFile = `chunks/natural-earth-10m-admin1-${slugify(iso3)}.geojson`;
    const scriptFile = `chunks-js/natural-earth-10m-admin1-${slugify(iso3)}.js`;
    const fullChunkPath = path.join(outputRoot, chunkFile);
    const fullScriptPath = path.join(outputRoot, scriptFile);

    writeCompactJson(fullChunkPath, chunk);
    writeScript(fullScriptPath, "EarthMapBoundarySetChunksNaturalEarth10mAdmin1", { iso3, ...chunk });

    const bytes = Buffer.byteLength(JSON.stringify(chunk));
    totalBytes += bytes;
    totalFeatures += chunk.features.length;
    largestChunks.push({
      iso3,
      bytes,
      megabytes: Number((bytes / 1048576).toFixed(3)),
      feature_count: chunk.features.length,
      point_count: chunk.features.reduce((sum, feature) => sum + getGeometryPointCount(feature.geometry?.coordinates), 0),
    });

    index.chunks.push({
      stable_id: chunk.id,
      title: chunk.title,
      country_iso3: iso3,
      admin_level: "ADM1",
      rank: 2,
      file: chunkFile,
      scriptFile,
      bytes,
      feature_count: chunk.features.length,
    });
    chunk.features.forEach((feature) => {
      index.feature_index.push(createFeatureIndexEntry(feature, iso3, chunkFile, scriptFile));
    });
  }

  writeJson(indexPath, index);
  fs.writeFileSync(indexScriptPath, `window.EarthMapBoundarySetIndexNaturalEarth10mAdmin1=${JSON.stringify(index)};\n`, "utf8");

  const report = {
    input: path.relative(workspaceRoot, sourceRoot),
    output: path.relative(workspaceRoot, outputRoot),
    countryChunks: index.chunks.length,
    features: totalFeatures,
    totalBytes,
    largestChunks: largestChunks.sort((a, b) => b.bytes - a.bytes).slice(0, 16),
  };
  writeJson(reportPath, report);
  console.log(JSON.stringify(report, null, 2));
}

buildAdmin1BoundarySetArchive();
