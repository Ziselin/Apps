import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { extname, join, posix, resolve, sep } from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { inflateRawSync } from "node:zlib";

const ROOT = resolve(fileURLToPath(new URL("./", import.meta.url)));
const HOST = "127.0.0.1";
const PORT = Number(process.env.TYPEMAP_PORT) || 7319;
const MAX_REQUEST_BYTES = 72 * 1024 * 1024;
const MAX_EPUB_UNCOMPRESSED_BYTES = 160 * 1024 * 1024;

function isAllowedOrigin(origin) {
  if (!origin || origin === "null") return true;
  try {
    const url = new URL(origin);
    return url.hostname === "127.0.0.1" || url.hostname === "localhost" || url.hostname === "::1";
  } catch {
    return false;
  }
}

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
};

const CITATION_FIELDS = [
  "source_type", "title", "subtitle", "lead", "language", "text_version", "original_title",
  "original_language", "authors", "institutional_author", "news_agencies", "editors", "contributors",
  "translators", "container_title", "publisher", "publisher_place", "volume", "issue", "page_range",
  "issued_year", "issued_date", "edition", "version_statement", "doi", "url", "archive_url",
  "accessed_date", "citation_style", "short_citation", "full_citation",
];

const citationProperties = Object.fromEntries(CITATION_FIELDS.map((field) => [field, { type: "string" }]));
const TYPEMAP_DOCUMENT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["source_raw_markdown", "text_kind", "citation_source", "transcription"],
  properties: {
    source_raw_markdown: { type: "string" },
    text_kind: { type: "string", enum: ["article", "paper", "notebook"] },
    citation_source: {
      type: "object",
      additionalProperties: false,
      required: CITATION_FIELDS,
      properties: citationProperties,
    },
    transcription: {
      type: "object",
      additionalProperties: false,
      required: ["source_kind", "extraction_basis", "notes", "uncertain_passages"],
      properties: {
        source_kind: { type: "string", enum: ["pdf"] },
        extraction_basis: { type: "string", enum: ["embedded_text", "ocr", "mixed", "manual", "unknown"] },
        notes: { type: "array", items: { type: "string" } },
        uncertain_passages: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["page", "reading", "reason"],
            properties: {
              page: { type: "string" },
              reading: { type: "string" },
              reason: { type: "string" },
            },
          },
        },
      },
    },
  },
};

const GEMINI_PDF_ANALYSIS_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["total_pages", "text_kind", "citation_source", "transcription"],
  properties: {
    total_pages: { type: "integer" },
    text_kind: { type: "string", enum: ["article", "paper", "notebook"] },
    citation_source: TYPEMAP_DOCUMENT_SCHEMA.properties.citation_source,
    transcription: {
      type: "object",
      additionalProperties: false,
      required: ["source_kind", "extraction_basis", "notes"],
      properties: {
        source_kind: { type: "string", enum: ["pdf"] },
        extraction_basis: { type: "string", enum: ["embedded_text", "ocr", "mixed", "manual", "unknown"] },
        notes: { type: "array", items: { type: "string" } },
      },
    },
  },
};

const GEMINI_PDF_CHUNK_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["source_raw_markdown", "uncertain_passages"],
  properties: {
    source_raw_markdown: { type: "string" },
    uncertain_passages: TYPEMAP_DOCUMENT_SCHEMA
      .properties.transcription.properties.uncertain_passages,
  },
};

function decodeXmlEntities(value) {
  const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return String(value || "").replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === "#") {
      const isHex = entity[1]?.toLowerCase() === "x";
      const number = Number.parseInt(entity.slice(isHex ? 2 : 1), isHex ? 16 : 10);
      return Number.isFinite(number) ? String.fromCodePoint(number) : match;
    }
    return named[entity.toLowerCase()] ?? match;
  });
}

function xmlAttributes(fragment) {
  const attributes = {};
  String(fragment || "").replace(/([:\w.-]+)\s*=\s*(["'])(.*?)\2/gs, (match, name, quote, value) => {
    attributes[name.toLowerCase()] = decodeXmlEntities(value.trim());
    return match;
  });
  return attributes;
}

function stripMarkup(value) {
  return decodeXmlEntities(String(value || "").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function xmlValues(xml, localName) {
  const values = [];
  const pattern = new RegExp(`<(?:[\\w.-]+:)?${localName}\\b([^>]*)>([\\s\\S]*?)<\\/(?:[\\w.-]+:)?${localName}>`, "gi");
  for (const match of String(xml || "").matchAll(pattern)) {
    values.push({ value: stripMarkup(match[2]), attributes: xmlAttributes(match[1]) });
  }
  return values.filter((entry) => entry.value);
}

function readEpubArchive(buffer) {
  let eocdOffset = -1;
  for (let offset = buffer.length - 22; offset >= Math.max(0, buffer.length - 65557); offset -= 1) {
    if (buffer.readUInt32LE(offset) === 0x06054b50) {
      eocdOffset = offset;
      break;
    }
  }
  if (eocdOffset < 0) throw new Error("Die Datei enthält kein lesbares EPUB-/ZIP-Verzeichnis.");
  const entryCount = buffer.readUInt16LE(eocdOffset + 10);
  const centralOffset = buffer.readUInt32LE(eocdOffset + 16);
  const entries = new Map();
  let offset = centralOffset;
  let expandedBytes = 0;

  for (let index = 0; index < entryCount; index += 1) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) throw new Error("Das EPUB-Verzeichnis ist beschädigt.");
    const method = buffer.readUInt16LE(offset + 10);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const uncompressedSize = buffer.readUInt32LE(offset + 24);
    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localOffset = buffer.readUInt32LE(offset + 42);
    const rawName = buffer.subarray(offset + 46, offset + 46 + nameLength).toString("utf8");
    const name = posix.normalize(rawName.replace(/\\/g, "/")).replace(/^\/+/, "");
    offset += 46 + nameLength + extraLength + commentLength;
    if (!name || name.endsWith("/")) continue;
    if (name.startsWith("../") || posix.isAbsolute(name)) throw new Error("Das EPUB enthält einen unzulässigen Dateipfad.");
    if (buffer.readUInt32LE(localOffset) !== 0x04034b50) throw new Error("Das EPUB enthält einen beschädigten Dateieintrag.");
    const localNameLength = buffer.readUInt16LE(localOffset + 26);
    const localExtraLength = buffer.readUInt16LE(localOffset + 28);
    const dataStart = localOffset + 30 + localNameLength + localExtraLength;
    const compressed = buffer.subarray(dataStart, dataStart + compressedSize);
    let content;
    if (method === 0) content = Buffer.from(compressed);
    else if (method === 8) content = inflateRawSync(compressed);
    else throw new Error(`Das EPUB verwendet eine nicht unterstützte ZIP-Kompression (${method}).`);
    if (uncompressedSize !== 0xffffffff && content.length !== uncompressedSize) {
      throw new Error(`Der EPUB-Eintrag ${name} ist unvollständig.`);
    }
    expandedBytes += content.length;
    if (expandedBytes > MAX_EPUB_UNCOMPRESSED_BYTES) {
      throw new Error("Der entpackte EPUB-Inhalt überschreitet das Sicherheitslimit von 160 MB.");
    }
    entries.set(name, content);
  }
  return entries;
}

function resolveEpubPath(baseDirectory, href) {
  const cleanHref = decodeURIComponent(String(href || "").split("#")[0]);
  const resolvedPath = posix.normalize(posix.join(baseDirectory, cleanHref)).replace(/^\/+/, "");
  if (!resolvedPath || resolvedPath.startsWith("../")) throw new Error("Das EPUB verweist auf einen unzulässigen Inhaltspfad.");
  return resolvedPath;
}

function xhtmlToMarkdown(xhtml) {
  let html = String(xhtml || "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, "");

  const pageMarker = (attributes, content = "") => {
    const attrs = xmlAttributes(attributes);
    const semanticType = `${attrs["epub:type"] || ""} ${attrs.role || ""}`;
    if (!/(?:pagebreak|doc-pagebreak)/i.test(semanticType)) return content;
    const label = stripMarkup(content) || attrs["aria-label"] || attrs.title || "";
    return /^(?:\d+|[ivxlcdm]+)$/i.test(label.trim()) ? `\n\n[${label.trim()}]\n\n` : "";
  };
  html = html
    .replace(/<(span|div)\b([^>]*(?:pagebreak|doc-pagebreak)[^>]*)>([\s\S]*?)<\/\1>/gi,
      (match, tag, attributes, content) => pageMarker(attributes, content))
    .replace(/<(span|div)\b([^>]*(?:pagebreak|doc-pagebreak)[^>]*)\s*\/>/gi,
      (match, tag, attributes) => pageMarker(attributes));

  html = html.replace(/<aside\b([^>]*\b(?:footnote|doc-footnote)\b[^>]*)>([\s\S]*?)<\/aside>/gi,
    (match, attributes, content) => {
      const attrs = xmlAttributes(attributes);
      const label = (attrs.id || "note").replace(/^.*?(\d+)$/, "$1");
      return `\n\n[^${label}]: ${stripMarkup(content)}\n\n`;
    });
  html = html.replace(/<a\b([^>]*\b(?:noteref|doc-noteref)\b[^>]*)>([\s\S]*?)<\/a>/gi,
    (match, attributes, content) => `[^${stripMarkup(content) || "note"}]`);

  html = html
    .replace(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi,
      (match, level, content) => `\n\n${"#".repeat(Number(level))} ${stripMarkup(content)}\n\n`)
    .replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (match, tag, content) => `**${stripMarkup(content)}**`)
    .replace(/<(em|i|emphasis)\b[^>]*>([\s\S]*?)<\/\1>/gi, (match, tag, content) => `_${stripMarkup(content)}_`)
    .replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi,
      (match, content) => `\n\n${stripMarkup(content).replace(/^/gm, "> ")}\n\n`)
    .replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, (match, content) => `\n- ${stripMarkup(content)}`)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<hr\s*\/?>/gi, "\n\n---\n\n")
    .replace(/<img\b[^>]*\balt=(["'])(.*?)\1[^>]*>/gi, (match, quote, alt) => alt ? ` _[Abbildung: ${decodeXmlEntities(alt)}]_ ` : "")
    .replace(/<\/(p|div|section|article|header|footer|ul|ol|table|tr)>/gi, "\n\n")
    .replace(/<(p|div|section|article|header|footer|ul|ol|table|tr)\b[^>]*>/gi, "\n\n")
    .replace(/<[^>]+>/g, "");

  return decodeXmlEntities(html)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function buildEpubDocument({ filename, fileData }) {
  const base64Data = String(fileData || "").replace(/^data:[^;]*;base64,/i, "");
  const archive = readEpubArchive(Buffer.from(base64Data, "base64"));
  const mimetype = archive.get("mimetype")?.toString("utf8").trim();
  if (mimetype && mimetype !== "application/epub+zip") throw new Error("Die Datei ist kein gültiges EPUB-Paket.");
  const containerXml = archive.get("META-INF/container.xml")?.toString("utf8");
  if (!containerXml) throw new Error("Dem EPUB fehlt META-INF/container.xml.");
  const rootfileMatch = containerXml.match(/<rootfile\b[^>]*\bfull-path\s*=\s*(["'])(.*?)\1/i);
  if (!rootfileMatch) throw new Error("Das EPUB benennt kein OPF-Paketdokument.");
  const packagePath = posix.normalize(rootfileMatch[2]).replace(/^\/+/, "");
  const packageXml = archive.get(packagePath)?.toString("utf8");
  if (!packageXml) throw new Error("Das OPF-Paketdokument des EPUB wurde nicht gefunden.");
  const packageDirectory = posix.dirname(packagePath) === "." ? "" : posix.dirname(packagePath);

  const packageAttributes = xmlAttributes(packageXml.match(/<package\b([^>]*)>/i)?.[1] || "");
  const titles = xmlValues(packageXml, "title");
  const creators = xmlValues(packageXml, "creator");
  const contributors = xmlValues(packageXml, "contributor");
  const languages = xmlValues(packageXml, "language");
  const publishers = xmlValues(packageXml, "publisher");
  const dates = xmlValues(packageXml, "date");
  const identifiers = xmlValues(packageXml, "identifier");
  const rights = xmlValues(packageXml, "rights");
  const subjects = xmlValues(packageXml, "subject");
  const descriptions = xmlValues(packageXml, "description");
  const relations = xmlValues(packageXml, "relation");
  const sources = xmlValues(packageXml, "source");
  const metaEntries = Array.from(packageXml.matchAll(/<meta\b([^>]*?)(?:\/\s*>|>([\s\S]*?)<\/meta>)/gi))
    .map((match) => {
      const attributes = xmlAttributes(match[1]);
      return { ...attributes, value: stripMarkup(match[2]) || attributes.content || "" };
    })
    .filter((entry) => Object.keys(entry).length);
  const packageLinks = Array.from(packageXml.matchAll(/<link\b([^>]*)\/?>/gi))
    .map((match) => xmlAttributes(match[1]))
    .filter((entry) => entry.href || entry.rel);

  const manifest = new Map();
  for (const match of packageXml.matchAll(/<item\b([^>]*)\/?\s*>/gi)) {
    const attrs = xmlAttributes(match[1]);
    if (attrs.id && attrs.href) manifest.set(attrs.id, attrs);
  }
  const spineIds = Array.from(packageXml.matchAll(/<itemref\b([^>]*)\/?\s*>/gi))
    .map((match) => xmlAttributes(match[1]))
    .filter((attrs) => attrs.idref && attrs.linear !== "no")
    .map((attrs) => attrs.idref);
  const readingOrder = spineIds.length
    ? spineIds.map((id) => manifest.get(id)).filter(Boolean)
    : Array.from(manifest.values()).filter((item) => /xhtml|html/i.test(item["media-type"] || ""));

  const markdownParts = [];
  for (const item of readingOrder) {
    if (/\bnav\b/i.test(item.properties || "")) continue;
    const itemPath = resolveEpubPath(packageDirectory, item.href);
    const content = archive.get(itemPath);
    if (!content) continue;
    const markdown = xhtmlToMarkdown(content.toString("utf8"));
    if (markdown) markdownParts.push(markdown);
  }

  const title = titles[0]?.value || filename.replace(/\.epub$/i, "") || "EPUB-Quelle";
  let sourceRawMarkdown = markdownParts.join("\n\n").trim();
  if (!/^#\s+\S/m.test(sourceRawMarkdown)) sourceRawMarkdown = `# ${title}\n\n${sourceRawMarkdown}`.trim();
  if (!sourceRawMarkdown.replace(/^#.*$/m, "").trim()) throw new Error("Das EPUB enthält keinen lesbaren Haupttext.");

  const issuedDate = dates[0]?.value || "";
  const doi = identifiers.map((entry) => entry.value).find((value) => /^10\.\d{4,9}\//i.test(value)) || "";
  const citationSource = Object.fromEntries(CITATION_FIELDS.map((field) => [field, ""]));
  Object.assign(citationSource, {
    source_type: "book",
    title,
    language: languages[0]?.value || "",
    authors: creators.map((entry) => entry.value).join("; "),
    contributors: contributors.map((entry) => entry.value).join("; "),
    publisher: publishers[0]?.value || "",
    issued_date: issuedDate,
    issued_year: issuedDate.match(/\b\d{4}\b/)?.[0] || "",
    doi,
    citation_style: "Hausstil",
  });

  const uniqueIdentifierId = packageAttributes["unique-identifier"] || "";
  const uniqueIdentifier = identifiers.find((entry) => entry.attributes.id === uniqueIdentifierId)?.value
    || identifiers[0]?.value || "";
  return {
    source_raw_markdown: sourceRawMarkdown,
    text_kind: "article",
    citation_source: citationSource,
    transcription: {
      source_kind: "epub",
      extraction_basis: "embedded_text",
      notes: ["Lokal aus OPF-Metadaten und der EPUB-Spine-Lesereihenfolge importiert."],
      uncertain_passages: [],
    },
    source_metadata: {
      format: "epub",
      package_document: packagePath,
      opf_version: packageAttributes.version || "",
      unique_identifier: uniqueIdentifier,
      identifiers,
      rights_statements: rights,
      subjects,
      descriptions,
      relations,
      sources,
      package_meta: metaEntries,
      package_links: packageLinks,
      provenance: {
        filename,
        extraction_method: "local_epub_package",
        manifest_items: manifest.size,
        spine_items: readingOrder.length,
      },
    },
  };
}

function xmlSection(xml, localName) {
  return String(xml || "").match(new RegExp(`<(?:[\\w.-]+:)?${localName}\\b[^>]*>([\\s\\S]*?)<\\/(?:[\\w.-]+:)?${localName}>`, "i"))?.[1] || "";
}

function fb2People(section, elementName) {
  const people = [];
  const pattern = new RegExp(`<${elementName}\\b[^>]*>([\\s\\S]*?)<\\/${elementName}>`, "gi");
  for (const match of String(section || "").matchAll(pattern)) {
    const personXml = match[1];
    const first = xmlValues(personXml, "first-name")[0]?.value || "";
    const middle = xmlValues(personXml, "middle-name")[0]?.value || "";
    const last = xmlValues(personXml, "last-name")[0]?.value || "";
    const nickname = xmlValues(personXml, "nickname")[0]?.value || "";
    const given = [first, middle].filter(Boolean).join(" ");
    const name = last ? `${last.toUpperCase()}, ${given}`.trim().replace(/,$/, "") : nickname || given;
    if (name) people.push(name);
  }
  return people;
}

function buildFb2Document({ filename, fileData }) {
  const xml = Buffer.from(String(fileData || "").replace(/^data:[^;]*;base64,/i, ""), "base64").toString("utf8");
  if (!/<FictionBook\b/i.test(xml)) throw new Error("Die Datei enthält keine gültige FictionBook-Struktur.");
  const descriptionXml = xmlSection(xml, "description");
  const titleInfo = xmlSection(descriptionXml, "title-info");
  const publishInfo = xmlSection(descriptionXml, "publish-info");
  const documentInfo = xmlSection(descriptionXml, "document-info");
  const title = xmlValues(titleInfo, "book-title")[0]?.value || filename.replace(/\.fb2$/i, "") || "FB2-Quelle";
  const authors = fb2People(titleInfo, "author");
  const translators = fb2People(titleInfo, "translator");
  const language = xmlValues(titleInfo, "lang")[0]?.value || "";
  const dateEntry = xmlValues(titleInfo, "date")[0];
  const issuedDate = dateEntry?.attributes.value || dateEntry?.value || "";
  const publisher = xmlValues(publishInfo, "publisher")[0]?.value || "";
  const publisherPlace = xmlValues(publishInfo, "city")[0]?.value || "";
  const issuedYear = xmlValues(publishInfo, "year")[0]?.value || issuedDate.match(/\b\d{4}\b/)?.[0] || "";
  const isbn = xmlValues(publishInfo, "isbn")[0]?.value || "";
  const genres = xmlValues(titleInfo, "genre").map((entry) => entry.value);
  const annotation = stripMarkup(xmlSection(titleInfo, "annotation"));
  const sequences = Array.from(titleInfo.matchAll(/<sequence\b([^>]*)\/?>/gi)).map((match) => xmlAttributes(match[1]));
  const customInfo = Array.from(xml.matchAll(/<custom-info\b([^>]*)>([\s\S]*?)<\/custom-info>/gi))
    .map((match) => ({ ...xmlAttributes(match[1]), value: stripMarkup(match[2]) }));

  const bodies = Array.from(xml.matchAll(/<body\b([^>]*)>([\s\S]*?)<\/body>/gi));
  const markdownParts = [];
  for (const bodyMatch of bodies) {
    const bodyAttributes = xmlAttributes(bodyMatch[1]);
    let bodyXml = bodyMatch[2]
      .replace(/<title\b[^>]*>([\s\S]*?)<\/title>/gi, (match, content) => `<h2>${stripMarkup(content)}</h2>`)
      .replace(/<subtitle\b[^>]*>([\s\S]*?)<\/subtitle>/gi, (match, content) => `<h3>${stripMarkup(content)}</h3>`)
      .replace(/<empty-line\s*\/?>/gi, "<p></p>")
      .replace(/<v\b[^>]*>([\s\S]*?)<\/v>/gi, (match, content) => `<p>${stripMarkup(content)}</p>`);
    const markdown = xhtmlToMarkdown(bodyXml);
    if (!markdown) continue;
    markdownParts.push(bodyAttributes.name === "notes" ? `## Anmerkungen\n\n${markdown}` : markdown);
  }
  let sourceRawMarkdown = `# ${title}\n\n${markdownParts.join("\n\n")}`.trim();
  if (!sourceRawMarkdown.replace(/^#.*$/m, "").trim()) throw new Error("Das FB2 enthält keinen lesbaren Haupttext.");

  const citationSource = Object.fromEntries(CITATION_FIELDS.map((field) => [field, ""]));
  Object.assign(citationSource, {
    source_type: "book",
    title,
    language,
    authors: authors.join("; "),
    translators: translators.join("; "),
    publisher,
    publisher_place: publisherPlace,
    issued_date: issuedDate,
    issued_year: issuedYear,
    citation_style: "Hausstil",
  });
  return {
    source_raw_markdown: sourceRawMarkdown,
    text_kind: "article",
    citation_source: citationSource,
    transcription: {
      source_kind: "fb2",
      extraction_basis: "embedded_text",
      notes: ["Lokal aus der FictionBook-XML-Struktur importiert."],
      uncertain_passages: [],
    },
    source_metadata: {
      format: "fb2",
      identifiers: isbn ? [{ value: isbn, scheme: "ISBN" }] : [],
      rights_statements: customInfo.filter((entry) => /rights|copyright|license|lizenz/i.test(`${entry["info-type"] || ""} ${entry.value || ""}`)),
      subjects: genres.map((value) => ({ value })),
      descriptions: annotation ? [{ value: annotation }] : [],
      sequences,
      document_info: {
        authors: fb2People(documentInfo, "author"),
        date: xmlValues(documentInfo, "date")[0]?.value || "",
        id: xmlValues(documentInfo, "id")[0]?.value || "",
        version: xmlValues(documentInfo, "version")[0]?.value || "",
        source_urls: xmlValues(documentInfo, "src-url").map((entry) => entry.value),
      },
      publish_info: { publisher, place: publisherPlace, year: issuedYear, isbn },
      custom_info: customInfo,
      provenance: { filename, extraction_method: "local_fb2_xml" },
    },
  };
}

function findCalibreConverter() {
  const candidates = [
    process.env.CALIBRE_EBOOK_CONVERT,
    process.env.ProgramFiles ? join(process.env.ProgramFiles, "Calibre2", "ebook-convert.exe") : "",
    process.env["ProgramFiles(x86)"] ? join(process.env["ProgramFiles(x86)"], "Calibre2", "ebook-convert.exe") : "",
  ].filter(Boolean);
  return candidates.find((candidate) => existsSync(candidate)) || (process.platform === "win32" ? "" : "ebook-convert");
}

function runCalibreConversion(executable, inputPath, outputPath) {
  return new Promise((resolvePromise, rejectPromise) => {
    const child = spawn(executable, [inputPath, outputPath], { windowsHide: true });
    let errorOutput = "";
    child.stderr.on("data", (chunk) => {
      if (errorOutput.length < 8000) errorOutput += chunk.toString("utf8");
    });
    child.on("error", rejectPromise);
    child.on("close", (code) => {
      if (code === 0) resolvePromise();
      else rejectPromise(new Error(errorOutput.trim() || `Calibre wurde mit Status ${code} beendet.`));
    });
  });
}

async function buildConvertedEbookDocument({ filename, fileData, format }) {
  const converter = findCalibreConverter();
  if (!converter) {
    throw new Error(`${format.toUpperCase()} benötigt lokal Calibre mit ebook-convert. EPUB und FB2 funktionieren ohne Zusatzprogramm.`);
  }
  const temporaryDirectory = await mkdtemp(join(tmpdir(), "typemap-ebook-"));
  const inputPath = join(temporaryDirectory, `source.${format}`);
  const outputPath = join(temporaryDirectory, "converted.epub");
  try {
    const inputBytes = Buffer.from(String(fileData || "").replace(/^data:[^;]*;base64,/i, ""), "base64");
    await writeFile(inputPath, inputBytes);
    await runCalibreConversion(converter, inputPath, outputPath);
    const epubBytes = await readFile(outputPath);
    const document = buildEpubDocument({
      filename: filename.replace(/\.[^.]+$/i, ".epub"),
      fileData: `data:application/epub+zip;base64,${epubBytes.toString("base64")}`,
    });
    document.transcription.source_kind = format;
    document.transcription.notes.push(`Lokal mit Calibre aus ${format.toUpperCase()} nach EPUB konvertiert.`);
    document.source_metadata.format = format;
    document.source_metadata.provenance = {
      ...document.source_metadata.provenance,
      filename,
      extraction_method: "local_calibre_conversion",
      converted_to: "epub",
    };
    return document;
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
}

async function buildEbookDocument({ filename, fileData }) {
  const format = filename.match(/\.([^.]+)$/)?.[1]?.toLowerCase() || "";
  if (format === "epub") return buildEpubDocument({ filename, fileData });
  if (format === "fb2") return buildFb2Document({ filename, fileData });
  if (["mobi", "azw3"].includes(format)) return buildConvertedEbookDocument({ filename, fileData, format });
  throw new Error("Dieses E-Book-Format wird noch nicht unterstützt.");
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(payload));
}

async function readJsonBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_REQUEST_BYTES) throw new Error("Die Anfrage ist größer als 72 MB.");
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function getOutputText(response) {
  if (typeof response?.output_text === "string") return response.output_text;
  for (const item of response?.output || []) {
    for (const content of item?.content || []) {
      if (content?.type === "refusal") throw new Error(content.refusal || "Die Anfrage wurde vom Modell abgelehnt.");
      if (content?.type === "output_text" && typeof content.text === "string") return content.text;
    }
  }
  throw new Error("Die KI hat keine auswertbare strukturierte Antwort geliefert.");
}

function getGeminiOutputText(response) {
  const candidate = response?.candidates?.[0];
  const finishReason = candidate?.finishReason;
  if (finishReason && finishReason !== "STOP") {
    const error = new Error(finishReason === "MAX_TOKENS"
      ? "Die Ausgabe war für diesen Verarbeitungsabschnitt zu lang."
      : `Gemini beendete die Antwort vorzeitig (${finishReason}).`);
    error.code = finishReason === "MAX_TOKENS" ? "GEMINI_OUTPUT_TOO_LONG" : "GEMINI_INCOMPLETE";
    throw error;
  }
  const text = (candidate?.content?.parts || [])
    .map((part) => typeof part?.text === "string" ? part.text : "")
    .join("")
    .trim();
  if (text) return text;
  const blockReason = response?.promptFeedback?.blockReason;
  if (blockReason) throw new Error(`Gemini hat die Anfrage blockiert: ${blockReason}`);
  throw new Error("Gemini hat keine auswertbare strukturierte Antwort geliefert.");
}

function parseJsonOutput(text) {
  const candidate = String(text || "").trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
  return JSON.parse(candidate);
}

function wait(milliseconds) {
  return new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));
}

async function fetchWithRetry(url, options, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, options);
      if (attempt < attempts && (response.status === 429 || response.status >= 500)) {
        const retryAfter = Number(response.headers.get("retry-after"));
        await wait(Number.isFinite(retryAfter) ? retryAfter * 1000 : attempt * 1500);
        continue;
      }
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) {
        await wait(attempt * 1500);
        continue;
      }
    }
  }
  const cause = lastError?.cause?.code || lastError?.cause?.message || lastError?.message;
  throw new Error(`Netzwerkverbindung zum KI-Dienst fehlgeschlagen${cause ? ` (${cause})` : ""}.`);
}

async function uploadGeminiPdf({ apiKey, filename, base64Data }) {
  const fileBytes = Buffer.from(base64Data, "base64");
  const startResponse = await fetchWithRetry(
    `https://generativelanguage.googleapis.com/upload/v1beta/files?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Upload-Protocol": "resumable",
        "X-Goog-Upload-Command": "start",
        "X-Goog-Upload-Header-Content-Length": String(fileBytes.length),
        "X-Goog-Upload-Header-Content-Type": "application/pdf",
      },
      body: JSON.stringify({ file: { display_name: filename } }),
      signal: AbortSignal.timeout(60 * 1000),
    },
  );
  if (!startResponse.ok) {
    const errorBody = await startResponse.json().catch(() => ({}));
    throw new Error(errorBody?.error?.message || `Gemini-Dateiupload fehlgeschlagen (${startResponse.status}).`);
  }
  const uploadUrl = startResponse.headers.get("x-goog-upload-url");
  if (!uploadUrl) throw new Error("Gemini hat keine Upload-Adresse für die PDF-Datei geliefert.");

  // Der binäre Finalisierungsschritt wird bewusst nicht automatisch wiederholt:
  // Bei einem Verbindungsabbruch könnte Gemini die Datei bereits angenommen haben.
  let uploadResponse;
  try {
    uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Length": String(fileBytes.length),
        "X-Goog-Upload-Offset": "0",
        "X-Goog-Upload-Command": "upload, finalize",
      },
      body: fileBytes,
      signal: AbortSignal.timeout(5 * 60 * 1000),
    });
  } catch (error) {
    const cause = error?.cause?.code || error?.cause?.message || error?.message;
    throw new Error(`Upload der PDF-Datei zu Gemini fehlgeschlagen${cause ? ` (${cause})` : ""}.`);
  }
  const uploadBody = await uploadResponse.json().catch(() => ({}));
  if (!uploadResponse.ok) {
    throw new Error(uploadBody?.error?.message || `Gemini-Dateiupload fehlgeschlagen (${uploadResponse.status}).`);
  }
  if (!uploadBody?.file?.name || !uploadBody?.file?.uri) {
    throw new Error("Gemini hat nach dem Upload keinen verwendbaren Dateiverweis geliefert.");
  }
  return uploadBody.file;
}

async function waitForGeminiFile({ apiKey, file }) {
  if (!file?.state || file.state === "ACTIVE") return file;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (file.state === "FAILED") throw new Error("Gemini konnte die hochgeladene PDF-Datei nicht verarbeiten.");
    await wait(1000);
    const response = await fetchWithRetry(
      `https://generativelanguage.googleapis.com/v1beta/${file.name}?key=${encodeURIComponent(apiKey)}`,
      { signal: AbortSignal.timeout(30 * 1000) },
    );
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body?.error?.message || "Status der Gemini-Datei konnte nicht gelesen werden.");
    file = body.file || body;
    if (file.state === "ACTIVE") return file;
  }
  throw new Error("Gemini benötigt ungewöhnlich lange, um die PDF-Datei vorzubereiten.");
}

async function deleteGeminiFile({ apiKey, fileName }) {
  if (!fileName) return;
  await fetchWithRetry(
    `https://generativelanguage.googleapis.com/v1beta/${fileName}?key=${encodeURIComponent(apiKey)}`,
    { method: "DELETE", signal: AbortSignal.timeout(30 * 1000) },
    2,
  ).catch(() => undefined);
}

async function requestGeminiPdfJson({ apiKey, model, fileUri, prompt, schema, maxOutputTokens = 65536 }) {
  const upstream = await fetchWithRetry(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [
            { file_data: { mime_type: "application/pdf", file_uri: fileUri } },
            { text: prompt },
          ],
        }],
        generationConfig: {
          responseMimeType: "application/json",
          responseJsonSchema: schema,
          maxOutputTokens,
          temperature: 0,
        },
      }),
      signal: AbortSignal.timeout(20 * 60 * 1000),
    },
  );
  const upstreamBody = await upstream.json().catch(() => ({}));
  if (!upstream.ok) {
    throw new Error(upstreamBody?.error?.message || `Gemini-API-Fehler ${upstream.status}`);
  }
  try {
    return parseJsonOutput(getGeminiOutputText(upstreamBody));
  } catch (error) {
    if (error instanceof SyntaxError) {
      const malformedError = new Error("Gemini hat den Verarbeitungsabschnitt unvollständig als JSON geliefert.");
      malformedError.code = "GEMINI_MALFORMED_JSON";
      throw malformedError;
    }
    throw error;
  }
}

function buildGeminiPdfAnalysisPrompt(filename) {
  return `Analysiere die beigefügte PDF-Datei zunächst nur strukturell und bibliografisch.

- Ermittle die exakte Anzahl der physischen PDF-Dateiseiten, einschließlich Umschlag, Leerseiten und unnummerierter Seiten.
- Bestimme den TypeMap-text_kind.
- Ermittle bibliografische Angaben ausschließlich aus nachweisbaren Stellen der PDF; unbekannte Felder bleiben leer.
- Personennamen stehen als "NACHNAME, Vorname"; mehrere Personen werden mit Semikolon getrennt.
- Bestimme, ob eingebetteter Text, OCR, visuelle Auswertung oder eine Mischung davon nötig ist.
- Transkribiere in diesem Schritt noch nicht den Haupttext.

Dateiname: ${filename}
Gib ausschließlich die Daten des vorgegebenen JSON-Schemas zurück.`;
}

function buildGeminiPdfChunkPrompt(basePrompt, startPage, endPage, totalPages) {
  return `${basePrompt}

AUTOMATISCHE TEILAUFGABE
Bearbeite ausschließlich die physischen PDF-Dateiseiten ${startPage} bis ${endPage} von insgesamt ${totalPages} PDF-Dateiseiten. PDF-Dateiseiten sind die Positionen in der Datei, nicht die aufgedruckte Originalpaginierung.

- Transkribiere den Inhalt dieser Seiten vollständig und in ursprünglicher Reihenfolge.
- Erfinde keine Überschrift für den Abschnitt. Eine vorhandene Werküberschrift erscheint nur dort, wo sie auf diesen Seiten tatsächlich steht.
- Setze aufgedruckte Originalseitenzahlen an ihrer Textposition als [42] beziehungsweise [iv]; PDF-Dateiseitennummern werden nicht in den Text geschrieben.
- Entferne OCR-Artefakte nur bei eindeutig rekonstruierbarer Lesart. Unsichere Stellen bleiben im Text und werden zusätzlich mit PDF-Seite, Lesart und Grund dokumentiert.
- Fußnoten folgen dem Markdown-Schema [^1] und [^1]: Inhalt. Absätze werden durch eine Leerzeile getrennt.
- Gib ausschließlich source_raw_markdown und uncertain_passages entsprechend dem vorgegebenen JSON-Schema zurück.`;
}

function isSplittableGeminiError(error) {
  return error?.code === "GEMINI_OUTPUT_TOO_LONG" || error?.code === "GEMINI_MALFORMED_JSON";
}

async function transcribeGeminiPageRange(context, startPage, endPage) {
  try {
    return await requestGeminiPdfJson({
      ...context,
      prompt: buildGeminiPdfChunkPrompt(context.basePrompt, startPage, endPage, context.totalPages),
      schema: GEMINI_PDF_CHUNK_SCHEMA,
    });
  } catch (error) {
    if (!isSplittableGeminiError(error) || startPage >= endPage) throw error;
    const middlePage = Math.floor((startPage + endPage) / 2);
    const left = await transcribeGeminiPageRange(context, startPage, middlePage);
    const right = await transcribeGeminiPageRange(context, middlePage + 1, endPage);
    return {
      source_raw_markdown: [left.source_raw_markdown, right.source_raw_markdown]
        .map((text) => String(text || "").trim())
        .filter(Boolean)
        .join("\n\n"),
      uncertain_passages: [
        ...(Array.isArray(left.uncertain_passages) ? left.uncertain_passages : []),
        ...(Array.isArray(right.uncertain_passages) ? right.uncertain_passages : []),
      ],
    };
  }
}

async function transcribePdfWithGemini({ apiKey, model, fileData, prompt, filename }) {
  const base64Data = fileData.replace(/^data:application\/pdf;base64,/i, "");
  let uploadedFile;
  try {
    uploadedFile = await uploadGeminiPdf({ apiKey, filename, base64Data });
    uploadedFile = await waitForGeminiFile({ apiKey, file: uploadedFile });

    const analysis = await requestGeminiPdfJson({
      apiKey,
      model,
      fileUri: uploadedFile.uri,
      prompt: buildGeminiPdfAnalysisPrompt(filename),
      schema: GEMINI_PDF_ANALYSIS_SCHEMA,
      maxOutputTokens: 8192,
    });
    const totalPages = Number(analysis.total_pages);
    if (!Number.isInteger(totalPages) || totalPages < 1 || totalPages > 1000) {
      throw new Error("Gemini konnte die Anzahl der PDF-Seiten nicht zuverlässig bestimmen.");
    }

    const context = { apiKey, model, fileUri: uploadedFile.uri, basePrompt: prompt, totalPages };
    const chunks = [];
    const uncertainPassages = [];
    const initialChunkSize = 8;
    for (let startPage = 1; startPage <= totalPages; startPage += initialChunkSize) {
      const endPage = Math.min(totalPages, startPage + initialChunkSize - 1);
      const chunk = await transcribeGeminiPageRange(context, startPage, endPage);
      const markdown = String(chunk.source_raw_markdown || "").trim();
      if (markdown) chunks.push(markdown);
      if (Array.isArray(chunk.uncertain_passages)) uncertainPassages.push(...chunk.uncertain_passages);
    }

    return {
      source_raw_markdown: chunks.join("\n\n"),
      text_kind: analysis.text_kind,
      citation_source: analysis.citation_source,
      transcription: {
        ...analysis.transcription,
        uncertain_passages: uncertainPassages,
      },
    };
  } finally {
    await deleteGeminiFile({ apiKey, fileName: uploadedFile?.name });
  }
}

async function transcribePdfWithOpenAi({ apiKey, model, filename, pdfDataUrl, prompt }) {
  const upstream = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      store: false,
      reasoning: { effort: "medium" },
      input: [{
        role: "user",
        content: [
          { type: "input_file", filename, file_data: pdfDataUrl },
          { type: "input_text", text: prompt },
        ],
      }],
      text: {
        verbosity: "low",
        format: {
          type: "json_schema",
          name: "typemap_pdf_document",
          strict: true,
          schema: TYPEMAP_DOCUMENT_SCHEMA,
        },
      },
    }),
    signal: AbortSignal.timeout(20 * 60 * 1000),
  });
  const upstreamBody = await upstream.json().catch(() => ({}));
  if (!upstream.ok) {
    throw new Error(upstreamBody?.error?.message || `OpenAI-API-Fehler ${upstream.status}`);
  }
  if (upstreamBody.status === "incomplete") {
    throw new Error(upstreamBody?.incomplete_details?.reason || "Die Modellantwort wurde vorzeitig beendet.");
  }
  return parseJsonOutput(getOutputText(upstreamBody));
}

async function transcribePdf(request, response) {
  const body = await readJsonBody(request);
  const provider = String(body.provider || "google").trim();
  if (!["google", "openai"].includes(provider)) {
    throw new Error("Der gewählte API-Anbieter wird noch nicht unterstützt.");
  }
  const apiKey = String(body.apiKey || "").trim();
  const model = String(body.model || (provider === "google" ? "gemini-2.5-flash" : "gpt-5.5")).trim();
  const filename = String(body.filename || "quelle.pdf").trim();
  const fileData = String(body.fileData || "");
  // Responses erwartet bei direkter Dateiübergabe eine vollständige Data-URL,
  // nicht lediglich den Base64-Nutzinhalt. Alte Clients werden hier mitgetragen.
  const pdfDataUrl = fileData.startsWith("data:application/pdf;base64,")
    ? fileData
    : `data:application/pdf;base64,${fileData}`;
  const prompt = String(body.prompt || "").trim();
  if (!apiKey || !fileData || !prompt) throw new Error("API-Key, PDF-Datei oder Transkriptionsauftrag fehlen.");
  if (!/^[A-Za-z0-9._:-]+$/.test(model)) throw new Error("Der Modellname ist formal ungültig.");
  if (!/\.pdf$/i.test(filename)) throw new Error("Die ausgewählte Datei ist keine PDF-Datei.");

  const document = provider === "google"
    ? await transcribePdfWithGemini({ apiKey, model, fileData, prompt, filename })
    : await transcribePdfWithOpenAi({ apiKey, model, filename, pdfDataUrl, prompt });
  sendJson(response, 200, { document });
}

async function importEbook(request, response) {
  const body = await readJsonBody(request);
  const filename = String(body.filename || "quelle.epub").trim();
  const fileData = String(body.fileData || "");
  if (!/\.(?:epub|fb2|mobi|azw3)$/i.test(filename)) throw new Error("Das ausgewählte E-Book-Format wird nicht unterstützt.");
  if (!/^data:[^;]*;base64,/i.test(fileData)) throw new Error("Die E-Book-Datei wurde nicht vollständig übertragen.");
  const document = await buildEbookDocument({ filename, fileData });
  sendJson(response, 200, { document });
}

async function serveStatic(request, response) {
  const requestUrl = new URL(request.url || "/", `http://${HOST}:${PORT}`);
  let pathname = decodeURIComponent(requestUrl.pathname);
  if (pathname === "/") pathname = "/typemap/";
  if (pathname.endsWith("/")) pathname += "index.html";
  const target = resolve(ROOT, `.${pathname}`);
  if (target !== ROOT && !target.startsWith(`${ROOT}${sep}`)) {
    sendJson(response, 403, { error: "Unzulässiger Dateipfad." });
    return;
  }
  try {
    const content = await readFile(target);
    response.writeHead(200, {
      "Content-Type": MIME_TYPES[extname(target).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(content);
  } catch {
    sendJson(response, 404, { error: "Datei nicht gefunden." });
  }
}

const server = createServer(async (request, response) => {
  try {
    const origin = request.headers.origin;
    if (isAllowedOrigin(origin)) {
      response.setHeader("Access-Control-Allow-Origin", origin || "*");
      response.setHeader("Vary", "Origin");
      response.setHeader("Access-Control-Allow-Headers", "Content-Type");
      response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS");
    }
    if (request.method === "OPTIONS") {
      if (!isAllowedOrigin(origin)) {
        sendJson(response, 403, { error: "Diese Herkunft darf den lokalen TypeMap-Helfer nicht verwenden." });
      } else {
        response.writeHead(204);
        response.end();
      }
      return;
    }
    if (request.method === "POST" && request.url === "/api/typemap/transcribe-pdf") {
      await transcribePdf(request, response);
      return;
    }
    if (request.method === "POST" && ["/api/typemap/import-ebook", "/api/typemap/import-epub"].includes(request.url)) {
      await importEbook(request, response);
      return;
    }
    if (request.method === "GET" || request.method === "HEAD") {
      await serveStatic(request, response);
      return;
    }
    sendJson(response, 405, { error: "Methode nicht erlaubt." });
  } catch (error) {
    sendJson(response, 400, { error: error?.message || "Unbekannter Serverfehler." });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`TypeMap läuft unter http://${HOST}:${PORT}/typemap/`);
});
