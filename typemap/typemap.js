const LOCAL_DB_NAME = "typemap-local-db";
const LOCAL_DB_VERSION = 1;
const LOCAL_DB_STORE = "appState";
const LOCAL_DB_KEY = "primary";
const PROJECT_FILE_VERSION = 1;

const ui = {
  menuButton: document.getElementById("typeMenuButton"),
  menuCloseButton: document.getElementById("typeMenuCloseButton"),
  menuOverlay: document.getElementById("typeMenuOverlay"),
  sideMenu: document.getElementById("typeSideMenu"),
  appFrame: document.querySelector(".app-frame"),
  openWorkspaceStrip: document.getElementById("openWorkspaceStrip"),
  returnPreviewStrip: document.getElementById("returnPreviewStrip"),
  newProjectButton: document.getElementById("newProjectButton"),
  exportProjectButton: document.getElementById("exportProjectButton"),
  importProjectButton: document.getElementById("importProjectButton"),
  createProjectButton: document.getElementById("createProjectButton"),
  openImportButton: document.getElementById("openImportButton"),
  projectFileInput: document.getElementById("projectFileInput"),
  projectList: document.getElementById("projectList"),
  projectInfo: document.getElementById("projectInfo"),
  editorTitle: document.getElementById("editorTitle"),
  projectTitleInput: document.getElementById("projectTitleInput"),
  textTypeSelect: document.getElementById("textTypeSelect"),
  textInput: document.getElementById("textInput"),
  fontFamilySelect: document.getElementById("fontFamilySelect"),
  fontSizeInput: document.getElementById("fontSizeInput"),
  lineHeightInput: document.getElementById("lineHeightInput"),
  measureInput: document.getElementById("measureInput"),
  textAlignSelect: document.getElementById("textAlignSelect"),
  hyphenationSelect: document.getElementById("hyphenationSelect"),
  languageSelect: document.getElementById("languageSelect"),
  lineNumbersInput: document.getElementById("lineNumbersInput"),
  previewPage: document.querySelector(".preview-page"),
  previewText: document.getElementById("previewText"),
  sidePreviewPage: document.querySelector(".side-preview-page"),
  sidePreviewText: document.getElementById("sidePreviewText"),
};

const defaultProjectText = [
  "TypeMap ist eine Werkbank für gesetzten Text.",
  "",
  "Der Text bleibt als strukturierte Quelle erhalten. Die Vorschau oben zeigt das gerenderte Ergebnis, ohne den Inhalt in ein Bild zu verwandeln.",
].join("\n");

const state = {
  projects: [],
  activeProjectId: null,
  autosaveTimer: null,
  sourceModel: null,
  layoutModel: null,
  activeWorkspaceSection: "preview",
  activeProjectEditorTab: "browser",
};

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`;
}

function createDefaultProject(title = "Neue TypeMap") {
  return {
    id: createId("typemap-project"),
    title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    source: {
      rawText: defaultProjectText,
      textType: "prose",
    },
    style: {
      fontFamily: "Arial, Helvetica, sans-serif",
      fontSize: 34,
      lineHeight: 1.38,
      measure: 64,
      textAlign: "left",
      hyphenation: "manual",
      language: "de",
      lineNumbers: false,
    },
  };
}

function getActiveProject() {
  return state.projects.find((project) => project.id === state.activeProjectId) || null;
}

function normalizeProject(project) {
  const fallback = createDefaultProject();
  const normalized = {
    ...fallback,
    ...project,
    source: {
      ...fallback.source,
      ...(project?.source || {}),
    },
    style: {
      ...fallback.style,
      ...(project?.style || {}),
    },
  };
  normalized.id = String(normalized.id || createId("typemap-project"));
  normalized.title = String(normalized.title || "Unbenannte TypeMap");
  normalized.source.rawText = String(normalized.source.rawText || "");
  normalized.source.textType = ["prose", "lyric", "drama", "note"].includes(normalized.source.textType)
    ? normalized.source.textType
    : "prose";
  normalized.style.fontSize = Number(normalized.style.fontSize) || fallback.style.fontSize;
  normalized.style.lineHeight = Number(normalized.style.lineHeight) || fallback.style.lineHeight;
  normalized.style.measure = Number(normalized.style.measure) || fallback.style.measure;
  normalized.style.hyphenation = ["manual", "auto", "none"].includes(normalized.style.hyphenation)
    ? normalized.style.hyphenation
    : fallback.style.hyphenation;
  normalized.style.language = ["de", "en", "fr", "la"].includes(normalized.style.language)
    ? normalized.style.language
    : fallback.style.language;
  normalized.style.lineNumbers = normalized.style.lineNumbers === true;
  return normalized;
}

function buildSourceModel(project) {
  const rawText = String(project?.source?.rawText || "");
  const paragraphs = [];
  const sourceLines = [];
  const rawLines = rawText.split(/\r\n|\r|\n/);
  let cursor = 0;
  let paragraphLines = [];
  let paragraphStart = 0;

  function flushParagraph(endOffset) {
    if (!paragraphLines.length) return;
    const text = paragraphLines.map((line) => line.text).join("\n");
    const id = `paragraph-${paragraphs.length + 1}`;
    paragraphs.push({
      id,
      type: "paragraph",
      text,
      startOffset: paragraphStart,
      endOffset,
      lineIds: paragraphLines.map((line) => line.id),
    });
    paragraphLines = [];
  }

  rawLines.forEach((text, index) => {
    const startOffset = cursor;
    const endOffset = startOffset + text.length;
    const line = {
      id: `line-${index + 1}`,
      index,
      text,
      startOffset,
      endOffset,
    };
    sourceLines.push(line);

    if (text.trim()) {
      if (!paragraphLines.length) paragraphStart = startOffset;
      paragraphLines.push(line);
    } else {
      flushParagraph(endOffset);
    }

    cursor = endOffset + 1;
  });
  flushParagraph(rawText.length);

  return {
    version: 1,
    rawText,
    originalLines: sourceLines,
    semanticRanges: paragraphs.map((paragraph) => ({
      id: paragraph.id,
      type: paragraph.type,
      startOffset: paragraph.startOffset,
      endOffset: paragraph.endOffset,
    })),
    paragraphs,
  };
}

function buildBrowserLayoutModel(sourceModel, style) {
  return {
    version: 1,
    engine: "browser-dom",
    status: "browser-owned-layout",
    style: { ...style },
    blocks: sourceModel.paragraphs.map((paragraph, index) => ({
      id: `layout-block-${paragraph.id}`,
      sourceRangeId: paragraph.id,
      sourceStartOffset: paragraph.startOffset,
      sourceEndOffset: paragraph.endOffset,
      blockIndex: index,
      text: paragraph.text,
      visibleLines: [],
    })),
    notes: [
      "The browser currently performs line breaking and glyph shaping.",
      "Layout blocks keep source offsets so a later typesetter can attach visible lines to source ranges.",
    ],
  };
}

function clearElement(element) {
  while (element?.firstChild) element.removeChild(element.firstChild);
}

function appendInlineMarkdown(parent, text) {
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let cursor = 0;
  String(text).replace(pattern, (match, _token, offset) => {
    if (offset > cursor) parent.appendChild(document.createTextNode(text.slice(cursor, offset)));
    let node;
    if (match.startsWith("**")) {
      node = document.createElement("strong");
      node.textContent = match.slice(2, -2);
    } else if (match.startsWith("*")) {
      node = document.createElement("em");
      node.textContent = match.slice(1, -1);
    } else if (match.startsWith("`")) {
      node = document.createElement("code");
      node.textContent = match.slice(1, -1);
    } else {
      const linkMatch = match.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      node = document.createElement("a");
      node.textContent = linkMatch?.[1] || match;
      node.href = linkMatch?.[2] || "#";
      node.rel = "noopener noreferrer";
      node.target = "_blank";
    }
    parent.appendChild(node);
    cursor = offset + match.length;
    return match;
  });
  if (cursor < text.length) parent.appendChild(document.createTextNode(text.slice(cursor)));
}

function createMarkdownBlockElement(block, textType) {
  const text = String(block.text || "");
  const headingMatch = text.match(/^(#{1,3})\s+(.+)$/);
  if (headingMatch && textType !== "lyric") {
    const heading = document.createElement(`h${headingMatch[1].length}`);
    appendInlineMarkdown(heading, headingMatch[2]);
    return heading;
  }

  if (text.startsWith(">") && textType !== "lyric") {
    const quote = document.createElement("blockquote");
    appendInlineMarkdown(quote, text.replace(/^>\s?/gm, ""));
    return quote;
  }

  const unorderedLines = text.split("\n").filter(Boolean);
  if (unorderedLines.length && unorderedLines.every((line) => /^[-*]\s+/.test(line)) && textType !== "lyric") {
    const list = document.createElement("ul");
    unorderedLines.forEach((line) => {
      const item = document.createElement("li");
      appendInlineMarkdown(item, line.replace(/^[-*]\s+/, ""));
      list.appendChild(item);
    });
    return list;
  }

  if (unorderedLines.length && unorderedLines.every((line) => /^\d+\.\s+/.test(line)) && textType !== "lyric") {
    const list = document.createElement("ol");
    unorderedLines.forEach((line) => {
      const item = document.createElement("li");
      appendInlineMarkdown(item, line.replace(/^\d+\.\s+/, ""));
      list.appendChild(item);
    });
    return list;
  }

  if (text.startsWith("```") && text.endsWith("```")) {
    const pre = document.createElement("pre");
    const code = document.createElement("code");
    code.textContent = text.replace(/^```\w*\n?/, "").replace(/\n?```$/, "");
    pre.appendChild(code);
    return pre;
  }

  const paragraph = document.createElement("p");
  appendInlineMarkdown(paragraph, text);
  return paragraph;
}

function renderTextView(targetPage, targetText, project, layoutModel) {
  if (!targetPage || !targetText) return;
  const style = project.style;
  targetPage.style.setProperty("--preview-line-height", String(style.lineHeight));
  targetPage.style.setProperty("--preview-measure", `${style.measure}ch`);
  targetText.style.fontFamily = style.fontFamily;
  targetText.style.textAlign = style.textAlign;
  targetText.lang = style.language;
  targetText.style.hyphens = style.hyphenation;
  targetText.classList.toggle("has-line-numbers", style.lineNumbers === true);
  targetText.classList.remove("is-text-type-prose", "is-text-type-lyric", "is-text-type-drama", "is-text-type-note");
  targetText.classList.add(`is-text-type-${project.source.textType || "prose"}`);
  clearElement(targetText);

  if (!layoutModel.blocks.length) {
    const empty = document.createElement("p");
    empty.className = "preview-empty";
    empty.textContent = "Beginne unten mit deinem Text.";
    targetText.appendChild(empty);
    return;
  }

  layoutModel.blocks.forEach((block) => {
    const element = createMarkdownBlockElement(block, project.source.textType || "prose");
    element.dataset.layoutBlockId = block.id;
    element.dataset.sourceRangeId = block.sourceRangeId;
    element.dataset.sourceStart = String(block.sourceStartOffset);
    element.dataset.sourceEnd = String(block.sourceEndOffset);
    targetText.appendChild(element);
  });
}

function renderViewLayer(project, sourceModel, layoutModel) {
  if (ui.previewPage) {
    ui.previewPage.style.setProperty("--preview-font-size", `${project.style.fontSize}px`);
  }
  renderTextView(ui.previewPage, ui.previewText, project, layoutModel);

  if (ui.sidePreviewPage) {
    const compactFontSize = Math.max(14, Math.round(project.style.fontSize * 0.52));
    ui.sidePreviewPage.style.setProperty("--preview-font-size", `${compactFontSize}px`);
  }
  renderTextView(ui.sidePreviewPage, ui.sidePreviewText, project, layoutModel);
}

function rebuildModelsAndPreview() {
  const project = getActiveProject();
  if (!project) return;
  state.sourceModel = buildSourceModel(project);
  state.layoutModel = buildBrowserLayoutModel(state.sourceModel, project.style);
  renderViewLayer(project, state.sourceModel, state.layoutModel);
}

function renderProjectList() {
  if (!ui.projectList) return;
  clearElement(ui.projectList);
  state.projects.forEach((project) => {
    const row = document.createElement("div");
    row.className = `project-row${project.id === state.activeProjectId ? " is-active" : ""}`;
    row.tabIndex = 0;
    row.setAttribute("role", "button");

    const copy = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = project.title;
    const meta = document.createElement("span");
    meta.textContent = `${project.source.rawText.length} Zeichen`;
    copy.append(title, meta);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.setAttribute("aria-label", `${project.title} löschen`);
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteProject(project.id);
    });

    row.addEventListener("click", () => {
      activateProject(project.id);
    });
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateProject(project.id);
      }
    });

    row.append(copy, deleteButton);
    ui.projectList.appendChild(row);
  });
}

function renderEditor() {
  const project = getActiveProject();
  if (!project) return;
  if (ui.projectInfo) ui.projectInfo.textContent = `${state.projects.length} Projekt${state.projects.length === 1 ? "" : "e"}`;
  if (ui.editorTitle) ui.editorTitle.textContent = project.title;
  if (ui.projectTitleInput) ui.projectTitleInput.value = project.title;
  if (ui.textTypeSelect) ui.textTypeSelect.value = project.source.textType;
  if (ui.textInput) ui.textInput.value = project.source.rawText;
  if (ui.fontFamilySelect) ui.fontFamilySelect.value = project.style.fontFamily;
  if (ui.fontSizeInput) ui.fontSizeInput.value = String(project.style.fontSize);
  if (ui.lineHeightInput) ui.lineHeightInput.value = String(project.style.lineHeight);
  if (ui.measureInput) ui.measureInput.value = String(project.style.measure);
  if (ui.textAlignSelect) ui.textAlignSelect.value = project.style.textAlign;
  if (ui.hyphenationSelect) ui.hyphenationSelect.value = project.style.hyphenation;
  if (ui.languageSelect) ui.languageSelect.value = project.style.language;
  if (ui.lineNumbersInput) ui.lineNumbersInput.checked = project.style.lineNumbers === true;
}

function renderApp() {
  renderProjectList();
  renderEditor();
  rebuildModelsAndPreview();
}

function markProjectChanged(project) {
  if (!project) return;
  project.updatedAt = new Date().toISOString();
  scheduleAutosave();
}

function activateProject(projectId) {
  state.activeProjectId = projectId;
  renderApp();
  scheduleAutosave();
}

function addProject(title = "Neue TypeMap") {
  const project = createDefaultProject(title);
  state.projects.push(project);
  state.activeProjectId = project.id;
  renderApp();
  scheduleAutosave();
}

function deleteProject(projectId) {
  if (state.projects.length <= 1) {
    state.projects = [createDefaultProject("Neue TypeMap")];
    state.activeProjectId = state.projects[0].id;
  } else {
    state.projects = state.projects.filter((project) => project.id !== projectId);
    if (state.activeProjectId === projectId) {
      state.activeProjectId = state.projects[0]?.id || null;
    }
  }
  renderApp();
  scheduleAutosave();
}

function updateActiveProject(mutator) {
  const project = getActiveProject();
  if (!project) return;
  mutator(project);
  markProjectChanged(project);
  renderProjectList();
  rebuildModelsAndPreview();
}

function buildSnapshot() {
  return {
    type: "typemap-project-export",
    version: PROJECT_FILE_VERSION,
    exportedAt: new Date().toISOString(),
    state: {
      activeProjectId: state.activeProjectId,
      projects: state.projects,
    },
  };
}

function applySnapshot(snapshot) {
  const rawProjects = Array.isArray(snapshot?.state?.projects)
    ? snapshot.state.projects
    : Array.isArray(snapshot?.projects)
      ? snapshot.projects
      : [];
  state.projects = rawProjects.map(normalizeProject);
  if (!state.projects.length) state.projects = [createDefaultProject("Neue TypeMap")];
  state.activeProjectId = state.projects.some((project) => project.id === snapshot?.state?.activeProjectId)
    ? snapshot.state.activeProjectId
    : state.projects[0].id;
  renderApp();
  scheduleAutosave();
}

function exportProjects() {
  const blob = new Blob([JSON.stringify(buildSnapshot(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "typemap-project.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function importProjectFile(file) {
  const text = await file.text();
  const payload = JSON.parse(text);
  if (!payload || (payload.type && payload.type !== "typemap-project-export")) {
    throw new Error("invalid-typemap-import");
  }
  applySnapshot(payload);
}

function openLocalDb() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("indexeddb-unavailable"));
      return;
    }
    const request = indexedDB.open(LOCAL_DB_NAME, LOCAL_DB_VERSION);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(LOCAL_DB_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function withStore(mode, callback) {
  const db = await openLocalDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(LOCAL_DB_STORE, mode);
    const store = tx.objectStore(LOCAL_DB_STORE);
    const request = callback(store);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    tx.oncomplete = () => db.close();
    tx.onerror = () => {
      db.close();
      reject(tx.error);
    };
  });
}

async function saveLocalSnapshot() {
  try {
    await withStore("readwrite", (store) => store.put(buildSnapshot(), LOCAL_DB_KEY));
  } catch (error) {
    console.warn("TypeMap local save failed", error);
  }
}

async function loadLocalSnapshot() {
  try {
    return await withStore("readonly", (store) => store.get(LOCAL_DB_KEY));
  } catch (error) {
    console.warn("TypeMap local load failed", error);
    return null;
  }
}

function scheduleAutosave() {
  if (state.autosaveTimer) window.clearTimeout(state.autosaveTimer);
  state.autosaveTimer = window.setTimeout(() => {
    state.autosaveTimer = null;
    saveLocalSnapshot();
  }, 500);
}

function setMenuOpen(isOpen) {
  ui.sideMenu?.classList.toggle("is-open", isOpen);
  if (ui.menuOverlay) ui.menuOverlay.hidden = !isOpen;
  ui.sideMenu?.setAttribute("aria-hidden", isOpen ? "false" : "true");
  if (ui.sideMenu) ui.sideMenu.inert = !isOpen;
  ui.menuButton?.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function setWorkspaceSection(section) {
  const activeSection = section === "details" ? "details" : "preview";
  state.activeWorkspaceSection = activeSection;
  ui.appFrame?.classList.toggle("workspace-mode-details", activeSection === "details");
  ui.appFrame?.classList.toggle("workspace-mode-preview", activeSection !== "details");
}

function setProjectEditorTab(tab) {
  const activeTab = tab === "preview" ? "preview" : "browser";
  state.activeProjectEditorTab = activeTab;
  document.querySelectorAll("[data-type-tab]").forEach((button) => {
    const isActive = button.dataset.typeTab === activeTab;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });
  document.querySelectorAll("[data-type-tab-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.typeTabPanel !== activeTab;
  });
}

function handleWorkspaceToggle(event, section) {
  event?.preventDefault?.();
  setWorkspaceSection(section);
}

function bindMenu() {
  ui.menuButton?.addEventListener("click", () => {
    setMenuOpen(ui.menuButton.getAttribute("aria-expanded") !== "true");
  });
  ui.menuCloseButton?.addEventListener("click", () => setMenuOpen(false));
  ui.menuOverlay?.addEventListener("click", () => setMenuOpen(false));
  document.querySelectorAll("[data-menu-panel]").forEach((button) => {
    button.addEventListener("click", () => {
      const panelId = button.dataset.menuPanel;
      const panel = document.querySelector(`[data-menu-popup="${panelId}"]`);
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      button.classList.toggle("is-active", !isExpanded);
      button.setAttribute("aria-expanded", isExpanded ? "false" : "true");
      if (panel) panel.hidden = isExpanded;
    });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });
}

function bindEditor() {
  document.querySelectorAll("[data-type-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      setProjectEditorTab(button.dataset.typeTab);
    });
  });
  ui.openWorkspaceStrip?.addEventListener("click", (event) => handleWorkspaceToggle(event, "details"));
  ui.openWorkspaceStrip?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") handleWorkspaceToggle(event, "details");
  });
  ui.returnPreviewStrip?.addEventListener("click", (event) => handleWorkspaceToggle(event, "preview"));
  ui.returnPreviewStrip?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") handleWorkspaceToggle(event, "preview");
  });
  ui.newProjectButton?.addEventListener("click", () => addProject("Neue TypeMap"));
  ui.createProjectButton?.addEventListener("click", () => addProject("Neue TypeMap"));
  ui.exportProjectButton?.addEventListener("click", exportProjects);
  ui.importProjectButton?.addEventListener("click", () => ui.projectFileInput?.click());
  ui.openImportButton?.addEventListener("click", () => ui.projectFileInput?.click());
  ui.projectFileInput?.addEventListener("change", async () => {
    const file = ui.projectFileInput.files?.[0];
    ui.projectFileInput.value = "";
    if (!file) return;
    try {
      await importProjectFile(file);
    } catch (error) {
      window.alert("Import fehlgeschlagen. Bitte eine gültige TypeMap-JSON wählen.");
    }
  });

  ui.projectTitleInput?.addEventListener("input", () => {
    updateActiveProject((project) => {
      project.title = ui.projectTitleInput.value.trim() || "Unbenannte TypeMap";
    });
    if (ui.editorTitle) ui.editorTitle.textContent = getActiveProject()?.title || "Text setzen";
  });
  ui.textInput?.addEventListener("input", () => {
    updateActiveProject((project) => {
      project.source.rawText = ui.textInput.value;
    });
  });
  ui.textTypeSelect?.addEventListener("change", () => {
    updateActiveProject((project) => {
      project.source.textType = ui.textTypeSelect.value;
    });
  });
  ui.fontFamilySelect?.addEventListener("change", () => {
    updateActiveProject((project) => {
      project.style.fontFamily = ui.fontFamilySelect.value;
    });
  });
  ui.fontSizeInput?.addEventListener("input", () => {
    updateActiveProject((project) => {
      project.style.fontSize = Number(ui.fontSizeInput.value);
    });
  });
  ui.lineHeightInput?.addEventListener("input", () => {
    updateActiveProject((project) => {
      project.style.lineHeight = Number(ui.lineHeightInput.value);
    });
  });
  ui.measureInput?.addEventListener("input", () => {
    updateActiveProject((project) => {
      project.style.measure = Number(ui.measureInput.value);
    });
  });
  ui.textAlignSelect?.addEventListener("change", () => {
    updateActiveProject((project) => {
      project.style.textAlign = ui.textAlignSelect.value;
    });
  });
  ui.hyphenationSelect?.addEventListener("change", () => {
    updateActiveProject((project) => {
      project.style.hyphenation = ui.hyphenationSelect.value;
    });
  });
  ui.languageSelect?.addEventListener("change", () => {
    updateActiveProject((project) => {
      project.style.language = ui.languageSelect.value;
    });
  });
  ui.lineNumbersInput?.addEventListener("change", () => {
    updateActiveProject((project) => {
      project.style.lineNumbers = ui.lineNumbersInput.checked;
    });
  });
}

async function init() {
  bindMenu();
  bindEditor();
  const snapshot = await loadLocalSnapshot();
  if (snapshot) {
    applySnapshot(snapshot);
  } else {
    state.projects = [createDefaultProject("Erste TypeMap")];
    state.activeProjectId = state.projects[0].id;
    renderApp();
    scheduleAutosave();
  }
  setWorkspaceSection("preview");
  setProjectEditorTab(state.activeProjectEditorTab);
}

init().catch((error) => {
  console.error("TypeMap konnte nicht initialisiert werden", error);
});
