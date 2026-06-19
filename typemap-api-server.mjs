import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("./", import.meta.url)));
const HOST = "127.0.0.1";
const PORT = Number(process.env.TYPEMAP_PORT) || 7319;
const MAX_REQUEST_BYTES = 72 * 1024 * 1024;

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
    text_kind: { type: "string", enum: ["paper", "report", "notebook"] },
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

async function transcribePdf(request, response) {
  const body = await readJsonBody(request);
  if (body.provider !== "openai") throw new Error("Der gewählte API-Anbieter wird noch nicht unterstützt.");
  const apiKey = String(body.apiKey || "").trim();
  const model = String(body.model || "gpt-5.5").trim();
  const filename = String(body.filename || "quelle.pdf").trim();
  const fileData = String(body.fileData || "");
  const prompt = String(body.prompt || "").trim();
  if (!apiKey || !fileData || !prompt) throw new Error("API-Key, PDF-Datei oder Transkriptionsauftrag fehlen.");
  if (!/^[A-Za-z0-9._:-]+$/.test(model)) throw new Error("Der Modellname ist formal ungültig.");
  if (!/\.pdf$/i.test(filename)) throw new Error("Die ausgewählte Datei ist keine PDF-Datei.");

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
          { type: "input_file", filename, file_data: fileData },
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
  const document = JSON.parse(getOutputText(upstreamBody));
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
    if (request.method === "POST" && request.url === "/api/typemap/transcribe-pdf") {
      await transcribePdf(request, response);
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
