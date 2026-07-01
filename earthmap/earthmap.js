const ui = Object.fromEntries([
  "globeApp", "menuButton", "menuCloseButton", "menuOverlay", "sideMenu",
  "themeToggleButton", "themeToggleIcon", "exportProjectButton", "exportMenu",
  "openWorkspaceButton", "returnPreviewButton", "globe", "globeCanvas",
  "browserActionsMenuButton", "browserActionsMenu",
  "newProjectButton", "importBoundarySetButton", "boundarySetImportInput", "projectBrowserList", "libraryBrowserList",
  "boundarySearchInput", "boundarySearchButton", "boundarySearchResults",
  "layerEditorTitle", "layerEditorSummary", "layerEditorContent", "layerMetaList",
].map((id) => [id, document.getElementById(id)]));

const DEFAULT_LAYER_FILL_COLOR = "#c6a86a";
const DEFAULT_LAYER_OUTLINE_COLOR = "#8f9690";

function initializeEarthMapEditorShell() {
  const editorPanel = document.querySelector(".editor-panel");
  const tabs = editorPanel?.querySelector(".editor-tabs");
  const searchPanel = document.getElementById("panelBoundarySearch");
  const layerPanel = document.getElementById("panelLayerEditor");
  if (!editorPanel || !tabs || !searchPanel) return;

  const makeTab = (id, panel, label, active = false) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `editor-tab${active ? " is-active" : ""}`;
    button.id = id;
    button.dataset.editorTab = panel;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", active ? "true" : "false");
    button.setAttribute("aria-controls", `panel-${panel}`);
    button.textContent = label;
    return button;
  };

  tabs.replaceChildren(
    makeTab("tabBackground", "background", "Hintergrund", true),
    makeTab("tabSingleMaps", "single-maps", "Einzelkarten"),
    makeTab("tabCollections", "collections", "Sammlungen"),
    makeTab("tabAnimations", "animations", "Animationen"),
  );

  const backgroundPanel = document.createElement("section");
  backgroundPanel.id = "panelBackground";
  backgroundPanel.className = "editor-tab-panel is-active";
  backgroundPanel.dataset.editorPanel = "background";
  backgroundPanel.setAttribute("role", "tabpanel");
  backgroundPanel.setAttribute("aria-labelledby", "tabBackground");
  backgroundPanel.innerHTML = `
    <div class="editor-section">
      <h3>Kontinentalkarten</h3>
      <p>Hier werden die Hintergrund- und Kontinentalkarten des aktiven Projekts bearbeitet. Die Natural-Earth-10m-Küstenlinien liegen bereits im Browser unter Kontinentalkarten und können dort ein- oder ausgeschaltet werden.</p>
    </div>
  `;

  searchPanel.id = "panelSingleMaps";
  searchPanel.dataset.editorPanel = "single-maps";
  searchPanel.setAttribute("aria-labelledby", "tabSingleMaps");
  searchPanel.classList.remove("is-active");
  searchPanel.hidden = true;
  const firstSearchHeading = searchPanel.querySelector(".editor-section h3");
  if (firstSearchHeading) firstSearchHeading.textContent = "Suche";
  searchPanel.querySelectorAll(":scope > .editor-section").forEach((section) => {
    section.classList.add("single-map-tool-section");
  });
  if (layerPanel) {
    const objectEditor = document.createElement("div");
    objectEditor.id = "mapObjectEditor";
    objectEditor.className = "map-object-editor";
    objectEditor.hidden = true;
    while (layerPanel.firstChild) objectEditor.appendChild(layerPanel.firstChild);
    searchPanel.appendChild(objectEditor);
    layerPanel.remove();
  }

  const collectionsPanel = document.createElement("section");
  collectionsPanel.id = "panelCollections";
  collectionsPanel.className = "editor-tab-panel";
  collectionsPanel.dataset.editorPanel = "collections";
  collectionsPanel.setAttribute("role", "tabpanel");
  collectionsPanel.setAttribute("aria-labelledby", "tabCollections");
  collectionsPanel.hidden = true;
  collectionsPanel.innerHTML = `
    <div class="editor-section collection-tool-section">
      <h3>Importieren</h3>
      <p>Lade GeoJSON, KML, KMZ oder ein Ziselin-Boundary-Set. Die Sammlung wird zuerst hier geprüft, in unser GeoJSON-Modell normalisiert und erst mit „Zum Projekt hinzufügen“ in das aktive Projekt übernommen.</p>
      <button type="button" id="importBoundarySetButton" class="secondary-button">Vom Desktop importieren</button>
    </div>
    <div class="editor-section collection-tool-section">
      <h3 id="collectionImportTitle">Keine Sammlung geladen</h3>
      <p id="collectionImportSummary" class="empty-state">Importiere eine Kartensammlung, um Quelle, Lizenz, Einheiten und Kompatibilität zu prüfen.</p>
      <div id="collectionImportContent" class="layer-editor-content" hidden>
        <dl id="collectionImportMetaList" class="layer-meta-list"></dl>
        <button type="button" id="addCollectionToProjectButton" class="secondary-button">Zum Projekt hinzufügen</button>
      </div>
    </div>
  `;

  const animationsPanel = document.createElement("section");
  animationsPanel.id = "panelAnimations";
  animationsPanel.className = "editor-tab-panel";
  animationsPanel.dataset.editorPanel = "animations";
  animationsPanel.setAttribute("role", "tabpanel");
  animationsPanel.setAttribute("aria-labelledby", "tabAnimations");
  animationsPanel.hidden = true;
  animationsPanel.innerHTML = `<div class="editor-section"><p class="empty-state">Animationen werden vorbereitet.</p></div>`;

  tabs.insertAdjacentElement("afterend", backgroundPanel);
  searchPanel.insertAdjacentElement("afterend", collectionsPanel);
  collectionsPanel.insertAdjacentElement("afterend", animationsPanel);

  Object.assign(ui, Object.fromEntries([
    "mapObjectEditor", "importBoundarySetButton", "collectionImportTitle", "collectionImportSummary",
    "collectionImportContent", "collectionImportMetaList", "addCollectionToProjectButton",
  ].map((id) => [id, document.getElementById(id)])));
}

initializeEarthMapEditorShell();

const STORAGE_KEY = "earthmap-projects-v1";
const LEGACY_STORAGE_KEY = "globemap-projects-v1";
const THEME_STORAGE_KEY = "earthmap-theme";
const NATURAL_EARTH_ASSET_BASE = "../assets/geojson/natural-earth/";
const boundaryFeatureRenderCache = new Map();

const GEOMETRY_BASE_REGISTRY = {
  naturalEarthModern: {
    id: "natural-earth-modern",
    label: "Natural Earth · moderne Erde",
    kind: "modern-earth",
    source: "Natural Earth",
    geometryType: "political-and-physical-boundaries",
    detailLevels: [
      { id: "10m-hierarchy", label: "10m · Vektorhierarchie", use: "Algorithmische Detailsteuerung", path: `${NATURAL_EARTH_ASSET_BASE}10m/tiles-vector-hierarchy/` },
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
      minZoom: index === 0 ? 1 : index === 1 ? 7.05 : 16,
    })),
  }];
}

function createDefaultLibraryFolders() {
  return [
    {
      id: "folder-continental-maps",
      type: "continental-maps",
      title: "Kontinentalkarten",
      description: "Grundkarten für Kontinente, Küstenlinien und großräumige Landflächen.",
      items: [createDefaultContinentalMapItem()],
    },
    {
      id: "folder-boundary-maps",
      type: "boundary-maps",
      title: "Länderkarten",
      description: "Importierte Länder- und Grenzkarten dieses Projekts.",
      items: [],
    },
    {
      id: "folder-boundary-collections",
      type: "boundary-collections",
      title: "Kartensammlungen",
      description: "Standardisierte Boundary-Sets mit einzeln referenzierbaren Flächen.",
      items: [],
    },
  ];
}

function createDefaultContinentalMapItem() {
  return {
    id: "continental-natural-earth-10m-land",
    kind: "continental-map",
    name: "Natural Earth 10m Küstenlinien",
    source: "Natural Earth",
    adminLevel: "Landflächen / Küstenlinien",
    detail: "10m",
    license: "Public Domain",
    sourceUrl: `${NATURAL_EARTH_ASSET_BASE}10m/ne_10m_land.geojson`,
    importedAt: "system-default",
    temporalCoverage: {
      label: "gegenwärtige Natural-Earth-Grundkarte",
      from: "",
      to: "",
    },
    display: {
      visible: true,
      color: "#b8b8b4",
      outlineColor: "#8f9690",
    },
    geometryRef: {
      provider: "natural-earth",
      detail: "10m",
      dataset: "land",
    },
    locked: true,
  };
}

function createEarthMapProject(title = "Neues Earth-Map-Projekt") {
  return {
    id: `earthmap-${Date.now()}`,
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
      color: item?.display?.color || DEFAULT_LAYER_FILL_COLOR,
      outlineColor: item?.display?.outlineColor || item?.display?.strokeColor || DEFAULT_LAYER_OUTLINE_COLOR,
    },
    geometryRef: item?.geometryRef || null,
    boundarySet: item?.boundarySet || null,
    locked: item?.locked === true,
  };
}

function normalizeLibraryFolders(folders) {
  const defaults = createDefaultLibraryFolders();
  const incoming = Array.isArray(folders) ? folders : [];
  return defaults.map((folder) => {
    const existing = incoming.find((candidate) => candidate?.type === folder.type || candidate?.id === folder.id) || {};
    let items = Array.isArray(existing.items)
      ? existing.items.map(normalizeLibraryItem)
      : (folder.items || []).map(normalizeLibraryItem);
    if (folder.type === "continental-maps") {
      const defaultItem = normalizeLibraryItem(createDefaultContinentalMapItem());
      const existingDefault = items.find((item) => item.id === defaultItem.id);
      if (existingDefault) {
        Object.assign(existingDefault, {
          kind: defaultItem.kind,
          source: existingDefault.source || defaultItem.source,
          adminLevel: existingDefault.adminLevel || defaultItem.adminLevel,
          detail: existingDefault.detail || defaultItem.detail,
          license: existingDefault.license || defaultItem.license,
          sourceUrl: existingDefault.sourceUrl || defaultItem.sourceUrl,
          temporalCoverage: existingDefault.temporalCoverage || defaultItem.temporalCoverage,
          geometryRef: existingDefault.geometryRef || defaultItem.geometryRef,
          locked: true,
        });
      } else {
        items = [defaultItem, ...items];
      }
    }
    return {
      ...folder,
      ...existing,
      title: repairLegacyText(existing.title || folder.title),
      description: repairLegacyText(existing.description || folder.description),
      items,
    };
  });
}

function normalizeProject(project) {
  const normalized = {
    ...createEarthMapProject(project?.title || "Earth-Map-Projekt"),
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

function isGeneratedStartProject(project) {
  const boundaryMaps = getLibraryFolder(project, "boundary-maps")?.items || [];
  const hasLayers = Array.isArray(project?.dataLayers) && project.dataLayers.length > 0;
  // Migrationsregel: Frühere Builds haben die neutrale Start-Erde als echtes
  // Projekt "Weltkarte · Grundmodell" gespeichert. Diese Ansicht ist aber nur
  // der leere App-Zustand und darf nicht als Nutzerdatensatz weiterleben.
  return project?.title === "Weltkarte · Grundmodell" && !hasLayers && boundaryMaps.length === 0;
}

function loadProjects() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Array.isArray(parsed?.projects) && parsed.projects.length) {
      const projects = parsed.projects.map(normalizeProject).filter((project) => !isGeneratedStartProject(project));
      if (projects.length !== parsed.projects.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects }));
      }
      return projects;
    }
    const legacyParsed = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) || "null");
    if (Array.isArray(legacyParsed?.projects) && legacyParsed.projects.length) {
      const projects = legacyParsed.projects.map(normalizeProject).filter((project) => !isGeneratedStartProject(project));
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects }));
      return projects;
    }
  } catch (error) {
    console.warn("Earth-Map-Projekte konnten nicht gelesen werden.", error);
  }
  return [];
}

function createInitialCollapsedBrowserNodeIds(projects) {
  // Browserregel: Beim Start oder Refresh beginnt die Projektbibliothek
  // aufgeräumt. Die geöffneten Baumzustände sind reine Sitzungsgesten und
  // werden bewusst nicht dauerhaft gespeichert.
  return (projects || []).flatMap((project) => [
    `project:${project.id}`,
    ...(project.libraryFolders || []).map((folder) => `${folder.type}:${project.id}`),
  ]);
}

const state = {
  projects: loadProjects(),
  activeProjectId: "",
  openProjectBrowserMenuId: null,
  openFolderBrowserMenuId: null,
  openLayerBrowserMenuId: null,
  browserActionsMenuOpen: false,
  collapsedBrowserNodeIds: [],
  detailsLayoutMode: "normal",
  detailsLayoutStep: 0,
  pendingBoundarySetImport: null,
  editorMode: "tool",
  activeEditorTab: "background",
  activeEditorItemId: "",
  activeEditorChapterKey: "",
};

state.activeProjectId = state.projects[0]?.id || "";
state.collapsedBrowserNodeIds = createInitialCollapsedBrowserNodeIds(state.projects);
const PROJECT_DELETE_HOLD_MS = 820;
let projectDeleteHoldState = null;
let layerDeleteHoldState = null;

function persistProjects() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects: state.projects }));
    return true;
  } catch (error) {
    console.warn("Earth-Map-Projekte konnten nicht gespeichert werden.", error);
    return false;
  }
}

function getActiveProject() {
  return state.projects.find((project) => project.id === state.activeProjectId) || null;
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

function isBrowserNodeCollapsed(nodeId) {
  return state.collapsedBrowserNodeIds.includes(nodeId);
}

function toggleBrowserNode(nodeId) {
  const collapsed = new Set(state.collapsedBrowserNodeIds);
  if (collapsed.has(nodeId)) collapsed.delete(nodeId);
  else collapsed.add(nodeId);
  state.collapsedBrowserNodeIds = [...collapsed];
  renderProjectBrowser();
}

function getVisibleBoundaryMapItems(project = getActiveProject()) {
  const folder = getLibraryFolder(project, "boundary-maps");
  return (folder?.items || []).filter((item) => item.display?.visible !== false);
}

function getVisibleBoundaryCollectionItems(project = getActiveProject()) {
  const folder = getLibraryFolder(project, "boundary-collections");
  return (folder?.items || []).filter((item) => item.display?.visible !== false);
}

function getVisibleProjectBoundaryItems(project = getActiveProject()) {
  return [
    ...getVisibleBoundaryMapItems(project),
    ...getVisibleBoundaryCollectionItems(project),
  ];
}

function getContinentalMapItems(project = getActiveProject()) {
  const folder = getLibraryFolder(project, "continental-maps");
  return folder?.items || [];
}

function shouldRenderContinentalBaseMap(project = getActiveProject()) {
  // Architekturregel: Die neutrale Start-Erde bleibt sichtbar, solange noch kein
  // Projekt geladen ist. Sobald ein Projekt aktiv ist, steuert dessen
  // Kontinentalkarten-Ordner die Grundkarte ausdrücklich über die Browser-Checkbox.
  if (!project) return true;
  const defaultMap = getContinentalMapItems(project).find((item) => item.id === "continental-natural-earth-10m-land" || item.geometryRef?.dataset === "land");
  return defaultMap ? defaultMap.display?.visible !== false : true;
}

function getNaturalEarthCountryFeatureByIso3(iso3) {
  const normalizedIso3 = String(iso3 || "").toUpperCase();
  if (!normalizedIso3) return null;
  const features = getNaturalEarthCountryDataset().features;
  return features.find((feature) => getNaturalEarthIso3(feature).toUpperCase() === normalizedIso3) || null;
}

function getNaturalEarthCountryDataset() {
  const tenMeter = window.EarthMapNaturalEarthCountries10m;
  if (tenMeter?.features?.length) {
    return {
      detail: "10m",
      label: "10m · Natural-Earth-Admin-0",
      sourceUrl: `${NATURAL_EARTH_ASSET_BASE}10m/ne_10m_admin_0_countries.geojson`,
      features: tenMeter.features,
    };
  }
  const fallback = window.EarthMapNaturalEarthCountries;
  return {
    detail: "110m",
    label: "110m · Natural-Earth-Fallback",
    sourceUrl: `${NATURAL_EARTH_ASSET_BASE}110m/ne_110m_admin_0_countries.geojson`,
    features: fallback?.features || [],
  };
}

function getSquaredDistanceToSegment(point, start, end) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  if (dx === 0 && dy === 0) {
    const px = point[0] - start[0];
    const py = point[1] - start[1];
    return px * px + py * py;
  }
  const t = clamp(((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / (dx * dx + dy * dy), 0, 1);
  const projected = [start[0] + t * dx, start[1] + t * dy];
  const px = point[0] - projected[0];
  const py = point[1] - projected[1];
  return px * px + py * py;
}

function simplifyOpenLine(points, toleranceSquared, startIndex = 0, endIndex = points.length - 1, keep = new Set([0, points.length - 1])) {
  if (endIndex <= startIndex + 1) return keep;
  let maxDistance = 0;
  let splitIndex = -1;
  for (let index = startIndex + 1; index < endIndex; index += 1) {
    const distance = getSquaredDistanceToSegment(points[index], points[startIndex], points[endIndex]);
    if (distance > maxDistance) {
      maxDistance = distance;
      splitIndex = index;
    }
  }
  if (maxDistance > toleranceSquared && splitIndex > -1) {
    keep.add(splitIndex);
    simplifyOpenLine(points, toleranceSquared, startIndex, splitIndex, keep);
    simplifyOpenLine(points, toleranceSquared, splitIndex, endIndex, keep);
  }
  return keep;
}

function simplifyClosedRing(ring, tolerance) {
  const source = (ring || []).filter((point) => Number.isFinite(point?.[0]) && Number.isFinite(point?.[1]));
  if (source.length < 4 || tolerance <= 0) return source;
  const open = source.slice(0, -1);
  if (open.length < 3) return source;
  const keep = simplifyOpenLine(open, tolerance * tolerance);
  const simplified = [...keep].sort((a, b) => a - b).map((index) => open[index]);
  if (simplified.length < 3) return [];
  simplified.push(simplified[0]);
  return simplified;
}

function simplifyBoundaryFeatureForZoom(feature, detail) {
  if (!feature || detail !== "10m") return feature;
  const tolerance = Math.max(0.0001, getNaturalEarth10mDetailThreshold() * 0.7);
  const iso3 = getNaturalEarthIso3(feature) || feature.properties?.NAME || "unknown";
  const cacheKey = `${iso3}|${tolerance.toFixed(5)}`;
  if (boundaryFeatureRenderCache.has(cacheKey)) return boundaryFeatureRenderCache.get(cacheKey);
  if (boundaryFeatureRenderCache.size > 180) boundaryFeatureRenderCache.clear();

  // Renderregel: Natural-Earth-Länder verwenden den 10m-Masterdatensatz und
  // werden erst zur Anzeige vereinfacht. Dadurch bleiben Quellen-/Layerdaten
  // bibliotheksfähig, während die sichtbare Vektordichte denselben Zoomtakt
  // nutzt wie die Küstenlinien.
  const simplifyPolygon = (polygon) => (polygon || [])
    .map((ring) => simplifyClosedRing(ring, tolerance))
    .filter((ring) => ring.length >= 4);
  const geometry = feature.geometry?.type === "Polygon"
    ? { type: "Polygon", coordinates: simplifyPolygon(feature.geometry.coordinates) }
    : feature.geometry?.type === "MultiPolygon"
      ? { type: "MultiPolygon", coordinates: (feature.geometry.coordinates || []).map(simplifyPolygon).filter((polygon) => polygon.length) }
      : feature.geometry;
  const simplified = { ...feature, geometry };
  boundaryFeatureRenderCache.set(cacheKey, simplified);
  return simplified;
}

function getRenderableBoundaryFeature(item) {
  const provider = item?.geometryRef?.provider || "";
  if (provider !== "natural-earth" && item?.source !== "Natural Earth") return null;
  const dataset = getNaturalEarthCountryDataset();
  const feature = getNaturalEarthCountryFeatureByIso3(item.geometryRef?.iso3 || item.iso3);
  return simplifyBoundaryFeatureForZoom(feature, dataset.detail);
}

function getRenderableBoundaryFeatures(item) {
  if (item?.boundarySet?.features?.length) {
    return item.boundarySet.features
      .map((feature) => ({
        type: "Feature",
        properties: {
          ...(feature.properties || {}),
          ziselin_id: feature.id,
          name: feature.name,
          wikidata_id: feature.wikidata_id || "",
        },
        geometry: feature.geometry,
      }))
      .filter((feature) => feature.geometry);
  }
  const feature = getRenderableBoundaryFeature(item);
  return feature ? [feature] : [];
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
  pushColor(DEFAULT_LAYER_FILL_COLOR);
  pushColor(DEFAULT_LAYER_OUTLINE_COLOR);
  (project?.classification?.breaks || []).forEach((entry) => pushColor(entry?.color));
  (project?.libraryFolders || []).forEach((folder) => {
    (folder.items || []).forEach((item) => {
      pushColor(item?.display?.color);
      pushColor(item?.display?.outlineColor);
    });
  });
  (Array.isArray(extraColors) ? extraColors : [extraColors]).forEach(pushColor);
  return palette.slice(0, 12);
}

function formatDateTime(value) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
  } catch {
    return value;
  }
}

function slugifyFilename(value, fallback = "earth-map") {
  const slug = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function setWorkspaceMode(mode) {
  ui.globeApp.classList.toggle("workspace-mode-details", mode === "details");
  ui.globeApp.classList.toggle("workspace-mode-preview", mode !== "details");
  if (mode === "details") setDetailsLayoutMode(state.detailsLayoutMode);
}

function isNarrowDetailsViewport() {
  return window.matchMedia("(max-width: 900px)").matches;
}

function normalizeDetailsLayoutMode(mode) {
  if (isNarrowDetailsViewport()) return mode === "editor" ? "editor" : "browser";
  return ["normal", "browser", "editor"].includes(mode) ? mode : "normal";
}

function setDetailsLayoutMode(mode) {
  const normalizedMode = normalizeDetailsLayoutMode(mode);
  state.detailsLayoutMode = normalizedMode;
  ui.globeApp?.classList.toggle("details-layout-normal", normalizedMode === "normal");
  ui.globeApp?.classList.toggle("details-layout-browser", normalizedMode === "browser");
  ui.globeApp?.classList.toggle("details-layout-editor", normalizedMode === "editor");
}

function cycleDetailsLayoutMode() {
  if (isNarrowDetailsViewport()) {
    setDetailsLayoutMode(state.detailsLayoutMode === "browser" ? "editor" : "browser");
    return;
  }
  const order = ["normal", "browser", "normal", "editor"];
  state.detailsLayoutStep = (state.detailsLayoutStep + 1) % order.length;
  setDetailsLayoutMode(order[state.detailsLayoutStep]);
}

function setBrowserActionsMenuOpen(isOpen) {
  state.browserActionsMenuOpen = Boolean(isOpen);
  if (ui.browserActionsMenu) ui.browserActionsMenu.hidden = !state.browserActionsMenuOpen;
  ui.browserActionsMenuButton?.setAttribute("aria-expanded", state.browserActionsMenuOpen ? "true" : "false");
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

function setExportMenuOpen(isOpen) {
  if (ui.exportMenu) ui.exportMenu.hidden = !isOpen;
  ui.exportProjectButton?.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function setTheme(theme, persist = true) {
  const isDark = theme === "dark";
  document.body.classList.toggle("earthmap-theme-dark", isDark);
  ui.themeToggleButton?.setAttribute("aria-pressed", isDark ? "true" : "false");
  ui.themeToggleButton?.setAttribute("aria-label", isDark ? "Hellen Modus aktivieren" : "Dunklen Modus aktivieren");
  if (ui.themeToggleIcon) {
    ui.themeToggleIcon.src = isDark
      ? "https://api.iconify.design/boxicons/sun-bright.svg?color=%23ffb347"
      : "https://api.iconify.design/material-symbols-light/dark-mode-rounded.svg?color=%23213633";
  }
  if (ui.globeCanvas) renderGlobe();
  if (persist) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
    } catch (error) {
      console.warn("EarthMap theme preference could not be saved", error);
    }
  }
}

function getStoredTheme() {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch (error) {
    return "light";
  }
}

function toggleTheme() {
  setTheme(document.body.classList.contains("earthmap-theme-dark") ? "light" : "dark");
}

function getEarthMapExportTitle() {
  return getActiveProject()?.title || "Earth Map";
}

function getCanvasPngBlob() {
  return new Promise((resolve, reject) => {
    const canvas = webglState.ready ? webglState.canvas : ui.globeCanvas;
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("canvas-export-empty"));
    }, "image/png");
  });
}

async function exportEarthMapPng() {
  renderGlobe();
  const blob = await getCanvasPngBlob();
  downloadBlob(blob, `${slugifyFilename(getEarthMapExportTitle(), "earth-map")}.png`);
}

function cloneCoordinatesForExport(coordinates) {
  if (!Array.isArray(coordinates)) return [];
  if (typeof coordinates[0] === "number") {
    return [Number(coordinates[0]) || 0, Number(coordinates[1]) || 0];
  }
  return coordinates.map(cloneCoordinatesForExport);
}

function cloneGeometryForExport(geometry) {
  if (!geometry || typeof geometry !== "object") return null;
  if (geometry.type === "GeometryCollection") {
    return {
      type: "GeometryCollection",
      geometries: (geometry.geometries || []).map(cloneGeometryForExport).filter(Boolean),
    };
  }
  return {
    type: geometry.type,
    coordinates: cloneCoordinatesForExport(geometry.coordinates),
  };
}

function cloneFeatureForExport(feature) {
  const geometry = cloneGeometryForExport(feature?.geometry || feature);
  return geometry ? { type: "Feature", properties: {}, geometry } : null;
}

function cloneFeatureCollectionForExport(geojson) {
  if (geojson?.type === "FeatureCollection") {
    return {
      type: "FeatureCollection",
      features: (geojson.features || []).map(cloneFeatureForExport).filter(Boolean),
    };
  }
  const feature = cloneFeatureForExport(geojson);
  return { type: "FeatureCollection", features: feature ? [feature] : [] };
}

function getEarthMapHtmlExportState() {
  const project = getActiveProject();
  // Exportregel: Das HTML ist ein eigenständiger, interaktiver Minimalviewer.
  // Auch hier gilt die 10m-Masterregel: Exportiert wird die aktuell geladene
  // 10m-Ableitung, nicht eine fremde 110m/50m-Ersatzgeometrie.
  const land = shouldRenderContinentalBaseMap(project)
    ? getInteractiveNaturalEarthSource()
      || activeNaturalEarthSource
      || { type: "FeatureCollection", features: [] }
    : { type: "FeatureCollection", features: [] };
  const landRings = extractLandRings(land);
  const layers = getVisibleProjectBoundaryItems(project).map((item) => {
    const features = getRenderableBoundaryFeatures(item);
    if (!features.length) return null;
    const layerFeature = cloneFeatureCollectionForExport({ type: "FeatureCollection", features });
    return {
      id: item.id,
      name: item.name,
      color: normalizeColorValue(item.display?.color, DEFAULT_LAYER_FILL_COLOR) || DEFAULT_LAYER_FILL_COLOR,
      outlineColor: normalizeColorValue(item.display?.outlineColor, DEFAULT_LAYER_OUTLINE_COLOR) || DEFAULT_LAYER_OUTLINE_COLOR,
      feature: layerFeature,
      samples: createLandSamples(extractLandRings(layerFeature), 0.55),
    };
  }).filter((layer) => layer?.feature);

  return {
    land: cloneFeatureCollectionForExport(land),
    landSamples: createLandSamples(landRings, 1.15),
    layers,
    rotation: { ...rotation },
    zoom: globeZoom,
  };
}

function buildEarthMapHtmlExport() {
  let stateJson = "";
  try {
    stateJson = JSON.stringify(getEarthMapHtmlExportState()).replace(/</g, "\\u003c");
  } catch (error) {
    console.error("Earth Map export state could not be serialized", error);
    stateJson = JSON.stringify({
      land: { type: "FeatureCollection", features: [] },
      landSamples: [],
      layers: [],
      rotation: { ...rotation },
      zoom: globeZoom,
    });
  }
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Earth Map</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    html, body { width: 100%; height: 100%; margin: 0; overflow: hidden; background: #fff; }
    body { cursor: grab; }
    body.is-dragging { cursor: grabbing; }
    canvas { display: block; width: 100vw; height: 100vh; background: #fff; }
  </style>
</head>
<body>
  <canvas id="earthMapCanvas" aria-label="Interaktiver Earth-Map-Globus"></canvas>
  <script src="https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js"></script>
  <script>
  (() => {
    const EXPORT_STATE = ${stateJson};
    const canvas = document.getElementById("earthMapCanvas");
    const ctx = canvas.getContext("2d");
    const DEG = Math.PI / 180;
    const WATER = "#fbfbf8";
    const LAND = "#b8b8b4";
    const LAND_STROKE = "#ffffff";
    const SPHERE_STROKE = "#a9aaa7";
    let rotation = {
      lon: Number(EXPORT_STATE.rotation?.lon) || 0,
      lat: Number(EXPORT_STATE.rotation?.lat) || 0,
    };
    let zoom = Math.min(9, Math.max(1, Number(EXPORT_STATE.zoom) || 1));
    let drag = null;
    let view = { width: 1, height: 1, radius: 1, cx: 0, cy: 0 };

    function colorWithAlpha(hex, alpha) {
      const match = String(hex || "").trim().match(/^#?([0-9a-f]{6})$/i);
      if (!match) return "rgba(198,168,106," + alpha + ")";
      const value = parseInt(match[1], 16);
      return "rgba(" + ((value >> 16) & 255) + "," + ((value >> 8) & 255) + "," + (value & 255) + "," + alpha + ")";
    }

    function rotatePoint(lon, lat) {
      const lambda = (lon + rotation.lon) * DEG;
      const phi = lat * DEG;
      const tilt = rotation.lat * DEG;
      const cosPhi = Math.cos(phi);
      const x = cosPhi * Math.sin(lambda);
      const y = Math.sin(phi) * Math.cos(tilt) - cosPhi * Math.cos(lambda) * Math.sin(tilt);
      const z = Math.sin(phi) * Math.sin(tilt) + cosPhi * Math.cos(lambda) * Math.cos(tilt);
      return { x, y, z };
    }

    function projectPosition(position) {
      const point = rotatePoint(Number(position[0]), Number(position[1]));
      if (point.z <= 0.012) return null;
      return {
        x: view.cx + point.x * view.radius,
        y: view.cy - point.y * view.radius,
      };
    }

    function forEachPolygon(geometry, callback) {
      if (!geometry) return;
      if (geometry.type === "Polygon") {
        callback(geometry.coordinates || []);
      } else if (geometry.type === "MultiPolygon") {
        (geometry.coordinates || []).forEach((polygon) => callback(polygon || []));
      } else if (geometry.type === "GeometryCollection") {
        (geometry.geometries || []).forEach((child) => forEachPolygon(child, callback));
      }
    }

    function drawRing(ring) {
      let hasPoint = false;
      let moved = false;
      let previous = null;
      const maxSegmentLength = view.radius * 0.36;
      for (const position of ring || []) {
        const projected = projectPosition(position);
        if (!projected) {
          moved = false;
          previous = null;
          continue;
        }
        if (previous) {
          const dx = projected.x - previous.x;
          const dy = projected.y - previous.y;
          if (Math.hypot(dx, dy) > maxSegmentLength) {
            moved = false;
          }
        }
        hasPoint = true;
        if (!moved) {
          ctx.moveTo(projected.x, projected.y);
          moved = true;
        } else {
          ctx.lineTo(projected.x, projected.y);
        }
        previous = projected;
      }
      return hasPoint;
    }

    function drawFeatureCollection(geojson, fill, stroke, lineWidth) {
      const features = geojson?.type === "FeatureCollection" ? geojson.features : [geojson];
      ctx.beginPath();
      let hasShape = false;
      for (const feature of features || []) {
        forEachPolygon(feature?.geometry || feature, (polygon) => {
          for (const ring of polygon) {
            if (drawRing(ring)) {
              ctx.closePath();
              hasShape = true;
            }
          }
        });
      }
      if (!hasShape) return;
      ctx.fillStyle = fill;
      ctx.fill("evenodd");
      if (stroke && lineWidth > 0) {
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
    }

    function drawFeatureLines(geojson, stroke, lineWidth) {
      const features = geojson?.type === "FeatureCollection" ? geojson.features : [geojson];
      ctx.beginPath();
      let hasLine = false;
      for (const feature of features || []) {
        forEachPolygon(feature?.geometry || feature, (polygon) => {
          for (const ring of polygon) {
            if (drawRing(ring)) hasLine = true;
          }
        });
      }
      if (!hasLine) return;
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }

    function drawSurfaceSamples(samples, fill, radiusFactor, minRadius) {
      const dotRadius = Math.max(minRadius, view.radius * radiusFactor);
      ctx.fillStyle = fill;
      for (const sample of samples || []) {
        const point = projectPosition([sample.lon, sample.lat]);
        if (!point) continue;
        ctx.beginPath();
        ctx.arc(point.x, point.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function createD3Projection() {
      if (!window.d3?.geoOrthographic || !window.d3?.geoPath) return null;
      return window.d3.geoOrthographic()
        .translate([view.cx, view.cy])
        .scale(view.radius)
        .rotate([rotation.lon, rotation.lat])
        .clipAngle(90)
        .precision(0.25);
    }

    function drawD3Feature(geojson, fill, stroke, lineWidth) {
      const projection = createD3Projection();
      if (!projection) return false;
      const path = window.d3.geoPath(projection, ctx);
      ctx.beginPath();
      path(geojson);
      ctx.fillStyle = fill;
      ctx.fill("evenodd");
      if (stroke && lineWidth > 0) {
        ctx.beginPath();
        path(geojson);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
      return true;
    }

    function resizeCanvas() {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const width = Math.max(1, window.innerWidth);
      const height = Math.max(1, window.innerHeight);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      view.width = width;
      view.height = height;
      view.cx = width / 2;
      view.cy = height / 2;
      view.radius = Math.min(width, height) * 0.47 * zoom;
    }

    function render() {
      resizeCanvas();
      ctx.clearRect(0, 0, view.width, view.height);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, view.width, view.height);
      ctx.save();
      ctx.beginPath();
      ctx.arc(view.cx, view.cy, view.radius, 0, Math.PI * 2);
      ctx.fillStyle = WATER;
      ctx.fill();
      ctx.clip();
      const d3Rendered = drawD3Feature(EXPORT_STATE.land, "rgba(184,184,180,.82)", "rgba(126,130,128,.44)", Math.max(.55, view.radius * .001));
      if (!d3Rendered) {
        drawSurfaceSamples(EXPORT_STATE.landSamples, "rgba(184,184,180,.78)", .0068, 1.4);
        drawFeatureLines(EXPORT_STATE.land, "rgba(126,130,128,.44)", Math.max(.55, view.radius * .001));
      }
      for (const layer of EXPORT_STATE.layers || []) {
        const layerRendered = drawD3Feature(layer.feature, colorWithAlpha(layer.color, .78), colorWithAlpha(layer.outlineColor || layer.color, .98), Math.max(.7, view.radius * .0013));
        if (!layerRendered) {
          drawSurfaceSamples(layer.samples, colorWithAlpha(layer.color, .82), .0058, 1.15);
          drawFeatureLines(layer.feature, colorWithAlpha(layer.outlineColor || layer.color, .98), Math.max(.7, view.radius * .0013));
        }
      }
      const gradient = ctx.createRadialGradient(
        view.cx - view.radius * .38,
        view.cy - view.radius * .42,
        view.radius * .05,
        view.cx,
        view.cy,
        view.radius
      );
      gradient.addColorStop(0, "rgba(255,255,255,.42)");
      gradient.addColorStop(.62, "rgba(255,255,255,.02)");
      gradient.addColorStop(1, "rgba(0,0,0,.10)");
      ctx.fillStyle = gradient;
      ctx.fillRect(view.cx - view.radius, view.cy - view.radius, view.radius * 2, view.radius * 2);
      ctx.restore();
      ctx.beginPath();
      ctx.arc(view.cx, view.cy, view.radius, 0, Math.PI * 2);
      ctx.strokeStyle = SPHERE_STROKE;
      ctx.lineWidth = Math.max(1, view.radius * .002);
      ctx.stroke();
    }

    canvas.addEventListener("pointerdown", (event) => {
      drag = { x: event.clientX, y: event.clientY, lon: rotation.lon, lat: rotation.lat };
      document.body.classList.add("is-dragging");
      canvas.setPointerCapture(event.pointerId);
    });
    function getLatitudeLimit() {
      const t = Math.max(0, Math.min(1, (zoom - 1) / 5));
      const eased = 1 - ((1 - t) ** 2);
      return 58 + eased * 31.2;
    }
    canvas.addEventListener("pointermove", (event) => {
      if (!drag) return;
      const sensitivity = 0.42 / Math.sqrt(Math.max(1, zoom));
      const latitudeLimit = getLatitudeLimit();
      rotation.lon = drag.lon + (event.clientX - drag.x) * sensitivity;
      rotation.lat = Math.max(-latitudeLimit, Math.min(latitudeLimit, drag.lat - (event.clientY - drag.y) * sensitivity));
      render();
    });
    canvas.addEventListener("pointerup", (event) => {
      drag = null;
      document.body.classList.remove("is-dragging");
      try { canvas.releasePointerCapture(event.pointerId); } catch (_) {}
    });
    canvas.addEventListener("wheel", (event) => {
      event.preventDefault();
      const factor = Math.exp(-event.deltaY * 0.0012);
      zoom = Math.min(9, Math.max(1, zoom * factor));
      const latitudeLimit = getLatitudeLimit();
      rotation.lat = Math.max(-latitudeLimit, Math.min(latitudeLimit, rotation.lat));
      render();
    }, { passive: false });
    window.addEventListener("resize", render);
    function renderWhenReady(attempt = 0) {
      render();
      if (window.d3?.geoOrthographic || attempt >= 30) return;
      window.setTimeout(() => renderWhenReady(attempt + 1), 120);
    }
    renderWhenReady();
  })();
  </script>
</body>
</html>`;
}

function exportEarthMapHtml() {
  try {
    renderGlobe();
    const blob = new Blob([buildEarthMapHtmlExport()], { type: "text/html;charset=utf-8" });
    downloadBlob(blob, `${slugifyFilename(getEarthMapExportTitle(), "earth-map")}.html`);
  } catch (error) {
    console.error("HTML export failed", error);
    window.alert(`HTML-Export fehlgeschlagen: ${error?.message || "unbekannter Fehler"}`);
  }
}

function handleExportFormat(format) {
  setExportMenuOpen(false);
  if (format === "html") {
    exportEarthMapHtml();
  } else if (format === "png") {
    exportEarthMapPng().catch((error) => {
      console.error("PNG export failed", error);
      window.alert("PNG-Export fehlgeschlagen. Bitte versuche es erneut.");
    });
  }
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
  "10m": { key: "10m-land-vector-hierarchy", tileBasePath: `${NATURAL_EARTH_ASSET_BASE}10m/tiles-vector-hierarchy/`, minZoom: 1 },
};

let activeNaturalEarthSource = null;
let pendingNaturalEarthDetail = "";
let activeNaturalEarthTileSignature = "";
const pendingNaturalEarthTiles = new Set();

const geoState = {
  detailLevel: "10m",
  landRings: [],
  landSamples: [],
  status: "loading",
  samplesReady: false,
  sampleGeneration: 0,
};

const webglState = {
  canvas: document.createElement("canvas"),
  gl: null,
  program: null,
  positionBuffer: null,
  sphereVertexCount: 0,
  mapTexture: null,
  mapTextureSignature: "",
  landMesh: null,
  landLineMesh: null,
  landSignature: "",
  layerMeshes: new Map(),
  layerSignature: "",
  maxTextureSize: 4096,
  ready: false,
};

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("EarthMap WebGL shader error", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl) {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, `
    attribute vec3 a_position;
    attribute vec2 a_uv;
    uniform float u_lon;
    uniform float u_lat;
    uniform float u_scaleX;
    uniform float u_scaleY;
    uniform float u_depthScale;
    varying vec2 v_uv;
    varying float v_light;
    varying float v_rim;
    void main() {
      float lon = radians(u_lon);
      float lat = radians(-u_lat);
      float cosLon = cos(lon);
      float sinLon = sin(lon);
      vec3 p = vec3(
        a_position.x * cosLon + a_position.z * sinLon,
        a_position.y,
        -a_position.x * sinLon + a_position.z * cosLon
      );
      float cosLat = cos(lat);
      float sinLat = sin(lat);
      vec3 r = vec3(
        p.x,
        p.y * cosLat - p.z * sinLat,
        p.y * sinLat + p.z * cosLat
      );
      gl_Position = vec4(r.x * u_scaleX, r.y * u_scaleY, -r.z * u_depthScale, 1.0);
      v_uv = a_uv;
      v_light = clamp(0.98 + r.z * 0.035 + r.y * 0.012 - r.x * 0.008, 0.92, 1.03);
      v_rim = smoothstep(0.58, 1.0, 1.0 - max(0.0, r.z));
    }
  `);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    uniform sampler2D u_map;
    varying vec2 v_uv;
    varying float v_light;
    varying float v_rim;
    void main() {
      vec4 base = texture2D(u_map, v_uv);
      vec3 shaded = base.rgb * v_light;
      shaded = mix(shaded, vec3(0.90, 0.90, 0.87), v_rim * 0.055);
      gl_FragColor = vec4(shaded, base.a);
    }
  `);
  if (!vertexShader || !fragmentShader) return null;
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn("EarthMap WebGL program error", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function lonLatToSpherePoint(lon, lat, radius = 1) {
  const lambda = lon * DEG;
  const phi = lat * DEG;
  const cosPhi = Math.cos(phi);
  return [
    radius * cosPhi * Math.sin(lambda),
    radius * Math.sin(phi),
    radius * cosPhi * Math.cos(lambda),
  ];
}

function createSphereVertices(segments = 96, rings = 48, radius = 1) {
  const vertices = [];
  const pushVertex = (lon, lat) => {
    vertices.push(
      ...lonLatToSpherePoint(lon, lat, radius),
      (lon + 180) / 360,
      (90 - lat) / 180,
    );
  };
  for (let latIndex = 0; latIndex < rings; latIndex += 1) {
    const latA = -90 + (latIndex / rings) * 180;
    const latB = -90 + ((latIndex + 1) / rings) * 180;
    for (let lonIndex = 0; lonIndex < segments; lonIndex += 1) {
      const lonA = -180 + (lonIndex / segments) * 360;
      const lonB = -180 + ((lonIndex + 1) / segments) * 360;
      pushVertex(lonA, latA);
      pushVertex(lonB, latA);
      pushVertex(lonB, latB);
      pushVertex(lonA, latA);
      pushVertex(lonB, latB);
      pushVertex(lonA, latB);
    }
  }
  return new Float32Array(vertices);
}

function getRingCentroid(ring) {
  const open = ring.slice(0, -1);
  const sum = open.reduce((acc, [lon, lat]) => ({ lon: acc.lon + lon, lat: acc.lat + lat }), { lon: 0, lat: 0 });
  const count = Math.max(1, open.length);
  return [sum.lon / count, sum.lat / count];
}

function ringToSphereFanVertices(ring, radius = 1.003) {
  const cleanRing = sanitizeRing(ring);
  if (cleanRing.length < 4) return [];
  const [centerLon, centerLat] = getRingCentroid(cleanRing);
  const centerPoint = lonLatToSpherePoint(centerLon, centerLat, radius);
  const vertices = [];
  for (let index = 0; index < cleanRing.length - 1; index += 1) {
    vertices.push(
      ...centerPoint,
      ...lonLatToSpherePoint(cleanRing[index][0], cleanRing[index][1], radius),
      ...lonLatToSpherePoint(cleanRing[index + 1][0], cleanRing[index + 1][1], radius),
    );
  }
  return vertices;
}

function geoJsonToSphereVertices(geojson, radius = 1.003) {
  const vertices = [];
  extractLandRings(geojson).forEach((ring) => {
    vertices.push(...ringToSphereFanVertices(densifyRing(ring, 0.85), radius));
  });
  return new Float32Array(vertices);
}

function geoJsonToSphereLineVertices(geojson, radius = 1.006) {
  const vertices = [];
  extractLandRings(geojson).forEach((ring) => {
    const denseRing = densifyRing(ring, 0.85);
    for (let index = 0; index < denseRing.length - 1; index += 1) {
      vertices.push(
        ...lonLatToSpherePoint(denseRing[index][0], denseRing[index][1], radius),
        ...lonLatToSpherePoint(denseRing[index + 1][0], denseRing[index + 1][1], radius),
      );
    }
  });
  return new Float32Array(vertices);
}

function createWebglMesh(vertices) {
  const gl = webglState.gl;
  if (!gl || !vertices?.length) return null;
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  return { buffer, vertexCount: vertices.length / 3 };
}

function deleteWebglMesh(mesh) {
  if (mesh?.buffer && webglState.gl) webglState.gl.deleteBuffer(mesh.buffer);
}

function getWebglTextureSize() {
  return Math.min(webglState.maxTextureSize || 1024, 1024);
}

function createEarthMapTextureCanvas(textureWidth = getWebglTextureSize()) {
  const canvas = document.createElement("canvas");
  canvas.width = textureWidth;
  canvas.height = Math.floor(textureWidth / 2);
  const textureContext = canvas.getContext("2d");
  textureContext.fillStyle = "#fbfbf8";
  textureContext.fillRect(0, 0, canvas.width, canvas.height);
  return canvas;
}

function updateWebglMapTexture() {
  const gl = webglState.gl;
  const textureSize = getWebglTextureSize();
  const signature = `water-sphere|${textureSize}`;
  if (signature === webglState.mapTextureSignature && webglState.mapTexture) return;
  const textureCanvas = createEarthMapTextureCanvas(textureSize);
  if (!webglState.mapTexture) webglState.mapTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, webglState.mapTexture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureCanvas);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  webglState.mapTextureSignature = signature;
  webglState.mapTextureSize = textureSize;
}

function initWebglRenderer() {
  const gl = webglState.canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    preserveDrawingBuffer: true,
  });
  if (!gl) return false;
  webglState.gl = gl;
  webglState.maxTextureSize = Math.min(8192, gl.getParameter(gl.MAX_TEXTURE_SIZE) || 4096);
  webglState.program = createProgram(gl);
  if (!webglState.program) return false;
  webglState.positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, webglState.positionBuffer);
  const sphereVertices = createSphereVertices();
  gl.bufferData(gl.ARRAY_BUFFER, sphereVertices, gl.STATIC_DRAW);
  webglState.sphereVertexCount = sphereVertices.length / 5;
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  webglState.canvas.id = "globeWebglCanvas";
  webglState.canvas.className = "globe-webgl-canvas";
  webglState.canvas.setAttribute("aria-hidden", "true");
  ui.globe.appendChild(webglState.canvas);
  ui.globeCanvas.classList.add("is-webgl-hidden");
  webglState.ready = true;
  document.documentElement.dataset.geoEngine = "webgl-sphere";
  return true;
}

function getRenderableLandGeoJson() {
  return getRenderableNaturalEarthSource(getInteractiveNaturalEarthSource());
}

function updateWebglLandMesh() {
  const source = getRenderableLandGeoJson();
  const signature = `${activeNaturalEarthTileSignature}|${source?.features?.length || 0}`;
  if (!source || signature === webglState.landSignature) return;
  deleteWebglMesh(webglState.landMesh);
  deleteWebglMesh(webglState.landLineMesh);
  webglState.landMesh = createWebglMesh(geoJsonToSphereVertices(source, 1.003));
  webglState.landLineMesh = createWebglMesh(geoJsonToSphereLineVertices(source, 1.006));
  webglState.landSignature = signature;
}

function getLayerMeshSignature(items) {
  const dataset = getNaturalEarthCountryDataset();
  const threshold = dataset.detail === "10m" ? getNaturalEarth10mDetailThreshold().toFixed(5) : "fallback";
  return items.map((item) => `${item.id}:${item.iso3}:${item.boundarySet?.features?.length || 0}:${item.display?.color || ""}`).join("|") + `|${dataset.detail}|${threshold}`;
}

function updateWebglLayerMeshes() {
  const items = getVisibleProjectBoundaryItems();
  const signature = getLayerMeshSignature(items);
  if (signature === webglState.layerSignature) return;
  webglState.layerMeshes.forEach(deleteWebglMesh);
  webglState.layerMeshes.clear();
  items.forEach((item) => {
    const features = getRenderableBoundaryFeatures(item);
    if (!features.length) return;
    const mesh = createWebglMesh(geoJsonToSphereVertices({ type: "FeatureCollection", features }, 1.008));
    if (mesh) webglState.layerMeshes.set(item.id, { mesh, color: normalizeColorValue(item.display?.color, "#d9dc8c") || "#d9dc8c" });
  });
  webglState.layerSignature = signature;
}

function hexToVectorColor(hex, alpha = 1) {
  const normalized = normalizeColorValue(hex, "#b8b8b4") || "#b8b8b4";
  const value = Number.parseInt(normalized.slice(1), 16);
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255, alpha];
}

function drawWebglMesh(mesh, color, depthScale = 0.62, mode = null) {
  const gl = webglState.gl;
  const program = webglState.program;
  if (!mesh?.vertexCount) return;
  gl.bindBuffer(gl.ARRAY_BUFFER, mesh.buffer);
  const positionLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
  gl.uniform4fv(gl.getUniformLocation(program, "u_color"), color);
  gl.uniform1f(gl.getUniformLocation(program, "u_lon"), rotation.lon);
  gl.uniform1f(gl.getUniformLocation(program, "u_lat"), rotation.lat);
  const width = Math.max(1, webglState.canvas.width);
  const height = Math.max(1, webglState.canvas.height);
  const fit = Math.min(width, height);
  const zoomScale = 0.94 * globeZoom;
  gl.uniform1f(gl.getUniformLocation(program, "u_scaleX"), zoomScale * (fit / width));
  gl.uniform1f(gl.getUniformLocation(program, "u_scaleY"), zoomScale * (fit / height));
  gl.uniform1f(gl.getUniformLocation(program, "u_depthScale"), depthScale);
  gl.drawArrays(mode || gl.TRIANGLES, 0, mesh.vertexCount);
}

function drawWebglTexturedSphere() {
  const gl = webglState.gl;
  const program = webglState.program;
  gl.bindBuffer(gl.ARRAY_BUFFER, webglState.positionBuffer);
  const stride = 5 * Float32Array.BYTES_PER_ELEMENT;
  const positionLocation = gl.getAttribLocation(program, "a_position");
  const uvLocation = gl.getAttribLocation(program, "a_uv");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, stride, 0);
  gl.enableVertexAttribArray(uvLocation);
  gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, stride, 3 * Float32Array.BYTES_PER_ELEMENT);
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, webglState.mapTexture);
  gl.uniform1i(gl.getUniformLocation(program, "u_map"), 0);
  gl.uniform1f(gl.getUniformLocation(program, "u_lon"), rotation.lon);
  gl.uniform1f(gl.getUniformLocation(program, "u_lat"), rotation.lat);
  const width = Math.max(1, webglState.canvas.width);
  const height = Math.max(1, webglState.canvas.height);
  const fit = Math.min(width, height);
  const zoomScale = 0.94 * globeZoom;
  gl.uniform1f(gl.getUniformLocation(program, "u_scaleX"), zoomScale * (fit / width));
  gl.uniform1f(gl.getUniformLocation(program, "u_scaleY"), zoomScale * (fit / height));
  gl.uniform1f(gl.getUniformLocation(program, "u_depthScale"), 0.62);
  gl.drawArrays(gl.TRIANGLES, 0, webglState.sphereVertexCount);
}

function drawProjectedOutlineRings(geojson, radius, center, strokeStyle, lineWidth, maxStep = 0.9) {
  const rings = extractLandRings(geojson);
  if (!rings.length) return;
  ctx.save();
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.clip();
  rings.forEach((ring) => {
    drawProjectedLine(densifyRing(ring, maxStep), radius, center, strokeStyle, lineWidth);
  });
  ctx.restore();
}

function drawWebglMapOutlines(radius, center) {
  // Outlines sind optisch hilfreich, aber rechnerisch teuer, weil sie aus
  // vielen Lon/Lat-Ringen in Screen-Kurven übersetzt werden. Während aktiver
  // Bewegung verzichten wir darauf; die Vektorflächen liefern bereits eine
  // saubere Lesefassung, die feinen Linien erscheinen nach der Ruhephase.
  if (isNavigatingGlobe && globeZoom > 1.35) return;
  const source = shouldRenderContinentalBaseMap() ? getRenderableLandGeoJson() : null;
  if (source) {
    drawProjectedOutlineRings(source, radius, center, "rgba(116,121,117,.58)", 1.05, 0.85);
  }

  getVisibleProjectBoundaryItems().forEach((item) => {
    const features = getRenderableBoundaryFeatures(item);
    if (!features.length) return;
    const color = normalizeColorValue(item.display?.color, "#d9dc8c") || "#d9dc8c";
    drawProjectedOutlineRings({ type: "FeatureCollection", features }, radius, center, hexToRgba(color, 0.95), 1.25, 0.65);
  });
}

function drawVectorMapSurface(radius, center) {
  if (!shouldRenderContinentalBaseMap()) return false;
  if (!hasD3Geo) return false;
  const source = getRenderableLandGeoJson();
  if (!source?.features?.length) return false;
  ctx.save();
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.clip();
  drawGeographicLayer(radius, center);
  ctx.restore();
  return true;
}

function drawWebglAtmosphereOverlay(width, height, dpr) {
  const cssWidth = Math.max(1, Math.floor(width / dpr));
  const cssHeight = Math.max(1, Math.floor(height / dpr));
  const baseSize = Math.min(cssWidth, cssHeight);
  const radius = baseSize * 0.47 * globeZoom;
  const center = { x: cssWidth / 2, y: cssHeight / 2 };
  ui.globeCanvas.width = Math.floor(cssWidth * dpr);
  ui.globeCanvas.height = Math.floor(cssHeight * dpr);
  ui.globeCanvas.style.width = `${cssWidth}px`;
  ui.globeCanvas.style.height = `${cssHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, cssWidth, cssHeight);

  const rim = ctx.createRadialGradient(
    center.x - radius * 0.16,
    center.y - radius * 0.18,
    radius * 0.62,
    center.x,
    center.y,
    radius * 1.02,
  );
  rim.addColorStop(0, "rgba(255,255,255,0)");
  rim.addColorStop(0.72, "rgba(255,255,255,0)");
  rim.addColorStop(0.92, "rgba(170,176,171,.055)");
  rim.addColorStop(1, "rgba(108,116,111,.11)");
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = rim;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.lineWidth = Math.max(1.2, baseSize * 0.0032);
  ctx.strokeStyle = "rgba(118,126,121,.30)";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(center.x, center.y, radius + Math.max(1, baseSize * 0.002), 0, Math.PI * 2);
  ctx.lineWidth = Math.max(0.8, baseSize * 0.0016);
  ctx.strokeStyle = "rgba(255,255,255,.48)";
  ctx.stroke();

  // Farbregel: Die Kartenflächen werden nach der Kugel-/Atmosphärebasis
  // deckend gezeichnet. Sie dürfen nicht halbtransparent mit der Wasserbasis
  // oder dem Rim verrechnet werden, sonst ändert sich die Landfarbe je nach
  // Zoom, Kippwinkel und Position auf der Kugel.
  const usedVectorSurface = drawVectorMapSurface(radius, center);
  drawProjectBoundaryLayers(radius, center);
  if (!usedVectorSurface) drawWebglMapOutlines(radius, center);
}

function renderWebglGlobe() {
  if (!webglState.ready && !initWebglRenderer()) return false;
  const rect = ui.globe.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  webglState.canvas.width = Math.floor(width * dpr);
  webglState.canvas.height = Math.floor(height * dpr);
  webglState.canvas.style.width = `${width}px`;
  webglState.canvas.style.height = `${height}px`;

  updateWebglMapTexture();

  const gl = webglState.gl;
  gl.viewport(0, 0, webglState.canvas.width, webglState.canvas.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.useProgram(webglState.program);
  drawWebglTexturedSphere();
  drawWebglAtmosphereOverlay(webglState.canvas.width, webglState.canvas.height, dpr);
  return true;
}

function getLoadedNaturalEarthLand(level) {
  const config = NATURAL_EARTH_LAND_DETAILS[level];
  return config ? window.EarthMapNaturalEarthData?.[config.key] || null : null;
}

function getDesiredNaturalEarthDetailLevel() {
  // Architekturregel: Die moderne Küsten-/Landdarstellung hat nur eine
  // autoritative Quelle: Natural Earth 10m. Alle sichtbaren Detailstufen sind
  // automatisch generalisierte Ableitungen dieser Master-Geometrie.
  return "10m";
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

function getNaturalEarth10mTileIndex() {
  return window.EarthMapNaturalEarthTileIndex?.[NATURAL_EARTH_LAND_DETAILS["10m"].key] || null;
}

function getNaturalEarth10mDetailThreshold() {
  const index = getNaturalEarth10mTileIndex();
  const thresholds = index?.thresholds || [];
  if (!thresholds.length) return 0.02;
  let current = thresholds[0].importance;
  for (const entry of thresholds) {
    if (globeZoom >= entry.zoom) current = entry.importance;
    else break;
  }
  return current;
}

function getSurfaceBudgetSignature() {
  if (globeZoom < 2.4) return "surface-xl";
  if (globeZoom < 4.2) return "surface-l";
  if (globeZoom < 7) return "surface-m";
  return "surface-s";
}

function getVisibleNaturalEarth10mTiles() {
  const index = getNaturalEarth10mTileIndex();
  if (!index?.tiles?.length) return [];
  const bounds = getBufferedViewportBounds();
  return index.tiles.filter((tile) => tileIntersectsViewport(tile, bounds));
}

function getNaturalEarth10mTileDataKey(tile) {
  return `10m-land-hierarchy-${tile.key}`;
}

function decodeHierarchicalRing(ring, threshold) {
  const decoded = (ring || [])
    .filter((point, index) => index === 0 || index === ring.length - 1 || Number(point?.[2] || 0) >= threshold)
    .map(([lon, lat]) => [lon, lat]);
  if (decoded.length < 4) return [];
  const first = decoded[0];
  const last = decoded[decoded.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) decoded.push(first);
  return decoded;
}

function getRingPlanarArea(ring) {
  if (!Array.isArray(ring) || ring.length < 4) return 0;
  let area = 0;
  for (let index = 0; index < ring.length - 1; index += 1) {
    const current = ring[index];
    const next = ring[index + 1];
    area += (current[0] * next[1]) - (next[0] * current[1]);
  }
  return Math.abs(area / 2);
}

function getApproxFeaturePixelMetrics(feature) {
  const bbox = feature?.bbox;
  if (!Array.isArray(bbox) || bbox.length < 4) {
    return { width: Infinity, height: Infinity, area: Infinity };
  }
  const rect = ui.globe.getBoundingClientRect();
  const baseSize = Math.max(1, Math.min(rect.width || 1, rect.height || 1));
  const radius = baseSize * 0.47 * globeZoom;
  const midLat = ((bbox[1] || 0) + (bbox[3] || 0)) / 2;
  const lonScale = Math.max(0.18, Math.cos(midLat * DEG));
  const pxPerDegree = radius * DEG;
  const width = Math.abs(normalizeLonDelta((bbox[2] || 0) - (bbox[0] || 0))) * lonScale * pxPerDegree;
  const height = Math.abs((bbox[3] || 0) - (bbox[1] || 0)) * pxPerDegree;
  return { width, height, area: width * height };
}

function isRenderableSurfaceFeature(feature, outerRing) {
  const metrics = getApproxFeaturePixelMetrics(feature);
  const ringArea = getRingPlanarArea(outerRing);
  const pointCount = Math.max(0, (outerRing?.length || 0) - 1);

  // Oberflächenbudget: Küsten, Inseln, Atolle und Fluss-/Wasser-Ränder sind
  // keine gleichwertigen Punktewolken. Ein Objekt wird erst gezeichnet, wenn
  // seine sichtbare Fläche groß genug ist, um als Oberfläche lesbar zu sein.
  // Dadurch verschwinden winzige Inselgruppen auf niedrigen Zoomstufen, statt
  // mit Minimaldreiecken die Karte und den Hauptthread zu verstopfen.
  const minSide = globeZoom < 2.4 ? 2.4 : globeZoom < 4.2 ? 1.9 : globeZoom < 7 ? 1.35 : 0.75;
  const minArea = globeZoom < 2.4 ? 18 : globeZoom < 4.2 ? 11 : globeZoom < 7 ? 6 : 2.5;
  const maxTinyComplexity = globeZoom < 4.2 ? 14 : globeZoom < 7 ? 22 : 42;
  if (metrics.width < minSide && metrics.height < minSide) return false;
  if (metrics.area < minArea && pointCount <= maxTinyComplexity) return false;
  if (ringArea < 0.00012 && globeZoom < 5.8) return false;
  return true;
}

function decodeHierarchicalFeature(feature, threshold) {
  const polygon = feature?.geometry?.coordinates || [];
  const outer = decodeHierarchicalRing(polygon[0] || [], threshold);
  if (outer.length < 4) return null;
  if (!isRenderableSurfaceFeature(feature, outer)) return null;
  return {
    type: "Feature",
    properties: feature.properties || {},
    bbox: feature.bbox,
    geometry: { type: "Polygon", coordinates: [outer] },
  };
}

function buildNaturalEarth10mTileCollection(tiles) {
  const features = [];
  const seenFeatureIds = new Set();
  const collections = [];
  const index = getNaturalEarth10mTileIndex();
  const threshold = getNaturalEarth10mDetailThreshold();
  const globalCollection = window.EarthMapNaturalEarthTileData?.[`10m-land-hierarchy-${index?.global?.key}`];
  if (globalCollection?.features?.length) collections.push(globalCollection);
  tiles.forEach((tile) => {
    const collection = window.EarthMapNaturalEarthTileData?.[getNaturalEarth10mTileDataKey(tile)];
    if (collection?.features?.length) collections.push(collection);
  });
  collections.forEach((collection) => {
    collection.features.forEach((feature) => {
      const id = feature.properties?._earthMapFeatureId || `${feature.bbox?.join(",")}-${features.length}`;
      if (seenFeatureIds.has(id)) return;
      const decodedFeature = decodeHierarchicalFeature(feature, threshold);
      if (!decodedFeature) return;
      seenFeatureIds.add(id);
      features.push(decodedFeature);
    });
  });
  return {
    type: "FeatureCollection",
    name: `ne_10m_land_hierarchy_zoom_${globeZoom.toFixed(2)}`,
    features,
  };
}
function featureBboxIntersectsViewport(feature, bounds) {
  const bbox = feature?.bbox || feature?.geometry?.bbox;
  if (!Array.isArray(bbox) || bbox.length < 4 || !bbox.every(Number.isFinite)) return true;
  const latIntersects = bbox[1] <= bounds.maxLat && bbox[3] >= bounds.minLat;
  if (!latIntersects) return false;
  return bounds.lonSegments.some(([minLon, maxLon]) => bbox[0] <= maxLon && bbox[2] >= minLon);
}

function getRenderableNaturalEarthSource(source) {
  if (geoState.detailLevel !== "10m" || source?.type !== "FeatureCollection") return source;
  const bounds = getBufferedViewportBounds();
  // Performance-Regel: 10m bleibt topologisch ungeschnitten, wird aber vor dem
  // Rendern auf den gepufferten Sichtbereich reduziert. So vermeiden wir die
  // früheren Kachel-Schnittartefakte, ohne bei jedem Frame die gesamte 10m-Welt
  // durch D3 laufen zu lassen.
  return {
    type: "FeatureCollection",
    name: `${source.name || "ne_10m_land"}_visible`,
    features: (source.features || []).filter((feature) => featureBboxIntersectsViewport(feature, bounds)),
  };
}

function installNaturalEarthDetail(level, geojson) {
  if (!geojson) return;
  activeNaturalEarthSource = geojson;
  geoState.detailLevel = level;
  installLandGeoJson(geojson);
  buildLandSamplesDeferred();
}

function requestNaturalEarthDetailForZoom() {
  const desiredLevel = getDesiredNaturalEarthDetailLevel();
  if (desiredLevel === "10m" && isNavigatingGlobe) {
    scheduleNaturalEarthDetailUpdate(720);
    return;
  }

  if (desiredLevel === "10m") {
    const index = getNaturalEarth10mTileIndex();
    if (!index) return;
    const tiles = getVisibleNaturalEarth10mTiles();
    const required = [
      index.global ? { ...index.global, isGlobal: true } : null,
      ...tiles,
    ].filter(Boolean);
    const threshold = getNaturalEarth10mDetailThreshold();
    const signature = `hierarchy|${threshold}|${getSurfaceBudgetSignature()}|${required.map((tile) => tile.key).sort().join("|")}`;
    if (signature === activeNaturalEarthTileSignature && geoState.detailLevel === "10m" && activeNaturalEarthSource) return;

    const missing = required.filter((tile) => {
      const key = tile.isGlobal ? `10m-land-hierarchy-${tile.key}` : getNaturalEarth10mTileDataKey(tile);
      return !window.EarthMapNaturalEarthTileData?.[key];
    });

    if (missing.length) {
      missing.forEach((tile) => {
        const key = tile.isGlobal ? `10m-land-hierarchy-${tile.key}` : getNaturalEarth10mTileDataKey(tile);
        if (pendingNaturalEarthTiles.has(key)) return;
        pendingNaturalEarthTiles.add(key);
        const script = document.createElement("script");
        script.src = `${NATURAL_EARTH_LAND_DETAILS["10m"].tileBasePath}${tile.file}?v=20260628h`;
        script.async = true;
        script.onload = () => {
          pendingNaturalEarthTiles.delete(key);
          scheduleNaturalEarthDetailUpdate(120);
        };
        script.onerror = () => {
          pendingNaturalEarthTiles.delete(key);
          console.warn(`Natural-Earth-10m-Hierarchie-Tile ${key} konnte nicht geladen werden.`);
        };
        document.head.appendChild(script);
      });
      return;
    }

    activeNaturalEarthTileSignature = signature;
    installNaturalEarthDetail("10m", buildNaturalEarth10mTileCollection(tiles));
    scheduleGlobeRender();
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

  const appendScript = () => {
    if (getDesiredNaturalEarthDetailLevel() !== desiredLevel || (desiredLevel === "10m" && isNavigatingGlobe)) {
      pendingNaturalEarthDetail = "";
      scheduleNaturalEarthDetailUpdate(720);
      return;
    }
    document.head.appendChild(script);
  };

  // Performance-Regel: 10m ist ein großer Datensatz und darf nicht während
  // aktiver Navigation in den Hauptthread fallen. Wir starten den Download
  // deshalb erst in einer Ruhephase; niedrigere Detailstufen bleiben direkt.
  if (desiredLevel === "10m") {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(appendScript, { timeout: 1800 });
    } else {
      window.setTimeout(appendScript, 900);
    }
  } else {
    appendScript();
  }
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
  }, delay);
}

function markGlobeNavigationActive() {
  isNavigatingGlobe = true;
  window.clearTimeout(detailLoadTimer);
  window.clearTimeout(navigationSettledTimer);
  navigationSettledTimer = window.setTimeout(() => {
    isNavigatingGlobe = false;
    scheduleNaturalEarthDetailUpdate(680);
    scheduleGlobeRender();
  }, 360);
}

function getInteractiveNaturalEarthSource() {
  // Interaktionsregel: Während Bewegung bleibt die zuletzt geladene
  // 10m-Ableitung sichtbar. Wir weichen nicht auf fremde 110m/50m-Quellen aus,
  // damit die Reduktion der 10m-Masterdaten prüfbar bleibt.
  const desiredLevel = getDesiredNaturalEarthDetailLevel();
  if (desiredLevel === "10m") {
    return geoState.detailLevel === "10m" ? activeNaturalEarthSource : null;
  }
  return null;
}

function sanitizeRing(coordinates) {
  return coordinates
    .filter((point) => Array.isArray(point) && Number.isFinite(point[0]) && Number.isFinite(point[1]))
    .map(([lon, lat]) => [lon, lat]);
}

function getSignedRingArea(ring) {
  let area = 0;
  for (let index = 0; index < ring.length - 1; index += 1) {
    const current = ring[index];
    const next = ring[index + 1];
    area += (current[0] * next[1]) - (next[0] * current[1]);
  }
  return area / 2;
}

function orientRingForD3(ring, shouldBeClockwise) {
  const cleanRing = sanitizeRing(ring);
  if (cleanRing.length < 4) return cleanRing;
  const isClockwise = getSignedRingArea(cleanRing) < 0;
  return isClockwise === shouldBeClockwise ? cleanRing : [...cleanRing].reverse();
}

function orientPolygonForD3(polygon) {
  if (!Array.isArray(polygon) || !polygon.length) return [];
  // D3s sphärische Polygonfüllung nutzt eine andere Winding-Konvention als
  // RFC-GeoJSON. Außenringe laufen für die sichtbaren Landflächen clockwise,
  // Innenringe gegenläufig. Diese Regel darf nicht global umgedreht werden:
  // sonst füllt D3 das sphärische Komplement, also den Ozean.
  return polygon.map((ring, index) => orientRingForD3(ring, index === 0));
}

function orientGeometryForD3(geometry) {
  if (!geometry) return null;
  if (geometry.type === "Polygon") {
    return { ...geometry, coordinates: orientPolygonForD3(geometry.coordinates || []) };
  }
  if (geometry.type === "MultiPolygon") {
    return { ...geometry, coordinates: (geometry.coordinates || []).map(orientPolygonForD3) };
  }
  if (geometry.type === "GeometryCollection") {
    return { ...geometry, geometries: (geometry.geometries || []).map(orientGeometryForD3).filter(Boolean) };
  }
  return geometry;
}

function orientGeoJsonForD3(geojson) {
  if (!geojson) return geojson;
  if (geojson.type === "FeatureCollection") {
    return {
      ...geojson,
      features: (geojson.features || []).map((feature) => ({
        ...feature,
        geometry: orientGeometryForD3(feature.geometry),
      })),
    };
  }
  if (geojson.type === "Feature") {
    return { ...geojson, geometry: orientGeometryForD3(geojson.geometry) };
  }
  return orientGeometryForD3(geojson);
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
  geoState.sampleGeneration += 1;
  geoState.landRings = landRings;
  geoState.landSamples = [];
  geoState.samplesReady = false;
  geoState.status = landRings.length ? "ready" : "empty";
}

geoState.status = "loading";

function buildLandSamplesDeferred() {
  if (webglState.ready) {
    geoState.samplesReady = true;
    geoState.landSamples = [];
    return;
  }
  if (geoState.status !== "ready" || geoState.samplesReady) return;
  const rings = [...geoState.landRings];
  const generation = geoState.sampleGeneration;
  let processedRings = 0;
  geoState.landSamples = [];
  geoState.samplesReady = true;
  const processNextRing = () => {
    if (generation !== geoState.sampleGeneration) return;
    const ring = rings.shift();
    if (!ring) {
      renderGlobe();
      return;
    }
    geoState.landSamples.push(...createLandSamples([ring], 1.05));
    processedRings += 1;
    if (processedRings % 10 === 0) renderGlobe();
    window.setTimeout(processNextRing, 0);
  };
  window.setTimeout(processNextRing, 80);
}

let dragState = null;
const activeGlobePointers = new Map();
let pinchState = null;
let rotation = { lon: -18, lat: -8 };
let globeZoom = 1;
const MIN_GLOBE_ZOOM = 1;
const MAX_GLOBE_ZOOM = 180;
let renderFrameId = 0;
let detailLoadTimer = 0;
let navigationSettledTimer = 0;
let isNavigatingGlobe = false;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getLatitudeNavigationLimit() {
  // Navigationsregel: In der vollständig sichtbaren Startkugel verhindert eine
  // moderate Kippgrenze, dass die Erde unnatürlich auf den Kopf fällt. Beim
  // Hineinzoomen wird diese Grenze aber zu einer künstlichen Kartensperre:
  // Skandinavien, Arktis oder Antarktis müssen dann bis fast an den Polrand
  // verschiebbar sein. Deshalb wächst der erlaubte Breitengrad mit dem Zoom.
  const t = clamp((globeZoom - 1) / 5, 0, 1);
  const eased = 1 - ((1 - t) ** 2);
  return 58 + eased * 31.2;
}

function getActiveGlobePointerList() {
  return [...activeGlobePointers.values()];
}

function getPointerDistance(pointerA, pointerB) {
  return Math.hypot(pointerA.x - pointerB.x, pointerA.y - pointerB.y);
}

function beginPinchZoomIfReady() {
  const pointers = getActiveGlobePointerList();
  if (pointers.length < 2) {
    pinchState = null;
    return false;
  }
  const distance = Math.max(1, getPointerDistance(pointers[0], pointers[1]));
  pinchState = {
    startDistance: distance,
    startZoom: globeZoom,
  };
  dragState = null;
  return true;
}

function resetSinglePointerDragFrom(pointer) {
  if (!pointer) {
    dragState = null;
    return;
  }
  dragState = {
    pointerId: pointer.id,
    startX: pointer.x,
    startY: pointer.y,
    startRotation: { ...rotation },
  };
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
  // Projektionsregel: Die eigene Canvas-Projektion muss dieselbe vertikale
  // Rotationsrichtung verwenden wie d3.geoOrthographic(). Sonst kleben
  // Projektlayer korrekt an der Maus, während die Basislandmasse gegenläufig
  // kippt.
  const tilt = -rotation.lat * DEG;
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

function getStableGlobeStrokeWidth(radius, factor, minWidth) {
  // Darstellungsregel: Linien sind Annotationen auf der Karte, keine
  // geografischen Flächen. Ihre Stärke folgt deshalb der Startansicht des
  // aktuellen Fensters und nicht der gezoomten Projektionsskala.
  const fittedRadius = radius / Math.max(1, globeZoom);
  return Math.max(minWidth, fittedRadius * factor);
}

function getThemeMapColor(name, fallback) {
  const value = getComputedStyle(document.body).getPropertyValue(name).trim();
  return value || fallback;
}

function drawSphere(size, radius, center) {
  // Darstellungsregel: Wasser ist die stabile helle Grundfläche. Frühere
  // Radialverläufe wurden beim tiefen Zoom zu grauen Kartenflächen und ließen
  // Ozean und Kontinente optisch ineinanderlaufen.
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = getThemeMapColor("--sea", "#fbfbf8");
  ctx.fill();
  ctx.lineWidth = Math.max(2, size * 0.006);
  ctx.strokeStyle = getThemeMapColor("--sphere-outline", "rgba(154,158,154,.42)");
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
  const renderSource = getRenderableNaturalEarthSource(getInteractiveNaturalEarthSource());
  if (!hasD3Geo || !renderSource) return false;
  const rings = extractLandRings(renderSource);
  if (!rings.length) return false;

  // Renderregel: Die Basislandmasse wird nicht mehr mit D3s sphärischer
  // Polygonfüllung gefüllt. Wasser ist die unveränderliche Basis; Land wird
  // mit unserer eigenen Projektion gefüllt. Horizontgeschnittene Polygone
  // schließen wir über den Globusrand, statt sie ganz weiß zu lassen oder D3
  // wieder das sphärische Komplement füllen zu lassen.
  rings.forEach((ring) => {
    const denseRing = densifyRing(ring, globeZoom > 7 ? 0.45 : 0.9);
    drawVisibleHemisphereFill(denseRing, radius, center, getThemeMapColor("--land", "#c4c4c0"));
  });

  rings.forEach((ring) => {
    drawProjectedLine(
      densifyRing(ring, globeZoom > 7 ? 0.45 : 0.85),
      radius,
      center,
      getThemeMapColor("--land-outline", "rgba(92,96,94,.46)"),
      getStableGlobeStrokeWidth(radius, 0.0018, 0.7),
    );
  });

  return true;
}

function drawProjectBoundaryLayers(radius, center) {
  const items = getVisibleProjectBoundaryItems();
  if (!items.length) return false;
  let drewLayer = false;

  items.forEach((item) => {
    const features = getRenderableBoundaryFeatures(item);
    if (!features.length) return;

    const color = normalizeColorValue(item.display?.color, DEFAULT_LAYER_FILL_COLOR) || DEFAULT_LAYER_FILL_COLOR;
    const outlineColor = normalizeColorValue(item.display?.outlineColor, DEFAULT_LAYER_OUTLINE_COLOR) || DEFAULT_LAYER_OUTLINE_COLOR;
    if (drawBoundaryFeatureVector({ type: "FeatureCollection", features }, radius, center, color, outlineColor)) {
      drewLayer = true;
    }
  });

  return drewLayer;
}

function drawBoundaryFeatureVector(feature, radius, center, color, outlineColor = DEFAULT_LAYER_OUTLINE_COLOR) {
  const featureCollection = feature?.type === "FeatureCollection" ? feature : { type: "FeatureCollection", features: [feature] };
  const rings = extractLandRings(featureCollection);
  if (!rings.length) return false;
  const fillStyle = hexToRgba(color, 0.84);
  const strokeStyle = hexToRgba(outlineColor, 0.98);
  const lineWidth = getStableGlobeStrokeWidth(radius, 0.0042, 1.15);
  const density = globeZoom > 7 ? 0.35 : 0.75;

  // Layer-Regel: importierte Länder/Regionen müssen denselben
  // horizontgeschnittenen Vektorpfad nutzen wie die Grundkarte. D3s
  // sphärische Füllung kann bei bestimmten Rotationen das Komplement füllen
  // (ganzer Planet farbig, eigentliche Fläche ausgespart). Diese Funktion
  // hält die Farbebene deshalb explizit an die sichtbare Hemisphäre gebunden.
  rings.forEach((ring) => {
    drawVisibleHemisphereFill(densifyRing(ring, density), radius, center, fillStyle);
  });

  rings.forEach((ring) => {
    drawProjectedLine(densifyRing(ring, density), radius, center, strokeStyle, lineWidth);
  });

  return true;
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

function normalizeVector(vector) {
  const length = Math.hypot(vector.x, vector.y, vector.z) || 1;
  return { x: vector.x / length, y: vector.y / length, z: vector.z / length };
}

function getHorizonIntersection(fromVector, toVector, horizon = 0.0008) {
  const denominator = toVector.z - fromVector.z;
  if (Math.abs(denominator) < 0.000001) return null;
  const t = clamp((horizon - fromVector.z) / denominator, 0, 1);
  const point = normalizeVector({
    x: fromVector.x + (toVector.x - fromVector.x) * t,
    y: fromVector.y + (toVector.y - fromVector.y) * t,
    z: horizon,
  });
  const xyLength = Math.hypot(point.x, point.y) || 1;
  return { x: point.x / xyLength, y: point.y / xyLength, z: 0, horizon: true };
}

function clipRingVectorsToVisibleHemisphere(points, horizon = 0.0008) {
  const source = points
    .slice(0, -1)
    .map(([lon, lat]) => toRotatedUnit(lon, lat));
  if (source.length < 3) return [];

  const clipped = [];
  for (let index = 0; index < source.length; index += 1) {
    const current = source[index];
    const next = source[(index + 1) % source.length];
    const currentInside = current.z >= horizon;
    const nextInside = next.z >= horizon;

    if (currentInside && nextInside) {
      clipped.push(next);
      continue;
    }

    const intersection = getHorizonIntersection(current, next, horizon);
    if (currentInside && !nextInside) {
      if (intersection) clipped.push(intersection);
    } else if (!currentInside && nextInside) {
      if (intersection) clipped.push(intersection);
      clipped.push(next);
    }
  }

  return clipped.filter((vector, index, vectors) => {
    const previous = vectors[index - 1];
    return !previous || Math.hypot(vector.x - previous.x, vector.y - previous.y, vector.z - previous.z) > 0.00001;
  });
}

function drawShortestHorizonArc(fromVector, toVector, radius, center) {
  const startAngle = getVectorCanvasAngle(fromVector);
  const endAngle = getVectorCanvasAngle(toVector);
  const clockwiseDistance = normalizeAngle(endAngle - startAngle);
  const counterClockwise = clockwiseDistance > Math.PI;
  ctx.arc(center.x, center.y, radius, startAngle, endAngle, counterClockwise);
}

function drawVisibleHemisphereFill(points, radius, center, fillStyle) {
  const clipped = clipRingVectorsToVisibleHemisphere(points);
  if (clipped.length < 3) return false;
  ctx.beginPath();
  clipped.forEach((vector, index) => {
    const previous = clipped[(index - 1 + clipped.length) % clipped.length];
    const point = projectVector(vector, radius, center.x, center.y);
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
      return;
    }
    if (previous?.horizon && vector.horizon) {
      drawShortestHorizonArc(previous, vector, radius, center);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  const first = clipped[0];
  const last = clipped[clipped.length - 1];
  if (last?.horizon && first?.horizon) {
    drawShortestHorizonArc(last, first, radius, center);
  } else {
    ctx.closePath();
  }
  ctx.fillStyle = fillStyle;
  ctx.fill();
  return true;
}

function getVectorCanvasAngle(vector) {
  return Math.atan2(-vector.y, vector.x);
}

function normalizeAngle(angle) {
  return (angle + Math.PI * 2) % (Math.PI * 2);
}

function drawLandSampleFill(radius, center, alphaBase = 0.56) {
  if (!geoState.samplesReady || !geoState.landSamples.length) return;
  const dotRadius = Math.max(1.6, getStableGlobeStrokeWidth(radius, 0.0085, 1.6));
  const landColor = getThemeMapColor("--land", "#c4c4c0");
  geoState.landSamples.forEach(({ lon, lat }) => {
    const vector = toRotatedUnit(lon, lat);
    if (vector.z <= 0.012) return;
    const point = projectVector(vector, radius, center.x, center.y);
    const alpha = clamp(alphaBase + vector.z * 0.18, 0.52, 0.78);
    ctx.beginPath();
    ctx.arc(point.x, point.y, dotRadius, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(landColor, alpha);
    ctx.fill();
  });
}

function ringIsFullyVisible(points, horizonPadding = 0.018) {
  return points.every(([lon, lat]) => toRotatedUnit(lon, lat).z > horizonPadding);
}

function drawGraticule(radius, center) {
  const strokeStyle = "rgba(60,64,63,.26)";
  const lineWidth = getStableGlobeStrokeWidth(radius, 0.0022, 0.75);
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
      drawProjectedFill(denseRing, radius, center, hexToRgba(getThemeMapColor("--land", "#c4c4c0"), .72));
    }
  });

  if (geoState.samplesReady) {
    const dotRadius = Math.max(1.85, radius * 0.011);
    const landColor = getThemeMapColor("--land", "#c4c4c0");
    geoState.landSamples.forEach(({ lon, lat }) => {
      const vector = toRotatedUnit(lon, lat);
      if (vector.z <= 0.01) return;
      const point = projectVector(vector, radius, center.x, center.y);
      const alpha = clamp(0.48 + vector.z * 0.24, 0.44, 0.76);
      ctx.beginPath();
      ctx.arc(point.x, point.y, dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(landColor, alpha);
      ctx.fill();
    });
  }

  geoState.landRings.forEach((ring) => {
    drawProjectedLine(densifyRing(ring, 1.2), radius, center, getThemeMapColor("--land-outline", "rgba(92,96,94,.5)"), getStableGlobeStrokeWidth(radius, 0.002, 0.7));
  });
}

function drawAtmosphere(size, radius, center) {
  const intensity = Math.max(0, Math.min(1, (2.35 - globeZoom) / 1.35));
  if (intensity <= 0) return;
  const shade = ctx.createRadialGradient(center.x - radius * 0.34, center.y - radius * 0.36, radius * 0.05, center.x, center.y, radius);
  shade.addColorStop(0, `rgba(255,255,255,${0.18 * intensity})`);
  shade.addColorStop(0.38, `rgba(255,255,255,${0.03 * intensity})`);
  shade.addColorStop(0.76, "rgba(0,0,0,0)");
  shade.addColorStop(1, `rgba(80,84,82,${0.16 * intensity})`);
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = shade;
  ctx.fill();
  ctx.lineWidth = Math.max(1, size * 0.004);
  ctx.strokeStyle = getThemeMapColor("--sphere-outline", "rgba(92,96,94,.28)");
  ctx.stroke();
}

function renderGlobe() {
  if (renderWebglGlobe()) return;
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
  drawSphere(baseSize, radius, center);
  ctx.save();
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
  ctx.clip();
  if (shouldRenderContinentalBaseMap()) {
    const usedGeographicProjection = drawGeographicLayer(radius, center);
    if (!usedGeographicProjection) {
      drawLand(radius, center);
    }
  }
  drawProjectBoundaryLayers(radius, center);
  drawAtmosphere(baseSize, radius, center);
  ctx.restore();
}

function resetProjectDeleteHold() {
  if (!projectDeleteHoldState) return;
  const { button, frame, pointerId } = projectDeleteHoldState;
  if (frame) cancelAnimationFrame(frame);
  if (button) {
    button.classList.remove("is-hold-active", "is-hold-ready");
    button.style.removeProperty("--hold-progress");
    if (Number.isFinite(pointerId) && button.hasPointerCapture?.(pointerId)) {
      try {
        button.releasePointerCapture(pointerId);
      } catch {
        // Pointer capture may already be released by the browser.
      }
    }
  }
  projectDeleteHoldState = null;
}

function tickProjectDeleteHold() {
  if (!projectDeleteHoldState) return;
  const elapsed = performance.now() - projectDeleteHoldState.startedAt;
  const progress = Math.max(0, Math.min(1, elapsed / PROJECT_DELETE_HOLD_MS));
  projectDeleteHoldState.button.style.setProperty("--hold-progress", `${progress * 100}%`);
  if (progress >= 1) {
    projectDeleteHoldState.armed = true;
    projectDeleteHoldState.button.classList.add("is-hold-ready");
    projectDeleteHoldState.frame = null;
    return;
  }
  projectDeleteHoldState.frame = requestAnimationFrame(tickProjectDeleteHold);
}

function deleteProjectById(projectId) {
  const index = state.projects.findIndex((project) => project.id === projectId);
  if (index < 0) return;
  state.projects.splice(index, 1);
  if (state.activeProjectId === projectId) {
    state.activeProjectId = state.projects[Math.max(0, index - 1)]?.id || state.projects[0]?.id || "";
  }
  state.openProjectBrowserMenuId = null;
  persistProjects();
  renderWorkspace();
  renderGlobe();
}

function beginProjectDeleteHold(event) {
  const button = event.currentTarget;
  if (!(button instanceof HTMLButtonElement)) return;
  event.preventDefault();
  event.stopPropagation();
  resetProjectDeleteHold();
  const projectId = String(button.dataset.projectId || "").trim();
  if (!projectId) return;
  projectDeleteHoldState = {
    button,
    projectId,
    pointerId: Number.isFinite(event.pointerId) ? event.pointerId : null,
    startedAt: performance.now(),
    armed: false,
    frame: null,
  };
  button.setPointerCapture?.(event.pointerId);
  button.classList.add("is-hold-active");
  button.style.setProperty("--hold-progress", "0%");
  projectDeleteHoldState.frame = requestAnimationFrame(tickProjectDeleteHold);
}

function finishProjectDeleteHold(event) {
  if (!projectDeleteHoldState) return;
  event.preventDefault();
  event.stopPropagation();
  const { button, projectId } = projectDeleteHoldState;
  const releaseTarget = document.elementFromPoint(event.clientX, event.clientY);
  const releasedOnButton = Boolean(releaseTarget && button && (releaseTarget === button || button.contains(releaseTarget)));
  const shouldDelete = projectDeleteHoldState.armed === true && releasedOnButton;
  resetProjectDeleteHold();
  if (shouldDelete) deleteProjectById(projectId);
}

function cancelProjectDeleteHold(event) {
  if (!projectDeleteHoldState) return;
  event.preventDefault();
  event.stopPropagation();
  resetProjectDeleteHold();
}

function resetLayerDeleteHold() {
  if (!layerDeleteHoldState) return;
  const { button, frame, pointerId } = layerDeleteHoldState;
  if (frame) cancelAnimationFrame(frame);
  if (button) {
    button.classList.remove("is-hold-active", "is-hold-ready");
    button.style.removeProperty("--hold-progress");
    if (Number.isFinite(pointerId) && button.hasPointerCapture?.(pointerId)) {
      try {
        button.releasePointerCapture(pointerId);
      } catch {
        // Pointer capture may already be released by the browser.
      }
    }
  }
  layerDeleteHoldState = null;
}

function tickLayerDeleteHold() {
  if (!layerDeleteHoldState) return;
  const elapsed = performance.now() - layerDeleteHoldState.startedAt;
  const progress = Math.max(0, Math.min(1, elapsed / PROJECT_DELETE_HOLD_MS));
  layerDeleteHoldState.button.style.setProperty("--hold-progress", `${progress * 100}%`);
  if (progress >= 1) {
    layerDeleteHoldState.armed = true;
    layerDeleteHoldState.button.classList.add("is-hold-ready");
    layerDeleteHoldState.frame = null;
    return;
  }
  layerDeleteHoldState.frame = requestAnimationFrame(tickLayerDeleteHold);
}

function deleteLayerById(projectId, layerId) {
  const project = state.projects.find((candidate) => candidate.id === projectId);
  const folder = (project?.libraryFolders || []).find((candidate) => candidate.items?.some((item) => item.id === layerId));
  if (!folder) return;
  const index = folder.items.findIndex((item) => item.id === layerId);
  if (index < 0) return;
  if (folder.items[index]?.locked) return;
  folder.items.splice(index, 1);
  if (project.activeLibraryItemId === layerId) {
    project.activeLibraryItemId = folder.items[Math.max(0, index - 1)]?.id || folder.items[0]?.id || "";
  }
  state.openLayerBrowserMenuId = null;
  persistProjects();
  renderWorkspace();
  renderGlobe();
}

function beginLayerDeleteHold(event) {
  const button = event.currentTarget;
  if (!(button instanceof HTMLButtonElement)) return;
  event.preventDefault();
  event.stopPropagation();
  resetLayerDeleteHold();
  const projectId = String(button.dataset.projectId || "").trim();
  const layerId = String(button.dataset.layerId || "").trim();
  if (!projectId || !layerId) return;
  layerDeleteHoldState = {
    button,
    projectId,
    layerId,
    pointerId: Number.isFinite(event.pointerId) ? event.pointerId : null,
    startedAt: performance.now(),
    armed: false,
    frame: null,
  };
  button.setPointerCapture?.(event.pointerId);
  button.classList.add("is-hold-active");
  button.style.setProperty("--hold-progress", "0%");
  layerDeleteHoldState.frame = requestAnimationFrame(tickLayerDeleteHold);
}

function finishLayerDeleteHold(event) {
  if (!layerDeleteHoldState) return;
  event.preventDefault();
  event.stopPropagation();
  const { button, projectId, layerId } = layerDeleteHoldState;
  const releaseTarget = document.elementFromPoint(event.clientX, event.clientY);
  const releasedOnButton = Boolean(releaseTarget && button && (releaseTarget === button || button.contains(releaseTarget)));
  const shouldDelete = layerDeleteHoldState.armed === true && releasedOnButton;
  resetLayerDeleteHold();
  if (shouldDelete) deleteLayerById(projectId, layerId);
}

function cancelLayerDeleteHold(event) {
  if (!layerDeleteHoldState) return;
  event.preventDefault();
  event.stopPropagation();
  resetLayerDeleteHold();
}

function createProjectCardMenu(project) {
  const shell = document.createElement("div");
  shell.className = "project-card-menu-shell";

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "project-card-menu-trigger";
  trigger.setAttribute("aria-label", "Projektaktionen");
  trigger.setAttribute("aria-expanded", state.openProjectBrowserMenuId === project.id ? "true" : "false");
  trigger.innerHTML = "<span class=\"project-card-menu-dots\" aria-hidden=\"true\"></span>";
  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    resetProjectDeleteHold();
    resetLayerDeleteHold();
    state.openLayerBrowserMenuId = null;
    state.openFolderBrowserMenuId = null;
    state.openProjectBrowserMenuId = state.openProjectBrowserMenuId === project.id ? null : project.id;
    renderProjectBrowser();
  });

  const menu = document.createElement("div");
  menu.className = "project-card-menu";
  menu.hidden = state.openProjectBrowserMenuId !== project.id;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "project-card-menu-action project-card-menu-action-delete";
  deleteButton.textContent = "Löschen";
  deleteButton.dataset.projectId = project.id;
  deleteButton.addEventListener("pointerdown", beginProjectDeleteHold);
  deleteButton.addEventListener("pointerup", finishProjectDeleteHold);
  deleteButton.addEventListener("pointercancel", cancelProjectDeleteHold);
  deleteButton.addEventListener("lostpointercapture", cancelProjectDeleteHold);

  menu.append(deleteButton);
  shell.append(trigger, menu);
  return shell;
}

function renderProjectBrowser() {
  if (!state.projects.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Noch kein Projekt angelegt. Die Erde oben ist die neutrale Startansicht.";
    ui.projectBrowserList.replaceChildren(empty);
    return;
  }

  ui.projectBrowserList.replaceChildren(...state.projects.map((project) => {
    const boundarySet = getActiveBoundarySet(project);
    const boundaryLayers = getLibraryFolder(project, "boundary-maps")?.items || [];
    const boundaryCollections = getLibraryFolder(project, "boundary-collections")?.items || [];
    const projectNodeId = `project:${project.id}`;
    const projectCollapsed = isBrowserNodeCollapsed(projectNodeId);
    const isActiveProject = project.id === state.activeProjectId;
    const card = document.createElement("article");
    card.className = "project-card";
    if (isActiveProject) card.classList.add("is-active");
    card.dataset.projectId = project.id;

    const row = document.createElement("div");
    row.className = "project-browser-row project-row";
    row.dataset.projectId = project.id;

    const visibility = document.createElement("input");
    visibility.type = "checkbox";
    visibility.className = "browser-visibility-checkbox";
    visibility.checked = isActiveProject;
    visibility.title = "Dieses Projekt aktivieren";
    visibility.addEventListener("click", (event) => event.stopPropagation());
    visibility.addEventListener("change", () => {
      // Projektregel: Der Haken auf Projektebene ist kein Sichtbarkeitsschalter
      // für Layer, sondern wählt genau ein aktives Earth-Map-Projekt. Die
      // Sichtbarkeit der Karten bleibt darunter in Kontinental-/Länderkarten.
      if (!visibility.checked && state.activeProjectId === project.id) {
        visibility.checked = true;
        return;
      }
      state.activeProjectId = project.id;
      state.openProjectBrowserMenuId = null;
      state.openFolderBrowserMenuId = null;
      state.openLayerBrowserMenuId = null;
      resetProjectDeleteHold();
      resetLayerDeleteHold();
      persistProjects();
      renderWorkspace();
      renderGlobe();
    });

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "browser-tree-toggle";
    toggle.textContent = projectCollapsed ? "▸" : "▾";
    toggle.setAttribute("aria-label", `${project.title} ${projectCollapsed ? "aufklappen" : "zuklappen"}`);
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleBrowserNode(projectNodeId);
    });

    const icon = document.createElement("span");
    icon.className = "browser-row-icon browser-row-icon-project";
    icon.setAttribute("aria-hidden", "true");

    const main = document.createElement("button");
    main.type = "button";
    main.className = "project-card-main";
    main.dataset.projectId = project.id;
    const title = document.createElement("strong");
    title.textContent = project.title;
    const meta = document.createElement("span");
    meta.textContent = [
      boundarySet?.label || "ohne Grenzgrundlage",
      `${boundaryLayers.length} Länderkarten`,
      `${boundaryCollections.length} Kartensammlungen`,
      project.status,
    ].join(" · ");
    main.append(title, meta);
    row.append(visibility, toggle, icon, main, createProjectCardMenu(project));
    card.append(row);
    if (!projectCollapsed) {
      card.append(
        createProjectLayerTree(project, "continental-maps", {
          iconClass: "browser-row-icon-continental",
          emptyText: "Noch keine Kontinentalkarten hinzugefügt.",
        }),
        createProjectLayerTree(project, "boundary-maps", {
          iconClass: "browser-row-icon-layers",
          emptyText: "Noch keine Länderkarten hinzugefügt.",
        }),
        createProjectLayerTree(project, "boundary-collections", {
          iconClass: "browser-row-icon-collections",
          emptyText: "Noch keine Kartensammlungen importiert.",
        }),
      );
    }
    return card;
  }));
}

function createProjectLayerTree(project, folderType, options = {}) {
  const folder = getLibraryFolder(project, folderType);
  if (!folder) return document.createDocumentFragment();
  const items = folder.items || [];
  const nodeId = `${folderType}:${project.id}`;
  const isCollapsed = isBrowserNodeCollapsed(nodeId);
  const layerTree = document.createElement("div");
  layerTree.className = "project-layer-tree";
  const visibleLayerCount = items.filter((item) => item.display?.visible !== false).length;
  const row = document.createElement("div");
  row.className = "project-browser-row layer-folder-row";

  const visibility = document.createElement("input");
  visibility.type = "checkbox";
  visibility.className = "browser-visibility-checkbox";
  visibility.checked = !items.length || visibleLayerCount === items.length;
  visibility.indeterminate = visibleLayerCount > 0 && visibleLayerCount < items.length;
  visibility.title = `Alle ${folder.title} ein-/ausblenden`;
  visibility.addEventListener("click", (event) => event.stopPropagation());
  visibility.addEventListener("change", () => {
    items.forEach((item) => {
      item.display = item.display || {};
      item.display.visible = visibility.checked;
    });
    persistProjects();
    renderWorkspace();
    renderGlobe();
  });

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "browser-tree-toggle";
  toggle.textContent = isCollapsed ? "▸" : "▾";
  toggle.setAttribute("aria-label", `${folder.title} ${isCollapsed ? "aufklappen" : "zuklappen"}`);
  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleBrowserNode(nodeId);
  });

  const icon = document.createElement("span");
  icon.className = `browser-row-icon ${options.iconClass || "browser-row-icon-layers"}`;
  icon.setAttribute("aria-hidden", "true");

  const copy = document.createElement("button");
  copy.type = "button";
  copy.className = "project-card-main layer-folder-main";
  copy.innerHTML = `<strong>${folder.title}</strong><span>${items.length} hinzugefügt, ${visibleLayerCount} sichtbar</span>`;
  copy.addEventListener("click", (event) => {
    event.preventDefault();
    toggleBrowserNode(nodeId);
  });

  const menuId = `${project.id}:${folderType}`;
  const menuShell = document.createElement("div");
  menuShell.className = "project-card-menu-shell";

  const menuButton = document.createElement("button");
  menuButton.type = "button";
  menuButton.className = "project-card-menu-trigger layer-folder-menu-trigger";
  menuButton.setAttribute("aria-label", `${folder.title}-Aktionen`);
  menuButton.setAttribute("aria-expanded", state.openFolderBrowserMenuId === menuId ? "true" : "false");
  menuButton.innerHTML = "<span class=\"project-card-menu-dots\" aria-hidden=\"true\"></span>";
  menuButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    resetProjectDeleteHold();
    resetLayerDeleteHold();
    state.openProjectBrowserMenuId = null;
    state.openLayerBrowserMenuId = null;
    state.openFolderBrowserMenuId = state.openFolderBrowserMenuId === menuId ? null : menuId;
    renderProjectBrowser();
  });

  const menu = document.createElement("div");
  menu.className = "project-card-menu";
  menu.hidden = state.openFolderBrowserMenuId !== menuId;

  const addButton = document.createElement("button");
  addButton.type = "button";
  addButton.className = "project-card-menu-action";
  addButton.textContent = "Hinzufügen";
  addButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    state.openFolderBrowserMenuId = null;
    renderProjectBrowser();
    setEditorTab(folderType === "boundary-collections" ? "collections" : "single-maps");
    if (folderType !== "boundary-collections") ui.boundarySearchInput?.focus();
  });
  menu.append(addButton);
  menuShell.append(menuButton, menu);

  row.append(visibility, toggle, icon, copy, menuShell);
  layerTree.append(row);

  if (isCollapsed) return layerTree;

  if (!items.length) {
    const empty = document.createElement("p");
    empty.className = "library-empty";
    empty.textContent = options.emptyText || "Noch keine Karten hinzugefügt.";
    layerTree.append(empty);
    return layerTree;
  }

  const list = document.createElement("div");
  list.className = "library-item-list";
  items.forEach((item) => {
    list.append(createLibraryItemButton(item, project));
  });
  layerTree.append(list);
  return layerTree;
}

function getLayerBrowserDetailLabel(item) {
  const raw = [item?.detail, item?.adminLevel].filter(Boolean).join(" · ");
  const match = raw.match(/\b(?:10m|50m|110m)\b/i);
  return match ? match[0].toLowerCase() : repairLegacyText(item?.detail || "");
}

function createLibraryItemButton(item, project) {
  const button = document.createElement("div");
  button.setAttribute("role", "button");
  button.tabIndex = 0;
  button.className = "library-item-card";
  button.dataset.libraryItemId = item.id;
  button.classList.toggle("is-active", item.id === project.activeLibraryItemId);
  button.classList.toggle("is-hidden-layer", item.display?.visible === false);
  button.style.setProperty("--layer-color", item.display?.color || DEFAULT_LAYER_FILL_COLOR);

  const visibility = document.createElement("input");
  visibility.type = "checkbox";
  visibility.className = "browser-visibility-checkbox";
  visibility.checked = item.display?.visible !== false;
  visibility.title = `${item.name} ein-/ausblenden`;
  visibility.addEventListener("click", (event) => event.stopPropagation());
  visibility.addEventListener("change", () => {
    item.display = item.display || {};
    item.display.visible = visibility.checked;
    persistProjects();
    renderWorkspace();
    renderGlobe();
  });

  const spacer = document.createElement("span");
  spacer.className = "browser-tree-toggle browser-tree-toggle-spacer";
  spacer.setAttribute("aria-hidden", "true");

  const glyph = document.createElement("span");
  glyph.className = "browser-row-icon library-item-glyph";
  glyph.setAttribute("aria-hidden", "true");
  const itemTitle = document.createElement("strong");
  itemTitle.textContent = item.name;
  const itemMeta = document.createElement("span");
  itemMeta.textContent = [item.source, getLayerBrowserDetailLabel(item)].filter(Boolean).join(" · ");
  const copy = document.createElement("span");
  copy.className = "library-item-copy";
  copy.append(itemTitle, itemMeta);
  const menuShell = document.createElement("div");
  menuShell.className = "layer-row-menu-shell";

  const menuButton = document.createElement("button");
  menuButton.type = "button";
  menuButton.className = "layer-row-menu-trigger";
  menuButton.setAttribute("aria-label", `${item.name}: Aktionen`);
  menuButton.setAttribute("aria-expanded", state.openLayerBrowserMenuId === item.id ? "true" : "false");
  menuButton.innerHTML = "<span class=\"layer-row-menu-dots\" aria-hidden=\"true\"></span>";
  menuButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    resetLayerDeleteHold();
    state.openProjectBrowserMenuId = null;
    state.openFolderBrowserMenuId = null;
    state.openLayerBrowserMenuId = state.openLayerBrowserMenuId === item.id ? null : item.id;
    renderProjectBrowser();
  });

  const menu = document.createElement("div");
  menu.className = "layer-row-menu";
  menu.hidden = state.openLayerBrowserMenuId !== item.id;

  if (item.locked) {
    const lockedNote = document.createElement("button");
    lockedNote.type = "button";
    lockedNote.className = "project-card-menu-action layer-row-menu-action-disabled";
    lockedNote.textContent = "Standardkarte";
    lockedNote.disabled = true;
    menu.append(lockedNote);
  } else {
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "project-card-menu-action project-card-menu-action-delete";
    deleteButton.textContent = "Löschen";
    deleteButton.dataset.projectId = project.id;
    deleteButton.dataset.layerId = item.id;
    deleteButton.addEventListener("pointerdown", beginLayerDeleteHold);
    deleteButton.addEventListener("pointerup", finishLayerDeleteHold);
    deleteButton.addEventListener("pointercancel", cancelLayerDeleteHold);
    deleteButton.addEventListener("lostpointercapture", cancelLayerDeleteHold);
    menu.append(deleteButton);
  }
  menuShell.append(menuButton, menu);
  button.append(visibility, spacer, glyph, copy, menuShell);
  return button;
}

function renderLibraryBrowser() {
  if (!ui.libraryBrowserList) return;
  ui.libraryBrowserList.replaceChildren();
}

function renderBoundaryEditor() {
  if (!ui.boundarySummary || !ui.boundaryLevelList) return;
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
    ui.layerEditorSummary.textContent = "Wähle links in der Projektbibliothek eine Karte aus.";
    ui.layerEditorContent.hidden = true;
    ui.layerMetaList.replaceChildren();
    return;
  }

  if (state.activeEditorItemId !== item.id) {
    state.activeEditorItemId = item.id;
    state.activeEditorChapterKey = "";
  }

  ui.layerEditorTitle.textContent = item.name;
  ui.layerEditorSummary.textContent = getLayerEditorSummary(item);
  ui.layerEditorContent.hidden = false;
  ui.layerMetaList.className = "structured-editor";
  ui.layerMetaList.replaceChildren(...createLayerEditorSections(item, project));
}

function getLayerEditorSummary(item) {
  if (item?.kind === "boundary-collection") {
    return "Kartensammlung mit referenzierbaren Einzelflächen, Quellen-, Lizenz- und Gültigkeitsdaten.";
  }
  if (item?.kind === "continental-map") {
    return "Hintergrund- und Kontinentalkarte des aktiven Projekts.";
  }
  return "Einzelkarte mit Anzeigeoptionen, Herkunftsdaten und Referenzen.";
}

function ensureBoundarySetShape(item) {
  if (!item.boundarySet) return null;
  item.boundarySet.source = item.boundarySet.source || {};
  item.boundarySet.license = item.boundarySet.license || createInternalLicenseMetadata();
  item.boundarySet.license.compatibility = item.boundarySet.license.compatibility || {};
  item.boundarySet.features = Array.isArray(item.boundarySet.features) ? item.boundarySet.features : [];
  return item.boundarySet;
}

function setObjectValue(target, path, value) {
  const parts = path.split(".");
  let cursor = target;
  parts.slice(0, -1).forEach((part) => {
    cursor[part] = cursor[part] && typeof cursor[part] === "object" ? cursor[part] : {};
    cursor = cursor[part];
  });
  cursor[parts.at(-1)] = value;
}

function syncItemFromBoundarySet(item) {
  const boundarySet = item.boundarySet;
  if (!boundarySet) return;
  item.name = repairLegacyText(boundarySet.title || item.name);
  item.source = repairLegacyText(boundarySet.source?.label || item.source);
  item.iso3 = boundarySet.country_iso3 || item.iso3 || "";
  item.adminLevel = repairLegacyText(boundarySet.admin_level || boundarySet.boundary_type || item.adminLevel || "");
  item.detail = `${boundarySet.features?.length || 0} Einheiten`;
  item.license = repairLegacyText(boundarySet.license?.label || item.license || "");
  item.sourceUrl = boundarySet.source?.url || item.sourceUrl || "";
  item.temporalCoverage = {
    ...(item.temporalCoverage || {}),
    label: [boundarySet.valid_from ? `seit ${boundarySet.valid_from}` : "", boundarySet.valid_to ? `bis ${boundarySet.valid_to}` : ""].filter(Boolean).join(" · ") || boundarySet.year_represented || item.temporalCoverage?.label || "Gültigkeit nicht geprüft",
    from: boundarySet.valid_from || "",
    to: boundarySet.valid_to || "",
  };
}

function persistEditorMutation(item, options = {}) {
  if (item.boundarySet) syncItemFromBoundarySet(item);
  persistProjects();
  if (options.renderBrowser) renderProjectBrowser();
  if (options.renderGlobe) renderGlobe();
  if (ui.layerEditorTitle) ui.layerEditorTitle.textContent = item.name || "Karte";
  if (ui.layerEditorSummary) ui.layerEditorSummary.textContent = getLayerEditorSummary(item);
}

function createEditorSection(title, description = "", options = {}) {
  const key = options.key || slugifyBoundaryId(title);
  const section = document.createElement("section");
  const isOpen = state.activeEditorChapterKey === key;
  section.className = "structured-editor-section";
  section.classList.toggle("is-open", isOpen);
  section.dataset.editorChapter = key;

  const header = document.createElement("button");
  header.type = "button";
  header.className = "structured-editor-section-header";
  header.setAttribute("aria-expanded", String(isOpen));
  header.addEventListener("click", () => {
    state.activeEditorChapterKey = state.activeEditorChapterKey === key ? "" : key;
    renderLayerEditor();
    updateEditorModeView();
  });

  const icon = document.createElement("span");
  icon.className = "structured-editor-section-icon";
  icon.style.setProperty("--section-icon", `url("${options.icon || "https://api.iconify.design/mdi/form-select.svg"}")`);
  icon.setAttribute("aria-hidden", "true");

  const copy = document.createElement("span");
  copy.className = "structured-editor-section-copy";
  const heading = document.createElement("strong");
  heading.textContent = title;
  copy.append(heading);

  const chevron = document.createElement("span");
  chevron.className = "structured-editor-section-chevron";
  chevron.setAttribute("aria-hidden", "true");
  chevron.textContent = isOpen ? "▾" : "▸";
  header.append(icon, copy, chevron);

  const body = document.createElement("div");
  body.className = "structured-editor-section-body";
  body.hidden = !isOpen;
  if (description) {
    const descriptionNode = document.createElement("p");
    descriptionNode.className = "structured-editor-section-description";
    descriptionNode.textContent = description;
    body.append(descriptionNode);
  }

  section.append(header, body);
  section.append = (...nodes) => {
    body.append(...nodes);
    return section;
  };
  return section;
}

function createTextInputField(label, value, onChange, options = {}) {
  const field = document.createElement("label");
  field.className = "structured-editor-field";
  const caption = document.createElement("span");
  caption.textContent = label;
  const input = document.createElement(options.multiline ? "textarea" : "input");
  if (!options.multiline) input.type = options.type || "text";
  input.value = value ?? "";
  input.placeholder = options.placeholder || "";
  input.readOnly = options.readonly === true;
  input.addEventListener("change", () => onChange(input.value));
  field.append(caption, input);
  return field;
}

function createColorPickerField(label, value, onChange, options = {}) {
  const field = document.createElement("label");
  field.className = "z-color-choice-field structured-editor-color-field";
  const caption = document.createElement("span");
  caption.className = "z-color-choice-label";
  caption.textContent = label;

  const controls = document.createElement("div");
  controls.className = "z-color-choice-surface layer-color-controls";
  const input = document.createElement("input");
  input.type = "color";
  input.className = "z-color-choice-native";
  input.value = normalizeColorValue(value, options.fallback || DEFAULT_LAYER_FILL_COLOR) || options.fallback || DEFAULT_LAYER_FILL_COLOR;
  input.setAttribute("aria-label", `${label}: freie Farbe wählen`);
  controls.style.setProperty("--z-color-current", input.value);

  const codeInput = document.createElement("input");
  codeInput.type = "text";
  codeInput.className = "z-color-choice-code";
  codeInput.value = input.value;
  codeInput.placeholder = options.fallback || DEFAULT_LAYER_FILL_COLOR;
  codeInput.autocomplete = "off";
  codeInput.spellcheck = false;
  codeInput.setAttribute("aria-label", `${label}: Farbcode`);

  const applyColorValue = (rawValue, { normalizeOnInvalid = false } = {}) => {
    const normalized = normalizeColorValue(rawValue, "");
    if (!normalized) {
      if (normalizeOnInvalid) codeInput.value = input.value;
      return false;
    }
    input.value = normalized;
    codeInput.value = normalized;
    controls.style.setProperty("--z-color-current", normalized);
    onChange(normalized);
    return true;
  };

  const customButton = document.createElement("button");
  customButton.type = "button";
  customButton.className = "z-color-choice-button z-color-choice-custom-button";
  customButton.setAttribute("aria-label", `${label}: individuelle Farbe wählen`);
  const customIcon = document.createElement("span");
  customIcon.className = "z-color-choice-button-icon";
  customIcon.setAttribute("aria-hidden", "true");
  customButton.append(customIcon);
  customButton.addEventListener("click", (event) => {
    event.preventDefault();
    input.click();
  });

  input.addEventListener("input", () => {
    applyColorValue(input.value);
  });
  codeInput.addEventListener("input", () => {
    applyColorValue(codeInput.value);
  });
  codeInput.addEventListener("change", () => {
    applyColorValue(codeInput.value, { normalizeOnInvalid: true });
  });

  const paletteButton = document.createElement("button");
  paletteButton.type = "button";
  paletteButton.className = "z-color-choice-button z-color-choice-palette-button color-picker-button";
  paletteButton.setAttribute("aria-label", `${label}: Projektfarben wählen`);
  const paletteIcon = document.createElement("span");
  paletteIcon.className = "z-color-choice-button-icon color-picker-icon";
  paletteIcon.setAttribute("aria-hidden", "true");
  paletteButton.append(paletteIcon);

  const palette = document.createElement("div");
  palette.className = "z-color-choice-palette color-palette layer-color-palette";
  palette.hidden = true;

  const closePalette = () => {
    if (palette.hidden) return;
    palette.hidden = true;
    paletteButton.setAttribute("aria-expanded", "false");
    document.removeEventListener("mousedown", handleDocumentPointerDown, true);
  };

  function handleDocumentPointerDown(event) {
    if (controls.contains(event.target)) return;
    closePalette();
  }

  const renderPalette = () => {
    const colors = collectProjectPaletteColors(getActiveProject(), [input.value, options.fallback]);
    if (!colors.length) {
      const note = document.createElement("p");
      note.className = "z-color-choice-empty palette-empty";
      note.textContent = "Noch keine Projektfarben.";
      palette.replaceChildren(note);
      return;
    }
    palette.replaceChildren(...colors.map((color) => {
      const swatch = document.createElement("button");
      swatch.type = "button";
      swatch.className = "z-color-choice-swatch color-swatch";
      swatch.style.setProperty("--z-color-swatch", color);
      swatch.setAttribute("aria-label", `Farbe ${color}`);
      swatch.classList.toggle("is-active", normalizeColorValue(input.value) === color);
      swatch.addEventListener("click", (event) => {
        event.preventDefault();
        applyColorValue(color);
        closePalette();
      });
      return swatch;
    }));
  };

  paletteButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (palette.hidden) {
      renderPalette();
      palette.hidden = false;
      paletteButton.setAttribute("aria-expanded", "true");
      document.addEventListener("mousedown", handleDocumentPointerDown, true);
    } else {
      closePalette();
    }
  });

  controls.append(caption, codeInput, input, customButton, paletteButton, palette);
  field.append(controls);
  return field;
}

function createSelectField(label, value, choices, onChange) {
  const field = document.createElement("label");
  field.className = "structured-editor-field";
  const caption = document.createElement("span");
  caption.textContent = label;
  const select = document.createElement("select");
  const normalizedChoices = [...choices];
  if (value && !normalizedChoices.some((choice) => choice.value === value)) {
    normalizedChoices.push({ value, label: `Importierter Wert · ${value}` });
  }
  normalizedChoices.forEach((choice) => {
    const option = document.createElement("option");
    option.value = choice.value;
    option.textContent = choice.label;
    select.append(option);
  });
  select.value = value || choices[0]?.value || "";
  select.addEventListener("change", () => onChange(select.value));
  field.append(caption, select);
  return field;
}

function getIso3CountryChoices() {
  const features = getNaturalEarthCountryDataset()?.features || [];
  const choices = features
    .map((feature) => ({
      value: getNaturalEarthIso3(feature),
      label: `${getNaturalEarthIso3(feature)} · ${getNaturalEarthCountryName(feature)}`,
    }))
    .filter((choice) => choice.value)
    .sort((a, b) => a.label.localeCompare(b.label, "de"));
  return [{ value: "", label: "—" }, ...choices];
}

function createSearchableSelectField(label, value, choices, onChange) {
  const field = document.createElement("label");
  field.className = "structured-editor-field";
  const caption = document.createElement("span");
  caption.textContent = label;
  const input = document.createElement("input");
  const list = document.createElement("datalist");
  const listId = `list-${slugifyBoundaryId(label)}-${Math.random().toString(36).slice(2, 8)}`;
  list.id = listId;
  input.setAttribute("list", listId);
  input.value = value || "";
  choices.forEach((choice) => {
    const option = document.createElement("option");
    option.value = choice.value;
    option.label = choice.label;
    option.textContent = choice.label;
    list.append(option);
  });
  input.addEventListener("change", () => onChange(input.value.trim()));
  field.append(caption, input, list);
  return field;
}

function getBoundaryLevelChoices() {
  return [
    { value: "", label: "—" },
    { value: "ADM0", label: "ADM0 · Staat / Land" },
    { value: "ADM1", label: "ADM1 · Bundesland / Region" },
    { value: "ADM2", label: "ADM2 · Kreis / Bezirk" },
    { value: "ADM3", label: "ADM3 · Gemeindeebene / Unterbezirk" },
    { value: "ADM4", label: "ADM4 · lokale Verwaltungsebene" },
    { value: "ADM5", label: "ADM5 · feinste Verwaltungsebene" },
    { value: "electoral_district", label: "Wahlkreis" },
    { value: "municipality", label: "Gemeinde" },
    { value: "continent", label: "Kontinent / Landfläche" },
    { value: "coastline", label: "Küstenlinie" },
    { value: "custom", label: "Benutzerdefiniert" },
  ];
}

function createCheckboxField(label, checked, onChange) {
  const field = document.createElement("label");
  field.className = "structured-editor-check";
  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = checked === true;
  input.addEventListener("change", () => onChange(input.checked));
  const caption = document.createElement("span");
  caption.textContent = label;
  field.append(input, caption);
  return field;
}

function createLayerEditorSections(item) {
  const boundarySet = ensureBoundarySetShape(item);
  const sections = [];
  const availableChapterKeys = new Set(["display", "identity", "source", "time"]);
  if (boundarySet) availableChapterKeys.add("features");
  if (state.activeEditorChapterKey && !availableChapterKeys.has(state.activeEditorChapterKey)) {
    state.activeEditorChapterKey = "";
  }

  const display = createEditorSection("Anzeige", "Diese Werte steuern, wie die Karte im aktiven Projekt erscheint.", {
    key: "display",
    icon: "https://api.iconify.design/mdi/eye-outline.svg",
  });
  display.append(
    createColorPickerField("Anzeigefarbe", item.display?.color || DEFAULT_LAYER_FILL_COLOR, (value) => {
      item.display = item.display || {};
      item.display.color = normalizeColorValue(value, DEFAULT_LAYER_FILL_COLOR);
      persistEditorMutation(item, { renderBrowser: true, renderGlobe: true });
    }, { fallback: DEFAULT_LAYER_FILL_COLOR }),
    createColorPickerField("Outline-Farbe", item.display?.outlineColor || DEFAULT_LAYER_OUTLINE_COLOR, (value) => {
      item.display = item.display || {};
      item.display.outlineColor = normalizeColorValue(value, DEFAULT_LAYER_OUTLINE_COLOR);
      persistEditorMutation(item, { renderGlobe: true });
    }, { fallback: DEFAULT_LAYER_OUTLINE_COLOR }),
    createTextInputField("Titel im Browser", item.name || "", (value) => {
      item.name = repairLegacyText(value);
      if (boundarySet) boundarySet.title = item.name;
      persistEditorMutation(item, { renderBrowser: true });
    }),
    createCheckboxField("Sichtbar", item.display?.visible !== false, (checked) => {
      item.display = item.display || {};
      item.display.visible = checked;
      persistEditorMutation(item, { renderBrowser: true, renderGlobe: true });
    }),
  );
  sections.push(display);

  const identity = createEditorSection("Identität", "Stabile IDs, Typen und Codes. Diese Werte sind wichtig für spätere Tabellenzuordnung.", {
    key: "identity",
    icon: "https://api.iconify.design/mdi/identifier.svg",
  });
  if (boundarySet) {
    identity.append(
      createTextInputField("Boundary-Set-ID", boundarySet.id || "", (value) => {
        boundarySet.id = slugifyBoundaryId(value, boundarySet.id || "boundary-set");
        item.geometryRef = { ...(item.geometryRef || {}), boundarySetId: boundarySet.id };
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createSelectField("Kartentyp", boundarySet.boundary_type || "unknown", [
        { value: "unknown", label: "Unbestimmt" },
        { value: "administrative", label: "Administrative Grenzen" },
        { value: "electoral_districts", label: "Wahlkreise" },
        { value: "municipalities", label: "Gemeinden" },
        { value: "historical_boundaries", label: "Historische Grenzen" },
        { value: "other", label: "Andere" },
      ], (value) => {
        boundarySet.boundary_type = value;
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createSearchableSelectField("Land ISO-3", boundarySet.country_iso3 || "", getIso3CountryChoices(), (value) => {
        boundarySet.country_iso3 = value.trim().toUpperCase();
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createSelectField("Ebene", boundarySet.admin_level || "", getBoundaryLevelChoices(), (value) => {
        boundarySet.admin_level = repairLegacyText(value);
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createTextInputField("Provider", boundarySet.provider || "", (value) => {
        boundarySet.provider = repairLegacyText(value);
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createTextInputField("Provider-ID", boundarySet.provider_boundary_id || "", (value) => {
        boundarySet.provider_boundary_id = repairLegacyText(value);
        persistEditorMutation(item);
      }),
      createSelectField("Review-Status", boundarySet.review_status || "imported", [
        { value: "imported", label: "Importiert" },
        { value: "normalized", label: "Normalisiert" },
        { value: "reviewed", label: "Geprüft" },
        { value: "canonical", label: "Kanonisch" },
        { value: "blocked", label: "Gesperrt" },
      ], (value) => {
        boundarySet.review_status = value;
        persistEditorMutation(item);
      }),
    );
  } else {
    identity.append(
      createTextInputField("Layer-ID", item.id || "", () => {}, { readonly: true }),
      createTextInputField("Typ", item.kind || "", () => {}, { readonly: true }),
      createSearchableSelectField("ISO-3", item.iso3 || "", getIso3CountryChoices(), (value) => {
        item.iso3 = value.trim().toUpperCase();
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createSelectField("Ebene", item.adminLevel || "", getBoundaryLevelChoices(), (value) => {
        item.adminLevel = repairLegacyText(value);
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createTextInputField("Detail", item.detail || "", (value) => {
        item.detail = repairLegacyText(value);
        persistEditorMutation(item, { renderBrowser: true });
      }),
    );
  }
  sections.push(identity);

  const source = createEditorSection("Quelle und Lizenz", "Diese Felder entscheiden später, ob eine Karte nur intern nutzbar oder veröffentlichungsfähig ist.", {
    key: "source",
    icon: "https://api.iconify.design/material-symbols/source-notes-outline.svg",
  });
  if (boundarySet) {
    source.append(
      createTextInputField("Quelle", boundarySet.source.label || "", (value) => {
        boundarySet.source.label = repairLegacyText(value);
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createTextInputField("Quell-URL", boundarySet.source.url || "", (value) => {
        boundarySet.source.url = value.trim();
        persistEditorMutation(item);
      }),
      createTextInputField("Abrufdatum", boundarySet.source.accessed_at || "", (value) => {
        boundarySet.source.accessed_at = value.trim();
        persistEditorMutation(item);
      }, { type: "date" }),
      createTextInputField("Lizenz-ID", boundarySet.license.id || "", (value) => {
        boundarySet.license.id = repairLegacyText(value);
        persistEditorMutation(item);
      }),
      createTextInputField("Lizenz", boundarySet.license.label || "", (value) => {
        boundarySet.license.label = repairLegacyText(value);
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createTextInputField("Lizenz-URL", boundarySet.license.url || "", (value) => {
        boundarySet.license.url = value.trim();
        persistEditorMutation(item);
      }),
      createTextInputField("Lizenzhinweis", boundarySet.license.detail || "", (value) => {
        boundarySet.license.detail = repairLegacyText(value);
        persistEditorMutation(item);
      }, { multiline: true }),
      createCheckboxField("Wikimedia-kompatibel", boundarySet.license.compatibility.wikimedia === true, (checked) => {
        boundarySet.license.compatibility.wikimedia = checked;
        persistEditorMutation(item);
      }),
      createCheckboxField("OpenStreetMap-kompatibel", boundarySet.license.compatibility.openstreetmap === true, (checked) => {
        boundarySet.license.compatibility.openstreetmap = checked;
        persistEditorMutation(item);
      }),
      createCheckboxField("Namensnennung erforderlich", boundarySet.license.compatibility.attribution_required === true, (checked) => {
        boundarySet.license.compatibility.attribution_required = checked;
        persistEditorMutation(item);
      }),
    );
  } else {
    source.append(
      createTextInputField("Quelle", item.source || "", (value) => {
        item.source = repairLegacyText(value);
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createTextInputField("Referenz", item.sourceUrl || "", (value) => {
        item.sourceUrl = value.trim();
        persistEditorMutation(item);
      }),
      createTextInputField("Lizenz", item.license || "", (value) => {
        item.license = repairLegacyText(value);
        persistEditorMutation(item, { renderBrowser: true });
      }),
    );
  }
  sections.push(source);

  const time = createEditorSection("Zeit und Gültigkeit", "Gültigkeiten helfen später, historische oder politische Boundary-Sets korrekt zu wählen.", {
    key: "time",
    icon: "https://api.iconify.design/mdi/calendar-clock-outline.svg",
  });
  if (boundarySet) {
    time.append(
      createTextInputField("Repräsentiertes Jahr", boundarySet.year_represented || "", (value) => {
        boundarySet.year_represented = value.trim();
        persistEditorMutation(item, { renderBrowser: true });
      }),
      createTextInputField("Gültig seit", boundarySet.valid_from || "", (value) => {
        boundarySet.valid_from = value.trim();
        persistEditorMutation(item, { renderBrowser: true });
      }, { type: "date" }),
      createTextInputField("Gültig bis", boundarySet.valid_to || "", (value) => {
        boundarySet.valid_to = value.trim() || null;
        persistEditorMutation(item, { renderBrowser: true });
      }, { type: "date" }),
    );
  } else {
    time.append(
      createTextInputField("Zeitspanne", item.temporalCoverage?.label || "", (value) => {
        item.temporalCoverage = { ...(item.temporalCoverage || {}), label: repairLegacyText(value) };
        persistEditorMutation(item, { renderBrowser: true });
      }),
    );
  }
  sections.push(time);

  if (boundarySet) {
    const content = createEditorSection("Einzelflächen", "Die Geometrien bleiben erhalten; hier prüfen wir zunächst Identität, Namen und Wikidata-Bezüge.", {
      key: "features",
      icon: "https://api.iconify.design/mdi/vector-polygon.svg",
    });
    const unitList = document.createElement("div");
    unitList.className = "boundary-feature-list";
    boundarySet.features.slice(0, 80).forEach((feature) => {
      const row = document.createElement("div");
      row.className = "boundary-feature-row";
      const title = document.createElement("strong");
      title.textContent = feature.name || feature.id;
      const meta = document.createElement("span");
      meta.textContent = [feature.id, feature.wikidata_id].filter(Boolean).join(" · ") || "ohne ID";
      row.append(title, meta);
      unitList.append(row);
    });
    if (boundarySet.features.length > 80) {
      const note = document.createElement("p");
      note.className = "empty-state";
      note.textContent = `Weitere ${boundarySet.features.length - 80} Einheiten sind importiert, werden hier aber aus Performancegründen nicht vollständig gelistet.`;
      unitList.append(note);
    }
    content.append(unitList);
    sections.push(content);
  }

  return sections;
}

function renderCollectionImportEditor() {
  if (!ui.collectionImportTitle || !ui.collectionImportSummary || !ui.collectionImportContent || !ui.collectionImportMetaList) return;
  const pending = state.pendingBoundarySetImport;
  if (!pending?.boundarySet) {
    ui.collectionImportTitle.textContent = "Keine Sammlung geladen";
    ui.collectionImportSummary.textContent = "Importiere eine Kartensammlung, um Quelle, Lizenz, Einheiten und Kompatibilität zu prüfen.";
    ui.collectionImportContent.hidden = true;
    ui.collectionImportMetaList.replaceChildren();
    if (ui.addCollectionToProjectButton) ui.addCollectionToProjectButton.disabled = true;
    return;
  }

  const boundarySet = pending.boundarySet;
  ui.collectionImportTitle.textContent = boundarySet.title || pending.fileName || "Kartensammlung";
  ui.collectionImportSummary.textContent = `${boundarySet.features?.length || 0} Einheiten · ${boundarySet.boundary_type || "Typ ungeklärt"} · ${boundarySet.review_status || "imported"}`;
  ui.collectionImportContent.hidden = false;
  if (ui.addCollectionToProjectButton) ui.addCollectionToProjectButton.disabled = false;
  const rows = [
    ["Datei", pending.fileName || "—"],
    ["Schema", boundarySet.schema || "—"],
    ["ID", boundarySet.id || "—"],
    ["Typ", boundarySet.boundary_type || "—"],
    ["ISO-3", boundarySet.country_iso3 || "—"],
    ["Einheiten", String(boundarySet.features?.length || 0)],
    ["Quelle", boundarySet.source?.label || "—"],
    ["Lizenz", boundarySet.license?.label || "—"],
    ["Wikimedia", boundarySet.license?.compatibility?.wikimedia === true ? "kompatibel" : "nicht geprüft/Nein"],
    ["OpenStreetMap", boundarySet.license?.compatibility?.openstreetmap === true ? "kompatibel" : "nicht geprüft/Nein"],
    ["Gültigkeit", [boundarySet.valid_from ? `seit ${boundarySet.valid_from}` : "", boundarySet.valid_to ? `bis ${boundarySet.valid_to}` : ""].filter(Boolean).join(" · ") || "nicht geprüft"],
  ];
  ui.collectionImportMetaList.replaceChildren(...rows.flatMap(([term, description]) => {
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
  renderCollectionImportEditor();
  updateEditorModeView();
}

function getEditorTabForLibraryItem(item) {
  if (item?.kind === "boundary-collection") return "collections";
  if (item?.kind === "continental-map") return "background";
  return "single-maps";
}

function updateEditorModeView() {
  const activeTab = state.activeEditorTab;
  const objectMode = state.editorMode === "object";
  document.querySelectorAll(".single-map-tool-section").forEach((section) => {
    section.hidden = activeTab === "single-maps" && objectMode;
  });
  document.querySelectorAll(".collection-tool-section").forEach((section) => {
    section.hidden = activeTab === "collections" && objectMode;
  });
  if (ui.mapObjectEditor) {
    const item = getActiveLibraryItem();
    const targetPanel = document.querySelector(`[data-editor-panel="${activeTab}"]`);
    const canShowObjectEditor = objectMode && item && targetPanel && activeTab === getEditorTabForLibraryItem(item);
    ui.mapObjectEditor.hidden = !canShowObjectEditor;
    if (canShowObjectEditor && ui.mapObjectEditor.parentElement !== targetPanel) {
      targetPanel.appendChild(ui.mapObjectEditor);
    }
  }
}

function setEditorTab(tabName, options = {}) {
  state.activeEditorTab = tabName;
  state.editorMode = options.mode || "tool";
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
  updateEditorModeView();
}

function openLibraryItemEditor(item = getActiveLibraryItem()) {
  setEditorTab(getEditorTabForLibraryItem(item), { mode: "object" });
}

function normalizeSearchText(value) {
  return String(value || "")
    .toLocaleLowerCase("de-DE")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeGermanSearchText(value) {
  return String(value || "")
    .toLocaleLowerCase("de-DE")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getSearchNeedles(value) {
  const raw = String(value || "").trim();
  return [...new Set([
    normalizeSearchText(raw),
    normalizeGermanSearchText(raw),
  ].filter(Boolean))];
}

function getNaturalEarthSearchValues(props) {
  return [
    props.NAME_DE, props.NAME, props.ADMIN, props.NAME_LONG, props.SOVEREIGNT,
    props.FORMAL_DE, props.FORMAL_EN, props.NAME_EN, props.NAME_FR, props.NAME_ES,
    props.NAME_ALT, props.ABBREV, props.POSTAL,
    props.ISO_A2, props.ISO_A2_EH, props.ISO_A3, props.ISO_A3_EH, props.ADM0_A3,
  ].map(repairLegacyText);
}

function getNaturalEarthCountryName(feature) {
  return repairLegacyText(feature?.properties?.NAME_DE
    || feature?.properties?.NAME
    || feature?.properties?.ADMIN
    || feature?.properties?.NAME_LONG
    || "Unbenanntes Land");
}

function getNaturalEarthIso3(feature) {
  const props = feature?.properties || {};
  return props.ISO_A3_EH || props.ISO_A3 || props.ADM0_A3 || "";
}

function searchNaturalEarthCountries(query) {
  const needles = getSearchNeedles(query);
  const dataset = getNaturalEarthCountryDataset();
  const features = dataset.features;
  if (!needles.length) return [];
  return features
    .filter((feature) => {
      const props = feature.properties || {};
      const haystack = getNaturalEarthSearchValues(props)
        .flatMap(getSearchNeedles)
        .join(" ");
      return needles.some((needle) => haystack.includes(needle));
    })
    .slice(0, 8)
    .map((feature) => ({
      id: `natural-earth-${getNaturalEarthIso3(feature) || getNaturalEarthCountryName(feature)}`,
      name: getNaturalEarthCountryName(feature),
      source: "Natural Earth",
      level: "ADM0 · Land",
      detail: `${dataset.label} · lokale Grunddaten`,
      license: "Public Domain",
      iso3: getNaturalEarthIso3(feature),
      datasetDetail: dataset.detail,
      datasetUrl: dataset.sourceUrl,
      importStatus: "bereit",
    }));
}

function slugifyBoundaryId(value, fallback = "boundary") {
  return String(value || fallback)
    .toLocaleLowerCase("de-DE")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96) || fallback;
}

function getFeatureDisplayName(feature, index) {
  const props = feature?.properties || {};
  return repairLegacyText(
    props.name
    || props.NAME
    || props.Name
    || props.GEN
    || props.label
    || props.WKR_NAME
    || props.wahlkreis_name
    || props.Wahlkreis
    || `Einheit ${index + 1}`,
  );
}

function getFeatureStableId(feature, index, setId) {
  const props = feature?.properties || {};
  return String(
    feature?.id
    || props.id
    || props.ID
    || props.iso_3166_2
    || props.ISO3166_2
    || props.ags
    || props.AGS
    || props.WKR_NR
    || props.wahlkreis_nr
    || `${setId}-${index + 1}`,
  );
}

function getFileExtension(fileName = "") {
  const match = String(fileName).toLowerCase().match(/\.([a-z0-9]+)$/);
  return match ? match[1] : "";
}

function getXmlChildrenByLocalName(node, localName) {
  return [...(node?.children || [])].filter((child) => child.localName === localName);
}

function getFirstXmlText(node, localName) {
  const match = node?.getElementsByTagNameNS?.("*", localName)?.[0]
    || node?.getElementsByTagName?.(localName)?.[0];
  return repairLegacyText(match?.textContent?.trim() || "");
}

function parseKmlCoordinateText(text) {
  const coordinates = String(text || "")
    .trim()
    .split(/\s+/)
    .map((tuple) => {
      const [lon, lat] = tuple.split(",").map(Number);
      return Number.isFinite(lon) && Number.isFinite(lat) ? [lon, lat] : null;
    })
    .filter(Boolean);
  if (coordinates.length < 3) return [];
  const first = coordinates[0];
  const last = coordinates[coordinates.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) coordinates.push([...first]);
  return coordinates;
}

function parseKmlPolygon(polygonNode) {
  const rings = [];
  const outer = polygonNode.getElementsByTagNameNS("*", "outerBoundaryIs")?.[0]
    || polygonNode.getElementsByTagName("outerBoundaryIs")?.[0];
  const outerCoordinates = outer?.getElementsByTagNameNS?.("*", "coordinates")?.[0]?.textContent
    || outer?.getElementsByTagName?.("coordinates")?.[0]?.textContent
    || "";
  const outerRing = parseKmlCoordinateText(outerCoordinates);
  if (outerRing.length >= 4) rings.push(outerRing);

  const innerBoundaries = [
    ...polygonNode.getElementsByTagNameNS("*", "innerBoundaryIs"),
    ...polygonNode.getElementsByTagName("innerBoundaryIs"),
  ];
  [...new Set(innerBoundaries)].forEach((inner) => {
    const innerCoordinates = inner.getElementsByTagNameNS?.("*", "coordinates")?.[0]?.textContent
      || inner.getElementsByTagName?.("coordinates")?.[0]?.textContent
      || "";
    const innerRing = parseKmlCoordinateText(innerCoordinates);
    if (innerRing.length >= 4) rings.push(innerRing);
  });

  return rings.length ? rings : null;
}

function readKmlExtendedData(placemark) {
  const props = {};
  const dataNodes = [
    ...placemark.getElementsByTagNameNS("*", "Data"),
    ...placemark.getElementsByTagName("Data"),
  ];
  [...new Set(dataNodes)].forEach((dataNode) => {
    const name = dataNode.getAttribute("name");
    const value = getFirstXmlText(dataNode, "value");
    if (name && value) props[name] = value;
  });
  const simpleDataNodes = [
    ...placemark.getElementsByTagNameNS("*", "SimpleData"),
    ...placemark.getElementsByTagName("SimpleData"),
  ];
  [...new Set(simpleDataNodes)].forEach((dataNode) => {
    const name = dataNode.getAttribute("name");
    const value = repairLegacyText(dataNode.textContent?.trim() || "");
    if (name && value) props[name] = value;
  });
  return props;
}

function kmlToGeoJson(kmlText, fileName = "kartensammlung.kml") {
  const parser = new DOMParser();
  const documentXml = parser.parseFromString(kmlText, "application/xml");
  if (documentXml.getElementsByTagName("parsererror").length) {
    throw new Error("Die KML-Datei konnte nicht als XML gelesen werden.");
  }
  const placemarks = [
    ...documentXml.getElementsByTagNameNS("*", "Placemark"),
    ...documentXml.getElementsByTagName("Placemark"),
  ];
  const features = [...new Set(placemarks)].map((placemark, index) => {
    const polygons = [...new Set([
      ...placemark.getElementsByTagNameNS("*", "Polygon"),
      ...placemark.getElementsByTagName("Polygon"),
    ])].map(parseKmlPolygon).filter(Boolean);
    if (!polygons.length) return null;
    const properties = {
      ...readKmlExtendedData(placemark),
      name: getFirstXmlText(placemark, "name") || `Einheit ${index + 1}`,
      description: getFirstXmlText(placemark, "description"),
    };
    return {
      type: "Feature",
      properties,
      geometry: polygons.length === 1
        ? { type: "Polygon", coordinates: polygons[0] }
        : { type: "MultiPolygon", coordinates: polygons },
    };
  }).filter(Boolean);

  return {
    type: "FeatureCollection",
    name: fileName.replace(/\.[^.]+$/, ""),
    features,
  };
}

function findZipEndOfCentralDirectory(view) {
  for (let offset = view.byteLength - 22; offset >= Math.max(0, view.byteLength - 66000); offset -= 1) {
    if (view.getUint32(offset, true) === 0x06054b50) return offset;
  }
  return -1;
}

async function inflateRawZipEntry(bytes) {
  if (!("DecompressionStream" in window)) {
    throw new Error("KMZ benötigt Deflate-Dekompression. Dieser Browser unterstützt sie nicht.");
  }
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function extractKmlTextFromKmz(arrayBuffer) {
  const view = new DataView(arrayBuffer);
  const decoder = new TextDecoder("utf-8");
  const eocdOffset = findZipEndOfCentralDirectory(view);
  if (eocdOffset < 0) throw new Error("Die KMZ-Datei enthält kein lesbares ZIP-Verzeichnis.");
  const entryCount = view.getUint16(eocdOffset + 10, true);
  let cursor = view.getUint32(eocdOffset + 16, true);

  for (let index = 0; index < entryCount; index += 1) {
    if (view.getUint32(cursor, true) !== 0x02014b50) break;
    const method = view.getUint16(cursor + 10, true);
    const compressedSize = view.getUint32(cursor + 20, true);
    const fileNameLength = view.getUint16(cursor + 28, true);
    const extraLength = view.getUint16(cursor + 30, true);
    const commentLength = view.getUint16(cursor + 32, true);
    const localHeaderOffset = view.getUint32(cursor + 42, true);
    const fileName = decoder.decode(new Uint8Array(arrayBuffer, cursor + 46, fileNameLength));
    cursor += 46 + fileNameLength + extraLength + commentLength;
    if (!fileName.toLowerCase().endsWith(".kml")) continue;

    if (view.getUint32(localHeaderOffset, true) !== 0x04034b50) throw new Error("Die KMZ-Datei enthält einen beschädigten KML-Eintrag.");
    const localNameLength = view.getUint16(localHeaderOffset + 26, true);
    const localExtraLength = view.getUint16(localHeaderOffset + 28, true);
    const dataOffset = localHeaderOffset + 30 + localNameLength + localExtraLength;
    const compressed = new Uint8Array(arrayBuffer, dataOffset, compressedSize);
    const data = method === 0 ? compressed : method === 8 ? await inflateRawZipEntry(compressed) : null;
    if (!data) throw new Error(`KMZ-Kompressionsmethode ${method} wird noch nicht unterstützt.`);
    return decoder.decode(data);
  }

  throw new Error("In der KMZ-Datei wurde keine KML-Datei gefunden.");
}

async function readBoundaryImportFile(file) {
  const extension = getFileExtension(file.name);
  if (extension === "kml") {
    return normalizeImportedBoundarySet(kmlToGeoJson(await file.text(), file.name), file.name);
  }
  if (extension === "kmz") {
    const kmlText = await extractKmlTextFromKmz(await file.arrayBuffer());
    return normalizeImportedBoundarySet(kmlToGeoJson(kmlText, file.name), file.name);
  }
  const raw = JSON.parse(await file.text());
  return normalizeImportedBoundarySet(raw, file.name);
}

function createInternalLicenseMetadata() {
  return {
    id: "unknown-internal-use-only",
    label: "Lizenz ungeklärt · nur intern nutzbar",
    url: "",
    detail: "Die Lizenz wurde beim Import nicht eindeutig erkannt. Vor Veröffentlichung oder Weitergabe muss sie geprüft werden.",
    source: "",
    compatibility: {
      wikimedia: false,
      openstreetmap: false,
      commercial_use: false,
      share_alike_required: false,
      attribution_required: true,
    },
  };
}

function normalizeImportedBoundarySet(raw, fileName = "kartensammlung.geojson") {
  if (!raw || typeof raw !== "object") throw new Error("Die Datei enthält kein lesbares JSON-Objekt.");
  if (raw.schema === "ziselin-boundary-set-v1" && Array.isArray(raw.features)) {
    return {
      ...raw,
      review_status: raw.review_status || "imported",
      features: raw.features.map((feature, index) => ({
        ...feature,
        id: String(feature.id || `${raw.id}-${index + 1}`),
        name: repairLegacyText(feature.name || `Einheit ${index + 1}`),
        aliases: Array.isArray(feature.aliases) ? feature.aliases.map(repairLegacyText) : [],
        match_tokens: Array.isArray(feature.match_tokens) ? feature.match_tokens.map(repairLegacyText) : [],
        properties: feature.properties || {},
      })),
    };
  }

  if (raw.type !== "FeatureCollection" || !Array.isArray(raw.features)) {
    throw new Error("Bitte eine GeoJSON FeatureCollection oder ein Ziselin-Boundary-Set-v1 importieren.");
  }

  const baseName = fileName.replace(/\.[^.]+$/, "");
  const setId = `import-${slugifyBoundaryId(baseName)}-${Date.now()}`;
  const importedAt = new Date().toISOString();
  return {
    schema: "ziselin-boundary-set-v1",
    id: setId,
    title: repairLegacyText(baseName || "Importierte Kartensammlung"),
    description: "Aus GeoJSON importierte Kartensammlung. Metadaten, Lizenz und Wikidata-IDs sollten im nächsten Schritt geprüft und ergänzt werden.",
    provider: "manual-import",
    provider_boundary_id: "",
    boundary_type: "unknown",
    country_iso3: "",
    admin_level: "",
    year_represented: "",
    valid_from: "",
    valid_to: null,
    source: {
      label: "Manueller GeoJSON-Import",
      url: "",
      accessed_at: importedAt,
      source_data_update_date: "",
      build_date: "",
    },
    license: createInternalLicenseMetadata(),
    review_status: "imported",
    features: raw.features
      .filter((feature) => feature?.geometry)
      .map((feature, index) => {
        const name = getFeatureDisplayName(feature, index);
        const id = getFeatureStableId(feature, index, setId);
        return {
          id: String(id),
          name,
          wikidata_id: String(feature.properties?.wikidata_id || feature.properties?.WIKIDATA || feature.properties?.wikidata || ""),
          identifiers: {},
          names: { de: name },
          aliases: [],
          match_tokens: [id, name].map((token) => normalizeSearchText(token)).filter(Boolean),
          valid_from: "",
          valid_to: null,
          source_ref: "",
          geometry: feature.geometry,
          properties: feature.properties || {},
        };
      }),
  };
}

function createBoundaryCollectionItem(boundarySet, fileName = "") {
  return normalizeLibraryItem({
    id: `collection-${slugifyBoundaryId(boundarySet.id || boundarySet.title || fileName)}-${Date.now()}`,
    kind: "boundary-collection",
    name: repairLegacyText(boundarySet.title || fileName || "Kartensammlung"),
    source: repairLegacyText(boundarySet.source?.label || boundarySet.provider || "Import"),
    iso3: boundarySet.country_iso3 || "",
    adminLevel: repairLegacyText(boundarySet.admin_level || boundarySet.boundary_type || "Boundary-Set"),
    detail: `${boundarySet.features?.length || 0} Einheiten`,
    license: repairLegacyText(boundarySet.license?.label || "Lizenz ungeklärt"),
    sourceUrl: boundarySet.source?.url || "",
    temporalCoverage: {
      label: [boundarySet.valid_from ? `seit ${boundarySet.valid_from}` : "", boundarySet.valid_to ? `bis ${boundarySet.valid_to}` : ""].filter(Boolean).join(" · ") || boundarySet.year_represented || "Gültigkeit nicht geprüft",
      from: boundarySet.valid_from || "",
      to: boundarySet.valid_to || "",
    },
    display: {
      visible: true,
      color: "#d9dc8c",
      outlineColor: DEFAULT_LAYER_OUTLINE_COLOR,
    },
    geometryRef: {
      provider: "ziselin-geo-archive",
      schema: "ziselin-boundary-set-v1",
      boundarySetId: boundarySet.id,
    },
    boundarySet,
  });
}

async function importBoundarySetFile(file) {
  try {
    const boundarySet = await readBoundaryImportFile(file);
    if (!boundarySet.features.length) throw new Error("Die Kartensammlung enthält keine importierbaren Geometrien.");
    state.pendingBoundarySetImport = {
      fileName: file.name,
      importedAt: new Date().toISOString(),
      boundarySet,
    };
    renderCollectionImportEditor();
    setEditorTab("collections");
  } catch (error) {
    console.error("Kartensammlung konnte nicht geladen werden.", error);
    window.alert(`Kartensammlung konnte nicht geladen werden: ${error?.message || "unbekannter Fehler"}`);
  }
}

function addPendingBoundarySetToProject() {
  const project = getActiveProject();
  const folder = getLibraryFolder(project, "boundary-collections");
  if (!project || !folder) {
    window.alert("Bitte zuerst ein Earth-Map-Projekt anlegen oder aktivieren.");
    return;
  }
  const pending = state.pendingBoundarySetImport;
  if (!pending?.boundarySet) {
    window.alert("Bitte zuerst eine Kartensammlung importieren.");
    return;
  }
  try {
    const boundarySet = pending.boundarySet;
    const item = createBoundaryCollectionItem(boundarySet, pending.fileName);
    folder.items.push(item);
    project.activeLibraryItemId = item.id;
    state.openFolderBrowserMenuId = null;
    if (!persistProjects()) {
      folder.items = folder.items.filter((candidate) => candidate.id !== item.id);
      project.activeLibraryItemId = "";
      throw new Error("Die Datei ist für den aktuellen Browser-Speicher zu groß. Für große Kartensammlungen brauchen wir als nächsten Schritt IndexedDB oder ein echtes Archiv-Dateisystem.");
    }
    renderWorkspace();
    renderGlobe();
    openLibraryItemEditor(item);
  } catch (error) {
    console.error("Kartensammlung konnte nicht übernommen werden.", error);
    window.alert(`Kartensammlung konnte nicht übernommen werden: ${error?.message || "unbekannter Fehler"}`);
  }
}

function createLayerItemFromSearchResult(result) {
  const isNaturalEarth = result.source === "Natural Earth";
  const dataset = getNaturalEarthCountryDataset();
  const detail = result.datasetDetail || dataset.detail;
  return normalizeLibraryItem({
    id: `layer-${result.source.toLowerCase().replace(/\W+/g, "-")}-${result.iso3 || result.id}-${Date.now()}`,
    kind: "boundary-map",
    name: result.name,
    source: result.source,
    iso3: result.iso3,
    adminLevel: result.level,
    detail: result.detail,
    license: result.license,
    sourceUrl: isNaturalEarth ? (result.datasetUrl || dataset.sourceUrl) : "",
    temporalCoverage: {
      label: "gegenwärtige Natural-Earth-Grundkarte",
      from: "",
      to: "",
    },
    display: {
      visible: true,
      color: DEFAULT_LAYER_FILL_COLOR,
      outlineColor: DEFAULT_LAYER_OUTLINE_COLOR,
    },
    geometryRef: isNaturalEarth
      ? { provider: "natural-earth", detail, dataset: "admin_0_countries", iso3: result.iso3 }
      : null,
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
  openLibraryItemEditor(activeItem);
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
  if (!query) {
    const note = document.createElement("p");
    note.className = "empty-state";
    note.textContent = "Bitte Suchbegriff eingeben.";
    ui.boundarySearchResults.replaceChildren(note);
    return;
  }

  const results = useNaturalEarth ? searchNaturalEarthCountries(query) : [];
  if (!results.length) {
    const note = document.createElement("p");
    note.className = "empty-state";
    note.textContent = "Keine Natural-Earth-Treffer gefunden. Tipp: Auch ISO-3-Codes wie DEU, FRA oder BRA funktionieren.";
    ui.boundarySearchResults.replaceChildren(note);
    return;
  }

  ui.boundarySearchResults.replaceChildren(...results.map(createBoundarySearchCard));
}

ui.menuButton.addEventListener("click", () => setMenuOpen(ui.menuButton.getAttribute("aria-expanded") !== "true"));
ui.menuCloseButton.addEventListener("click", () => setMenuOpen(false));
ui.menuOverlay.addEventListener("click", () => setMenuOpen(false));
ui.themeToggleButton?.addEventListener("click", toggleTheme);
ui.exportProjectButton?.addEventListener("click", (event) => {
  event.stopPropagation();
  setExportMenuOpen(ui.exportProjectButton.getAttribute("aria-expanded") !== "true");
});
ui.exportMenu?.addEventListener("click", (event) => {
  const button = event.target instanceof Element ? event.target.closest("[data-export-format]") : null;
  if (!button) return;
  handleExportFormat(button.dataset.exportFormat);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
    setExportMenuOpen(false);
    setBrowserActionsMenuOpen(false);
    if (state.openLayerBrowserMenuId) {
      state.openLayerBrowserMenuId = null;
      resetLayerDeleteHold();
      renderProjectBrowser();
    }
    if (state.openProjectBrowserMenuId) {
      state.openProjectBrowserMenuId = null;
      resetProjectDeleteHold();
      renderProjectBrowser();
    }
    if (state.openFolderBrowserMenuId) {
      state.openFolderBrowserMenuId = null;
      renderProjectBrowser();
    }
  }
});
document.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest(".export-control")) return;
  if (event.target instanceof Element && event.target.closest(".project-card-menu-shell")) return;
  if (event.target instanceof Element && event.target.closest(".layer-row-menu-shell")) return;
  if (event.target instanceof Element && event.target.closest(".browser-actions-menu-shell")) return;
  setExportMenuOpen(false);
  setBrowserActionsMenuOpen(false);
  if (state.openLayerBrowserMenuId) {
    state.openLayerBrowserMenuId = null;
    resetLayerDeleteHold();
    renderProjectBrowser();
  }
  if (state.openProjectBrowserMenuId) {
    state.openProjectBrowserMenuId = null;
    resetProjectDeleteHold();
    renderProjectBrowser();
  }
  if (state.openFolderBrowserMenuId) {
    state.openFolderBrowserMenuId = null;
    renderProjectBrowser();
  }
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
ui.browserActionsMenuButton?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  setBrowserActionsMenuOpen(!state.browserActionsMenuOpen);
});
document.querySelectorAll("[data-layout-cycle-button]").forEach((button) => {
  button.addEventListener("click", cycleDetailsLayoutMode);
});
ui.newProjectButton?.addEventListener("click", () => {
  setBrowserActionsMenuOpen(false);
  const project = normalizeProject(createEarthMapProject());
  state.projects.push(project);
  state.activeProjectId = project.id;
  persistProjects();
  renderWorkspace();
  renderGlobe();
});
ui.importBoundarySetButton?.addEventListener("click", () => {
  setBrowserActionsMenuOpen(false);
  ui.boundarySetImportInput?.click();
});
ui.boundarySetImportInput?.addEventListener("change", async () => {
  const file = ui.boundarySetImportInput.files?.[0];
  ui.boundarySetImportInput.value = "";
  if (!file) return;
  await importBoundarySetFile(file);
});
ui.addCollectionToProjectButton?.addEventListener("click", addPendingBoundarySetToProject);
ui.projectBrowserList.addEventListener("click", (event) => {
  if (event.target instanceof Element && event.target.closest(".project-card-menu-shell")) return;
  if (event.target instanceof Element && event.target.closest(".browser-visibility-checkbox")) return;
  const layerCard = event.target.closest("[data-library-item-id]");
  if (layerCard) {
    const projectCard = layerCard.closest("[data-project-id]");
    const project = state.projects.find((candidate) => candidate.id === projectCard?.dataset.projectId) || getActiveProject();
    if (!project) return;
    state.activeProjectId = project.id;
    project.activeLibraryItemId = layerCard.dataset.libraryItemId || "";
    state.openProjectBrowserMenuId = null;
    state.openFolderBrowserMenuId = null;
    state.openLayerBrowserMenuId = null;
    resetProjectDeleteHold();
    resetLayerDeleteHold();
    persistProjects();
    renderWorkspace();
    renderGlobe();
    openLibraryItemEditor(project.activeLibraryItemId ? getActiveLibraryItem(project) : null);
    return;
  }
  const card = event.target.closest("[data-project-id]");
  if (!card) return;
  state.activeProjectId = card.dataset.projectId;
  state.openProjectBrowserMenuId = null;
  state.openFolderBrowserMenuId = null;
  state.openLayerBrowserMenuId = null;
  resetProjectDeleteHold();
  resetLayerDeleteHold();
  persistProjects();
  renderWorkspace();
});
ui.projectBrowserList.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const layerCard = event.target instanceof Element ? event.target.closest("[data-library-item-id]") : null;
  if (!layerCard) return;
  event.preventDefault();
  layerCard.click();
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
  openLibraryItemEditor(getActiveLibraryItem(project));
});

ui.globe.addEventListener("pointerdown", (event) => {
  markGlobeNavigationActive();
  activeGlobePointers.set(event.pointerId, { id: event.pointerId, x: event.clientX, y: event.clientY });
  if (!beginPinchZoomIfReady()) {
    resetSinglePointerDragFrom(activeGlobePointers.get(event.pointerId));
  }
  ui.globe.setPointerCapture?.(event.pointerId);
});

ui.globe.addEventListener("pointermove", (event) => {
  if (activeGlobePointers.has(event.pointerId)) {
    activeGlobePointers.set(event.pointerId, { id: event.pointerId, x: event.clientX, y: event.clientY });
  }
  if (pinchState && activeGlobePointers.size >= 2) {
    markGlobeNavigationActive();
    const pointers = getActiveGlobePointerList();
    const distance = Math.max(1, getPointerDistance(pointers[0], pointers[1]));
    const zoomFactor = distance / Math.max(1, pinchState.startDistance);
    globeZoom = clamp(pinchState.startZoom * zoomFactor, MIN_GLOBE_ZOOM, MAX_GLOBE_ZOOM);
    const latitudeLimit = getLatitudeNavigationLimit();
    rotation.lat = clamp(rotation.lat, -latitudeLimit, latitudeLimit);
    scheduleGlobeRender();
    scheduleNaturalEarthDetailUpdate(980);
    return;
  }
  if (!dragState || dragState.pointerId !== event.pointerId) return;
  markGlobeNavigationActive();
  // Bedienregel: Dragging orientiert sich an der sichtbaren Kugeloberfläche,
  // nicht an einer festen Grad-pro-Pixel-Konstante. Ein Maus-Pixel wird aus dem
  // aktuellen Projektionsradius in Rotationsgrade übersetzt; dadurch läuft die
  // Karte bei kleinem Zoom nicht voraus und bleibt im Tiefzoom nah an der Hand.
  const rect = ui.globe.getBoundingClientRect();
  const baseSize = Math.max(1, Math.min(rect.width || 1, rect.height || 1));
  const radius = Math.max(1, baseSize * 0.47 * globeZoom);
  const degreesPerPixel = 1 / (radius * DEG);
  const lonLatitudeFactor = 1 / Math.max(0.38, Math.cos(rotation.lat * DEG));
  const latitudeLimit = getLatitudeNavigationLimit();
  rotation.lon = dragState.startRotation.lon + (event.clientX - dragState.startX) * degreesPerPixel * lonLatitudeFactor;
  rotation.lat = clamp(dragState.startRotation.lat - (event.clientY - dragState.startY) * degreesPerPixel, -latitudeLimit, latitudeLimit);
  scheduleGlobeRender();
});

ui.globe.addEventListener("wheel", (event) => {
  event.preventDefault();
  markGlobeNavigationActive();
  const zoomFactor = Math.exp(-event.deltaY * 0.0014);
  globeZoom = clamp(globeZoom * zoomFactor, MIN_GLOBE_ZOOM, MAX_GLOBE_ZOOM);
  const latitudeLimit = getLatitudeNavigationLimit();
  rotation.lat = clamp(rotation.lat, -latitudeLimit, latitudeLimit);
  scheduleGlobeRender();
  scheduleNaturalEarthDetailUpdate(980);
}, { passive: false });

["pointerup", "pointercancel", "lostpointercapture"].forEach((type) => {
  ui.globe.addEventListener(type, (event) => {
    activeGlobePointers.delete(event.pointerId);
    if (activeGlobePointers.size >= 2) {
      beginPinchZoomIfReady();
    } else if (activeGlobePointers.size === 1) {
      pinchState = null;
      resetSinglePointerDragFrom(getActiveGlobePointerList()[0]);
    } else {
      pinchState = null;
      dragState = null;
    }
    markGlobeNavigationActive();
    scheduleNaturalEarthDetailUpdate(760);
  });
});

window.addEventListener("resize", () => {
  setDetailsLayoutMode(state.detailsLayoutMode);
  scheduleGlobeRender();
});
setTheme(getStoredTheme(), false);
renderWorkspace();
renderGlobe();
scheduleNaturalEarthDetailUpdate(40);
if (!hasD3Geo) buildLandSamplesDeferred();

