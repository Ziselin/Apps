const LOCAL_DB_NAME = "typemap-local-db";
const LOCAL_DB_VERSION = 1;
const LOCAL_DB_STORE = "appState";
const LOCAL_DB_KEY = "primary";
const PROJECT_FILE_VERSION = 1;
const THEME_STORAGE_KEY = "typemap-theme";

const ui = {
  menuButton: document.getElementById("typeMenuButton"),
  menuIcon: document.querySelector("#typeMenuButton img"),
  menuCloseButton: document.getElementById("typeMenuCloseButton"),
  menuOverlay: document.getElementById("typeMenuOverlay"),
  sideMenu: document.getElementById("typeSideMenu"),
  appFrame: document.querySelector(".app-frame"),
  openWorkspaceStrip: document.getElementById("openWorkspaceStrip"),
  returnPreviewStrip: document.getElementById("returnPreviewStrip"),
  layoutCycleButton: document.getElementById("layoutCycleButton"),
  layoutCycleButtons: Array.from(document.querySelectorAll("[data-layout-cycle-button]")),
  newProjectButton: document.getElementById("newProjectButton"),
  exportProjectButton: document.getElementById("exportProjectButton"),
  exportMenu: document.getElementById("exportMenu"),
  themeToggleButton: document.getElementById("themeToggleButton"),
  themeToggleIcon: document.getElementById("themeToggleIcon"),
  importProjectButton: document.getElementById("importProjectButton"),
  createProjectButton: document.getElementById("createProjectButton"),
  openImportButton: document.getElementById("openImportButton"),
  projectFileInput: document.getElementById("projectFileInput"),
  projectList: document.getElementById("projectList"),
  projectInfo: document.getElementById("projectInfo"),
  editorTitle: document.getElementById("editorTitle"),
  documentPropertiesButton: document.getElementById("documentPropertiesButton"),
  documentPropertiesOverlay: document.getElementById("documentPropertiesOverlay"),
  documentPropertiesDialog: document.getElementById("documentPropertiesDialog"),
  documentPropertiesCloseButton: document.getElementById("documentPropertiesCloseButton"),
  documentPropertiesCancelButton: document.getElementById("documentPropertiesCancelButton"),
  documentPropertiesSaveButton: document.getElementById("documentPropertiesSaveButton"),
  docTextKindInput: document.getElementById("docTextKindInput"),
  docTitleInput: document.getElementById("docTitleInput"),
  docSubtitleInput: document.getElementById("docSubtitleInput"),
  docAuthorsList: document.getElementById("docAuthorsList"),
  addDocAuthorButton: document.getElementById("addDocAuthorButton"),
  docContributorsList: document.getElementById("docContributorsList"),
  addDocContributorButton: document.getElementById("addDocContributorButton"),
  docCreatedDateInput: document.getElementById("docCreatedDateInput"),
  docModifiedDateInput: document.getElementById("docModifiedDateInput"),
  docRightsHolderInput: document.getElementById("docRightsHolderInput"),
  docCopyrightYearInput: document.getElementById("docCopyrightYearInput"),
  docLicenseInput: document.getElementById("docLicenseInput"),
  docAllowUseInput: document.getElementById("docAllowUseInput"),
  docAllowEditInput: document.getElementById("docAllowEditInput"),
  docAllowShareInput: document.getElementById("docAllowShareInput"),
  docAttributionInput: document.getElementById("docAttributionInput"),
  docStatusInput: document.getElementById("docStatusInput"),
  docVersionInput: document.getElementById("docVersionInput"),
  docPublishedDateInput: document.getElementById("docPublishedDateInput"),
  docLanguageMetaInput: document.getElementById("docLanguageMetaInput"),
  docTagsInput: document.getElementById("docTagsInput"),
  docDescriptionInput: document.getElementById("docDescriptionInput"),
  fontSettingsButton: document.getElementById("fontSettingsButton"),
  fontSettingsDialogOverlay: document.getElementById("fontSettingsDialogOverlay"),
  fontSettingsDialog: document.getElementById("fontSettingsDialog"),
  fontSettingsDialogCloseButton: document.getElementById("fontSettingsDialogCloseButton"),
  fontSettingsDialogCloseActionButton: document.getElementById("fontSettingsDialogCloseActionButton"),
  textFormatSettingsButton: document.getElementById("textFormatSettingsButton"),
  textFormatDialogOverlay: document.getElementById("textFormatDialogOverlay"),
  textFormatDialog: document.getElementById("textFormatDialog"),
  textFormatDialogCloseButton: document.getElementById("textFormatDialogCloseButton"),
  textFormatDialogCloseActionButton: document.getElementById("textFormatDialogCloseActionButton"),
  addFontButton: document.getElementById("addFontButton"),
  fontDialogOverlay: document.getElementById("fontDialogOverlay"),
  fontDialog: document.getElementById("fontDialog"),
  fontDialogCloseButton: document.getElementById("fontDialogCloseButton"),
  fontDialogCancelButton: document.getElementById("fontDialogCancelButton"),
  fontDialogAddButton: document.getElementById("fontDialogAddButton"),
  fontFamilySearchInput: document.getElementById("fontFamilySearchInput"),
  fontPreviewSample: document.getElementById("fontPreviewSample"),
  textInput: document.getElementById("textInput"),
  fontFamilySelect: document.getElementById("fontFamilySelect"),
  fontLigaturesInput: document.getElementById("fontLigaturesInput"),
  fontSizeInput: document.getElementById("fontSizeInput"),
  lineHeightInput: document.getElementById("lineHeightInput"),
  measureInput: document.getElementById("measureInput"),
  textAlignSelect: document.getElementById("textAlignSelect"),
  hyphenationSettingsButton: document.getElementById("hyphenationSettingsButton"),
  hyphenationDialogOverlay: document.getElementById("hyphenationDialogOverlay"),
  hyphenationDialog: document.getElementById("hyphenationDialog"),
  hyphenationDialogCloseButton: document.getElementById("hyphenationDialogCloseButton"),
  hyphenationDialogCancelButton: document.getElementById("hyphenationDialogCancelButton"),
  hyphenationDialogSaveButton: document.getElementById("hyphenationDialogSaveButton"),
  hyphenationModeInput: document.getElementById("hyphenationModeInput"),
  hyphenationLanguageInput: document.getElementById("hyphenationLanguageInput"),
  hyphenationConsecutiveInput: document.getElementById("hyphenationConsecutiveInput"),
  hyphenationMinWordLengthInput: document.getElementById("hyphenationMinWordLengthInput"),
  hyphenationBeforeInput: document.getElementById("hyphenationBeforeInput"),
  hyphenationAfterInput: document.getElementById("hyphenationAfterInput"),
  languageSelect: document.getElementById("languageSelect"),
  lineNumberSettingsButton: document.getElementById("lineNumberSettingsButton"),
  lineNumberDialogOverlay: document.getElementById("lineNumberDialogOverlay"),
  lineNumberDialog: document.getElementById("lineNumberDialog"),
  lineNumberDialogCloseButton: document.getElementById("lineNumberDialogCloseButton"),
  lineNumberDialogCancelButton: document.getElementById("lineNumberDialogCancelButton"),
  lineNumberDialogSaveButton: document.getElementById("lineNumberDialogSaveButton"),
  lineNumberEnabledInput: document.getElementById("lineNumberEnabledInput"),
  lineNumberModeInput: document.getElementById("lineNumberModeInput"),
  lineNumberIncludeBlankInput: document.getElementById("lineNumberIncludeBlankInput"),
  lineNumberIntervalInput: document.getElementById("lineNumberIntervalInput"),
  lineNumberStartInput: document.getElementById("lineNumberStartInput"),
  previewPage: document.querySelector(".preview-page"),
  typeStage: document.querySelector(".type-stage"),
  previewText: document.getElementById("previewText"),
  sidePreviewPage: document.querySelector(".side-preview-page"),
  sidePreviewText: document.getElementById("sidePreviewText"),
  textInputHighlight: document.getElementById("textInputHighlight"),
};

const defaultProjectText = [
  "TypeMap ist eine Werkbank für gesetzten Text.",
  "",
  "Der Text bleibt als strukturierte Quelle erhalten. Die Vorschau oben zeigt das gerenderte Ergebnis, ohne den Inhalt in ein Bild zu verwandeln.",
].join("\n");

const APP_FONTS = [
  { label: "Arial", family: "Arial", css: "Arial, Helvetica, sans-serif", source: "system" },
  { label: "Computer Modern", family: "CMU Serif", css: "'CMU Serif', 'Computer Modern Serif', Georgia, serif", source: "app" },
  { label: "Roboto", family: "Roboto", css: "'Roboto', Arial, Helvetica, sans-serif", source: "app" },
  { label: "EB Garamond", family: "EB Garamond", css: "'EB Garamond', Georgia, serif", source: "app" },
  { label: "Literata", family: "Literata", css: "'Literata', Georgia, serif", source: "app" },
  { label: "Source Serif 4", family: "Source Serif 4", css: "'Source Serif 4', Georgia, serif", source: "app" },
  { label: "Source Sans 3", family: "Source Sans 3", css: "'Source Sans 3', Arial, sans-serif", source: "app" },
  { label: "Source Code Pro", family: "Source Code Pro", css: "'Source Code Pro', 'Courier New', monospace", source: "app" },
  { label: "Georgia", family: "Georgia", css: "Georgia, 'Times New Roman', serif", source: "system" },
  { label: "Times New Roman", family: "Times New Roman", css: "'Times New Roman', Times, serif", source: "system" },
  { label: "Courier New", family: "Courier New", css: "'Courier New', Courier, monospace", source: "system" },
];

const state = {
  projects: [],
  activeProjectId: null,
  autosaveTimer: null,
  sourceModel: null,
  layoutModel: null,
  activeWorkspaceSection: "preview",
  activeProjectEditorTab: "browser",
  activeSourceRange: null,
  expandedProjectIds: [],
  expandedTreeNodeIds: [],
  expandedContentNodeIds: [],
  projectBrowserRenderTimer: 0,
  detailsLayoutMode: "normal",
  detailsLayoutStep: 0,
};

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`;
}

function createDefaultMetadata() {
  return {
    textKind: "essay",
    subtitle: "",
    authors: [""],
    contributors: [""],
    createdDate: "",
    modifiedDate: "",
    rightsHolder: "",
    copyrightYear: "",
    license: "",
    allowUse: false,
    allowEdit: false,
    allowShare: false,
    attribution: "",
    status: "draft",
    version: "0.1",
    publishedDate: "",
    language: "de",
    tags: "",
    description: "",
  };
}

function sourceTextTypeFromDocumentKind(textKind) {
  if (textKind === "gedicht") return "lyric";
  if (textKind === "drama") return "drama";
  if (textKind === "notiz") return "note";
  return "prose";
}

function createDefaultTypography() {
  return {
    projectFonts: [],
  };
}

function createDefaultLineNumbering() {
  return {
    enabled: false,
    mode: "source-lines",
    includeBlankLines: false,
    interval: 1,
    start: 1,
  };
}

function createDefaultHyphenationSettings() {
  return {
    mode: "manual",
    language: "de",
    consecutiveLines: 2,
    minWordLength: 6,
    before: 3,
    after: 3,
  };
}

function clampInteger(value, fallback, min, max) {
  const number = Number.parseInt(value, 10);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
}

function ptToPx(value) {
  return (Number(value) || 12) * (4 / 3);
}

function normalizeLineNumbering(value, legacyEnabled = false) {
  const fallback = createDefaultLineNumbering();
  const source = typeof value === "object" && value ? value : {};
  return {
    enabled: source.enabled === true || legacyEnabled === true,
    mode: ["paragraphs", "source-lines"].includes(source.mode) ? source.mode : fallback.mode,
    includeBlankLines: source.includeBlankLines === true,
    interval: clampInteger(source.interval, fallback.interval, 1, 100),
    start: clampInteger(source.start, fallback.start, 0, 99999),
  };
}

function normalizeHyphenationSettings(value, legacyMode = "manual", legacyLanguage = "de") {
  const fallback = createDefaultHyphenationSettings();
  const source = typeof value === "object" && value ? value : {};
  const mode = ["manual", "auto", "none"].includes(source.mode)
    ? source.mode
    : ["manual", "auto", "none"].includes(legacyMode)
      ? legacyMode
      : fallback.mode;
  const language = ["de", "en", "fr", "la"].includes(source.language)
    ? source.language
    : ["de", "en", "fr", "la"].includes(legacyLanguage)
      ? legacyLanguage
      : fallback.language;
  return {
    mode,
    language,
    consecutiveLines: clampInteger(source.consecutiveLines, fallback.consecutiveLines, 0, 12),
    minWordLength: clampInteger(source.minWordLength, fallback.minWordLength, 4, 24),
    before: clampInteger(source.before, fallback.before, 2, 12),
    after: clampInteger(source.after, fallback.after, 2, 12),
  };
}

function normalizePersonList(value) {
  const list = Array.isArray(value) ? value : typeof value === "string" ? [value] : [""];
  const normalized = list.map((entry) => String(entry || "").trim()).filter(Boolean);
  return normalized.length ? normalized : [""];
}

function normalizeFontFamilyName(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim();
}

function createGoogleFontCssValue(family) {
  const normalizedFamily = normalizeFontFamilyName(family);
  return normalizedFamily ? `'${normalizedFamily.replace(/'/g, "\\'")}', Arial, sans-serif` : APP_FONTS[0].css;
}

function normalizeProjectFonts(value) {
  if (!Array.isArray(value)) return [];
  const seen = new Set();
  return value
    .map((font) => {
      const family = normalizeFontFamilyName(font?.family || font?.label || font);
      if (!family) return null;
      const key = family.toLowerCase();
      if (seen.has(key)) return null;
      seen.add(key);
      return {
        family,
        label: String(font?.label || family),
        css: String(font?.css || createGoogleFontCssValue(family)),
        source: font?.source === "local" ? "local" : "google",
        variants: Array.isArray(font?.variants) && font.variants.length ? font.variants.map(String) : ["400", "700"],
      };
    })
    .filter(Boolean);
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
      fontFamily: "'EB Garamond', Georgia, serif",
      fontSize: 12,
      lineHeight: 1.38,
      measure: 64,
      textAlign: "left",
      ligatures: true,
      hyphenation: "manual",
      language: "de",
      lineNumbers: false,
      lineNumbering: createDefaultLineNumbering(),
      hyphenationSettings: createDefaultHyphenationSettings(),
    },
    metadata: createDefaultMetadata(),
    typography: createDefaultTypography(),
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
    metadata: {
      ...fallback.metadata,
      ...(project?.metadata || {}),
    },
    typography: {
      ...fallback.typography,
      ...(project?.typography || {}),
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
  normalized.style.ligatures = normalized.style.ligatures !== false;
  normalized.style.hyphenation = ["manual", "auto", "none"].includes(normalized.style.hyphenation)
    ? normalized.style.hyphenation
    : fallback.style.hyphenation;
  normalized.style.language = ["de", "en", "fr", "la"].includes(normalized.style.language)
    ? normalized.style.language
    : fallback.style.language;
  normalized.style.lineNumbers = normalized.style.lineNumbers === true;
  normalized.style.lineNumbering = normalizeLineNumbering(normalized.style.lineNumbering, normalized.style.lineNumbers);
  normalized.style.hyphenationSettings = normalizeHyphenationSettings(
    normalized.style.hyphenationSettings,
    normalized.style.hyphenation,
    normalized.style.language,
  );
  normalized.style.hyphenation = normalized.style.hyphenationSettings.mode;
  normalized.style.language = normalized.style.hyphenationSettings.language;
  normalized.metadata.textKind = [
    "artikel",
    "essay",
    "buchkapitel",
    "gedicht",
    "drama",
    "brief",
    "wissenschaftlicher-text",
    "vertrag",
    "notiz",
  ].includes(normalized.metadata.textKind)
    ? normalized.metadata.textKind
    : fallback.metadata.textKind;
  normalized.metadata.authors = normalizePersonList(normalized.metadata.authors);
  normalized.metadata.contributors = normalizePersonList(normalized.metadata.contributors);
  normalized.metadata.allowUse = normalized.metadata.allowUse === true;
  normalized.metadata.allowEdit = normalized.metadata.allowEdit === true;
  normalized.metadata.allowShare = normalized.metadata.allowShare === true;
  normalized.metadata.status = ["draft", "working", "final", "published"].includes(normalized.metadata.status)
    ? normalized.metadata.status
    : fallback.metadata.status;
  normalized.metadata.language = String(normalized.metadata.language || fallback.metadata.language);
  normalized.typography.projectFonts = normalizeProjectFonts(normalized.typography.projectFonts);
  const knownFontValues = new Set([...APP_FONTS.map((font) => font.css), ...normalized.typography.projectFonts.map((font) => font.css)]);
  if (!knownFontValues.has(normalized.style.fontFamily)) {
    const matchingProjectFont = normalized.typography.projectFonts.find((font) => font.family === normalized.style.fontFamily);
    normalized.style.fontFamily = matchingProjectFont?.css || fallback.style.fontFamily;
  }
  return normalized;
}

function isTreeNodeExpanded(nodeId) {
  return state.expandedTreeNodeIds.includes(nodeId);
}

function setTreeNodeExpanded(nodeId, isExpanded) {
  if (!nodeId) return;
  const set = new Set(state.expandedTreeNodeIds);
  if (isExpanded) {
    set.add(nodeId);
  } else {
    set.delete(nodeId);
  }
  state.expandedTreeNodeIds = Array.from(set);
}

function isContentNodeExpanded(nodeId) {
  return state.expandedContentNodeIds.includes(nodeId);
}

function setContentNodeExpanded(nodeId, isExpanded) {
  if (!nodeId) return;
  const set = new Set(state.expandedContentNodeIds);
  if (isExpanded) {
    set.add(nodeId);
  } else {
    set.delete(nodeId);
  }
  state.expandedContentNodeIds = Array.from(set);
}

function isProjectExpanded(projectId) {
  return state.expandedProjectIds.includes(projectId);
}

function setProjectExpanded(projectId, isExpanded) {
  if (!projectId) return;
  if (isExpanded) {
    state.expandedProjectIds = [projectId];
  } else {
    const set = new Set(state.expandedProjectIds);
    set.delete(projectId);
    state.expandedProjectIds = Array.from(set);
  }
}

function getMarkdownBlockType(text) {
  const value = String(text || "");
  if (/^#{1,6}\s+/.test(value)) return "heading";
  if (/^\|.+\|\s*(\n\|?\s*:?-{3,}:?\s*\|.*)?/m.test(value)) return "table";
  if (/^```/.test(value)) return "code";
  if (/^>\s?/m.test(value)) return "quote";
  if (value.split("\n").filter(Boolean).every((line) => /^[-*]\s+/.test(line))) return "list";
  if (value.split("\n").filter(Boolean).every((line) => /^\d+\.\s+/.test(line))) return "list";
  return "paragraph";
}

function createMarkdownBlockNode(block, index) {
  const headingMatch = String(block.text || "").match(/^(#{1,6})\s+(.+)$/);
  const type = headingMatch ? "heading" : getMarkdownBlockType(block.text);
  const title = headingMatch
    ? headingMatch[2].trim()
    : type === "table"
      ? "Tabelle"
      : type === "code"
        ? "Codeblock"
        : type === "quote"
          ? "Zitat"
          : type === "list"
            ? "Liste"
            : "Absatz";
  return {
    id: `block-${index + 1}-${block.startOffset}`,
    type,
    level: headingMatch ? headingMatch[1].length : null,
    title,
    text: block.text,
    startOffset: block.startOffset,
    endOffset: block.endOffset,
    children: [],
  };
}

function buildDocumentTree(blocks, rawText) {
  const documentNode = {
    id: "document-root",
    type: "document",
    title: "Dokument",
    startOffset: 0,
    endOffset: rawText.length,
    children: [],
  };
  const stack = [{ level: 0, node: documentNode }];
  const sectionCounters = [];

  blocks.forEach((block, index) => {
    const node = createMarkdownBlockNode(block, index);
    if (node.type === "heading") {
      while (stack.length > 1 && stack[stack.length - 1].level >= node.level) {
        const closed = stack.pop().node;
        closed.endOffset = node.startOffset;
      }
      sectionCounters.length = node.level;
      sectionCounters[node.level - 1] = (sectionCounters[node.level - 1] || 0) + 1;
      const section = {
        id: `section-${index + 1}-${node.startOffset}`,
        type: "section",
        level: node.level,
        number: sectionCounters.slice(0, node.level).filter(Boolean).join("."),
        title: node.title,
        startOffset: node.startOffset,
        endOffset: rawText.length,
        headingNodeId: node.id,
        children: [],
      };
      stack[stack.length - 1].node.children.push(section);
      stack.push({ level: node.level, node: section });
      return;
    }
    stack[stack.length - 1].node.children.push(node);
  });

  while (stack.length > 1) {
    const closed = stack.pop().node;
    closed.endOffset = rawText.length;
  }
  return documentNode;
}

function collectDocumentSections(node, sections = []) {
  if (!node) return sections;
  if (node.type === "section") {
    sections.push({
      id: node.id,
      title: node.title,
      level: node.level,
      startOffset: node.startOffset,
      endOffset: node.endOffset,
    });
  }
  (node.children || []).forEach((child) => collectDocumentSections(child, sections));
  return sections;
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
  const documentTree = buildDocumentTree(paragraphs, rawText);

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
    documentTree,
    sections: collectDocumentSections(documentTree),
  };
}

function buildBrowserLayoutModel(sourceModel, style, range = null) {
  const rangeStart = Number.isFinite(range?.startOffset) ? range.startOffset : 0;
  const rangeEnd = Number.isFinite(range?.endOffset) ? range.endOffset : sourceModel.rawText.length;
  const isInRange = (item) => item.endOffset > rangeStart && item.startOffset < rangeEnd;
  const paragraphs = sourceModel.paragraphs.filter(isInRange);
  const originalLines = sourceModel.originalLines.filter(isInRange);
  return {
    version: 1,
    engine: "browser-dom",
    status: "browser-owned-layout",
    style: { ...style },
    activeRange: range ? { ...range } : null,
    blocks: paragraphs.map((paragraph, index) => ({
      id: `layout-block-${paragraph.id}`,
      sourceRangeId: paragraph.id,
      sourceStartOffset: paragraph.startOffset,
      sourceEndOffset: paragraph.endOffset,
      blockIndex: index,
      text: paragraph.text,
      visibleLines: [],
    })),
    sourceLineBlocks: originalLines.map((line) => ({
      id: `layout-source-${line.id}`,
      sourceLineId: line.id,
      sourceStartOffset: line.startOffset,
      sourceEndOffset: line.endOffset,
      blockIndex: line.index,
      text: line.text,
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

function appendTextNode(parent, text) {
  if (text) parent.appendChild(document.createTextNode(text));
}

function appendInlineMarkdown(parent, text) {
  const pattern = /(`[^`\n]+`|==[^=\n]+==|\*\*[^*]+\*\*|__[^_\n]+__|\*[^*\n]+\*|_[^_\n]+_|\[[^\]]+\]\([^)]+\))/g;
  let cursor = 0;
  String(text).replace(pattern, (match, _token, offset) => {
    if (offset > cursor) appendTextNode(parent, text.slice(cursor, offset));
    let node;
    if (match.startsWith("`")) {
      node = document.createElement("code");
      node.textContent = match.slice(1, -1);
    } else if (match.startsWith("==")) {
      node = document.createElement("mark");
      node.textContent = match.slice(2, -2);
    } else if (match.startsWith("**")) {
      node = document.createElement("strong");
      node.textContent = match.slice(2, -2);
    } else if (match.startsWith("__")) {
      node = document.createElement("strong");
      node.textContent = match.slice(2, -2);
    } else if (match.startsWith("*")) {
      node = document.createElement("em");
      node.textContent = match.slice(1, -1);
    } else if (match.startsWith("_")) {
      node = document.createElement("em");
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
  if (cursor < text.length) appendTextNode(parent, text.slice(cursor));
}

function createMarkdownBlockElement(block, textType) {
  const text = String(block.text || "");
  if (textType === "lyric" && !text.trim()) {
    const blankLine = document.createElement("p");
    blankLine.className = "preview-blank-line";
    blankLine.textContent = "\u00a0";
    return blankLine;
  }
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

function getVisualLineRects(element) {
  const range = document.createRange();
  range.selectNodeContents(element);
  const elementRect = element.getBoundingClientRect();
  const rects = Array.from(range.getClientRects())
    .filter((rect) => rect.width > 0 && rect.height > 0)
    .map((rect) => ({
      top: rect.top,
      bottom: rect.bottom,
      height: rect.height,
      left: rect.left,
      right: rect.right,
    }))
    .sort((a, b) => a.top - b.top || a.left - b.left);
  range.detach();

  if (!rects.length && element.textContent?.trim()) {
    return [{
      top: elementRect.top,
      bottom: elementRect.bottom,
      height: elementRect.height,
      left: elementRect.left,
      right: elementRect.right,
    }];
  }

  const grouped = [];
  rects.forEach((rect) => {
    const previous = grouped[grouped.length - 1];
    if (previous && Math.abs(previous.top - rect.top) < 2) {
      previous.left = Math.min(previous.left, rect.left);
      previous.right = Math.max(previous.right, rect.right);
      previous.bottom = Math.max(previous.bottom, rect.bottom);
      previous.height = Math.max(previous.height, rect.height);
      return;
    }
    grouped.push({ ...rect });
  });
  return grouped;
}

function renderLineNumberLayer(targetText, lineNumbering) {
  targetText.querySelector(".preview-line-number-layer")?.remove();
  if (!lineNumbering.enabled) return;

  const layer = document.createElement("div");
  layer.className = "preview-line-number-layer";
  targetText.appendChild(layer);

  const targetRect = targetText.getBoundingClientRect();
  const blocks = Array.from(targetText.querySelectorAll(".preview-body-block"));
  let lineIndex = 0;

  blocks.forEach((block) => {
    if (lineNumbering.mode === "source-lines" && block.dataset.sourceBlankLine === "true" && !lineNumbering.includeBlankLines) {
      return;
    }
    const visualRects = lineNumbering.mode === "source-lines"
      ? getVisualLineRects(block)
      : [block.getBoundingClientRect()].filter((rect) => rect.width > 0 && rect.height > 0);

    visualRects.forEach((rect) => {
      lineIndex += 1;
      const lineNumber = lineNumbering.start + lineIndex - 1;
      if (lineNumbering.interval > 1 && lineNumber % lineNumbering.interval !== 0) return;
      const label = document.createElement("span");
      label.className = "preview-line-number";
      label.textContent = String(lineNumber);
      label.style.top = `${rect.bottom - targetRect.top}px`;
      layer.appendChild(label);
    });
  });
}

function scheduleLineNumberLayer(targetText, lineNumbering) {
  targetText.querySelector(".preview-line-number-layer")?.remove();
  if (!lineNumbering.enabled) return;
  window.requestAnimationFrame(() => {
    renderLineNumberLayer(targetText, lineNumbering);
  });
}

function createPreviewDocumentHead(project) {
  const metadata = project.metadata || {};
  const title = String(project.title || "").trim();
  const subtitle = String(metadata.subtitle || "").trim();
  const authors = normalizePersonList(metadata.authors).filter(Boolean);
  if (!title && !subtitle && !authors.length) return null;

  const head = document.createElement("header");
  head.className = "preview-document-head";
  if (title) {
    const titleElement = document.createElement("h1");
    titleElement.className = "preview-document-title";
    titleElement.textContent = title;
    head.appendChild(titleElement);
  }
  if (subtitle) {
    const subtitleElement = document.createElement("p");
    subtitleElement.className = "preview-document-subtitle";
    subtitleElement.textContent = subtitle;
    head.appendChild(subtitleElement);
  }
  if (authors.length) {
    const authorElement = document.createElement("p");
    authorElement.className = "preview-document-authors";
    authorElement.textContent = authors.join(", ");
    head.appendChild(authorElement);
  }
  return head;
}

function renderTextView(targetPage, targetText, project, layoutModel) {
  if (!targetPage || !targetText) return;
  const style = project.style;
  const textType = project.source.textType || "prose";
  const lineNumbering = normalizeLineNumbering(style.lineNumbering, style.lineNumbers);
  const hyphenationSettings = normalizeHyphenationSettings(style.hyphenationSettings, style.hyphenation, style.language);
  targetPage.style.setProperty("--preview-line-height", String(textType === "lyric" ? 1.5 : style.lineHeight));
  targetPage.style.setProperty("--preview-measure", `${style.measure}ch`);
  targetText.style.fontFamily = style.fontFamily;
  targetText.style.textAlign = textType === "lyric" ? "left" : style.textAlign;
  targetText.lang = hyphenationSettings.language;
  targetText.style.hyphens = hyphenationSettings.mode;
  targetText.style.setProperty("--hyphenate-limit-lines", String(hyphenationSettings.consecutiveLines));
  targetText.style.setProperty("--hyphenate-limit-chars", `${hyphenationSettings.before} ${hyphenationSettings.after} ${hyphenationSettings.minWordLength}`);
  targetText.style.setProperty("-webkit-hyphenate-limit-lines", String(hyphenationSettings.consecutiveLines));
  targetText.style.setProperty("-webkit-hyphenate-limit-before", String(hyphenationSettings.before));
  targetText.style.setProperty("-webkit-hyphenate-limit-after", String(hyphenationSettings.after));
  targetText.classList.toggle("has-line-numbers", lineNumbering.enabled === true);
  targetText.classList.toggle("has-ligatures", targetText === ui.previewText && style.ligatures !== false);
  targetText.classList.remove("is-text-type-prose", "is-text-type-lyric", "is-text-type-drama", "is-text-type-note");
  targetText.classList.add(`is-text-type-${textType}`);
  clearElement(targetText);

  const isScopedSection = layoutModel.activeRange && layoutModel.activeRange.id !== "document-root";
  if (!isScopedSection) {
    const documentHead = createPreviewDocumentHead(project);
    if (documentHead) targetText.appendChild(documentHead);
  }

  const blocks = lineNumbering.mode === "source-lines" && textType === "lyric"
    ? (layoutModel.sourceLineBlocks || [])
    : layoutModel.blocks;

  if (!blocks.length) {
    const empty = document.createElement("p");
    empty.className = "preview-empty";
    empty.textContent = "Beginne unten mit deinem Text.";
    targetText.appendChild(empty);
    scheduleLineNumberLayer(targetText, lineNumbering);
    return;
  }

  blocks.forEach((block) => {
    const element = createMarkdownBlockElement(block, textType);
    element.classList.add("preview-body-block");
    if (textType === "lyric" && !String(block.text || "").trim()) {
      element.dataset.sourceBlankLine = "true";
    }
    element.dataset.layoutBlockId = block.id;
    if (block.sourceRangeId) element.dataset.sourceRangeId = block.sourceRangeId;
    if (block.sourceLineId) {
      element.dataset.sourceLineId = block.sourceLineId;
      element.classList.add("preview-source-line-block");
    }
    element.dataset.sourceStart = String(block.sourceStartOffset);
    element.dataset.sourceEnd = String(block.sourceEndOffset);
    targetText.appendChild(element);
  });
  scheduleLineNumberLayer(targetText, lineNumbering);
}

function renderViewLayer(project, sourceModel, layoutModel) {
  if (ui.previewPage) {
    ui.previewPage.style.setProperty("--preview-font-size", `${ptToPx(project.style.fontSize)}px`);
  }
  renderTextView(ui.previewPage, ui.previewText, project, layoutModel);

  if (ui.sidePreviewPage) {
    const compactFontSize = Math.max(10, Math.round(ptToPx(project.style.fontSize) * 0.72));
    ui.sidePreviewPage.style.setProperty("--preview-font-size", `${compactFontSize}px`);
  }
  renderTextView(ui.sidePreviewPage, ui.sidePreviewText, project, layoutModel);
}

function rebuildModelsAndPreview() {
  const project = getActiveProject();
  if (!project) return;
  state.sourceModel = buildSourceModel(project);
  const activeRange = getActiveSourceRangeForProject(project, state.sourceModel);
  state.layoutModel = buildBrowserLayoutModel(state.sourceModel, project.style, activeRange);
  renderViewLayer(project, state.sourceModel, state.layoutModel);
}

function buildGoogleFontUrl(family) {
  const encodedFamily = normalizeFontFamilyName(family).replace(/\s+/g, "+");
  return `https://fonts.googleapis.com/css2?family=${encodedFamily}:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap`;
}

function getFontLinkId(family) {
  return `typemap-google-font-${normalizeFontFamilyName(family).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function loadGoogleFont(family) {
  const normalizedFamily = normalizeFontFamilyName(family);
  if (!normalizedFamily || document.getElementById(getFontLinkId(normalizedFamily))) return;
  const link = document.createElement("link");
  link.id = getFontLinkId(normalizedFamily);
  link.rel = "stylesheet";
  link.href = buildGoogleFontUrl(normalizedFamily);
  document.head.appendChild(link);
}

function loadProjectFonts(projects = state.projects) {
  projects.forEach((project) => {
    normalizeProjectFonts(project?.typography?.projectFonts).forEach((font) => {
      if (font.source === "google") loadGoogleFont(font.family);
    });
  });
}

function renderFontOptions(project) {
  if (!ui.fontFamilySelect || !project) return;
  clearElement(ui.fontFamilySelect);

  const appGroup = document.createElement("optgroup");
  appGroup.label = "App-Schriften";
  APP_FONTS.forEach((font) => {
    const option = document.createElement("option");
    option.value = font.css;
    option.textContent = font.label;
    appGroup.appendChild(option);
  });
  ui.fontFamilySelect.appendChild(appGroup);

  const projectFonts = normalizeProjectFonts(project.typography?.projectFonts);
  if (projectFonts.length) {
    const projectGroup = document.createElement("optgroup");
    projectGroup.label = "Projekt-Schriften";
    projectFonts.forEach((font) => {
      const option = document.createElement("option");
      option.value = font.css;
      option.textContent = font.label || font.family;
      projectGroup.appendChild(option);
    });
    ui.fontFamilySelect.appendChild(projectGroup);
  }

  const optionValues = Array.from(ui.fontFamilySelect.options).map((option) => option.value);
  if (!optionValues.includes(project.style.fontFamily)) {
    const fallbackOption = document.createElement("option");
    fallbackOption.value = project.style.fontFamily;
    fallbackOption.textContent = "Aktuelle Schrift";
    ui.fontFamilySelect.appendChild(fallbackOption);
  }
  ui.fontFamilySelect.value = project.style.fontFamily;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderEditorHighlight(rawText) {
  if (!ui.textInputHighlight) return;
  const text = String(rawText || "");
  const pattern = /(```[\s\S]*?```|`[^`\n]+`|^#{1,6}\s+[^\n]+|==[^=\n]+==|\*\*[^*\n]+\*\*|__[^_\n]+__|\*[^*\n]+\*|_[^_\n]+_|\[[^\]\n]+\]\([^)]+\))/gm;
  let cursor = 0;
  let html = "";
  text.replace(pattern, (match, _token, offset) => {
    html += escapeHtml(text.slice(cursor, offset));
    let className = "markdown-editor-emphasis";
    if (match.startsWith("```")) {
      className = "markdown-editor-fence";
    } else if (match.startsWith("`")) {
      className = "markdown-editor-code";
    } else if (match.startsWith("#")) {
      className = "markdown-editor-heading";
    } else if (match.startsWith("==")) {
      className = "markdown-editor-mark";
    } else if (match.startsWith("**") || match.startsWith("__")) {
      className = "markdown-editor-strong";
    } else if (match.startsWith("[")) {
      className = "markdown-editor-link";
    }
    html += `<span class="${className}">${escapeHtml(match)}</span>`;
    cursor = offset + match.length;
    return match;
  });
  html += escapeHtml(text.slice(cursor));
  ui.textInputHighlight.innerHTML = html || " ";
}

function syncEditorHighlightScroll() {
  if (!ui.textInput || !ui.textInputHighlight) return;
  ui.textInputHighlight.style.transform = `translate(${-ui.textInput.scrollLeft}px, ${-ui.textInput.scrollTop}px)`;
}

function ensureSelectOption(select, value, label = "Aktueller Wert") {
  if (!select) return;
  const stringValue = String(value);
  const exists = Array.from(select.options).some((option) => option.value === stringValue);
  if (exists) return;
  const option = document.createElement("option");
  option.value = stringValue;
  option.textContent = `${label}: ${stringValue}`;
  select.appendChild(option);
}

function getActiveSourceRangeForProject(project, sourceModel = null) {
  if (!project || state.activeSourceRange?.projectId !== project.id) return null;
  const model = sourceModel || buildSourceModel(project);
  if (state.activeSourceRange.id === "document-root") {
    return {
      id: "document-root",
      title: "Dokument",
      startOffset: 0,
      endOffset: model.rawText.length,
      type: "document",
    };
  }
  const section = model.sections.find((entry) => entry.id === state.activeSourceRange.id);
  if (!section) return null;
  return {
    ...section,
    type: "section",
  };
}

function getEditorSourceText(project) {
  const sourceModel = buildSourceModel(project);
  const range = getActiveSourceRangeForProject(project, sourceModel);
  if (!range || range.id === "document-root") return project.source.rawText;
  return project.source.rawText.slice(range.startOffset, range.endOffset);
}

function getTreeNodeIcon(type) {
  if (type === "document") return "▣";
  if (type === "heading") return "#";
  if (type === "table") return "▤";
  if (type === "code") return "{}";
  if (type === "quote") return ">";
  if (type === "list") return "•";
  return "¶";
}

function createTreeNodeButton(project, node, depth) {
  const children = Array.isArray(node.children) ? node.children : [];
  const structuralChildren = children.filter((child) => child.type === "section");
  const contentChildren = children.filter((child) => child.type !== "section");
  const hasChildren = structuralChildren.length > 0;
  const isExpanded = isTreeNodeExpanded(node.id);
  const isSelectable = node.type === "document" || node.type === "section";
  const isContentExpanded = isContentNodeExpanded(node.id);
  const isActive = state.activeSourceRange?.projectId === project.id
    && (state.activeSourceRange?.id || "document-root") === node.id;

  const row = document.createElement("div");
  row.className = `document-tree-row${isActive ? " is-active" : ""}${isSelectable ? " is-selectable" : ""}`;
  row.style.setProperty("--tree-depth", String(depth));

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "document-tree-toggle";
  toggle.textContent = hasChildren ? (isExpanded ? "▾" : "▸") : "";
  toggle.setAttribute("aria-label", hasChildren ? `${node.title} ${isExpanded ? "einklappen" : "aufklappen"}` : "");
  toggle.disabled = !hasChildren;
  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!hasChildren) return;
    setTreeNodeExpanded(node.id, !isExpanded);
    renderProjectList();
  });

  const button = document.createElement("button");
  button.type = "button";
  button.className = "document-tree-label";
  button.disabled = !isSelectable;
  button.addEventListener("click", () => {
    if (!isSelectable) return;
    const nextContentState = contentChildren.length ? !isContentExpanded : isContentExpanded;
    state.activeProjectId = project.id;
    state.activeSourceRange = {
      projectId: project.id,
      id: node.id,
      startOffset: node.startOffset,
      endOffset: node.endOffset,
      title: node.title,
      type: node.type,
    };
    if (contentChildren.length) setContentNodeExpanded(node.id, nextContentState);
    renderApp();
  });

  const icon = document.createElement("span");
  icon.className = "document-tree-icon";
  icon.textContent = node.type === "section" ? (node.number || "§") : getTreeNodeIcon(node.type);
  const copy = document.createElement("span");
  copy.className = "document-tree-copy";
  const title = document.createElement("span");
  title.className = "document-tree-title";
  title.textContent = node.title || node.type;
  copy.appendChild(title);
  if (node.type !== "document" && node.type !== "section") {
    const meta = document.createElement("span");
    meta.className = "document-tree-meta";
    meta.textContent = node.type === "paragraph"
      ? `Text: "${String(node.text || "").replace(/\s+/g, " ").trim().slice(0, 44)}${String(node.text || "").trim().length > 44 ? "…" : ""}"`
      : node.type;
    copy.appendChild(meta);
  }
  button.append(icon, copy);
  row.append(toggle, button);
  return row;
}

function renderDocumentTreeNode(container, project, node, depth = 0) {
  container.appendChild(createTreeNodeButton(project, node, depth));
  const children = Array.isArray(node.children) ? node.children : [];
  const structuralChildren = children.filter((child) => child.type === "section");
  const contentChildren = children.filter((child) => child.type !== "section");
  const isExpanded = isTreeNodeExpanded(node.id);
  if (isContentNodeExpanded(node.id)) {
    contentChildren.forEach((child) => renderDocumentTreeNode(container, project, child, depth + 1));
  }
  if (!isExpanded) return;
  structuralChildren.forEach((child) => renderDocumentTreeNode(container, project, child, depth + 1));
}

function renderDocumentTree(project) {
  const tree = document.createElement("div");
  tree.className = "document-tree";
  const sourceModel = buildSourceModel(project);
  renderDocumentTreeNode(tree, project, sourceModel.documentTree, 0);
  return tree;
}

function scheduleProjectBrowserRender() {
  window.clearTimeout(state.projectBrowserRenderTimer);
  state.projectBrowserRenderTimer = window.setTimeout(() => {
    renderProjectList();
  }, 260);
}

function renderProjectList() {
  if (!ui.projectList) return;
  clearElement(ui.projectList);
  state.projects.forEach((project) => {
    const item = document.createElement("section");
    item.className = `project-browser-item${project.id === state.activeProjectId ? " is-active" : ""}`;

    const row = document.createElement("div");
    row.className = "project-row";
    row.tabIndex = 0;
    row.setAttribute("role", "button");

    const toggleProjectButton = document.createElement("button");
    toggleProjectButton.type = "button";
    toggleProjectButton.className = "project-tree-toggle";
    const projectExpanded = isProjectExpanded(project.id);
    toggleProjectButton.textContent = projectExpanded ? "▾" : "▸";
    toggleProjectButton.setAttribute("aria-label", `${project.title} ${projectExpanded ? "einklappen" : "aufklappen"}`);
    toggleProjectButton.addEventListener("click", (event) => {
      event.stopPropagation();
      if (projectExpanded) {
        setProjectExpanded(project.id, false);
        if (state.activeProjectId === project.id) {
          renderProjectList();
          scheduleAutosave();
          return;
        }
      } else {
        setProjectExpanded(project.id, true);
      }
      activateProject(project.id, { preserveSourceRange: true, preserveExpandedState: true });
    });

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

    row.append(toggleProjectButton, copy, deleteButton);
    item.appendChild(row);
    if (projectExpanded) {
      item.appendChild(renderDocumentTree(project));
    }
    ui.projectList.appendChild(item);
  });
}

function renderEditor() {
  const project = getActiveProject();
  if (!project) return;
  if (ui.projectInfo) ui.projectInfo.textContent = `${state.projects.length} Projekt${state.projects.length === 1 ? "" : "e"}`;
  if (ui.editorTitle) ui.editorTitle.textContent = project.title;
  loadProjectFonts([project]);
  renderFontOptions(project);
  const editorText = getEditorSourceText(project);
  if (ui.textInput) ui.textInput.value = editorText;
  renderEditorHighlight(editorText);
  syncEditorHighlightScroll();
  if (ui.fontFamilySelect) ui.fontFamilySelect.value = project.style.fontFamily;
  if (ui.fontLigaturesInput) ui.fontLigaturesInput.checked = project.style.ligatures !== false;
  ensureSelectOption(ui.fontSizeInput, project.style.fontSize, "Aktuelle Schriftgröße");
  ensureSelectOption(ui.lineHeightInput, project.style.lineHeight, "Aktuelle Zeilenhöhe");
  ensureSelectOption(ui.measureInput, project.style.measure, "Aktuelle Satzbreite");
  if (ui.fontSizeInput) ui.fontSizeInput.value = String(project.style.fontSize);
  if (ui.lineHeightInput) ui.lineHeightInput.value = String(project.style.lineHeight);
  if (ui.measureInput) ui.measureInput.value = String(project.style.measure);
  if (ui.textAlignSelect) ui.textAlignSelect.value = project.style.textAlign;
  if (ui.languageSelect) ui.languageSelect.value = project.style.language;
}

function setDialogOpen(isOpen) {
  if (ui.documentPropertiesOverlay) ui.documentPropertiesOverlay.hidden = !isOpen;
  if (ui.documentPropertiesDialog) ui.documentPropertiesDialog.hidden = !isOpen;
}

function setFontDialogOpen(isOpen) {
  if (ui.fontDialogOverlay) ui.fontDialogOverlay.hidden = !isOpen;
  if (ui.fontDialog) ui.fontDialog.hidden = !isOpen;
}

function setFontSettingsDialogOpen(isOpen) {
  if (ui.fontSettingsDialogOverlay) ui.fontSettingsDialogOverlay.hidden = !isOpen;
  if (ui.fontSettingsDialog) ui.fontSettingsDialog.hidden = !isOpen;
}

function setTextFormatDialogOpen(isOpen) {
  if (ui.textFormatDialogOverlay) ui.textFormatDialogOverlay.hidden = !isOpen;
  if (ui.textFormatDialog) ui.textFormatDialog.hidden = !isOpen;
}

function setLineNumberDialogOpen(isOpen) {
  if (ui.lineNumberDialogOverlay) ui.lineNumberDialogOverlay.hidden = !isOpen;
  if (ui.lineNumberDialog) ui.lineNumberDialog.hidden = !isOpen;
}

function setHyphenationDialogOpen(isOpen) {
  if (ui.hyphenationDialogOverlay) ui.hyphenationDialogOverlay.hidden = !isOpen;
  if (ui.hyphenationDialog) ui.hyphenationDialog.hidden = !isOpen;
}

function renderPersonRows(container, values, type) {
  if (!container) return;
  clearElement(container);
  const entries = normalizePersonList(values);
  entries.forEach((value, index) => {
    const row = document.createElement("div");
    row.className = "property-repeat-row";
    const input = document.createElement("input");
    input.type = "text";
    input.value = value;
    input.autocomplete = "off";
    input.dataset.personType = type;
    input.setAttribute("aria-label", type === "authors" ? "Autor" : "Mitwirkende");

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "property-repeat-remove";
    removeButton.textContent = "X";
    removeButton.disabled = entries.length <= 1;
    removeButton.setAttribute("aria-label", type === "authors" ? "Autor entfernen" : "Mitwirkende entfernen");
    removeButton.addEventListener("click", () => {
      const nextValues = getPersonRows(container).filter((_, valueIndex) => valueIndex !== index);
      renderPersonRows(container, nextValues.length ? nextValues : [""], type);
    });

    row.append(input, removeButton);
    container.appendChild(row);
  });
}

function getPersonRows(container) {
  return Array.from(container?.querySelectorAll("input") || [])
    .map((input) => input.value.trim())
    .filter(Boolean);
}

function addPersonRow(container, type) {
  const values = getPersonRows(container);
  values.push("");
  renderPersonRows(container, values, type);
  const lastInput = container?.querySelector(".property-repeat-row:last-child input");
  lastInput?.focus();
}

function openDocumentPropertiesDialog() {
  const project = getActiveProject();
  if (!project) return;
  const metadata = {
    ...createDefaultMetadata(),
    ...(project.metadata || {}),
  };
  if (ui.docTextKindInput) ui.docTextKindInput.value = metadata.textKind;
  if (ui.docTitleInput) ui.docTitleInput.value = project.title;
  if (ui.docSubtitleInput) ui.docSubtitleInput.value = metadata.subtitle || "";
  renderPersonRows(ui.docAuthorsList, metadata.authors, "authors");
  renderPersonRows(ui.docContributorsList, metadata.contributors, "contributors");
  if (ui.docCreatedDateInput) ui.docCreatedDateInput.value = metadata.createdDate || "";
  if (ui.docModifiedDateInput) ui.docModifiedDateInput.value = metadata.modifiedDate || "";
  if (ui.docRightsHolderInput) ui.docRightsHolderInput.value = metadata.rightsHolder || "";
  if (ui.docCopyrightYearInput) ui.docCopyrightYearInput.value = metadata.copyrightYear || "";
  if (ui.docLicenseInput) ui.docLicenseInput.value = metadata.license || "";
  if (ui.docAllowUseInput) ui.docAllowUseInput.checked = metadata.allowUse === true;
  if (ui.docAllowEditInput) ui.docAllowEditInput.checked = metadata.allowEdit === true;
  if (ui.docAllowShareInput) ui.docAllowShareInput.checked = metadata.allowShare === true;
  if (ui.docAttributionInput) ui.docAttributionInput.value = metadata.attribution || "";
  if (ui.docStatusInput) ui.docStatusInput.value = metadata.status || "draft";
  if (ui.docVersionInput) ui.docVersionInput.value = metadata.version || "";
  if (ui.docPublishedDateInput) ui.docPublishedDateInput.value = metadata.publishedDate || "";
  if (ui.docLanguageMetaInput) ui.docLanguageMetaInput.value = metadata.language || "";
  if (ui.docTagsInput) ui.docTagsInput.value = metadata.tags || "";
  if (ui.docDescriptionInput) ui.docDescriptionInput.value = metadata.description || "";
  setDialogOpen(true);
  ui.docTitleInput?.focus();
  document.querySelectorAll(".editor-menu[open]").forEach((menu) => {
    menu.open = false;
  });
}

function saveDocumentPropertiesDialog() {
  updateActiveProject((project) => {
    project.title = ui.docTitleInput?.value.trim() || "Unbenannte TypeMap";
    const textKind = ui.docTextKindInput?.value || "essay";
    project.metadata = {
      ...createDefaultMetadata(),
      ...(project.metadata || {}),
      textKind,
      subtitle: ui.docSubtitleInput?.value.trim() || "",
      authors: normalizePersonList(getPersonRows(ui.docAuthorsList)),
      contributors: normalizePersonList(getPersonRows(ui.docContributorsList)),
      createdDate: ui.docCreatedDateInput?.value || "",
      modifiedDate: ui.docModifiedDateInput?.value || "",
      rightsHolder: ui.docRightsHolderInput?.value.trim() || "",
      copyrightYear: ui.docCopyrightYearInput?.value || "",
      license: ui.docLicenseInput?.value.trim() || "",
      allowUse: ui.docAllowUseInput?.checked === true,
      allowEdit: ui.docAllowEditInput?.checked === true,
      allowShare: ui.docAllowShareInput?.checked === true,
      attribution: ui.docAttributionInput?.value.trim() || "",
      status: ui.docStatusInput?.value || "draft",
      version: ui.docVersionInput?.value.trim() || "",
      publishedDate: ui.docPublishedDateInput?.value || "",
      language: ui.docLanguageMetaInput?.value.trim() || "",
      tags: ui.docTagsInput?.value.trim() || "",
      description: ui.docDescriptionInput?.value.trim() || "",
    };
    project.source.textType = sourceTextTypeFromDocumentKind(textKind);
    if (project.source.textType === "lyric") {
      project.style.textAlign = "left";
      project.style.lineHeight = 1.5;
    }
  });
  renderEditor();
  setDialogOpen(false);
}

function updateFontPreviewSample() {
  const family = normalizeFontFamilyName(ui.fontFamilySearchInput?.value || "");
  if (!ui.fontPreviewSample) return;
  if (!family) {
    ui.fontPreviewSample.style.fontFamily = "";
    return;
  }
  loadGoogleFont(family);
  ui.fontPreviewSample.style.fontFamily = createGoogleFontCssValue(family);
}

function openFontDialog() {
  if (ui.fontFamilySearchInput) ui.fontFamilySearchInput.value = "";
  updateFontPreviewSample();
  setFontDialogOpen(true);
  ui.fontFamilySearchInput?.focus();
  document.querySelectorAll(".editor-menu[open]").forEach((menu) => {
    menu.open = false;
  });
}

function openFontSettingsDialog() {
  const project = getActiveProject();
  if (!project) return;
  renderFontOptions(project);
  setFontSettingsDialogOpen(true);
  ui.fontFamilySelect?.focus();
  document.querySelectorAll(".editor-menu[open]").forEach((menu) => {
    menu.open = false;
  });
}

function openTextFormatDialog() {
  renderEditor();
  setTextFormatDialogOpen(true);
  ui.fontSizeInput?.focus();
  document.querySelectorAll(".editor-menu[open]").forEach((menu) => {
    menu.open = false;
  });
}

function addFontToActiveProject() {
  const family = normalizeFontFamilyName(ui.fontFamilySearchInput?.value || "");
  if (!family) return;
  const css = createGoogleFontCssValue(family);
  loadGoogleFont(family);
  updateActiveProject((project) => {
    const projectFonts = normalizeProjectFonts(project.typography?.projectFonts);
    const exists = projectFonts.some((font) => font.family.toLowerCase() === family.toLowerCase());
    project.typography = {
      ...createDefaultTypography(),
      ...(project.typography || {}),
      projectFonts: exists
        ? projectFonts
        : [
            ...projectFonts,
            {
              family,
              label: family,
              css,
              source: "google",
              variants: ["400", "700"],
            },
          ],
    };
    project.style.fontFamily = css;
  });
  renderEditor();
  setFontDialogOpen(false);
}

function openLineNumberDialog() {
  const project = getActiveProject();
  if (!project) return;
  const settings = normalizeLineNumbering(project.style.lineNumbering, project.style.lineNumbers);
  if (ui.lineNumberEnabledInput) ui.lineNumberEnabledInput.checked = settings.enabled;
  if (ui.lineNumberModeInput) ui.lineNumberModeInput.value = settings.mode;
  if (ui.lineNumberIncludeBlankInput) ui.lineNumberIncludeBlankInput.checked = settings.includeBlankLines;
  if (ui.lineNumberIntervalInput) ui.lineNumberIntervalInput.value = String(settings.interval);
  if (ui.lineNumberStartInput) ui.lineNumberStartInput.value = String(settings.start);
  setLineNumberDialogOpen(true);
  ui.lineNumberEnabledInput?.focus();
  document.querySelectorAll(".editor-menu[open]").forEach((menu) => {
    menu.open = false;
  });
}

function saveLineNumberDialog() {
  updateActiveProject((project) => {
    const settings = {
      enabled: ui.lineNumberEnabledInput?.checked === true,
      mode: ui.lineNumberModeInput?.value || "paragraphs",
      includeBlankLines: ui.lineNumberIncludeBlankInput?.checked === true,
      interval: clampInteger(ui.lineNumberIntervalInput?.value, 1, 1, 100),
      start: clampInteger(ui.lineNumberStartInput?.value, 1, 0, 99999),
    };
    project.style.lineNumbering = normalizeLineNumbering(settings);
    project.style.lineNumbers = project.style.lineNumbering.enabled;
  });
  renderEditor();
  setLineNumberDialogOpen(false);
}

function openHyphenationDialog() {
  const project = getActiveProject();
  if (!project) return;
  const settings = normalizeHyphenationSettings(project.style.hyphenationSettings, project.style.hyphenation, project.style.language);
  if (ui.hyphenationModeInput) ui.hyphenationModeInput.value = settings.mode;
  if (ui.hyphenationLanguageInput) ui.hyphenationLanguageInput.value = settings.language;
  if (ui.hyphenationConsecutiveInput) ui.hyphenationConsecutiveInput.value = String(settings.consecutiveLines);
  if (ui.hyphenationMinWordLengthInput) ui.hyphenationMinWordLengthInput.value = String(settings.minWordLength);
  if (ui.hyphenationBeforeInput) ui.hyphenationBeforeInput.value = String(settings.before);
  if (ui.hyphenationAfterInput) ui.hyphenationAfterInput.value = String(settings.after);
  setHyphenationDialogOpen(true);
  ui.hyphenationModeInput?.focus();
  document.querySelectorAll(".editor-menu[open]").forEach((menu) => {
    menu.open = false;
  });
}

function saveHyphenationDialog() {
  updateActiveProject((project) => {
    const settings = normalizeHyphenationSettings({
      mode: ui.hyphenationModeInput?.value || "manual",
      language: ui.hyphenationLanguageInput?.value || "de",
      consecutiveLines: ui.hyphenationConsecutiveInput?.value,
      minWordLength: ui.hyphenationMinWordLengthInput?.value,
      before: ui.hyphenationBeforeInput?.value,
      after: ui.hyphenationAfterInput?.value,
    });
    project.style.hyphenationSettings = settings;
    project.style.hyphenation = settings.mode;
    project.style.language = settings.language;
  });
  renderEditor();
  setHyphenationDialogOpen(false);
}

function renderApp() {
  renderProjectList();
  loadProjectFonts();
  renderEditor();
  rebuildModelsAndPreview();
}

function markProjectChanged(project) {
  if (!project) return;
  project.updatedAt = new Date().toISOString();
  scheduleAutosave();
}

function activateProject(projectId, options = {}) {
  if (!options.preserveSourceRange && state.activeProjectId !== projectId) {
    state.activeSourceRange = null;
  }
  state.activeProjectId = projectId;
  if (!options.preserveExpandedState) {
    setProjectExpanded(projectId, true);
  }
  renderApp();
  scheduleAutosave();
}

function addProject(title = "Neue TypeMap") {
  const project = createDefaultProject(title);
  state.projects.push(project);
  state.activeProjectId = project.id;
  state.activeSourceRange = null;
  setProjectExpanded(project.id, true);
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
      state.activeSourceRange = null;
    }
  }
  state.expandedProjectIds = state.expandedProjectIds.filter((id) => id !== projectId);
  renderApp();
  scheduleAutosave();
}

function updateActiveProject(mutator, options = {}) {
  const project = getActiveProject();
  if (!project) return;
  mutator(project);
  markProjectChanged(project);
  if (options.renderBrowser !== false) {
    renderProjectList();
  }
  rebuildModelsAndPreview();
}

function updateActiveProjectTextFromEditor(nextText) {
  updateActiveProject((project) => {
    const sourceModel = buildSourceModel(project);
    const range = getActiveSourceRangeForProject(project, sourceModel);
    if (!range || range.id === "document-root") {
      project.source.rawText = nextText;
      state.activeSourceRange = null;
      return;
    }
    const before = project.source.rawText.slice(0, range.startOffset);
    const after = project.source.rawText.slice(range.endOffset);
    const needsTrailingBreak = after.trimStart().startsWith("#") && nextText && !/\n\s*\n$/.test(nextText);
    const replacementText = needsTrailingBreak ? `${nextText.replace(/\s+$/, "")}\n\n` : nextText;
    project.source.rawText = `${before}${replacementText}${after}`;
    state.activeSourceRange = {
      ...range,
      projectId: project.id,
      endOffset: range.startOffset + replacementText.length,
    };
  }, { renderBrowser: false });
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
  state.activeSourceRange = null;
  setProjectExpanded(state.activeProjectId, true);
  renderApp();
  scheduleAutosave();
}

function exportProjects() {
  const blob = new Blob([JSON.stringify(buildSnapshot(), null, 2)], { type: "application/json" });
  downloadBlob(blob, "typemap-project.json");
}

function slugifyFilename(value, fallback = "typemap") {
  const slug = String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
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
  URL.revokeObjectURL(url);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildMarkdownExport(project) {
  const metadata = project.metadata || {};
  const lines = [];
  if (project.title) lines.push(`# ${project.title}`, "");
  if (metadata.subtitle) lines.push(`## ${metadata.subtitle}`, "");
  const authors = normalizePersonList(metadata.authors).filter(Boolean);
  if (authors.length) lines.push(`*${authors.join(", ")}*`, "");
  lines.push(project.source.rawText || "");
  return lines.join("\n").replace(/\n{3,}/g, "\n\n");
}

function exportMarkdown() {
  const project = getActiveProject();
  if (!project) return;
  const blob = new Blob([buildMarkdownExport(project)], { type: "text/markdown;charset=utf-8" });
  downloadBlob(blob, `${slugifyFilename(project.title)}.md`);
}

function escapeScriptJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function buildHtmlBlockMarkup(block, textType) {
  const element = createMarkdownBlockElement(block, textType);
  element.classList.add("preview-body-block");
  if (textType === "lyric" && !String(block.text || "").trim()) {
    element.dataset.sourceBlankLine = "true";
  }
  element.dataset.sourceStart = String(block.sourceStartOffset);
  element.dataset.sourceEnd = String(block.sourceEndOffset);
  return element.outerHTML;
}

function buildHtmlFontFaceCss(project) {
  if (!String(project?.style?.fontFamily || "").includes("CMU Serif")) return "";
  return `
    @font-face { font-family: "CMU Serif"; src: url("../assets/fonts/cmu/cmunrm.ttf") format("truetype"); font-weight: 400; font-style: normal; font-display: swap; }
    @font-face { font-family: "CMU Serif"; src: url("../assets/fonts/cmu/cmunti.ttf") format("truetype"); font-weight: 400; font-style: italic; font-display: swap; }
    @font-face { font-family: "CMU Serif"; src: url("../assets/fonts/cmu/cmunbx.ttf") format("truetype"); font-weight: 700; font-style: normal; font-display: swap; }
    @font-face { font-family: "CMU Serif"; src: url("../assets/fonts/cmu/cmunbi.ttf") format("truetype"); font-weight: 700; font-style: italic; font-display: swap; }
`;
}

function buildHtmlExport(project) {
  const metadata = project.metadata || {};
  const authors = normalizePersonList(metadata.authors).filter(Boolean);
  const sourceModel = buildSourceModel(project);
  const layoutModel = buildBrowserLayoutModel(sourceModel, project.style);
  const textType = project.source.textType || "prose";
  const lineNumbering = normalizeLineNumbering(project.style.lineNumbering, project.style.lineNumbers);
  const hyphenationSettings = normalizeHyphenationSettings(project.style.hyphenationSettings, project.style.hyphenation, project.style.language);
  const exportBlocks = lineNumbering.mode === "source-lines" && textType === "lyric"
    ? layoutModel.sourceLineBlocks
    : layoutModel.blocks;
  const blocks = exportBlocks.map((block) => buildHtmlBlockMarkup(block, textType)).join("\n");
  const lineNumberingScriptData = escapeScriptJson(lineNumbering);
  const ligatureCss = project.style.ligatures !== false
    ? ' font-variant-ligatures: common-ligatures contextual; font-feature-settings: "liga" 1, "clig" 1, "calt" 1; text-rendering: optimizeLegibility;'
    : "";
  return `<!DOCTYPE html>
<html lang="${escapeHtml(metadata.language || project.style.language || "de")}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(project.title || "TypeMap")}</title>
  <style>
${buildHtmlFontFaceCss(project)}
    * { box-sizing: border-box; }
    body { margin: 0; background: #fff; color: #111; font-family: ${project.style.fontFamily}; }
    main { max-width: ${project.style.measure}ch; margin: 0 auto; padding: 56px; font-size: ${project.style.fontSize}pt; line-height: ${textType === "lyric" ? 1.5 : project.style.lineHeight}; text-align: ${textType === "lyric" ? "left" : project.style.textAlign}; hyphens: ${hyphenationSettings.mode}; overflow-wrap: break-word; }
    header { margin: 0 0 1.55em; text-align: ${textType === "lyric" ? "left" : "center"}; }
    h1 { margin: 0; font-size: 1.48em; line-height: 1.12; }
    .subtitle { margin: .34em 0 0; color: #555; font-size: .86em; line-height: 1.28; }
    .authors { margin: .68em 0 0; color: #333; font-size: .76em; font-weight: 500; line-height: 1.28; }
    .typemap-text { position: relative;${ligatureCss} }
    .typemap-text.has-line-numbers { position: relative; }
    p { margin: 0 0 .72em; white-space: pre-wrap; overflow-wrap: break-word; }
    em { font-style: italic; }
    strong { font-weight: 700; }
    mark { background: transparent; text-decoration: underline; color: inherit; }
    a { color: #70531c; text-decoration: underline; text-underline-offset: .12em; }
    h1, h2, h3 { margin: 1.1em 0 .38em; line-height: 1.12; }
    h1:first-child, h2:first-child, h3:first-child { margin-top: 0; }
    h1 { font-size: 1.48em; }
    h2 { font-size: 1.22em; }
    h3 { font-size: 1.06em; }
    blockquote { margin: .9em 0; padding-left: 1.1em; border-left: 2px solid #bbb; color: #333; }
    ul, ol { margin: 0 0 .85em 1.4em; padding: 0; }
    li { margin: .18em 0; }
    code { font-family: "Source Code Pro", "Courier New", monospace; font-size: .88em; background: #f0eee8; padding: .08em .24em; border-radius: 3px; }
    pre { margin: .9em 0; padding: .9em 1em; border-radius: 6px; background: #171f24; color: #f5f1e8; overflow-x: auto; }
    pre code { background: transparent; color: inherit; padding: 0; }
    .preview-blank-line { min-height: 1.5em; margin: 0; }
    .line-number-layer { position: absolute; inset: 0 auto 0 0; width: 0; pointer-events: none; }
    .line-number { position: absolute; right: calc(100% + 1.1em); transform: translateY(calc(-100% - 0.1em)); color: #666; font-size: 0.72em; line-height: 1; text-align: right; font-variant-numeric: tabular-nums; }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>${escapeHtml(project.title || "")}</h1>
      ${metadata.subtitle ? `<p class="subtitle">${escapeHtml(metadata.subtitle)}</p>` : ""}
      ${authors.length ? `<p class="authors">${escapeHtml(authors.join(", "))}</p>` : ""}
    </header>
    <section id="typemapText" class="typemap-text${lineNumbering.enabled ? " has-line-numbers" : ""}" lang="${escapeHtml(hyphenationSettings.language)}">
      ${blocks}
    </section>
  </main>
  <script>
    const lineNumbering = ${lineNumberingScriptData};
    const text = document.getElementById("typemapText");
    function getVisualLineRects(element) {
      const range = document.createRange();
      range.selectNodeContents(element);
      const elementRect = element.getBoundingClientRect();
      const rects = Array.from(range.getClientRects())
        .filter((rect) => rect.width > 0 && rect.height > 0)
        .map((rect) => ({ top: rect.top, bottom: rect.bottom, height: rect.height, left: rect.left, right: rect.right }))
        .sort((a, b) => a.top - b.top || a.left - b.left);
      range.detach();
      if (!rects.length && element.textContent.trim()) {
        return [{ top: elementRect.top, bottom: elementRect.bottom, height: elementRect.height, left: elementRect.left, right: elementRect.right }];
      }
      return rects.reduce((grouped, rect) => {
        const previous = grouped[grouped.length - 1];
        if (previous && Math.abs(previous.top - rect.top) < 2) {
          previous.left = Math.min(previous.left, rect.left);
          previous.right = Math.max(previous.right, rect.right);
          previous.bottom = Math.max(previous.bottom, rect.bottom);
          previous.height = Math.max(previous.height, rect.height);
        } else {
          grouped.push({ ...rect });
        }
        return grouped;
      }, []);
    }
    function renderLineNumbers() {
      text.querySelector(".line-number-layer")?.remove();
      if (!lineNumbering.enabled) return;
      const layer = document.createElement("div");
      layer.className = "line-number-layer";
      text.appendChild(layer);
      const targetRect = text.getBoundingClientRect();
      const blocks = Array.from(text.querySelectorAll(".preview-body-block"));
      let lineIndex = 0;
      blocks.forEach((block) => {
        if (lineNumbering.mode === "source-lines" && block.dataset.sourceBlankLine === "true" && !lineNumbering.includeBlankLines) return;
        const rects = lineNumbering.mode === "source-lines"
          ? getVisualLineRects(block)
          : [block.getBoundingClientRect()].filter((rect) => rect.width > 0 && rect.height > 0);
        rects.forEach((rect) => {
          lineIndex += 1;
          const lineNumber = lineNumbering.start + lineIndex - 1;
          if (lineNumbering.interval > 1 && lineNumber % lineNumbering.interval !== 0) return;
          const label = document.createElement("span");
          label.className = "line-number";
          label.textContent = String(lineNumber);
          label.style.top = (rect.bottom - targetRect.top) + "px";
          layer.appendChild(label);
        });
      });
    }
    window.addEventListener("load", renderLineNumbers);
    window.addEventListener("resize", renderLineNumbers);
    if (document.fonts?.ready) document.fonts.ready.then(renderLineNumbers);
    renderLineNumbers();
  </script>
</body>
</html>`;
}

function exportHtml() {
  const project = getActiveProject();
  if (!project) return;
  const blob = new Blob([buildHtmlExport(project)], { type: "text/html;charset=utf-8" });
  downloadBlob(blob, `${slugifyFilename(project.title)}.html`);
}

async function exportPng() {
  const project = getActiveProject();
  if (!project) return;
  await document.fonts?.ready;

  const style = project.style;
  const metadata = project.metadata || {};
  const lineNumbering = normalizeLineNumbering(style.lineNumbering, style.lineNumbers);
  const scale = Math.max(2, Math.ceil(window.devicePixelRatio || 1));
  const fontSize = ptToPx(style.fontSize);
  const lineHeightPx = fontSize * (Number(style.lineHeight) || 1.38);
  const measureWidth = Math.max(420, Math.round(fontSize * (Number(style.measure) || 64) * 0.55));
  const numberGutter = lineNumbering.enabled ? 54 : 0;
  const padding = 82;
  const contentX = padding + numberGutter;
  const contentWidth = measureWidth;
  const canvasWidth = contentX + contentWidth + padding;
  const family = style.fontFamily || "Arial, Helvetica, sans-serif";
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const rows = [];

  function setFont(size, weight = 400) {
    context.font = `${weight} ${size}px ${family}`;
  }

  function stripMarkdown(value) {
    return String(value || "")
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  }

  function wrapText(text, size = fontSize, weight = 400) {
    setFont(size, weight);
    const sourceLines = stripMarkdown(text).split(/\r\n|\r|\n/);
    const wrapped = [];
    sourceLines.forEach((sourceLine) => {
      if (!sourceLine.trim()) {
        wrapped.push("");
        return;
      }
      const words = sourceLine.split(/\s+/);
      let line = "";
      words.forEach((word) => {
        const candidate = line ? `${line} ${word}` : word;
        if (context.measureText(candidate).width <= contentWidth || !line) {
          line = candidate;
        } else {
          wrapped.push(line);
          line = word;
        }
      });
      wrapped.push(line);
    });
    return wrapped;
  }

  function pushLine(text, options = {}) {
    rows.push({
      text,
      size: options.size || fontSize,
      weight: options.weight || 400,
      align: options.align || style.textAlign || "left",
      color: options.color || "#111",
      lineHeight: options.lineHeight || lineHeightPx,
      countLine: options.countLine === true,
    });
  }

  function pushSpacer(height) {
    rows.push({ spacer: true, lineHeight: height });
  }

  if (project.title) {
    wrapText(project.title, fontSize * 1.48, 700).forEach((line) => pushLine(line, {
      size: fontSize * 1.48,
      weight: 700,
      align: "center",
      lineHeight: fontSize * 1.48 * 1.12,
    }));
  }
  if (metadata.subtitle) {
    pushSpacer(fontSize * 0.34);
    wrapText(metadata.subtitle, fontSize * 0.86, 400).forEach((line) => pushLine(line, {
      size: fontSize * 0.86,
      align: "center",
      color: "#444",
      lineHeight: fontSize * 0.86 * 1.28,
    }));
  }
  const authors = normalizePersonList(metadata.authors).filter(Boolean);
  if (authors.length) {
    pushSpacer(fontSize * 0.68);
    wrapText(authors.join(", "), fontSize * 0.76, 500).forEach((line) => pushLine(line, {
      size: fontSize * 0.76,
      weight: 500,
      align: "center",
      color: "#333",
      lineHeight: fontSize * 0.76 * 1.28,
    }));
  }
  if (project.title || metadata.subtitle || authors.length) pushSpacer(fontSize * 1.55);

  const paragraphs = String(project.source.rawText || "").split(/\n\s*\n/);
  paragraphs.forEach((paragraph, paragraphIndex) => {
    wrapText(paragraph).forEach((line) => pushLine(line, { countLine: Boolean(line.trim()) }));
    if (paragraphIndex < paragraphs.length - 1) pushSpacer(lineHeightPx * 0.72);
  });

  const canvasHeight = Math.ceil(padding * 2 + rows.reduce((sum, row) => sum + row.lineHeight, 0));
  canvas.width = canvasWidth * scale;
  canvas.height = canvasHeight * scale;
  context.scale(scale, scale);
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvasWidth, canvasHeight);
  context.textBaseline = "alphabetic";

  let y = padding;
  let countedLine = 0;
  rows.forEach((row) => {
    y += row.lineHeight;
    if (row.spacer) return;
    setFont(row.size, row.weight);
    context.fillStyle = row.color;
    const textWidth = context.measureText(row.text).width;
    let x = contentX;
    if (row.align === "center") {
      x = contentX + (contentWidth - textWidth) / 2;
    } else if (row.align === "right") {
      x = contentX + contentWidth - textWidth;
    }
    context.fillText(row.text, x, y);
    if (!row.countLine) return;
    countedLine += 1;
    const lineNumber = lineNumbering.start + countedLine - 1;
    if (!lineNumbering.enabled || (lineNumbering.interval > 1 && lineNumber % lineNumbering.interval !== 0)) return;
    context.font = `${Math.round(fontSize * 0.62)}px ${family}`;
    context.fillStyle = "#5f6368";
    context.textAlign = "right";
    context.fillText(String(lineNumber), contentX - 24, y - fontSize * 0.12);
    context.textAlign = "left";
  });

  canvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, `${slugifyFilename(project.title)}.png`);
  }, "image/png");
}

function setExportMenuOpen(isOpen) {
  if (ui.exportMenu) ui.exportMenu.hidden = !isOpen;
  ui.exportProjectButton?.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function handleExportFormat(format) {
  setExportMenuOpen(false);
  if (format === "md") {
    exportMarkdown();
  } else if (format === "html") {
    exportHtml();
  } else if (format === "png") {
    exportPng().catch((error) => {
      console.error("PNG export failed", error);
      window.alert("PNG-Export fehlgeschlagen. Bitte versuche es erneut.");
    });
  } else {
    exportProjects();
  }
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

function setTheme(theme, persist = true) {
  const isLight = theme === "light";
  document.body.classList.toggle("typemap-theme-light", isLight);
  ui.themeToggleButton?.setAttribute("aria-pressed", isLight ? "true" : "false");
  ui.themeToggleButton?.setAttribute("aria-label", isLight ? "Dunklen Modus aktivieren" : "Hellen Modus aktivieren");
  if (ui.themeToggleIcon) {
    ui.themeToggleIcon.src = isLight
      ? "https://api.iconify.design/material-symbols-light/dark-mode-rounded.svg?color=%23213633"
      : "https://api.iconify.design/boxicons/sun-bright.svg?color=%23ffb347";
  }
  if (ui.menuIcon) {
    ui.menuIcon.src = isLight
      ? "https://api.iconify.design/material-symbols/menu.svg?color=%23213633"
      : "https://api.iconify.design/material-symbols/menu.svg?color=%23d28a05";
  }
  if (persist) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, isLight ? "light" : "dark");
    } catch (error) {
      console.warn("TypeMap theme preference could not be saved", error);
    }
  }
}

function getStoredTheme() {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
  } catch (error) {
    return "dark";
  }
}

function toggleTheme() {
  const isLight = document.body.classList.contains("typemap-theme-light");
  setTheme(isLight ? "dark" : "light");
}

function isNarrowDetailsViewport() {
  return window.matchMedia("(max-width: 920px)").matches;
}

function normalizeDetailsLayoutMode(mode) {
  if (isNarrowDetailsViewport()) return mode === "editor" ? "editor" : "browser";
  return ["normal", "browser", "editor"].includes(mode) ? mode : "normal";
}

function setDetailsLayoutMode(mode) {
  const normalizedMode = normalizeDetailsLayoutMode(mode);
  state.detailsLayoutMode = normalizedMode;
  ui.appFrame?.classList.toggle("details-layout-normal", normalizedMode === "normal");
  ui.appFrame?.classList.toggle("details-layout-browser", normalizedMode === "browser");
  ui.appFrame?.classList.toggle("details-layout-editor", normalizedMode === "editor");
  const label = normalizedMode === "browser"
    ? "Projektbrowser aufgeblättert"
    : normalizedMode === "editor"
      ? "Editor aufgeblättert"
      : "Normale Projektansicht";
  ui.layoutCycleButtons.forEach((button) => {
    button.setAttribute("aria-label", `${label}. Ansicht umblättern`);
    button.setAttribute("title", label);
  });
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

function setWorkspaceSection(section) {
  const activeSection = section === "details" ? "details" : "preview";
  const previousSection = state.activeWorkspaceSection;
  state.activeWorkspaceSection = activeSection;
  ui.appFrame?.classList.toggle("workspace-mode-details", activeSection === "details");
  ui.appFrame?.classList.toggle("workspace-mode-preview", activeSection !== "details");
  if (activeSection === "details") {
    setDetailsLayoutMode(state.detailsLayoutMode);
  }
  if (activeSection === "preview" && previousSection !== "preview") {
    window.requestAnimationFrame(() => {
      if (!ui.typeStage) return;
      ui.typeStage.scrollTop = 0;
      ui.typeStage.scrollLeft = 0;
    });
  }
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
    if (event.key === "Escape") {
      setMenuOpen(false);
      setDialogOpen(false);
      setFontDialogOpen(false);
      setFontSettingsDialogOpen(false);
      setTextFormatDialogOpen(false);
      setLineNumberDialogOpen(false);
      setHyphenationDialogOpen(false);
      setExportMenuOpen(false);
    }
  });
}

function bindEditor() {
  document.querySelectorAll(".editor-menu").forEach((menu) => {
    menu.addEventListener("toggle", () => {
      if (!menu.open) return;
      document.querySelectorAll(".editor-menu").forEach((otherMenu) => {
        if (otherMenu !== menu) otherMenu.open = false;
      });
    });
  });
  document.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest(".editor-menu")) return;
    document.querySelectorAll(".editor-menu[open]").forEach((menu) => {
      menu.open = false;
    });
  });
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
  ui.layoutCycleButtons.forEach((button) => {
    button.addEventListener("click", cycleDetailsLayoutMode);
  });
  window.addEventListener("resize", () => setDetailsLayoutMode(state.detailsLayoutMode));
  ui.newProjectButton?.addEventListener("click", () => addProject("Neue TypeMap"));
  ui.createProjectButton?.addEventListener("click", () => addProject("Neue TypeMap"));
  ui.themeToggleButton?.addEventListener("click", toggleTheme);
  ui.exportProjectButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    setExportMenuOpen(ui.exportProjectButton.getAttribute("aria-expanded") !== "true");
  });
  ui.exportMenu?.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest("[data-export-format]") : null;
    if (!button) return;
    event.stopPropagation();
    handleExportFormat(button.dataset.exportFormat);
  });
  document.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest(".export-control")) return;
    setExportMenuOpen(false);
  });
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

  ui.documentPropertiesButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    openDocumentPropertiesDialog();
  });
  ui.documentPropertiesOverlay?.addEventListener("click", () => setDialogOpen(false));
  ui.documentPropertiesCloseButton?.addEventListener("click", () => setDialogOpen(false));
  ui.documentPropertiesCancelButton?.addEventListener("click", () => setDialogOpen(false));
  ui.documentPropertiesSaveButton?.addEventListener("click", saveDocumentPropertiesDialog);
  ui.addDocAuthorButton?.addEventListener("click", () => addPersonRow(ui.docAuthorsList, "authors"));
  ui.addDocContributorButton?.addEventListener("click", () => addPersonRow(ui.docContributorsList, "contributors"));
  ui.fontSettingsButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    openFontSettingsDialog();
  });
  ui.fontSettingsDialogOverlay?.addEventListener("click", () => setFontSettingsDialogOpen(false));
  ui.fontSettingsDialogCloseButton?.addEventListener("click", () => setFontSettingsDialogOpen(false));
  ui.fontSettingsDialogCloseActionButton?.addEventListener("click", () => setFontSettingsDialogOpen(false));
  ui.textFormatSettingsButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    openTextFormatDialog();
  });
  ui.textFormatDialogOverlay?.addEventListener("click", () => setTextFormatDialogOpen(false));
  ui.textFormatDialogCloseButton?.addEventListener("click", () => setTextFormatDialogOpen(false));
  ui.textFormatDialogCloseActionButton?.addEventListener("click", () => setTextFormatDialogOpen(false));
  ui.addFontButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    openFontDialog();
  });
  ui.fontDialogOverlay?.addEventListener("click", () => setFontDialogOpen(false));
  ui.fontDialogCloseButton?.addEventListener("click", () => setFontDialogOpen(false));
  ui.fontDialogCancelButton?.addEventListener("click", () => setFontDialogOpen(false));
  ui.fontDialogAddButton?.addEventListener("click", addFontToActiveProject);
  ui.fontFamilySearchInput?.addEventListener("input", updateFontPreviewSample);
  ui.fontFamilySearchInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addFontToActiveProject();
    }
  });
  ui.lineNumberSettingsButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    openLineNumberDialog();
  });
  ui.lineNumberDialogOverlay?.addEventListener("click", () => setLineNumberDialogOpen(false));
  ui.lineNumberDialogCloseButton?.addEventListener("click", () => setLineNumberDialogOpen(false));
  ui.lineNumberDialogCancelButton?.addEventListener("click", () => setLineNumberDialogOpen(false));
  ui.lineNumberDialogSaveButton?.addEventListener("click", saveLineNumberDialog);
  ui.hyphenationSettingsButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    openHyphenationDialog();
  });
  ui.hyphenationDialogOverlay?.addEventListener("click", () => setHyphenationDialogOpen(false));
  ui.hyphenationDialogCloseButton?.addEventListener("click", () => setHyphenationDialogOpen(false));
  ui.hyphenationDialogCancelButton?.addEventListener("click", () => setHyphenationDialogOpen(false));
  ui.hyphenationDialogSaveButton?.addEventListener("click", saveHyphenationDialog);
  ui.textInput?.addEventListener("input", () => {
    renderEditorHighlight(ui.textInput.value);
    syncEditorHighlightScroll();
    updateActiveProjectTextFromEditor(ui.textInput.value);
    scheduleProjectBrowserRender();
  });
  ui.textInput?.addEventListener("scroll", syncEditorHighlightScroll);
  ui.fontFamilySelect?.addEventListener("change", () => {
    updateActiveProject((project) => {
      project.style.fontFamily = ui.fontFamilySelect.value;
    });
  });
  ui.fontLigaturesInput?.addEventListener("change", () => {
    updateActiveProject((project) => {
      project.style.ligatures = ui.fontLigaturesInput.checked;
    });
  });
  ui.fontSizeInput?.addEventListener("input", () => {
    updateActiveProject((project) => {
      project.style.fontSize = Number(ui.fontSizeInput.value);
    });
  });
  ui.fontSizeInput?.addEventListener("change", () => {
    updateActiveProject((project) => {
      project.style.fontSize = Number(ui.fontSizeInput.value);
    });
  });
  ui.lineHeightInput?.addEventListener("input", () => {
    updateActiveProject((project) => {
      project.style.lineHeight = Number(ui.lineHeightInput.value);
    });
  });
  ui.lineHeightInput?.addEventListener("change", () => {
    updateActiveProject((project) => {
      project.style.lineHeight = Number(ui.lineHeightInput.value);
    });
  });
  ui.measureInput?.addEventListener("input", () => {
    updateActiveProject((project) => {
      project.style.measure = Number(ui.measureInput.value);
    });
  });
  ui.measureInput?.addEventListener("change", () => {
    updateActiveProject((project) => {
      project.style.measure = Number(ui.measureInput.value);
    });
  });
  ui.textAlignSelect?.addEventListener("change", () => {
    updateActiveProject((project) => {
      project.style.textAlign = ui.textAlignSelect.value;
    });
  });
  ui.languageSelect?.addEventListener("change", () => {
    updateActiveProject((project) => {
      project.style.language = ui.languageSelect.value;
      project.style.hyphenationSettings = normalizeHyphenationSettings(
        {
          ...(project.style.hyphenationSettings || {}),
          language: ui.languageSelect.value,
        },
        project.style.hyphenation,
        ui.languageSelect.value,
      );
    });
  });
}

async function init() {
  setTheme(getStoredTheme(), false);
  setDetailsLayoutMode("normal");
  bindMenu();
  bindEditor();
  const snapshot = await loadLocalSnapshot();
  if (snapshot) {
    applySnapshot(snapshot);
  } else {
    state.projects = [createDefaultProject("Erste TypeMap")];
    state.activeProjectId = state.projects[0].id;
    setProjectExpanded(state.activeProjectId, true);
    renderApp();
    scheduleAutosave();
  }
  setWorkspaceSection("preview");
  setProjectEditorTab(state.activeProjectEditorTab);
}

init().catch((error) => {
  console.error("TypeMap konnte nicht initialisiert werden", error);
});

