import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, extname, normalize } from "node:path";
import db from "./db.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");
const PORT = process.env.PORT || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

function json(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (c) => {
      data += c;
      if (data.length > 1e6) req.destroy(); // basic guard
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve(null);
      }
    });
  });
}

// ---- API handlers ----
function listProjects(res) {
  const rows = db
    .prepare("SELECT * FROM projects ORDER BY sort_order ASC, id ASC")
    .all();
  json(res, 200, rows);
}

function getProject(res, slug) {
  const row = db.prepare("SELECT * FROM projects WHERE slug = ?").get(slug);
  if (!row) return json(res, 404, { error: "Not found" });
  json(res, 200, row);
}

async function createMessage(req, res) {
  const payload = await readBody(req);
  if (!payload) return json(res, 400, { errors: ["Invalid JSON."] });
  const { name, email, body } = payload;
  const errors = [];
  if (!name || !String(name).trim()) errors.push("Name is required.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email)))
    errors.push("A valid email is required.");
  if (!body || !String(body).trim()) errors.push("Message is required.");
  if (errors.length) return json(res, 400, { errors });

  const info = db
    .prepare("INSERT INTO messages (name, email, body) VALUES (?, ?, ?)")
    .run(String(name).trim(), String(email).trim(), String(body).trim());
  json(res, 201, { id: info.lastInsertRowid, ok: true });
}

function listMessages(res) {
  const rows = db
    .prepare(
      "SELECT id, name, email, body, created_at FROM messages ORDER BY id DESC"
    )
    .all();
  json(res, 200, rows);
}

// ---- Static file serving ----
async function serveStatic(req, res) {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  // Prevent path traversal
  const safePath = normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(PUBLIC_DIR, safePath);
  if (!filePath.startsWith(PUBLIC_DIR)) {
    return json(res, 403, { error: "Forbidden" });
  }
  try {
    const data = await readFile(filePath);
    const type = MIME[extname(filePath)] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(data);
  } catch {
    // SPA-ish fallback to index.html for unknown non-file paths
    try {
      const html = await readFile(join(PUBLIC_DIR, "index.html"));
      res.writeHead(200, { "Content-Type": MIME[".html"] });
      res.end(html);
    } catch {
      json(res, 404, { error: "Not found" });
    }
  }
}

const server = createServer(async (req, res) => {
  const { method } = req;
  const path = req.url.split("?")[0];

  try {
    if (path === "/api/health") return json(res, 200, { ok: true });
    if (path === "/api/projects" && method === "GET") return listProjects(res);
    if (path.startsWith("/api/projects/") && method === "GET")
      return getProject(res, path.replace("/api/projects/", ""));
    if (path === "/api/contact" && method === "POST")
      return await createMessage(req, res);
    if (path === "/api/messages" && method === "GET") return listMessages(res);
    if (path.startsWith("/api/")) return json(res, 404, { error: "Not found" });

    // static
    return await serveStatic(req, res);
  } catch (err) {
    json(res, 500, { error: "Server error" });
  }
});

server.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});
