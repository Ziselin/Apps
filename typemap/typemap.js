const LOCAL_DB_NAME = "typemap-local-db";
const LOCAL_DB_VERSION = 1;
const LOCAL_DB_STORE = "appState";
const LOCAL_DB_KEY = "primary";
const PROJECT_FILE_VERSION = 1;
const DOCUMENT_STYLE_PRESET_VERSION = 1;
const THEME_STORAGE_KEY = "typemap-theme";
// ARCHITEKTURREGEL: TypeMap-spezifische Einfügungsobjekte, die im Editor als
// grüne Kartusche erscheinen, verwenden bis auf Weiteres ausschließlich die
// sprachunabhängige Syntax {{...}}. Ausnahmen sind die belegte Originalpaginierung
// als [42] beziehungsweise [iv] sowie Fußnoten in kompatibler Markdown-Syntax:
// [^1] als Verweis und [^1]: Inhalt als Definition. Übersetzte Objektüberschriften
// sind Altdaten und werden auf die kanonischen Marker migriert.
const TOC_OBJECT_MARKER = "{{toc}}";
const LEGACY_TOC_OBJECT_HEADING = "## Inhaltsverzeichnis";
const CITATION_OBJECT_MARKER = "{{citation}}";
const LEGACY_CITATION_OBJECT_HEADING = "## Quellenangabe";
const ORIGINAL_PAGE_MARKER_SOURCE = "\\[(?:\\d+|(?=[ivxlcdm]+\\])m{0,3}(?:cm|cd|d?c{0,3})(?:xc|xl|l?x{0,3})(?:ix|iv|v?i{0,3}))\\]";
const FOOTNOTE_REFERENCE_SOURCE = "\\[\\^([^\\]\\r\\n]+)\\]";
const CHAPTER_ROLES = new Set(["foreword", "main", "afterword"]);
const PROVENANCE_LICENSES = {
  unknown: { name: "Nicht bestimmt", url: "https://creativecommons.org/share-your-work/cclicenses/" },
  "public-domain": { name: "Gemeinfrei / Public Domain", url: "https://creativecommons.org/publicdomain/mark/1.0/deed.de" },
  "cc0-1.0": { name: "CC0 1.0", url: "https://creativecommons.org/publicdomain/zero/1.0/deed.de" },
  "cc-by-4.0": { name: "CC BY 4.0", url: "https://creativecommons.org/licenses/by/4.0/deed.de" },
  "cc-by-sa-4.0": { name: "CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/deed.de" },
  "cc-by-nc-4.0": { name: "CC BY-NC 4.0", url: "https://creativecommons.org/licenses/by-nc/4.0/deed.de" },
  "cc-by-nc-sa-4.0": { name: "CC BY-NC-SA 4.0", url: "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.de" },
  "all-rights-reserved": { name: "Alle Rechte vorbehalten", url: "https://rightsstatements.org/page/InC/1.0/?language=de" },
};
const PARATEXT_START_PATTERN = /^:::\s*(?:paratext\s+)?(front|back|frontmatter|backmatter)\s*$/i;
const PARATEXT_END_PATTERN = /^:::\s*$/;
const PARATEXT_HEADING_PATTERN = /^#\s*(.+)$/;

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
  exportProjectButton: document.getElementById("exportProjectButton"),
  printProjectButton: document.getElementById("printProjectButton"),
  exportMenu: document.getElementById("exportMenu"),
  themeToggleButton: document.getElementById("themeToggleButton"),
  themeToggleIcon: document.getElementById("themeToggleIcon"),
  createProjectButton: document.getElementById("createProjectButton"),
  openImportButton: document.getElementById("openImportButton"),
  openGenerateDialogButton: document.getElementById("openGenerateDialogButton"),
  openSearchDialogButton: document.getElementById("openSearchDialogButton"),
  browserActionsMenuButton: document.getElementById("browserActionsMenuButton"),
  browserActionsMenu: document.getElementById("browserActionsMenu"),
  browserExportJsonButton: document.getElementById("browserExportJsonButton"),
  projectFileInput: document.getElementById("projectFileInput"),
  searchDialogOverlay: document.getElementById("searchDialogOverlay"),
  searchDialog: document.getElementById("searchDialog"),
  searchDialogCloseButton: document.getElementById("searchDialogCloseButton"),
  wikisourceSearchInput: document.getElementById("wikisourceSearchInput"),
  wikisourceSearchButton: document.getElementById("wikisourceSearchButton"),
  wikisourceTextTypeFilter: document.getElementById("wikisourceTextTypeFilter"),
  wikisourceSearchResults: document.getElementById("wikisourceSearchResults"),
  searchDialogStatus: document.getElementById("searchDialogStatus"),
  importWikisourceButton: document.getElementById("importWikisourceButton"),
  generateDialogOverlay: document.getElementById("generateDialogOverlay"),
  generateDialog: document.getElementById("generateDialog"),
  generateDialogCloseButton: document.getElementById("generateDialogCloseButton"),
  generateWebTab: document.getElementById("generateWebTab"),
  generatePdfTab: document.getElementById("generatePdfTab"),
  generateEpubTab: document.getElementById("generateEpubTab"),
  generateWebPanel: document.getElementById("generateWebPanel"),
  generatePdfPanel: document.getElementById("generatePdfPanel"),
  generateEpubPanel: document.getElementById("generateEpubPanel"),
  generateSourceUrlInput: document.getElementById("generateSourceUrlInput"),
  generatePdfProviderInput: document.getElementById("generatePdfProviderInput"),
  generatePdfModelInput: document.getElementById("generatePdfModelInput"),
  generatePdfApiKeyInput: document.getElementById("generatePdfApiKeyInput"),
  generatePdfFileInput: document.getElementById("generatePdfFileInput"),
  generateEpubFileInput: document.getElementById("generateEpubFileInput"),
  generatePromptField: document.getElementById("generatePromptField"),
  generatePromptOutput: document.getElementById("generatePromptOutput"),
  generateDialogStatus: document.getElementById("generateDialogStatus"),
  generatePromptButton: document.getElementById("generatePromptButton"),
  copyGeneratePromptButton: document.getElementById("copyGeneratePromptButton"),
  openGeneratedJsonEditorButton: document.getElementById("openGeneratedJsonEditorButton"),
  projectList: document.getElementById("projectList"),
  editorPanel: document.querySelector(".editor-panel"),
  editorToolbarPrimary: document.querySelector(".editor-toolbar-primary"),
  editorToolbarFormat: document.querySelector(".editor-toolbar-format"),
  editorDataViewSelect: document.getElementById("editorDataViewSelect"),
  editorDataViewIcon: document.getElementById("editorDataViewIcon"),
  insertTableOfContentsButton: document.getElementById("insertTableOfContentsButton"),
  tableOfContentsVisibilityButton: document.getElementById("tableOfContentsVisibilityButton"),
  tableOfContentsVisibilityCheck: document.getElementById("tableOfContentsVisibilityCheck"),
  insertCitationObjectButton: document.getElementById("insertCitationObjectButton"),
  insertCitationObjectCheck: document.getElementById("insertCitationObjectCheck"),
  documentPropertiesButton: document.getElementById("documentPropertiesButton"),
  toolbarTextKindSelect: document.getElementById("toolbarTextKindSelect"),
  editorZoomButtons: Array.from(document.querySelectorAll("[data-editor-zoom]")),
  decreaseFontSizeButton: document.getElementById("decreaseFontSizeButton"),
  increaseFontSizeButton: document.getElementById("increaseFontSizeButton"),
  toolbarFontSizeValue: document.getElementById("toolbarFontSizeValue"),
  clearFormattingButton: document.getElementById("clearFormattingButton"),
  textFormatWidthButton: document.getElementById("textFormatWidthButton"),
  documentPropertiesOverlay: document.getElementById("documentPropertiesOverlay"),
  documentPropertiesDialog: document.getElementById("documentPropertiesDialog"),
  documentPropertiesTitle: document.getElementById("documentPropertiesTitle"),
  documentPropertiesCloseButton: document.getElementById("documentPropertiesCloseButton"),
  documentPropertiesCancelButton: document.getElementById("documentPropertiesCancelButton"),
  documentPropertiesSaveButton: document.getElementById("documentPropertiesSaveButton"),
  propertyTabSourceCitation: document.getElementById("propertyTabSourceCitation"),
  propertyTabProvenance: document.getElementById("propertyTabProvenance"),
  propertyPanelSourceCitation: document.getElementById("propertyPanelSourceCitation"),
  propertyPanelProvenance: document.getElementById("propertyPanelProvenance"),
  provenanceEmptyHint: document.getElementById("provenanceEmptyHint"),
  provenanceContent: document.getElementById("provenanceContent"),
  provenanceTypeSelect: document.getElementById("provenanceTypeSelect"),
  provenanceProviderOutput: document.getElementById("provenanceProviderOutput"),
  provenanceSiteOutput: document.getElementById("provenanceSiteOutput"),
  provenanceFormatOutput: document.getElementById("provenanceFormatOutput"),
  provenanceTextBasisOutput: document.getElementById("provenanceTextBasisOutput"),
  provenanceSourceLink: document.getElementById("provenanceSourceLink"),
  provenanceRevisionLink: document.getElementById("provenanceRevisionLink"),
  provenanceEpubExportLink: document.getElementById("provenanceEpubExportLink"),
  provenanceWikidataLink: document.getElementById("provenanceWikidataLink"),
  provenancePageIdOutput: document.getElementById("provenancePageIdOutput"),
  provenanceRevisionIdOutput: document.getElementById("provenanceRevisionIdOutput"),
  provenanceParentRevisionIdOutput: document.getElementById("provenanceParentRevisionIdOutput"),
  provenanceRevisionTimestampOutput: document.getElementById("provenanceRevisionTimestampOutput"),
  provenanceExportedAtOutput: document.getElementById("provenanceExportedAtOutput"),
  provenanceImportedAtOutput: document.getElementById("provenanceImportedAtOutput"),
  provenanceHashOutput: document.getElementById("provenanceHashOutput"),
  provenanceRelatedLinks: document.getElementById("provenanceRelatedLinks"),
  provenanceLicenseSelect: document.getElementById("provenanceLicenseSelect"),
  provenanceLicenseLink: document.getElementById("provenanceLicenseLink"),
  sourceCitationTypeInput: document.getElementById("sourceCitationTypeInput"),
  sourceCitationTitleInput: document.getElementById("sourceCitationTitleInput"),
  sourceCitationSubtitleInput: document.getElementById("sourceCitationSubtitleInput"),
  sourceCitationLeadInput: document.getElementById("sourceCitationLeadInput"),
  sourceCitationLanguageInput: document.getElementById("sourceCitationLanguageInput"),
  sourceCitationTextVersionInput: document.getElementById("sourceCitationTextVersionInput"),
  sourceCitationTranslationFields: document.getElementById("sourceCitationTranslationFields"),
  sourceCitationOriginalTitleInput: document.getElementById("sourceCitationOriginalTitleInput"),
  sourceCitationOriginalLanguageInput: document.getElementById("sourceCitationOriginalLanguageInput"),
  sourceCitationAuthorsList: document.getElementById("sourceCitationAuthorsList"),
  addSourceCitationAuthorButton: document.getElementById("addSourceCitationAuthorButton"),
  sourceCitationInstitutionalAuthorInput: document.getElementById("sourceCitationInstitutionalAuthorInput"),
  sourceCitationNewsAgenciesInput: document.getElementById("sourceCitationNewsAgenciesInput"),
  sourceCitationEditorsInput: document.getElementById("sourceCitationEditorsInput"),
  sourceCitationContributorsInput: document.getElementById("sourceCitationContributorsInput"),
  sourceCitationTranslatorsField: document.getElementById("sourceCitationTranslatorsField"),
  sourceCitationTranslatorsList: document.getElementById("sourceCitationTranslatorsList"),
  addSourceCitationTranslatorButton: document.getElementById("addSourceCitationTranslatorButton"),
  sourceCitationAuthorHint: document.getElementById("sourceCitationAuthorHint"),
  sourceCitationContainerLabel: document.getElementById("sourceCitationContainerLabel"),
  sourceCitationContainerTitleInput: document.getElementById("sourceCitationContainerTitleInput"),
  sourceCitationPublisherInput: document.getElementById("sourceCitationPublisherInput"),
  sourceCitationPublisherPlaceInput: document.getElementById("sourceCitationPublisherPlaceInput"),
  sourceCitationVolumeInput: document.getElementById("sourceCitationVolumeInput"),
  sourceCitationIssueInput: document.getElementById("sourceCitationIssueInput"),
  sourceCitationPageRangeInput: document.getElementById("sourceCitationPageRangeInput"),
  sourceCitationIssuedYearInput: document.getElementById("sourceCitationIssuedYearInput"),
  sourceCitationIssuedDateInput: document.getElementById("sourceCitationIssuedDateInput"),
  sourceCitationEditionInput: document.getElementById("sourceCitationEditionInput"),
  sourceCitationVersionStatementInput: document.getElementById("sourceCitationVersionStatementInput"),
  sourceCitationIssuedHint: document.getElementById("sourceCitationIssuedHint"),
  sourceCitationDoiInput: document.getElementById("sourceCitationDoiInput"),
  sourceCitationUrlInput: document.getElementById("sourceCitationUrlInput"),
  sourceCitationArchiveUrlInput: document.getElementById("sourceCitationArchiveUrlInput"),
  sourceCitationAccessedDateInput: document.getElementById("sourceCitationAccessedDateInput"),
  sourceCitationAccessedHint: document.getElementById("sourceCitationAccessedHint"),
  sourceCitationDoiHint: document.getElementById("sourceCitationDoiHint"),
  sourceCitationUrlHint: document.getElementById("sourceCitationUrlHint"),
  sourceCitationStyleInput: document.getElementById("sourceCitationStyleInput"),
  sourceCitationShortOutput: document.getElementById("sourceCitationShortOutput"),
  sourceCitationFullOutput: document.getElementById("sourceCitationFullOutput"),
  copyShortCitationButton: document.getElementById("copyShortCitationButton"),
  copyFullCitationButton: document.getElementById("copyFullCitationButton"),
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
  lineNumberToggleCheck: document.getElementById("lineNumberToggleCheck"),
  lineNumberDialogOverlay: document.getElementById("lineNumberDialogOverlay"),
  lineNumberDialog: document.getElementById("lineNumberDialog"),
  lineNumberDialogCloseButton: document.getElementById("lineNumberDialogCloseButton"),
  lineNumberDialogCancelButton: document.getElementById("lineNumberDialogCancelButton"),
  lineNumberDialogSaveButton: document.getElementById("lineNumberDialogSaveButton"),
  lineNumberEnabledInput: document.getElementById("lineNumberEnabledInput"),
  lineNumberModeInput: document.getElementById("lineNumberModeInput"),
  lineNumberIncludeBlankInput: document.getElementById("lineNumberIncludeBlankInput"),
  lineNumberFromInput: document.getElementById("lineNumberFromInput"),
  lineNumberIntervalInput: document.getElementById("lineNumberIntervalInput"),
  lineNumberStartInput: document.getElementById("lineNumberStartInput"),
  spellcheckToggleButton: document.getElementById("spellcheckToggleButton"),
  spellcheckToggleCheck: document.getElementById("spellcheckToggleCheck"),
  chapterNumbersToggleButton: document.getElementById("chapterNumbersToggleButton"),
  chapterNumbersToggleCheck: document.getElementById("chapterNumbersToggleCheck"),
  previewPage: document.querySelector(".preview-page"),
  typeStage: document.querySelector(".type-stage"),
  previewText: document.getElementById("previewText"),
  previewRenderProgress: document.getElementById("previewRenderProgress"),
  previewRenderProgressLabel: document.getElementById("previewRenderProgressLabel"),
  previewRenderProgressBar: document.getElementById("previewRenderProgressBar"),
  textInputHighlight: document.getElementById("textInputHighlight"),
};

function normalizeMarkdownHeadingText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function stripInlineMarkdownSyntax(value) {
  let text = stripOriginalPageMarkers(value);
  let previous = "";
  while (text && text !== previous) {
    previous = text;
    text = text
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/`([^`\n]+)`/g, "$1")
      .replace(/==([^=\n]+)==/g, "$1")
      .replace(/~~([^~\n]+)~~/g, "$1")
      .replace(/\*\*([^*\n]+)\*\*/g, "$1")
      .replace(/__([^_\n]+)__/g, "$1")
      .replace(/\*([^*\n]+)\*/g, "$1")
      .replace(/_([^_\n]+)_/g, "$1");
  }
  return normalizeMarkdownHeadingText(text);
}

function getPlainDocumentLabel(value, fallback = "") {
  return stripInlineMarkdownSyntax(value) || fallback;
}

function findOriginalPageMarkers(value) {
  const source = String(value || "");
  const pattern = new RegExp(ORIGINAL_PAGE_MARKER_SOURCE, "gi");
  return Array.from(source.matchAll(pattern), (match) => ({
    raw: match[0],
    label: match[0].slice(1, -1),
    start: match.index,
    end: match.index + match[0].length,
  }));
}

function isOriginalPageMarker(value) {
  const trimmed = String(value || "").trim();
  const markers = findOriginalPageMarkers(trimmed);
  return markers.length === 1 && markers[0].start === 0 && markers[0].end === trimmed.length;
}

function stripOriginalPageMarkers(value) {
  const source = String(value || "");
  const pattern = new RegExp(`[ \\t]*${ORIGINAL_PAGE_MARKER_SOURCE}[ \\t]*`, "gi");
  return source.replace(pattern, (match, offset) => {
    const before = source[offset - 1] || "";
    const after = source[offset + match.length] || "";
    const hadWhitespace = /^[ \t]/.test(match) || /[ \t]$/.test(match);
    if (!hadWhitespace || !before || !after) return "";
    // Nach schließenden Satzzeichen bleibt der Abstand erhalten; vor ihnen
    // dagegen nicht. So wird etwa "Text, [42] weiter" zu "Text, weiter".
    if (/^[,.;:!?…%)\]}]/u.test(after)) return "";
    if (/^[([{„‚«‹]/u.test(before)) return "";
    return " ";
  });
}

function normalizeImportedOriginalPageMarkers(value) {
  const pageLabel = "([0-9]+|[ivxlcdm]+)";
  return String(value || "")
    // Wikisource/EPUB kann die sichtbare Seitenzahl innerhalb oder zusammen
    // mit den Klammern hervorheben. Im TypeMap-Markdown ist Paginierung dagegen
    // stets unformatiertes [42]/[iv], damit sie semantisch erkannt und ausgeblendet wird.
    .replace(new RegExp(`\\[\\s*(?:\\*\\*|__)\\s*${pageLabel}\\s*(?:\\*\\*|__)\\s*\\]`, "gi"), "[$1]")
    .replace(new RegExp(`(?:\\*\\*|__)\\s*\\[\\s*${pageLabel}\\s*\\]\\s*(?:\\*\\*|__)`, "gi"), "[$1]");
}

function findFootnoteReferences(value) {
  const source = String(value || "");
  const pattern = new RegExp(FOOTNOTE_REFERENCE_SOURCE, "g");
  return Array.from(source.matchAll(pattern), (match) => ({
    raw: match[0],
    label: match[1],
    start: match.index,
    end: match.index + match[0].length,
  }));
}

function getFootnoteDefinition(value) {
  const match = String(value || "").match(/^\s*\[\^([^\]\r\n]+)\]:[ \t]*(.*)$/s);
  return match ? { label: match[1], content: match[2] } : null;
}

function getOpeningTitleHeading(rawText) {
  const source = String(rawText || "");
  const lines = source.matchAll(/(?:^|\r\n|\r|\n)([^\r\n]*)/g);
  for (const lineResult of lines) {
    const line = lineResult[1];
    const headingMatch = line.match(/^\s*#\s+([^\r\n]+)/);
    if (!headingMatch) continue;
    if (getParatextHeadingKind(line)) continue;
    return getPlainDocumentLabel(headingMatch[1]);
  }
  return "";
}

function projectStartsWithTitleHeading(project) {
  const title = normalizeMarkdownHeadingText(project?.title || "");
  return Boolean(title) && getOpeningTitleHeading(project?.source?.rawText || "") === title;
}

function replaceFirstDocumentTitleHeading(rawText, nextHeading, acceptedTitles = []) {
  const source = String(rawText || "");
  const accepted = new Set(acceptedTitles.map((title) => normalizeMarkdownHeadingText(title)).filter(Boolean));
  const linePattern = /^(\s*)#\s+([^\r\n]*)(\r?\n|$)/gm;
  let match;
  while ((match = linePattern.exec(source))) {
    const fullLine = match[0];
    if (getParatextHeadingKind(fullLine)) continue;
    const headingTitle = getPlainDocumentLabel(match[2]);
    if (accepted.size && !accepted.has(headingTitle)) continue;
    return `${source.slice(0, match.index)}${match[1]}${nextHeading}${match[3]}${source.slice(match.index + fullLine.length)}`;
  }
  return null;
}

function createChapterRoleKey(level, title) {
  return `${Math.max(1, Number(level) || 1)}:${getPlainDocumentLabel(title).toLocaleLowerCase("de")}`;
}

function getExplicitChapterRole(project, level, title) {
  const role = project?.chapterRoles?.[createChapterRoleKey(level, title)];
  return CHAPTER_ROLES.has(role) ? role : "";
}

function ensureDocumentStructure(rawText, fallbackTitle = "Unbenanntes Dokument") {
  const source = String(rawText || "");
  let titleLine = "";
  const content = [];
  source.split(/\r?\n/).forEach((line) => {
    if (!titleLine && /^#\s+/.test(line) && !getParatextHeadingKind(line)) {
      titleLine = line.trim();
      return;
    }
    content.push(line);
  });
  if (!titleLine) titleLine = `# ${normalizeMarkdownHeadingText(fallbackTitle)}`;
  const body = content.join("\n").trim();
  return [
    titleLine,
    body,
  ].filter((part) => part !== "").join("\n\n") + "\n";
}

function migrateLegacyChapterRoles(project) {
  const rawText = String(project?.source?.rawText || "");
  if (!project || !/(?:^|\n)(?:#\s*Paratext\s*\(|:::\s*(?:paratext\s+)?(?:front|back|frontmatter|backmatter))/i.test(rawText)) return;
  let matter = "body";
  const roles = { ...(project.chapterRoles || {}) };
  rawText.split(/\r?\n/).forEach((line) => {
    const nextMatter = getParatextMarkerKind(line);
    if (nextMatter) {
      matter = nextMatter;
      return;
    }
    if (/^#\s+/.test(line) && !getParatextHeadingKind(line)) {
      matter = "body";
      return;
    }
    const match = line.match(/^(#{2,7})\s+(.+)$/);
    if (!match || isTableOfContentsText(line)) return;
    const role = matter === "front" ? "foreword" : matter === "back" ? "afterword" : "main";
    roles[createChapterRoleKey(match[1].length, match[2])] = role;
  });
  project.chapterRoles = roles;
}

function syncProjectTitleHeading(project, previousTitle = null) {
  if (!project?.source) return;
  if (project.citationSource) project.citationSource.title = project.title;
  const title = normalizeMarkdownHeadingText(project.title || "Unbenanntes Dokument");
  if (!title) return;
  const rawText = String(project.source.rawText || "");
  const previous = previousTitle == null ? null : normalizeMarkdownHeadingText(previousTitle);
  const openingHeading = getOpeningTitleHeading(rawText);
  const nextHeading = `# ${title}`;
  if (!rawText.trim()) {
    project.source.rawText = ensureDocumentStructure(`${nextHeading}\n\n`, title);
    return;
  }
  if (openingHeading && (openingHeading === title || (previous && openingHeading === previous))) {
    project.source.rawText = ensureDocumentStructure(replaceFirstDocumentTitleHeading(rawText, nextHeading, [title, previous]) || rawText, title);
    return;
  }
  if (!openingHeading) {
    project.source.rawText = ensureDocumentStructure(`${nextHeading}\n\n${rawText.replace(/^\s+/, "")}`, title);
    return;
  }
  project.source.rawText = ensureDocumentStructure(rawText, title);
}

function syncProjectTitleFromHeading(project, options = {}) {
  const headingTitle = getOpeningTitleHeading(project?.source?.rawText || "");
  if (!headingTitle || !project) return;
  if (project.title !== headingTitle) {
    project.title = headingTitle;
    if (project.citationSource) project.citationSource.title = headingTitle;
  }
  if (options.normalizeStructure) project.source.rawText = ensureDocumentStructure(project.source.rawText || "", project.title);
}

const APP_FONTS = [
  { label: "Univers Modern", family: "CMU Serif", css: "'CMU Serif', 'Computer Modern Serif', Georgia, serif", source: "app" },
  { label: "Roboto", family: "Roboto", css: "'Roboto', Arial, Helvetica, sans-serif", source: "app" },
  { label: "Garamond", family: "EB Garamond", css: "'EB Garamond', Garamond, Georgia, serif", source: "app" },
  { label: "Source Sans 3", family: "Source Sans 3", css: "'Source Sans 3', Arial, sans-serif", source: "app" },
  { label: "Source Code Pro", family: "Source Code Pro", css: "'Source Code Pro', 'Courier New', monospace", source: "app" },
];

const state = {
  projects: [],
  activeProjectId: null,
  autosaveTimer: null,
  sourceModel: null,
  layoutModel: null,
  activeWorkspaceSection: "preview",
  activeSourceRange: null,
  expandedProjectIds: [],
  expandedTreeNodeIds: [],
  collapsedTreeNodeIds: [],
  expandedContentNodeIds: [],
  projectBrowserRenderTimer: 0,
  detailsLayoutMode: "normal",
  detailsLayoutStep: 0,
  editorZoom: 1,
  editorDataView: "markdown",
  generateSourceMode: "web",
  selectedWikisourcePage: null,
  wikisourceSearchResults: [],
  jsonEditorDraft: "",
  jsonEditorDraftProjectId: null,
  jsonEditorApplyTimer: 0,
  sideTocUpdateTimer: 0,
  previewDirty: true,
  previewRenderedProjectId: null,
  previewRenderToken: 0,
  editorGeometryFrame: 0,
  editorResizeObserver: null,
  editorMeasurementInput: null,
  editorInlineMeasurement: null,
  projectActivationToken: 0,
  lineNumberStartIsAutomatic: true,
};

function createId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}-${Date.now().toString(36)}`;
}

function createDefaultMetadata() {
  /*
   * ARCHITEKTURREGEL: metadata.textKind beschreibt ausschließlich den bewusst
   * gewählten Darstellungsstil. Bibliografische Angaben – insbesondere
   * citationSource.source_type – dürfen diesen Wert weder setzen noch ableiten.
   */
  return {
    textKind: "article",
    stylePresetVersion: DOCUMENT_STYLE_PRESET_VERSION,
  };
}

function normalizeTranscriptionMetadata(value) {
  const source = value && typeof value === "object" ? value : {};
  return {
    source_kind: source.source_kind === "pdf" ? "pdf" : String(source.source_kind || "pdf"),
    source_reference: String(source.source_reference || ""),
    extraction_basis: ["embedded_text", "ocr", "mixed", "manual", "unknown"].includes(source.extraction_basis)
      ? source.extraction_basis
      : "unknown",
    notes: Array.isArray(source.notes) ? source.notes.map(String) : [],
    uncertain_passages: Array.isArray(source.uncertain_passages)
      ? source.uncertain_passages.filter((entry) => entry && typeof entry === "object").map((entry) => ({ ...entry }))
      : [],
  };
}

// Later citation sections extend this record; parallel metadata trees would create conflicting sources of truth.
function createDefaultCitationSource(title = "") {
  return {
    source_type: "other",
    title,
    subtitle: "",
    lead: "",
    language: "de",
    text_version: "original",
    original_title: "",
    original_language: "",
    authors: "",
    institutional_author: "",
    news_agencies: "",
    editors: "",
    contributors: "",
    translators: "",
    container_title: "",
    publisher: "",
    publisher_place: "",
    volume: "",
    issue: "",
    page_range: "",
    issued_year: "",
    issued_date: "",
    edition: "",
    version_statement: "",
    doi: "",
    url: "",
    archive_url: "",
    accessed_date: "",
    citation_style: "Hausstil",
    short_citation: "",
    full_citation: "",
  };
}

function normalizeCitationSource(value, project, legacySource = null) {
  /*
   * ARCHITEKTURREGEL: citationSource ist die bibliografische Ebene. Ihre
   * Normalisierung darf keine Satz-, Schrift- oder Dokumentstilwerte verändern.
   * Ein bibliografischer Quellentyp kann mit jedem Darstellungsstil kombiniert werden.
   */
  const metadata = project?.metadata || {};
  const source = value && typeof value === "object" ? value : {};
  const legacy = legacySource && typeof legacySource === "object" ? legacySource : {};
  const normalized = {
    ...createDefaultCitationSource(project.title),
    subtitle: metadata.subtitle || "",
    language: metadata.language || project.style?.language || "de",
    ...legacy,
    ...source,
  };
  if (!["book", "book_chapter", "journal_article", "newspaper_article", "webpage", "blog_post", "report", "legal_text", "court_decision", "manuscript", "letter", "email", "other"].includes(normalized.source_type)) normalized.source_type = "other";
  normalized.title = String(normalized.title || "");
  normalized.subtitle = String(normalized.subtitle || "");
  normalized.lead = String(normalized.lead || "");
  normalized.language = String(normalized.language || "de");
  [
    "authors", "institutional_author", "news_agencies", "editors", "contributors", "translators", "original_title",
    "original_language", "container_title", "publisher",
    "publisher_place", "volume", "issue", "page_range", "issued_year", "issued_date", "edition",
    "version_statement", "doi", "url", "archive_url", "accessed_date",
  ].forEach((field) => {
    normalized[field] = String(normalized[field] || "");
  });
  const styleMap = {
    apa: "APA",
    chicago: "Chicago",
    mla: "MLA",
    din_iso_690: "DIN ISO 690",
    house: "Hausstil",
  };
  normalized.citation_style = styleMap[normalized.citation_style] || normalized.citation_style;
  if (!["original", "translation"].includes(normalized.text_version)) normalized.text_version = "original";
  if (!["APA", "Chicago", "MLA", "DIN ISO 690", "Hausstil"].includes(normalized.citation_style)) normalized.citation_style = "Hausstil";
  normalized.short_citation = String(normalized.short_citation || "");
  normalized.full_citation = String(normalized.full_citation || "");
  delete normalized.working_title;
  return normalized;
}

function sourceTextTypeFromDocumentKind(textKind) {
  if (textKind === "notes") return "note";
  if (textKind === "code") return "note";
  return "prose";
}

const DOCUMENT_STYLE_REGISTRY = window.TypeMapDocumentStyles || { styles: {}, order: [] };
const DOCUMENT_STYLE_PRESETS = DOCUMENT_STYLE_REGISTRY.styles || {};
const DOCUMENT_STYLE_ORDER = DOCUMENT_STYLE_REGISTRY.order?.length
  ? DOCUMENT_STYLE_REGISTRY.order
  : Object.keys(DOCUMENT_STYLE_PRESETS);
const LEGACY_DOCUMENT_STYLE_MAP = {
  report: "article",
  artikel: "article",
  buchkapitel: "paper",
  gedicht: "notebook",
  drama: "notebook",
  brief: "notebook",
  "wissenschaftlicher-text": "paper",
  vertrag: "article",
  notiz: "notebook",
  essay: "article",
  feature: "article",
  technical: "article",
  notes: "article",
  code: "article",
  manuscript: "notebook",
  letter: "notebook",
  minimal: "notebook",
};

function getDocumentStylePreset(textKind) {
  return DOCUMENT_STYLE_PRESETS[textKind] || null;
}

function getEffectiveBodyFontFamily(project) {
  const preset = getDocumentStylePreset(project?.metadata?.textKind);
  // „Artikel“ besitzt eine definierte Satzschrift. Diese fachliche Stilregel
  // hat Vorrang vor veralteten Einzelwerten aus früher gespeicherten Dateien.
  if (project?.metadata?.textKind === "article" && preset?.style?.fontFamily) {
    return preset.style.fontFamily;
  }
  return project?.style?.fontFamily || preset?.style?.fontFamily || "serif";
}

function getLeadPresentation(project, titleScale = {}) {
  const preset = getDocumentStylePreset(project?.metadata?.textKind);
  const style = project?.style || {};
  return {
    fontFamily: style.leadFontFamily || preset?.style?.leadFontFamily || style.fontFamily,
    fontWeight: Number(style.leadWeight ?? preset?.style?.leadWeight) || 400,
    fontSize: Number(titleScale.lead ?? preset?.titleScale?.lead) || 1,
    lineHeight: Number(titleScale.leadLineHeight ?? preset?.titleScale?.leadLineHeight) || 1.42,
  };
}

function normalizeDocumentStyleId(value) {
  const raw = String(value || "").trim();
  const mapped = LEGACY_DOCUMENT_STYLE_MAP[raw] || raw;
  return DOCUMENT_STYLE_PRESETS[mapped] ? mapped : (DOCUMENT_STYLE_ORDER[0] || "article");
}

function populateDocumentStyleSelect(select) {
  if (!select) return;
  clearElement(select);
  DOCUMENT_STYLE_ORDER.forEach((styleId) => {
    const preset = DOCUMENT_STYLE_PRESETS[styleId];
    if (!preset) return;
    const option = document.createElement("option");
    option.value = styleId;
    option.textContent = preset.label || styleId;
    option.title = preset.purpose || "";
    select.appendChild(option);
  });
}

function applyDocumentStylePreset(project, textKind, options = {}) {
  /*
   * Stilzuweisungen erfolgen nur über einen ausdrücklichen Nutzer-, Erstellungs-
   * oder Migrationsvorgang. Diese Funktion darf niemals aufgrund eines
   * citationSource-Feldes oder einer bibliografischen Quellenart aufgerufen werden.
   */
  const normalizedTextKind = normalizeDocumentStyleId(textKind);
  const preset = getDocumentStylePreset(normalizedTextKind);
  if (!project || !preset) return;
  const { includeFontSize = true } = options;
  project.style = {
    ...project.style,
    ...preset.style,
    fontSize: includeFontSize ? preset.style.fontSize : project.style.fontSize,
  };
  project.style.hyphenationSettings = normalizeHyphenationSettings(
    {
      ...(project.style.hyphenationSettings || {}),
      mode: preset.style.hyphenation,
      language: preset.style.language,
    },
    preset.style.hyphenation,
    preset.style.language,
  );
  project.style.hyphenation = project.style.hyphenationSettings.mode;
  project.style.language = project.style.hyphenationSettings.language;
  enableAutoHyphenationForJustifiedText(project);
  project.typography = {
    ...createDefaultTypography(),
    ...(project.typography || {}),
    headingScale: { ...preset.headingScale },
    titleScale: { ...preset.titleScale },
  };
  project.metadata = {
    ...createDefaultMetadata(),
    ...(project.metadata || {}),
    textKind: normalizedTextKind,
    stylePresetVersion: DOCUMENT_STYLE_PRESET_VERSION,
  };
  project.source.textType = sourceTextTypeFromDocumentKind(normalizedTextKind);
}

function createDefaultTypography() {
  return {
    projectFonts: [],
    headingScale: {},
    titleScale: {},
  };
}

function createDefaultLineNumbering() {
  return {
    enabled: false,
    mode: "source-lines",
    includeBlankLines: false,
    fromLine: 1,
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
    fromLine: clampInteger(source.fromLine, fallback.fromLine, 1, 99999),
    interval: clampInteger(source.interval, fallback.interval, 1, 100),
    start: clampInteger(source.start, fallback.start, 0, 99999),
  };
}

function getProjectLineNumbering(project) {
  return normalizeLineNumbering(
    project?.source?.lineNumbering || project?.style?.lineNumbering,
    project?.style?.lineNumbers,
  );
}

function getDisplayedLineNumber(countedLine, lineNumbering) {
  const relativeLine = countedLine - lineNumbering.fromLine + 1;
  if (relativeLine < 1 || relativeLine % lineNumbering.interval !== 0) return null;
  return lineNumbering.start + (relativeLine / lineNumbering.interval - 1) * lineNumbering.interval;
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

function enableAutoHyphenationForJustifiedText(project) {
  if (!project?.style || project.style.textAlign !== "justify") return;
  project.style.hyphenationSettings = normalizeHyphenationSettings(
    {
      ...(project.style.hyphenationSettings || {}),
      mode: "auto",
    },
    "auto",
    project.style.language,
  );
  project.style.hyphenation = project.style.hyphenationSettings.mode;
  project.style.language = project.style.hyphenationSettings.language;
}

function normalizePersonList(value) {
  const list = Array.isArray(value) ? value : typeof value === "string" ? [value] : [""];
  const normalized = list.map((entry) => String(entry || "").trim()).filter(Boolean);
  return normalized.length ? normalized : [""];
}

function getDisplayedAuthors(project) {
  const citationAuthors = splitCitationAuthors(project?.citationSource?.authors).filter(Boolean);
  if (citationAuthors.length) return citationAuthors;
  // Nicht normalisierte Altdokumente dürfen ihren früheren Autorennamen einmalig
  // anzeigen; aktuelle Dokumente beziehen die Autorenzeile ausschließlich aus citationSource.
  if (!project?.citationSource) return normalizePersonList(project?.metadata?.authors).filter(Boolean);
  return [];
}

function normalizeProjectFonts(value) {
  return [];
}

function createDefaultProject(title = "Neues Dokument") {
  const project = {
    id: createId("typemap-project"),
    title,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    source: {
      rawText: ensureDocumentStructure(`# ${normalizeMarkdownHeadingText(title)}\n`, title),
      textType: "prose",
      lineNumbering: createDefaultLineNumbering(),
    },
    style: {
      fontFamily: "'CMU Serif', 'Computer Modern Serif', Georgia, serif",
      fontSize: 14,
      lineHeight: 1.38,
      measure: 64,
      textAlign: "left",
      ligatures: true,
      hyphenation: "manual",
      language: "de",
      spellcheck: false,
      chapterNumbers: false,
      hyphenationSettings: createDefaultHyphenationSettings(),
    },
    metadata: createDefaultMetadata(),
    citationSource: null,
    typography: createDefaultTypography(),
    paratextVisibility: {},
    chapterRoles: {},
    tocVisible: true,
  };
  project.citationSource = createDefaultCitationSource(title);
  applyDocumentStylePreset(project, project.metadata.textKind);
  return project;
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
    paratextVisibility: {
      ...(project?.paratextVisibility || {}),
    },
    chapterRoles: {
      ...(project?.chapterRoles || {}),
    },
  };
  if (project?.metadata?.transcription || normalized.metadata.transcription) {
    normalized.metadata.transcription = normalizeTranscriptionMetadata(normalized.metadata.transcription);
  }
  normalized.id = String(normalized.id || createId("typemap-project"));
  normalized.title = String(normalized.title || "Unbenanntes Dokument");
  normalized.source.rawText = normalizeTocObjectMarkers(
    removeLegacyCitationHeading(String(normalized.source.rawText || "")),
  );
  delete normalized.chapterRoles?.[createChapterRoleKey(2, "Quellenangabe")];
  delete normalized.chapterRoles?.[createChapterRoleKey(2, "Inhaltsverzeichnis")];
  migrateLegacyChapterRoles(normalized);
  syncProjectTitleHeading(normalized);
  normalized.tocVisible = normalized.tocVisible !== false;
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
  normalized.style.spellcheck = normalized.style.spellcheck === true;
  normalized.style.chapterNumbers = normalized.style.chapterNumbers === true;
  normalized.source.lineNumbering = normalizeLineNumbering(
    project?.source?.lineNumbering || project?.style?.lineNumbering,
    project?.style?.lineNumbers,
  );
  delete normalized.style.lineNumbering;
  delete normalized.style.lineNumbers;
  normalized.style.hyphenationSettings = normalizeHyphenationSettings(
    normalized.style.hyphenationSettings,
    normalized.style.hyphenation,
    normalized.style.language,
  );
  normalized.style.hyphenation = normalized.style.hyphenationSettings.mode;
  normalized.style.language = normalized.style.hyphenationSettings.language;
  const rawTextKind = String(normalized.metadata.textKind || fallback.metadata.textKind);
  const wasLegacyTextKind = Boolean(LEGACY_DOCUMENT_STYLE_MAP[rawTextKind]);
  const storedPresetVersion = Number(project?.metadata?.stylePresetVersion) || 0;
  normalized.metadata.textKind = normalizeDocumentStyleId(rawTextKind);
  const preset = getDocumentStylePreset(normalized.metadata.textKind);
  // Frühere Dokumente speicherten Stilname und konkrete Schriftwerte getrennt.
  // Die einmalige Migration bringt beide wieder zusammen; danach schützt die
  // Versionsnummer bewusste individuelle Anpassungen vor erneutem Überschreiben.
  if (preset && (storedPresetVersion < DOCUMENT_STYLE_PRESET_VERSION || wasLegacyTextKind || !normalized.style.titleFontFamily)) {
    applyDocumentStylePreset(normalized, normalized.metadata.textKind);
  }
  if (normalized.metadata.textKind === "article" && preset?.style?.fontFamily) {
    normalized.style.fontFamily = preset.style.fontFamily;
  }
  normalized.metadata.stylePresetVersion = DOCUMENT_STYLE_PRESET_VERSION;
  if (preset && (!normalized.typography.headingScale || !Object.keys(normalized.typography.headingScale).length)) {
    normalized.typography.headingScale = { ...preset.headingScale };
  }
  if (preset && (!normalized.typography.titleScale || !Object.keys(normalized.typography.titleScale).length)) {
    normalized.typography.titleScale = { ...preset.titleScale };
  }
  // Einweg-Migration aus dem früheren Dokumentkopf-Modell; das alte Feld wird
  // nicht in den normalisierten Projektzustand übernommen.
  const legacyMetadataAuthors = normalizePersonList(project?.metadata?.authors).filter(Boolean);
  const legacyMetadataContributors = normalizePersonList(project?.metadata?.contributors).filter(Boolean);
  normalized.source.textType = sourceTextTypeFromDocumentKind(normalized.metadata.textKind);
  ["rightsHolder", "copyrightYear", "license", "allowUse", "allowEdit", "allowShare", "attribution"]
    .forEach((legacyRightField) => delete normalized.metadata[legacyRightField]);
  const hadCitationRecord = Boolean(project?.citationSource && typeof project.citationSource === "object")
    || Boolean(project?.sourceCitation && typeof project.sourceCitation === "object");
  normalized.citationSource = normalizeCitationSource(project?.citationSource, normalized, project?.sourceCitation);
  if (normalized.sourceMetadata?.format === "wikisource") {
    // ARCHITEKTURREGEL: Die Quellenangabe beschreibt das Werk; URLs und
    // Abrufstände der importierten Wikisource-Fassung gehören ausschließlich
    // in den Provenienz-Snapshot und dürfen nicht parallel geführt werden.
    if (normalized.citationSource.url === normalized.sourceMetadata.canonical_url) {
      normalized.citationSource.url = "";
      normalized.citationSource.accessed_date = "";
    }
    if (normalized.metadata.transcription?.source_kind === "wikisource") {
      delete normalized.metadata.transcription;
    }
    normalized.sourceMetadata.exported_at ||= getWikisourceEpubExportDate(normalized.source.rawText);
    normalized.source.rawText = normalizeImportedOriginalPageMarkers(
      cleanStoredWikisourceMarkdown(normalized.source.rawText, normalized.title),
    );
    delete normalized.sourceMetadata.source_statement;
  }
  if (!hadCitationRecord && !normalized.citationSource.authors) {
    normalized.citationSource.authors = legacyMetadataAuthors.join("; ");
  }
  if (!hadCitationRecord && !normalized.citationSource.contributors) {
    normalized.citationSource.contributors = legacyMetadataContributors.join("; ");
  }
  [
    "authors", "showAuthors", "subtitle", "language", "contributors", "createdDate", "modifiedDate",
    "status", "version", "publishedDate", "tags", "description",
  ].forEach((legacyMetadataField) => delete normalized.metadata[legacyMetadataField]);
  normalized.title = normalized.citationSource.title || normalized.title;
  normalized.citationSource.title = normalized.title;
  const citationLegacy = {
    ...(project?.citationLegacy || {}),
    ...(project?.sourceCitation?.working_title ? { working_title: project.sourceCitation.working_title } : {}),
  };
  if (Object.keys(citationLegacy).length) normalized.citationLegacy = citationLegacy;
  else delete normalized.citationLegacy;
  delete normalized.sourceCitation;
  delete normalized.textObject;
  syncProjectTitleHeading(normalized);
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

function isTreeNodeExplicitlyCollapsed(nodeId) {
  return state.collapsedTreeNodeIds.includes(nodeId);
}

function setTreeNodeExpanded(nodeId, isExpanded) {
  if (!nodeId) return;
  const expanded = new Set(state.expandedTreeNodeIds);
  const collapsed = new Set(state.collapsedTreeNodeIds);
  if (isExpanded) {
    expanded.add(nodeId);
    collapsed.delete(nodeId);
  } else {
    expanded.delete(nodeId);
    collapsed.add(nodeId);
  }
  state.expandedTreeNodeIds = Array.from(expanded);
  state.collapsedTreeNodeIds = Array.from(collapsed);
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

function normalizeParatextKind(value) {
  const kind = String(value || "").toLowerCase().trim();
  if (kind === "front" || kind === "frontmatter") return "front";
  if (kind === "back" || kind === "backmatter") return "back";
  return "body";
}

function getParatextHeadingKind(text) {
  const match = String(text || "").trim().match(PARATEXT_HEADING_PATTERN);
  if (!match) return null;
  const label = getPlainDocumentLabel(match[1])
    .toLowerCase()
    .replace(/[()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (label === "paratext" || /^paratexte?\s+anfang$/.test(label) || label === "frontmatter") return "front";
  if (/^paratexte?\s+ende$/.test(label) || label === "backmatter") return "back";
  return null;
}

function getParatextMarkerKind(text) {
  const value = String(text || "").trim();
  const headingKind = getParatextHeadingKind(value);
  if (headingKind) return headingKind;
  const startMatch = value.match(PARATEXT_START_PATTERN);
  if (startMatch) return normalizeParatextKind(startMatch[1]);
  if (PARATEXT_END_PATTERN.test(value)) return "body";
  return null;
}

function isParatextMarker(text) {
  return getParatextMarkerKind(text) !== null;
}

function isTableOfContentsText(text) {
  const value = String(text || "").trim();
  return value === TOC_OBJECT_MARKER || value.toLowerCase() === LEGACY_TOC_OBJECT_HEADING.toLowerCase();
}

function normalizeTocObjectMarkers(rawText) {
  let markerWritten = false;
  return String(rawText || "")
    .split(/\r?\n/)
    .flatMap((line) => {
      if (!isTableOfContentsText(line)) return [line];
      if (markerWritten) return [];
      markerWritten = true;
      return [TOC_OBJECT_MARKER];
    })
    .join("\n");
}

function isCitationObjectText(text) {
  return String(text || "").trim().toLowerCase() === CITATION_OBJECT_MARKER;
}

function hasCitationObject(project) {
  return /(?:^|\r?\n)\s*\{\{citation\}\}\s*(?=\r?\n|$)/i.test(String(project?.source?.rawText || ""));
}

function hasTableOfContentsObject(project) {
  return /(?:^|\r?\n)\s*(?:\{\{toc\}\}|##\s*Inhaltsverzeichnis)\s*(?=\r?\n|$)/i.test(String(project?.source?.rawText || ""));
}

function syncTableOfContentsMenuState(project = getActiveProject()) {
  const hasObject = hasTableOfContentsObject(project);
  const isVisible = hasObject && project?.tocVisible !== false;
  if (ui.insertTableOfContentsButton) ui.insertTableOfContentsButton.hidden = hasObject;
  if (ui.tableOfContentsVisibilityButton) {
    ui.tableOfContentsVisibilityButton.hidden = !hasObject;
    ui.tableOfContentsVisibilityButton.setAttribute("aria-pressed", String(isVisible));
  }
  if (ui.tableOfContentsVisibilityCheck) ui.tableOfContentsVisibilityCheck.hidden = !isVisible;
}

function getMarkdownBlockType(text) {
  const value = String(text || "");
  if (isTableOfContentsText(value)) return "toc";
  if (isCitationObjectText(value)) return "citation";
  if (isParatextMarker(value)) return "paratext-marker";
  if (/^#{1,7}\s+/.test(value)) return "heading";
  if (/^\|.+\|\s*(\n\|?\s*:?-{3,}:?\s*\|.*)?/m.test(value)) return "table";
  if (/^```/.test(value)) return "code";
  if (/^>\s?/m.test(value)) return "quote";
  if (value.split("\n").filter(Boolean).every((line) => /^[-*]\s+/.test(line))) return "list";
  if (value.split("\n").filter(Boolean).every((line) => /^\d+\.\s+/.test(line))) return "list";
  return "paragraph";
}

function createParatextVisibilityKey(node) {
  if (!node || !["front", "back"].includes(node.matter)) return "";
  return `${node.matter}:${node.type}:${node.startOffset}`;
}

function createMarkdownBlockNode(block, index) {
  const headingMatch = String(block.text || "").match(/^(#{1,7})\s+(.+)$/);
  const blockType = getMarkdownBlockType(block.text);
  // Eingebettete Strukturhilfen bleiben eigenständige Objekte. Würde etwa
  // das Inhaltsverzeichnis als Überschrift behandelt, würde der folgende
  // Haupttext im Dokumentbaum fälschlich zu seinem untergeordneten Inhalt.
  const type = ["paratext-marker", "toc", "citation"].includes(blockType)
    ? blockType
    : headingMatch
      ? "heading"
      : blockType;
  const title = type === "heading" && headingMatch
    ? getPlainDocumentLabel(headingMatch[2], "Ohne Titel")
    : type === "toc"
      ? "Inhaltsverzeichnis (toc)"
      : type === "citation"
        ? "Quellenangabe (citation)"
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
    level: type === "heading" && headingMatch ? headingMatch[1].length : null,
    title,
    text: block.text,
    startOffset: block.startOffset,
    endOffset: block.endOffset,
    matter: block.matter || "body",
    visibilityKey: createParatextVisibilityKey({
      type,
      matter: block.matter || "body",
      startOffset: block.startOffset,
    }),
    children: [],
  };
}

function buildDocumentTree(blocks, rawText, project = null) {
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

  function closeStackTo(sectionLevel, startOffset) {
    while (stack.length > 1 && stack[stack.length - 1].level >= sectionLevel) {
      const closed = stack.pop().node;
      closed.endOffset = startOffset;
    }
  }

  blocks.forEach((block, index) => {
    const node = createMarkdownBlockNode(block, index);
    if (node.type === "paratext-marker") return;
    if (node.type === "heading") {
      if (node.level === 1) {
        return;
      }
      const sectionLevel = Math.max(1, node.level - 1);
      closeStackTo(sectionLevel, node.startOffset);
      const explicitRole = getExplicitChapterRole(project, node.level, node.title);
      const hasMainAncestor = stack.some((entry) => entry.node.effectiveRole === "main");
      const effectiveRole = explicitRole || (hasMainAncestor ? "main" : "");
      sectionCounters.length = sectionLevel;
      if (effectiveRole === "main") sectionCounters[sectionLevel - 1] = (sectionCounters[sectionLevel - 1] || 0) + 1;
      const section = {
        id: `section-${index + 1}-${node.startOffset}`,
        type: "section",
        matter: "body",
        level: sectionLevel,
        markdownLevel: node.level,
        roleKey: createChapterRoleKey(node.level, node.title),
        explicitRole,
        effectiveRole,
        number: effectiveRole === "main" ? sectionCounters.slice(0, sectionLevel).filter(Boolean).join(".") : "",
        title: node.title,
        startOffset: node.startOffset,
        endOffset: rawText.length,
        headingNodeId: node.id,
        visibilityKey: "",
        children: [],
      };
      stack[stack.length - 1].node.children.push(section);
      stack.push({ level: sectionLevel, node: section });
      return;
    }
    stack[stack.length - 1].node.children.push(node);
  });

  while (stack.length > 1) stack.pop().node.endOffset = rawText.length;
  return documentNode;
}

function collectDocumentSections(node, sections = []) {
  if (!node) return sections;
  if (node.type === "section") {
    sections.push({
      id: node.id,
      title: node.title,
      level: node.level,
      matter: node.matter || "body",
      markdownLevel: node.markdownLevel || (node.level + 1),
      roleKey: node.roleKey || "",
      explicitRole: node.explicitRole || "",
      effectiveRole: node.effectiveRole || "",
      startOffset: node.startOffset,
      endOffset: node.endOffset,
      visibilityKey: node.visibilityKey || createParatextVisibilityKey(node),
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
  let paragraphMatter = "body";
  let currentMatter = "body";
  let hasDocumentTitle = false;

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
      matter: paragraphMatter,
    });
    paragraphLines = [];
    paragraphMatter = currentMatter;
  }

  function pushSingleLineBlock(line) {
    const id = `paragraph-${paragraphs.length + 1}`;
    paragraphs.push({
      id,
      type: "paragraph",
      text: line.text,
      startOffset: line.startOffset,
      endOffset: line.endOffset,
      lineIds: [line.id],
      matter: currentMatter,
    });
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
      matter: currentMatter,
    };
    sourceLines.push(line);

    const isParatextHeadingMarker = getParatextHeadingKind(text) === "front";
    const paratextMarkerKind = isParatextHeadingMarker
      ? (hasDocumentTitle ? "back" : "front")
      : getParatextMarkerKind(text);
    if (paratextMarkerKind) {
      flushParagraph(startOffset);
      pushSingleLineBlock(line);
      currentMatter = paratextMarkerKind;
      paragraphMatter = currentMatter;
      cursor = endOffset + 1;
      return;
    }

    if (/^#\s+/.test(text.trim()) && currentMatter === "front") {
      flushParagraph(startOffset);
      currentMatter = "body";
      paragraphMatter = currentMatter;
    }

    if (isTableOfContentsText(text)) {
      flushParagraph(startOffset);
      pushSingleLineBlock(line);
      cursor = endOffset + 1;
      return;
    }

    if (isCitationObjectText(text)) {
      flushParagraph(startOffset);
      pushSingleLineBlock(line);
      cursor = endOffset + 1;
      return;
    }

    if (getFootnoteDefinition(text)) {
      // Eine direkt folgende Definitionszeile ist ein eigenständiges
      // Markdown-Objekt, beendet aber ohne Freizeile nicht den laufenden Absatz.
      // So bleibt der Textfluss semantisch erhalten, während die Definition
      // unabhängig von ihrem Speicherort aufgelöst werden kann.
      pushSingleLineBlock(line);
      cursor = endOffset + 1;
      return;
    }

    if (/^#{1,7}\s+/.test(text.trim())) {
      flushParagraph(startOffset);
      pushSingleLineBlock(line);
      if (/^#\s+/.test(text.trim()) && !isParatextMarker(text)) {
        hasDocumentTitle = true;
        currentMatter = "body";
        paragraphMatter = currentMatter;
      }
      cursor = endOffset + 1;
      return;
    }

    if (text.trim()) {
      if (!paragraphLines.length) {
        paragraphStart = startOffset;
        paragraphMatter = currentMatter;
      }
      paragraphLines.push(line);
    } else {
      flushParagraph(endOffset);
    }

    cursor = endOffset + 1;
  });
  flushParagraph(rawText.length);
  // Direkt eingeschobene Fußnotendefinitionen werden bereits beim Lesen
  // angelegt; die Quellposition stellt anschließend die Dokumentreihenfolge her.
  paragraphs.sort((left, right) => left.startOffset - right.startOffset || left.endOffset - right.endOffset);
  const documentTree = buildDocumentTree(paragraphs, rawText, project);
  const sections = collectDocumentSections(documentTree);
  const getSectionAtOffset = (offset) => {
    const matches = sections.filter((section) => offset >= section.startOffset && offset < section.endOffset);
    return matches.sort((a, b) => b.level - a.level)[0] || null;
  };
  paragraphs.forEach((paragraph) => {
    const section = getSectionAtOffset(paragraph.startOffset);
    paragraph.chapterRole = section?.effectiveRole || "";
    paragraph.chapterNumber = section?.number || "";
  });
  sourceLines.forEach((line) => {
    const section = getSectionAtOffset(line.startOffset);
    line.chapterRole = section?.effectiveRole || "";
    line.chapterNumber = section?.number || "";
  });

  return {
    version: 1,
    rawText,
    originalLines: sourceLines,
    semanticRanges: paragraphs.map((paragraph) => ({
      id: paragraph.id,
      type: paragraph.type,
      matter: paragraph.matter || "body",
      chapterRole: paragraph.chapterRole || "",
      chapterNumber: paragraph.chapterNumber || "",
      startOffset: paragraph.startOffset,
      endOffset: paragraph.endOffset,
    })),
    paragraphs,
    documentTree,
    sections,
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
      matter: paragraph.matter || "body",
      chapterRole: paragraph.chapterRole || "",
      chapterNumber: paragraph.chapterNumber || "",
      visibleLines: [],
    })),
    sourceLineBlocks: originalLines.map((line) => ({
      id: `layout-source-${line.id}`,
      sourceLineId: line.id,
      sourceStartOffset: line.startOffset,
      sourceEndOffset: line.endOffset,
      blockIndex: line.index,
      text: line.text,
      matter: line.matter || "body",
      chapterRole: line.chapterRole || "",
      chapterNumber: line.chapterNumber || "",
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

function appendSmallCapsGlyphText(parent, value) {
  const text = String(value || "");
  let cursor = 0;
  for (const match of text.matchAll(/f/g)) {
    if (match.index > cursor) parent.appendChild(document.createTextNode(text.slice(cursor, match.index)));
    const glyph = document.createElement("span");
    glyph.className = "preview-small-caps-f";
    // EB Garamonds smcp-Zuordnung lässt das f in einzelnen Browser-Shapern als
    // Minuskel stehen. c2sc adressiert dieselbe entworfene Kapitälchenglyphe
    // zuverlässig vom versalen F aus, ohne die übrigen Zeichen zu verändern.
    glyph.textContent = "F";
    parent.appendChild(glyph);
    cursor = match.index + 1;
  }
  if (cursor < text.length) parent.appendChild(document.createTextNode(text.slice(cursor)));
}

function appendTextNode(parent, text, options = {}) {
  const source = String(text || "");
  if (!source) return;
  if (options.smallCaps === false) {
    parent.appendChild(document.createTextNode(source));
    return;
  }
  const uppercaseWordPattern = /\p{Lu}+/gu;
  const tokens = [];
  let tokenMatch;
  while ((tokenMatch = uppercaseWordPattern.exec(source))) {
    const word = tokenMatch[0];
    const start = tokenMatch.index;
    const end = start + word.length;
    const previous = source[start - 1] || "";
    const next = source[end] || "";
    if (/[\p{L}\p{N}]/u.test(previous) || /[\p{L}\p{N}]/u.test(next)) continue;
    tokens.push({ word, start, end, isLong: word.length >= 2 });
  }
  const smallCapsRanges = [];
  tokens.forEach((token, index) => {
    const previous = tokens[index - 1];
    const next = tokens[index + 1];
    const previousSeparator = previous ? source.slice(previous.end, token.start) : "";
    const nextSeparator = next ? source.slice(token.end, next.start) : "";
    const joinsPrevious = previous && previousSeparator.length > 0
      && /^[^\p{L}\p{N}]*$/u.test(previousSeparator);
    const joinsNext = next && nextSeparator.length > 0
      && /^[^\p{L}\p{N}]*$/u.test(nextSeparator);
    const isInsideUppercasePhrase = (joinsPrevious && previous.isLong) || (joinsNext && next.isLong);
    if (token.isLong || isInsideUppercasePhrase) {
      smallCapsRanges.push(token);
    }
  });
  const mergedSmallCapsRanges = [];
  smallCapsRanges.forEach((range) => {
    const previous = mergedSmallCapsRanges[mergedSmallCapsRanges.length - 1];
    const separator = previous ? source.slice(previous.end, range.start) : "";
    if (previous && separator && /^[^\p{L}\p{N}]*$/u.test(separator)) {
      previous.end = range.end;
      return;
    }
    mergedSmallCapsRanges.push({ start: range.start, end: range.end });
  });
  let cursor = 0;
  mergedSmallCapsRanges.forEach(({ start, end }) => {
    if (start > cursor) parent.appendChild(document.createTextNode(source.slice(cursor, start)));
    const span = document.createElement("span");
    span.className = "preview-small-caps";
    appendSmallCapsGlyphText(span, source.slice(start, end).toLocaleLowerCase("de-DE"));
    parent.appendChild(span);
    cursor = end;
  });
  if (cursor < source.length) {
    parent.appendChild(document.createTextNode(source.slice(cursor)));
  }
}

function appendInlineMarkdown(parent, text, options = {}) {
  text = stripOriginalPageMarkers(text);
  const pattern = /(`[^`\n]+`|==[^=\n]+==|\*\*[^*]+\*\*|__[^_\n]+__|\*[^*\n]+\*|_[^_\n]+_|\[\^[^\]\n]+\]|\[[^\]]+\]\([^)]+\))/g;
  let cursor = 0;
  String(text).replace(pattern, (match, _token, offset) => {
    if (offset > cursor) appendTextNode(parent, text.slice(cursor, offset), options);
    let node;
    if (match.startsWith("`")) {
      node = document.createElement("code");
      node.textContent = match.slice(1, -1);
    } else if (match.startsWith("==")) {
      node = document.createElement("mark");
      appendTextNode(node, match.slice(2, -2), options);
    } else if (match.startsWith("**")) {
      node = document.createElement("strong");
      appendTextNode(node, match.slice(2, -2), options);
    } else if (match.startsWith("__")) {
      node = document.createElement("strong");
      appendTextNode(node, match.slice(2, -2), options);
    } else if (match.startsWith("*")) {
      node = document.createElement("em");
      appendTextNode(node, match.slice(1, -1), options);
    } else if (match.startsWith("_")) {
      node = document.createElement("em");
      appendTextNode(node, match.slice(1, -1), options);
    } else if (match.startsWith("[^")) {
      node = document.createElement("sup");
      node.className = "preview-footnote-reference";
      const footnoteLabel = match.slice(2, -1);
      node.textContent = footnoteLabel;
      node.dataset.footnoteLabel = footnoteLabel;
      node.setAttribute("aria-label", `Fußnote ${footnoteLabel}`);
    } else {
      const linkMatch = match.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      node = document.createElement("a");
      appendTextNode(node, linkMatch?.[1] || match, options);
      node.href = linkMatch?.[2] || "#";
      node.rel = "noopener noreferrer";
      node.target = "_blank";
    }
    parent.appendChild(node);
    cursor = offset + match.length;
    return match;
  });
  if (cursor < text.length) appendTextNode(parent, text.slice(cursor), options);
}

function createMarkdownBlockElement(block, textType, options = {}) {
  const text = String(block.text || "");
  if (isTableOfContentsText(text)) {
    const object = document.createElement("p");
    object.className = "preview-embedded-object preview-toc-object";
    const capsule = document.createElement("span");
    capsule.className = "preview-object-capsule";
    capsule.textContent = "Inhaltsverzeichnis";
    object.appendChild(capsule);
    return object;
  }
  if (isCitationObjectText(text)) {
    const object = document.createElement("div");
    object.className = "preview-embedded-object preview-citation-object";
    const citationText = document.createElement("p");
    citationText.className = "preview-citation-text";
    const project = options.project || getActiveProject();
    const citation = normalizeCitationSource(project?.citationSource, project);
    const formatted = formatSourceCitation(citation);
    const titleIndex = formatted.italicTitle ? formatted.full.indexOf(formatted.italicTitle) : -1;
    // Bibliografische Großschreibung ist bedeutungstragend und bleibt deshalb
    // außerhalb der Kapitälchen-Transformation des Fließtexts.
    const appendCitationText = (target, value) => {
      if (value) target.appendChild(document.createTextNode(value));
    };
    if (titleIndex < 0) {
      appendCitationText(citationText, formatted.full);
    } else {
      appendCitationText(citationText, formatted.full.slice(0, titleIndex));
      const title = document.createElement("em");
      appendCitationText(title, formatted.italicTitle);
      citationText.appendChild(title);
      appendCitationText(citationText, formatted.full.slice(titleIndex + formatted.italicTitle.length));
    }
    object.appendChild(citationText);
    return object;
  }
  const footnoteDefinition = getFootnoteDefinition(text);
  if (footnoteDefinition) {
    const footnote = document.createElement("aside");
    footnote.className = "preview-footnote-definition";
    const label = document.createElement("sup");
    label.className = "preview-footnote-definition-label";
    label.textContent = footnoteDefinition.label;
    const content = document.createElement("span");
    appendInlineMarkdown(content, footnoteDefinition.content);
    footnote.append(label, content);
    return footnote;
  }
  if (textType === "lyric" && !text.trim()) {
    const blankLine = document.createElement("p");
    blankLine.className = "preview-blank-line";
    blankLine.textContent = "\u00a0";
    return blankLine;
  }
  const headingMatch = text.match(/^(#{1,7})\s+(.+)$/);
  if (headingMatch) {
    const headingLevel = headingMatch[1].length;
    const heading = document.createElement(`h${Math.min(6, headingLevel)}`);
    heading.className = `preview-heading preview-heading-level-${headingLevel}`;
    heading.dataset.headingLevel = String(headingLevel);
    const headingLabel = options.chapterNumbers === true
      && block.chapterRole === "main"
      && block.chapterNumber
      ? `${block.chapterNumber} ${headingMatch[2]}`
      : headingMatch[2];
    appendInlineMarkdown(heading, headingLabel, { smallCaps: false });
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

function isTableOfContentsBlock(block) {
  return isTableOfContentsText(block?.text || "");
}

function isOriginalPageMarkerBlock(block) {
  return isOriginalPageMarker(block?.text || "");
}

function isParatextMarkerBlock(block) {
  return isParatextMarker(String(block?.text || ""));
}

function getMarkdownHeadingLevel(text) {
  const match = String(text || "").match(/^(#{1,7})\s+/);
  return match ? match[1].length : 0;
}

function getPreviewHeadingId(sourceStartOffset) {
  return `typemap-heading-${sourceStartOffset}`;
}

function isTableOfContentsSection(section) {
  return getPlainDocumentLabel(section?.title || "").trim().toLowerCase() === "inhaltsverzeichnis";
}

function jumpPreviewStageToHeading(heading) {
  if (!heading || !ui.typeStage) return;
  const stageRect = ui.typeStage.getBoundingClientRect();
  const headingRect = heading.getBoundingClientRect();
  const nextTop = ui.typeStage.scrollTop + (headingRect.top - stageRect.top) - 18;
  ui.typeStage.scrollTo({
    top: Math.max(0, nextTop),
    left: ui.typeStage.scrollLeft,
    behavior: "auto",
  });
}

function getActivePreviewHeadingStart() {
  if (!ui.typeStage || !ui.previewText) return "";
  const headings = Array.from(ui.previewText.querySelectorAll(".preview-heading-anchor"));
  if (!headings.length) return "";
  const stageRect = ui.typeStage.getBoundingClientRect();
  const markerY = stageRect.top + Math.min(150, Math.max(70, stageRect.height * 0.18));
  let activeHeading = headings[0];
  for (const heading of headings) {
    const rect = heading.getBoundingClientRect();
    if (rect.top <= markerY) {
      activeHeading = heading;
    } else {
      break;
    }
  }
  return activeHeading?.dataset?.sourceStart || "";
}

function updateSideTableOfContentsState(nav = null) {
  const tocNodes = nav ? [nav] : Array.from(document.querySelectorAll(".preview-side-toc"));
  if (!tocNodes.length) return;
  const activeStart = getActivePreviewHeadingStart();
  tocNodes.forEach((toc) => {
    const items = Array.from(toc.querySelectorAll(".preview-side-toc-item"));
    if (!items.length) return;
    const activeItem = items.find((item) => item.dataset.sourceStart === activeStart) || null;
    const activePath = new Set();
    let pathItem = activeItem;
    while (pathItem) {
      const itemId = pathItem.dataset.tocId || "";
      if (!itemId || activePath.has(itemId)) break;
      activePath.add(itemId);
      const parentId = pathItem.dataset.tocParentId || "";
      pathItem = parentId
        ? items.find((item) => item.dataset.tocId === parentId)
        : null;
    }
    items.forEach((item) => {
      const level = Number(item.dataset.tocLevel) || 1;
      const parentId = item.dataset.tocParentId || "";
      const isVisible = level <= 1 || activePath.has(parentId);
      const isActive = item === activeItem;
      item.hidden = !isVisible;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-current", isActive ? "true" : "false");
    });
    const list = toc.querySelector(".preview-side-toc-list");
    if (activeItem && list instanceof HTMLElement && !activeItem.hidden) {
      const listRect = list.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      const comfortTop = listRect.top + listRect.height * 0.28;
      const comfortBottom = listRect.top + listRect.height * 0.72;
      if (itemRect.top < comfortTop || itemRect.bottom > comfortBottom) {
        const delta = itemRect.top - (listRect.top + listRect.height * 0.38);
        list.scrollTo({
          top: Math.max(0, list.scrollTop + delta),
          behavior: "smooth",
        });
      }
    }
  });
}

function scheduleSideTableOfContentsStateUpdate() {
  window.cancelAnimationFrame(state.sideTocUpdateTimer);
  state.sideTocUpdateTimer = window.requestAnimationFrame(() => {
    updateSideFootnotePlacement();
    updateSideTableOfContentsState();
    updateSideFootnotesState();
  });
}

function collectReferencedFootnotes(blocks, hiddenParatextRanges = []) {
  const definitions = new Map();
  const referencedLabels = [];
  const seenReferences = new Set();
  blocks.forEach((block) => {
    if (isBlockHiddenByParatextVisibility(block, hiddenParatextRanges)) return;
    const definition = getFootnoteDefinition(block.text);
    if (definition) {
      if (!definitions.has(definition.label)) definitions.set(definition.label, definition.content);
      return;
    }
    findFootnoteReferences(block.text).forEach(({ label }) => {
      if (seenReferences.has(label)) return;
      seenReferences.add(label);
      referencedLabels.push(label);
    });
  });
  // Die Position und Reihenfolge der Darstellung folgen den Verweisen im
  // Fließtext. Der Ablageort einer Markdown-Definition ist dafür unerheblich.
  return referencedLabels
    .filter((label) => definitions.has(label))
    .map((label) => ({ label, content: definitions.get(label) }));
}

function getVisiblePreviewFootnoteLabels() {
  if (!ui.typeStage || !ui.previewText) return [];
  const viewport = ui.typeStage.getBoundingClientRect();
  const labels = [];
  const seen = new Set();
  ui.previewText.querySelectorAll(".preview-footnote-reference[data-footnote-label]").forEach((reference) => {
    const rect = reference.getBoundingClientRect();
    const label = reference.dataset.footnoteLabel || "";
    if (!label || seen.has(label) || rect.bottom < viewport.top || rect.top > viewport.bottom) return;
    seen.add(label);
    labels.push(label);
  });
  return labels;
}

function updateSideFootnotesState(rail = null) {
  const hosts = rail
    ? Array.from(rail.querySelectorAll(".preview-side-footnotes-host"))
    : Array.from(document.querySelectorAll(".preview-side-footnotes-host"));
  if (!hosts.length) return;
  const visibleLabels = new Set(getVisiblePreviewFootnoteLabels());
  hosts.forEach((host) => {
    const list = host.querySelector(".preview-side-footnotes-list");
    if (!(list instanceof HTMLElement)) return;
    const signature = Array.from(visibleLabels).join("\u001f");
    if (list.dataset.visibleSignature !== signature) {
      list.dataset.visibleSignature = signature;
      list.scrollTop = 0;
    }
    list.querySelectorAll(".preview-side-footnote").forEach((footnote) => {
      footnote.hidden = !visibleLabels.has(footnote.dataset.footnoteLabel || "");
    });
  });
}

function updateSideFootnotePlacement() {
  const page = ui.previewPage;
  const rightRail = page?.querySelector(".preview-side-footnotes-rail");
  const leftRail = page?.querySelector(".preview-side-rail");
  if (!page || !rightRail || !leftRail || !ui.previewText || !ui.typeStage) return;

  const textRect = ui.previewText.getBoundingClientRect();
  const stageRect = ui.typeStage.getBoundingClientRect();
  const styles = getComputedStyle(page);
  const gap = Math.max(0, leftRail.getBoundingClientRect().left) || 56;
  const minimumWidth = Number.parseFloat(styles.getPropertyValue("--preview-side-min-width")) || 220;
  const rightEdge = stageRect.right - gap;
  const leftEdge = textRect.right + gap;
  const useRightRail = rightEdge - leftEdge >= minimumWidth;

  page.classList.toggle("has-right-footnote-rail", useRightRail);
  leftRail.classList.toggle("has-right-footnotes", useRightRail);
  if (useRightRail) {
    page.style.setProperty("--preview-right-rail-left", `${leftEdge}px`);
    page.style.setProperty("--preview-right-rail-right", `${Math.max(0, window.innerWidth - rightEdge)}px`);
  } else {
    page.style.removeProperty("--preview-right-rail-left");
    page.style.removeProperty("--preview-right-rail-right");
  }
}

function renderSideTableOfContents(targetPage, targetText, project, layoutModel, blocks, hiddenParatextRanges = []) {
  targetPage.querySelector(".preview-side-toc")?.remove();
  targetPage.querySelector(".preview-side-footnotes-rail")?.remove();
  targetPage.classList.remove("has-side-toc", "has-side-rail");
  targetPage.classList.remove("has-right-footnote-rail");
  if (targetText !== ui.previewText) return { hasFootnotes: false };
  if (layoutModel.activeRange && layoutModel.activeRange.id !== "document-root") return { hasFootnotes: false };

  const sourceModel = buildSourceModel(project);
  const sections = (sourceModel.sections || []).filter((section) => (
    !isTableOfContentsSection(section)
    && !isBlockHiddenByParatextVisibility({
      matter: section.matter,
      sourceStartOffset: section.startOffset,
    }, hiddenParatextRanges)
  ));
  const hasTocMarker = blocks.some((block) => (
    isTableOfContentsBlock(block) && !isBlockHiddenByParatextVisibility(block, hiddenParatextRanges)
  ));
  const showToc = project?.tocVisible !== false && hasTocMarker && sections.length > 0;
  const footnotes = collectReferencedFootnotes(blocks, hiddenParatextRanges);
  if (!showToc && !footnotes.length) return { hasFootnotes: false };

  // Die Randspalte ist eine reine Projektion der Dokumentstruktur. Fußnoten
  // bleiben im Quelldokument erhalten und werden hier nur viewportbezogen angezeigt.
  const rail = document.createElement("aside");
  rail.className = "preview-side-toc preview-side-rail";
  rail.classList.toggle("has-footnotes", footnotes.length > 0);
  rail.setAttribute("aria-label", "Dokumentnavigation und Fußnoten");

  const tocSection = document.createElement("nav");
  tocSection.className = "preview-side-toc-section";
  tocSection.setAttribute("aria-label", "Inhaltsverzeichnis");
  if (!showToc) tocSection.classList.add("is-empty");
  const tocTitle = document.createElement("span");
  tocTitle.className = "preview-side-toc-title";
  tocTitle.textContent = "Inhaltsverzeichnis";
  tocSection.appendChild(tocTitle);
  const list = document.createElement("div");
  list.className = "preview-side-toc-list";
  tocSection.appendChild(list);
  rail.appendChild(tocSection);

  const sectionStack = [];
  (showToc ? sections : []).forEach((section) => {
    const level = Math.max(1, Number(section.level) || 1);
    while (sectionStack.length && sectionStack[sectionStack.length - 1].level >= level) {
      sectionStack.pop();
    }
    const parentId = sectionStack[sectionStack.length - 1]?.id || "";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "preview-side-toc-item";
    button.style.setProperty("--toc-level", String(level - 1));
    button.dataset.sourceStart = String(section.startOffset);
    button.dataset.tocId = section.id;
    button.dataset.tocParentId = parentId;
    button.dataset.tocLevel = String(level);
    button.textContent = section.title;
    button.addEventListener("click", () => {
      const heading = document.getElementById(getPreviewHeadingId(section.startOffset));
      if (heading && targetText.contains(heading)) {
        jumpPreviewStageToHeading(heading);
        window.setTimeout(() => updateSideTableOfContentsState(rail), 0);
      }
    });
    list.appendChild(button);
    sectionStack.push({ id: section.id, level });
  });

  const footnoteSection = document.createElement("section");
  footnoteSection.className = "preview-side-footnotes-section preview-side-footnotes-host";
  footnoteSection.setAttribute("aria-label", "Fußnoten im sichtbaren Textbereich");
  if (!footnotes.length) footnoteSection.classList.add("is-empty");
  const footnoteTitle = document.createElement("span");
  footnoteTitle.className = "preview-side-toc-title";
  footnoteTitle.textContent = "Fußnoten";
  footnoteSection.appendChild(footnoteTitle);
  const footnoteList = document.createElement("div");
  footnoteList.className = "preview-side-footnotes-list";
  footnotes.forEach(({ label, content }) => {
    const item = document.createElement("article");
    item.className = "preview-side-footnote";
    item.dataset.footnoteLabel = label;
    item.hidden = true;
    const itemLabel = document.createElement("sup");
    itemLabel.className = "preview-side-footnote-label";
    itemLabel.textContent = label;
    const itemContent = document.createElement("div");
    itemContent.className = "preview-side-footnote-content";
    appendInlineMarkdown(itemContent, content, { smallCaps: false });
    item.append(itemLabel, itemContent);
    footnoteList.appendChild(item);
  });
  footnoteSection.appendChild(footnoteList);
  rail.appendChild(footnoteSection);

  const rightFootnoteRail = footnotes.length ? footnoteSection.cloneNode(true) : null;
  if (rightFootnoteRail) {
    rightFootnoteRail.className = "preview-side-footnotes-section preview-side-footnotes-host preview-side-footnotes-rail";
    rightFootnoteRail.setAttribute("aria-label", "Fußnoten im sichtbaren Textbereich");
  }

  targetPage.classList.add("has-side-rail");
  if (showToc) targetPage.classList.add("has-side-toc");
  targetPage.insertBefore(rail, targetText);
  if (rightFootnoteRail) targetPage.insertBefore(rightFootnoteRail, targetText);
  updateSideTableOfContentsState(rail);
  return { hasFootnotes: footnotes.length > 0 };
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

function getLastTextContentBottom(element) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  let lastNode = null;
  let lastCharacterIndex = -1;
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = String(node.nodeValue || "");
    for (let index = text.length - 1; index >= 0; index -= 1) {
      if (!/\s/.test(text[index])) {
        lastNode = node;
        lastCharacterIndex = index;
        break;
      }
    }
  }
  if (!lastNode || lastCharacterIndex < 0) return null;
  const range = document.createRange();
  range.setStart(lastNode, lastCharacterIndex);
  range.setEnd(lastNode, lastCharacterIndex + 1);
  const rects = Array.from(range.getClientRects()).filter((rect) => rect.height > 0);
  range.detach();
  return rects.at(-1)?.bottom ?? null;
}

function shouldExcludeBlockFromLineNumbering(block) {
  const chapterRole = block?.dataset?.chapterRole || "";
  const isHeading = block?.matches?.("h1,h2,h3,h4,h5,h6") === true
    || Array.from(block?.classList || []).some((className) => /^preview-heading-level-/.test(className));
  return block?.dataset?.matter !== "body"
    || (chapterRole && chapterRole !== "main")
    || isHeading
    || block?.classList?.contains("preview-embedded-object") === true;
}

function isNumberedBodyBlock(block) {
  const chapterRole = block?.chapterRole || "";
  return (block?.matter || "body") === "body"
    && (!chapterRole || chapterRole === "main")
    && !getMarkdownHeadingLevel(block?.text);
}

function renderLineNumberLayer(targetText, lineNumbering) {
  targetText.querySelector(".preview-line-number-layer")?.remove();
  if (!lineNumbering.enabled) return;

  const layer = document.createElement("div");
  layer.className = "preview-line-number-layer";
  targetText.appendChild(layer);

  const targetRect = targetText.getBoundingClientRect();
  const blocks = Array.from(targetText.querySelectorAll(".preview-body-block"));
  let lastContentIndex = -1;
  blocks.forEach((block, index) => {
    if (!shouldExcludeBlockFromLineNumbering(block)
      && block.dataset.sourceBlankLine !== "true"
      && block.textContent.trim()) lastContentIndex = index;
  });
  let lineIndex = 0;

  blocks.forEach((block, blockIndex) => {
    if (blockIndex > lastContentIndex || shouldExcludeBlockFromLineNumbering(block)) return;
    if (lineNumbering.mode === "source-lines" && block.dataset.sourceBlankLine === "true" && !lineNumbering.includeBlankLines) {
      return;
    }
    let visualRects = lineNumbering.mode === "source-lines"
      ? getVisualLineRects(block)
      : [block.getBoundingClientRect()].filter((rect) => rect.width > 0 && rect.height > 0);
    if (blockIndex === lastContentIndex) {
      const lastTextBottom = getLastTextContentBottom(block);
      if (lastTextBottom !== null) visualRects = visualRects.filter((rect) => rect.top < lastTextBottom + 1);
    }

    visualRects.forEach((rect) => {
      lineIndex += 1;
      const lineNumber = getDisplayedLineNumber(lineIndex, lineNumbering);
      if (lineNumber === null) return;
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

function getDocumentTitleAlignment(project) {
  const textType = project?.source?.textType || "prose";
  if (textType === "lyric") return "left";
  const align = project?.style?.textAlign || "left";
  return align === "center" || align === "right" ? align : "left";
}

function createPreviewDocumentHead(project, options = {}) {
  const { includeTitle = true, align = getDocumentTitleAlignment(project) } = options;
  const metadata = project.metadata || {};
  const title = String(project.title || "").trim();
  const subtitle = String(project.citationSource?.subtitle || "").trim();
  const lead = String(project.citationSource?.lead || "").trim();
  const authors = getDisplayedAuthors(project);
  const authorsFirst = metadata.textKind === "paper";
  if ((!includeTitle || !title) && !subtitle && !lead && !authors.length) return null;

  const head = document.createElement("header");
  head.className = "preview-document-head";
  head.classList.toggle("is-authors-first", authorsFirst);
  head.style.textAlign = align;
  const appendAuthors = () => {
    if (!authors.length) return;
    const authorElement = document.createElement("p");
    authorElement.className = "preview-document-authors";
    authorElement.textContent = authors.join("; ");
    head.appendChild(authorElement);
  };
  if (authorsFirst) appendAuthors();
  if (includeTitle && title) {
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
  if (!authorsFirst) appendAuthors();
  if (lead) {
    const leadElement = document.createElement("p");
    leadElement.className = "preview-document-lead";
    leadElement.textContent = lead;
    head.appendChild(leadElement);
  }
  return head;
}

function renderTextView(targetPage, targetText, project, layoutModel) {
  if (!targetPage || !targetText) return;
  const style = project.style;
  const bodyFontFamily = getEffectiveBodyFontFamily(project);
  const headingScale = {
    ...(getDocumentStylePreset(project.metadata?.textKind)?.headingScale || {}),
    ...(project.typography?.headingScale || {}),
  };
  const titleScale = {
    ...(getDocumentStylePreset(project.metadata?.textKind)?.titleScale || {}),
    ...(project.typography?.titleScale || {}),
  };
  if (project.metadata?.textKind === "paper") {
    titleScale.authors = 1;
    titleScale.authorsLineHeight = 1.3;
  }
  const leadPresentation = getLeadPresentation(project, titleScale);
  const textType = project.source.textType || "prose";
  const lineNumbering = getProjectLineNumbering(project);
  const documentTitleAlign = getDocumentTitleAlignment(project);
  const hyphenationSettings = normalizeHyphenationSettings(style.hyphenationSettings, style.hyphenation, style.language);
  targetPage.style.setProperty("--preview-line-height", String(textType === "lyric" ? 1.5 : style.lineHeight));
  targetPage.style.setProperty("--preview-measure", `${style.measure}ch`);
  targetPage.style.setProperty("--preview-body-font", bodyFontFamily);
  targetPage.style.setProperty(
    "--preview-strong-font",
    project.metadata?.textKind === "article" ? '"TypeMap EB Garamond Semibold", serif' : bodyFontFamily,
  );
  targetPage.style.setProperty("--preview-title-font", style.titleFontFamily || style.fontFamily);
  targetPage.style.setProperty("--preview-title-weight", String(Number(style.titleWeight) || 700));
  targetPage.style.setProperty("--preview-subtitle-font", style.subtitleFontFamily || style.titleFontFamily || style.fontFamily);
  targetPage.style.setProperty("--preview-subtitle-weight", String(Number(style.subtitleWeight) || 400));
  targetPage.style.setProperty("--preview-lead-font", leadPresentation.fontFamily);
  targetPage.style.setProperty("--preview-lead-weight", String(leadPresentation.fontWeight));
  targetPage.style.setProperty("--preview-meta-font", style.metaFontFamily || style.subtitleFontFamily || style.fontFamily);
  targetPage.style.setProperty("--preview-meta-weight", String(Number(style.metaWeight) || 400));
  targetPage.style.setProperty("--preview-heading-font", style.headingFontFamily || style.fontFamily);
  targetPage.style.setProperty("--preview-heading-weight", String(Number(style.headingWeight) || 700));
  targetPage.style.setProperty("--preview-heading-space-before", `${Number(style.headingSpacingBefore ?? getDocumentStylePreset(project.metadata?.textKind)?.style?.headingSpacingBefore) || 1.2}em`);
  targetPage.style.setProperty("--preview-quote-font", style.quoteFontFamily || style.fontFamily);
  targetPage.style.setProperty("--preview-code-font", style.codeFontFamily || "'Source Code Pro', 'Courier New', monospace");
  targetPage.style.setProperty("--preview-code-size", `max(8px, calc(var(--preview-font-size) - ${ptToPx(3)}px))`);
  targetPage.style.setProperty("--preview-paragraph-spacing", `${Number(style.paragraphSpacing) || 0}em`);
  targetPage.style.setProperty("--preview-first-line-indent", style.firstLineIndent ? "1.3em" : "0");
  for (let level = 1; level <= 7; level += 1) {
    targetPage.style.setProperty(`--preview-heading-${level}`, `${Number(headingScale[level]) || 1}em`);
  }
  targetPage.style.setProperty("--preview-title-size", `${Number(titleScale.title) || 1.48}em`);
  targetPage.style.setProperty("--preview-subtitle-size", `${Number(titleScale.subtitle) || 0.86}em`);
  targetPage.style.setProperty("--preview-lead-size", `${leadPresentation.fontSize}em`);
  targetPage.style.setProperty("--preview-authors-size", `${Number(titleScale.authors) || 0.76}em`);
  targetPage.style.setProperty("--preview-title-line-height", String(Number(titleScale.titleLineHeight) || 1.12));
  targetPage.style.setProperty("--preview-subtitle-line-height", String(Number(titleScale.subtitleLineHeight) || 1.28));
  targetPage.style.setProperty("--preview-lead-line-height", String(leadPresentation.lineHeight));
  targetPage.style.setProperty("--preview-authors-line-height", String(Number(titleScale.authorsLineHeight) || 1.28));
  targetText.style.fontFamily = bodyFontFamily;
  targetText.classList.toggle("has-first-line-indent", style.firstLineIndent === true);
  targetText.classList.toggle("has-italic-quotes", style.quoteStyle === "italic");
  targetText.style.textAlign = textType === "lyric" ? "left" : style.textAlign;
  targetText.lang = hyphenationSettings.language;
  targetText.style.hyphens = hyphenationSettings.mode;
  targetText.style.setProperty("-webkit-hyphens", hyphenationSettings.mode);
  targetText.style.setProperty("hyphenate-limit-lines", String(hyphenationSettings.consecutiveLines));
  targetText.style.setProperty("hyphenate-limit-chars", `${hyphenationSettings.minWordLength} ${hyphenationSettings.before} ${hyphenationSettings.after}`);
  targetText.style.setProperty("-webkit-hyphenate-limit-lines", String(hyphenationSettings.consecutiveLines));
  targetText.style.setProperty("-webkit-hyphenate-limit-before", String(hyphenationSettings.before));
  targetText.style.setProperty("-webkit-hyphenate-limit-after", String(hyphenationSettings.after));
  targetText.classList.toggle("has-line-numbers", lineNumbering.enabled === true);
  targetText.classList.toggle("has-ligatures", style.ligatures !== false);
  targetText.classList.remove("is-text-type-prose", "is-text-type-lyric", "is-text-type-drama", "is-text-type-note");
  targetText.classList.add(`is-text-type-${textType}`);
  clearElement(targetText);

  const isScopedSection = layoutModel.activeRange && layoutModel.activeRange.id !== "document-root";
  const hasSourceTitleHeading = !isScopedSection && projectStartsWithTitleHeading(project);
  const documentHead = !isScopedSection
    ? createPreviewDocumentHead(project, {
      includeTitle: true,
      align: getDocumentTitleAlignment(project),
    })
    : null;
  if (documentHead) targetText.appendChild(documentHead);

  const blocks = lineNumbering.mode === "source-lines" && textType === "lyric"
    ? (layoutModel.sourceLineBlocks || [])
    : layoutModel.blocks;
  const hiddenParatextRanges = collectHiddenParatextRanges(project, state.sourceModel || null);
  const sideRail = renderSideTableOfContents(targetPage, targetText, project, layoutModel, blocks, hiddenParatextRanges);

  if (!blocks.length) {
    const empty = document.createElement("p");
    empty.className = "preview-empty";
    empty.textContent = "Beginne unten mit deinem Text.";
    targetText.appendChild(empty);
    scheduleLineNumberLayer(targetText, lineNumbering);
    return;
  }

  blocks.forEach((block, index) => {
    if (isBlockHiddenByParatextVisibility(block, hiddenParatextRanges)) return;
    if (isTableOfContentsBlock(block) || isOriginalPageMarkerBlock(block) || isParatextMarkerBlock(block)) return;
    // In der interaktiven Gesamtansicht übernimmt die Randspalte die sichtbare
    // Fußnotendarstellung; Export und Abschnittsansichten behalten den Block.
    if (sideRail?.hasFootnotes && getFootnoteDefinition(block.text)) return;
    const blockText = String(block.text || "").trim();
    if (hasSourceTitleHeading
      && /^#\s+/.test(blockText)
      && getPlainDocumentLabel(blockText.replace(/^#\s+/, "")) === project.title) return;
    const element = createMarkdownBlockElement(block, textType, {
      chapterNumbers: project.style.chapterNumbers === true,
      project,
    });
    element.classList.add("preview-body-block");
    if (getMarkdownHeadingLevel(block.text)) {
      element.id = getPreviewHeadingId(block.sourceStartOffset);
      element.classList.add("preview-heading-anchor");
    }
    if (textType === "lyric" && !String(block.text || "").trim()) {
      element.dataset.sourceBlankLine = "true";
    }
    element.dataset.layoutBlockId = block.id;
    element.dataset.matter = block.matter || "body";
    element.dataset.chapterRole = block.chapterRole || "";
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
  if (targetText === ui.previewText) scheduleSideTableOfContentsStateUpdate();
}

function renderViewLayer(project, sourceModel, layoutModel) {
  if (ui.previewPage) {
    ui.previewPage.style.setProperty("--preview-font-size", `${ptToPx(project.style.fontSize)}px`);
  }
  renderTextView(ui.previewPage, ui.previewText, project, layoutModel);
}

function setPreviewRenderProgress(value, label) {
  if (ui.previewRenderProgressBar) ui.previewRenderProgressBar.value = Math.max(0, Math.min(100, Number(value) || 0));
  if (ui.previewRenderProgressLabel && label) ui.previewRenderProgressLabel.textContent = label;
}

function waitForPreviewPaint() {
  return new Promise((resolve) => window.requestAnimationFrame(() => resolve()));
}

async function renderPreviewOnDemand() {
  const project = getActiveProject();
  if (!project) return;
  if (!state.previewDirty && state.previewRenderedProjectId === project.id) return;
  const token = ++state.previewRenderToken;
  if (ui.previewRenderProgress) ui.previewRenderProgress.hidden = false;
  ui.previewPage?.setAttribute("aria-busy", "true");
  setPreviewRenderProgress(8, "TypeMap wird vorbereitet …");
  await waitForPreviewPaint();

  try {
    setPreviewRenderProgress(28, "Dokumentstruktur wird gelesen …");
    const sourceModel = buildSourceModel(project);
    await waitForPreviewPaint();
    if (token !== state.previewRenderToken || state.activeProjectId !== project.id) return;

    setPreviewRenderProgress(52, "Satzmodell wird aufgebaut …");
    const activeRange = getActiveSourceRangeForProject(project, sourceModel);
    const layoutModel = buildBrowserLayoutModel(sourceModel, project.style, activeRange);
    await waitForPreviewPaint();
    if (token !== state.previewRenderToken || state.activeProjectId !== project.id) return;

    setPreviewRenderProgress(76, "Text wird gesetzt …");
    state.sourceModel = sourceModel;
    state.layoutModel = layoutModel;
    renderViewLayer(project, sourceModel, layoutModel);
    state.previewDirty = false;
    state.previewRenderedProjectId = project.id;
    setPreviewRenderProgress(100, "TypeMap ist bereit.");
    await waitForPreviewPaint();
  } finally {
    if (token === state.previewRenderToken) {
      if (ui.previewRenderProgress) ui.previewRenderProgress.hidden = true;
      ui.previewPage?.removeAttribute("aria-busy");
    }
  }
}

function getPrimaryFontFamily(fontStack) {
  const match = String(fontStack || "").match(/^\s*(?:"([^"]+)"|'([^']+)'|([^,]+))/);
  const family = String(match?.[1] || match?.[2] || match?.[3] || "").trim();
  return family ? `"${family.replace(/"/g, "\\\"")}"` : "";
}

function getProjectFontDescriptors(project) {
  const style = project?.style || {};
  const bodyFontFamily = getEffectiveBodyFontFamily(project);
  const lead = getLeadPresentation(project, project?.typography?.titleScale || {});
  const descriptors = [
    [bodyFontFamily, 400, "normal"],
    [bodyFontFamily, 400, "italic"],
    [bodyFontFamily, 700, "normal"],
    [style.titleFontFamily || style.fontFamily, Number(style.titleWeight) || 700, "normal"],
    [style.subtitleFontFamily || style.titleFontFamily || style.fontFamily, Number(style.subtitleWeight) || 400, "normal"],
    [lead.fontFamily, lead.fontWeight, "normal"],
    [style.metaFontFamily || style.subtitleFontFamily || style.fontFamily, Number(style.metaWeight) || 400, "normal"],
    [style.headingFontFamily || style.fontFamily, Number(style.headingWeight) || 700, "normal"],
    [style.quoteFontFamily || style.fontFamily, 400, "italic"],
    [style.codeFontFamily || "'Source Code Pro', monospace", 400, "normal"],
    [style.codeFontFamily || "'Source Code Pro', monospace", 700, "normal"],
  ];
  if (project?.metadata?.textKind === "article") {
    descriptors.push(['"TypeMap EB Garamond Semibold", serif', 600, "normal"]);
  }
  return Array.from(new Set(descriptors
    .map(([family, weight, fontStyle]) => {
      const primaryFamily = getPrimaryFontFamily(family);
      return primaryFamily ? `${fontStyle} ${weight} 16px ${primaryFamily}` : "";
    })
    .filter(Boolean)));
}

async function loadProjectFonts(project) {
  if (!project || !document.fonts?.load) return;
  const descriptors = getProjectFontDescriptors(project);
  const results = await Promise.allSettled(descriptors.map((descriptor) => document.fonts.load(descriptor)));
  const failedDescriptors = descriptors.filter((_, index) => results[index].status === "rejected");
  if (failedDescriptors.length) {
    console.warn("TypeMap konnte einzelne Schriftschnitte nicht vorladen", failedDescriptors);
  }
  await document.fonts.ready;
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

function appendOriginalPageMarkerCapsules(line, sourceOffset) {
  findOriginalPageMarkers(line).forEach((marker) => {
    const capsule = document.createElement("span");
    capsule.className = "markdown-editor-object markdown-editor-inline-object";
    capsule.dataset.inlineObject = "true";
    capsule.dataset.sourceStart = String(sourceOffset + marker.start);
    capsule.dataset.sourceEnd = String(sourceOffset + marker.end);
    capsule.dataset.pageLabel = marker.label;
    capsule.textContent = marker.raw;
    ui.textInputHighlight.appendChild(capsule);
  });
}

function appendFootnoteReferenceCapsules(line, sourceOffset) {
  findFootnoteReferences(line).forEach((reference) => {
    const capsule = document.createElement("span");
    capsule.className = "markdown-editor-object markdown-editor-inline-object markdown-editor-footnote-reference";
    capsule.dataset.inlineObject = "true";
    capsule.dataset.sourceStart = String(sourceOffset + reference.start);
    capsule.dataset.sourceEnd = String(sourceOffset + reference.end);
    capsule.textContent = reference.raw;
    ui.textInputHighlight.appendChild(capsule);
  });
}

function renderEditorHighlight(rawText, project = getActiveProject()) {
  if (!ui.textInputHighlight) return;
  const text = String(rawText || "");
  if (text.length > 120000 && !state.activeSourceRange) {
    // Bei sehr großen Gesamtwerken bleibt das Textarea flüssig, indem die
    // geometrisch teure Kartuschenanalyse erst in einer Kapitelansicht erfolgt.
    state.editorHeadingTargets = [];
    clearElement(ui.textInputHighlight);
    ui.textInputHighlight._sourceText = text;
    ui.textInputHighlight.textContent = text;
    return;
  }
  const sourceModel = project ? buildSourceModel(project) : null;
  const activeRange = project && sourceModel ? getActiveSourceRangeForProject(project, sourceModel) : null;
  const baseOffset = activeRange && activeRange.id !== "document-root" ? activeRange.startOffset : 0;
  state.editorHeadingTargets = [];
  clearElement(ui.textInputHighlight);
  ui.textInputHighlight._sourceText = text;

  let sourceOffset = 0;
  text.split("\n").forEach((rawLine) => {
    const line = rawLine.endsWith("\r") ? rawLine.slice(0, -1) : rawLine;
    const footnoteDefinition = getFootnoteDefinition(line);
    appendOriginalPageMarkerCapsules(line, sourceOffset);
    if (!footnoteDefinition) appendFootnoteReferenceCapsules(line, sourceOffset);
    let className = "";
    if (isTableOfContentsText(line) || isCitationObjectText(line) || footnoteDefinition) {
      className = "markdown-editor-object";
    } else if (isParatextMarker(line)) {
      className = "markdown-editor-paratext";
    } else if (line.startsWith("#")) {
      const headingMatch = line.match(/^(#{1,7})\s+(.+)$/);
      if (!headingMatch) {
        sourceOffset += rawLine.length + 1;
        return;
      }
      const level = headingMatch?.[1]?.length || 1;
      const title = getPlainDocumentLabel(headingMatch?.[2] || "");
      if (level === 1 && title === project?.title) {
        className = "markdown-editor-title";
      } else {
        const sourceStart = baseOffset + sourceOffset;
        const section = sourceModel?.sections?.find((entry) => entry.startOffset === sourceStart)
          || sourceModel?.sections?.find((entry) => entry.markdownLevel === level && entry.title === title);
        const role = section?.effectiveRole || getExplicitChapterRole(project, level, title);
        className = `markdown-editor-heading markdown-editor-heading-${role || "unset"}`;
        const headingIndex = state.editorHeadingTargets.length;
        state.editorHeadingTargets.push({ level, title, roleKey: createChapterRoleKey(level, title) });
        const capsule = document.createElement("span");
        capsule.className = className;
        capsule.dataset.headingIndex = String(headingIndex);
        capsule.dataset.sourceStart = String(sourceOffset);
        capsule.textContent = line;
        ui.textInputHighlight.appendChild(capsule);
        sourceOffset += rawLine.length + 1;
        return;
      }
    }

    if (className) {
      const capsule = document.createElement("span");
      capsule.className = className;
      capsule.dataset.sourceStart = String(sourceOffset);
      capsule.textContent = line;
      ui.textInputHighlight.appendChild(capsule);
    }
    sourceOffset += rawLine.length + 1;
  });
}

function closeChapterRoleMenu() {
  document.querySelector(".chapter-role-menu")?.remove();
}

function closeOriginalPageInfo() {
  document.querySelector(".original-page-info-menu")?.remove();
}

function getEditorLineAtSelection() {
  if (!ui.textInput) return null;
  const text = ui.textInput.value;
  const position = Math.max(0, Math.min(ui.textInput.selectionStart || 0, text.length));
  const lineStart = text.lastIndexOf("\n", Math.max(0, position - 1)) + 1;
  const nextLineBreak = text.indexOf("\n", position);
  const lineEnd = nextLineBreak === -1 ? text.length : nextLineBreak;
  return {
    text: text.slice(lineStart, lineEnd).replace(/\r$/, ""),
    start: lineStart,
    end: lineEnd,
  };
}

function getOriginalPageMarkerAtEditorSelection() {
  if (!ui.textInput) return null;
  const text = ui.textInput.value;
  const selectionStart = Math.max(0, Math.min(ui.textInput.selectionStart || 0, text.length));
  const selectionEnd = Math.max(selectionStart, Math.min(ui.textInput.selectionEnd || selectionStart, text.length));
  return findOriginalPageMarkers(text).find((marker) => (
    marker.start <= selectionStart && marker.end >= selectionStart
  ) || (
    selectionEnd > selectionStart && marker.start < selectionEnd && marker.end > selectionStart
  )) || null;
}

function openOriginalPageInfo(event) {
  const marker = getOriginalPageMarkerAtEditorSelection();
  if (!marker) return false;

  event.preventDefault();
  closeChapterRoleMenu();
  closeOriginalPageInfo();

  const info = document.createElement("div");
  info.className = "original-page-info-menu";
  info.setAttribute("role", "status");
  info.style.left = `${Math.min(event.clientX, window.innerWidth - 270)}px`;
  info.style.top = `${Math.min(event.clientY, window.innerHeight - 90)}px`;

  const label = document.createElement("span");
  label.textContent = "Originalpaginierung";
  const message = document.createElement("strong");
  message.textContent = `Seite ${marker.label} der Originalausgabe.`;
  info.append(label, message);
  document.body.appendChild(info);
  return true;
}

function setChapterRole(roleKey, role) {
  updateActiveProject((project) => {
    project.chapterRoles = { ...(project.chapterRoles || {}) };
    if (CHAPTER_ROLES.has(role)) project.chapterRoles[roleKey] = role;
    else delete project.chapterRoles[roleKey];
  });
  renderEditor();
}

function openChapterRoleMenu(event) {
  const line = getEditorLineAtSelection();
  if (!line) return false;
  const headingMatch = line.text.match(/^(#{1,7})\s+(.+)$/);
  if (!headingMatch) return false;

  const project = getActiveProject();
  const level = headingMatch[1].length;
  const title = getPlainDocumentLabel(headingMatch[2]);
  if (level === 1 && title === project?.title) return false;
  const target = {
    level,
    title,
    roleKey: createChapterRoleKey(level, title),
  };
  event.preventDefault();
  closeChapterRoleMenu();

  const menu = document.createElement("div");
  menu.className = "chapter-role-menu";
  menu.style.left = `${Math.min(event.clientX, window.innerWidth - 230)}px`;
  menu.style.top = `${Math.min(event.clientY, window.innerHeight - 170)}px`;
  const label = document.createElement("span");
  label.textContent = target.title;
  const select = document.createElement("select");
  [
    ["", "Keine Auswahl"],
    ["foreword", "Vorwort"],
    ["main", "Haupttext"],
    ["afterword", "Nachwort"],
  ].forEach(([value, text]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    select.appendChild(option);
  });
  select.value = project?.chapterRoles?.[target.roleKey] || "";
  select.addEventListener("change", () => {
    setChapterRole(target.roleKey, select.value);
    closeChapterRoleMenu();
  });
  menu.append(label, select);
  document.body.appendChild(menu);
  window.setTimeout(() => select.focus(), 0);
  return true;
}

function syncEditorHighlightScroll() {
  if (!ui.textInput || !ui.textInputHighlight) return;
  const textarea = ui.textInput;
  const highlight = ui.textInputHighlight;
  const style = window.getComputedStyle(textarea);
  const textareaRect = textarea.getBoundingClientRect();
  const layoutWidth = textarea.clientWidth;
  if (layoutWidth < 80 || textarea.clientHeight < 40) return;

  highlight.style.width = `${layoutWidth}px`;
  highlight.style.minHeight = `${Math.max(textarea.clientHeight, textarea.scrollHeight)}px`;
  [
    "padding",
    "font",
    "fontFamily",
    "fontSize",
    "fontWeight",
    "fontStyle",
    "fontStretch",
    "lineHeight",
    "letterSpacing",
    "wordSpacing",
    "textAlign",
    "textIndent",
    "textTransform",
    "whiteSpace",
    "overflowWrap",
    "wordBreak",
    "tabSize",
    "direction",
  ].forEach((property) => {
    highlight.style[property] = style[property];
  });

  let measurement = state.editorMeasurementInput;
  if (!measurement) {
    measurement = document.createElement("textarea");
    measurement.setAttribute("aria-hidden", "true");
    measurement.tabIndex = -1;
    measurement.rows = 1;
    measurement.wrap = "soft";
    Object.assign(measurement.style, {
      position: "fixed",
      left: "-100000px",
      top: "0",
      overflowX: "hidden",
      overflowY: "scroll",
      visibility: "hidden",
      pointerEvents: "none",
      resize: "none",
      border: "0",
      margin: "0",
    });
    document.body.appendChild(measurement);
    state.editorMeasurementInput = measurement;
  }
  [
    "padding",
    "font",
    "fontFamily",
    "fontSize",
    "fontWeight",
    "fontStyle",
    "fontStretch",
    "lineHeight",
    "letterSpacing",
    "wordSpacing",
    "textAlign",
    "textIndent",
    "textTransform",
    "whiteSpace",
    "overflowWrap",
    "wordBreak",
    "tabSize",
    "direction",
    "boxSizing",
    "scrollbarGutter",
  ].forEach((property) => {
    measurement.style[property] = style[property];
  });
  measurement.style.setProperty("height", "1px", "important");
  measurement.style.setProperty("min-height", "0", "important");
  measurement.style.setProperty("max-height", "1px", "important");
  measurement.style.width = `${textareaRect.width}px`;
  measurement.wrap = textarea.wrap || "soft";

  let inlineMeasurement = state.editorInlineMeasurement;
  if (!inlineMeasurement) {
    inlineMeasurement = document.createElement("div");
    inlineMeasurement.setAttribute("aria-hidden", "true");
    Object.assign(inlineMeasurement.style, {
      position: "fixed",
      left: "-100000px",
      top: "0",
      height: "auto",
      overflow: "hidden",
      visibility: "hidden",
      pointerEvents: "none",
      border: "0",
      margin: "0",
    });
    document.body.appendChild(inlineMeasurement);
    state.editorInlineMeasurement = inlineMeasurement;
  }
  [
    "padding",
    "font",
    "fontFamily",
    "fontSize",
    "fontWeight",
    "fontStyle",
    "fontStretch",
    "lineHeight",
    "letterSpacing",
    "wordSpacing",
    "textAlign",
    "textIndent",
    "textTransform",
    "whiteSpace",
    "overflowWrap",
    "wordBreak",
    "tabSize",
    "direction",
    "boxSizing",
  ].forEach((property) => {
    inlineMeasurement.style[property] = style[property];
  });
  inlineMeasurement.style.width = `${layoutWidth}px`;

  const paddingTop = Number.parseFloat(style.paddingTop) || 0;
  const paddingLeft = Number.parseFloat(style.paddingLeft) || 0;
  const paddingRight = Number.parseFloat(style.paddingRight) || 0;
  const sourceText = highlight._sourceText || "";
  measurement.value = "";
  const emptyScrollHeight = measurement.scrollHeight;
  highlight.querySelectorAll("[data-source-start]").forEach((capsule) => {
    const start = Number(capsule.dataset.sourceStart) || 0;
    if (capsule.dataset.inlineObject === "true") {
      clearElement(inlineMeasurement);
      inlineMeasurement.appendChild(document.createTextNode(sourceText.slice(0, start)));
      const markerProbe = document.createElement("span");
      markerProbe.textContent = capsule.textContent;
      markerProbe.style.font = "inherit";
      markerProbe.style.whiteSpace = "pre";
      inlineMeasurement.appendChild(markerProbe);
      capsule.style.top = `${markerProbe.offsetTop}px`;
      capsule.style.left = `${markerProbe.offsetLeft}px`;
      capsule.style.maxWidth = "none";
      return;
    }
    measurement.value = sourceText.slice(0, start);
    const lineTop = paddingTop + Math.max(0, measurement.scrollHeight - emptyScrollHeight);
    capsule.style.top = `${lineTop}px`;
    capsule.style.left = `${paddingLeft}px`;
    capsule.style.maxWidth = `${Math.max(20, layoutWidth - paddingLeft - paddingRight)}px`;
  });
  highlight.style.transform = `translate(${-textarea.scrollLeft}px, ${-textarea.scrollTop}px)`;
}

function scheduleEditorGeometrySync() {
  window.cancelAnimationFrame(state.editorGeometryFrame);
  state.editorGeometryFrame = window.requestAnimationFrame(() => {
    state.editorGeometryFrame = window.requestAnimationFrame(syncEditorHighlightScroll);
  });
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

function findDocumentTreeNodeById(node, nodeId) {
  if (!node || !nodeId) return null;
  if (node.id === nodeId) return node;
  for (const child of node.children || []) {
    const match = findDocumentTreeNodeById(child, nodeId);
    if (match) return match;
  }
  return null;
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
  if (!section) {
    const treeNode = findDocumentTreeNodeById(model.documentTree, state.activeSourceRange.id);
    if (!treeNode || !["matter", "document"].includes(treeNode.type)) return null;
    return {
      id: treeNode.id,
      title: treeNode.title,
      startOffset: treeNode.startOffset,
      endOffset: treeNode.endOffset,
      type: treeNode.type,
      matter: treeNode.matter || "body",
    };
  }
  return {
    ...section,
    type: "section",
  };
}

function isParatextTreeItem(node) {
  return node?.type === "toc" || node?.type === "section";
}

function getChapterVisibilityKey(node) {
  return node?.type === "section" && node.roleKey ? `chapter:${node.roleKey}` : "";
}

function isParatextNodeVisible(project, node) {
  if (node?.type === "toc") return project?.tocVisible !== false;
  const key = getChapterVisibilityKey(node) || node?.visibilityKey || createParatextVisibilityKey(node);
  if (!key) return true;
  return project?.paratextVisibility?.[key] !== false;
}

function setParatextNodeVisible(project, node, visible) {
  if (!project || !node) return;
  if (node.type === "toc") {
    project.tocVisible = visible !== false;
    return;
  }
  const key = getChapterVisibilityKey(node) || node.visibilityKey || createParatextVisibilityKey(node);
  if (!key) return;
  project.paratextVisibility = {
    ...(project.paratextVisibility || {}),
    [key]: visible !== false,
  };
}

function collectHiddenParatextRanges(project, sourceModel = null) {
  const model = sourceModel || buildSourceModel(project);
  const ranges = [];
  function visit(node) {
    if (!node) return;
    if (node.type === "section" && !isParatextNodeVisible(project, node)) {
      ranges.push({ startOffset: node.startOffset, endOffset: node.endOffset });
      return;
    }
    (node.children || []).forEach(visit);
  }
  visit(model.documentTree);
  return ranges;
}

function isBlockHiddenByParatextVisibility(block, hiddenRanges) {
  const offset = Number(block?.sourceStartOffset ?? block?.startOffset);
  return Number.isFinite(offset)
    && hiddenRanges.some((range) => offset >= range.startOffset && offset < range.endOffset);
}

function getEditorSourceText(project) {
  if (!state.activeSourceRange) return project.source.rawText;
  const sourceModel = buildSourceModel(project);
  const range = getActiveSourceRangeForProject(project, sourceModel);
  if (!range || range.id === "document-root") return project.source.rawText;
  return project.source.rawText.slice(range.startOffset, range.endOffset);
}

function getTreeNodeIcon(type) {
  if (type === "document") return "▣";
  if (type === "matter") return "";
  if (type === "toc") return "";
  if (type === "citation") return "§";
  if (type === "heading") return "#";
  if (type === "table") return "▤";
  if (type === "code") return "{}";
  if (type === "quote") return ">";
  if (type === "list") return "•";
  return "¶";
}

function createTreeNodeButton(project, node, depth, ancestorHidden = false) {
  const children = Array.isArray(node.children) ? node.children : [];
  const structuralChildren = children.filter((child) => child.type === "section" || child.type === "matter");
  const contentChildren = children.filter((child) => child.type !== "section" && child.type !== "matter");
  const hasChildren = children.length > 0;
  const isExpanded = isTreeNodeExpanded(node.id);
  const isSelectable = node.type === "document" || node.type === "section" || node.type === "matter";
  const isContentExpanded = isContentNodeExpanded(node.id);
  const isActive = state.activeSourceRange?.projectId === project.id
    && (state.activeSourceRange?.id || "document-root") === node.id;
  const hasParatextVisibilityToggle = isParatextTreeItem(node);
  const isParatextVisible = isParatextNodeVisible(project, node);
  const isInheritedHidden = hasParatextVisibilityToggle && isParatextVisible && ancestorHidden;

  const row = document.createElement("div");
  row.className = `document-tree-row${isActive ? " is-active" : ""}${isSelectable ? " is-selectable" : ""}${hasParatextVisibilityToggle ? " has-visibility-toggle" : ""}`;
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
    state.previewDirty = true;
    state.previewRenderToken += 1;
    if (contentChildren.length) setContentNodeExpanded(node.id, nextContentState);
    renderApp();
  });

  let visibilityButton = null;
  if (hasParatextVisibilityToggle) {
    visibilityButton = document.createElement("button");
    visibilityButton.type = "button";
    visibilityButton.className = `document-tree-visibility${isParatextVisible ? " is-visible" : " is-hidden"}${isInheritedHidden ? " is-inherited-hidden" : ""}`;
    visibilityButton.setAttribute("aria-label", isInheritedHidden
      ? `${node.title} wird durch ein übergeordnetes Kapitel ausgeblendet`
      : `${node.title} ${isParatextVisible ? "ausblenden" : "einblenden"}`);
    visibilityButton.setAttribute("aria-pressed", isParatextVisible ? "true" : "false");
    visibilityButton.addEventListener("click", (event) => {
      event.stopPropagation();
      updateActiveProject((activeProject) => {
        setParatextNodeVisible(activeProject, node, !isParatextVisible);
      });
    });
  }

  const icon = document.createElement("span");
  const isParatextSection = node.type === "section" && ["foreword", "afterword"].includes(node.explicitRole);
  icon.className = `document-tree-icon document-tree-icon-${node.type}${node.matter ? ` document-tree-icon-${node.matter}` : ""}${isParatextSection ? " document-tree-icon-paratext" : ""}`;
  icon.textContent = node.type === "section" ? (isParatextSection ? "" : (node.number || "")) : getTreeNodeIcon(node.type);
  const copy = document.createElement("span");
  copy.className = "document-tree-copy";
  const title = document.createElement("span");
  title.className = "document-tree-title";
  title.textContent = node.title || node.type;
  copy.appendChild(title);
  if (node.type !== "document" && node.type !== "section" && node.type !== "toc" && node.type !== "citation") {
    const meta = document.createElement("span");
    meta.className = "document-tree-meta";
    meta.textContent = node.type === "paragraph"
      ? `Text: "${String(node.text || "").replace(/\s+/g, " ").trim().slice(0, 44)}${String(node.text || "").trim().length > 44 ? "…" : ""}"`
      : node.type;
    copy.appendChild(meta);
  }
  button.append(icon, copy);
  row.append(toggle);
  row.append(button);
  if (visibilityButton) row.append(visibilityButton);
  return row;
}

function renderDocumentTreeNode(container, project, node, depth = 0, ancestorHidden = false) {
  container.appendChild(createTreeNodeButton(project, node, depth, ancestorHidden));
  const children = Array.isArray(node.children) ? node.children : [];
  const structuralChildren = children.filter((child) => child.type === "section" || child.type === "matter");
  const contentChildren = children.filter((child) => child.type !== "section" && child.type !== "matter");
  const isExpanded = isTreeNodeExpanded(node.id);
  const descendantsHidden = ancestorHidden
    || (node.type === "section" && !isParatextNodeVisible(project, node));
  const shouldShowContentChildren = node.type === "matter"
    ? isExpanded
    : isContentNodeExpanded(node.id);
  if (shouldShowContentChildren) {
    contentChildren.forEach((child) => renderDocumentTreeNode(container, project, child, depth + 1, descendantsHidden));
  }
  if (!isExpanded) return;
  structuralChildren.forEach((child) => renderDocumentTreeNode(container, project, child, depth + 1, descendantsHidden));
}

function renderDocumentTree(project) {
  const tree = document.createElement("div");
  tree.className = "document-tree";
  const sourceModel = buildSourceModel(project);
  const treeChildren = sourceModel.documentTree.children || [];
  const chapters = treeChildren.filter((child) => child.type === "section");
  const looseContent = treeChildren.filter((child) => child.type !== "section");
  if (!chapters.length && !looseContent.length) {
    const empty = document.createElement("p");
    empty.className = "document-tree-empty";
    empty.textContent = "Noch keine Kapitel";
    tree.appendChild(empty);
    return tree;
  }
  treeChildren.forEach((child) => {
    if (child.type === "matter" && !isTreeNodeExplicitlyCollapsed(child.id)) {
      setTreeNodeExpanded(child.id, true);
    }
    renderDocumentTreeNode(tree, project, child, 0);
  });
  return tree;
}

function scheduleProjectBrowserRender(delay = 260) {
  window.clearTimeout(state.projectBrowserRenderTimer);
  state.projectBrowserRenderTimer = window.setTimeout(() => {
    renderProjectList();
  }, delay);
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
    copy.className = "project-row-copy";
    const heading = document.createElement("div");
    heading.className = "project-row-heading";
    const title = document.createElement("strong");
    title.textContent = project.title;
    heading.appendChild(title);
    const authors = normalizePersonList(project.metadata?.authors).filter(Boolean);
    if (authors.length) {
      const author = document.createElement("span");
      author.className = "project-row-author";
      author.textContent = `(${authors.join(", ")})`;
      heading.appendChild(author);
    }
    const meta = document.createElement("span");
    meta.textContent = `${project.source.rawText.length} Zeichen`;
    copy.append(heading, meta);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.setAttribute("aria-label", `${project.title} löschen`);
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteProject(project.id);
    });

    row.addEventListener("click", () => {
      activateProject(project.id, { resetSourceRange: true });
    });
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateProject(project.id, { resetSourceRange: true });
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
  renderFontOptions(project);
  const isJsonView = state.editorDataView === "json";
  // Die JSON-Ansicht bildet bewusst das vollständige Projektobjekt ab, damit
  // Text, Quellenangaben, Metadaten und Satzinformationen gemeinsam prüfbar sind.
  const hasJsonDraft = isJsonView && state.jsonEditorDraftProjectId === project.id;
  const editorText = isJsonView
    ? (hasJsonDraft ? state.jsonEditorDraft : JSON.stringify(project, null, 2))
    : getEditorSourceText(project);
  ui.editorPanel?.classList.toggle("editor-json-mode", isJsonView);
  if (ui.editorDataViewSelect) ui.editorDataViewSelect.value = state.editorDataView;
  ui.editorDataViewIcon?.classList.toggle("file-format-icon-markdown", !isJsonView);
  ui.editorDataViewIcon?.classList.toggle("file-format-icon-json", isJsonView);
  if (ui.editorToolbarPrimary) ui.editorToolbarPrimary.inert = isJsonView;
  if (ui.editorToolbarFormat) ui.editorToolbarFormat.inert = isJsonView;
  if (ui.textInput) {
    const spellcheckEnabled = project.style.spellcheck !== false;
    ui.textInput.value = editorText;
    if (!hasJsonDraft) ui.textInput.removeAttribute("aria-invalid");
    ui.textInput.readOnly = false;
    ui.textInput.setAttribute("aria-label", isJsonView ? "Dokumentdaten als JSON" : "Text");
    ui.textInput.spellcheck = !isJsonView && spellcheckEnabled;
    ui.textInput.setAttribute("spellcheck", String(!isJsonView && spellcheckEnabled));
    ui.spellcheckToggleButton?.setAttribute("aria-pressed", String(spellcheckEnabled));
    if (ui.spellcheckToggleCheck) ui.spellcheckToggleCheck.hidden = !spellcheckEnabled;
  }
  const chapterNumbersEnabled = project.style.chapterNumbers === true;
  ui.chapterNumbersToggleButton?.setAttribute("aria-pressed", String(chapterNumbersEnabled));
  if (ui.chapterNumbersToggleCheck) ui.chapterNumbersToggleCheck.hidden = !chapterNumbersEnabled;
  const lineNumbersEnabled = getProjectLineNumbering(project).enabled;
  ui.lineNumberSettingsButton?.setAttribute("aria-pressed", String(lineNumbersEnabled));
  if (ui.lineNumberToggleCheck) ui.lineNumberToggleCheck.hidden = !lineNumbersEnabled;
  const citationObjectEnabled = hasCitationObject(project);
  ui.insertCitationObjectButton?.setAttribute("aria-pressed", String(citationObjectEnabled));
  if (ui.insertCitationObjectCheck) ui.insertCitationObjectCheck.hidden = !citationObjectEnabled;
  syncTableOfContentsMenuState(project);
  if (isJsonView) clearElement(ui.textInputHighlight);
  else renderEditorHighlight(editorText, project);
  syncEditorHighlightScroll();
  scheduleEditorGeometrySync();
  if (ui.fontFamilySelect) ui.fontFamilySelect.value = project.style.fontFamily;
  if (ui.fontLigaturesInput) ui.fontLigaturesInput.checked = project.style.ligatures !== false;
  populateDocumentStyleSelect(ui.toolbarTextKindSelect);
  if (ui.toolbarTextKindSelect) ui.toolbarTextKindSelect.value = normalizeDocumentStyleId(project.metadata?.textKind);
  ui.editorZoomButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(Number(button.dataset.editorZoom) === state.editorZoom));
  });
  if (ui.toolbarFontSizeValue) ui.toolbarFontSizeValue.textContent = String(Number(project.style.fontSize) || 14);
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

function splitCitationAuthors(value) {
  const authors = String(value || "").split(/\s*;\s*|\r?\n/).map((author) => author.trim()).filter(Boolean);
  return authors.length ? authors : [""];
}

function getCitationPeople(container) {
  return Array.from(container?.querySelectorAll("input") || [])
    .map((input) => input.value.trim()).filter(Boolean);
}

function renderCitationPeople(container, value, roleLabel) {
  clearElement(container);
  const people = Array.isArray(value) ? value : splitCitationAuthors(value);
  people.forEach((person, index) => {
    const row = document.createElement("div");
    row.className = "citation-author-row";
    const input = document.createElement("input");
    input.type = "text";
    input.autocomplete = "off";
    input.value = person;
    input.placeholder = "Vorname Nachname";
    input.setAttribute("aria-label", `${roleLabel} ${index + 1}`);
    input.addEventListener("input", updateSourceCitationForm);

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "citation-author-remove";
    removeButton.textContent = "X";
    removeButton.setAttribute("aria-label", `${roleLabel} ${index + 1} entfernen`);
    removeButton.disabled = people.length === 1;
    removeButton.addEventListener("click", () => {
      const nextPeople = Array.from(container.querySelectorAll("input"))
        .map((personInput) => personInput.value)
        .filter((_, personIndex) => personIndex !== index);
      renderCitationPeople(container, nextPeople.length ? nextPeople : [""], roleLabel);
      updateSourceCitationForm();
    });
    row.append(input, removeButton);
    container.appendChild(row);
  });
}

function addCitationPerson(container, roleLabel) {
  const people = Array.from(container?.querySelectorAll("input") || [])
    .map((input) => input.value);
  people.push("");
  renderCitationPeople(container, people, roleLabel);
  const inputs = container.querySelectorAll("input");
  inputs[inputs.length - 1]?.focus();
}

function readSourceCitationForm() {
  return {
    source_type: ui.sourceCitationTypeInput.value,
    title: ui.sourceCitationTitleInput.value.trim(),
    subtitle: ui.sourceCitationSubtitleInput.value.trim(),
    lead: ui.sourceCitationLeadInput.value.trim(),
    language: ui.sourceCitationLanguageInput.value.trim() || "de",
    authors: getCitationPeople(ui.sourceCitationAuthorsList).join("; "),
    institutional_author: ui.sourceCitationInstitutionalAuthorInput.value.trim(),
    news_agencies: ui.sourceCitationNewsAgenciesInput.value.trim(),
    editors: ui.sourceCitationEditorsInput.value.trim(),
    contributors: ui.sourceCitationContributorsInput.value.trim(),
    translators: getCitationPeople(ui.sourceCitationTranslatorsList).join("; "),
    text_version: ui.sourceCitationTextVersionInput.value,
    original_title: ui.sourceCitationOriginalTitleInput.value.trim(),
    original_language: ui.sourceCitationOriginalLanguageInput.value.trim(),
    container_title: ui.sourceCitationContainerTitleInput.value.trim(),
    publisher: ui.sourceCitationPublisherInput.value.trim(),
    publisher_place: ui.sourceCitationPublisherPlaceInput.value.trim(),
    volume: ui.sourceCitationVolumeInput.value.trim(),
    issue: ui.sourceCitationIssueInput.value.trim(),
    page_range: ui.sourceCitationPageRangeInput.value.trim(),
    issued_year: ui.sourceCitationIssuedYearInput.value.trim(),
    issued_date: ui.sourceCitationIssuedDateInput.value,
    edition: ui.sourceCitationEditionInput.value.trim(),
    version_statement: ui.sourceCitationVersionStatementInput.value.trim(),
    doi: ui.sourceCitationDoiInput.value.trim(),
    url: ui.sourceCitationUrlInput.value.trim(),
    archive_url: ui.sourceCitationArchiveUrlInput.value.trim(),
    accessed_date: ui.sourceCitationAccessedDateInput.value,
    citation_style: ui.sourceCitationStyleInput.value,
    short_citation: ui.sourceCitationShortOutput.value,
    full_citation: ui.sourceCitationFullOutput.dataset.plainText || ui.sourceCitationFullOutput.textContent || "",
  };
}

function joinCitationParts(parts) {
  const text = parts.map((part) => String(part || "").trim()).filter(Boolean).join(". ");
  return text && !/[.!?]$/.test(text) ? `${text}.` : text;
}

function formatCitationDate(value) {
  if (!value) return "";
  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match ? `${match[3]}.${match[2]}.${match[1]}` : String(value);
}

function normalizeDoi(value) {
  const doi = String(value || "").trim().replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, "");
  return doi ? `https://doi.org/${doi}` : "";
}

function formatDinPersonName(value) {
  const name = String(value || "").trim();
  if (!name) return "";
  if (name.includes(",")) {
    const [surname, ...rest] = name.split(",");
    return `${surname.trim().toLocaleUpperCase("de-DE")},${rest.length ? ` ${rest.join(",").trim()}` : ""}`;
  }
  const parts = name.split(/\s+/);
  if (parts.length === 1) return parts[0].toLocaleUpperCase("de-DE");
  const surname = parts.pop();
  return `${surname.toLocaleUpperCase("de-DE")}, ${parts.join(" ")}`;
}

function formatDinResponsibility(citation) {
  if (!citation.authors) return citation.institutional_author || citation.news_agencies || "o. V.";
  return splitCitationAuthors(citation.authors).filter(Boolean).map(formatDinPersonName).join("; ");
}

function isPlausibleDoi(value) {
  return /^10\.\d{4,9}\/\S+$/i.test(String(value || "").trim().replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, ""));
}

function isPlausibleHttpUrl(value) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) && Boolean(url.hostname);
  } catch (error) {
    return false;
  }
}

/*
 * Erste pragmatische Zitationslogik für die wichtigsten Quellentypen. Sie hält den Datenfluss
 * bereits funktionsfähig; Sonderfälle und vollständige Stiltreue können später durch CSL oder
 * eine externe Zitationsbibliothek ersetzt werden, ohne das Formularmodell erneut umzubauen.
 */
function formatSourceCitation(citation) {
  citation = getCitationForFieldProfile(citation);
  const author = citation.authors || citation.institutional_author || citation.news_agencies || "o. V.";
  const dinAuthor = formatDinResponsibility(citation);
  const title = [citation.title || "Ohne Titel", citation.subtitle]
    .filter(Boolean).join(": ");
  const year = citation.issued_year || citation.issued_date.slice(0, 4) || "o. J.";
  const exactDate = citation.issued_date ? formatCitationDate(citation.issued_date) : year;
  const accessed = citation.accessed_date ? `abgerufen am ${formatCitationDate(citation.accessed_date)}` : "";
  const doi = normalizeDoi(citation.doi);
  const online = doi || citation.url || citation.archive_url;
  const placePublisher = [citation.publisher_place, citation.publisher].filter(Boolean).join(": ");
  const volumeIssue = citation.volume
    ? `${citation.volume}${citation.issue ? ` (${citation.issue})` : ""}`
    : citation.issue;
  const responsibility = citation.editors ? `Hrsg.: ${citation.editors}` : citation.contributors;
  const agencyCredit = citation.news_agencies && author !== citation.news_agencies
    ? `Agentur: ${citation.news_agencies}`
    : "";
  const translationCredit = citation.text_version === "translation"
    ? [citation.translators ? `Übers. von ${citation.translators}` : "", citation.original_title ? `Originaltitel: ${citation.original_title}` : ""]
      .filter(Boolean).join("; ")
    : "";
  const translationDetails = [translationCredit, agencyCredit].filter(Boolean).join("; ");
  const short = {
    APA: `${author} (${year})`,
    Chicago: `${author}, ${year}`,
    MLA: `${author} ${year}`,
    "DIN ISO 690": `${dinAuthor}, ${year}`,
    Hausstil: `${author} (${year})`,
  }[citation.citation_style] || `${author} (${year})`;

  const commonOnline = [online, accessed].filter(Boolean).join(", ");
  let full;
  if (citation.source_type === "book") {
    if (citation.citation_style === "APA") {
      full = joinCitationParts([`${author} (${year})`, title, translationDetails, citation.edition, placePublisher, commonOnline]);
    } else if (citation.citation_style === "MLA") {
      full = joinCitationParts([author, title, translationDetails, citation.edition, citation.publisher, year, commonOnline]);
    } else if (citation.citation_style === "Chicago") {
      full = joinCitationParts([author, title, translationDetails, citation.edition, [placePublisher, year].filter(Boolean).join(", "), commonOnline]);
    } else if (citation.citation_style === "DIN ISO 690") {
      full = joinCitationParts([dinAuthor, title, translationDetails, citation.edition, placePublisher, year, commonOnline]);
    } else {
      full = joinCitationParts([author, title, translationDetails, responsibility, citation.edition, placePublisher, year, commonOnline]);
    }
  } else if (citation.source_type === "journal_article") {
    const journalDetails = [citation.container_title, volumeIssue, citation.page_range].filter(Boolean).join(", ");
    if (citation.citation_style === "APA") {
      full = joinCitationParts([`${author} (${year})`, title, translationDetails, journalDetails, online]);
    } else if (citation.citation_style === "DIN ISO 690") {
      full = joinCitationParts([dinAuthor, title, translationDetails, journalDetails, year, online]);
    } else {
      full = joinCitationParts([author, `„${title}“`, translationDetails, journalDetails, year, online]);
    }
  } else if (citation.source_type === "webpage") {
    if (citation.citation_style === "APA") {
      full = joinCitationParts([`${author} (${exactDate})`, title, translationDetails, citation.container_title, commonOnline]);
    } else if (citation.citation_style === "DIN ISO 690") {
      full = joinCitationParts([dinAuthor, title, translationDetails, citation.container_title, exactDate, commonOnline]);
    } else {
      full = joinCitationParts([author, title, translationDetails, citation.container_title, exactDate, commonOnline]);
    }
  } else if (citation.source_type === "book_chapter") {
    full = joinCitationParts([author, `„${title}“`, translationDetails, citation.container_title ? `In: ${citation.container_title}` : "", responsibility, placePublisher, year, citation.page_range, commonOnline]);
  } else {
    full = joinCitationParts([author, title, translationDetails, citation.container_title, placePublisher, exactDate, citation.version_statement, commonOnline]);
  }
  return {
    short,
    full,
    italicTitle: citation.citation_style === "DIN ISO 690" ? title : "",
  };
}

function renderFullCitationOutput(formatted) {
  const output = ui.sourceCitationFullOutput;
  const text = formatted.full || "";
  const italicTitle = formatted.italicTitle || "";
  output.dataset.plainText = text;
  clearElement(output);
  const titleIndex = italicTitle ? text.indexOf(italicTitle) : -1;
  if (titleIndex < 0) {
    output.textContent = text;
    return;
  }
  output.append(document.createTextNode(text.slice(0, titleIndex)));
  const emphasis = document.createElement("em");
  emphasis.textContent = italicTitle;
  output.append(emphasis, document.createTextNode(text.slice(titleIndex + italicTitle.length)));
}

const CITATION_OPTIONAL_FIELDS = [
  "lead", "news_agencies", "editors", "contributors", "container_title", "publisher", "publisher_place", "volume", "issue",
  "page_range", "edition", "version_statement", "doi", "url", "archive_url", "accessed_date",
];

const CITATION_FIELD_PROFILES = {
  book: ["editors", "contributors", "publisher", "publisher_place", "edition", "version_statement", "doi", "url", "archive_url", "accessed_date"],
  book_chapter: ["editors", "contributors", "container_title", "publisher", "publisher_place", "volume", "page_range", "edition", "doi", "url", "archive_url", "accessed_date"],
  journal_article: ["container_title", "volume", "issue", "page_range", "version_statement", "doi", "url", "archive_url", "accessed_date"],
  newspaper_article: ["lead", "news_agencies", "contributors", "container_title", "issue", "page_range", "version_statement", "url", "archive_url", "accessed_date"],
  webpage: ["news_agencies", "contributors", "container_title", "publisher", "version_statement", "doi", "url", "archive_url", "accessed_date"],
  report: ["contributors", "publisher", "publisher_place", "version_statement", "doi", "url", "archive_url", "accessed_date"],
};

function getCitationForFieldProfile(citation) {
  const profile = CITATION_FIELD_PROFILES[citation?.source_type];
  if (!profile) return { ...citation };
  const visibleFields = new Set(profile);
  const effectiveCitation = { ...citation };
  CITATION_OPTIONAL_FIELDS.forEach((field) => {
    if (!visibleFields.has(field)) effectiveCitation[field] = "";
  });
  return effectiveCitation;
}

function getCitationOptionalFieldControls() {
  return {
    lead: ui.sourceCitationLeadInput,
    news_agencies: ui.sourceCitationNewsAgenciesInput,
    editors: ui.sourceCitationEditorsInput,
    contributors: ui.sourceCitationContributorsInput,
    container_title: ui.sourceCitationContainerTitleInput,
    publisher: ui.sourceCitationPublisherInput,
    publisher_place: ui.sourceCitationPublisherPlaceInput,
    volume: ui.sourceCitationVolumeInput,
    issue: ui.sourceCitationIssueInput,
    page_range: ui.sourceCitationPageRangeInput,
    edition: ui.sourceCitationEditionInput,
    version_statement: ui.sourceCitationVersionStatementInput,
    doi: ui.sourceCitationDoiInput,
    url: ui.sourceCitationUrlInput,
    archive_url: ui.sourceCitationArchiveUrlInput,
    accessed_date: ui.sourceCitationAccessedDateInput,
  };
}

function applyCitationFieldProfile(sourceType) {
  const controls = getCitationOptionalFieldControls();
  // Nicht konfigurierte Quellentypen sind der vollständige Fallback. Verborgene
  // Werte bleiben im Formularmodell erhalten und werden beim Typwechsel nie gelöscht.
  const visibleFields = new Set(CITATION_FIELD_PROFILES[sourceType] || CITATION_OPTIONAL_FIELDS);
  Object.entries(controls).forEach(([field, control]) => {
    const row = control?.closest(".property-row");
    if (row) row.hidden = !visibleFields.has(field);
  });
  return visibleFields;
}

function updateSourceCitationForm() {
  const citation = readSourceCitationForm();
  const visibleFields = applyCitationFieldProfile(citation.source_type);
  const containerLabels = {
    journal_article: "Zeitschrift",
    book_chapter: "Sammelband",
    webpage: "Website",
    blog_post: "Blog",
    newspaper_article: "Zeitung",
  };
  ui.sourceCitationContainerLabel.textContent = containerLabels[citation.source_type] || "Übergeordnetes Werk";
  const isTranslation = citation.text_version === "translation";
  ui.sourceCitationTranslationFields.hidden = !isTranslation;
  ui.sourceCitationTranslatorsField.hidden = !isTranslation;
  ui.sourceCitationAuthorHint.hidden = Boolean(citation.authors || citation.institutional_author || citation.news_agencies);
  ui.sourceCitationIssuedHint.hidden = Boolean(citation.issued_year || citation.issued_date);
  const isOnlineSource = citation.source_type === "webpage"
    || citation.source_type === "blog_post"
    || (citation.source_type === "report" && Boolean(citation.url));
  ui.sourceCitationAccessedHint.hidden = !visibleFields.has("accessed_date") || !(isOnlineSource && citation.url && !citation.accessed_date);
  ui.sourceCitationDoiHint.hidden = !visibleFields.has("doi") || !citation.doi || isPlausibleDoi(citation.doi);
  ui.sourceCitationUrlHint.hidden = !visibleFields.has("url") || (isPlausibleHttpUrl(citation.url) && isPlausibleHttpUrl(citation.archive_url));
  if (citation.title) ui.sourceCitationTitleInput.setCustomValidity("");
  const formatted = formatSourceCitation(citation);
  ui.sourceCitationShortOutput.value = formatted.short;
  renderFullCitationOutput(formatted);
}

async function copyCitationOutput(output, button) {
  const text = output?.value || output?.dataset?.plainText || output?.textContent || "";
  if (!text) return;
  let copied = false;
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch (error) {
      // Local file contexts may deny the modern Clipboard API; the selection fallback remains available.
    }
  }
  if (!copied) {
    const fallbackInput = document.createElement("textarea");
    fallbackInput.value = text;
    fallbackInput.style.position = "fixed";
    fallbackInput.style.left = "-100000px";
    document.body.appendChild(fallbackInput);
    fallbackInput.select();
    copied = document.execCommand("copy");
    fallbackInput.remove();
  }
  if (!copied) throw new Error("clipboard-unavailable");
  const originalLabel = button.textContent;
  button.textContent = "Kopiert";
  window.setTimeout(() => { button.textContent = originalLabel; }, 1200);
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

function closeEditorMenus() {
  document.querySelectorAll(".editor-menu[open], .toolbar-popover[open]").forEach((menu) => {
    menu.open = false;
  });
}

async function setActiveTextKind(textKind) {
  const normalizedTextKind = normalizeDocumentStyleId(textKind);
  updateActiveProject((project) => {
    const previousTextKind = project.metadata?.textKind || createDefaultMetadata().textKind;
    project.metadata = {
      ...createDefaultMetadata(),
      ...(project.metadata || {}),
      textKind: normalizedTextKind,
    };
    project.source.textType = sourceTextTypeFromDocumentKind(normalizedTextKind);
    if (normalizedTextKind !== previousTextKind) {
      applyDocumentStylePreset(project, normalizedTextKind);
    }
    if (project.source.textType === "lyric") {
      project.style.textAlign = "left";
      project.style.lineHeight = 1.5;
    }
  }, { renderPreview: false });
  const project = getActiveProject();
  if (!project) return;
  const token = ++state.projectActivationToken;
  renderProjectList();
  renderNoActiveProjectState("Schriften werden geladen …");
  await loadProjectFonts(project);
  if (token !== state.projectActivationToken || state.activeProjectId !== project.id) return;
  renderApp();
}

function replaceEditorSelection(transform) {
  const input = ui.textInput;
  if (!input) return;
  const start = input.selectionStart ?? 0;
  const end = input.selectionEnd ?? start;
  const value = input.value;
  const selected = value.slice(start, end);
  const replacement = transform(selected);
  input.value = `${value.slice(0, start)}${replacement}${value.slice(end)}`;
  input.focus();
  const selectionStart = start;
  const selectionEnd = start + replacement.length;
  input.setSelectionRange(selectionStart, selectionEnd);
  syncEditorHighlightScroll();
  updateActiveProjectTextFromEditor(input.value);
}

function wrapEditorSelection(marker) {
  replaceEditorSelection((selected) => `${marker}${selected || "Text"}${marker}`);
}

function clearEditorFormatting() {
  replaceEditorSelection((selected) => String(selected || "")
    .replace(/(```|`|==|\*\*|__|\*|_)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"));
}

function updateEditorZoom(value) {
  const zoom = Number(value) || 1;
  state.editorZoom = zoom;
  document.documentElement.style.setProperty("--editor-zoom", String(zoom));
  syncEditorHighlightScroll();
}

function changeActiveFontSize(delta) {
  updateActiveProject((project) => {
    const current = Number(project.style.fontSize) || 14;
    project.style.fontSize = Math.max(8, Math.min(72, current + delta));
  });
  renderEditor();
}

function setDocumentPropertiesTab(tabName = "citation") {
  const showProvenance = tabName === "provenance";
  ui.propertyPanelSourceCitation.hidden = showProvenance;
  ui.propertyPanelProvenance.hidden = !showProvenance;
  ui.propertyTabSourceCitation.classList.toggle("is-active", !showProvenance);
  ui.propertyTabProvenance.classList.toggle("is-active", showProvenance);
  ui.propertyTabSourceCitation.setAttribute("aria-selected", String(!showProvenance));
  ui.propertyTabProvenance.setAttribute("aria-selected", String(showProvenance));
  ui.propertyTabSourceCitation.tabIndex = showProvenance ? -1 : 0;
  ui.propertyTabProvenance.tabIndex = showProvenance ? 0 : -1;
  if (ui.documentPropertiesTitle) ui.documentPropertiesTitle.textContent = showProvenance ? "Provenienz" : "Quellenangabe";
}

function setProvenanceLink(element, url, label = "") {
  if (!element) return;
  const href = String(url || "").trim();
  element.textContent = href ? (label || href) : "";
  if (href) element.href = href;
  else element.removeAttribute("href");
}

function getProvenanceLicenseId(license) {
  const name = String(license?.name || "").toLowerCase();
  const url = String(license?.url || "").toLowerCase();
  return Object.entries(PROVENANCE_LICENSES).find(([id, candidate]) => (
    id !== "unknown"
    && (url.includes(candidate.url.toLowerCase()) || name === candidate.name.toLowerCase()
      || (id === "cc-by-sa-4.0" && /attribution-share alike 4\.0|cc by-sa 4\.0/i.test(name)))
  ))?.[0] || "unknown";
}

function updateProvenanceLicenseLink() {
  const license = PROVENANCE_LICENSES[ui.provenanceLicenseSelect?.value] || PROVENANCE_LICENSES.unknown;
  setProvenanceLink(ui.provenanceLicenseLink, license.url, license.name);
}

function formatProvenanceTimestamp(value) {
  const date = new Date(value);
  return value && Number.isFinite(date.getTime())
    ? new Intl.DateTimeFormat("de-DE", /^\d{4}-\d{2}-\d{2}$/.test(String(value))
      ? { dateStyle: "medium" }
      : { dateStyle: "medium", timeStyle: "medium" }).format(date)
    : String(value || "");
}

function getProvenanceType(provenance) {
  const explicitType = String(provenance?.provenance_type || "");
  if (["wikisource", "file-import", "web-source", "other"].includes(explicitType)) return explicitType;
  const format = String(provenance?.format || "").toLowerCase();
  if (format === "wikisource" || String(provenance?.site || "").includes("wikisource.org")) return "wikisource";
  if (["pdf", "epub", "fb2", "mobi", "azw3"].includes(format)) return "file-import";
  if (provenance?.canonical_url) return "web-source";
  return "other";
}

function updateProvenanceFieldVisibility() {
  const selectedType = ui.provenanceTypeSelect?.value || "other";
  if (ui.provenanceEmptyHint && selectedType !== "other") ui.provenanceEmptyHint.hidden = true;
  ui.propertyPanelProvenance?.querySelectorAll("[data-provenance-only]").forEach((element) => {
    const allowedTypes = String(element.dataset.provenanceOnly || "").split(/\s+/);
    element.hidden = !allowedTypes.includes(selectedType);
  });
}

function renderDocumentProvenance(project) {
  const storedProvenance = project?.sourceMetadata && typeof project.sourceMetadata === "object"
    ? project.sourceMetadata
    : null;
  const provenance = storedProvenance || {};
  const hasData = Boolean(storedProvenance && Object.keys(storedProvenance).length);
  if (ui.provenanceEmptyHint) ui.provenanceEmptyHint.hidden = hasData;
  if (ui.provenanceContent) ui.provenanceContent.hidden = false;

  // Provenienz ist der Import-Snapshot und bleibt von der bibliografischen
  // Ebene getrennt. Nur die bewusst lokale Lizenzklassifikation ist editierbar.
  ui.provenanceProviderOutput.value = String(provenance.provider || "");
  ui.provenanceTypeSelect.value = getProvenanceType(provenance);
  ui.provenanceSiteOutput.value = String(provenance.site || "");
  ui.provenanceFormatOutput.value = String(provenance.format || "");
  const textBasisLabels = {
    "ws-export-epub-3": "Wikisource EPUB 3",
    "ws-export-epub-3+mediawiki-footnotes": "Wikisource EPUB 3 + MediaWiki-Fußnoten",
    "mediawiki-rendered-html": "Gerendertes MediaWiki-HTML",
  };
  const textBasis = String(provenance.extraction?.text_basis || "");
  const footnoteCount = Number(provenance.extraction?.footnote_count) || 0;
  ui.provenanceTextBasisOutput.value = `${textBasisLabels[textBasis] || textBasis}${footnoteCount ? ` · ${footnoteCount} Fußnoten` : ""}`;
  ui.provenancePageIdOutput.value = String(provenance.page_id || "");
  ui.provenanceRevisionIdOutput.value = String(provenance.revision_id || "");
  ui.provenanceParentRevisionIdOutput.value = String(provenance.revision_parent_id || "");
  ui.provenanceRevisionTimestampOutput.value = formatProvenanceTimestamp(provenance.revision_timestamp);
  ui.provenanceExportedAtOutput.value = formatProvenanceTimestamp(provenance.exported_at);
  ui.provenanceImportedAtOutput.value = formatProvenanceTimestamp(provenance.imported_at);
  ui.provenanceHashOutput.value = String(provenance.content_hash_sha256 || "");
  ui.provenanceLicenseSelect.value = getProvenanceLicenseId(provenance.license);

  setProvenanceLink(ui.provenanceSourceLink, provenance.canonical_url, "Wikisource-Seite öffnen");
  setProvenanceLink(ui.provenanceRevisionLink, provenance.revision_url, provenance.revision_id ? `Revision ${provenance.revision_id} öffnen` : "");
  setProvenanceLink(ui.provenanceEpubExportLink, provenance.extraction?.epub_export_url, "EPUB-Export öffnen");
  setProvenanceLink(ui.provenanceWikidataLink, provenance.wikidata?.url, provenance.wikidata?.id || "");
  updateProvenanceLicenseLink();

  clearElement(ui.provenanceRelatedLinks);
  const relatedLinks = Array.isArray(provenance.related_links) ? provenance.related_links : [];
  const importedPages = Array.isArray(provenance.imported_pages) ? provenance.imported_pages : [];
  const links = relatedLinks.length
    ? relatedLinks
    : importedPages.map((title) => ({
      title,
      url: `https://${provenance.site || "de.wikisource.org"}/wiki/${encodeURIComponent(String(title).replace(/ /g, "_"))}`,
    }));
  links.forEach((linkData) => {
    const link = document.createElement("a");
    link.className = "provenance-related-link";
    link.href = linkData.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = linkData.title || linkData.url;
    ui.provenanceRelatedLinks.appendChild(link);
  });
  if (!links.length) {
    const empty = document.createElement("span");
    empty.className = "property-hint";
    empty.textContent = "Keine weiteren Wikisource-Seiten verknüpft.";
    ui.provenanceRelatedLinks.appendChild(empty);
  }
  updateProvenanceFieldVisibility();
}

function openDocumentPropertiesDialog() {
  const project = getActiveProject();
  if (!project) return;
  const citation = normalizeCitationSource(project.citationSource, project);
  ui.sourceCitationTypeInput.value = citation.source_type;
  ui.sourceCitationTitleInput.value = citation.title;
  ui.sourceCitationSubtitleInput.value = citation.subtitle;
  ui.sourceCitationLeadInput.value = citation.lead;
  ui.sourceCitationLanguageInput.value = citation.language;
  ui.sourceCitationTextVersionInput.value = citation.text_version;
  ui.sourceCitationOriginalTitleInput.value = citation.original_title;
  ui.sourceCitationOriginalLanguageInput.value = citation.original_language;
  renderCitationPeople(ui.sourceCitationAuthorsList, citation.authors, "Autorin oder Autor");
  renderCitationPeople(ui.sourceCitationTranslatorsList, citation.translators, "Übersetzerin oder Übersetzer");
  ui.sourceCitationInstitutionalAuthorInput.value = citation.institutional_author;
  ui.sourceCitationNewsAgenciesInput.value = citation.news_agencies;
  ui.sourceCitationEditorsInput.value = citation.editors;
  ui.sourceCitationContributorsInput.value = citation.contributors;
  ui.sourceCitationContainerTitleInput.value = citation.container_title;
  ui.sourceCitationPublisherInput.value = citation.publisher;
  ui.sourceCitationPublisherPlaceInput.value = citation.publisher_place;
  ui.sourceCitationVolumeInput.value = citation.volume;
  ui.sourceCitationIssueInput.value = citation.issue;
  ui.sourceCitationPageRangeInput.value = citation.page_range;
  ui.sourceCitationIssuedYearInput.value = citation.issued_year;
  ui.sourceCitationIssuedDateInput.value = citation.issued_date;
  ui.sourceCitationEditionInput.value = citation.edition;
  ui.sourceCitationVersionStatementInput.value = citation.version_statement;
  ui.sourceCitationDoiInput.value = citation.doi;
  ui.sourceCitationUrlInput.value = citation.url;
  ui.sourceCitationArchiveUrlInput.value = citation.archive_url;
  ui.sourceCitationAccessedDateInput.value = citation.accessed_date;
  ui.sourceCitationStyleInput.value = citation.citation_style;
  renderDocumentProvenance(project);
  setDocumentPropertiesTab("citation");
  updateSourceCitationForm();
  setDialogOpen(true);
  ui.sourceCitationTitleInput?.focus();
  document.querySelectorAll(".editor-menu[open]").forEach((menu) => {
    menu.open = false;
  });
}

async function saveDocumentPropertiesDialog() {
  const title = ui.sourceCitationTitleInput.value.trim();
  if (!title) {
    ui.sourceCitationTitleInput.setCustomValidity("Bitte einen Titel angeben.");
    ui.sourceCitationTitleInput.reportValidity();
    return;
  }
  ui.sourceCitationTitleInput.setCustomValidity("");
  updateSourceCitationForm();
  updateActiveProject((project) => {
    const previousTitle = project.title;
    project.title = title;
    syncProjectTitleHeading(project, previousTitle);
    project.citationSource = readSourceCitationForm();
    const selectedProvenanceType = ui.provenanceTypeSelect?.value || "other";
    if ((project.sourceMetadata && typeof project.sourceMetadata === "object") || selectedProvenanceType !== "other") {
      project.sourceMetadata = project.sourceMetadata && typeof project.sourceMetadata === "object"
        ? project.sourceMetadata
        : {};
      const selectedLicense = PROVENANCE_LICENSES[ui.provenanceLicenseSelect?.value] || PROVENANCE_LICENSES.unknown;
      project.sourceMetadata.license = { ...selectedLicense };
      project.sourceMetadata.provenance_type = selectedProvenanceType;
    }
  });
  await flushAutosave();
  renderEditor();
  setDialogOpen(false);
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

function openLineNumberDialog() {
  const project = getActiveProject();
  if (!project) return;
  const settings = getProjectLineNumbering(project);
  if (ui.lineNumberEnabledInput) ui.lineNumberEnabledInput.checked = settings.enabled;
  if (ui.lineNumberModeInput) ui.lineNumberModeInput.value = settings.mode;
  if (ui.lineNumberIncludeBlankInput) ui.lineNumberIncludeBlankInput.checked = settings.includeBlankLines;
  if (ui.lineNumberFromInput) ui.lineNumberFromInput.value = String(settings.fromLine);
  if (ui.lineNumberIntervalInput) ui.lineNumberIntervalInput.value = String(settings.interval);
  if (ui.lineNumberStartInput) ui.lineNumberStartInput.value = String(settings.start);
  state.lineNumberStartIsAutomatic = settings.start === settings.interval;
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
      mode: ui.lineNumberModeInput?.value || "source-lines",
      includeBlankLines: ui.lineNumberIncludeBlankInput?.checked === true,
      fromLine: clampInteger(ui.lineNumberFromInput?.value, 1, 1, 99999),
      interval: clampInteger(ui.lineNumberIntervalInput?.value, 1, 1, 100),
      start: clampInteger(ui.lineNumberStartInput?.value, 1, 0, 99999),
    };
    project.source.lineNumbering = normalizeLineNumbering(settings);
    delete project.style.lineNumbering;
    delete project.style.lineNumbers;
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

function insertTableOfContentsObject() {
  updateActiveProject((project) => {
    const rawText = String(project.source.rawText || "");
    const withoutExistingToc = rawText
      .split(/\r?\n/)
      .filter((line) => !isTableOfContentsText(line))
      .join("\n");
    const normalized = ensureDocumentStructure(withoutExistingToc, project.title).trimEnd();
    const lines = normalized.split("\n");
    const titleIndex = lines.findIndex((line) => /^#\s+/.test(line) && !getParatextHeadingKind(line));
    const insertionIndex = titleIndex >= 0 ? titleIndex + 1 : lines.length;
    lines.splice(insertionIndex, 0, "", TOC_OBJECT_MARKER);
    project.source.rawText = `${lines.join("\n").replace(/\n{3,}/g, "\n\n")}\n`;
    project.tocVisible = true;
    delete project.chapterRoles?.[createChapterRoleKey(2, "Inhaltsverzeichnis")];
    syncProjectTitleFromHeading(project, { normalizeStructure: true });
    state.activeSourceRange = null;
  });
  renderEditor();
}

function removeCitationObjectBlock(rawText) {
  return removeLegacyCitationHeading(rawText)
    .split(/\r?\n/)
    .filter((line) => !isCitationObjectText(line))
    .join("\n")
    .trimEnd();
}

function removeLegacyCitationHeading(rawText) {
  const lines = String(rawText || "").split(/\r?\n/);
  const removedIndexes = new Set();
  lines.forEach((line, index) => {
    if (!isCitationObjectText(line)) return;
    let headingIndex = index - 1;
    while (headingIndex >= 0 && !lines[headingIndex].trim()) headingIndex -= 1;
    if (lines[headingIndex]?.trim().toLowerCase() === LEGACY_CITATION_OBJECT_HEADING.toLowerCase()) {
      removedIndexes.add(headingIndex);
      for (let blankIndex = headingIndex + 1; blankIndex < index; blankIndex += 1) removedIndexes.add(blankIndex);
    }
  });
  return lines
    .filter((_, index) => !removedIndexes.has(index))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
}

function toggleCitationObject() {
  updateActiveProject((project) => {
    const rawText = String(project.source.rawText || "");
    const withoutCitation = removeCitationObjectBlock(rawText);
    project.source.rawText = hasCitationObject(project)
      ? `${withoutCitation}\n`
      : `${withoutCitation}\n\n${CITATION_OBJECT_MARKER}\n`;
    delete project.chapterRoles?.[createChapterRoleKey(2, "Quellenangabe")];
    state.activeSourceRange = null;
  });
  renderEditor();
}

function renderNoActiveProjectState(message = "Wählen Sie im Browser ein Dokument aus.") {
  state.sourceModel = null;
  state.layoutModel = null;
  syncTableOfContentsMenuState(null);
  ui.previewPage?.classList.add("is-empty");
  ui.previewPage?.classList.remove("has-side-toc", "has-side-rail", "has-right-footnote-rail");
  ui.previewPage?.querySelector(".preview-side-toc")?.remove();
  ui.previewPage?.querySelector(".preview-side-footnotes-rail")?.remove();
  if (ui.previewRenderProgress) ui.previewRenderProgress.hidden = true;
  clearElement(ui.previewText);
  if (ui.previewText) {
    const empty = document.createElement("p");
    empty.className = "preview-empty-state";
    empty.textContent = message;
    ui.previewText.appendChild(empty);
  }
  ui.editorPanel?.classList.add("is-empty");
  if (ui.editorPanel) ui.editorPanel.inert = true;
  if (ui.textInput) {
    ui.textInput.value = "";
    ui.textInput.readOnly = true;
    ui.textInput.setAttribute("aria-label", "Kein Dokument geöffnet");
  }
  clearElement(ui.textInputHighlight);
  if (ui.exportProjectButton) ui.exportProjectButton.disabled = true;
  if (ui.printProjectButton) ui.printProjectButton.disabled = true;
}

function renderApp() {
  renderProjectList();
  if (!getActiveProject()) {
    renderNoActiveProjectState();
    return;
  }
  ui.previewPage?.classList.remove("is-empty");
  ui.editorPanel?.classList.remove("is-empty");
  if (ui.editorPanel) ui.editorPanel.inert = false;
  if (ui.exportProjectButton) ui.exportProjectButton.disabled = false;
  if (ui.printProjectButton) ui.printProjectButton.disabled = false;
  renderEditor();
}

function markProjectChanged(project) {
  if (!project) return;
  project.updatedAt = new Date().toISOString();
  state.previewDirty = true;
  state.previewRenderToken += 1;
  scheduleAutosave();
}

async function activateProject(projectId, options = {}) {
  const project = state.projects.find((candidate) => candidate.id === projectId);
  if (!project) return;
  if (options.resetSourceRange || (!options.preserveSourceRange && state.activeProjectId !== projectId)) {
    state.activeSourceRange = null;
  }
  state.activeProjectId = projectId;
  state.previewDirty = true;
  state.previewRenderToken += 1;
  if (!options.preserveExpandedState) {
    setProjectExpanded(projectId, true);
  }
  const token = ++state.projectActivationToken;
  renderProjectList();
  renderNoActiveProjectState("Dokument wird gesetzt …");
  await loadProjectFonts(project);
  if (token !== state.projectActivationToken || state.activeProjectId !== projectId) return;
  renderApp();
  scheduleAutosave();
}

function addProject(title = "Neues Dokument") {
  const project = createDefaultProject(title);
  state.projects.push(project);
  state.activeSourceRange = null;
  void activateProject(project.id, { resetSourceRange: true });
}

function addGeneratedProject(jsonInput) {
  const payload = typeof jsonInput === "string" ? parseGeneratedJson(jsonInput) : jsonInput;
  const sourceProject = getProjectFromGeneratedPayload(payload);
  const now = new Date().toISOString();
  const project = normalizeProject({
    ...sourceProject,
    id: createId("typemap-project"),
    createdAt: now,
    updatedAt: now,
  });
  project.metadata.textKind = "article";
  // Generierte Dokumente beginnen einheitlich im Stil „Artikel“; danach
  // bleiben individuelle Anpassungen des Nutzers erhalten.
  applyDocumentStylePreset(project, project.metadata.textKind);
  state.projects.push(project);
  state.activeSourceRange = null;
  state.editorDataView = "json";
  state.jsonEditorDraft = "";
  state.jsonEditorDraftProjectId = null;
  void activateProject(project.id, { resetSourceRange: true }).then(() => ui.textInput?.focus());
}

const WIKISOURCE_API_URL = "https://de.wikisource.org/w/api.php";

function setSearchDialogStatus(message = "", isError = false) {
  if (!ui.searchDialogStatus) return;
  ui.searchDialogStatus.textContent = message;
  ui.searchDialogStatus.classList.toggle("is-error", isError);
}

function setSearchDialogOpen(isOpen) {
  if (ui.searchDialogOverlay) ui.searchDialogOverlay.hidden = !isOpen;
  if (ui.searchDialog) ui.searchDialog.hidden = !isOpen;
  if (isOpen) window.setTimeout(() => ui.wikisourceSearchInput?.focus(), 0);
}

async function fetchWikisourceApi(parameters) {
  const query = new URLSearchParams({
    format: "json",
    formatversion: "2",
    origin: "*",
    ...parameters,
  });
  const response = await fetch(`${WIKISOURCE_API_URL}?${query}`);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.error) throw new Error(payload.error?.info || `wikisource-${response.status}`);
  return payload;
}

const WIKISOURCE_TEXT_TYPES = [
  "Roman", "Novelle", "Kurzgeschichte", "Erzählung", "Märchen", "Fabel",
  "Drama", "Tragödie", "Komödie", "Gedicht", "Sonett", "Ballade", "Ode",
  "Elegie", "Essay", "Brief", "Rede",
];

function getWikisourceResultTextTypes(textData, categories = []) {
  const declaredType = String(textData.GATTUNG || textData.TEXTSORTE || "").trim();
  const categoryText = categories.map((category) => String(category.title || "").replace(/^Kategorie:/i, "")).join("; ");
  const classificationText = [declaredType, categoryText].filter(Boolean).join("; ");
  const knownTypes = WIKISOURCE_TEXT_TYPES.filter((type) => new RegExp(`(?:^|[^\\p{L}])${type}(?:e|en|n)?(?:$|[^\\p{L}])`, "iu").test(classificationText));
  return knownTypes.length ? knownTypes : (declaredType ? [declaredType] : []);
}

function getWikisourceResultYear(textData) {
  const source = String(textData.ERSCHEINUNGSJAHR || textData.JAHR || textData.ENTSTEHUNGSJAHR || "");
  return source.match(/\b(?:1[0-9]{3}|20[0-9]{2})\b/)?.[0] || stripWikisourceMarkup(source);
}

async function enrichWikisourceSearchResults(results) {
  const enriched = new Map();
  // Die Such-API liefert Trefferrelevanz, aber keine bibliografischen Textdaten.
  // Diese werden in kleinen Batches aus den Seitenrevisionen ergänzt, damit die
  // Ergebnisliste fachliche Angaben statt redundanter Textausschnitte zeigt.
  for (let index = 0; index < results.length; index += 10) {
    const batch = results.slice(index, index + 10);
    const payload = await fetchWikisourceApi({
      action: "query",
      prop: "revisions|categories",
      rvprop: "content",
      rvslots: "main",
      cllimit: "max",
      clshow: "!hidden",
      redirects: "1",
      titles: batch.map((result) => result.title).join("|"),
    });
    (payload.query?.pages || []).forEach((page) => {
      const wikitext = page.revisions?.[0]?.slots?.main?.content || "";
      const textData = parseWikisourceTextData(wikitext);
      const metadata = { textData, categories: page.categories || [] };
      enriched.set(Number(page.pageid), metadata);
      enriched.set(String(page.title || "").toLocaleLowerCase("de"), metadata);
    });
  }
  return results.map((result) => {
    const metadata = enriched.get(Number(result.pageid))
      || enriched.get(String(result.title || "").toLocaleLowerCase("de"))
      || { textData: {}, categories: [] };
    const textData = metadata.textData;
    return {
      ...result,
      displayTitle: textData.TITEL || result.title,
      author: stripWikisourceMarkup(textData.AUTOR || ""),
      year: getWikisourceResultYear(textData),
      textTypes: getWikisourceResultTextTypes(textData, metadata.categories),
    };
  });
}

function updateWikisourceTextTypeFilter(results) {
  if (!ui.wikisourceTextTypeFilter) return;
  const types = Array.from(new Set(results.flatMap((result) => result.textTypes || [])))
    .sort((left, right) => left.localeCompare(right, "de"));
  clearElement(ui.wikisourceTextTypeFilter);
  ui.wikisourceTextTypeFilter.append(new Option("Alle Textsorten", "all"));
  types.forEach((type) => ui.wikisourceTextTypeFilter.append(new Option(type, type)));
  if (results.some((result) => !(result.textTypes || []).length)) {
    ui.wikisourceTextTypeFilter.append(new Option("Nicht bestimmt", "unknown"));
  }
  ui.wikisourceTextTypeFilter.value = "all";
  ui.wikisourceTextTypeFilter.disabled = results.length === 0;
}

function renderWikisourceSearchResults() {
  if (!ui.wikisourceSearchResults) return;
  clearElement(ui.wikisourceSearchResults);
  state.selectedWikisourcePage = null;
  if (ui.importWikisourceButton) ui.importWikisourceButton.disabled = true;
  const selectedType = ui.wikisourceTextTypeFilter?.value || "all";
  const results = state.wikisourceSearchResults.filter((result) => (
    selectedType === "all"
    || (selectedType === "unknown" && !(result.textTypes || []).length)
    || (result.textTypes || []).includes(selectedType)
  ));
  results.forEach((result) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "wikisource-result";
    button.setAttribute("role", "option");
    button.setAttribute("aria-selected", "false");
    const title = document.createElement("span");
    title.className = "wikisource-result-title";
    title.textContent = result.displayTitle || result.title;
    const meta = document.createElement("span");
    meta.className = "wikisource-result-meta";
    meta.textContent = [result.author || "Autor nicht angegeben", result.year || "Jahr nicht angegeben"].join(" · ");
    button.append(title, meta);
    button.addEventListener("click", () => {
      state.selectedWikisourcePage = { title: result.title, pageid: result.pageid };
      ui.wikisourceSearchResults.querySelectorAll(".wikisource-result").forEach((item) => {
        const selected = item === button;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-selected", String(selected));
      });
      if (ui.importWikisourceButton) ui.importWikisourceButton.disabled = false;
      setSearchDialogStatus(`„${result.displayTitle || result.title}“ ist ausgewählt.`);
    });
    ui.wikisourceSearchResults.appendChild(button);
  });
}

async function searchWikisource() {
  const searchTerm = ui.wikisourceSearchInput?.value.trim() || "";
  if (searchTerm.length < 2) {
    setSearchDialogStatus("Bitte mindestens zwei Zeichen eingeben.", true);
    ui.wikisourceSearchInput?.focus();
    return;
  }
  ui.wikisourceSearchButton.disabled = true;
  ui.wikisourceSearchButton.setAttribute("aria-busy", "true");
  setSearchDialogStatus("Wikisource wird durchsucht …");
  try {
    const payload = await fetchWikisourceApi({
      action: "query",
      list: "search",
      srsearch: searchTerm,
      srnamespace: "0",
      srlimit: "50",
      srprop: "snippet|timestamp",
    });
    const searchResults = payload.query?.search || [];
    setSearchDialogStatus(searchResults.length ? "Bibliografische Angaben werden ergänzt …" : "Keine passenden Werke gefunden.");
    let results = searchResults;
    try {
      results = await enrichWikisourceSearchResults(searchResults);
    } catch (metadataError) {
      results = searchResults.map((result) => ({ ...result, displayTitle: result.title, author: "", year: "", textTypes: [] }));
      console.warn("Wikisource-Textdaten konnten nicht vollständig ergänzt werden", metadataError);
    }
    state.wikisourceSearchResults = results;
    updateWikisourceTextTypeFilter(results);
    renderWikisourceSearchResults();
    setSearchDialogStatus(results.length ? `${results.length} Treffer gefunden.` : "Keine passenden Werke gefunden.");
  } catch (error) {
    setSearchDialogStatus(`Wikisource-Suche fehlgeschlagen: ${error?.message || "Unbekannter Fehler"}`, true);
  } finally {
    ui.wikisourceSearchButton.disabled = false;
    ui.wikisourceSearchButton.removeAttribute("aria-busy");
  }
}

function stripWikisourceMarkup(value) {
  return String(value || "")
    .replace(/<br\s*\/?>/gi, "; ")
    .replace(/<[^>]+>/g, "")
    .replace(/\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/g, "$1")
    .replace(/\[https?:\/\/[^\s\]]+\s+([^\]]+)\]/g, "$1")
    .replace(/\{\{[^{}]*\}\}/g, "")
    .replace(/'{2,}/g, "")
    .replace(/\s*;\s*/g, "; ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseWikisourceTextData(wikitext) {
  const start = String(wikitext || "").search(/\{\{\s*Textdaten\b/i);
  if (start < 0) return {};
  const lines = String(wikitext).slice(start).split(/\r?\n/);
  const result = {};
  for (const line of lines.slice(1)) {
    if (/^\s*\}\}/.test(line)) break;
    const match = line.match(/^\s*\|\s*([^=]+?)\s*=\s*(.*)$/);
    if (!match) continue;
    result[match[1].trim().toUpperCase()] = stripWikisourceMarkup(match[2]);
  }
  return result;
}

function formatImportedAuthorNames(value) {
  return String(value || "").split(/\s*;\s*|\s+und\s+/i).map((name) => {
    const cleaned = name.trim();
    if (!cleaned || cleaned.includes(",")) return cleaned;
    const parts = cleaned.split(/\s+/);
    if (parts.length < 2) return cleaned;
    let surnameStart = parts.length - 1;
    while (surnameStart > 0 && /^(?:von|van|de|del|der|den|zu|zur|zum)$/i.test(parts[surnameStart - 1])) surnameStart -= 1;
    return `${parts.slice(surnameStart).join(" ")}, ${parts.slice(0, surnameStart).join(" ")}`;
  }).filter(Boolean).join("; ");
}

function getWikisourcePageMarker(node) {
  if (!(node instanceof Element) || !/(?:^|\s)(?:PageNumber|seitennummer|ws-pagenum)(?:\s|$)/i.test(node.className)) return "";
  const match = String(node.textContent || "").match(/(?:Seite\s*)?([0-9]+|[ivxlcdm]+)/i);
  return match ? `[${match[1]}]` : "";
}

function wikisourceInlineToMarkdown(node, context) {
  if (node.nodeType === Node.TEXT_NODE) return String(node.nodeValue || "").replace(/\u00a0/g, " ");
  if (!(node instanceof Element)) return "";
  const pageMarker = getWikisourcePageMarker(node);
  if (pageMarker) return pageMarker;
  if (node.matches("sup.reference")) {
    const anchor = node.querySelector("a[href^='#cite_note-']");
    const targetId = anchor?.getAttribute("href")?.slice(1) || "";
    const label = String(node.textContent || "").replace(/[\[\]\s]/g, "") || String(context.nextFootnote++);
    if (targetId) context.footnoteLabels.set(targetId, label);
    return `[^${label}]`;
  }
  const content = Array.from(node.childNodes).map((child) => wikisourceInlineToMarkdown(child, context)).join("");
  if (node.matches("br")) return "\n";
  if (node.matches("strong,b")) return `__${content.trim()}__`;
  if (node.matches("em,i")) return `_${content.trim()}_`;
  if (node.matches("code")) return `\`${content.trim()}\``;
  return content;
}

function normalizeWikisourceBlockText(value) {
  return String(value || "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function wikisourceNodeToMarkdown(node, context, listDepth = 0) {
  if (!(node instanceof Element)) return "";
  if (node.matches("h1,h2,h3,h4,h5,h6")) {
    const level = Math.min(7, Math.max(2, Number(node.tagName.slice(1))));
    return `${"#".repeat(level)} ${normalizeWikisourceBlockText(wikisourceInlineToMarkdown(node, context))}`;
  }
  if (node.matches("p")) return normalizeWikisourceBlockText(wikisourceInlineToMarkdown(node, context));
  if (node.matches("blockquote")) {
    return normalizeWikisourceBlockText(wikisourceInlineToMarkdown(node, context)).split("\n").map((line) => `> ${line}`).join("\n");
  }
  if (node.matches("pre")) return `\`\`\`\n${String(node.textContent || "").trim()}\n\`\`\``;
  if (node.matches("ol.references")) {
    return Array.from(node.querySelectorAll(":scope > li")).map((item, index) => {
      const idMatch = item.id.match(/cite_note-(.+)$/);
      const label = context.footnoteLabels.get(item.id)
        || idMatch?.[1]?.replace(/-\d+$/, "")
        || String(index + 1);
      item.querySelectorAll(".mw-cite-backlink").forEach((backlink) => backlink.remove());
      return `[^${label}]: ${normalizeWikisourceBlockText(wikisourceInlineToMarkdown(item, context))}`;
    }).join("\n");
  }
  if (node.matches("ul,ol")) {
    return Array.from(node.children).filter((child) => child.matches("li")).map((item, index) => {
      const marker = node.matches("ol") ? `${index + 1}.` : "-";
      return `${"  ".repeat(listDepth)}${marker} ${normalizeWikisourceBlockText(wikisourceInlineToMarkdown(item, context))}`;
    }).join("\n");
  }
  if (node.matches("table")) {
    const tableText = normalizeWikisourceBlockText(node.textContent || "");
    if (!tableText
      || /\{\{\{\s*ANMERKUNG\s*\}\}\}/i.test(tableText)
      || /Nach oben/i.test(tableText)
      || /Dieser Text wurde .*Korrektur gelesen/i.test(tableText)) return "";
    const rows = Array.from(node.querySelectorAll(":scope > tbody > tr, :scope > tr"));
    if (!rows.length) return "";
    const cells = rows.map((row) => Array.from(row.querySelectorAll(":scope > th, :scope > td"))
      .map((cell) => normalizeWikisourceBlockText(wikisourceInlineToMarkdown(cell, context))));
    const width = Math.max(...cells.map((row) => row.length));
    if (!cells.some((row) => row.some(Boolean))) return "";
    const isDataTable = rows.length > 1 && width > 1 && node.querySelector("th");
    if (!isDataTable) return tableText;
    return cells.map((row, index) => `| ${Array.from({ length: width }, (_, cell) => row[cell] || "").join(" | ")} |${index === 0 ? `\n| ${Array(width).fill("---").join(" | ")} |` : ""}`).join("\n");
  }
  const pageMarker = getWikisourcePageMarker(node);
  if (pageMarker) return pageMarker;
  const hasBlockChildren = Array.from(node.children).some((child) => child.matches("address,article,aside,blockquote,div,dl,fieldset,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hr,main,nav,ol,p,pre,section,table,ul"));
  if (hasBlockChildren) {
    return Array.from(node.children)
      .map((child) => wikisourceNodeToMarkdown(child, context, listDepth))
      .filter(Boolean)
      .join("\n\n");
  }
  return normalizeWikisourceBlockText(wikisourceInlineToMarkdown(node, context));
}

function convertWikisourceHtmlToMarkdown(html) {
  const template = document.createElement("template");
  template.innerHTML = String(html || "");
  const root = template.content.querySelector(".mw-parser-output") || template.content;
  root.querySelectorAll("script,style,noscript,.mw-editsection,.ws-noexport,.noprint,.printfooter,.catlinks,.navbox,.sistersitebox,.licenseContainer,.textdaten,.Textdaten,.hiddenStructure,.zeilennummer,#bstand,#ws-cover,[style*='display:none' i]").forEach((node) => node.remove());
  const context = { nextFootnote: 1, footnoteLabels: new Map() };
  return Array.from(root.children)
    .map((node) => wikisourceNodeToMarkdown(node, context))
    .filter(Boolean)
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeImportedHeadingKey(value) {
  return String(value || "")
    .replace(/[*_#`]/g, "")
    .replace(/[„“”‚‘’«»‹›.,:;!?()\[\]]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("de-DE");
}

function removeRedundantWikisourceHeading(markdown, expectedTitle, options = {}) {
  const blocks = String(markdown || "").split(/\n{2,}/);
  const candidateIndex = blocks.findIndex((block) => !/^\s*\[(?:\d+|[ivxlcdm]+)\]\s*$/i.test(block));
  if (candidateIndex < 0) return markdown;
  const candidate = normalizeImportedHeadingKey(blocks[candidateIndex]);
  const expected = normalizeImportedHeadingKey(expectedTitle);
  const bothAreChapterLabels = options.chapter === true
    && /\bkapitel$/.test(candidate)
    && /\bkapitel$/.test(expected);
  if (candidate === expected || bothAreChapterLabels) blocks.splice(candidateIndex, 1);
  return blocks.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
}

function stripWikisourceEpubExportMatter(markdown) {
  let blocks = String(markdown || "").split(/\n{2,}/).filter((block) => block.trim());
  const exportNoticeIndex = blocks.findIndex((block) => /^(?:#{1,6}\s*)?Exportiert aus Wikisource am\b/i.test(block.trim()));
  if (exportNoticeIndex >= 0) {
    // Der WS-Export setzt vor diesen eindeutigen Hinweis ausschließlich sein
    // automatisch erzeugtes Titelblatt (Titel, Autor, Ort/Verlag und Jahr).
    // TypeMap-Objekte aus schon bearbeiteten Importen müssen dabei erhalten bleiben.
    const coverBlocks = blocks.slice(0, exportNoticeIndex + 1);
    const retainedToc = coverBlocks.find((block) => isTableOfContentsText(block));
    const retainedCitation = coverBlocks.find((block) => isCitationObjectText(block));
    blocks = [
      ...(retainedToc ? [TOC_OBJECT_MARKER] : []),
      ...blocks.slice(exportNoticeIndex + 1),
      ...(retainedCitation ? [CITATION_OBJECT_MARKER] : []),
    ];
  }

  const aboutIndex = blocks.findIndex((block) => (
    /^MediaWiki:Wsexport_about\s*$/i.test(block.trim())
    || /^#{1,6}\s+Über diese digitale Edition\s*$/i.test(block.trim())
  ));
  if (aboutIndex >= 0) {
    const exportAboutBlocks = blocks.slice(aboutIndex);
    const retainedCitation = exportAboutBlocks.some((block) => isCitationObjectText(block));
    blocks = [
      ...blocks.slice(0, aboutIndex),
      ...(retainedCitation ? [CITATION_OBJECT_MARKER] : []),
    ];
  }
  return blocks.join("\n\n").replace(/\n{3,}/g, "\n\n").trim();
}

function getWikisourceEpubExportDate(markdown) {
  const match = String(markdown || "").match(/Exportiert aus Wikisource am\s+(\d{1,2})\.\s*([\p{L}äöü]+)\s+(\d{4})/iu);
  if (!match) return "";
  const months = {
    januar: 1, februar: 2, märz: 3, april: 4, mai: 5, juni: 6,
    juli: 7, august: 8, september: 9, oktober: 10, november: 11, dezember: 12,
  };
  const month = months[match[2].toLocaleLowerCase("de-DE")];
  return month ? `${match[3]}-${String(month).padStart(2, "0")}-${String(match[1]).padStart(2, "0")}` : "";
}

function cleanStoredWikisourceMarkdown(markdown, title) {
  const source = String(markdown || "");
  const openingTitle = source.match(/^#\s+[^\n]+\n*/);
  const body = openingTitle ? source.slice(openingTitle[0].length).trim() : source.trim();
  const cleanedBody = removeRedundantWikisourceHeading(stripWikisourceEpubExportMatter(body), title);
  return openingTitle
    ? `${openingTitle[0].trim()}\n\n${cleanedBody}`.trim()
    : cleanedBody;
}

async function getWikisourceSubpages(title) {
  const pages = [];
  let continuation = "";
  do {
    const payload = await fetchWikisourceApi({
      action: "query",
      list: "allpages",
      apprefix: `${title}/`,
      apnamespace: "0",
      aplimit: "max",
      ...(continuation ? { apcontinue: continuation } : {}),
    });
    pages.push(...(payload.query?.allpages || []));
    continuation = payload.continue?.apcontinue || "";
  } while (continuation && pages.length < 250);
  return pages.sort((left, right) => left.title.localeCompare(right.title, "de", { numeric: true }));
}

async function sha256Text(value) {
  if (!crypto?.subtle) return "";
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(value || "")));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

const TYPEMAP_HELPER_ORIGINS = ["http://127.0.0.1:7319", "http://localhost:7319"];

async function fetchTypeMapHelper(path, options = {}) {
  const connectionErrors = [];
  // Browser und Windows lösen localhost nicht immer identisch auf. Beide lokalen
  // Adressen werden deshalb versucht; fachliche Serverfehler werden unverändert
  // zurückgegeben und nicht durch einen zweiten Request verdoppelt.
  for (const origin of TYPEMAP_HELPER_ORIGINS) {
    try {
      return await fetch(`${origin}${path}`, { cache: "no-store", ...options });
    } catch (error) {
      connectionErrors.push(error);
    }
  }
  const unavailable = new Error("typemap-helper-unreachable");
  unavailable.cause = connectionErrors.at(-1);
  throw unavailable;
}

function isTypeMapHelperUnavailable(error) {
  return error?.message === "typemap-helper-unreachable";
}

async function fetchWikisourceEpubDocument(title) {
  const response = await fetchTypeMapHelper("/api/typemap/import-wikisource-epub", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, language: "de" }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.document?.source_raw_markdown) {
    throw new Error(result.error || `epub-export-${response.status}`);
  }
  return result;
}

function prepareWikisourceEpubMarkdown(rawMarkdown, title) {
  let markdown = String(rawMarkdown || "").trim();
  const firstHeading = markdown.match(/^#\s+[^\n]+\n*/);
  if (firstHeading) markdown = markdown.slice(firstHeading[0].length).trim();
  // Einzelne EPUB-Spine-Dokumente beginnen häufig wieder mit H1. Im
  // zusammengeführten TypeMap-Werk sind diese Grenzen Kapitel (H2).
  markdown = markdown.replace(/^#\s+/gm, "## ");
  markdown = stripWikisourceEpubExportMatter(markdown);
  return normalizeImportedOriginalPageMarkers(removeRedundantWikisourceHeading(markdown, title)).trim();
}

function extractWikisourceFootnoteDefinitions(markdown) {
  return String(markdown || "").split("\n").map((line) => {
    const definition = getFootnoteDefinition(line);
    return definition ? { ...definition, markdown: `[^${definition.label}]: ${definition.content}` } : null;
  }).filter(Boolean);
}

function removeEpubFootnoteList(markdown) {
  const lines = String(markdown || "").split("\n");
  const headingIndex = lines.findIndex((line) => /^#{1,6}\s+Anmerkungen(?:\s+des Originals)?\s*$/i.test(line.trim()));
  if (headingIndex < 0) return markdown;
  const headingLevel = lines[headingIndex].match(/^#+/)?.[0].length || 2;
  let sectionEnd = lines.length;
  for (let index = headingIndex + 1; index < lines.length; index += 1) {
    const nextHeading = lines[index].match(/^(#{1,6})\s+/);
    if (nextHeading && nextHeading[1].length <= headingLevel) {
      sectionEnd = index;
      break;
    }
  }
  const section = lines.slice(headingIndex, sectionEnd).join("\n");
  // Nur die vom EPUB-Export erzeugte Rückverweisliste wird ersetzt. Eine echte,
  // redaktionelle Anmerkungssektion ohne diese Pfeile bleibt Werktext.
  if (!/(?:^|\n)\s*-\s*↑\s+/m.test(section)) return markdown;
  return [...lines.slice(0, headingIndex), ...lines.slice(sectionEnd)].join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function mergeWikisourceFootnoteSemantics(epubMarkdown, semanticMarkdown) {
  const definitions = extractWikisourceFootnoteDefinitions(semanticMarkdown);
  if (!definitions.length) return { markdown: epubMarkdown, footnoteCount: 0 };

  // WS Export bewahrt die sichtbare Referenz häufig als "[^[ 1 ]]", verliert
  // dabei aber ihre Zielbeziehung. Die MediaWiki-IDs liefern Label und Inhalt;
  // der EPUB-Text bestimmt weiterhin die sichtbare Position im Werktext.
  let markdown = String(epubMarkdown || "")
    .replace(/\[\^\s*\[\s*([^\]\r\n]+?)\s*\]\s*\]/g, (match, label) => `[^${String(label).trim()}]`);
  const semanticLabels = definitions.map((definition) => definition.label);
  const epubReferences = findFootnoteReferences(markdown);
  if (epubReferences.length === semanticLabels.length) {
    let referenceIndex = 0;
    markdown = markdown.replace(new RegExp(FOOTNOTE_REFERENCE_SOURCE, "g"), (match) => `[^${semanticLabels[referenceIndex++] || match.slice(2, -1)}]`);
  }
  const referencedLabels = new Set(findFootnoteReferences(markdown).map((reference) => reference.label.trim()));
  const matchedDefinitions = definitions.filter((definition) => referencedLabels.has(definition.label.trim()));
  if (!matchedDefinitions.length) return { markdown, footnoteCount: 0 };
  markdown = removeEpubFootnoteList(markdown);
  const definitionMarkdown = matchedDefinitions.map((definition) => definition.markdown).join("\n");
  return {
    markdown: `${markdown.trim()}\n\n${definitionMarkdown}`.trim(),
    footnoteCount: matchedDefinitions.length,
  };
}

async function importSelectedWikisourcePage() {
  const selection = state.selectedWikisourcePage;
  if (!selection) return;
  ui.importWikisourceButton.disabled = true;
  ui.importWikisourceButton.setAttribute("aria-busy", "true");
  setSearchDialogStatus("Werk und bibliografische Daten werden geladen …");
  try {
    const epubPromise = fetchWikisourceEpubDocument(selection.title)
      .then((result) => ({ result, error: null }))
      .catch((error) => ({ result: null, error }));
    const [parsed, pageInfo, subpages, epubImport] = await Promise.all([
      fetchWikisourceApi({ action: "parse", page: selection.title, prop: "text|sections|links|externallinks" }),
      fetchWikisourceApi({ action: "query", prop: "revisions|info|pageprops", ppprop: "wikibase_item", rvprop: "ids|timestamp|content", rvslots: "main", inprop: "url", redirects: "1", titles: selection.title }),
      getWikisourceSubpages(selection.title),
      epubPromise,
    ]);
    const page = pageInfo.query?.pages?.[0] || {};
    const revision = page.revisions?.[0] || {};
    const wikitext = revision.slots?.main?.content || "";
    const textData = parseWikisourceTextData(wikitext);
    let bodyMarkdown = removeRedundantWikisourceHeading(
      convertWikisourceHtmlToMarkdown(parsed.parse?.text || ""),
      textData.TITEL || selection.title,
    );
    const importedPages = [selection.title];

    // Kurze Übersichtsseiten mit echten Unterseiten werden vollständig aus den
    // Unterseiten zusammengesetzt; bereits transkludierte Volltexte bleiben einmalig.
    if (!epubImport.result && subpages.length && bodyMarkdown.length < 5000) {
      const parts = [];
      for (let index = 0; index < subpages.length; index += 4) {
        const batch = subpages.slice(index, index + 4);
        const responses = await Promise.all(batch.map((item) => fetchWikisourceApi({ action: "parse", page: item.title, prop: "text" })));
        responses.forEach((response, responseIndex) => {
          const subpage = batch[responseIndex];
          const subTitle = subpage.title.slice(selection.title.length + 1).replace(/_/g, " ");
          const content = removeRedundantWikisourceHeading(
            convertWikisourceHtmlToMarkdown(response.parse?.text || ""),
            subTitle,
            { chapter: true },
          );
          if (content) parts.push(`## ${subTitle}\n\n${content}`);
          importedPages.push(subpage.title);
        });
        setSearchDialogStatus(`Unterseiten werden zusammengesetzt … ${Math.min(index + 4, subpages.length)}/${subpages.length}`);
      }
      bodyMarkdown = parts.join("\n\n");
    }

    const title = textData.TITEL || selection.title.replace(/_/g, " ");
    const semanticMarkdown = bodyMarkdown;
    const epubMarkdown = epubImport.result
      ? prepareWikisourceEpubMarkdown(epubImport.result.document.source_raw_markdown, title)
      : "";
    const mergedEpub = epubMarkdown.length > 100
      ? mergeWikisourceFootnoteSemantics(epubMarkdown, semanticMarkdown)
      : { markdown: "", footnoteCount: 0 };
    const textBasis = epubMarkdown.length > 100
      ? (mergedEpub.footnoteCount ? "ws-export-epub-3+mediawiki-footnotes" : "ws-export-epub-3")
      : "mediawiki-rendered-html";
    if (epubMarkdown.length > 100) bodyMarkdown = mergedEpub.markdown;
    bodyMarkdown = normalizeImportedOriginalPageMarkers(bodyMarkdown);
    if (!bodyMarkdown.trim()) throw new Error("Kein nutzbarer Werktext gefunden.");
    const rawText = `# ${normalizeMarkdownHeadingText(title)}\n\n${bodyMarkdown.replace(/^#\s+[^\n]+\n*/i, "").trim()}\n`;
    const canonicalUrl = page.canonicalurl || `https://de.wikisource.org/wiki/${encodeURIComponent(selection.title.replace(/ /g, "_"))}`;
    const revisionUrl = revision.revid ? `${canonicalUrl}?oldid=${encodeURIComponent(revision.revid)}` : "";
    const wikidataId = String(page.pageprops?.wikibase_item || "");
    const indexLinks = (parsed.parse?.links || [])
      .filter((link) => Number(link.ns) === 104)
      .map((link) => ({
        type: "wikisource-index",
        title: link.title,
        url: `https://de.wikisource.org/wiki/${encodeURIComponent(String(link.title).replace(/ /g, "_"))}`,
      }));
    const externalLinks = (parsed.parse?.externallinks || []).map((url) => ({
      type: "external-source-link",
      title: (() => {
        try { return new URL(url).hostname; } catch (error) { return url; }
      })(),
      url,
    }));
    const citation = {
      ...createDefaultCitationSource(title),
      source_type: "book",
      title,
      subtitle: textData.SUBTITEL || "",
      authors: formatImportedAuthorNames(textData.AUTOR || ""),
      editors: formatImportedAuthorNames(textData.HERAUSGEBER || ""),
      translators: formatImportedAuthorNames(textData.ÜBERSETZER || ""),
      original_title: textData.ORIGINALTITEL || "",
      publisher: textData.VERLAG || "",
      publisher_place: textData.ERSCHEINUNGSORT || "",
      issued_year: (textData.ERSCHEINUNGSJAHR || "").match(/\d{4}/)?.[0] || "",
      edition: textData.AUFLAGE || "",
    };
    const project = createDefaultProject(title);
    project.source.rawText = rawText;
    project.citationSource = normalizeCitationSource(citation, project);
    project.metadata.textKind = "article";
    project.sourceMetadata = {
      provenance_type: "wikisource",
      format: "wikisource",
      provider: "Wikimedia Foundation",
      site: "de.wikisource.org",
      page_id: page.pageid || selection.pageid,
      revision_id: revision.revid || "",
      revision_parent_id: revision.parentid || "",
      revision_timestamp: revision.timestamp || "",
      canonical_url: canonicalUrl,
      revision_url: revisionUrl,
      exported_at: epubImport.result ? new Date().toISOString() : "",
      imported_at: new Date().toISOString(),
      imported_pages: importedPages,
      related_links: [
        ...indexLinks,
        ...externalLinks,
        ...importedPages.slice(1).map((importedTitle) => ({
          type: "wikisource-subpage",
          title: importedTitle,
          url: `https://de.wikisource.org/wiki/${encodeURIComponent(String(importedTitle).replace(/ /g, "_"))}`,
        })),
      ],
      extraction: {
        structure_basis: "mediawiki-api",
        text_basis: textBasis,
        footnote_basis: mergedEpub.footnoteCount ? "mediawiki-reference-ids" : "",
        footnote_count: mergedEpub.footnoteCount,
        epub_export_url: epubImport.result?.export_url || "",
        epub_fallback_reason: epubImport.error?.message || "",
        api_chapters: subpages.map((subpage) => subpage.title),
        epub_headings: Array.from(epubMarkdown.matchAll(/^##\s+(.+)$/gm), (match) => match[1].trim()),
      },
      wikidata: wikidataId ? {
        id: wikidataId,
        url: `https://www.wikidata.org/wiki/${encodeURIComponent(wikidataId)}`,
      } : null,
      content_hash_sha256: await sha256Text(rawText),
      license: {
        name: "Creative Commons Attribution-Share Alike 4.0",
        url: "https://creativecommons.org/licenses/by-sa/4.0/deed.de",
      },
    };
    addGeneratedProject(project);
    state.editorDataView = "markdown";
    setSearchDialogOpen(false);
  } catch (error) {
    setSearchDialogStatus(`Wikisource-Import fehlgeschlagen: ${error?.message || "Unbekannter Fehler"}`, true);
  } finally {
    ui.importWikisourceButton.disabled = !state.selectedWikisourcePage;
    ui.importWikisourceButton.removeAttribute("aria-busy");
  }
}

function setGenerateDialogOpen(isOpen) {
  if (ui.generateDialogOverlay) ui.generateDialogOverlay.hidden = !isOpen;
  if (ui.generateDialog) ui.generateDialog.hidden = !isOpen;
  if (isOpen) {
    setGenerateSourceMode(state.generateSourceMode, { resetPrompt: false });
    const target = state.generateSourceMode === "pdf"
      ? (ui.generatePdfApiKeyInput?.value ? ui.generatePdfFileInput : ui.generatePdfApiKeyInput)
      : state.generateSourceMode === "epub"
        ? ui.generateEpubFileInput
        : ui.generateSourceUrlInput;
    window.setTimeout(() => target?.focus(), 0);
  } else if (ui.generatePdfApiKeyInput) {
    ui.generatePdfApiKeyInput.value = "";
  }
}

function setGenerateSourceMode(mode, options = {}) {
  state.generateSourceMode = ["pdf", "epub"].includes(mode) ? mode : "web";
  const isPdf = state.generateSourceMode === "pdf";
  const isEpub = state.generateSourceMode === "epub";
  const isWeb = state.generateSourceMode === "web";
  ui.generateWebTab?.classList.toggle("is-active", isWeb);
  ui.generatePdfTab?.classList.toggle("is-active", isPdf);
  ui.generateEpubTab?.classList.toggle("is-active", isEpub);
  ui.generateWebTab?.setAttribute("aria-selected", String(isWeb));
  ui.generatePdfTab?.setAttribute("aria-selected", String(isPdf));
  ui.generateEpubTab?.setAttribute("aria-selected", String(isEpub));
  if (ui.generateWebTab) ui.generateWebTab.tabIndex = isWeb ? 0 : -1;
  if (ui.generatePdfTab) ui.generatePdfTab.tabIndex = isPdf ? 0 : -1;
  if (ui.generateEpubTab) ui.generateEpubTab.tabIndex = isEpub ? 0 : -1;
  if (ui.generateWebPanel) ui.generateWebPanel.hidden = !isWeb;
  if (ui.generatePdfPanel) ui.generatePdfPanel.hidden = !isPdf;
  if (ui.generateEpubPanel) ui.generateEpubPanel.hidden = !isEpub;
  if (ui.generatePromptField) ui.generatePromptField.hidden = !isWeb;
  if (ui.copyGeneratePromptButton) ui.copyGeneratePromptButton.hidden = !isWeb;
  if (ui.openGeneratedJsonEditorButton) ui.openGeneratedJsonEditorButton.hidden = !isWeb;
  if (ui.generatePromptButton) {
    ui.generatePromptButton.textContent = isPdf
      ? "PDF verarbeiten"
      : isEpub ? "E-Book importieren" : "Prompt generieren";
  }
  if (options.resetPrompt !== false) {
    if (ui.generatePromptOutput) ui.generatePromptOutput.value = "";
    if (ui.copyGeneratePromptButton) ui.copyGeneratePromptButton.disabled = true;
    setGenerateDialogStatus("");
  }
}

function setGenerateDialogStatus(message = "", isError = false) {
  if (!ui.generateDialogStatus) return;
  ui.generateDialogStatus.textContent = message;
  ui.generateDialogStatus.classList.toggle("is-error", isError);
}

function buildWebExtractionPrompt(sourceUrl) {
  const template = createDefaultProject("Titel der Quelle");
  template.id = "";
  template.createdAt = "";
  template.updatedAt = "";
  template.source.rawText = "# Titel der Quelle\n\nVollständiger Haupttext der Quelle …";
  template.citationSource = {
    ...createDefaultCitationSource("Titel der Quelle"),
    source_type: "webpage",
    url: sourceUrl,
    accessed_date: new Date().toISOString().slice(0, 10),
  };

  return `Du bereitest eine Webquelle für die Anwendung TypeMap auf.

Quelle: ${sourceUrl}

AUFGABE
1. Rufe die Quelle auf und extrahiere den vollständigen redaktionellen Haupttext. Entferne Navigation, Werbung, Cookie-Hinweise, Empfehlungen, Kommentare und sonstige Seitenelemente.
2. Erfasse einen ausdrücklich ausgewiesenen journalistischen Lead oder Teaser separat in citationSource.lead. Übernimm ihn nicht zusätzlich als ersten Absatz in source.rawText. Ist kein Lead eindeutig erkennbar, bleibt das Feld leer.
3. Bewahre Wortlaut, Reihenfolge, Absätze, Zwischenüberschriften, Zitate, Listen, Tabellen und Code. Fasse nichts zusammen, übersetze nichts und ergänze keine inhaltlichen Aussagen.
4. Ermittle die bibliografischen Angaben aus der sichtbaren Seite und – soweit eindeutig – aus strukturierten Metadaten. Erfinde keine Angaben; unbekannte Werte bleiben als leere Zeichenfolge erhalten.
5. Gib ausschließlich ein gültiges JSON-Objekt aus: kein Markdown-Codezaun, keine Einleitung und keine Erläuterung.

TYPEMAP-MARKDOWN IN source.rawText
- Die erste Zeile ist genau eine H1: "# Titel". Sie muss mit dem Feld title übereinstimmen.
- Gliedere echte Zwischenüberschriften hierarchisch mit ## bis #######. Erzeuge keine neuen Überschriften.
- Trenne jeden Absatz durch genau eine Leerzeile. Schreibe niemals zwei selbständige Absätze ohne freie Markdown-Zeile unmittelbar untereinander.
- Verwende __fett__, _kursiv_, ==markiert==, > Zitat, - Listenpunkt, 1. nummerierter Punkt, übliche Markdown-Tabellen und dreifache Backticks für Code.
- Verwende für Fußnoten ausschließlich Standard-Markdown: [^1] als Verweis und [^1]: Inhalt der Fußnote als Definition. Setze eine automatisch erzeugte Definition ohne Freizeile direkt in die nächste Zeile nach dem Text mit dem zugehörigen Verweis. Eine Freizeile würde den laufenden Absatz beenden und darf hier nicht automatisch ergänzt werden. Bereits an anderer Stelle stehende Definitionen sind gültiges Markdown und dürfen nicht umsortiert werden; für die Renderposition ist allein der Verweis im Fließtext maßgeblich.
- Ein Inhaltsverzeichnis wird nur bei Bedarf mit {{toc}} markiert.
- Sichtbare Originalpaginierung wird an ihrer Textposition ausschließlich als [12] beziehungsweise [iv] notiert; niemals als [p. 12]. Füge keine Seitenzahlen hinzu, die auf der Webseite nicht belegt sind.
- Vorder- oder Nachtexte können mit ::: front beziehungsweise ::: back beginnen und mit ::: beendet werden. Nutze diese Marker nur, wenn die Quelle diese Bereiche tatsächlich besitzt.
- Behalte relevante Bildunterschriften und Fußnoten vollständig bei. Erfinde keine Bild-URLs oder fehlenden Inhalte.

BIBLIOGRAFISCHE REGELN
- source_type ist einer dieser Werte: book, book_chapter, journal_article, newspaper_article, webpage, blog_post, report, legal_text, court_decision, manuscript, letter, email, other.
- Wähle journal_article nur bei einer erkennbaren Fachzeitschrift, newspaper_article bei einer Zeitung, blog_post bei einem Blog und report bei einem formal herausgegebenen Bericht; sonst webpage.
- title ist Pflicht. subtitle enthält nur einen ausdrücklich ausgewiesenen Untertitel. lead enthält ausschließlich einen redaktionell erkennbaren Lead oder Teaser, niemals eine selbst erzeugte Zusammenfassung.
- authors enthält namentlich ausgewiesene Personen als "NACHNAME, Vorname; NACHNAME, Vorname". Bei mehreren Personen dient das Semikolon als Trennzeichen. institutional_author enthält eine tatsächlich als Urheber verantwortliche Organisation.
- news_agencies enthält bei journalistischen Texten ausdrücklich genannte Nachrichtenagenturen oder Agenturcredits, beispielsweise "dpa; Reuters". Agenturen werden nicht als Autoren oder institutionelle Urheber umgedeutet. authors und news_agencies dürfen gleichzeitig belegt sein.
- container_title bezeichnet Website, Zeitung, Zeitschrift oder übergeordnetes Werk. publisher und publisher_place werden nur bei belegten Angaben gesetzt.
- issued_date verwendet nach Möglichkeit YYYY-MM-DD; issued_year nur das vierstellige Erscheinungsjahr. Verwende nicht das Abrufdatum als Erscheinungsdatum.
- url enthält die kanonische Artikel-URL, archive_url nur eine belegte Archivfassung und accessed_date das vorgegebene Abrufdatum.
- doi enthält nur einen tatsächlich angegebenen DOI. citation_style bleibt "Hausstil"; short_citation und full_citation bleiben leer, da TypeMap sie berechnet.
- text_version ist "translation" nur bei einer erkennbaren Übersetzung. Dann original_title, original_language und translators ausfüllen; andernfalls "original".
- citationSource.language und style.language verwenden de, en, fr oder la. Autorenname, Agenturcredit, Untertitel und Lead stehen ausschließlich unter citationSource; lege dafür keine parallelen Felder unter metadata an.
- Setze metadata.textKind bei journalistischen Artikeln, Zeitungstexten und redaktionellen Webbeiträgen auf "article", bei wissenschaftlichen Aufsätzen auf "paper" und bei universellen Rohtexten auf "notebook".
- Behalte die vorgegebenen Darstellungswerte unter style, typography, paratextVisibility, chapterRoles und tocVisible unverändert. Verwende leere id-/Zeitfelder; TypeMap vergibt diese lokal.

EXAKTE JSON-GRUNDFORM
${JSON.stringify(template, null, 2)}`;
}

function buildPdfTranscriptionPrompt(filename = "PDF-Quelle") {
  return `Transkribiere die beigefügte PDF-Quelle vollständig und werkgetreu für TypeMap.

ZIEL
Erzeuge eine lesbare, semantisch gegliederte Transkription samt professionellen bibliografischen Angaben. Fasse nichts zusammen, übersetze nichts und ergänze keine Aussagen.

TRANSKRIPTION
- Nutze die eingebettete Textebene oder OCR nur als Ausgangspunkt und prüfe sie gegen die sichtbaren Seiten.
- Rekonstruiere die richtige Lesereihenfolge bei Spalten, Textkästen, Marginalien, Tabellen, Bildunterschriften, Vorder- und Nachtexten.
- Entferne Scanrauschen, technische Zeilenumbrüche, wiederholte Zeichen sowie wiederkehrende Kolumnentitel, Kopf- und Fußzeilen.
- Korrigiere ausschließlich eindeutige Erkennungsfehler. Historische Orthografie, Grammatik, Zeichensetzung, Stil und sachliche Fehler bleiben unverändert.
- Löse druckbedingte Trennungen nur bei eindeutiger Wortkontinuität auf. Echte Bindestriche bleiben erhalten.
- Prüfe besonders Ligaturen, Lang-s und Verwechslungen wie rn/m, l/I/1, O/0 und c/e.
- Kennzeichne Unleserliches als ⟦unleserlich⟧ und unsichere Lesarten als ⟦unklar: vermutete Lesart⟧. Erfinde nichts und lasse keine ungewöhnliche Passage stillschweigend aus.

DRUCKPAGINIERUNG
- Maßgeblich sind ausschließlich sichtbare Seitenzahlen des gedruckten Werks, niemals PDF-Seitenzahlen oder Scanblattnummern.
- Setze sie am exakten Seitenübergang als [12] beziehungsweise [iv], niemals als [p. 12].
- Bleibt ein Satz über den Seitenwechsel hinweg bestehen, steht der Marker inline an dieser Stelle.
- Erfinde keine fehlenden oder unlesbaren Seitenzahlen.

MARKDOWN IN source_raw_markdown
- Die erste Zeile ist genau eine H1 mit dem Werktitel.
- Verwende ## bis ####### nur für echte Überschriften.
- Trenne jeden Absatz durch genau eine Leerzeile.
- Erhalte Hervorhebungen mit __fett__, _kursiv_ und ==markiert== sowie Zitate, Listen, Tabellen und Code entsprechend der Vorlage.
- Fußnoten verwenden [^1] als Verweis und [^1]: Inhalt als Definition. Eine automatisch erzeugte Definition steht ohne Freizeile direkt in der nächsten Zeile nach dem Text mit dem zugehörigen Verweis; dadurch bleibt der laufende Absatz erhalten. Bereits abweichend platzierte Definitionen bleiben an ihrem belegten Ort; die Renderposition richtet sich ausschließlich nach dem Verweis im Fließtext.
- Vorder- und Nachtexte können bei eindeutiger Abgrenzung mit ::: front beziehungsweise ::: back markiert werden.

BIBLIOGRAFIE UND SEMANTIK
- Ermittle Angaben vorrangig aus Titelblatt, Impressum und dem sichtbaren Werk; Dateiname und PDF-Metadaten sind nur Hilfen.
- Erfasse Titel, Untertitel, Personen, institutionelle Urheber, Agenturen, Herausgeber, Mitwirkende, Übersetzer, Originaltitel, Sprache, übergeordnetes Werk, Verlag, Ort, Ausgabe, Band, Heft, Seitenbereich, Datum, DOI und URL nur, wenn sie belegt sind.
- Personennamen stehen als "NACHNAME, Vorname"; mehrere Personen werden mit Semikolon getrennt.
- Wähle den zutreffenden source_type und text_kind.
- Halte technische Besonderheiten unter transcription.notes sowie unsichere Stellen unter transcription.uncertain_passages mit page, reading und reason fest.

Quelle: ${filename}

Gib ausschließlich die durch das vorgegebene JSON-Schema verlangten Daten zurück.`;
}

function readFileAsDataUrl(file, expectedPrefix = "data:application/pdf;base64,") {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const dataUrl = String(reader.result || "");
      if (!/^data:[^;]*;base64,/.test(dataUrl) || (expectedPrefix && !dataUrl.startsWith(expectedPrefix))) {
        reject(new Error("source-read-failed"));
      }
      else resolve(dataUrl);
    });
    reader.addEventListener("error", () => reject(new Error("source-read-failed")));
    reader.readAsDataURL(file);
  });
}

function addGeneratedSourceDocument(documentData, filename, sourceKind) {
  if (!documentData || typeof documentData !== "object") throw new Error("invalid-ai-result");
  const rawText = String(documentData.source_raw_markdown || "").trim();
  if (!rawText || !/^#\s+\S/m.test(rawText)) throw new Error("invalid-ai-result");
  const fallbackTitle = ["epub", "fb2", "mobi", "azw3"].includes(sourceKind)
    ? "E-Book-Quelle"
    : "PDF-Quelle";
  const title = String(documentData.citation_source?.title || documentData.title || fallbackTitle).trim();
  const project = createDefaultProject(title || fallbackTitle);
  project.source.rawText = rawText;
  project.metadata.textKind = normalizeDocumentStyleId(documentData.text_kind || "article");
  project.metadata.transcription = normalizeTranscriptionMetadata({
    source_kind: sourceKind,
    source_reference: filename,
    ...(documentData.transcription || {}),
  });
  project.citationSource = normalizeCitationSource(documentData.citation_source || {}, project);
  project.title = project.citationSource.title || title || fallbackTitle;
  if (documentData.source_metadata && typeof documentData.source_metadata === "object") {
    // Formatnahe Metadaten bleiben getrennt von der Quellenangabe erhalten. Sie
    // dienen später als belegte Eingangsdaten für Policy-/Kontor-Prüfungen.
    project.sourceMetadata = structuredClone(documentData.source_metadata);
  }
  addGeneratedProject(project);
}

async function processPdfSourceWithApi() {
  const apiKey = ui.generatePdfApiKeyInput?.value.trim() || "";
  const provider = ui.generatePdfProviderInput?.value || "google";
  const model = ui.generatePdfModelInput?.value.trim()
    || (provider === "google" ? "gemini-2.5-flash" : "gpt-5.5");
  const file = ui.generatePdfFileInput?.files?.[0] || null;
  if (!apiKey) {
    setGenerateDialogStatus("Bitte einen API-Key eingeben.", true);
    ui.generatePdfApiKeyInput?.focus();
    return;
  }
  if (!file || (file.type && file.type !== "application/pdf") || !/\.pdf$/i.test(file.name)) {
    setGenerateDialogStatus("Bitte eine PDF-Datei auswählen.", true);
    ui.generatePdfFileInput?.focus();
    return;
  }
  if (file.size > 50 * 1024 * 1024) {
    setGenerateDialogStatus("Die PDF-Datei überschreitet das API-Limit von 50 MB.", true);
    return;
  }

  const startedAt = Date.now();
  const updateElapsedTime = () => {
    const elapsedSeconds = Math.floor((Date.now() - startedAt) / 1000);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = String(elapsedSeconds % 60).padStart(2, "0");
    setGenerateDialogStatus(`PDF wird analysiert und abschnittsweise verarbeitet … ${minutes}:${seconds}`);
  };
  ui.generatePromptButton.disabled = true;
  ui.generatePromptButton.setAttribute("aria-busy", "true");
  updateElapsedTime();
  const elapsedTimer = window.setInterval(updateElapsedTime, 1000);
  try {
    const fileData = await readFileAsDataUrl(file);
    // Der Helfer hat eine feste lokale Adresse, damit TypeMap auch über file:, Live Server
    // oder einen anderen Entwicklungsport geöffnet werden kann.
    const response = await fetchTypeMapHelper("/api/typemap/transcribe-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider,
        apiKey,
        model,
        filename: file.name,
        fileData,
        prompt: buildPdfTranscriptionPrompt(file.name),
      }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || `api-error-${response.status}`);
    addGeneratedSourceDocument(result.document, file.name, "pdf");
    setGenerateDialogOpen(false);
  } catch (error) {
    const message = isTypeMapHelperUnavailable(error)
      ? "Der lokale TypeMap-Helfer ist nicht erreichbar. Öffnen Sie TypeMap über TypeMap-starten.cmd."
      : error?.message === "invalid-ai-result"
        ? "Die KI-Antwort enthielt kein vollständiges TypeMap-Dokument. Versuchen Sie es erneut oder wählen Sie ein leistungsfähigeres Modell."
        : `PDF-Verarbeitung fehlgeschlagen: ${error?.message || "Unbekannter Fehler"}`;
    setGenerateDialogStatus(message, true);
  } finally {
    window.clearInterval(elapsedTimer);
    if (ui.generatePdfApiKeyInput) ui.generatePdfApiKeyInput.value = "";
    ui.generatePromptButton.disabled = false;
    ui.generatePromptButton.removeAttribute("aria-busy");
  }
}

async function processEbookSource() {
  const file = ui.generateEpubFileInput?.files?.[0] || null;
  const format = file?.name.match(/\.([^.]+)$/)?.[1]?.toLowerCase() || "";
  if (!file || !["epub", "fb2", "mobi", "azw3"].includes(format)) {
    setGenerateDialogStatus("Bitte eine EPUB-, FB2-, MOBI- oder AZW3-Datei auswählen.", true);
    ui.generateEpubFileInput?.focus();
    return;
  }
  if (file.size > 50 * 1024 * 1024) {
    setGenerateDialogStatus("Die E-Book-Datei überschreitet das Importlimit von 50 MB.", true);
    return;
  }

  ui.generatePromptButton.disabled = true;
  ui.generatePromptButton.setAttribute("aria-busy", "true");
  setGenerateDialogStatus("E-Book-Struktur und Metadaten werden ausgewertet …");
  try {
    const fileData = await readFileAsDataUrl(file, "");
    const response = await fetchTypeMapHelper("/api/typemap/import-ebook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, fileData }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || `api-error-${response.status}`);
    addGeneratedSourceDocument(result.document, file.name, result.document?.source_metadata?.format || format);
    setGenerateDialogOpen(false);
  } catch (error) {
    const message = isTypeMapHelperUnavailable(error)
      ? "Der lokale TypeMap-Helfer ist nicht erreichbar. Öffnen Sie TypeMap über TypeMap-starten.cmd."
      : error?.message === "invalid-ai-result"
        ? "Das E-Book enthielt keinen als TypeMap-Dokument nutzbaren Haupttext."
        : `E-Book-Import fehlgeschlagen: ${error?.message || "Unbekannter Fehler"}`;
    setGenerateDialogStatus(message, true);
  } finally {
    ui.generatePromptButton.disabled = false;
    ui.generatePromptButton.removeAttribute("aria-busy");
  }
}

function parseGeneratedJson(text) {
  let candidate = String(text || "").trim();
  candidate = candidate.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  try {
    return JSON.parse(candidate);
  } catch (initialError) {
    const firstBrace = candidate.indexOf("{");
    const lastBrace = candidate.lastIndexOf("}");
    if (firstBrace < 0 || lastBrace <= firstBrace) throw initialError;
    return JSON.parse(candidate.slice(firstBrace, lastBrace + 1));
  }
}

function getProjectFromGeneratedPayload(payload) {
  if (payload?.source && typeof payload.source.rawText === "string") return payload;
  if (Array.isArray(payload?.state?.projects) && payload.state.projects[0]) return payload.state.projects[0];
  if (Array.isArray(payload?.projects) && payload.projects[0]) return payload.projects[0];
  throw new Error("missing-project");
}

function applyJsonEditorDraft() {
  const activeProject = getActiveProject();
  if (!activeProject || state.jsonEditorDraftProjectId !== activeProject.id) return;
  if (!state.jsonEditorDraft.trim()) {
    ui.textInput?.removeAttribute("aria-invalid");
    return;
  }
  try {
    const sourceProject = getProjectFromGeneratedPayload(parseGeneratedJson(state.jsonEditorDraft));
    const normalized = normalizeProject({
      ...sourceProject,
      id: activeProject.id,
      createdAt: activeProject.createdAt,
      updatedAt: new Date().toISOString(),
    });
    const projectIndex = state.projects.findIndex((project) => project.id === activeProject.id);
    if (projectIndex < 0) return;
    state.projects[projectIndex] = normalized;
    state.previewDirty = true;
    state.previewRenderToken += 1;
    state.jsonEditorDraft = "";
    state.jsonEditorDraftProjectId = null;
    ui.textInput?.removeAttribute("aria-invalid");
    renderApp();
    scheduleAutosave();
  } catch (error) {
    ui.textInput?.setAttribute("aria-invalid", "true");
  }
}

function deleteProject(projectId) {
  if (state.projects.length <= 1) {
    state.projects = [createDefaultProject("Neues Dokument")];
    state.activeProjectId = null;
  } else {
    state.projects = state.projects.filter((project) => project.id !== projectId);
    if (state.activeProjectId === projectId) {
      state.activeProjectId = null;
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
  syncTableOfContentsMenuState(project);
  if (options.renderBrowser !== false) {
    renderProjectList();
  }
}

function updateActiveProjectTextFromEditor(nextText) {
  updateActiveProject((project) => {
    if (!state.activeSourceRange) {
      project.source.rawText = nextText;
      syncProjectTitleFromHeading(project);
      return;
    }
    const sourceModel = buildSourceModel(project);
    const range = getActiveSourceRangeForProject(project, sourceModel);
    if (!range || range.id === "document-root") {
      project.source.rawText = nextText;
      syncProjectTitleFromHeading(project);
      state.activeSourceRange = null;
      return;
    }
    const before = project.source.rawText.slice(0, range.startOffset);
    const after = project.source.rawText.slice(range.endOffset);
    const needsTrailingBreak = after.trimStart().startsWith("#") && nextText && !/\n\s*\n$/.test(nextText);
    const replacementText = needsTrailingBreak ? `${nextText.replace(/\s+$/, "")}\n\n` : nextText;
    project.source.rawText = `${before}${replacementText}${after}`;
    syncProjectTitleFromHeading(project);
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
  if (!state.projects.length) state.projects = [createDefaultProject("Neues Dokument")];
  // Ein gespeicherter Arbeitsstand enthält weiterhin alle Dokumente, öffnet
  // nach Start oder Refresh aber bewusst keines davon automatisch.
  state.activeProjectId = null;
  state.activeSourceRange = null;
  state.projectActivationToken += 1;
  renderApp();
  scheduleAutosave();
}

function exportProjects() {
  const blob = new Blob([JSON.stringify(buildSnapshot(), null, 2)], { type: "application/json" });
  downloadBlob(blob, "typemap-dokument.json");
}

function exportActiveProjectJson() {
  const project = getActiveProject();
  if (!project) return;
  const payload = {
    type: "typemap-project-export",
    version: PROJECT_FILE_VERSION,
    exportedAt: new Date().toISOString(),
    state: {
      activeProjectId: project.id,
      projects: [project],
    },
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  downloadBlob(blob, `${slugifyFilename(project.title, "typemap-dokument")}.json`);
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
  const rawText = String(project.source.rawText || "");
  if (!hasCitationObject(project)) {
    return rawText.replace(/\n{3,}/g, "\n\n");
  }

  const body = removeCitationObjectBlock(rawText).trimEnd();
  const citation = normalizeCitationSource(project.citationSource, project);
  const formatted = formatSourceCitation(citation);
  let citationMarkdown = formatted.full;
  if (formatted.italicTitle) {
    const titleIndex = citationMarkdown.indexOf(formatted.italicTitle);
    if (titleIndex >= 0) {
      citationMarkdown = `${citationMarkdown.slice(0, titleIndex)}_${formatted.italicTitle}_${citationMarkdown.slice(titleIndex + formatted.italicTitle.length)}`;
    }
  }

  // Zwei bewusst erhaltene Leerzeilen trennen den bibliografischen Nachweis
  // vom Dokumenttext; der interne Objektmarker gehört nicht in die Exportdatei.
  return body ? `${body}\n\n\n${citationMarkdown}\n` : `${citationMarkdown}\n`;
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

function buildHtmlBlockMarkup(block, textType, chapterNumbers = false, project = null) {
  if (isTableOfContentsBlock(block)) return "";
  if (isOriginalPageMarkerBlock(block)) return "";
  if (isParatextMarkerBlock(block)) return "";
  const element = createMarkdownBlockElement(block, textType, { chapterNumbers, project });
  element.classList.add("preview-body-block");
  if (getMarkdownHeadingLevel(block.text)) {
    element.id = getPreviewHeadingId(block.sourceStartOffset);
  }
  if (textType === "lyric" && !String(block.text || "").trim()) {
    element.dataset.sourceBlankLine = "true";
  }
  if (block.sourceLineId) {
    element.dataset.sourceLineId = block.sourceLineId;
    element.classList.add("preview-source-line-block");
  }
  element.dataset.sourceStart = String(block.sourceStartOffset);
  element.dataset.sourceEnd = String(block.sourceEndOffset);
  element.dataset.matter = block.matter || "body";
  element.dataset.chapterRole = block.chapterRole || "";
  return element.outerHTML;
}

function buildChapterGroupedHtmlMarkup(blocks, textType, chapterNumbers = false, project = null) {
  const definitions = new Map();
  blocks.forEach((block) => {
    const definition = getFootnoteDefinition(block.text);
    if (definition && !definitions.has(definition.label)) {
      definitions.set(definition.label, block);
    }
  });

  const markup = [];
  let chapterFootnotes = [];
  let chapterLabels = new Set();

  const flushChapterFootnotes = () => {
    if (!chapterFootnotes.length) return;
    const notes = chapterFootnotes
      .map((block) => buildHtmlBlockMarkup(block, textType, chapterNumbers, project))
      .join("");
    markup.push(`<section class="chapter-footnotes" aria-label="Fußnoten">${notes}</section>`);
    chapterFootnotes = [];
    chapterLabels = new Set();
  };

  blocks.forEach((block) => {
    if (getFootnoteDefinition(block.text)) return;
    const headingLevel = getMarkdownHeadingLevel(block.text);
    const headingMatch = String(block.text || "").match(/^(#{1,7})\s+(.+)$/);
    const explicitRole = headingMatch
      ? getExplicitChapterRole(project, headingLevel, getPlainDocumentLabel(headingMatch[2]))
      : "";
    // H2 eröffnet regulär ein Kapitel; explizit als Hauptkapitel markierte
    // Überschriften dürfen dieselbe Grenze auch auf anderer Ebene festlegen.
    const startsChapter = headingLevel === 2 || explicitRole === "main";
    const endsDocumentBody = isCitationObjectText(block.text);
    if (startsChapter || endsDocumentBody) flushChapterFootnotes();

    markup.push(buildHtmlBlockMarkup(block, textType, chapterNumbers, project));
    findFootnoteReferences(block.text).forEach(({ label }) => {
      if (chapterLabels.has(label) || !definitions.has(label)) return;
      chapterLabels.add(label);
      chapterFootnotes.push(definitions.get(label));
    });
  });
  flushChapterFootnotes();
  return markup.join("");
}

function buildHtmlFontFaceCss(project) {
  const style = project?.style || {};
  const families = [
    style.fontFamily,
    style.titleFontFamily,
    style.subtitleFontFamily,
    style.metaFontFamily,
    style.headingFontFamily,
    style.quoteFontFamily,
  ].join(" ");
  if (!families.includes("CMU Serif")) return "";
  return `
    @font-face { font-family: "CMU Serif"; src: url("../assets/fonts/cmu/cmunrm.ttf") format("truetype"); font-weight: 400; font-style: normal; font-display: swap; }
    @font-face { font-family: "CMU Serif"; src: url("../assets/fonts/cmu/cmunti.ttf") format("truetype"); font-weight: 400; font-style: italic; font-display: swap; }
    @font-face { font-family: "CMU Serif"; src: url("../assets/fonts/cmu/cmunbx.ttf") format("truetype"); font-weight: 700; font-style: normal; font-display: swap; }
    @font-face { font-family: "CMU Serif"; src: url("../assets/fonts/cmu/cmunbi.ttf") format("truetype"); font-weight: 700; font-style: italic; font-display: swap; }
`;
}

function buildHtmlAppFontLinks() {
  return `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Source+Code+Pro:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=Source+Sans+3:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap" rel="stylesheet">`;
}

function buildHtmlExport(project) {
  const metadata = project.metadata || {};
  const bodyFontFamily = getEffectiveBodyFontFamily(project);
  const citationSource = project.citationSource || {};
  const authors = getDisplayedAuthors(project);
  const sourceModel = buildSourceModel(project);
  const layoutModel = buildBrowserLayoutModel(sourceModel, project.style);
  const hasSourceTitleHeading = projectStartsWithTitleHeading(project);
  const textType = project.source.textType || "prose";
  const documentTitleAlign = getDocumentTitleAlignment(project);
  const headingScale = {
    ...(getDocumentStylePreset(project.metadata?.textKind)?.headingScale || {}),
    ...(project.typography?.headingScale || {}),
  };
  const titleScale = {
    ...(getDocumentStylePreset(project.metadata?.textKind)?.titleScale || {}),
    ...(project.typography?.titleScale || {}),
  };
  if (metadata.textKind === "paper") {
    titleScale.authors = 1;
    titleScale.authorsLineHeight = 1.3;
  }
  const leadPresentation = getLeadPresentation(project, titleScale);
  const lineNumbering = getProjectLineNumbering(project);
  const hyphenationSettings = normalizeHyphenationSettings(project.style.hyphenationSettings, project.style.hyphenation, project.style.language);
  const exportBlocks = lineNumbering.mode === "source-lines" && textType === "lyric"
    ? layoutModel.sourceLineBlocks
    : layoutModel.blocks;
  const hiddenParatextRanges = collectHiddenParatextRanges(project, sourceModel);
  const visibleExportBlocks = exportBlocks.filter((block) => !isBlockHiddenByParatextVisibility(block, hiddenParatextRanges));
  const contentExportBlocks = hasSourceTitleHeading
    ? visibleExportBlocks.filter((block) => {
      const text = String(block.text || "").trim();
      return !(/^#\s+/.test(text) && getPlainDocumentLabel(text.replace(/^#\s+/, "")) === project.title);
    })
    : visibleExportBlocks;
  const hasTocObject = project.tocVisible !== false && visibleExportBlocks.some(isTableOfContentsBlock);
  const hasRenderableSideToc = hasTocObject && sourceModel.sections.length > 0;
  // HTML und Druck gruppieren Definitionen am Ende des Kapitels. Die Quelle
  // selbst bleibt unverändert und die Zuordnung folgt dem Fußnotenverweis.
  const blocks = buildChapterGroupedHtmlMarkup(
    contentExportBlocks,
    textType,
    project.style.chapterNumbers === true,
    project,
  );
  const tocHtml = hasRenderableSideToc
    ? `<nav class="html-side-toc" aria-label="Inhaltsverzeichnis">
      <span class="html-side-toc-title">Inhaltsverzeichnis</span>
      ${sourceModel.sections
        .filter((section) => !isTableOfContentsSection(section)
          && !isBlockHiddenByParatextVisibility({ matter: section.matter, sourceStartOffset: section.startOffset }, hiddenParatextRanges))
        .map((section) => `<a class="html-side-toc-item" style="--toc-level:${Math.max(0, (section.level || 1) - 1)}" href="#${escapeHtml(getPreviewHeadingId(section.startOffset))}">${escapeHtml(section.title)}</a>`)
        .join("\n      ")}
    </nav>`
    : "";
  const lineNumberingScriptData = escapeScriptJson(lineNumbering);
  const ligatureCss = project.style.ligatures !== false
    ? ' font-variant-ligatures: common-ligatures contextual; font-feature-settings: "liga" 1, "clig" 1, "calt" 1; text-rendering: optimizeLegibility;'
    : "";
  const paragraphSpacingValue = Number(project.style.paragraphSpacing);
  const paragraphSpacing = Number.isFinite(paragraphSpacingValue) ? paragraphSpacingValue : 0;
  const firstLineIndent = project.style.firstLineIndent ? "1.3em" : "0";
  const quoteStyle = project.style.quoteStyle === "italic" ? "italic" : "normal";
  const codeFontSize = Math.max(8, (Number(project.style.fontSize) || 14) - 2);
  const authorsFirst = metadata.textKind === "paper";
  return `<!DOCTYPE html>
<html lang="${escapeHtml(citationSource.language || project.style.language || "de")}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(project.title || "TypeMap")}</title>
  ${buildHtmlAppFontLinks()}
  <style>
${buildHtmlFontFaceCss(project)}
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; background: #fff; color: #213633; font-family: ${bodyFontFamily}; }
    main { width: min(920px, 100%); max-width: none; margin: 0 auto; padding: clamp(34px, 5vw, 72px); font-size: ${project.style.fontSize}pt; line-height: ${textType === "lyric" ? 1.5 : project.style.lineHeight}; text-align: ${textType === "lyric" ? "left" : project.style.textAlign}; hyphens: ${hyphenationSettings.mode}; -webkit-hyphens: ${hyphenationSettings.mode}; hyphenate-limit-lines: ${hyphenationSettings.consecutiveLines}; hyphenate-limit-chars: ${hyphenationSettings.minWordLength} ${hyphenationSettings.before} ${hyphenationSettings.after}; -webkit-hyphenate-limit-lines: ${hyphenationSettings.consecutiveLines}; -webkit-hyphenate-limit-before: ${hyphenationSettings.before}; -webkit-hyphenate-limit-after: ${hyphenationSettings.after}; overflow-wrap: break-word; }
    main.has-side-toc { width: min(1180px, 100%); display: grid; grid-template-columns: minmax(190px, 250px) minmax(0, ${project.style.measure}ch); gap: 30px; align-items: start; }
    .html-document-flow { width: 100%; max-width: ${project.style.measure}ch; min-width: 0; }
    header { margin: 0 0 1.55em; text-align: ${documentTitleAlign}; }
    header h1 { margin: 0; color: #213633; font-family: ${project.style.titleFontFamily || project.style.fontFamily}; font-size: ${Number(titleScale.title) || 1.48}em; font-weight: ${Number(project.style.titleWeight) || 700}; line-height: ${Number(titleScale.titleLineHeight) || 1.12}; }
    .subtitle { margin: .34em 0 0; color: rgba(33, 54, 51, .72); font-family: ${project.style.subtitleFontFamily || project.style.titleFontFamily || project.style.fontFamily}; font-size: ${Number(titleScale.subtitle) || 0.86}em; font-weight: ${Number(project.style.subtitleWeight) || 400}; line-height: ${Number(titleScale.subtitleLineHeight) || 1.28}; }
    .authors { margin: .68em 0 0; color: #213633; font-family: ${project.style.metaFontFamily || project.style.subtitleFontFamily || project.style.fontFamily}; font-size: ${Number(titleScale.authors) || 0.76}em; font-weight: ${Number(project.style.metaWeight) || 400}; line-height: ${Number(titleScale.authorsLineHeight) || 1.28}; }
    header.authors-first .authors { margin: 0 0 .68em; }
    .lead { margin: 1.1em 0 0; color: #213633; font-family: ${leadPresentation.fontFamily}; font-size: ${leadPresentation.fontSize}em; font-weight: ${leadPresentation.fontWeight}; line-height: ${leadPresentation.lineHeight}; white-space: pre-wrap; font-synthesis-style: none; }
    .typemap-text { position: relative; max-width: ${project.style.measure}ch; color: #213633; font-family: ${bodyFontFamily}; font-synthesis-style: none; white-space: pre-wrap; overflow-wrap: break-word; text-wrap: pretty;${ligatureCss} }
    .typemap-text.has-line-numbers { position: relative; }
    .preview-small-caps { font-size: inherit; font-variant-caps: small-caps; font-feature-settings: "smcp" 1; letter-spacing: .01em; text-transform: none; hyphens: inherit; -webkit-hyphens: inherit; overflow-wrap: inherit; word-break: normal; }
    .preview-small-caps-f { font-variant-caps: all-small-caps; font-feature-settings: "c2sc" 1; }
    .preview-footnote-reference { margin-inline: .08em; color: #8f5d14; font-family: inherit; font-size: .72em; font-weight: 600; line-height: 0; vertical-align: super; }
    .preview-footnote-definition { display: flex; align-items: baseline; gap: .48em; margin: .16em 0 .9em; padding-left: .9em; color: #66716c; font-family: inherit; font-size: .84em; font-style: normal; line-height: 1.38; white-space: pre-wrap; }
    .preview-footnote-definition-label { flex: 0 0 auto; color: #8f5d14; font-family: inherit; font-size: .82em; font-weight: 600; line-height: 1; vertical-align: super; }
    .chapter-footnotes { margin: 1.8em 0 2.2em; padding-top: .8em; border-top: 1px solid rgba(33, 54, 51, .2); }
    .chapter-footnotes .preview-footnote-definition { break-inside: avoid; page-break-inside: avoid; }
    .html-side-toc { position: sticky; top: 24px; display: grid; gap: 2px; max-height: calc(100vh - 80px); overflow: auto; color: #6b746f; font-family: "Source Sans 3", Arial, sans-serif; font-size: 11.5pt; line-height: 1.28; text-align: left; }
    .html-side-toc-title { margin-bottom: .55em; color: #8f5d14; font-size: 8.5pt; font-weight: 700; letter-spacing: .11em; text-transform: uppercase; }
    .html-side-toc-item { display: block; min-height: 24px; padding: 3px 6px 3px calc(4px + var(--toc-level, 0) * 13px); border-radius: 6px; color: inherit; text-decoration: none; }
    .html-side-toc-item:hover { background: rgba(196, 136, 47, .1); color: #8f5d14; }
    @media (max-width: 1060px) { main.has-side-toc { width: min(920px, 100%); display: block; } .html-side-toc { display: none; } }
    p { margin: 0 0 ${paragraphSpacing}em; white-space: pre-wrap; overflow-wrap: break-word; text-indent: 0; }
    .typemap-text > p { text-indent: ${firstLineIndent}; }
    .typemap-text > p:first-of-type, .typemap-text > .preview-heading + p { text-indent: 0; }
    em { font-family: inherit; font-style: italic; }
    p strong, li strong, blockquote strong { font-family: inherit; font-weight: 600; }
    mark { background: transparent; text-decoration: underline; color: inherit; }
    a { color: #70531c; text-decoration: underline; text-underline-offset: .12em; }
    h1, h2, h3, h4, h5, h6 { margin: ${Number(project.style.headingSpacingBefore ?? getDocumentStylePreset(metadata.textKind)?.style?.headingSpacingBefore) || 1.2}em 0 .38em; font-family: ${project.style.headingFontFamily || project.style.fontFamily}; line-height: 1.12; font-weight: ${Number(project.style.headingWeight) || 700}; }
    h1:first-child, h2:first-child, h3:first-child, h4:first-child, h5:first-child, h6:first-child { margin-top: 0; }
    .preview-heading-level-1 { font-size: ${Number(headingScale[1]) || 1.48}em; }
    .preview-heading-level-2 { font-size: ${Number(headingScale[2]) || 1.22}em; }
    .preview-heading-level-3 { font-size: ${Number(headingScale[3]) || 1.06}em; }
    .preview-heading-level-4 { font-size: ${Number(headingScale[4]) || 1}em; font-weight: 700; }
    .preview-heading-level-5 { font-size: ${Number(headingScale[5]) || 1}em; font-weight: 600; font-style: italic; }
    .preview-heading-level-6 { font-size: ${Number(headingScale[6]) || 0.94}em; font-weight: 600; font-style: italic; }
    .preview-heading-level-7 { font-size: ${Number(headingScale[7]) || 0.9}em; font-weight: 600; font-style: italic; }
    .preview-embedded-object { margin: 0 0 .8em; line-height: inherit; }
    .preview-citation-object { display: grid; width: 100%; margin-top: 2em; justify-items: start; }
    .preview-citation-text { width: 100%; margin: 0; font-family: "Source Sans 3", Arial, sans-serif; font-size: ${Math.min(Number(titleScale.authors) || 0.76, 1)}em; line-height: 1.42; }
    blockquote { margin: .9em 0; padding-left: 1.1em; border-left: 2px solid rgba(61, 75, 69, .42); color: rgba(38, 54, 50, .86); font-family: ${project.style.quoteFontFamily || project.style.fontFamily}; font-style: ${quoteStyle}; }
    ul, ol { margin: 0 0 .85em 1.4em; padding: 0; }
    li { margin: .18em 0; }
    code { font-family: ${project.style.codeFontFamily || '"Source Code Pro", "Courier New", monospace'}; font-size: ${codeFontSize}pt; background: rgba(33, 54, 51, .08); color: #264f63; padding: .08em .24em; border-radius: 3px; }
    pre { margin: .9em 0; padding: .9em 1em; border: 1px solid rgba(33, 54, 51, .14); border-radius: 6px; background: rgba(250, 247, 239, .78); color: #203431; overflow-x: auto; }
    pre code { background: transparent; color: inherit; padding: 0; }
    .preview-blank-line { min-height: 1.5em; margin: 0; }
    .typemap-text.is-text-type-lyric p { white-space: pre-wrap; margin-bottom: 1.5em; }
    .typemap-text.is-text-type-lyric .preview-source-line-block { margin-bottom: 0; }
    .typemap-text.is-text-type-lyric .preview-blank-line { min-height: 1.5em; margin: 0; }
    .preview-body-block { position: relative; }
    .line-number { position: absolute; right: calc(100% + 1.1em); transform: translateY(calc(-100% - 0.22em)); color: #666; font-size: 0.72em; line-height: 1; text-align: right; font-variant-numeric: tabular-nums; }
    @media print {
      @page { margin: 18mm 20mm; }
      body { padding: 0; }
      main, main.has-side-toc { display: block; width: 100%; padding: 0 0 0 2.4em; overflow: visible; }
      .html-side-toc { display: none; }
      .html-document-flow { width: 100%; max-width: ${project.style.measure}ch; }
      .typemap-text, .preview-body-block { overflow: visible; }
      .line-number { display: block !important; transform: translateY(calc(-100% - 0.42em)); color: #555 !important; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <main${hasRenderableSideToc ? ' class="has-side-toc"' : ""}>
    ${tocHtml}
    <div class="html-document-flow">
    <header${authorsFirst ? ' class="authors-first"' : ""}>
      ${authorsFirst && authors.length ? `<p class="authors">${escapeHtml(authors.join("; "))}</p>` : ""}
      <h1>${escapeHtml(project.title || "")}</h1>
      ${citationSource.subtitle ? `<p class="subtitle">${escapeHtml(citationSource.subtitle)}</p>` : ""}
      ${!authorsFirst && authors.length ? `<p class="authors">${escapeHtml(authors.join("; "))}</p>` : ""}
      ${citationSource.lead ? `<p class="lead">${escapeHtml(citationSource.lead)}</p>` : ""}
    </header>
    <section id="typemapText" class="typemap-text is-text-type-${escapeHtml(textType)}${lineNumbering.enabled ? " has-line-numbers" : ""}" lang="${escapeHtml(hyphenationSettings.language)}">${blocks}</section>
    </div>
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
    function getLastTextContentBottom(element) {
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      let lastNode = null;
      let lastCharacterIndex = -1;
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const value = String(node.nodeValue || "");
        for (let index = value.length - 1; index >= 0; index -= 1) {
          if (!/\\s/.test(value[index])) {
            lastNode = node;
            lastCharacterIndex = index;
            break;
          }
        }
      }
      if (!lastNode || lastCharacterIndex < 0) return null;
      const range = document.createRange();
      range.setStart(lastNode, lastCharacterIndex);
      range.setEnd(lastNode, lastCharacterIndex + 1);
      const rects = Array.from(range.getClientRects()).filter((rect) => rect.height > 0);
      range.detach();
      return rects.length ? rects[rects.length - 1].bottom : null;
    }
    function renderLineNumbers() {
      text.querySelectorAll(".line-number").forEach((label) => label.remove());
      if (!lineNumbering.enabled) return;
      const blocks = Array.from(text.querySelectorAll(".preview-body-block"));
      const isNumberableBlock = (block) => block.dataset.matter === "body"
        && (!block.dataset.chapterRole || block.dataset.chapterRole === "main")
        && !Array.from(block.classList).some((className) => /^preview-heading-level-/.test(className))
        && !block.matches("h1,h2,h3,h4,h5,h6")
        && !block.classList.contains("preview-embedded-object");
      let lastContentIndex = -1;
      blocks.forEach((block, index) => {
        if (isNumberableBlock(block)
          && block.dataset.sourceBlankLine !== "true"
          && block.textContent.trim()) lastContentIndex = index;
      });
      let lineIndex = 0;
      blocks.forEach((block, blockIndex) => {
        if (blockIndex > lastContentIndex || !isNumberableBlock(block)) return;
        if (lineNumbering.mode === "source-lines" && block.dataset.sourceBlankLine === "true" && !lineNumbering.includeBlankLines) return;
        let rects = lineNumbering.mode === "source-lines"
          ? getVisualLineRects(block)
          : [block.getBoundingClientRect()].filter((rect) => rect.width > 0 && rect.height > 0);
        if (blockIndex === lastContentIndex) {
          const lastTextBottom = getLastTextContentBottom(block);
          if (lastTextBottom !== null) rects = rects.filter((rect) => rect.top < lastTextBottom + 1);
        }
        const blockRect = block.getBoundingClientRect();
        rects.forEach((rect) => {
          lineIndex += 1;
          const relativeLine = lineIndex - lineNumbering.fromLine + 1;
          if (relativeLine < 1 || relativeLine % lineNumbering.interval !== 0) return;
          const lineNumber = lineNumbering.start + (relativeLine / lineNumbering.interval - 1) * lineNumbering.interval;
          const label = document.createElement("span");
          label.className = "line-number";
          label.textContent = String(lineNumber);
          label.setAttribute("aria-hidden", "true");
          label.style.top = (rect.bottom - blockRect.top) + "px";
          block.appendChild(label);
        });
      });
    }
    window.addEventListener("load", renderLineNumbers);
    window.addEventListener("resize", renderLineNumbers);
    window.addEventListener("beforeprint", renderLineNumbers);
    window.addEventListener("afterprint", renderLineNumbers);
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

function printActiveProject() {
  const project = getActiveProject();
  if (!project) return;
  setExportMenuOpen(false);

  // Die Druckansicht verwendet bewusst exakt dieselbe vollständige HTML-Fassung
  // wie der Export. So bleiben Satzbreite, Semantik und optionale Zeilennummern
  // zwischen gespeicherter Datei und unmittelbarer Druckausgabe identisch.
  const printWindow = window.open("", "_blank", "popup=yes,width=1100,height=800");
  if (!printWindow) {
    window.alert("Die Druckansicht konnte nicht geöffnet werden. Bitte erlauben Sie Pop-up-Fenster für TypeMap.");
    return;
  }

  let printStarted = false;
  const startPrint = async () => {
    if (printStarted || printWindow.closed) return;
    printStarted = true;
    try {
      await printWindow.document.fonts?.ready;
    } catch (error) {
      // Der Druck bleibt auch dann verfügbar, wenn ein Browser die Font-API nicht anbietet.
    }
    printWindow.focus();
    printWindow.print();
  };

  printWindow.addEventListener("load", startPrint, { once: true });
  printWindow.addEventListener("afterprint", () => printWindow.close(), { once: true });
  printWindow.document.open();
  printWindow.document.write(buildHtmlExport(project));
  printWindow.document.close();
  window.setTimeout(startPrint, 1000);
}

async function exportPng() {
  const project = getActiveProject();
  if (!project) return;
  await document.fonts?.ready;

  const style = project.style;
  const metadata = project.metadata || {};
  const hasSourceTitleHeading = projectStartsWithTitleHeading(project);
  const documentTitleAlign = getDocumentTitleAlignment(project);
  const titleScale = {
    ...(getDocumentStylePreset(project.metadata?.textKind)?.titleScale || {}),
    ...(project.typography?.titleScale || {}),
  };
  if (metadata.textKind === "paper") {
    titleScale.authors = 1;
    titleScale.authorsLineHeight = 1.3;
  }
  const lineNumbering = getProjectLineNumbering(project);
  const scale = Math.max(2, Math.ceil(window.devicePixelRatio || 1));
  const fontSize = ptToPx(style.fontSize);
  const lineHeightPx = fontSize * (Number(style.lineHeight) || 1.38);
  const measureWidth = Math.max(420, Math.round(fontSize * (Number(style.measure) || 64) * 0.55));
  const numberGutter = lineNumbering.enabled ? 54 : 0;
  const padding = 82;
  const contentX = padding + numberGutter;
  const contentWidth = measureWidth;
  const canvasWidth = contentX + contentWidth + padding;
  const family = getEffectiveBodyFontFamily(project) || "Arial, Helvetica, sans-serif";
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const rows = [];

  function setFont(size, weight = 400, smallCaps = false) {
    context.font = `${smallCaps ? "small-caps " : ""}${weight} ${size}px ${family}`;
  }

  function stripMarkdown(value) {
    return stripOriginalPageMarkers(value)
      .replace(/^#{1,7}\s+/gm, "")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[\^([^\]]+)\]:\s*/g, "$1. ")
      .replace(/\[\^([^\]]+)\]/g, "[$1]")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  }

  function wrapText(text, size = fontSize, weight = 400, smallCaps = false) {
    setFont(size, weight, smallCaps);
    const sourceLines = stripMarkdown(text).split(/\r\n|\r|\n/);
    const wrapped = [];
    sourceLines.forEach((rawSourceLine) => {
      const sourceLine = smallCaps ? rawSourceLine.toLocaleLowerCase("de-DE") : rawSourceLine;
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
      smallCaps: options.smallCaps === true,
    });
  }

  function pushSpacer(height) {
    rows.push({ spacer: true, lineHeight: height });
  }

  function isUppercasePassage(value) {
    const plain = stripMarkdown(value);
    const uppercaseLetters = plain.match(/\p{Lu}/gu) || [];
    return uppercaseLetters.length >= 2 && !/\p{Ll}/u.test(plain);
  }

  const authors = getDisplayedAuthors(project);
  const subtitle = String(project.citationSource?.subtitle || "").trim();
  const lead = String(project.citationSource?.lead || "").trim();
  const authorsFirst = metadata.textKind === "paper";
  const pushAuthors = () => {
    if (!authors.length) return;
    const authorsSize = authorsFirst ? fontSize : fontSize * (Number(titleScale.authors) || 0.76);
    wrapText(authors.join("; "), authorsSize, 400).forEach((line) => pushLine(line, {
      size: authorsSize,
      weight: 400,
      align: documentTitleAlign,
      color: "#333",
      lineHeight: authorsSize * (Number(titleScale.authorsLineHeight) || 1.28),
    }));
  };
  if (authorsFirst) {
    pushAuthors();
    if (authors.length) pushSpacer(fontSize * 0.68);
  }
  if (project.title) {
    const titleSize = fontSize * (Number(titleScale.title) || 1.48);
    wrapText(project.title, titleSize, 700).forEach((line) => pushLine(line, {
      size: titleSize,
      weight: 700,
      align: documentTitleAlign,
      lineHeight: titleSize * (Number(titleScale.titleLineHeight) || 1.12),
    }));
  }
  if (subtitle) {
    pushSpacer(fontSize * 0.34);
    const subtitleSize = fontSize * (Number(titleScale.subtitle) || 0.86);
    wrapText(subtitle, subtitleSize, 400).forEach((line) => pushLine(line, {
      size: subtitleSize,
      align: documentTitleAlign,
      color: "#444",
      lineHeight: subtitleSize * (Number(titleScale.subtitleLineHeight) || 1.28),
    }));
  }
  if (!authorsFirst && authors.length) {
    pushSpacer(fontSize * 0.68);
    pushAuthors();
  }
  if (lead) {
    pushSpacer(fontSize * 0.9);
    const leadSize = fontSize * (Number(titleScale.lead) || 1);
    wrapText(lead, leadSize, Number(style.leadWeight) || 400).forEach((line) => pushLine(line, {
      size: leadSize,
      weight: Number(style.leadWeight) || 400,
      align: documentTitleAlign,
      color: "#26332f",
      lineHeight: leadSize * (Number(titleScale.leadLineHeight) || 1.42),
    }));
  }
  if (project.title || subtitle || authors.length || lead) pushSpacer(fontSize * 1.55);

  const sourceModel = buildSourceModel(project);
  const layoutModel = buildBrowserLayoutModel(sourceModel, project.style);
  const hiddenParatextRanges = collectHiddenParatextRanges(project, sourceModel);
  const visibleBlocks = layoutModel.blocks.filter((block) => !isBlockHiddenByParatextVisibility(block, hiddenParatextRanges));
  visibleBlocks.forEach((block, paragraphIndex) => {
    let paragraph = block.text;
    const trimmedParagraph = String(paragraph || "").trim();
    const isSourceTitleHeading = /^#\s+/.test(trimmedParagraph);
    if (isSourceTitleHeading && getPlainDocumentLabel(trimmedParagraph.replace(/^#\s+/, "")) === project.title) return;
    if (isParatextMarker(trimmedParagraph)) return;
    if (isTableOfContentsText(trimmedParagraph)) {
      return;
    }
    if (isOriginalPageMarker(trimmedParagraph)) return;
    if (project.style.chapterNumbers === true
      && block.chapterRole === "main"
      && block.chapterNumber
      && /^#{2,7}\s+/.test(trimmedParagraph)) {
      paragraph = paragraph.replace(/^(#{2,7}\s+)/, `$1${block.chapterNumber} `);
    }
    if (/^#{2,7}\s+/.test(trimmedParagraph)) {
      pushSpacer(fontSize * (Number(project.style.headingSpacingBefore ?? getDocumentStylePreset(metadata.textKind)?.style?.headingSpacingBefore) || 1.2));
    }
    const countAsBodyLine = isNumberedBodyBlock(block) && !isSourceTitleHeading;
    const isHeading = /^#{1,7}\s+/.test(trimmedParagraph);
    const smallCaps = !isHeading && isUppercasePassage(paragraph);
    wrapText(paragraph, fontSize, 400, smallCaps).forEach((line) => pushLine(line, {
      countLine: Boolean(line.trim()) && countAsBodyLine,
      smallCaps,
    }));
    if (paragraphIndex < visibleBlocks.length - 1) pushSpacer(lineHeightPx * 0.72);
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
    setFont(row.size, row.weight, row.smallCaps);
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
    const lineNumber = getDisplayedLineNumber(countedLine, lineNumbering);
    if (!lineNumbering.enabled || lineNumber === null) return;
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

function setBrowserActionsMenuOpen(isOpen) {
  if (ui.browserActionsMenu) ui.browserActionsMenu.hidden = !isOpen;
  ui.browserActionsMenuButton?.setAttribute("aria-expanded", isOpen ? "true" : "false");
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
  const delay = (getActiveProject()?.source?.rawText?.length || 0) > 120000 ? 1800 : 500;
  state.autosaveTimer = window.setTimeout(() => {
    state.autosaveTimer = null;
    saveLocalSnapshot();
  }, delay);
}

async function flushAutosave() {
  if (state.autosaveTimer) {
    window.clearTimeout(state.autosaveTimer);
    state.autosaveTimer = null;
  }
  await saveLocalSnapshot();
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
    ? "Dokumentbrowser aufgeblättert"
    : normalizedMode === "editor"
      ? "Editor aufgeblättert"
      : "Normale Dokumentansicht";
  ui.layoutCycleButtons.forEach((button) => {
    button.setAttribute("aria-label", `${label}. Ansicht umblättern`);
    button.setAttribute("title", label);
  });
  scheduleEditorGeometrySync();
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
    // Der Editor mutiert ausschließlich das Dokumentmodell. Erst dieser
    // bewusste Wechsel startet Parsing, Satzmodell und DOM-Aufbau der TypeMap.
    void renderPreviewOnDemand();
    window.requestAnimationFrame(() => {
      if (!ui.typeStage) return;
      ui.typeStage.scrollTop = 0;
      ui.typeStage.scrollLeft = 0;
    });
  }
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
      setFontSettingsDialogOpen(false);
      setTextFormatDialogOpen(false);
      setLineNumberDialogOpen(false);
      setHyphenationDialogOpen(false);
      setExportMenuOpen(false);
      setBrowserActionsMenuOpen(false);
      setSearchDialogOpen(false);
    }
  });
}

function bindEditor() {
  document.querySelectorAll(".editor-menu, .toolbar-popover").forEach((menu) => {
    menu.addEventListener("toggle", () => {
      if (!menu.open) return;
      document.querySelectorAll(".editor-menu, .toolbar-popover").forEach((otherMenu) => {
        if (otherMenu !== menu) otherMenu.open = false;
      });
    });
  });
  document.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest(".editor-menu, .toolbar-popover")) return;
    closeEditorMenus();
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
  window.addEventListener("resize", () => {
    setDetailsLayoutMode(state.detailsLayoutMode);
    scheduleEditorGeometrySync();
  });
  if (typeof ResizeObserver === "function" && ui.textInput) {
    state.editorResizeObserver?.disconnect();
    state.editorResizeObserver = new ResizeObserver(scheduleEditorGeometrySync);
    state.editorResizeObserver.observe(ui.textInput);
    const editorFrame = ui.textInput.closest(".markdown-editor-frame");
    if (editorFrame) state.editorResizeObserver.observe(editorFrame);
  }
  document.fonts?.ready?.then(scheduleEditorGeometrySync);
  ui.browserActionsMenuButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    const shouldOpen = ui.browserActionsMenuButton.getAttribute("aria-expanded") !== "true";
    setBrowserActionsMenuOpen(shouldOpen);
  });
  ui.browserActionsMenu?.addEventListener("click", (event) => {
    event.stopPropagation();
    if (event.target instanceof Element && event.target.closest("button")) {
      setBrowserActionsMenuOpen(false);
    }
  });
  document.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest(".browser-actions-menu-shell")) return;
    setBrowserActionsMenuOpen(false);
  });
  ui.createProjectButton?.addEventListener("click", () => addProject("Neues Dokument"));
  ui.browserExportJsonButton?.addEventListener("click", exportActiveProjectJson);
  ui.openGenerateDialogButton?.addEventListener("click", () => {
    setGenerateDialogStatus("");
    setGenerateDialogOpen(true);
  });
  ui.openSearchDialogButton?.addEventListener("click", () => {
    setBrowserActionsMenuOpen(false);
    setSearchDialogStatus("");
    setSearchDialogOpen(true);
  });
  ui.searchDialogOverlay?.addEventListener("click", () => setSearchDialogOpen(false));
  ui.searchDialogCloseButton?.addEventListener("click", () => setSearchDialogOpen(false));
  ui.wikisourceSearchButton?.addEventListener("click", searchWikisource);
  ui.wikisourceTextTypeFilter?.addEventListener("change", () => {
    renderWikisourceSearchResults();
    const visibleCount = ui.wikisourceSearchResults?.childElementCount || 0;
    const totalCount = state.wikisourceSearchResults.length;
    setSearchDialogStatus(`${visibleCount} von ${totalCount} Treffern angezeigt.`);
  });
  ui.wikisourceSearchInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    void searchWikisource();
  });
  ui.importWikisourceButton?.addEventListener("click", importSelectedWikisourcePage);
  ui.generateDialogOverlay?.addEventListener("click", () => setGenerateDialogOpen(false));
  ui.generateDialogCloseButton?.addEventListener("click", () => setGenerateDialogOpen(false));
  ui.generateWebTab?.addEventListener("click", () => setGenerateSourceMode("web"));
  ui.generatePdfTab?.addEventListener("click", () => setGenerateSourceMode("pdf"));
  ui.generateEpubTab?.addEventListener("click", () => setGenerateSourceMode("epub"));
  ui.generatePdfProviderInput?.addEventListener("change", () => {
    const isGoogle = ui.generatePdfProviderInput.value === "google";
    if (ui.generatePdfModelInput) {
      ui.generatePdfModelInput.value = isGoogle ? "gemini-2.5-flash" : "gpt-5.5";
    }
    if (ui.generatePdfApiKeyInput) {
      ui.generatePdfApiKeyInput.placeholder = isGoogle ? "AIza…" : "sk-…";
      ui.generatePdfApiKeyInput.value = "";
    }
    setGenerateDialogStatus("");
  });
  [ui.generateWebTab, ui.generatePdfTab, ui.generateEpubTab].forEach((tab) => {
    tab?.addEventListener("keydown", (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const modes = ["web", "pdf", "epub"];
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const currentIndex = modes.indexOf(state.generateSourceMode);
      const nextMode = modes[(currentIndex + direction + modes.length) % modes.length];
      setGenerateSourceMode(nextMode);
      ({ web: ui.generateWebTab, pdf: ui.generatePdfTab, epub: ui.generateEpubTab }[nextMode])?.focus();
    });
  });
  ui.generatePromptButton?.addEventListener("click", async () => {
    if (state.generateSourceMode === "pdf") {
      await processPdfSourceWithApi();
      return;
    }
    if (state.generateSourceMode === "epub") {
      await processEbookSource();
      return;
    }
    const url = ui.generateSourceUrlInput?.value.trim() || "";
    if (!url || !isPlausibleHttpUrl(url)) {
      setGenerateDialogStatus("Bitte eine vollständige URL mit http:// oder https:// eingeben.", true);
      ui.generateSourceUrlInput?.focus();
      return;
    }
    ui.generatePromptOutput.value = buildWebExtractionPrompt(url);
    ui.copyGeneratePromptButton.disabled = false;
    setGenerateDialogStatus("Der Prompt ist bereit.");
  });
  ui.copyGeneratePromptButton?.addEventListener("click", async () => {
    try {
      await copyCitationOutput(ui.generatePromptOutput, ui.copyGeneratePromptButton);
      setGenerateDialogStatus("Prompt in die Zwischenablage kopiert.");
    } catch (error) {
      setGenerateDialogStatus("Der Prompt konnte nicht kopiert werden.", true);
    }
  });
  ui.openGeneratedJsonEditorButton?.addEventListener("click", async () => {
    try {
      if (!navigator.clipboard?.readText) throw new Error("clipboard-unavailable");
      const jsonText = await navigator.clipboard.readText();
      if (!jsonText.trim()) throw new Error("empty-clipboard");
      const payload = parseGeneratedJson(jsonText);
      addGeneratedProject(payload);
      setGenerateDialogOpen(false);
    } catch (error) {
      setGenerateDialogStatus(
        "Noch kein gültiger TypeMap-JSON-Code gefunden. Bitte kopieren Sie zunächst den von der KI erzeugten JSON-Code.",
        true,
      );
    }
  });
  ui.themeToggleButton?.addEventListener("click", toggleTheme);
  ui.printProjectButton?.addEventListener("click", printActiveProject);
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
  ui.toolbarTextKindSelect?.addEventListener("change", () => {
    setActiveTextKind(ui.toolbarTextKindSelect.value || createDefaultMetadata().textKind);
  });
  ui.editorZoomButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      updateEditorZoom(button.dataset.editorZoom);
      ui.editorZoomButtons.forEach((candidate) => {
        candidate.setAttribute("aria-pressed", String(candidate === button));
      });
      closeEditorMenus();
    });
  });
  ui.decreaseFontSizeButton?.addEventListener("click", () => changeActiveFontSize(-1));
  ui.increaseFontSizeButton?.addEventListener("click", () => changeActiveFontSize(1));
  ui.clearFormattingButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    clearEditorFormatting();
    closeEditorMenus();
  });
  ui.textFormatWidthButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    openTextFormatDialog();
  });
  document.querySelectorAll("[data-toolbar-align]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const align = button.dataset.toolbarAlign || "left";
      updateActiveProject((project) => {
        project.style.textAlign = align;
        enableAutoHyphenationForJustifiedText(project);
      });
      closeEditorMenus();
    });
  });
  document.querySelectorAll("[data-toolbar-line-height]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      updateActiveProject((project) => {
        project.style.lineHeight = Number(button.dataset.toolbarLineHeight) || project.style.lineHeight;
      });
      closeEditorMenus();
    });
  });
  document.querySelectorAll("[data-wrap-markdown]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      wrapEditorSelection(button.dataset.wrapMarkdown || "");
      closeEditorMenus();
    });
  });
  document.querySelectorAll("[data-insert-object], [data-future-action], [data-view-option]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (button.dataset.insertObject === "toc") {
        insertTableOfContentsObject();
      } else if (button.dataset.insertObject === "citation") {
        toggleCitationObject();
      } else if (button.dataset.viewOption === "toc") {
        updateActiveProject((project) => {
          if (!hasTableOfContentsObject(project)) return;
          project.tocVisible = project.tocVisible === false;
        });
      }
      closeEditorMenus();
    });
  });
  ui.documentPropertiesOverlay?.addEventListener("click", () => setDialogOpen(false));
  ui.documentPropertiesCloseButton?.addEventListener("click", () => setDialogOpen(false));
  ui.documentPropertiesCancelButton?.addEventListener("click", () => setDialogOpen(false));
  ui.documentPropertiesSaveButton?.addEventListener("click", saveDocumentPropertiesDialog);
  ui.propertyTabSourceCitation?.addEventListener("click", () => setDocumentPropertiesTab("citation"));
  ui.propertyTabProvenance?.addEventListener("click", () => setDocumentPropertiesTab("provenance"));
  ui.provenanceLicenseSelect?.addEventListener("change", updateProvenanceLicenseLink);
  ui.provenanceTypeSelect?.addEventListener("change", updateProvenanceFieldVisibility);
  [ui.propertyTabSourceCitation, ui.propertyTabProvenance].forEach((tab) => {
    tab?.addEventListener("keydown", (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const nextTab = tab === ui.propertyTabSourceCitation ? ui.propertyTabProvenance : ui.propertyTabSourceCitation;
      setDocumentPropertiesTab(nextTab === ui.propertyTabProvenance ? "provenance" : "citation");
      nextTab.focus();
    });
  });
  document.querySelectorAll("#propertyPanelSourceCitation input, #propertyPanelSourceCitation select, #propertyPanelSourceCitation textarea")
    .forEach((control) => {
      control.addEventListener("input", updateSourceCitationForm);
      control.addEventListener("change", updateSourceCitationForm);
    });
  ui.addSourceCitationAuthorButton?.addEventListener("click", () => {
    addCitationPerson(ui.sourceCitationAuthorsList, "Autorin oder Autor");
    updateSourceCitationForm();
  });
  ui.addSourceCitationTranslatorButton?.addEventListener("click", () => {
    addCitationPerson(ui.sourceCitationTranslatorsList, "Übersetzerin oder Übersetzer");
    updateSourceCitationForm();
  });
  ui.copyShortCitationButton?.addEventListener("click", () => {
    copyCitationOutput(ui.sourceCitationShortOutput, ui.copyShortCitationButton)
      .catch(() => window.alert("Der Kurzbeleg konnte nicht kopiert werden."));
  });
  ui.copyFullCitationButton?.addEventListener("click", () => {
    copyCitationOutput(ui.sourceCitationFullOutput, ui.copyFullCitationButton)
      .catch(() => window.alert("Der Vollbeleg konnte nicht kopiert werden."));
  });
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
  ui.lineNumberSettingsButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    openLineNumberDialog();
  });
  ui.lineNumberDialogOverlay?.addEventListener("click", () => setLineNumberDialogOpen(false));
  ui.lineNumberDialogCloseButton?.addEventListener("click", () => setLineNumberDialogOpen(false));
  ui.lineNumberDialogCancelButton?.addEventListener("click", () => setLineNumberDialogOpen(false));
  ui.lineNumberDialogSaveButton?.addEventListener("click", saveLineNumberDialog);
  ui.lineNumberIntervalInput?.addEventListener("input", () => {
    if (!state.lineNumberStartIsAutomatic || !ui.lineNumberStartInput) return;
    ui.lineNumberStartInput.value = String(clampInteger(ui.lineNumberIntervalInput.value, 1, 1, 100));
  });
  ui.lineNumberStartInput?.addEventListener("input", () => {
    state.lineNumberStartIsAutomatic = false;
  });
  ui.spellcheckToggleButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    updateActiveProject((project) => {
      project.style.spellcheck = project.style.spellcheck === false;
    });
    renderEditor();
    closeEditorMenus();
  });
  ui.chapterNumbersToggleButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    updateActiveProject((project) => {
      project.style.chapterNumbers = project.style.chapterNumbers !== true;
    });
    renderEditor();
    closeEditorMenus();
  });
  ui.hyphenationSettingsButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    openHyphenationDialog();
  });
  ui.hyphenationDialogOverlay?.addEventListener("click", () => setHyphenationDialogOpen(false));
  ui.hyphenationDialogCloseButton?.addEventListener("click", () => setHyphenationDialogOpen(false));
  ui.hyphenationDialogCancelButton?.addEventListener("click", () => setHyphenationDialogOpen(false));
  ui.hyphenationDialogSaveButton?.addEventListener("click", saveHyphenationDialog);
  ui.editorDataViewSelect?.addEventListener("change", () => {
    state.editorDataView = ui.editorDataViewSelect.value === "json" ? "json" : "markdown";
    closeEditorMenus();
    renderEditor();
  });
  ui.textInput?.addEventListener("input", () => {
    if (state.editorDataView === "json") {
      state.jsonEditorDraft = ui.textInput.value;
      state.jsonEditorDraftProjectId = state.activeProjectId;
      ui.textInput.removeAttribute("aria-invalid");
      window.clearTimeout(state.jsonEditorApplyTimer);
      state.jsonEditorApplyTimer = window.setTimeout(applyJsonEditorDraft, 600);
      return;
    }
    updateActiveProjectTextFromEditor(ui.textInput.value);
    renderEditorHighlight(ui.textInput.value, getActiveProject());
    syncEditorHighlightScroll();
    // Der vollständige Dokumentbaum großer Werke wird nicht während des
    // Tippens rekonstruiert; Struktur und Vorschau entstehen erst beim Satz.
    if (ui.textInput.value.length <= 120000) scheduleProjectBrowserRender();
  });
  ui.textInput?.addEventListener("blur", () => {
    if (state.editorDataView === "json") {
      window.clearTimeout(state.jsonEditorApplyTimer);
      applyJsonEditorDraft();
      return;
    }
    const project = getActiveProject();
    if (!project || state.activeSourceRange) return;
    const normalized = ensureDocumentStructure(project.source.rawText, project.title);
    if (normalized === project.source.rawText) return;
    updateActiveProject((activeProject) => {
      activeProject.source.rawText = normalized;
    });
    renderEditor();
  });
  ui.textInput?.addEventListener("scroll", syncEditorHighlightScroll);
  ui.textInput?.addEventListener("contextmenu", (event) => {
    if (openOriginalPageInfo(event)) return;
    closeOriginalPageInfo();
    if (!openChapterRoleMenu(event)) closeChapterRoleMenu();
  });
  document.addEventListener("pointerdown", (event) => {
    if (!event.target.closest(".chapter-role-menu")) closeChapterRoleMenu();
    if (!event.target.closest(".original-page-info-menu")) closeOriginalPageInfo();
  });
  ui.typeStage?.addEventListener("scroll", scheduleSideTableOfContentsStateUpdate, { passive: true });
  window.addEventListener("resize", scheduleSideTableOfContentsStateUpdate, { passive: true });
  ui.fontFamilySelect?.addEventListener("change", () => {
    updateActiveProject((project) => {
      project.style.fontFamily = ui.fontFamilySelect.value;
    }, { renderPreview: false });
    const project = getActiveProject();
    if (!project) return;
    const token = ++state.projectActivationToken;
    renderNoActiveProjectState("Schrift wird geladen …");
    loadProjectFonts(project).then(() => {
      if (token !== state.projectActivationToken || state.activeProjectId !== project.id) return;
      renderApp();
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
      enableAutoHyphenationForJustifiedText(project);
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
    state.projects = [createDefaultProject("Erstes Dokument")];
    state.activeProjectId = null;
    renderApp();
    scheduleAutosave();
  }
  setWorkspaceSection("preview");
}

init().catch((error) => {
  console.error("TypeMap konnte nicht initialisiert werden", error);
});

