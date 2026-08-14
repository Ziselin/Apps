const fs = require("fs");
const path = require("path");

const workspaceRoot = path.resolve(__dirname, "..", "..", "..");
const sourcePath = path.join(
  workspaceRoot,
  "assets",
  "geojson",
  "natural-earth",
  "10m",
  "ne_10m_admin_0_countries.coast-aligned.geojson",
);
const outputRoot = path.join(
  workspaceRoot,
  "assets",
  "earthmap-engine",
  "boundary-sets",
  "natural-earth",
  "10m",
  "admin0",
);
const chunksDir = path.join(outputRoot, "chunks");
const chunkScriptsDir = path.join(outputRoot, "chunks-js");
const indexPath = path.join(outputRoot, "index.json");
const indexScriptPath = path.join(outputRoot, "index.js");
const linesPath = path.join(outputRoot, "lines.geojson");
const linesScriptPath = path.join(outputRoot, "lines.js");
const reportPath = path.join(outputRoot, "build-report.json");

const BOUNDARY_SET_SCHEMA = "ziselin-boundary-set-v1";
const BOUNDARY_SET_INDEX_SCHEMA = "ziselin-boundary-set-index-v1";
const VERSION_LABEL = "natural-earth-10m-reference";

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function writeScript(filePath, globalName, data) {
  fs.writeFileSync(filePath, `window.${globalName}=${JSON.stringify(data)};\n`, "utf8");
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

function getAdmin0Iso3(properties = {}) {
  return normalizeText(properties.ADM0_A3 || properties.ISO_A3_EH || properties.ISO_A3 || properties.ADM0_A3_US || "");
}

function getAdmin0Title(properties = {}) {
  return normalizeText(properties.NAME_EN || properties.NAME || properties.ADMIN || properties.NAME_LONG || getAdmin0Iso3(properties) || "Unbenanntes Gebiet");
}

function getAdmin0GermanTitle(properties = {}) {
  return normalizeText(properties.NAME_DE || properties.NAME || properties.ADMIN || "");
}

function getProviderBoundaryId(properties = {}) {
  return getAdmin0Iso3(properties) || normalizeText(properties.ISO_A3 || properties.ADMIN || properties.NAME);
}

function getCountryIso2(properties = {}) {
  return normalizeText(properties.ISO_A2 || properties.WB_A2 || "");
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

function getFeaturePolygonCoordinates(feature) {
  const geometry = feature?.geometry || {};
  if (geometry.type === "Polygon") return [geometry.coordinates || []];
  if (geometry.type === "MultiPolygon") return geometry.coordinates || [];
  return [];
}

function createAdmin0PolygonRingBoundaryLineCollection(geojson) {
  const features = [];
  (geojson?.features || []).forEach((feature, featureIndex) => {
    const polygons = getFeaturePolygonCoordinates(feature);
    const properties = feature.properties || {};
    const countryIso3 = getAdmin0Iso3(properties).toUpperCase();
    polygons.forEach((polygon, polygonIndex) => {
      (polygon || []).forEach((ring, ringIndex) => {
        if (!Array.isArray(ring) || ring.length < 2) return;
        const coordinates = ring
          .filter((point) => Array.isArray(point) && Number.isFinite(point[0]) && Number.isFinite(point[1]))
          .map((point) => [Number(point[0]), Number(point[1])]);
        if (coordinates.length < 2) return;
        features.push({
          type: "Feature",
          id: `admin0-ring-${featureIndex}-${polygonIndex}-${ringIndex}`,
          properties: {
            _earthMapBoundaryDetail: "ring",
            _earthMapAdmin0CountryIso3: countryIso3,
            _earthMapAdmin0StableId: `natural-earth:10m:admin0:${slugify(countryIso3 || `feature-${featureIndex + 1}`)}`,
            _earthMapAdmin0RingIndex: ringIndex,
          },
          geometry: { type: "LineString", coordinates },
        });
      });
    });
  });
  // Architekturregel: Admin-0-Rendering lädt vorberechnete Ring-Linien aus der
  // Engine-Pipeline. Dadurch muss die App keine Topologie live erraten und kann
  // Grenzgeometrie stabil anzeigen. Deduplikation/Shared-Boundary-Optimierung
  // gehört später in einen eigenen Build-Schritt, nicht in den Browser.
  return {
    type: "FeatureCollection",
    name: "earthmap-admin0-polygon-ring-boundaries",
    features,
  };
}

function createDataBinding(properties, stableId, title, germanTitle, wikidataId) {
  const providerId = getProviderBoundaryId(properties);
  const iso2 = getCountryIso2(properties);
  const matchKeys = [
    stableId,
    providerId,
    properties.ISO_A3,
    properties.ISO_A3_EH,
    properties.ADM0_A3,
    properties.ADM0_A3_US,
    iso2,
    title,
    germanTitle,
    properties.NAME,
    properties.NAME_LONG,
    properties.ADMIN,
    wikidataId,
  ]
    .map(normalizeText)
    .filter(Boolean);

  return {
    primary_key: "stable_id",
    provider_key: "provider_boundary_id",
    match_keys: Array.from(new Set(matchKeys)),
    preferred_table_keys: [
      "boundary_key",
      "stable_id",
      "iso3",
      "wikidata_id",
      "boundary_label",
      "name",
    ],
  };
}

function createSource() {
  return {
    label: "Natural Earth",
    url: "https://www.naturalearthdata.com/",
    accessed_at: "",
    note: "Local EarthMap engine pilot build from Natural Earth 10m Admin-0, coast-aligned to the Natural Earth land layer.",
  };
}

function createLicense() {
  return {
    id: "public-domain",
    label: "Public Domain",
    url: "https://www.naturalearthdata.com/about/terms-of-use/",
    detail: "Natural Earth public domain map data.",
    compatibility: {
      wikimedia: true,
      openstreetmap: true,
      attribution_required: false,
    },
  };
}

function createBoundarySet(feature, index) {
  const properties = feature.properties || {};
  const providerId = getProviderBoundaryId(properties);
  const stableId = `natural-earth:10m:admin0:${slugify(providerId || `feature-${index + 1}`)}`;
  const versionId = `${stableId}@${VERSION_LABEL}`;
  const title = getAdmin0Title(properties);
  const germanTitle = getAdmin0GermanTitle(properties);
  const wikidataId = normalizeWikidataId(properties.WIKIDATAID || properties.WIKIDATA);
  const bbox = getFeatureBbox(feature);
  const dataBinding = createDataBinding(properties, stableId, title, germanTitle, wikidataId);

  const earthMapFeature = {
    type: "Feature",
    id: stableId,
    stable_id: stableId,
    version_id: versionId,
    name: title,
    wikidata_id: wikidataId,
    parent_id: "",
    rank: 1,
    valid_from: "",
    valid_to: null,
    valid_precision: "unknown",
    temporal_status: "undated_reference",
    properties: {
      ...properties,
      ziselin_archive_type: "Staat / abhängiges Gebiet",
    },
    match_tokens: dataBinding.match_keys,
    geometry: feature.geometry,
  };

  return {
    schema: BOUNDARY_SET_SCHEMA,
    id: stableId,
    stable_id: stableId,
    version_id: versionId,
    title,
    provider: "Natural Earth",
    provider_boundary_id: providerId,
    boundary_type: "administrative",
    admin_level: "ADM0",
    rank: 1,
    country_iso3: providerId,
    country_iso2: getCountryIso2(properties),
    wikidata_id: wikidataId,
    review_status: "engine-pilot",
    valid_from: "",
    valid_to: null,
    valid_precision: "unknown",
    temporal_status: "undated_reference",
    temporal_note: "Natural Earth is used as a modern reference geometry. Legal or historical validity must be verified for specific use cases.",
    source: createSource(),
    license: createLicense(),
    data_binding: dataBinding,
    bbox,
    features: [earthMapFeature],
  };
}

function createIndexEntry(boundarySet, file, bytes) {
  const feature = boundarySet.features[0];
  return {
    stable_id: boundarySet.stable_id,
    version_id: boundarySet.version_id,
    title: boundarySet.title,
    provider_boundary_id: boundarySet.provider_boundary_id,
    admin_level: boundarySet.admin_level,
    rank: boundarySet.rank,
    country_iso3: boundarySet.country_iso3,
    country_iso2: boundarySet.country_iso2,
    wikidata_id: boundarySet.wikidata_id,
    file,
    bbox: boundarySet.bbox,
    bytes,
    feature_count: boundarySet.features.length,
    point_count: getGeometryPointCount(feature.geometry?.coordinates),
    match_keys: boundarySet.data_binding.match_keys,
  };
}

function buildAdmin0BoundarySetArchive() {
  const source = readJson(sourcePath);
  fs.mkdirSync(chunksDir, { recursive: true });
  fs.mkdirSync(chunkScriptsDir, { recursive: true });

  const index = {
    schema: BOUNDARY_SET_INDEX_SCHEMA,
    id: "natural-earth:10m:admin0",
    title: "Natural Earth 10m Admin0",
    boundary_set_schema: BOUNDARY_SET_SCHEMA,
    generated_at: new Date().toISOString(),
    source: path.relative(workspaceRoot, sourcePath).replace(/\\/g, "/"),
    chunk_strategy: "one-boundary-set-per-admin0-feature",
    boundary_lines: null,
    chunks: [],
  };

  const report = {
    input: path.relative(workspaceRoot, sourcePath).replace(/\\/g, "/"),
    output: path.relative(workspaceRoot, outputRoot).replace(/\\/g, "/"),
    features: 0,
    chunks: 0,
    lineFeatures: 0,
    lineBytes: 0,
    totalBytes: 0,
    largestChunks: [],
    missingProviderIds: [],
  };

  const boundaryLines = createAdmin0PolygonRingBoundaryLineCollection(source);
  const boundaryLinesJson = `${JSON.stringify(boundaryLines)}\n`;
  fs.writeFileSync(linesPath, boundaryLinesJson, "utf8");
  writeScript(linesScriptPath, "EarthMapBoundarySetLinesNaturalEarth10mAdmin0", boundaryLines);
  report.lineFeatures = boundaryLines.features.length;
  report.lineBytes = Buffer.byteLength(boundaryLinesJson);
  index.boundary_lines = {
    file: "lines.geojson",
    scriptFile: "lines.js",
    global: "EarthMapBoundarySetLinesNaturalEarth10mAdmin0",
    generation: "polygon-rings",
    feature_count: boundaryLines.features.length,
    bytes: report.lineBytes,
  };

  (source.features || []).forEach((feature, featureIndex) => {
    const boundarySet = createBoundarySet(feature, featureIndex);
    if (!boundarySet.provider_boundary_id) report.missingProviderIds.push(boundarySet.title);
    const fileName = `${slugify(boundarySet.stable_id)}.geojson`;
    const scriptFileName = `${slugify(boundarySet.stable_id)}.js`;
    const relativeFile = `chunks/${fileName}`;
    const relativeScriptFile = `chunks-js/${scriptFileName}`;
    const outputPath = path.join(chunksDir, fileName);
    const outputScriptPath = path.join(chunkScriptsDir, scriptFileName);
    const json = `${JSON.stringify(boundarySet)}\n`;
    fs.writeFileSync(outputPath, json, "utf8");
    fs.writeFileSync(
      outputScriptPath,
      [
        "window.EarthMapBoundarySetChunksNaturalEarth10mAdmin0=window.EarthMapBoundarySetChunksNaturalEarth10mAdmin0||{};",
        `window.EarthMapBoundarySetChunksNaturalEarth10mAdmin0[${JSON.stringify(boundarySet.stable_id)}]=${JSON.stringify(boundarySet)};`,
        "",
      ].join("\n"),
      "utf8",
    );
    const bytes = Buffer.byteLength(json);
    report.totalBytes += bytes;
    index.chunks.push({
      ...createIndexEntry(boundarySet, relativeFile, bytes),
      scriptFile: relativeScriptFile,
    });
  });

  index.chunks.sort((a, b) => String(a.stable_id).localeCompare(String(b.stable_id)));
  report.features = source.features?.length || 0;
  report.chunks = index.chunks.length;
  report.largestChunks = [...index.chunks]
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 12)
    .map((entry) => ({
      stable_id: entry.stable_id,
      title: entry.title,
      bytes: entry.bytes,
      megabytes: Number((entry.bytes / 1048576).toFixed(3)),
      point_count: entry.point_count,
    }));

  writeJson(indexPath, index);
  writeScript(indexScriptPath, "EarthMapBoundarySetIndexNaturalEarth10mAdmin0", index);
  writeJson(reportPath, report);
  return report;
}

const report = buildAdmin0BoundarySetArchive();
console.log(JSON.stringify(report, null, 2));
