const STORAGE_KEY = "schola-grade-profiles-v4";
const SESSION_KEY = "schola-grade-session-v4";
const LEGACY_STORAGE_KEYS = ["schola-grade-profiles-v3", "schola-grade-profiles-v2"];
const LEGACY_SESSION_KEYS = ["schola-grade-session-v3", "schola-grade-session-v2"];

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
  ["15", "1+"], ["14", "1"], ["13", "1−"], ["12", "2+"],
  ["11", "2"], ["10", "2−"], ["09", "3+"], ["08", "3"],
  ["07", "3−"], ["06", "4+"], ["05", "4"], ["04", "4−"],
  ["03", "5+"], ["02", "5"], ["01", "5−"], ["00", "6"],
];

function makeThresholds(labels, percentages) {
  return labels.map(([level, note], index) => ({ level, note, minPercent: percentages[index] }));
}

function makeScope(id, schoolType, classes, assessmentType, qualification = "") {
  return { id, schoolType, classes: [...classes], assessmentType, qualification };
}

function createDefaultProfiles() {
  const sourceNote = "Übernommen aus „Notenberechnung B M G.ods“; persönliche Arbeitsgrundlage, noch nicht amtlich verifiziert.";
  const gradeProfile = (id, name, schoolType, classes, assessmentType, percentages) => ({
    id, name, federalState: "Mecklenburg-Vorpommern", authority: "Eigene Ausgangstabelle", schoolType, classes, assessmentType,
    scaleType: "grade6", status: "personal", sourceNote, sourceUrl: "",
    thresholds: makeThresholds(grade6Labels, [...percentages, 0]),
  });
  const pointProfile = (id, name, assessmentType, percentages) => ({
    id, name, federalState: "Mecklenburg-Vorpommern", authority: "Eigene Ausgangstabelle", schoolType: "Gymnasium",
    classes: ["10", "11", "12"], assessmentType,
    scaleType: "points15", status: "personal", sourceNote, sourceUrl: "",
    thresholds: makeThresholds(point15Labels, percentages),
  });
  return [
    gradeProfile("b-class-test", "Regionale Schule · Berufsreife · Klassenarbeit", "Regionale Schule", ["7", "8", "9", "10"], "Klassenarbeit · Berufsreife", [80, 60, 45, 25, 10]),
    gradeProfile("m-class-test", "Regionale Schule · Mittlere Reife · Klassenarbeit", "Regionale Schule", ["7", "8", "9", "10"], "Klassenarbeit · Mittlere Reife", [96, 80, 60, 40, 20]),
    gradeProfile("b-check", "Regionale Schule · Berufsreife · Leistungskontrolle", "Regionale Schule", ["7", "8", "9", "10"], "Leistungskontrolle · Berufsreife", [81, 62, 47, 29, 15]),
    gradeProfile("m-check", "Regionale Schule · Mittlere Reife · Leistungskontrolle", "Regionale Schule", ["7", "8", "9", "10"], "Leistungskontrolle · Mittlere Reife", [97, 82, 62, 46, 30]),
    gradeProfile("gym-sek1-simple", "Gymnasium · Sek. I · einfach", "Gymnasium", ["7", "8", "9"], "einfache Leistung", [80, 60, 45, 25, 10]),
    gradeProfile("gym-sek1-test", "Gymnasium · Sek. I · Klassenarbeit", "Gymnasium", ["7", "8", "9"], "Klassenarbeit", [96, 80, 60, 40, 20]),
    pointProfile("gym-sek2-simple", "Gymnasium · Sek. II · einfach", "einfache Leistung", [100, 98, 96, 91, 86, 80, 73, 66, 60, 53, 46, 40, 33, 26, 20, 0]),
    pointProfile("gym-sek2-exam", "Gymnasium · Sek. II · Klausur", "Klausur", [95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 33, 27, 20, 0]),
  ];
}

const ui = Object.fromEntries([
  "gradeApp", "menuButton", "menuCloseButton", "menuOverlay", "sideMenu", "resetScoreButton",
  "openEngineButton", "returnBridgeButton", "schoolTypeMenuButton", "schoolTypeMenu",
  "classLevelMenuButton", "classLevelMenu", "performanceMenuButton", "performanceMenu",
  "selectionSummary", "engineProfileSelect",
  "earnedInput", "totalInput", "percentageOutput", "scoreTrackFill", "inputMessage", "resultPrimary",
  "resultSecondary", "betterGradeOutput", "worseGradeOutput", "pointsNeededOutput", "pointsToWorseOutput", "boundaryList",
  "newProfileButton", "duplicateProfileButton", "deleteProfileButton", "profileNameInput", "countryCodeInput",
  "subdivisionCodeInput", "basisSelect", "addBasisButton", "duplicateBasisButton", "deleteBasisButton", "basisNameInput",
  "profileVersionInput", "validFromInput", "validUntilInput", "scopeSelect", "addScopeButton",
  "deleteScopeButton", "schoolTypeInput", "gradeBandInput", "assessmentTypeInput", "qualificationInput", "scaleTypeSelect", "profileStatusSelect",
  "sourceNoteInput", "sourceUrlInput", "thresholdEditor", "resetProfilesButton",
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
  const bases = createDefaultProfiles().map(normalizeProfile).map((basis) => assignBasisToCollection(basis, "de-de-mv"));
  return { collections: [{ id: "de-de-mv", name: "Mecklenburg-Vorpommern", countryCode: "DE", subdivisionCode: "DE-MV" }], bases };
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
  bridgeProfileId: storedSession.bridgeProfileId || "gym-sek1-test",
  bridgeScopeId: storedSession.bridgeScopeId || "",
  activeScopeId: storedSession.activeScopeId || "",
  schoolType: storedSession.schoolType || "Gymnasium",
  classLevel: storedSession.classLevel || "7",
  earned: storedSession.earned ?? "46",
  total: storedSession.total ?? "54",
};

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
  if (!Number.isFinite(value)) return "–";
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
    ui.percentageOutput.textContent = "– %";
    ui.resultPrimary.textContent = "–";
    ui.resultSecondary.textContent = profile ? "Bitte gültige Punktwerte eingeben." : "Kein Bewertungsprofil";
    ui.betterGradeOutput.textContent = "–";
    ui.worseGradeOutput.textContent = "–";
    ui.pointsNeededOutput.textContent = "–";
    ui.pointsToWorseOutput.textContent = "–";
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
  ui.resultPrimary.textContent = result.current?.level || "–";
  const numericNote = String(pointScale ? result.current?.note : result.current?.level || "").match(/[1-6]/)?.[0] || "";
  ui.resultSecondary.textContent = grade6Labels.find(([grade]) => grade === numericNote)?.[1] || "";
  ui.betterGradeOutput.textContent = result.better?.level || "–";
  ui.worseGradeOutput.textContent = result.worse?.level || "–";
  ui.pointsNeededOutput.textContent = result.better ? `+ ${formatNumber(result.pointsNeeded)} P.` : "Beststufe";
  ui.pointsToWorseOutput.textContent = result.worse ? `− ${formatNumber(result.pointsToWorse)} P.` : "Endstufe";

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
  const profile = getActiveBasis();
  if (!collection || !profile) return;
  const availableBases = state.profiles.filter((basis) => basis.collectionId === collection.id);
  if (!availableBases.some((basis) => basis.id === state.activeBasisId)) state.activeBasisId = availableBases[0]?.id || "";
  const activeBasis = getActiveBasis();
  if (!activeBasis) return;
  if (!activeBasis.scopes.some((scope) => scope.id === state.activeScopeId)) state.activeScopeId = activeBasis.scopes[0]?.id || "";
  const scope = getActiveScope();
  ui.profileNameInput.value = collection.name || "";
  ui.countryCodeInput.value = collection.countryCode || "DE";
  ui.subdivisionCodeInput.value = collection.subdivisionCode || "DE-MV";
  ui.basisSelect.replaceChildren(...availableBases.map((basis) => new Option(basis.name, basis.id)));
  ui.basisSelect.value = activeBasis.id;
  ui.basisNameInput.value = activeBasis.name || "";
  ui.profileVersionInput.value = activeBasis.version || "1";
  ui.validFromInput.value = activeBasis.validFrom || "";
  ui.validUntilInput.value = activeBasis.validUntil || "";
  ui.scopeSelect.replaceChildren(...activeBasis.scopes.map((entry, index) => new Option(
    [entry.schoolType, entry.assessmentType, entry.qualification].filter(Boolean).join(" · ") || `Geltungsbereich ${index + 1}`,
    entry.id,
  )));
  ui.scopeSelect.value = state.activeScopeId;
  ui.schoolTypeInput.replaceChildren(...MV_SCHOOL_TYPES.map((entry) => new Option(entry.name, entry.name)));
  ui.schoolTypeInput.value = scope?.schoolType || "";
  ui.gradeBandInput.value = (scope?.classes || []).join(", ");
  ui.assessmentTypeInput.value = scope?.assessmentType || "";
  ui.qualificationInput.value = scope?.qualification || "";
  ui.deleteScopeButton.disabled = activeBasis.scopes.length <= 1;
  ui.deleteBasisButton.disabled = availableBases.length <= 1;
  ui.deleteProfileButton.disabled = state.collections.length <= 1;
  ui.scaleTypeSelect.value = activeBasis.scaleType || "grade6";
  ui.profileStatusSelect.value = activeBasis.status || "personal";
  ui.sourceNoteInput.value = activeBasis.sourceNote || "";
  ui.sourceUrlInput.value = activeBasis.sourceUrl || "";

  ui.thresholdEditor.replaceChildren(...getSortedThresholds(activeBasis).map((threshold) => {
    const row = document.createElement("label");
    row.className = "threshold-row";
    const level = document.createElement("output");
    level.textContent = activeBasis.scaleType === "points15" ? `${threshold.level} P.` : threshold.level;
    const note = document.createElement("output");
    note.textContent = threshold.note;
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
    row.append(level, note, shell);
    return row;
  }));
}

function renderAll() {
  if (!state.collections.some((profile) => profile.id === state.activeProfileId)) state.activeProfileId = state.collections[0]?.id || "";
  const availableBases = state.profiles.filter((basis) => basis.collectionId === state.activeProfileId);
  if (!availableBases.some((basis) => basis.id === state.activeBasisId)) state.activeBasisId = availableBases[0]?.id || "";
  renderProfileOptions();
  renderBridgeSelectors();
  renderBridge();
  renderProfileEditor();
  persist();
}

function selectProfile(profileId) {
  if (!state.collections.some((profile) => profile.id === profileId)) return;
  state.activeProfileId = profileId;
  const profile = state.profiles.find((basis) => basis.collectionId === profileId);
  state.activeBasisId = profile?.id || "";
  state.activeScopeId = profile?.scopes?.[0]?.id || "";
  const scope = getActiveScope();
  state.bridgeProfileId = profile.id;
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

function createBlankBasis(collectionId) {
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
    scopes: [makeScope(`${id}-scope-1`, "Regionale Schule", ["7"], "", "")],
    thresholds: makeThresholds(grade6Labels, [90, 75, 60, 45, 25, 0]),
  };
}

function createBlankCollection() {
  const id = `profile-${Date.now()}`;
  return { id, name: "Neues Profil", countryCode: "DE", subdivisionCode: "DE-MV" };
}

function setWorkspaceMode(mode) {
  ui.gradeApp.classList.toggle("workspace-mode-engine", mode === "engine");
  ui.gradeApp.classList.toggle("workspace-mode-bridge", mode !== "engine");
  if (mode === "engine") ui.engineProfileSelect.focus();
  else ui.earnedInput.focus();
}

function setMenuOpen(isOpen) {
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
ui.openEngineButton.addEventListener("click", () => setWorkspaceMode("engine"));
ui.returnBridgeButton.addEventListener("click", () => setWorkspaceMode("bridge"));
ui.engineProfileSelect.addEventListener("change", () => selectProfile(ui.engineProfileSelect.value));
ui.schoolTypeMenuButton.addEventListener("click", () => toggleSelectionMenu(ui.schoolTypeMenuButton, ui.schoolTypeMenu));
ui.classLevelMenuButton.addEventListener("click", () => toggleSelectionMenu(ui.classLevelMenuButton, ui.classLevelMenu));
ui.performanceMenuButton.addEventListener("click", () => toggleSelectionMenu(ui.performanceMenuButton, ui.performanceMenu));
document.addEventListener("click", (event) => {
  if (!event.target.closest(".selection-menu-shell")) closeSelectionMenus();
});
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeSelectionMenus(); });

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
  [ui.profileNameInput, "name"], [ui.countryCodeInput, "countryCode"], [ui.subdivisionCodeInput, "subdivisionCode"],
].forEach(([element, field]) => element.addEventListener("input", () => updateProfileField(field, element.value)));

[
  [ui.basisNameInput, "name"], [ui.profileVersionInput, "version"], [ui.validFromInput, "validFrom"], [ui.validUntilInput, "validUntil"],
  [ui.profileStatusSelect, "status"], [ui.sourceNoteInput, "sourceNote"], [ui.sourceUrlInput, "sourceUrl"],
].forEach(([element, field]) => element.addEventListener("input", () => updateBasisField(field, element.value)));

ui.basisSelect.addEventListener("change", () => {
  state.activeBasisId = ui.basisSelect.value;
  const basis = getActiveBasis();
  state.activeScopeId = basis?.scopes?.[0]?.id || "";
  renderAll();
});

ui.scopeSelect.addEventListener("change", () => {
  state.activeScopeId = ui.scopeSelect.value;
  renderProfileEditor();
  persist();
});
ui.schoolTypeInput.addEventListener("change", () => updateScopeField("schoolType", ui.schoolTypeInput.value));
ui.assessmentTypeInput.addEventListener("input", () => updateScopeField("assessmentType", ui.assessmentTypeInput.value));
ui.qualificationInput.addEventListener("input", () => updateScopeField("qualification", ui.qualificationInput.value));

ui.gradeBandInput.addEventListener("input", () => {
  const classes = ui.gradeBandInput.value.split(/[,;]+/).map((value) => value.trim()).filter(Boolean);
  updateScopeField("classes", classes);
});

ui.scaleTypeSelect.addEventListener("change", () => {
  const profile = getActiveBasis();
  if (!profile || profile.scaleType === ui.scaleTypeSelect.value) return;
  const confirmed = window.confirm("Beim Wechsel des Notensystems werden die Prozentgrenzen dieses Profils auf eine neutrale Ausgangsskala gesetzt.");
  if (!confirmed) {
    ui.scaleTypeSelect.value = profile.scaleType;
    return;
  }
  profile.scaleType = ui.scaleTypeSelect.value;
  profile.thresholds = profile.scaleType === "points15"
    ? makeThresholds(point15Labels, [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 35, 25, 15, 0])
    : makeThresholds(grade6Labels, [90, 75, 60, 45, 25, 0]);
  renderAll();
});

ui.newProfileButton.addEventListener("click", () => {
  const profile = createBlankCollection();
  const basis = createBlankBasis(profile.id);
  state.collections.push(profile);
  state.profiles.push(basis);
  state.activeProfileId = profile.id;
  state.activeBasisId = basis.id;
  state.activeScopeId = basis.scopes[0].id;
  renderAll();
  ui.profileNameInput.select();
});

ui.duplicateProfileButton.addEventListener("click", () => {
  const source = getActiveProfile();
  if (!source) return;
  const profile = clone(source);
  profile.id = `profile-${Date.now()}`;
  profile.name = `${source.name} · Kopie`;
  const bases = state.profiles.filter((basis) => basis.collectionId === source.id).map((basis, basisIndex) => {
    const copy = clone(basis);
    copy.id = `${profile.id}-basis-${basisIndex + 1}`;
    copy.collectionId = profile.id;
    copy.status = "draft";
    copy.scopes = copy.scopes.map((scope, index) => ({ ...scope, id: `${copy.id}-scope-${index + 1}` }));
    return copy;
  });
  state.collections.push(profile);
  state.profiles.push(...bases);
  state.activeProfileId = profile.id;
  state.activeBasisId = bases[0]?.id || "";
  state.activeScopeId = bases[0]?.scopes?.[0]?.id || "";
  renderAll();
});

ui.addBasisButton.addEventListener("click", () => {
  const collection = getActiveProfile();
  if (!collection) return;
  const basis = createBlankBasis(collection.id);
  state.profiles.push(basis);
  state.activeBasisId = basis.id;
  state.activeScopeId = basis.scopes[0].id;
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

ui.deleteProfileButton.addEventListener("click", () => {
  if (state.collections.length <= 1) return;
  const profile = getActiveProfile();
  if (!profile || !window.confirm(`Profil „${profile.name}“ löschen?`)) return;
  state.collections = state.collections.filter((entry) => entry.id !== profile.id);
  state.profiles = state.profiles.filter((entry) => entry.collectionId !== profile.id);
  state.activeProfileId = state.collections[0].id;
  const next = state.profiles.find((entry) => entry.collectionId === state.activeProfileId);
  state.activeBasisId = next?.id || "";
  state.activeScopeId = next?.scopes?.[0]?.id || "";
  renderAll();
});

ui.resetProfilesButton.addEventListener("click", () => {
  if (!window.confirm("Alle lokal geänderten Profile durch die Ausgangsprofile aus der ODS-Datei ersetzen?")) return;
  state.collections = [{ id: "de-de-mv", name: "Mecklenburg-Vorpommern", countryCode: "DE", subdivisionCode: "DE-MV" }];
  state.profiles = createDefaultProfiles().map(normalizeProfile).map((basis) => assignBasisToCollection(basis, "de-de-mv"));
  state.activeProfileId = "de-de-mv";
  state.activeBasisId = "gym-sek1-test";
  state.activeScopeId = state.profiles.find((profile) => profile.id === state.activeBasisId)?.scopes?.[0]?.id || "";
  state.bridgeProfileId = "gym-sek1-test";
  state.bridgeScopeId = state.activeScopeId;
  state.schoolType = "Gymnasium";
  state.classLevel = "7";
  renderAll();
});

renderAll();
