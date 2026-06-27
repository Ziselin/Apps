const ui = Object.fromEntries([
  "globeApp", "menuButton", "menuCloseButton", "menuOverlay", "sideMenu",
  "openWorkspaceButton", "returnPreviewButton", "globe", "globeCanvas",
  "newProjectButton", "projectBrowserList", "libraryBrowserList", "boundarySummary", "boundaryLevelList",
  "boundarySearchInput", "boundarySearchButton", "boundarySearchResults",
  "layerEditorTitle", "layerEditorSummary", "layerEditorContent", "layerColorInput", "layerColorPaletteButton", "layerMetaList",
].map((id) => [id, document.getElementById(id)]));

const STORAGE_KEY = "globemap-projects-v1";

const GEOMETRY_BASE_REGISTRY = {
  naturalEarthModern: {
    id: "natural-earth-modern",
    label: "Natural Earth · moderne Erde",
    kind: "modern-earth",
    source: "Natural Earth",
    geometryType: "political-and-physical-boundaries",
    detailLevels: [
      { id: "110m", label: "110m", use: "Globale Ansicht", path: "data/natural-earth/110m/" },
      { id: "50m", label: "50m", use: "Mittlerer Zoom", path: "data/natural-earth/50m/" },
      { id: "10m", label: "10m", use: "Detailzoom", path: "data/natural-earth/10m/" },
    ],
  },
};

// Architekturregel: Earth-Map-Projekte referenzieren Boundary-Sets, statt eine
// einzelne Weltgeometrie fest einzubauen. Natural Earth ist die Standardbasis
// für neue moderne Karten. Später können paläogeografische oder andere
// rekonstruierte Grenzräume als eigene Boundary-Sets mit derselben Schnittstelle
// ergänzt werden.
function createDefaultBoundarySets() {
  return [{
    id: `boundary-${Date.now()}`,
    role: "default",
    geometryBaseId: GEOMETRY_BASE_REGISTRY.naturalEarthModern.id,
    label: GEOMETRY_BASE_REGISTRY.naturalEarthModern.label,
    temporalModel: {
      kind: "present-day",
      validAt: "current",
    },
    detailStrategy: GEOMETRY_BASE_REGISTRY.naturalEarthModern.detailLevels.map((level, index) => ({
      ...level,
      minZoom: index === 0 ? 0 : index === 1 ? 2.5 : 5,
    })),
  }];
}

function createDefaultLibraryFolders() {
  return [
    {
      id: "folder-boundary-maps",
      type: "boundary-maps",
      title: "Länderkarten",
      description: "Importierte Länder- und Grenzkarten dieses Projekts.",
      items: [],
    },
    {
      id: "folder-datasets",
      type: "datasets",
      title: "Datenbanken",
      description: "Tabellenwerte, die später auf Grenzlayer projiziert werden.",
      items: [],
    },
    {
      id: "folder-map-collections",
      type: "map-collections",
      title: "Kartensammlungen",
      description: "Zusammenstellungen mehrerer Layer für bestimmte Ansichten.",
      items: [],
    },
  ];
}

function createGlobeMapProject(title = "Neues Earth-Map-Projekt") {
  return {
    id: `globemap-${Date.now()}`,
    title,
    status: "in Vorbereitung",
    activeBoundarySetId: "",
    activeLibraryItemId: "",
    boundarySets: createDefaultBoundarySets(),
    libraryFolders: createDefaultLibraryFolders(),
    dataLayers: [],
    classification: {
      mode: "manual-breaks",
      breaks: [
        { from: 0, to: 10, color: "#d9cc98" },
        { from: 11, to: 50, color: "#b9c59d" },
        { from: 51, to: 200, color: "#6e9388" },
      ],
    },
  };
}

function repairLegacyText(value) {
  if (typeof value !== "string") return value;
  return value
    .replaceAll("Â·", "·")
    .replaceAll("Ã¤", "ä")
    .replaceAll("Ã¶", "ö")
    .replaceAll("Ã¼", "ü")
    .replaceAll("Ã„", "Ä")
    .replaceAll("Ã–", "Ö")
    .replaceAll("Ãœ", "Ü")
    .replaceAll("ÃŸ", "ß");
}

function normalizeLibraryItem(item) {
  return {
    id: item?.id || `layer-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    kind: item?.kind || "boundary-map",
    name: repairLegacyText(item?.name || "Unbenannte Karte"),
    source: repairLegacyText(item?.source || ""),
    iso3: String(item?.iso3 || ""),
    adminLevel: repairLegacyText(item?.adminLevel || item?.level || ""),
    detail: repairLegacyText(item?.detail || ""),
    license: repairLegacyText(item?.license || ""),
    sourceUrl: item?.sourceUrl || item?.apiUrl || "",
    importedAt: item?.importedAt || new Date().toISOString(),
    temporalCoverage: {
      label: repairLegacyText(item?.temporalCoverage?.label || "gegenwärtig / aktuell"),
      from: item?.temporalCoverage?.from || "",
      to: item?.temporalCoverage?.to || "",
    },
    display: {
      visible: item?.display?.visible !== false,
      color: item?.display?.color || "#c6a86a",
    },
    geometryRef: item?.geometryRef || null,
  };
}

function normalizeLibraryFolders(folders) {
  const defaults = createDefaultLibraryFolders();
  const incoming = Array.isArray(folders) ? folders : [];
  return defaults.map((folder) => {
    const existing = incoming.find((candidate) => candidate?.type === folder.type || candidate?.id === folder.id) || {};
    return {
      ...folder,
      ...existing,
      title: repairLegacyText(existing.title || folder.title),
      description: repairLegacyText(existing.description || folder.description),
      items: Array.isArray(existing.items) ? existing.items.map(normalizeLibraryItem) : [],
    };
  });
}

function normalizeProject(project) {
  const normalized = {
    ...createGlobeMapProject(project?.title || "Earth-Map-Projekt"),
    ...project,
    boundarySets: Array.isArray(project?.boundarySets) && project.boundarySets.length ? project.boundarySets : createDefaultBoundarySets(),
    libraryFolders: normalizeLibraryFolders(project?.libraryFolders),
  };
  normalized.title = repairLegacyText(normalized.title);
  normalized.boundarySets = normalized.boundarySets.map((boundarySet) => ({
    ...boundarySet,
    label: repairLegacyText(boundarySet.label),
    detailStrategy: (boundarySet.detailStrategy || []).map((level) => ({
      ...level,
      label: repairLegacyText(level.label),
      use: repairLegacyText(level.use),
    })),
  }));
  normalized.activeBoundarySetId = normalized.activeBoundarySetId || normalized.boundarySets[0]?.id || "";
  normalized.activeLibraryItemId = String(normalized.activeLibraryItemId || "");
  return normalized;
}

function loadProjects() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Array.isArray(parsed?.projects) && parsed.projects.length) return parsed.projects.map(normalizeProject);
  } catch (error) {
    console.warn("Earth-Map-Projekte konnten nicht gelesen werden.", error);
  }
  return [normalizeProject(createGlobeMapProject("Weltkarte · Grundmodell"))];
}

const state = {
  projects: loadProjects(),
  activeProjectId: "",
};

state.activeProjectId = state.projects[0]?.id || "";

function persistProjects() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects: state.projects }));
  } catch (error) {
    console.warn("Earth-Map-Projekte konnten nicht gespeichert werden.", error);
  }
}

function getActiveProject() {
  return state.projects.find((project) => project.id === state.activeProjectId) || state.projects[0] || null;
}

function getActiveBoundarySet(project = getActiveProject()) {
  return project?.boundarySets?.find((set) => set.id === project.activeBoundarySetId) || project?.boundarySets?.[0] || null;
}

function getLibraryFolder(project, folderType) {
  return project?.libraryFolders?.find((folder) => folder.type === folderType) || null;
}

function getActiveLibraryItem(project = getActiveProject()) {
  const activeId = project?.activeLibraryItemId || "";
  if (!activeId) return null;
  for (const folder of project.libraryFolders || []) {
    const item = folder.items?.find((candidate) => candidate.id === activeId);
    if (item) return item;
  }
  return null;
}

function getVisibleBoundaryMapItems(project = getActiveProject()) {
  const folder = getLibraryFolder(project, "boundary-maps");
  return (folder?.items || []).filter((item) => item.display?.visible !== false);
}

function getNaturalEarthCountryFeatureByIso3(iso3) {
  const normalizedIso3 = String(iso3 || "").toUpperCase();
  if (!normalizedIso3) return null;
  const features = window.EarthMapNaturalEarthCountries?.features || [];
  return features.find((feature) => getNaturalEarthIso3(feature).toUpperCase() === normalizedIso3) || null;
}

function hexToRgba(hex, alpha = 1) {
  const value = String(hex || "").trim();
  const match = value.match(/^#?([0-9a-f]{6})$/i);
  if (!match) return `rgba(198,168,106,${alpha})`;
  const intValue = Number.parseInt(match[1], 16);
  const red = (intValue >> 16) & 255;
  const green = (intValue >> 8) & 255;
  const blue = intValue & 255;
  return `rgba(${red},${green},${blue},${alpha})`;
}

function normalizeColorValue(value, fallback = "") {
  const raw = String(value || "").trim();
  const short = raw.match(/^#?([0-9a-f]{3})$/i);
  if (short) {
    return `#${short[1].split("").map((char) => `${char}${char}`).join("")}`.toLowerCase();
  }
  const full = raw.match(/^#?([0-9a-f]{6})$/i);
  if (full) return `#${full[1].toLowerCase()}`;
  return fallback;
}

function isNeutralPaletteColor(color) {
  const normalized = normalizeColorValue(color);
  if (!normalized) return true;
  const intValue = Number.parseInt(normalized.slice(1), 16);
  const red = (intValue >> 16) & 255;
  const green = (intValue >> 8) & 255;
  const blue = intValue & 255;
  const spread = Math.max(red, green, blue) - Math.min(red, green, blue);
  const isBlackish = red <= 20 && green <= 20 && blue <= 20;
  const isWhitish = red >= 235 && green >= 235 && blue >= 235;
  return isBlackish || isWhitish || spread <= 10;
}

function collectProjectPaletteColors(project = getActiveProject(), extraColors = []) {
  const palette = [];
  const seen = new Set();
  const pushColor = (value) => {
    const normalized = normalizeColorValue(value);
    if (!normalized || isNeutralPaletteColor(normalized) || seen.has(normalized)) return;
    seen.add(normalized);
    palette.push(normalized);
  };

  // Farbregel: Earth Map unterscheidet wie TimeMap freie Farbwahl von
  // Projektfarben. Die Palette sammelt deshalb nur Farben, die im aktuellen
  // Projekt bereits semantisch verwendet werden, statt globale Appfarben
  // ungezielt anzubieten.
  pushColor("#c6a86a");
  (project?.classification?.breaks || []).forEach((entry) => pushColor(entry?.color));
  (project?.libraryFolders || []).forEach((folder) => {
    (folder.items || []).forEach((item) => pushColor(item?.display?.color));
  });
  (Array.isArray(extraColors) ? extraColors : [extraColors]).forEach(pushColor);
  return palette.slice(0, 12);
}

function applyLayerColor(value) {
  const project = getActiveProject();
  const item = getActiveLibraryItem(project);
  if (!item) return;
  const color = normalizeColorValue(value, "#c6a86a");
  item.display = { ...(item.display || {}), color };
  if (ui.layerColorInput) ui.layerColorInput.value = color;
  persistProjects();
  renderLibraryBrowser();
  renderGlobe();
}

function setupLayerColorPalette() {
  const button = ui.layerColorPaletteButton;
  const anchor = button?.parentElement;
  if (!button || !anchor) return;
  const palette = document.createElement("div");
  palette.className = "color-palette layer-color-palette";
  palette.hidden = true;
  anchor.appendChild(palette);

  const closePalette = () => {
    if (palette.hidden) return;
    palette.hidden = true;
    document.removeEventListener("mousedown", handleDocumentPointerDown, true);
  };

  function handleDocumentPointerDown(event) {
    if (anchor.contains(event.target)) return;
    closePalette();
  }

  const renderPalette = () => {
    const currentColor = ui.layerColorInput?.value || "";
    const colors = collectProjectPaletteColors(getActiveProject(), [currentColor]);
    if (!colors.length) {
      const note = document.createElement("p");
      note.className = "palette-empty";
      note.textContent = "Noch keine Projektfarben.";
      palette.replaceChildren(note);
      return;
    }
    palette.replaceChildren(...colors.map((color) => {
      const swatch = document.createElement("button");
      swatch.type = "button";
      swatch.className = "color-swatch";
      swatch.style.background = color;
      swatch.setAttribute("aria-label", `Farbe ${color}`);
      swatch.classList.toggle("is-active", normalizeColorValue(currentColor) === color);
      swatch.addEventListener("click", (event) => {
        event.preventDefault();
        applyLayerColor(color);
        closePalette();
      });
      return swatch;
    }));
  };

  button.addEventListener("click", (event) => {
    event.preventDefault();
    if (!getActiveLibraryItem()) return;
    if (palette.hidden) {
      renderPalette();
      palette.hidden = false;
      document.addEventListener("mousedown", handleDocumentPointerDown, true);
    } else {
      closePalette();
    }
  });
}

function formatDateTime(value) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
  } catch {
    return value;
  }
}

function setWorkspaceMode(mode) {
  ui.globeApp.classList.toggle("workspace-mode-details", mode === "details");
  ui.globeApp.classList.toggle("workspace-mode-preview", mode !== "details");
}

function setMenuOpen(isOpen) {
  if (isOpen) {
    ui.sideMenu.querySelectorAll("details[open]").forEach((details) => {
      details.open = false;
    });
  }
  ui.sideMenu.classList.toggle("is-open", isOpen);
  ui.sideMenu.setAttribute("aria-hidden", String(!isOpen));
  ui.sideMenu.inert = !isOpen;
  ui.menuOverlay.hidden = !isOpen;
  ui.menuButton.setAttribute("aria-expanded", String(isOpen));
}

const ctx = ui.globeCanvas.getContext("2d");
const DEG = Math.PI / 180;
const hasD3Geo = typeof window.d3?.geoOrthographic === "function" && typeof window.d3?.geoPath === "function";
document.documentElement.dataset.geoEngine = hasD3Geo ? "d3-orthographic" : "canvas-fallback";

// Geodatenregel: Die sichtbare Weltgeometrie kommt nicht aus handgebauten
// Platzhalterpolygonen, sondern aus dem Geometrie-Basisdatensatz des aktiven
// Projekts. Natural Earth ist hier die erste echte moderne Basis. Die
// Renderer-Schicht arbeitet mit Lon/Lat-Ringen und Oberflächenproben; dadurch
// bleibt die Darstellung auf der Kugeloberfläche stabil und kann später auch
// historische oder paläogeografische Grenzräume mit derselben Schnittstelle anzeigen.

const NATURAL_EARTH_LAND_DETAILS = {
  "110m": { key: "110m-land", scriptPath: "data/natural-earth/110m/ne_110m_land.js?v=20260627a", minZoom: 1 },
  "50m": { key: "50m-land", scriptPath: "data/natural-earth/50m/ne_50m_land.js?v=20260627a", minZoom: 2.35 },
  "10m": { key: "10m-land", tileBasePath: "data/natural-earth/10m/tiles/", minZoom: 5.25 },
};

let activeNaturalEarthSource = window.GlobeMapNaturalEarthData?.["110m-land"] || null;
let pendingNaturalEarthDetail = "";
let activeNaturalEarthTileSignature = "";
const pendingNaturalEarthTiles = new Set();

const geoState = {
  detailLevel: "110m",
  landRings: [],
  landSamples: [],
  status: "loading",
  samplesReady: false,
};

function getLoadedNaturalEarthLand(level) {
  const config = NATURAL_EARTH_LAND_DETAILS[level];
  return config ? window.GlobeMapNaturalEarthData?.[config.key] || null : null;
}

function getDesiredNaturalEarthDetailLevel() {
  if (globeZoom >= NATURAL_EARTH_LAND_DETAILS["10m"].minZoom) return "10m";
  if (globeZoom >= NATURAL_EARTH_LAND_DETAILS["50m"].minZoom) return "50m";
  return "110m";
}

function normalizeLongitude(lon) {
  let value = lon;
  while (value < -180) value += 360;
  while (value > 180) value -= 360;
  return value;
}

function getBufferedViewportBounds() {
  const rect = ui.globe.getBoundingClientRect();
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);
  const baseSize = Math.min(width, height);
  const radius = baseSize * 0.47 * globeZoom;
  const viewportHalfLon = Math.asin(clamp(width / (2 * radius), 0, 1)) / DEG;
  const viewportHalfLat = Math.asin(clamp(height / (2 * radius), 0, 1)) / DEG;
  const bufferedHalfLon = clamp(viewportHalfLon * 3, 8, 180);
  const bufferedHalfLat = clamp(viewportHalfLat * 3, 8, 90);
  const centerLon = normalizeLongitude(-rotation.lon);
  const centerLat = clamp(-rotation.lat, -90, 90);
  const minLat = clamp(centerLat - bufferedHalfLat, -90, 90);
  const maxLat = clamp(centerLat + bufferedHalfLat, -90, 90);
  const minLon = centerLon - bufferedHalfLon;
  const maxLon = centerLon + bufferedHalfLon;
  const lonSegments = minLon < -180
    ? [[minLon + 360, 180], [-180, maxLon]]
    : maxLon > 180
      ? [[minLon, 180], [-180, maxLon - 360]]
      : [[minLon, maxLon]];
  return { minLat, maxLat, lonSegments };
}

function tileIntersectsViewport(tile, bounds) {
  const latIntersects = tile.minLat <= bounds.maxLat && tile.maxLat >= bounds.minLat;
  if (!latIntersects) return false;
  return bounds.lonSegments.some(([minLon, maxLon]) => tile.minLon <= maxLon && tile.maxLon >= minLon);
}

function getVisibleNaturalEarth10mTiles() {
  const index = window.GlobeMapNaturalEarthTileIndex?.["10m-land"];
  if (!index?.tiles?.length) return [];
  const bounds = getBufferedViewportBounds();
  return index.tiles.filter((tile) => tileIntersectsViewport(tile, bounds));
}

function buildNaturalEarth10mTileCollection(tiles) {
  const features = [];
  tiles.forEach((tile) => {
    const collection = window.GlobeMapNaturalEarthTileData?.[`10m-land-${tile.key}`];
    if (collection?.features?.length) features.push(...collection.features);
  });
  return {
    type: "FeatureCollection",
    name: "ne_10m_land_viewport_tiles",
    features,
  };
}

function installNaturalEarthDetail(level, geojson) {
  if (!geojson) return;
  activeNaturalEarthSource = geojson;
  geoState.detailLevel = level;
  if (hasD3Geo) {
    geoState.status = "ready";
    geoState.landRings = [];
    geoState.landSamples = [];
    geoState.samplesReady = false;
    return;
  }
  installLandGeoJson(geojson);
}

function requestNaturalEarthDetailForZoom() {
  const desiredLevel = getDesiredNaturalEarthDetailLevel();
  if (desiredLevel === "10m") {
    const tiles = getVisibleNaturalEarth10mTiles();
    if (!tiles.length) return;
    const signature = tiles.map((tile) => tile.key).sort().join("|");
    if (signature === activeNaturalEarthTileSignature && geoState.detailLevel === "10m") return;

    const missingTiles = tiles.filter((tile) => !window.GlobeMapNaturalEarthTileData?.[`10m-land-${tile.key}`]);
    if (missingTiles.length) {
      missingTiles.forEach((tile) => {
        if (pendingNaturalEarthTiles.has(tile.key)) return;
        pendingNaturalEarthTiles.add(tile.key);
        const script = document.createElement("script");
        script.src = `${NATURAL_EARTH_LAND_DETAILS["10m"].tileBasePath}${tile.file}?v=20260627a`;
        script.async = true;
        script.onload = () => {
          pendingNaturalEarthTiles.delete(tile.key);
          scheduleNaturalEarthDetailUpdate(0);
        };
        script.onerror = () => {
          pendingNaturalEarthTiles.delete(tile.key);
          console.warn(`Natural-Earth-10m-Kachel ${tile.key} konnte nicht geladen werden.`);
        };
        document.head.appendChild(script);
      });
      return;
    }

    activeNaturalEarthTileSignature = signature;
    installNaturalEarthDetail("10m", buildNaturalEarth10mTileCollection(tiles));
    return;
  }

  activeNaturalEarthTileSignature = "";
  if (desiredLevel === geoState.detailLevel && activeNaturalEarthSource) return;

  const loaded = getLoadedNaturalEarthLand(desiredLevel);
  if (loaded) {
    installNaturalEarthDetail(desiredLevel, loaded);
    return;
  }

  const config = NATURAL_EARTH_LAND_DETAILS[desiredLevel];
  if (!config || pendingNaturalEarthDetail === desiredLevel) return;
  pendingNaturalEarthDetail = desiredLevel;
  const script = document.createElement("script");
  script.src = config.scriptPath;
  script.async = true;
  script.onload = () => {
    pendingNaturalEarthDetail = "";
    const loadedAfterScript = getLoadedNaturalEarthLand(desiredLevel);
    if (loadedAfterScript && getDesiredNaturalEarthDetailLevel() === desiredLevel) {
      installNaturalEarthDetail(desiredLevel, loadedAfterScript);
      scheduleGlobeRender();
    }
  };
  script.onerror = () => {
    pendingNaturalEarthDetail = "";
    console.warn(`Natural-Earth-Detailstufe ${desiredLevel} konnte nicht geladen werden.`);
  };
  document.head.appendChild(script);
}

function scheduleGlobeRender() {
  if (renderFrameId) return;
  renderFrameId = window.requestAnimationFrame(() => {
    renderFrameId = 0;
    renderGlobe();
  });
}

function scheduleNaturalEarthDetailUpdate(delay = 220) {
  window.clearTimeout(detailLoadTimer);
  detailLoadTimer = window.setTimeout(() => {
    detailLoadTimer = 0;
    requestNaturalEarthDetailForZoom();
    scheduleGlobeRender();
  }, delay);
}

function markGlobeNavigationActive() {
  isNavigatingGlobe = true;
  window.clearTimeout(navigationSettledTimer);
  navigationSettledTimer = window.setTimeout(() => {
    isNavigatingGlobe = false;
    scheduleNaturalEarthDetailUpdate(0);
    scheduleGlobeRender();
  }, 180);
}

function getInteractiveNaturalEarthSource() {
  if (!isNavigatingGlobe) return activeNaturalEarthSource;
  if (globeZoom >= NATURAL_EARTH_LAND_DETAILS["10m"].minZoom) {
    return getLoadedNaturalEarthLand("50m") || getLoadedNaturalEarthLand("110m") || activeNaturalEarthSource;
  }
  if (globeZoom >= NATURAL_EARTH_LAND_DETAILS["50m"].minZoom) {
    return getLoadedNaturalEarthLand("110m") || activeNaturalEarthSource;
  }
  return activeNaturalEarthSource;
}

function sanitizeRing(coordinates) {
  return coordinates
    .filter((point) => Array.isArray(point) && Number.isFinite(point[0]) && Number.isFinite(point[1]))
    .map(([lon, lat]) => [lon, lat]);
}

function extractLandRings(geojson) {
  const rings = [];
  const features = Array.isArray(geojson?.features) ? geojson.features : [];
  features.forEach((feature) => {
    const geometry = feature?.geometry;
    if (!geometry) return;
    if (geometry.type === "Polygon") {
      const outerRing = sanitizeRing(geometry.coordinates?.[0] || []);
      if (outerRing.length > 2) rings.push(outerRing);
    }
    if (geometry.type === "MultiPolygon") {
      geometry.coordinates?.forEach((polygon) => {
        const outerRing = sanitizeRing(polygon?.[0] || []);
        if (outerRing.length > 2) rings.push(outerRing);
      });
    }
  });
  return rings;
}

function getRingBounds(ring) {
  const lons = ring.map(([lon]) => lon);
  const lats = ring.map(([, lat]) => lat);
  return {
    minLon: Math.max(-180, Math.min(...lons)),
    maxLon: Math.min(180, Math.max(...lons)),
    minLat: Math.max(-88, Math.min(...lats)),
    maxLat: Math.min(88, Math.max(...lats)),
  };
}

function pointInPolygon(lon, lat, polygon) {
  let inside = false;
  for (let index = 0, previousIndex = polygon.length - 1; index < polygon.length; previousIndex = index, index += 1) {
    const [lonA, latA] = polygon[index];
    const [lonB, latB] = polygon[previousIndex];
    const crosses = (latA > lat) !== (latB > lat);
    const atLon = ((lonB - lonA) * (lat - latA)) / ((latB - latA) || 1) + lonA;
    if (crosses && lon < atLon) inside = !inside;
  }
  return inside;
}

function createLandSamples(rings, step = 1.35) {
  const samples = [];
  rings.forEach((ring) => {
    const bounds = getRingBounds(ring);
    const minLon = Math.floor(bounds.minLon / step) * step;
    const maxLon = Math.ceil(bounds.maxLon / step) * step;
    const minLat = Math.floor(bounds.minLat / step) * step;
    const maxLat = Math.ceil(bounds.maxLat / step) * step;
    for (let lon = minLon; lon <= maxLon; lon += step) {
      for (let lat = minLat; lat <= maxLat; lat += step) {
        const sampleLon = lon + step / 2;
        const sampleLat = lat + step / 2;
        if (!pointInPolygon(sampleLon, sampleLat, ring)) continue;
        samples.push({ lon: sampleLon, lat: sampleLat });
      }
    }
  });
  return samples;
}

function installLandGeoJson(geojson) {
  const landRings = extractLandRings(geojson);
  geoState.landRings = landRings;
  geoState.landSamples = [];
  geoState.samplesReady = false;
  geoState.status = landRings.length ? "ready" : "empty";
}

if (activeNaturalEarthSource) {
  installNaturalEarthDetail("110m", activeNaturalEarthSource);
} else {
  geoState.status = "missing";
}

function buildLandSamplesDeferred() {
  if (geoState.status !== "ready" || geoState.samplesReady) return;
  const rings = [...geoState.landRings];
  let processedRings = 0;
  geoState.landSamples = [];
  geoState.samplesReady = true;
  const processNextRing = () => {
    const ring = rings.shift();
    if (!ring) {
      renderGlobe();
      return;
    }
    geoState.landSamples.push(...createLandSamples([ring], 0.95));
    processedRings += 1;
    if (processedRings % 10 === 0) renderGlobe();
    window.setTimeout(processNextRing, 0);
  };
  window.setTimeout(processNextRing, 80);
}

let dragState = null;
let rotation = { lon: -18, lat: -8 };
let globeZoom = 1;
const MIN_GLOBE_ZOOM = 1;
const MAX_GLOBE_ZOOM = 9;
let renderFrameId = 0;
let detailLoadTimer = 0;
let navigationSettledTimer = 0;
let isNavigatingGlobe = false;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function normalizeLonDelta(delta) {
  if (delta > 180) return delta - 360;
  if (delta < -180) return delta + 360;
  return delta;
}

function densifyRing(points, maxStep = 4) {
  const result = [];
  points.forEach(([lon, lat], index) => {
    const [nextLon, nextLat] = points[(index + 1) % points.length];
    const lonDelta = normalizeLonDelta(nextLon - lon);
    const latDelta = nextLat - lat;
    const steps = Math.max(1, Math.ceil(Math.max(Math.abs(lonDelta), Math.abs(latDelta)) / maxStep));
    for (let step = 0; step < steps; step += 1) {
      const t = step / steps;
      result.push([lon + lonDelta * t, lat + latDelta * t]);
    }
  });
  return result;
}

function toRotatedUnit(lon, lat) {
  const lambda = (lon + rotation.lon) * DEG;
  const phi = lat * DEG;
  const tilt = rotation.lat * DEG;
  const cosPhi = Math.cos(phi);
  const x0 = cosPhi * Math.sin(lambda);
  const y0 = Math.sin(phi);
  const z0 = cosPhi * Math.cos(lambda);
  const y = y0 * Math.cos(tilt) - z0 * Math.sin(tilt);
  const z = y0 * Math.sin(tilt) + z0 * Math.cos(tilt);
  return { x: x0, y, z };
}

function projectVector(vector, radius, centerX, centerY) {
  return { x: centerX + radius * vector.x, y: centerY - radius * vector.y, z: vector.z };
}

function project(lon, lat, radius, centerX, centerY) {
  return projectVector(toRotatedUnit(lon, lat), radius, centerX, centerY);
}

function drawSphere(size, radius, center) {
  const sea = ctx.createRadialGradient(center.x - radius * 0.28, center.y - radius * 0.34, radius * 0.12, center.x, center.y, radius);
  sea.addColorStop(0, "#ffffff");
  sea.addColorStop(0.62, "#f3f3f1");
  sea.addColorStop(1, "#dcdeda");
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = sea;
  ctx.fill();
  ctx.lineWidth = Math.max(2, size * 0.006);
  ctx.strokeStyle = "rgba(142,146,142,.72)";
  ctx.stroke();
}

function createOrthographicProjection(radius, center) {
  return window.d3.geoOrthographic()
    .translate([center.x, center.y])
    .scale(radius)
    .rotate([rotation.lon, rotation.lat])
    .clipAngle(90)
    .precision(0.25);
}

function drawGeographicLayer(radius, center) {
  const renderSource = getInteractiveNaturalEarthSource();
  if (!hasD3Geo || !renderSource) return false;

  const projection = createOrthographicProjection(radius, center);
  const path = window.d3.geoPath(projection, ctx);

  // Architekturregel: Ab hier ist GeoJSON im Koordinatensystem WGS84 /
  // lon-lat die einzige Datenquelle für sichtbare Landformen. D3 übernimmt
  // Orthographic Projection und Horizon-Clipping; dadurch liegen Kontinente
  // exakt auf der Kugeloberfläche und werden nicht grafisch verschoben.
  ctx.beginPath();
  path(renderSource);
  ctx.fillStyle = "rgba(178,178,176,.82)";
  ctx.fill();

  ctx.beginPath();
  path(renderSource);
  ctx.strokeStyle = "rgba(92,96,94,.46)";
  ctx.lineWidth = Math.max(0.7, radius * 0.0018);
  ctx.stroke();

  return true;
}

function drawProjectBoundaryLayers(radius, center) {
  if (!hasD3Geo) return false;
  const items = getVisibleBoundaryMapItems();
  if (!items.length) return false;
  const projection = createOrthographicProjection(radius, center);
  const path = window.d3.geoPath(projection, ctx);
  let drewLayer = false;

  items.forEach((item) => {
    const provider = item.geometryRef?.provider || "";
    const canUseNaturalEarthFallback = provider === "natural-earth"
      || item.source === "Natural Earth"
      || (provider === "geoboundaries" && String(item.adminLevel || "").toUpperCase() === "ADM0");
    const feature = canUseNaturalEarthFallback
      ? getNaturalEarthCountryFeatureByIso3(item.geometryRef?.iso3 || item.iso3)
      : null;
    if (!feature) return;

    const featureCollection = { type: "FeatureCollection", features: [feature] };
    const color = item.display?.color || "#c6a86a";

    ctx.beginPath();
    path(featureCollection);
    ctx.fillStyle = hexToRgba(color, 0.78);
    ctx.fill();

    ctx.beginPath();
    path(featureCollection);
    ctx.strokeStyle = hexToRgba(color, 0.98);
    ctx.lineWidth = Math.max(1.15, radius * 0.0042);
    ctx.stroke();

    drewLayer = true;
  });

  return drewLayer;
}

function drawProjectedLine(points, radius, center, strokeStyle, lineWidth) {
  let drawing = false;
  ctx.beginPath();
  points.forEach(([lon, lat]) => {
    const point = project(lon, lat, radius, center.x, center.y);
    if (point.z <= 0) {
      drawing = false;
      return;
    }
    if (!drawing) {
      ctx.moveTo(point.x, point.y);
      drawing = true;
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
}

function drawProjectedFill(points, radius, center, fillStyle) {
  let drawing = false;
  let segmentPoints = 0;
  let filled = false;
  ctx.beginPath();
  points.forEach(([lon, lat]) => {
    const point = project(lon, lat, radius, center.x, center.y);
    if (point.z <= 0.006) {
      if (segmentPoints > 2) {
        ctx.closePath();
        filled = true;
      }
      drawing = false;
      segmentPoints = 0;
      return;
    }
    if (!drawing) {
      ctx.moveTo(point.x, point.y);
      drawing = true;
      segmentPoints = 1;
    } else {
      ctx.lineTo(point.x, point.y);
      segmentPoints += 1;
    }
  });
  if (segmentPoints > 2) {
    ctx.closePath();
    filled = true;
  }
  if (!filled) return;
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

function ringIsFullyVisible(points, horizonPadding = 0.018) {
  return points.every(([lon, lat]) => toRotatedUnit(lon, lat).z > horizonPadding);
}

function drawGraticule(radius, center) {
  const strokeStyle = "rgba(60,64,63,.26)";
  const lineWidth = Math.max(0.75, radius * 0.0022);
  for (let lon = -180; lon <= 180; lon += 30) {
    const points = [];
    for (let lat = -84; lat <= 84; lat += 3) points.push([lon, lat]);
    drawProjectedLine(points, radius, center, strokeStyle, lineWidth);
  }
  for (let lat = -60; lat <= 60; lat += 20) {
    const points = [];
    for (let lon = -180; lon <= 180; lon += 3) points.push([lon, lat]);
    drawProjectedLine(points, radius, center, strokeStyle, lineWidth);
  }
}

function drawLand(radius, center) {
  if (geoState.status !== "ready") {
    ctx.save();
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(255,255,248,.62)";
    ctx.font = `${Math.max(11, radius * 0.055)}px Source Sans 3, system-ui, sans-serif`;
    ctx.fillText("Geodaten werden vorbereitet", center.x, center.y);
    ctx.restore();
    return;
  }

  geoState.landRings.forEach((ring) => {
    const denseRing = densifyRing(ring, 1.4);
    if (ringIsFullyVisible(denseRing)) {
      drawProjectedFill(denseRing, radius, center, "rgba(176,176,174,.72)");
    }
  });

  if (geoState.samplesReady) {
    const dotRadius = Math.max(1.85, radius * 0.011);
    geoState.landSamples.forEach(({ lon, lat }) => {
      const vector = toRotatedUnit(lon, lat);
      if (vector.z <= 0.01) return;
      const point = projectVector(vector, radius, center.x, center.y);
      const alpha = clamp(0.48 + vector.z * 0.24, 0.44, 0.76);
      ctx.beginPath();
      ctx.arc(point.x, point.y, dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(178,178,176,${alpha})`;
      ctx.fill();
    });
  }

  geoState.landRings.forEach((ring) => {
    drawProjectedLine(densifyRing(ring, 1.2), radius, center, "rgba(92,96,94,.5)", Math.max(0.7, radius * 0.002));
  });
}

function drawAtmosphere(size, radius, center) {
  const shade = ctx.createRadialGradient(center.x - radius * 0.34, center.y - radius * 0.36, radius * 0.05, center.x, center.y, radius);
  shade.addColorStop(0, "rgba(255,255,255,.18)");
  shade.addColorStop(0.38, "rgba(255,255,255,.03)");
  shade.addColorStop(0.76, "rgba(0,0,0,0)");
  shade.addColorStop(1, "rgba(80,84,82,.16)");
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = shade;
  ctx.fill();
  ctx.lineWidth = Math.max(1, size * 0.004);
  ctx.strokeStyle = "rgba(92,96,94,.28)";
  ctx.stroke();
}

function renderGlobe() {
  const rect = ui.globe.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  const baseSize = Math.min(width, height);
  ui.globeCanvas.width = Math.floor(width * dpr);
  ui.globeCanvas.height = Math.floor(height * dpr);
  ui.globeCanvas.style.width = `${width}px`;
  ui.globeCanvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  // Darstellungsregel: Zoom 1 ist immer die vollständig sichtbare Startkugel.
  // Alle höheren Zoomstufen skalieren von diesem fensterabhängigen Fit-Radius
  // aus; dadurch bleibt die kleinste Ansicht auch bei Resize zuverlässig zentriert
  // und vollständig im verfügbaren Renderbereich.
  const radius = baseSize * 0.47 * globeZoom;
  const center = { x: width / 2, y: height / 2 };
  const visualSize = baseSize * globeZoom;
  drawSphere(visualSize, radius, center);
  ctx.save();
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.clip();
  const usedGeographicProjection = drawGeographicLayer(radius, center);
  if (!usedGeographicProjection) {
    drawLand(radius, center);
  }
  drawProjectBoundaryLayers(radius, center);
  drawAtmosphere(visualSize, radius, center);
  ctx.restore();
}

function renderProjectBrowser() {
  ui.projectBrowserList.replaceChildren(...state.projects.map((project) => {
    const boundarySet = getActiveBoundarySet(project);
    const card = document.createElement("button");
    card.type = "button";
    card.className = "project-card";
    if (project.id === state.activeProjectId) card.classList.add("is-active");
    card.dataset.projectId = project.id;
    const title = document.createElement("strong");
    title.textContent = project.title;
    const meta = document.createElement("span");
    meta.textContent = [
      boundarySet?.label || "ohne Grenzgrundlage",
      `${boundarySet?.detailStrategy?.length || 0} Detailstufen`,
      project.status,
    ].join(" · ");
    card.append(title, meta);
    return card;
  }));
}

function renderLibraryBrowser() {
  const project = getActiveProject();
  if (!ui.libraryBrowserList) return;
  if (!project) {
    ui.libraryBrowserList.replaceChildren();
    return;
  }

  const heading = document.createElement("div");
  heading.className = "library-browser-heading";
  heading.innerHTML = "<span class=\"label\">Projektbibliothek</span><strong>Ordner</strong>";

  const folderCards = (project.libraryFolders || []).map((folder) => {
    const wrapper = document.createElement("section");
    wrapper.className = "library-folder-card";

    const head = document.createElement("div");
    head.className = "library-folder-head";
    const title = document.createElement("strong");
    title.textContent = folder.title;
    const meta = document.createElement("span");
    meta.textContent = `${folder.items?.length || 0} Einträge · ${folder.description}`;
    head.append(title, meta);
    wrapper.append(head);

    const list = document.createElement("div");
    list.className = "library-item-list";
    const items = Array.isArray(folder.items) ? folder.items : [];
    if (!items.length) {
      const empty = document.createElement("p");
      empty.className = "library-empty";
      empty.textContent = folder.type === "boundary-maps"
        ? "Noch keine Länderkarten hinzugefügt."
        : "Noch leer.";
      list.append(empty);
    } else {
      items.forEach((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "library-item-card";
        button.dataset.libraryItemId = item.id;
        button.classList.toggle("is-active", item.id === project.activeLibraryItemId);
        button.style.setProperty("--layer-color", item.display?.color || "#c6a86a");
        const itemTitle = document.createElement("strong");
        itemTitle.textContent = item.name;
        const itemMeta = document.createElement("span");
        itemMeta.textContent = [item.source, item.adminLevel, item.detail].filter(Boolean).join(" · ");
        button.append(itemTitle, itemMeta);
        list.append(button);
      });
    }
    wrapper.append(list);
    return wrapper;
  });

  ui.libraryBrowserList.replaceChildren(heading, ...folderCards);
}

function renderBoundaryEditor() {
  const project = getActiveProject();
  const boundarySet = getActiveBoundarySet(project);
  if (!project || !boundarySet) {
    ui.boundarySummary.textContent = "Noch kein Earth-Map-Projekt ausgewählt.";
    ui.boundaryLevelList.replaceChildren();
    return;
  }
  ui.boundarySummary.textContent = `${boundarySet.label} ist als Grenzgrundlage dieses Projekts angelegt. Die Detailstufen werden später je nach Zoom automatisch geladen. Das Boundary-Set kann perspektivisch durch andere Geometriebasen ersetzt werden, etwa paläogeografische Rekonstruktionen.`;
  ui.boundaryLevelList.replaceChildren(...(boundarySet.detailStrategy || []).map((level) => {
    const item = document.createElement("div");
    item.className = "boundary-level-item";
    const title = document.createElement("strong");
    title.textContent = level.label;
    const detail = document.createElement("span");
    detail.textContent = `${level.use} · ab Zoom ${level.minZoom} · ${level.path}`;
    item.append(title, detail);
    return item;
  }));
}

function renderLayerEditor() {
  const project = getActiveProject();
  const item = getActiveLibraryItem(project);
  if (!ui.layerEditorTitle || !ui.layerEditorSummary || !ui.layerEditorContent || !ui.layerMetaList) return;
  if (!item) {
    ui.layerEditorTitle.textContent = "Keine Karte ausgewählt";
    ui.layerEditorSummary.textContent = "Wähle links in der Projektbibliothek eine hinzugefügte Länderkarte aus.";
    ui.layerEditorContent.hidden = true;
    if (ui.layerColorPaletteButton) ui.layerColorPaletteButton.disabled = true;
    ui.layerMetaList.replaceChildren();
    return;
  }

  ui.layerEditorTitle.textContent = item.name;
  ui.layerEditorSummary.textContent = "Anzeigeoptionen und Herkunftsdaten dieser Karte.";
  ui.layerEditorContent.hidden = false;
  if (ui.layerColorPaletteButton) ui.layerColorPaletteButton.disabled = false;
  if (ui.layerColorInput) ui.layerColorInput.value = item.display?.color || "#c6a86a";

  const rows = [
    ["Quelle", item.source || "—"],
    ["ISO-3", item.iso3 || "—"],
    ["Ebene", item.adminLevel || "—"],
    ["Detailtiefe", item.detail || "—"],
    ["Zeitspanne", item.temporalCoverage?.label || "gegenwärtig / aktuell"],
    ["Lizenz", item.license || "—"],
    ["Importiert", formatDateTime(item.importedAt) || "—"],
    ["Referenz", item.sourceUrl || item.geometryRef?.path || "—"],
  ];
  ui.layerMetaList.replaceChildren(...rows.flatMap(([term, description]) => {
    const dt = document.createElement("dt");
    dt.textContent = term;
    const dd = document.createElement("dd");
    dd.textContent = description;
    return [dt, dd];
  }));
}

function renderWorkspace() {
  renderProjectBrowser();
  renderLibraryBrowser();
  renderBoundaryEditor();
  renderLayerEditor();
}

function setEditorTab(tabName) {
  document.querySelectorAll("[data-editor-tab]").forEach((tab) => {
    const isActive = tab.dataset.editorTab === tabName;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
  document.querySelectorAll("[data-editor-panel]").forEach((panel) => {
    const isActive = panel.dataset.editorPanel === tabName;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

function normalizeSearchText(value) {
  return String(value || "")
    .toLocaleLowerCase("de-DE")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getNaturalEarthCountryName(feature) {
  return feature?.properties?.NAME_DE
    || feature?.properties?.NAME
    || feature?.properties?.ADMIN
    || feature?.properties?.NAME_LONG
    || "Unbenanntes Land";
}

function getNaturalEarthIso3(feature) {
  const props = feature?.properties || {};
  return props.ISO_A3_EH || props.ISO_A3 || props.ADM0_A3 || "";
}

function searchNaturalEarthCountries(query) {
  const normalizedQuery = normalizeSearchText(query);
  const features = window.EarthMapNaturalEarthCountries?.features || [];
  if (!normalizedQuery) return [];
  return features
    .filter((feature) => {
      const props = feature.properties || {};
      const haystack = [
        props.NAME_DE, props.NAME, props.ADMIN, props.NAME_LONG, props.SOVEREIGNT,
        props.ISO_A3, props.ISO_A3_EH, props.ADM0_A3,
      ].map(normalizeSearchText).join(" ");
      return haystack.includes(normalizedQuery);
    })
    .slice(0, 8)
    .map((feature) => ({
      id: `natural-earth-${getNaturalEarthIso3(feature) || getNaturalEarthCountryName(feature)}`,
      name: getNaturalEarthCountryName(feature),
      source: "Natural Earth",
      level: "ADM0 · Land",
      detail: "110m · lokale Grunddaten",
      license: "Public Domain",
      iso3: getNaturalEarthIso3(feature),
      importStatus: "bereit",
    }));
}

function buildGeoBoundariesCandidates(naturalEarthResults, query) {
  const directIso = query.trim().toUpperCase();
  const isoCandidates = new Set();
  if (/^[A-Z]{3}$/.test(directIso)) isoCandidates.add(directIso);
  naturalEarthResults.forEach((result) => {
    if (/^[A-Z]{3}$/.test(result.iso3)) isoCandidates.add(result.iso3);
  });
  return [...isoCandidates].flatMap((iso3) => ["ADM0", "ADM1", "ADM2"].map((adm) => ({
    id: `geoboundaries-${iso3}-${adm}`,
    name: `${iso3} · ${adm}`,
    source: "geoBoundaries",
    level: adm,
    detail: adm === "ADM0" ? "Staatsgrenze" : "Verwaltungsebene",
    license: "gbOpen · CC BY 4.0",
    iso3,
    apiUrl: `https://www.geoboundaries.org/api/current/gbOpen/${iso3}/${adm}/`,
    importStatus: "online abrufbar",
  })));
}

function createLayerItemFromSearchResult(result) {
  const isNaturalEarth = result.source === "Natural Earth";
  return normalizeLibraryItem({
    id: `layer-${result.source.toLowerCase().replace(/\W+/g, "-")}-${result.iso3 || result.id}-${Date.now()}`,
    kind: "boundary-map",
    name: result.name,
    source: result.source,
    iso3: result.iso3,
    adminLevel: result.level,
    detail: result.detail,
    license: result.license,
    sourceUrl: result.apiUrl || (isNaturalEarth ? "data/natural-earth/110m/ne_110m_admin_0_countries.geojson" : ""),
    temporalCoverage: {
      label: isNaturalEarth ? "gegenwärtige Natural-Earth-Grundkarte" : "gegenwärtige geoBoundaries-Grenzfassung",
      from: "",
      to: "",
    },
    display: {
      visible: true,
      color: "#c6a86a",
    },
    geometryRef: isNaturalEarth
      ? { provider: "natural-earth", detail: "110m", dataset: "admin_0_countries", iso3: result.iso3 }
      : { provider: "geoboundaries", apiUrl: result.apiUrl, iso3: result.iso3, level: result.level },
  });
}

function addBoundaryLayerFromSearchResult(result) {
  const project = getActiveProject();
  const folder = getLibraryFolder(project, "boundary-maps");
  if (!project || !folder) return;
  const item = createLayerItemFromSearchResult(result);
  const duplicate = folder.items.find((candidate) => (
    candidate.source === item.source
    && candidate.iso3 === item.iso3
    && candidate.adminLevel === item.adminLevel
    && candidate.detail === item.detail
  ));
  const activeItem = duplicate || item;
  if (!duplicate) folder.items.push(item);
  project.activeLibraryItemId = activeItem.id;
  persistProjects();
  renderWorkspace();
  renderGlobe();
  setEditorTab("layer-editor");
}

function createBoundarySearchCard(result) {
  const card = document.createElement("article");
  card.className = "search-result-card";
  const head = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = result.name;
  const meta = document.createElement("span");
  meta.textContent = `${result.source} · ${result.level} · ${result.detail}`;
  head.append(title, meta);

  const license = document.createElement("p");
  license.textContent = `Lizenz/Status: ${result.license} · ${result.importStatus}`;

  const action = document.createElement("button");
  action.type = "button";
  action.className = "secondary-button";
  action.textContent = "Hinzufügen";
  action.title = result.apiUrl || "In die Projektbibliothek übernehmen.";
  action.addEventListener("click", () => addBoundaryLayerFromSearchResult(result));

  card.append(head, license, action);
  return card;
}

function renderBoundarySearchResults() {
  const query = ui.boundarySearchInput?.value?.trim() || "";
  const useNaturalEarth = Boolean(document.getElementById("sourceNaturalEarth")?.checked);
  const useGeoBoundaries = Boolean(document.getElementById("sourceGeoBoundaries")?.checked);
  if (!query) {
    const note = document.createElement("p");
    note.className = "empty-state";
    note.textContent = "Bitte Suchbegriff eingeben.";
    ui.boundarySearchResults.replaceChildren(note);
    return;
  }

  const naturalEarthResults = useNaturalEarth ? searchNaturalEarthCountries(query) : [];
  const geoBoundariesResults = useGeoBoundaries ? buildGeoBoundariesCandidates(naturalEarthResults, query) : [];
  const results = [...naturalEarthResults, ...geoBoundariesResults];
  if (!results.length) {
    const note = document.createElement("p");
    note.className = "empty-state";
    note.textContent = "Keine Treffer gefunden. Tipp: Für geoBoundaries kann direkt ein ISO-3-Code wie DEU, FRA oder BRA gesucht werden.";
    ui.boundarySearchResults.replaceChildren(note);
    return;
  }

  ui.boundarySearchResults.replaceChildren(...results.map(createBoundarySearchCard));
}

ui.menuButton.addEventListener("click", () => setMenuOpen(ui.menuButton.getAttribute("aria-expanded") !== "true"));
ui.menuCloseButton.addEventListener("click", () => setMenuOpen(false));
ui.menuOverlay.addEventListener("click", () => setMenuOpen(false));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

document.querySelectorAll("[data-editor-tab]").forEach((tab) => {
  tab.addEventListener("click", () => setEditorTab(tab.dataset.editorTab));
});

ui.boundarySearchButton?.addEventListener("click", renderBoundarySearchResults);
ui.boundarySearchInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") renderBoundarySearchResults();
});

ui.openWorkspaceButton.addEventListener("click", () => setWorkspaceMode("details"));
ui.returnPreviewButton.addEventListener("click", () => setWorkspaceMode("preview"));
ui.newProjectButton.addEventListener("click", () => {
  const project = normalizeProject(createGlobeMapProject());
  state.projects.push(project);
  state.activeProjectId = project.id;
  persistProjects();
  renderWorkspace();
  renderGlobe();
});
ui.projectBrowserList.addEventListener("click", (event) => {
  const card = event.target.closest("[data-project-id]");
  if (!card) return;
  state.activeProjectId = card.dataset.projectId;
  persistProjects();
  renderWorkspace();
});
ui.libraryBrowserList?.addEventListener("click", (event) => {
  const card = event.target.closest("[data-library-item-id]");
  if (!card) return;
  const project = getActiveProject();
  if (!project) return;
  project.activeLibraryItemId = card.dataset.libraryItemId || "";
  persistProjects();
  renderWorkspace();
  renderGlobe();
  setEditorTab("layer-editor");
});
ui.layerColorInput?.addEventListener("input", () => {
  applyLayerColor(ui.layerColorInput.value || "#c6a86a");
});
setupLayerColorPalette();

ui.globe.addEventListener("pointerdown", (event) => {
  markGlobeNavigationActive();
  dragState = { pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, startRotation: { ...rotation } };
  ui.globe.setPointerCapture?.(event.pointerId);
});

ui.globe.addEventListener("pointermove", (event) => {
  if (!dragState || dragState.pointerId !== event.pointerId) return;
  markGlobeNavigationActive();
  const dragSensitivity = 1 / Math.sqrt(globeZoom);
  rotation.lon = dragState.startRotation.lon + (event.clientX - dragState.startX) * 0.45 * dragSensitivity;
  rotation.lat = clamp(dragState.startRotation.lat - (event.clientY - dragState.startY) * 0.28 * dragSensitivity, -58, 58);
  scheduleGlobeRender();
});

ui.globe.addEventListener("wheel", (event) => {
  event.preventDefault();
  markGlobeNavigationActive();
  const zoomFactor = Math.exp(-event.deltaY * 0.0014);
  globeZoom = clamp(globeZoom * zoomFactor, MIN_GLOBE_ZOOM, MAX_GLOBE_ZOOM);
  scheduleGlobeRender();
  scheduleNaturalEarthDetailUpdate(280);
}, { passive: false });

["pointerup", "pointercancel", "lostpointercapture"].forEach((type) => {
  ui.globe.addEventListener(type, () => {
    dragState = null;
    markGlobeNavigationActive();
    scheduleNaturalEarthDetailUpdate(160);
  });
});

window.addEventListener("resize", scheduleGlobeRender);
renderWorkspace();
renderGlobe();
if (!hasD3Geo) buildLandSamplesDeferred();

