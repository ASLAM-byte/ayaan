// Serves the sage folder, verifies every page + asset resolves and key hooks exist.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = fileURLToPath(new URL(".", import.meta.url));
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript" };
const server = createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  try { const b = await readFile(join(DIR, p)); res.writeHead(200, { "Content-Type": MIME[extname(p)] || "text/plain" }); res.end(b); }
  catch { res.writeHead(404); res.end("nf"); }
});
const PORT = 4811, base = `http://localhost:${PORT}`;
let pass = 0, fail = 0;
const ok = (l, c, x = "") => { if (c) { pass++; console.log("  \u2713 " + l); } else { fail++; console.log("  \u2717 " + l + " " + x); } };
const get = async (p) => { const r = await fetch(base + p); return { status: r.status, text: await r.text() }; };

server.listen(PORT, async () => {
  try {
    for (const p of ["/index.html", "/blog.html", "/article.html", "/404.html"]) { const r = await get(p); ok(`page ${p} -> 200`, r.status === 200); }
    for (const a of ["/css/base.css", "/css/site.css", "/js/config.js", "/js/partials.js", "/js/render.js", "/js/components.js", "/js/engine.js", "/js/ui.js"]) { const r = await get(a); ok(`asset ${a} -> 200`, r.status === 200); }

    const home = await get("/index.html");
    ok("home has all render hosts", ['data-render="couple"', 'data-render="facts"', 'data-render="journey"', 'data-render="bigday"', 'data-render="events"', 'data-render="registry"', 'data-render="blog"'].every((h) => home.text.includes(h)));
    ok("home has countdown + rsvp form + success", home.text.includes("data-countdown") && home.text.includes("data-rsvp-form") && home.text.includes("data-rsvp-success"));
    ok("home has all section ids", ["couple", "journey", "events", "rsvp", "registry", "blog"].every((id) => home.text.includes('id="' + id + '"')));
    ok("home script order config→partials→render→components→engine→ui",
      /config\.js[\s\S]*partials\.js[\s\S]*render\.js[\s\S]*components\.js[\s\S]*engine\.js[\s\S]*ui\.js/.test(home.text));

    const cfg = await get("/js/config.js");
    ok("config has all sections", ["couple", "weddingConfig", "profiles", "facts", "journey", "bigDay", "events", "registry", "blog", "rsvp"].every((k) => cfg.text.includes(k)));
    ok("config date drives countdown", cfg.text.includes('date: "2027-09-18"'));
    ok("config couple is Aisha & Rowan", cfg.text.includes('"Aisha"') && cfg.text.includes('"Rowan"'));

    const blog = await get("/blog.html");
    ok("blog listing has grid", blog.text.includes('id="blogGrid"'));
    const article = await get("/article.html");
    ok("article page has next + cover hooks", article.text.includes("data-next") && article.text.includes("data-art-cover"));

    console.log(`\n  ${pass} passed, ${fail} failed`);
  } catch (e) { console.error(e); fail++; }
  finally { server.close(); process.exit(fail ? 1 : 0); }
});
