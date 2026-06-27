const STORAGE_KEY = "schola-grade-profiles-v5";
const SESSION_KEY = "schola-grade-session-v5";
const LEGACY_STORAGE_KEYS = [];
const LEGACY_SESSION_KEYS = [];
const PROFILE_DELETE_HOLD_MS = 900;
// Architekturregel: Bewertungsprofile werden nicht im Programmcode gepflegt.
// Mitgelieferte oder verifizierte Profile liegen als JSON im Profilordner und
// müssen vom Nutzer bewusst importiert werden.
const BUNDLED_PROFILE_FILES = [
  { label: "Mecklenburg-Vorpommern", path: "profile/mecklenburg-vorpommern.json" },
];

// Die Bezeichnungen folgen dem Bildungsserver Mecklenburg-Vorpommern. Das
// Bundesland ist Profilraum im Maschinenraum; die Brücke zeigt nur die drei
// Entscheidungen, die für eine konkrete Berechnung nötig sind.
const MV_SCHOOL_TYPES = [
  { name: "Grundschule", classes: ["1", "2", "3", "4"] },
  { name: "Schulartunabhängige Orientierungsstufe", classes: ["5", "6"] },
  { name: "Regionale Schule", classes: ["5", "6", "7", "8", "9", "10"] },
  { name: "Gymnasium", classes: ["5", "6", "7", "8", "9", "10", "11", "12"] },
  { name: "Förderschule", classes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] },
  { name: "Gesamtschule", classes: ["5", "6", "7", "8", "9", "10", "11", "12"] },
  { name: "Berufliche Schulen", classes: ["Berufliche Bildung"] },
  { name: "Schulen in freier Trägerschaft", classes: ["nach Schulart"] },
  { name: "Abendgymnasium", classes: ["Einführungsphase", "Qualifikationsphase"] },
];

const grade6Labels = [
  ["1", "sehr gut"], ["2", "gut"], ["3", "befriedigend"],
  ["4", "ausreichend"], ["5", "mangelhaft"], ["6", "ungenügend"],
];
const point15Labels = [
  ["15", "1+"], ["14", "1"], ["13", "1-"], ["12", "2+"],
  ["11", "2"], ["10", "2-"], ["09", "3+"], ["08", "3"],
  ["07", "3-"], ["06", "4+"], ["05", "4"], ["04", "4-"],
  ["03", "5+"], ["02", "5"], ["01", "5-"], ["00", "6"],
];

function makeThresholds(labels, percentages) {
  return labels.map(([level, note], index) => ({ level, note, minPercent: percentages[index] }));
}

function makeScope(id, schoolType, classes, assessmentType, qualification = "") {
  return { id, schoolType, classes: [...classes], assessmentType, qualification };
}
const ui = Object.fromEntries([
  "gradeApp", "menuButton", "menuCloseButton", "menuOverlay", "sideMenu", "resetScoreButton",
  "openEngineButton", "returnBridgeButton", "schoolTypeMenuButton", "schoolTypeMenu",
  "classLevelMenuButton", "classLevelMenu", "performanceMenuButton", "performanceMenu",
  "selectionSummary", "engineBrowserTab", "engineProfileTab", "engineBrowserPane", "engineProfilePane",
  "profileBreadcrumb", "profileEmptyState", "profileTree", "profilePreview", "profilePreviewTitle", "profilePreviewHint", "profilePreviewTree", "profileDetailTitle", "profileDetailHint",
  "profileBrowserList", "importProfilesButton", "profileImportMenu", "importFromDesktopButton", "importFromProfileFolderButton",
  "profileFolderMenu",
  "exportProfilesButton", "profileImportInput", "engineProfileSelect",
  "earnedInput", "totalInput", "percentageOutput", "scoreTrackFill", "inputMessage", "resultPrimary",
  "resultSecondary", "betterGradeOutput", "worseGradeOutput", "pointsNeededOutput", "pointsToWorseOutput", "boundaryList",
  "newProfileButton", "profileNameInput", "countryCodeInput", "addCountryButton",
  "subdivisionCodeInput", "basisSelect", "addBasisButton", "duplicateBasisButton", "deleteBasisButton", "basisNameInput",
  "profileVersionInput", "validFromInput", "validUntilInput", "scopeSelect", "addScopeButton",
  "deleteScopeButton", "addSubdivisionButton", "schoolTypeInput", "addSchoolTypeButton", "gradeBandInput", "addClassBandButton",
  "assessmentTypeInput", "qualificationInput", "addPerformanceButton", "scaleTypeSelect", "addScaleButton", "profileStatusSelect",
  "sourceNoteInput", "sourceUrlInput", "addThresholdButton", "thresholdEditor", "resetProfilesButton",
].map((id) => [id, document.getElementById(id)]));

function clone(value) {
  return typeof structuredClone === "function" ? structuredClone(value) : JSON.parse(JSON.stringify(value));
}

// Vorhandene Profile werden beim Lesen verlustfrei in die Trennung aus
// Rechtsraum, Berechnungsgrundlage und Geltungsbereichen überführt.
function normalizeProfile(profile) {
  const legacyParts = String(profile.assessmentType || "").split(/\s*·\s*/).filter(Boolean);
  const scopes = Array.isArray(profile.scopes) && profile.scopes.length
    ? profile.scopes.map((scope, index) => ({
      id: scope.id || `${profile.id}-scope-${index + 1}`,
      schoolType: scope.schoolType || "Regionale Schule",
      classes: Array.isArray(scope.classes) ? scope.classes : [],
      assessmentType: scope.assessmentType || "",
      qualification: scope.qualification || "",
    }))
    : [makeScope(
      `${profile.id}-scope-1`,
      profile.schoolType || "Regionale Schule",
      Array.isArray(profile.classes) && profile.classes.length ? profile.classes : ["7"],
      legacyParts[0] || "",
      legacyParts.slice(1).join(" · "),
    )];
  const normalized = {
    ...profile,
    countryCode: profile.countryCode || "DE",
    subdivisionCode: profile.subdivisionCode || "DE-MV",
    version: profile.version || "1",
    validFrom: profile.validFrom || "",
    validUntil: profile.validUntil || "",
    scopes,
  };
  ["federalState", "authority", "schoolType", "classes", "assessmentType"].forEach((field) => delete normalized[field]);
  if (normalized.collectionId) {
    delete normalized.countryCode;
    delete normalized.subdivisionCode;
  }
  return normalized;
}

function assignBasisToCollection(basis, collectionId) {
  basis.collectionId = collectionId;
  delete basis.countryCode;
  delete basis.subdivisionCode;
  return basis;
}

function loadWorkspaceData() {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY) || LEGACY_STORAGE_KEYS.map((key) => localStorage.getItem(key)).find(Boolean);
    const parsed = JSON.parse(serialized || "null");
    if (parsed?.collections?.length && parsed?.bases?.length) {
      return { collections: parsed.collections, bases: parsed.bases.map(normalizeProfile) };
    }
    if (Array.isArray(parsed) && parsed.length) {
      const bases = parsed.map(normalizeProfile);
      const collections = [];
      bases.forEach((basis) => {
        const collectionId = `${basis.countryCode || "DE"}-${basis.subdivisionCode || "DE-MV"}`.toLowerCase();
        if (!collections.some((entry) => entry.id === collectionId)) collections.push({
          id: collectionId,
          name: basis.subdivisionCode === "DE-MV" ? "Mecklenburg-Vorpommern" : basis.subdivisionCode,
          countryCode: basis.countryCode || "DE",
          subdivisionCode: basis.subdivisionCode || "DE-MV",
        });
        basis.collectionId = collectionId;
        delete basis.countryCode;
        delete basis.subdivisionCode;
      });
      return { collections, bases };
    }
  } catch (error) {
    console.warn("Gespeicherte Bewertungsprofile konnten nicht gelesen werden.", error);
  }
  return { collections: [], bases: [] };
}

function loadSession() {
  try {
    const serialized = localStorage.getItem(SESSION_KEY) || LEGACY_SESSION_KEYS.map((key) => localStorage.getItem(key)).find(Boolean);
    return JSON.parse(serialized || "null") || {};
  }
  catch (error) { return {}; }
}

const storedSession = loadSession();
const storedWorkspace = loadWorkspaceData();
const state = {
  collections: storedWorkspace.collections,
  profiles: storedWorkspace.bases,
  activeProfileId: storedWorkspace.collections.some((entry) => entry.id === storedSession.activeProfileId) ? storedSession.activeProfileId : storedWorkspace.collections[0]?.id || "",
  activeBasisId: storedSession.activeBasisId || (storedWorkspace.bases.some((entry) => entry.id === storedSession.activeProfileId) ? storedSession.activeProfileId : storedWorkspace.bases[0]?.id || ""),
  bridgeProfileId: storedWorkspace.bases.some((entry) => entry.id === storedSession.bridgeProfileId) ? storedSession.bridgeProfileId : "",
  bridgeScopeId: storedSession.bridgeScopeId || "",
  activeScopeId: storedSession.activeScopeId || "",
  schoolType: storedSession.schoolType || "Gymnasium",
  classLevel: storedSession.classLevel || "7",
  earned: storedSession.earned ?? "46",
  total: storedSession.total ?? "54",
  engineTab: storedSession.engineTab === "profile" ? "profile" : "browser",
  profileWorkbenchLevel: storedSession.profileWorkbenchLevel || "country",
  profileTreeCollapsed: new Set(Array.isArray(storedSession.profileTreeCollapsed) ? storedSession.profileTreeCollapsed : []),
};

let profileDeleteHoldState = null;

function getActiveProfile() {
  return state.collections.find((profile) => profile.id === state.activeProfileId) || state.collections[0];
}

function getActiveBasis() {
  return state.profiles.find((basis) => basis.id === state.activeBasisId) || state.profiles.find((basis) => basis.collectionId === state.activeProfileId) || null;
}

function getBridgeProfile() {
  return state.profiles.find((profile) => profile.id === state.bridgeProfileId) || null;
}

function getActiveScope() {
  const basis = getActiveBasis();
  return basis?.scopes?.find((scope) => scope.id === state.activeScopeId) || basis?.scopes?.[0] || null;
}

function getBridgeScope() {
  const profile = getBridgeProfile();
  return profile?.scopes?.find((scope) => scope.id === state.bridgeScopeId) || profile?.scopes?.[0] || null;
}

function isCollectionActiveForBridge(collectionId) {
  return state.profiles.some((basis) => basis.collectionId === collectionId && basis.id === state.bridgeProfileId);
}

const WORKBENCH_LEVELS = ["country", "subdivision", "school", "class", "performance", "scale"];
const WORKBENCH_META = {
  country: {
    label: "Staat",
    title: "Staat festlegen",
    hint: "Der Staat bildet die oberste rechtliche Orientierung. Die Brücke zeigt ihn später nur verdichtet in der Gesamtauswahl.",
  },
  subdivision: {
    label: "Land",
    title: "Land oder Region festlegen",
    hint: "Diese Ebene bleibt optional: In national geregelten Systemen kann der Geltungsraum ohne Land oder Bundesland geführt werden.",
  },
  school: {
    label: "Schulart",
    title: "Schulart festlegen",
    hint: "Die Schulart ist eine Weiche für die Auswahl oben auf der Brücke. Dort bleibt sie als einfacher Menüpunkt bedienbar.",
  },
  class: {
    label: "Klassenstufe",
    title: "Klassenstufe festlegen",
    hint: "Eine Grundlage kann für eine oder mehrere Klassenstufen gelten. Mehrere Werte werden durch Komma getrennt.",
  },
  performance: {
    label: "Leistungsart",
    title: "Leistungsart festlegen",
    hint: "Leistungsart und Bildungsgang ergeben die dritte Auswahl auf der Brücke, etwa Klassenarbeit · Berufsreife.",
  },
  scale: {
    label: "Zensierungsmodus",
    title: "Zensierungsmodus und Herkunft festlegen",
    hint: "Erst diese letzte Ebene trägt die eigentlichen Prozentgrenzen. Darum erscheint die Prozentmatrix rechts nur hier.",
  },
};

function ensureWorkbenchLevel() {
  if (!WORKBENCH_LEVELS.includes(state.profileWorkbenchLevel)) state.profileWorkbenchLevel = "country";
  if (!getActiveBasis() && !["country", "subdivision"].includes(state.profileWorkbenchLevel)) state.profileWorkbenchLevel = "country";
}

function setWorkbenchContext(level, basisId = state.activeBasisId, scopeId = state.activeScopeId) {
  if (!WORKBENCH_LEVELS.includes(level)) return;
  const basis = state.profiles.find((entry) => entry.id === basisId);
  if (basis) {
    state.activeBasisId = basis.id;
    state.activeProfileId = basis.collectionId || state.activeProfileId;
  }
  const activeBasis = getActiveBasis();
  if (activeBasis?.scopes?.some((scope) => scope.id === scopeId)) state.activeScopeId = scopeId;
  else state.activeScopeId = activeBasis?.scopes?.[0]?.id || "";
  state.profileWorkbenchLevel = level;
  renderAll();
}

function makeTreeButton(level, label, kicker, basisId = "", scopeId = "", readonly = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "profile-tree-button";
  if (readonly) {
    button.disabled = true;
  } else {
    button.dataset.workbenchLevel = level;
    if (basisId) button.dataset.basisId = basisId;
    if (scopeId) button.dataset.scopeId = scopeId;
  }
  const text = document.createElement("span");
  text.textContent = label || "unbenannt";
  const meta = document.createElement("span");
  meta.className = "profile-tree-kicker";
  meta.textContent = kicker;
  button.append(text, meta);
  const sameLevel = state.profileWorkbenchLevel === level;
  const sameBasis = !basisId || basisId === state.activeBasisId;
  const sameScope = !scopeId || scopeId === state.activeScopeId;
  if (sameLevel && sameBasis && sameScope) button.classList.add("is-active");
  return button;
}

function makeTreeKey(level, label, basisId = "", scopeId = "") {
  return [level, label || "", basisId || "", scopeId || ""].join("::");
}

function appendTreeNode(parent, button, children = [], treeKey = "") {
  const li = document.createElement("li");
  li.className = "profile-tree-node";
  const hasChildren = children.length > 0;
  const collapsed = hasChildren && treeKey && state.profileTreeCollapsed.has(treeKey);
  if (collapsed) li.classList.add("is-collapsed");
  const row = document.createElement("div");
  row.className = "profile-tree-row";
  if (hasChildren) {
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "profile-tree-toggle";
    toggle.dataset.treeToggle = treeKey;
    toggle.textContent = collapsed ? "+" : "−";
    toggle.setAttribute("aria-label", collapsed ? "Ebene aufklappen" : "Ebene zuklappen");
    row.appendChild(toggle);
  } else {
    const placeholder = document.createElement("span");
    placeholder.className = "profile-tree-toggle-placeholder";
    row.appendChild(placeholder);
  }
  row.appendChild(button);
  li.appendChild(row);
  if (children.length) {
    const list = document.createElement("ul");
    children.forEach((child) => list.appendChild(child));
    li.appendChild(list);
  }
  parent.appendChild(li);
  return li;
}

function renderProfileTree(collection, bases, target = ui.profileTree, { readonly = false } = {}) {
  const root = document.createElement("ul");
  if (!collection?.countryCode) {
    target.replaceChildren(root);
    return;
  }
  const subdivisionList = document.createElement("ul");
  const schoolGroups = new Map();
  bases.forEach((basis) => {
    (basis.scopes || []).forEach((scope) => {
      const schoolKey = scope.schoolType || "Schulart offen";
      if (!schoolGroups.has(schoolKey)) schoolGroups.set(schoolKey, new Map());
      const classMap = schoolGroups.get(schoolKey);
      const classKey = (scope.classes || []).join(", ") || "Klassen offen";
      if (!classMap.has(classKey)) classMap.set(classKey, []);
      classMap.get(classKey).push({ basis, scope });
    });
  });

  schoolGroups.forEach((classMap, schoolName) => {
    const schoolChildren = [];
    let firstSchoolEntry = null;
    classMap.forEach((entries, className) => {
      if (!firstSchoolEntry) firstSchoolEntry = entries[0];
      const classChildren = entries.map(({ basis, scope }) => {
        const performanceLabel = [scope.assessmentType || basis.name, scope.qualification].filter(Boolean).join(" · ");
        const scaleLabel = basis.scaleType === "points15" ? "15-0 Punkte" : basis.scaleType === "manual" ? "manuell" : "1-6";
        const performanceChildren = [
          appendTreeNode(document.createElement("ul"), makeTreeButton("scale", scaleLabel, "Skala", basis.id, scope.id, readonly), [], makeTreeKey("scale", scaleLabel, basis.id, scope.id)),
        ];
        const performanceList = document.createElement("ul");
        performanceChildren.forEach((child) => performanceList.appendChild(child));
        return appendTreeNode(
          document.createElement("ul"),
          makeTreeButton("performance", performanceLabel || "Leistungsart offen", "Leistung", basis.id, scope.id, readonly),
          [...performanceList.children],
          makeTreeKey("performance", performanceLabel || "Leistungsart offen", basis.id, scope.id),
        );
      });
      const classNode = appendTreeNode(
        document.createElement("ul"),
        makeTreeButton("class", className, "Klasse", entries[0]?.basis.id, entries[0]?.scope.id, readonly),
        classChildren,
        makeTreeKey("class", className, entries[0]?.basis.id, entries[0]?.scope.id),
      );
      schoolChildren.push(classNode);
    });
    appendTreeNode(
      subdivisionList,
      makeTreeButton("school", schoolName, "Schulart", firstSchoolEntry?.basis.id, firstSchoolEntry?.scope.id, readonly),
      schoolChildren,
      makeTreeKey("school", schoolName, firstSchoolEntry?.basis.id, firstSchoolEntry?.scope.id),
    );
  });

  const countryChildren = [];
  if (collection.subdivisionCode) {
    const subdivisionLabel = formatSubdivisionLabel(collection);
    countryChildren.push(appendTreeNode(
      document.createElement("ul"),
      makeTreeButton("subdivision", subdivisionLabel, "Land", "", "", readonly),
      [...subdivisionList.children],
      makeTreeKey("subdivision", subdivisionLabel, collection.id),
    ));
  } else {
    countryChildren.push(...subdivisionList.children);
  }

  appendTreeNode(root, makeTreeButton("country", collection.countryCode, "Staat", "", "", readonly), countryChildren, makeTreeKey("country", collection.countryCode, collection.id));
  target.replaceChildren(root);
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ collections: state.collections, bases: state.profiles }));
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      activeProfileId: state.activeProfileId,
      activeBasisId: state.activeBasisId,
      bridgeProfileId: state.bridgeProfileId,
      bridgeScopeId: state.bridgeScopeId,
      activeScopeId: state.activeScopeId,
      schoolType: state.schoolType,
      classLevel: state.classLevel,
      earned: state.earned,
      total: state.total,
      engineTab: state.engineTab,
      profileWorkbenchLevel: state.profileWorkbenchLevel,
      profileTreeCollapsed: [...state.profileTreeCollapsed],
    }));
  } catch (error) {
    console.warn("Der lokale Speicher ist nicht verfügbar.", error);
  }
}

function parseNumber(value) {
  const normalized = String(value ?? "").trim().replace(/\s/g, "").replace(",", ".");
  if (!normalized) return NaN;
  return Number(normalized);
}

function formatNumber(value, maximumFractionDigits = 2) {
  if (!Number.isFinite(value)) return "-";
  return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 0, maximumFractionDigits }).format(value);
}

function getSortedThresholds(profile) {
  return [...(profile?.thresholds || [])].sort((left, right) => Number(right.minPercent) - Number(left.minPercent));
}

function calculate(profile, earned, total) {
  if (!Number.isFinite(earned) || !Number.isFinite(total) || total <= 0 || earned < 0) return null;
  const percent = earned / total * 100;
  const thresholds = getSortedThresholds(profile);
  const matchedIndex = thresholds.findIndex((threshold) => percent >= Number(threshold.minPercent));
  const index = matchedIndex >= 0 ? matchedIndex : Math.max(0, thresholds.length - 1);
  const current = thresholds[index] || thresholds.at(-1);
  const better = index > 0 ? thresholds[index - 1] : null;
  const worse = index < thresholds.length - 1 ? thresholds[index + 1] : null;
  const pointsNeeded = better ? Math.max(0, total * Number(better.minPercent) / 100 - earned) : 0;
  const pointsToWorse = worse ? Math.max(0, earned - total * Number(current.minPercent) / 100) : 0;
  return { percent, thresholds, current, better, worse, pointsNeeded, pointsToWorse };
}

function renderProfileOptions() {
  ui.engineProfileSelect.replaceChildren(...state.collections.map((profile) => new Option(profile.name, profile.id)));
  ui.engineProfileSelect.value = state.activeProfileId;
}

function formatSubdivisionLabel(collection) {
  if (!collection?.subdivisionCode) return "national geregelt";
  if (collection.countryCode === "DE" && collection.subdivisionCode.startsWith("DE-")) {
    return collection.subdivisionCode.slice(3);
  }
  return collection.subdivisionCode;
}

function profilesForBridgeSelection() {
  return state.profiles.flatMap((profile) => (
    (() => {
      const collection = state.collections.find((entry) => entry.id === profile.collectionId);
      return collection?.countryCode === "DE" && collection?.subdivisionCode === "DE-MV";
    })()
      ? (profile.scopes || [])
        .filter((scope) => scope.schoolType === state.schoolType && scope.classes.includes(state.classLevel))
        .map((scope) => ({ profile, scope }))
      : []
  ));
}

function formatClassLevel(classLevel) {
  return /^\d+$/.test(classLevel) ? `${classLevel}. Klasse` : classLevel;
}

function closeSelectionMenus() {
  [
    [ui.schoolTypeMenuButton, ui.schoolTypeMenu],
    [ui.classLevelMenuButton, ui.classLevelMenu],
    [ui.performanceMenuButton, ui.performanceMenu],
  ].forEach(([button, menu]) => {
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
  });
}

function toggleSelectionMenu(button, menu) {
  const shouldOpen = menu.hidden;
  closeSelectionMenus();
  menu.hidden = !shouldOpen;
  button.setAttribute("aria-expanded", String(shouldOpen));
}

function renderSelectionMenu(menu, options, selectedValue, onSelect) {
  menu.replaceChildren(...options.map(({ value, label }) => {
    const button = document.createElement("button");
    button.type = "button";
    button.role = "menuitem";
    button.textContent = label;
    button.classList.toggle("is-selected", value === selectedValue);
    if (value === selectedValue) button.setAttribute("aria-current", "true");
    button.addEventListener("click", () => {
      closeSelectionMenus();
      onSelect(value);
    });
    return button;
  }));
}

function renderBridgeSelectors() {
  if (!MV_SCHOOL_TYPES.some((entry) => entry.name === state.schoolType)) state.schoolType = MV_SCHOOL_TYPES[0].name;
  const school = MV_SCHOOL_TYPES.find((entry) => entry.name === state.schoolType) || MV_SCHOOL_TYPES[0];
  if (!school.classes.includes(state.classLevel)) state.classLevel = school.classes[0];
  const profiles = profilesForBridgeSelection();
  if (!profiles.some(({ profile, scope }) => profile.id === state.bridgeProfileId && scope.id === state.bridgeScopeId)) {
    state.bridgeProfileId = profiles[0]?.profile.id || "";
    state.bridgeScopeId = profiles[0]?.scope.id || "";
  }
  const profile = getBridgeProfile();
  const scope = getBridgeScope();

  ui.performanceMenuButton.disabled = !profiles.length;

  renderSelectionMenu(ui.schoolTypeMenu, MV_SCHOOL_TYPES.map((entry) => ({ value: entry.name, label: entry.name })), state.schoolType, (value) => {
    state.schoolType = value;
    state.classLevel = MV_SCHOOL_TYPES.find((entry) => entry.name === value)?.classes?.[0] || "";
    state.bridgeProfileId = "";
    state.bridgeScopeId = "";
    renderAll();
  });
  renderSelectionMenu(ui.classLevelMenu, school.classes.map((value) => ({ value, label: formatClassLevel(value) })), state.classLevel, (value) => {
    state.classLevel = value;
    state.bridgeProfileId = "";
    state.bridgeScopeId = "";
    renderAll();
  });
  renderSelectionMenu(ui.performanceMenu, profiles.map(({ profile: entry, scope: entryScope }) => ({
    value: `${entry.id}::${entryScope.id}`,
    label: [entryScope.assessmentType || entry.name, entryScope.qualification].filter(Boolean).join(" · "),
  })), `${state.bridgeProfileId}::${state.bridgeScopeId}`, (value) => {
    [state.bridgeProfileId, state.bridgeScopeId] = value.split("::");
    renderBridgeSelectors();
    renderBridge();
    persist();
  });

  const performanceParts = scope ? [scope.assessmentType, scope.qualification].filter(Boolean) : ["kein Bewertungsprofil"];
  const collection = state.collections.find((entry) => entry.id === profile?.collectionId);
  ui.selectionSummary.textContent = [collection?.subdivisionCode || "DE-MV", state.schoolType, formatClassLevel(state.classLevel), ...performanceParts].join(" - ");
}

function renderBridge() {
  const profile = getBridgeProfile();
  const earned = parseNumber(state.earned);
  const total = parseNumber(state.total);
  const result = profile ? calculate(profile, earned, total) : null;
  ui.earnedInput.value = state.earned;
  ui.totalInput.value = state.total;

  ui.inputMessage.classList.remove("is-error");
  if (!result) {
    ui.percentageOutput.textContent = "- %";
    ui.resultPrimary.textContent = "-";
    ui.resultSecondary.textContent = profile ? "Bitte gültige Punktwerte eingeben." : "Kein Bewertungsprofil";
    ui.betterGradeOutput.textContent = "-";
    ui.worseGradeOutput.textContent = "-";
    ui.pointsNeededOutput.textContent = "-";
    ui.pointsToWorseOutput.textContent = "-";
    ui.scoreTrackFill.style.width = "0%";
    ui.inputMessage.textContent = !profile
      ? "Für diese Auswahl muss im Maschinenraum noch ein Profil angelegt werden."
      : total === 0 ? "Die Gesamtpunktzahl muss größer als null sein." : "Bitte Zahlen größer oder gleich null eingeben.";
    ui.inputMessage.classList.add("is-error");
    ui.boundaryList.replaceChildren();
    return;
  }

  ui.percentageOutput.textContent = `${formatNumber(result.percent)} %`;
  ui.scoreTrackFill.style.width = `${Math.min(100, Math.max(0, result.percent))}%`;
  if (earned > total) {
    ui.inputMessage.textContent = "Die erreichte Punktzahl liegt über der Gesamtpunktzahl.";
    ui.inputMessage.classList.add("is-error");
  } else {
    ui.inputMessage.textContent = "";
  }

  const pointScale = profile.scaleType === "points15";
  ui.resultPrimary.textContent = result.current?.level || "-";
  const numericNote = String(pointScale ? result.current?.note : result.current?.level || "").match(/[1-6]/)?.[0] || "";
  ui.resultSecondary.textContent = grade6Labels.find(([grade]) => grade === numericNote)?.[1] || "";
  ui.betterGradeOutput.textContent = result.better?.level || "-";
  ui.worseGradeOutput.textContent = result.worse?.level || "-";
  ui.pointsNeededOutput.textContent = result.better ? `+ ${formatNumber(result.pointsNeeded)} P.` : "Beststufe";
  ui.pointsToWorseOutput.textContent = result.worse ? `- ${formatNumber(result.pointsToWorse)} P.` : "Endstufe";

  ui.boundaryList.replaceChildren(...result.thresholds.map((threshold) => {
    const item = document.createElement("div");
    item.className = "boundary-item";
    if (threshold === result.current) item.classList.add("is-current");
    const minimumPoints = total * Number(threshold.minPercent) / 100;
    const title = document.createElement("strong");
    title.textContent = threshold.level;
    const info = document.createElement("span");
    const percentLine = document.createElement("span");
    percentLine.textContent = `${formatNumber(threshold.minPercent)} %`;
    const pointsLine = document.createElement("span");
    pointsLine.textContent = `${formatNumber(minimumPoints)} P.`;
    info.append(percentLine, pointsLine);
    item.append(title, info);
    return item;
  }));
}

function renderProfileEditor() {
  const collection = getActiveProfile();
  if (!collection) {
    ui.profileEmptyState.hidden = false;
    ui.profileTree.replaceChildren();
    ui.profileBreadcrumb.replaceChildren();
    ui.profileDetailTitle.textContent = "Profil bearbeiten";
    ui.profileDetailHint.textContent = "Es ist noch kein Bewertungsprofil aktiv.";
    document.querySelectorAll(".profile-detail-card").forEach((card) => {
      card.hidden = true;
    });
    ui.thresholdEditor.replaceChildren();
    ui.gradeApp.classList.remove("engine-scale-selected");
    return;
  }
  ui.profileEmptyState.hidden = true;
  const availableBases = state.profiles.filter((basis) => basis.collectionId === collection.id);
  if (!availableBases.some((basis) => basis.id === state.activeBasisId)) state.activeBasisId = availableBases[0]?.id || "";
  const activeBasis = getActiveBasis();
  if (activeBasis && !activeBasis.scopes.some((scope) => scope.id === state.activeScopeId)) state.activeScopeId = activeBasis.scopes[0]?.id || "";
  ensureWorkbenchLevel();
  const scope = getActiveScope();
  const activeMeta = WORKBENCH_META[state.profileWorkbenchLevel] || WORKBENCH_META.country;

  renderProfileTree(collection, availableBases);
  ui.profileBreadcrumb.replaceChildren(...[
    collection.countryCode || "Staat offen",
    formatSubdivisionLabel(collection),
    scope?.schoolType,
    (scope?.classes || []).map(formatClassLevel).join(", "),
    [scope?.assessmentType, scope?.qualification].filter(Boolean).join(" · "),
    activeBasis ? (activeBasis.scaleType === "points15" ? "15-0 Punkte" : activeBasis.scaleType === "manual" ? "manuell" : "1-6") : "",
  ].filter(Boolean).map((part) => {
    const item = document.createElement("span");
    item.textContent = part;
    return item;
  }));
  ui.profileDetailTitle.textContent = activeMeta.title;
  ui.profileDetailHint.textContent = activeMeta.hint;
  document.querySelectorAll(".profile-detail-card").forEach((card) => {
    card.hidden = card.dataset.detailLevel !== state.profileWorkbenchLevel;
  });
  ui.gradeApp.classList.toggle("engine-scale-selected", state.engineTab === "profile" && state.profileWorkbenchLevel === "scale" && Boolean(activeBasis));

  ui.profileNameInput.value = collection.name || "";
  ui.countryCodeInput.value = collection.countryCode || "DE";
  ui.subdivisionCodeInput.value = collection.subdivisionCode || "DE-MV";
  ui.basisSelect.replaceChildren(...availableBases.map((basis) => new Option(basis.name, basis.id)));
  ui.basisSelect.value = activeBasis?.id || "";
  ui.basisNameInput.value = activeBasis?.name || "";
  ui.profileVersionInput.value = activeBasis?.version || "1";
  ui.validFromInput.value = activeBasis?.validFrom || "";
  ui.validUntilInput.value = activeBasis?.validUntil || "";
  ui.scopeSelect.replaceChildren(...(activeBasis?.scopes || []).map((entry, index) => new Option(
    [entry.schoolType, entry.assessmentType, entry.qualification].filter(Boolean).join(" · ") || `Geltungsbereich ${index + 1}`,
    entry.id,
  )));
  ui.scopeSelect.value = state.activeScopeId;
  ui.schoolTypeInput.replaceChildren(...MV_SCHOOL_TYPES.map((entry) => new Option(entry.name, entry.name)));
  ui.schoolTypeInput.value = scope?.schoolType || "";
  ui.gradeBandInput.value = (scope?.classes || []).join(", ");
  ui.assessmentTypeInput.value = scope?.assessmentType || "";
  ui.qualificationInput.value = scope?.qualification || "";
  ui.deleteScopeButton.disabled = !activeBasis || activeBasis.scopes.length <= 1;
  ui.deleteBasisButton.disabled = availableBases.length <= 1;
  ui.scaleTypeSelect.value = activeBasis?.scaleType || "grade6";
  ui.addThresholdButton.disabled = activeBasis?.scaleType !== "manual";
  ui.profileStatusSelect.value = activeBasis?.status || "personal";
  ui.sourceNoteInput.value = activeBasis?.sourceNote || "";
  ui.sourceUrlInput.value = activeBasis?.sourceUrl || "";

  ui.thresholdEditor.replaceChildren(...getSortedThresholds(activeBasis).map((threshold) => {
    const row = document.createElement("div");
    row.className = "threshold-row";
    const manualScale = activeBasis?.scaleType === "manual";
    const level = manualScale ? document.createElement("input") : document.createElement("output");
    if (manualScale) {
      level.className = "threshold-text-input";
      level.value = threshold.level || "";
      level.setAttribute("aria-label", "Stufe");
      level.addEventListener("change", () => {
        threshold.level = level.value.trim() || "Stufe";
        persist();
        renderBridge();
        renderProfileEditor();
      });
    } else {
      level.textContent = activeBasis?.scaleType === "points15" ? `${threshold.level} P.` : threshold.level;
    }
    const note = manualScale ? document.createElement("input") : document.createElement("output");
    if (manualScale) {
      note.className = "threshold-text-input";
      note.value = threshold.note || "";
      note.setAttribute("aria-label", "Notenbezeichnung");
      note.addEventListener("change", () => {
        threshold.note = note.value.trim();
        persist();
        renderBridge();
      });
    } else {
      note.textContent = threshold.note;
    }
    const shell = document.createElement("span");
    shell.className = "percent-field";
    const input = document.createElement("input");
    input.type = "text";
    input.inputMode = "decimal";
    input.value = formatNumber(Number(threshold.minPercent));
    input.setAttribute("aria-label", `Mindestprozent für ${threshold.level}`);
    input.addEventListener("change", () => {
      const nextValue = Math.min(100, Math.max(0, parseNumber(input.value)));
      if (!Number.isFinite(nextValue)) {
        input.value = formatNumber(Number(threshold.minPercent));
        return;
      }
      threshold.minPercent = nextValue;
      input.value = formatNumber(nextValue);
      persist();
      renderBridge();
    });
    shell.appendChild(input);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "threshold-remove-button";
    remove.textContent = manualScale ? "×" : "";
    remove.setAttribute("aria-label", `Stufe ${threshold.level} entfernen`);
    remove.disabled = !manualScale || activeBasis.thresholds.length <= 1;
    if (!manualScale) remove.setAttribute("aria-hidden", "true");
    remove.addEventListener("click", () => {
      if (!manualScale || activeBasis.thresholds.length <= 1) return;
      activeBasis.thresholds = activeBasis.thresholds.filter((entry) => entry !== threshold);
      persist();
      renderAll();
    });
    row.append(level, note, shell, remove);
    return row;
  }));
}

function renderProfilePreview() {
  const collection = getActiveProfile();
  if (!collection) {
    ui.profilePreviewTitle.textContent = "Profil ansehen";
    ui.profilePreviewHint.textContent = "Noch kein Bewertungsprofil ausgewählt.";
    ui.profilePreviewTree.replaceChildren();
    return;
  }
  const bases = getCollectionBases(collection.id);
  ui.profilePreviewTitle.textContent = collection.name || "Unbenanntes Profil";
  ui.profilePreviewHint.textContent = "Dies ist eine reine Strukturansicht. Auf- und Zuklappen ist möglich; Änderungen erfolgen über „Profil bearbeiten“ im Kartenmenü.";
  renderProfileTree(collection, bases, ui.profilePreviewTree, { readonly: true });
}

function setEngineTab(tabName) {
  state.engineTab = tabName === "profile" ? "profile" : "browser";
  const isProfile = state.engineTab === "profile";
  ui.gradeApp.classList.toggle("engine-tab-browser", !isProfile);
  ui.gradeApp.classList.toggle("engine-tab-profile", isProfile);
  ui.gradeApp.classList.toggle("engine-scale-selected", isProfile && state.profileWorkbenchLevel === "scale" && Boolean(getActiveBasis()));
  ui.engineBrowserTab.setAttribute("aria-selected", String(!isProfile));
  ui.engineProfileTab.setAttribute("aria-selected", String(isProfile));
  ui.engineBrowserPane.hidden = isProfile;
  ui.engineProfilePane.hidden = !isProfile;
  persist();
}

function getCollectionBases(collectionId) {
  return state.profiles.filter((basis) => basis.collectionId === collectionId);
}

function renderProfileBrowser() {
  if (!state.collections.length) {
    const empty = document.createElement("p");
    empty.className = "profile-browser-empty";
    empty.textContent = "Noch keine Bewertungsprofile. Importieren Sie ein Profil oder legen Sie ein neues an.";
    ui.profileBrowserList.replaceChildren(empty);
    return;
  }
  ui.profileBrowserList.replaceChildren(...state.collections.map((collection) => {
    const bases = getCollectionBases(collection.id);
    const item = document.createElement("article");
    item.className = "profile-browser-item";
    item.dataset.profileId = collection.id;
    item.tabIndex = 0;
    if (collection.id === state.activeProfileId) item.classList.add("is-active");
    const text = document.createElement("div");
    const title = document.createElement("strong");
    title.className = "profile-browser-title";
    title.textContent = collection.name || "Unbenanntes Profil";
    if (isCollectionActiveForBridge(collection.id)) {
      const activeBadge = document.createElement("span");
      activeBadge.className = "profile-active-badge";
      activeBadge.textContent = "aktiviert";
      title.appendChild(activeBadge);
    }
    const meta = document.createElement("span");
    meta.className = "profile-browser-meta";
    meta.textContent = [
      [collection.countryCode, formatSubdivisionLabel(collection)].filter(Boolean).join("-") || "ohne Rechtsraum",
      `${bases.length} Berechnungsgrundlage${bases.length === 1 ? "" : "n"}`,
    ].join(" · ");
    text.append(title, meta);

    const menu = document.createElement("details");
    menu.className = "profile-record-menu";
    const summary = document.createElement("summary");
    summary.setAttribute("aria-label", `Aktionen für ${collection.name || "Profil"}`);
    summary.textContent = "⋮";
    const actions = document.createElement("div");
    actions.className = "profile-record-actions";
    [
      ["activate", "Aktivieren"],
      ["edit", "Profil bearbeiten"],
      ["export", "Exportieren"],
      ["delete", "Löschen"],
    ].forEach(([action, label]) => {
      if (action === "activate" && collection.id === state.activeProfileId) return;
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.profileAction = action;
      button.dataset.profileId = collection.id;
      button.textContent = label;
      if (action === "delete") {
        button.className = "profile-record-action-delete";
        button.title = "Zum Löschen gedrückt halten";
        button.addEventListener("pointerdown", beginProfileDeleteHold);
        button.addEventListener("pointerup", finishProfileDeleteHold);
        button.addEventListener("pointercancel", cancelProfileDeleteHold);
        button.addEventListener("lostpointercapture", cancelProfileDeleteHold);
      }
      actions.appendChild(button);
    });
    menu.append(summary, actions);
    item.append(text, menu);
    return item;
  }));
}

function renderAll() {
  if (!state.collections.some((profile) => profile.id === state.activeProfileId)) state.activeProfileId = state.collections[0]?.id || "";
  const availableBases = state.profiles.filter((basis) => basis.collectionId === state.activeProfileId);
  if (!availableBases.some((basis) => basis.id === state.activeBasisId)) state.activeBasisId = availableBases[0]?.id || "";
  renderProfileOptions();
  renderProfileBrowser();
  renderBridgeSelectors();
  renderBridge();
  renderProfileEditor();
  renderProfilePreview();
  setEngineTab(state.engineTab);
  persist();
}

function selectProfile(profileId) {
  if (!state.collections.some((profile) => profile.id === profileId)) return;
  state.activeProfileId = profileId;
  const profile = state.profiles.find((basis) => basis.collectionId === profileId);
  state.activeBasisId = profile?.id || "";
  state.activeScopeId = profile?.scopes?.[0]?.id || "";
  state.profileWorkbenchLevel = "country";
  renderAll();
}

function activateProfileForBridge(profileId) {
  selectProfile(profileId);
  const profile = getActiveBasis();
  const scope = getActiveScope();
  state.bridgeProfileId = profile?.id || "";
  state.bridgeScopeId = scope?.id || "";
  state.schoolType = scope?.schoolType || state.schoolType;
  state.classLevel = scope?.classes?.[0] || state.classLevel;
  renderAll();
}

function updateProfileField(field, value) {
  const profile = getActiveProfile();
  if (!profile) return;
  profile[field] = value;
  if (field === "name") renderProfileOptions();
  renderBridgeSelectors();
  renderBridge();
  persist();
}

function updateBasisField(field, value) {
  const basis = getActiveBasis();
  if (!basis) return;
  basis[field] = value;
  if (field === "name") {
    const option = [...ui.basisSelect.options].find((entry) => entry.value === basis.id);
    if (option) option.textContent = value || "Unbenannte Berechnungsgrundlage";
  }
  renderBridgeSelectors();
  renderBridge();
  persist();
}

function updateScopeField(field, value) {
  const scope = getActiveScope();
  if (!scope) return;
  scope[field] = value;
  if (scope.id === state.bridgeScopeId) {
    if (field === "schoolType") state.schoolType = value;
    if (field === "classes" && !value.includes(state.classLevel)) state.classLevel = value[0] || state.classLevel;
  }
  const option = [...ui.scopeSelect.options].find((entry) => entry.value === scope.id);
  if (option) option.textContent = [scope.schoolType, scope.assessmentType, scope.qualification].filter(Boolean).join(" · ") || "Geltungsbereich";
  renderBridgeSelectors();
  renderBridge();
  persist();
}

function makeDefaultThresholds(scaleType) {
  if (scaleType === "points15") return makeThresholds(point15Labels, [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 35, 25, 15, 0]);
  if (scaleType === "manual") return makeThresholds([["Stufe 1", ""], ["Stufe 2", ""]], [50, 0]);
  return makeThresholds(grade6Labels, [90, 75, 60, 45, 25, 0]);
}

function makeBasisName(scope, scaleType = "grade6") {
  const scaleLabel = scaleType === "points15" ? "15-0 Punkte" : scaleType === "manual" ? "manuell" : "1-6";
  return [scope.schoolType, (scope.classes || []).join(", "), scope.assessmentType, scope.qualification, scaleLabel]
    .filter(Boolean)
    .join(" · ") || "Neue Berechnungsgrundlage";
}

function createBasisForScope(collectionId, scope, scaleType = "grade6") {
  const basis = createBlankBasis(collectionId, scope);
  basis.scaleType = scaleType;
  basis.name = makeBasisName(scope, scaleType);
  basis.thresholds = makeDefaultThresholds(scaleType);
  return basis;
}

function ensureActiveBasisForHierarchy() {
  const collection = getActiveProfile();
  if (!collection) return null;
  let basis = getActiveBasis();
  if (!basis) {
    const scope = makeScope(`scope-${Date.now()}`, "", [], "", "");
    basis = createBasisForScope(collection.id, scope);
    state.profiles.push(basis);
    state.activeBasisId = basis.id;
    state.activeScopeId = basis.scopes[0].id;
  }
  return basis;
}

function commitCountryNode() {
  const collection = getActiveProfile();
  if (!collection) return;
  collection.countryCode = ui.countryCodeInput.value || "DE";
  state.profileWorkbenchLevel = "subdivision";
  renderAll();
}

function commitSubdivisionNode() {
  const collection = getActiveProfile();
  if (!collection) return;
  collection.subdivisionCode = ui.subdivisionCodeInput.value || "";
  state.profileWorkbenchLevel = "school";
  renderAll();
}

function commitSchoolNode() {
  const collection = getActiveProfile();
  if (!collection) return;
  const schoolType = ui.schoolTypeInput.value || MV_SCHOOL_TYPES[0]?.name || "";
  const existing = state.profiles
    .filter((basis) => basis.collectionId === collection.id)
    .flatMap((basis) => (basis.scopes || []).map((scope) => ({ basis, scope })))
    .find(({ scope }) => scope.schoolType === schoolType && !(scope.classes || []).length && !scope.assessmentType && !scope.qualification);
  if (existing) {
    state.activeBasisId = existing.basis.id;
    state.activeScopeId = existing.scope.id;
  } else {
    const scope = makeScope(`scope-${Date.now()}`, schoolType, [], "", "");
    const basis = createBasisForScope(collection.id, scope);
    state.profiles.push(basis);
    state.activeBasisId = basis.id;
    state.activeScopeId = basis.scopes[0].id;
  }
  state.profileWorkbenchLevel = "class";
  renderAll();
}

function commitClassNode() {
  const basis = ensureActiveBasisForHierarchy();
  const scope = getActiveScope();
  if (!basis || !scope) return;
  scope.classes = ui.gradeBandInput.value.split(/[,;]+/).map((value) => value.trim()).filter(Boolean);
  basis.name = makeBasisName(scope, basis.scaleType);
  state.profileWorkbenchLevel = "performance";
  renderAll();
}

function commitPerformanceNode() {
  const collection = getActiveProfile();
  const basis = ensureActiveBasisForHierarchy();
  const scope = getActiveScope();
  if (!collection || !basis || !scope) return;
  const nextScope = {
    ...scope,
    id: `${basis.id}-scope-${Date.now()}`,
    assessmentType: ui.assessmentTypeInput.value.trim(),
    qualification: ui.qualificationInput.value.trim(),
  };
  const currentEmpty = !scope.assessmentType && !scope.qualification;
  if (currentEmpty) {
    Object.assign(scope, nextScope, { id: scope.id });
    basis.name = makeBasisName(scope, basis.scaleType);
    state.activeScopeId = scope.id;
  } else {
    const nextBasis = createBasisForScope(collection.id, nextScope, basis.scaleType || "grade6");
    state.profiles.push(nextBasis);
    state.activeBasisId = nextBasis.id;
    state.activeScopeId = nextBasis.scopes[0].id;
  }
  state.profileWorkbenchLevel = "scale";
  renderAll();
}

function commitScaleNode() {
  const basis = ensureActiveBasisForHierarchy();
  const scope = getActiveScope();
  if (!basis || !scope) return;
  const nextScale = ui.scaleTypeSelect.value || "grade6";
  basis.scaleType = nextScale;
  basis.thresholds = makeDefaultThresholds(nextScale);
  basis.name = makeBasisName(scope, nextScale);
  state.profileWorkbenchLevel = "scale";
  renderAll();
}

function createBlankBasis(collectionId, scope = makeScope(`scope-${Date.now()}`, "", [], "", "")) {
  const id = `basis-${Date.now()}`;
  return {
    id,
    collectionId,
    name: "Neue Berechnungsgrundlage",
    version: "1",
    validFrom: "",
    validUntil: "",
    scaleType: "grade6",
    status: "draft",
    sourceNote: "",
    sourceUrl: "",
    scopes: [{ ...scope, id: scope.id || `${id}-scope-1` }],
    thresholds: makeThresholds(grade6Labels, [90, 75, 60, 45, 25, 0]),
  };
}

function createBlankCollection() {
  const id = `profile-${Date.now()}`;
  return { id, name: "Neues Profil", countryCode: "", subdivisionCode: "" };
}

function downloadJson(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function exportWorkspace() {
  downloadJson("schola-bewertungsprofile.json", {
    type: "schola-grade-profiles-export",
    version: 1,
    collections: state.collections,
    bases: state.profiles,
  });
}

function exportCollection(collectionId) {
  const collection = state.collections.find((entry) => entry.id === collectionId);
  if (!collection) return;
  downloadJson(`${collection.name || "bewertungsprofil"}.json`, {
    type: "schola-grade-profile-export",
    version: 1,
    collections: [collection],
    bases: getCollectionBases(collection.id),
  });
}

function deleteCollection(collectionId) {
  const collection = state.collections.find((entry) => entry.id === collectionId);
  if (!collection) return;
  const deletedBasisIds = new Set(getCollectionBases(collection.id).map((basis) => basis.id));
  state.collections = state.collections.filter((entry) => entry.id !== collection.id);
  state.profiles = state.profiles.filter((basis) => basis.collectionId !== collection.id);

  if (state.activeProfileId === collection.id) {
    state.activeProfileId = state.collections[0]?.id || "";
    state.activeBasisId = state.profiles.find((basis) => basis.collectionId === state.activeProfileId)?.id || "";
    state.activeScopeId = getActiveBasis()?.scopes?.[0]?.id || "";
    state.profileWorkbenchLevel = "country";
  }
  if (deletedBasisIds.has(state.bridgeProfileId)) {
    state.bridgeProfileId = "";
    state.bridgeScopeId = "";
  }
  renderAll();
}

function resetProfileDeleteHold() {
  if (!profileDeleteHoldState) return;
  const { button, frame, pointerId } = profileDeleteHoldState;
  if (frame) cancelAnimationFrame(frame);
  if (button) {
    button.classList.remove("is-hold-active", "is-hold-ready");
    button.style.removeProperty("--hold-progress");
    if (Number.isFinite(pointerId) && button.hasPointerCapture?.(pointerId)) {
      try {
        button.releasePointerCapture(pointerId);
      } catch {
        // Pointer capture can already be gone if the menu closes during cancel.
      }
    }
  }
  profileDeleteHoldState = null;
}

function tickProfileDeleteHold() {
  if (!profileDeleteHoldState) return;
  const elapsed = performance.now() - profileDeleteHoldState.startedAt;
  const progress = Math.max(0, Math.min(1, elapsed / PROFILE_DELETE_HOLD_MS));
  profileDeleteHoldState.button.style.setProperty("--hold-progress", `${progress * 100}%`);
  if (progress >= 1) {
    profileDeleteHoldState.armed = true;
    profileDeleteHoldState.button.classList.add("is-hold-ready");
    profileDeleteHoldState.frame = null;
    return;
  }
  profileDeleteHoldState.frame = requestAnimationFrame(tickProfileDeleteHold);
}

function beginProfileDeleteHold(event) {
  const button = event.currentTarget;
  if (!(button instanceof HTMLButtonElement)) return;
  event.preventDefault();
  event.stopPropagation();
  resetProfileDeleteHold();
  const profileId = String(button.dataset.profileId || "").trim();
  if (!profileId) return;
  profileDeleteHoldState = {
    button,
    profileId,
    pointerId: Number.isFinite(event.pointerId) ? event.pointerId : null,
    startedAt: performance.now(),
    armed: false,
    frame: null,
  };
  if (Number.isFinite(event.pointerId)) {
    try {
      button.setPointerCapture?.(event.pointerId);
    } catch {
      // Some browsers reject pointer capture for synthetic pointer events.
    }
  }
  button.classList.add("is-hold-active");
  button.style.setProperty("--hold-progress", "0%");
  profileDeleteHoldState.frame = requestAnimationFrame(tickProfileDeleteHold);
}

function finishProfileDeleteHold(event) {
  if (!profileDeleteHoldState) return;
  event.preventDefault();
  event.stopPropagation();
  const { button, profileId } = profileDeleteHoldState;
  const releaseTarget = document.elementFromPoint(event.clientX, event.clientY);
  const releasedOnButton = Boolean(releaseTarget && button && (releaseTarget === button || button.contains(releaseTarget)));
  const shouldDelete = profileDeleteHoldState.armed === true && releasedOnButton;
  resetProfileDeleteHold();
  if (shouldDelete) deleteCollection(profileId);
}

function cancelProfileDeleteHold(event) {
  if (!profileDeleteHoldState) return;
  event.preventDefault();
  event.stopPropagation();
  resetProfileDeleteHold();
}

async function importBundledProfile(profilePath = BUNDLED_PROFILE_FILES[0]?.path) {
  if (!profilePath) return;
  try {
    const response = await fetch(profilePath, { cache: "no-store" });
    if (!response.ok) throw new Error("profile-folder-import-failed");
    importWorkspacePayload(await response.json());
    return;
  } catch (error) {
    // Lokale Starts über file:// dürfen JSON-Dateien oft nicht per fetch()
    // lesen. Für mitgelieferte Profile laden wir deshalb zusätzlich eine
    // generierte Registry-Datei aus demselben Profilordner. Die fachliche
    // Quelle bleibt weiterhin die JSON-Datei.
    const fallback = window.SCHOLA_BUNDLED_PROFILE_DATA?.[profilePath];
    if (!fallback) throw error;
    importWorkspacePayload(clone(fallback));
  }
}

function renderProfileFolderMenu() {
  ui.profileFolderMenu.replaceChildren(...BUNDLED_PROFILE_FILES.map((profile) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "profile-folder-choice";
    button.dataset.profileFolderPath = profile.path;
    const title = document.createElement("strong");
    title.textContent = profile.label;
    const meta = document.createElement("span");
    meta.textContent = "Profilordner";
    button.append(title, meta);
    return button;
  }));
}

function importWorkspacePayload(payload) {
  const collections = Array.isArray(payload?.collections) ? payload.collections : [];
  const bases = Array.isArray(payload?.bases) ? payload.bases : Array.isArray(payload?.profiles) ? payload.profiles : [];
  if (!collections.length || !bases.length) throw new Error("invalid-import");
  const idMap = new Map();
  const importedCollections = collections.map((collection, index) => {
    const originalId = collection.id || `import-${Date.now()}-${index}`;
    const nextId = state.collections.some((entry) => entry.id === originalId) ? `${originalId}-import-${Date.now()}` : originalId;
    idMap.set(originalId, nextId);
    return {
      id: nextId,
      name: collection.name || "Importiertes Profil",
      countryCode: collection.countryCode || "DE",
      subdivisionCode: collection.subdivisionCode || "DE-MV",
    };
  });
  const importedBases = bases.map(normalizeProfile).map((basis, index) => {
    const originalCollectionId = basis.collectionId || collections[0]?.id;
    const collectionId = idMap.get(originalCollectionId) || importedCollections[0].id;
    const copy = clone(basis);
    copy.id = state.profiles.some((entry) => entry.id === copy.id) ? `${copy.id}-import-${Date.now()}-${index}` : copy.id || `basis-import-${Date.now()}-${index}`;
    copy.collectionId = collectionId;
    copy.scopes = copy.scopes.map((scope, scopeIndex) => ({ ...scope, id: `${copy.id}-scope-${scopeIndex + 1}` }));
    return copy;
  });
  state.collections.push(...importedCollections);
  state.profiles.push(...importedBases);
  state.activeProfileId = importedCollections[0].id;
  state.activeBasisId = importedBases.find((basis) => basis.collectionId === state.activeProfileId)?.id || "";
  state.activeScopeId = getActiveBasis()?.scopes?.[0]?.id || "";
  renderAll();
}

function setWorkspaceMode(mode) {
  ui.gradeApp.classList.toggle("workspace-mode-engine", mode === "engine");
  ui.gradeApp.classList.toggle("workspace-mode-bridge", mode !== "engine");
  if (mode === "engine") (state.engineTab === "profile" ? ui.engineProfileSelect : ui.engineBrowserTab).focus();
  else ui.earnedInput.focus();
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

ui.menuButton.addEventListener("click", () => setMenuOpen(ui.menuButton.getAttribute("aria-expanded") !== "true"));
ui.menuCloseButton.addEventListener("click", () => setMenuOpen(false));
ui.menuOverlay.addEventListener("click", () => setMenuOpen(false));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") setMenuOpen(false); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") resetProfileDeleteHold(); });
ui.openEngineButton.addEventListener("click", () => setWorkspaceMode("engine"));
ui.returnBridgeButton.addEventListener("click", () => setWorkspaceMode("bridge"));
ui.engineBrowserTab.addEventListener("click", () => setEngineTab("browser"));
ui.engineProfileTab.addEventListener("click", () => setEngineTab("profile"));
ui.engineProfileSelect.addEventListener("change", () => selectProfile(ui.engineProfileSelect.value));
ui.profileTree.addEventListener("click", (event) => {
  const toggle = event.target.closest("[data-tree-toggle]");
  if (toggle) {
    const key = toggle.dataset.treeToggle;
    if (state.profileTreeCollapsed.has(key)) state.profileTreeCollapsed.delete(key);
    else state.profileTreeCollapsed.add(key);
    renderProfileEditor();
    persist();
    return;
  }
  const button = event.target.closest("[data-workbench-level]");
  if (!button) return;
  setWorkbenchContext(button.dataset.workbenchLevel, button.dataset.basisId, button.dataset.scopeId);
});
ui.profilePreviewTree.addEventListener("click", (event) => {
  const toggle = event.target.closest("[data-tree-toggle]");
  if (!toggle) return;
  const key = toggle.dataset.treeToggle;
  if (state.profileTreeCollapsed.has(key)) state.profileTreeCollapsed.delete(key);
  else state.profileTreeCollapsed.add(key);
  renderProfilePreview();
  persist();
});
ui.schoolTypeMenuButton.addEventListener("click", () => toggleSelectionMenu(ui.schoolTypeMenuButton, ui.schoolTypeMenu));
ui.classLevelMenuButton.addEventListener("click", () => toggleSelectionMenu(ui.classLevelMenuButton, ui.classLevelMenu));
ui.performanceMenuButton.addEventListener("click", () => toggleSelectionMenu(ui.performanceMenuButton, ui.performanceMenu));
document.addEventListener("click", (event) => {
  if (!event.target.closest(".selection-menu-shell")) closeSelectionMenus();
});
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeSelectionMenus(); });
document.addEventListener("click", (event) => {
  if (event.target.closest(".profile-record-menu")) return;
  document.querySelectorAll(".profile-record-menu[open]").forEach((menu) => {
    menu.open = false;
  });
  if (!event.target.closest(".import-menu-shell")) {
    ui.profileImportMenu.hidden = true;
    ui.profileFolderMenu.hidden = true;
    ui.importProfilesButton.setAttribute("aria-expanded", "false");
  }
  if (!event.target.closest(".profile-record-action-delete")) resetProfileDeleteHold();
});

ui.earnedInput.addEventListener("input", () => { state.earned = ui.earnedInput.value; renderBridge(); persist(); });
ui.totalInput.addEventListener("input", () => { state.total = ui.totalInput.value; renderBridge(); persist(); });
ui.resetScoreButton.addEventListener("click", () => {
  state.earned = "";
  state.total = "";
  renderBridge();
  persist();
  ui.earnedInput.focus();
});

[
  [ui.profileNameInput, "name"],
].forEach(([element, field]) => element.addEventListener("input", () => updateProfileField(field, element.value)));

[
  [ui.basisNameInput, "name"], [ui.profileVersionInput, "version"], [ui.validFromInput, "validFrom"], [ui.validUntilInput, "validUntil"],
  [ui.profileStatusSelect, "status"], [ui.sourceNoteInput, "sourceNote"], [ui.sourceUrlInput, "sourceUrl"],
].forEach(([element, field]) => element.addEventListener("input", () => updateBasisField(field, element.value)));

ui.basisSelect.addEventListener("change", () => {
  state.activeBasisId = ui.basisSelect.value;
  const basis = getActiveBasis();
  state.activeScopeId = basis?.scopes?.[0]?.id || "";
  state.profileWorkbenchLevel = "scale";
  renderAll();
});

ui.scopeSelect.addEventListener("change", () => {
  state.activeScopeId = ui.scopeSelect.value;
  state.profileWorkbenchLevel = "scale";
  renderProfileEditor();
  persist();
});
ui.addCountryButton.addEventListener("click", commitCountryNode);
ui.addSubdivisionButton.addEventListener("click", commitSubdivisionNode);
ui.addSchoolTypeButton.addEventListener("click", commitSchoolNode);
ui.addClassBandButton.addEventListener("click", commitClassNode);
ui.addPerformanceButton.addEventListener("click", commitPerformanceNode);
ui.addScaleButton.addEventListener("click", commitScaleNode);

ui.addThresholdButton.addEventListener("click", () => {
  const profile = getActiveBasis();
  if (!profile || profile.scaleType !== "manual") return;
  profile.thresholds.push({ level: `Stufe ${profile.thresholds.length + 1}`, note: "", minPercent: 0 });
  persist();
  renderAll();
});

ui.newProfileButton.addEventListener("click", () => {
  const profile = createBlankCollection();
  state.collections.push(profile);
  state.activeProfileId = profile.id;
  state.activeBasisId = "";
  state.activeScopeId = "";
  state.profileWorkbenchLevel = "country";
  setEngineTab("profile");
  renderAll();
  ui.profileNameInput.select();
});

ui.profileBrowserList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-profile-action]");
  if (!button) {
    if (event.target.closest(".profile-record-menu")) return;
    const item = event.target.closest(".profile-browser-item");
    if (item?.dataset.profileId) selectProfile(item.dataset.profileId);
    return;
  }
  const profileId = button.dataset.profileId;
  if (button.dataset.profileAction === "activate") {
    activateProfileForBridge(profileId);
    setEngineTab("browser");
  }
  if (button.dataset.profileAction === "edit") {
    selectProfile(profileId);
    setEngineTab("profile");
    ui.profileNameInput.focus();
  }
  if (button.dataset.profileAction === "export") exportCollection(profileId);
  if (button.dataset.profileAction === "delete") return;
});

ui.profileBrowserList.addEventListener("keydown", (event) => {
  if (!["Enter", " "].includes(event.key)) return;
  const item = event.target.closest(".profile-browser-item");
  if (!item?.dataset.profileId) return;
  event.preventDefault();
  selectProfile(item.dataset.profileId);
});

ui.exportProfilesButton.addEventListener("click", exportWorkspace);
ui.importProfilesButton.addEventListener("click", () => {
  const nextOpen = ui.profileImportMenu.hidden;
  ui.profileImportMenu.hidden = !nextOpen;
  ui.profileFolderMenu.hidden = true;
  ui.importProfilesButton.setAttribute("aria-expanded", String(nextOpen));
});
ui.importFromDesktopButton.addEventListener("click", () => {
  ui.profileImportMenu.hidden = true;
  ui.profileFolderMenu.hidden = true;
  ui.importProfilesButton.setAttribute("aria-expanded", "false");
  ui.profileImportInput.click();
});
ui.importFromProfileFolderButton.addEventListener("click", () => {
  renderProfileFolderMenu();
  ui.profileFolderMenu.hidden = !ui.profileFolderMenu.hidden;
});
ui.profileFolderMenu.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-profile-folder-path]");
  if (!button) return;
  ui.profileImportMenu.hidden = true;
  ui.profileFolderMenu.hidden = true;
  ui.importProfilesButton.setAttribute("aria-expanded", "false");
  try {
    await importBundledProfile(button.dataset.profileFolderPath);
  } catch (error) {
    window.alert("Das Profil aus dem Profilordner konnte nicht importiert werden.");
  }
});
ui.profileImportInput.addEventListener("change", async () => {
  const file = ui.profileImportInput.files?.[0];
  ui.profileImportInput.value = "";
  if (!file) return;
  try {
    importWorkspacePayload(JSON.parse(await file.text()));
  } catch (error) {
    window.alert("Die Datei konnte nicht als Schola-Bewertungsprofil importiert werden.");
  }
});

ui.addBasisButton.addEventListener("click", () => {
  const collection = getActiveProfile();
  if (!collection) return;
  const basis = createBlankBasis(collection.id);
  state.profiles.push(basis);
  state.activeBasisId = basis.id;
  state.activeScopeId = basis.scopes[0].id;
  state.profileWorkbenchLevel = "scale";
  renderAll();
  ui.basisNameInput.select();
});

ui.duplicateBasisButton.addEventListener("click", () => {
  const source = getActiveBasis();
  if (!source) return;
  const basis = clone(source);
  basis.id = `basis-${Date.now()}`;
  basis.name = `${source.name} · Kopie`;
  basis.status = "draft";
  basis.scopes = basis.scopes.map((scope, index) => ({ ...scope, id: `${basis.id}-scope-${index + 1}` }));
  state.profiles.push(basis);
  state.activeBasisId = basis.id;
  state.activeScopeId = basis.scopes[0]?.id || "";
  state.profileWorkbenchLevel = "scale";
  renderAll();
});

ui.deleteBasisButton.addEventListener("click", () => {
  const basis = getActiveBasis();
  const availableBases = state.profiles.filter((entry) => entry.collectionId === state.activeProfileId);
  if (!basis || availableBases.length <= 1) return;
  state.profiles = state.profiles.filter((entry) => entry.id !== basis.id);
  const next = state.profiles.find((entry) => entry.collectionId === state.activeProfileId);
  state.activeBasisId = next?.id || "";
  state.activeScopeId = next?.scopes?.[0]?.id || "";
  if (state.bridgeProfileId === basis.id) {
    state.bridgeProfileId = "";
    state.bridgeScopeId = "";
  }
  renderAll();
});

ui.addScopeButton.addEventListener("click", () => {
  const profile = getActiveBasis();
  if (!profile) return;
  const scope = makeScope(`${profile.id}-scope-${Date.now()}`, "Regionale Schule", ["7"], "", "");
  profile.scopes.push(scope);
  state.activeScopeId = scope.id;
  state.profileWorkbenchLevel = "performance";
  renderAll();
  ui.assessmentTypeInput.focus();
});

ui.deleteScopeButton.addEventListener("click", () => {
  const profile = getActiveBasis();
  if (!profile || profile.scopes.length <= 1) return;
  const scope = getActiveScope();
  profile.scopes = profile.scopes.filter((entry) => entry.id !== scope?.id);
  state.activeScopeId = profile.scopes[0]?.id || "";
  if (state.bridgeScopeId === scope?.id) {
    state.bridgeProfileId = "";
    state.bridgeScopeId = "";
  }
  renderAll();
});

ui.resetProfilesButton?.addEventListener("click", () => {
  if (!window.confirm("Alle lokal gespeicherten Bewertungsprofile aus dieser App entfernen?")) return;
  state.collections = [];
  state.profiles = [];
  state.activeProfileId = "";
  state.activeBasisId = "";
  state.activeScopeId = "";
  state.bridgeProfileId = "";
  state.bridgeScopeId = "";
  renderAll();
});

renderAll();




