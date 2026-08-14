const fs = require("fs");
const path = require("path");

const workspaceRoot = path.resolve(__dirname, "..", "..", "..");
const sourcePath = path.join(
  workspaceRoot,
  "assets",
  "geojson",
  "natural-earth",
  "10m",
  "ne_10m_admin_2_counties.geojson",
);
const outputRoot = path.join(
  workspaceRoot,
  "assets",
  "earthmap-engine",
  "boundary-sets",
  "natural-earth",
  "10m",
  "admin2",
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
  return normalizeText(properties.ADM0_A3 || properties.SOV_A3 || properties.GU_A3 || fallback).toUpperCase();
}

function getProviderBoundaryId(properties = {}, index = 0) {
  return normalizeText(properties.ADM2_CODE || properties.FIPS || properties.NE_ID || `admin2-${index + 1}`);
}

function getParentAdmin1Code(properties = {}) {
  return normalizeText(properties.ISO_3166_2 || properties.REGION_COD || properties.REGION || "");
}

function getFeatureTitle(properties = {}) {
  return normalizeText(properties.NAME_DE || properties.NAME || properties.NAME_EN || properties.NAME_LOCAL || properties.ADM2_CODE || "Unbenannte Region");
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
    properties.ADM2_CODE,
    properties.FIPS,
    properties.NE_ID,
    properties.CODE_LOCAL,
    properties.NAME_DE,
    properties.NAME,
    properties.NAME_EN,
    properties.NAME_LOCAL,
    properties.NAME_ALT,
    properties.ABBREV,
    properties.ISO_3166_2,
    properties.REGION,
    properties.REGION_COD,
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
  const stableId = `natural-earth:10m:admin2:${slugify(iso3, "country")}:${slugify(providerId, `feature-${index + 1}`)}`;
  const versionId = `${stableId}@${VERSION_LABEL}`;
  const title = getFeatureTitle(properties);
  const wikidataId = normalizeWikidataId(properties.WIKIDATAID || properties.wikidataid);
  const parentId = getParentAdmin1Code(properties);
  const matchTokens = createMatchKeys(properties, stableId, title, wikidataId);
  return {
    type: "Feature",
    id: stableId,
    stable_id: stableId,
    version_id: versionId,
    name: title,
    wikidata_id: wikidataId,
    parent_id: parentId || iso3,
    rank: 3,
    valid_from: "",
    valid_to: null,
    valid_precision: "unknown",
    temporal_status: "undated_reference",
    properties: {
      ...properties,
      ziselin_archive_type: normalizeText(properties.TYPE || properties.TYPE_EN || "County / ADM2"),
      ziselin_parent_admin1_code: parentId,
    },
    match_tokens: matchTokens,
    bbox: getFeatureBbox(feature),
    geometry: feature.geometry,
  };
}

function createChunk(iso3, features) {
  const chunkFeatures = features
    .map((feature, index) => createEngineFeature(feature, iso3, index))
    .filter((feature) => feature.geometry);
  return {
    schema: "ziselin-boundary-set-country-chunk-v1",
    id: `natural-earth:10m:admin2:${slugify(iso3)}`,
    title: `Natural Earth 10m Admin2 · ${iso3}`,
    provider: "Natural Earth",
    admin_level: "ADM2",
    rank: 3,
    country_iso3: iso3,
    generated_from: "ne_10m_admin_2_counties.geojson",
    source: {
      label: "Natural Earth",
      url: "https://www.naturalearthdata.com/",
      note: "Local EarthMap engine pilot build from Natural Earth 10m Admin-2 counties. Natural Earth provides this level primarily for the United States; deeper global levels should later be loaded through a dedicated provider such as OSM/Overpass or a curated Ziselin archive.",
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
    features: chunkFeatures,
  };
}

function createFeatureIndexEntry(feature, iso3, file, scriptFile) {
  const properties = feature.properties || {};
  return {
    stable_id: feature.stable_id,
    version_id: feature.version_id,
    title: feature.name,
    provider_boundary_id: getProviderBoundaryId(properties),
    admin_level: "ADM2",
    rank: 3,
    country_iso3: iso3,
    parent_id: feature.parent_id || "",
    parent_admin1_code: properties.ziselin_parent_admin1_code || properties.ISO_3166_2 || "",
    wikidata_id: feature.wikidata_id,
    adm2_code: properties.ADM2_CODE || "",
    iso_3166_2: properties.ISO_3166_2 || "",
    fips: properties.FIPS || "",
    file,
    scriptFile,
    bbox: feature.bbox,
    point_count: getGeometryPointCount(feature.geometry?.coordinates),
    match_keys: feature.match_tokens || [],
  };
}

function buildAdmin2BoundarySetArchive() {
  fs.mkdirSync(chunksDir, { recursive: true });
  fs.mkdirSync(chunkScriptsDir, { recursive: true });

  const sourceCollection = readJson(sourcePath);
  const byCountry = new Map();
  (sourceCollection.features || []).forEach((feature) => {
    const iso3 = getCountryIso3(feature.properties || {}, "unknown");
    if (!byCountry.has(iso3)) byCountry.set(iso3, []);
    byCountry.get(iso3).push(feature);
  });

  const index = {
    schema: BOUNDARY_SET_INDEX_SCHEMA,
    id: "natural-earth:10m:admin2",
    title: "Natural Earth 10m Admin2",
    boundary_set_schema: "ziselin-boundary-set-country-chunk-v1",
    generated_at: new Date().toISOString(),
    source: "assets/geojson/natural-earth/10m/ne_10m_admin_2_counties.geojson",
    chunk_strategy: "one-country-chunk-containing-admin2-boundary-features",
    provider_note: "Natural Earth Admin-2 is currently not a global administrative hierarchy; in this source it is primarily useful as a USA county pilot. OSM/Overpass or curated Ziselin archives should provide additional ADM2/ADM3 levels later.",
    chunks: [],
    feature_index: [],
  };

  let totalBytes = 0;
  let totalFeatures = 0;
  const largestChunks = [];
  const iso3s = [...byCountry.keys()].sort((a, b) => a.localeCompare(b));

  for (const iso3 of iso3s) {
    const chunk = createChunk(iso3, byCountry.get(iso3));
    const chunkFile = `chunks/natural-earth-10m-admin2-${slugify(iso3)}.geojson`;
    const scriptFile = `chunks-js/natural-earth-10m-admin2-${slugify(iso3)}.js`;
    writeCompactJson(path.join(outputRoot, chunkFile), chunk);
    writeScript(path.join(outputRoot, scriptFile), "EarthMapBoundarySetChunksNaturalEarth10mAdmin2", { iso3, ...chunk });

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
      admin_level: "ADM2",
      rank: 3,
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
  fs.writeFileSync(indexScriptPath, `window.EarthMapBoundarySetIndexNaturalEarth10mAdmin2=${JSON.stringify(index)};\n`, "utf8");

  const report = {
    input: path.relative(workspaceRoot, sourcePath),
    output: path.relative(workspaceRoot, outputRoot),
    countryChunks: index.chunks.length,
    features: totalFeatures,
    totalBytes,
    largestChunks: largestChunks.sort((a, b) => b.bytes - a.bytes).slice(0, 16),
  };
  writeJson(reportPath, report);
  console.log(JSON.stringify(report, null, 2));
}

buildAdmin2BoundarySetArchive();
