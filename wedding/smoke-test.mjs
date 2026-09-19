// Serves the wedding folder, verifies every page + asset resolves and key hooks exist.
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
const PORT = 4520, base = `http://localhost:${PORT}`;
let pass = 0, fail = 0;
const ok = (l, c, x = "") => { if (c) { pass++; console.log("  \u2713 " + l); } else { fail++; console.log("  \u2717 " + l + " " + x); } };
const get = async (p) => { const r = await fetch(base + p); return { status: r.status, text: await r.text() }; };

server.listen(PORT, async () => {
  try {
    const pages = [
      "/index.html", "/our-story.html", "/rsvp.html", "/youre-in.html", "/404.html",
      "/ar/index.html", "/ar/our-story.html", "/ar/rsvp.html", "/ar/youre-in.html",
    ];
    for (const p of pages) { const r = await get(p); ok(`page ${p} -> 200`, r.status === 200); }

    const assets = ["/css/base.css", "/css/site.css", "/js/config.js", "/js/partials.js", "/js/render.js", "/js/page.js", "/js/components.js", "/js/engine.js", "/js/ui.js"];
    for (const a of assets) { const r = await get(a); ok(`asset ${a} -> 200`, r.status === 200); }

    const home = await get("/index.html");
    ok("EN home has countdown + gallery + faq + schedule hooks",
      ["data-countdown", 'data-render="schedule"', "data-gallery", 'data-render="faq"'].every((h) => home.text.includes(h)));
    ok("EN home script order config->partials->render->page->components->engine->ui",
      /config\.js[\s\S]*partials\.js[\s\S]*render\.js[\s\S]*page\.js[\s\S]*components\.js[\s\S]*engine\.js[\s\S]*ui\.js/.test(home.text));
    ok("EN home is data-lang=en", home.text.includes('data-lang="en"'));

    const ar = await get("/ar/index.html");
    ok("AR home is dir=rtl + data-lang=ar", ar.text.includes('dir="rtl"') && ar.text.includes('data-lang="ar"'));
    ok("AR home uses ../ asset paths", ar.text.includes("../css/base.css") && ar.text.includes("../js/config.js"));
    ok("AR home contains Arabic copy", /[\u0600-\u06FF]/.test(ar.text));

    const cfg = await get("/js/config.js");
    ok("config has couple, date, venue, schedule, faq, gallery, music",
      ["couple", "weddingConfig", "venue", "schedule", "faq", "gallery", "music"].every((k) => cfg.text.includes(k)));
    ok("config music src is empty (no copyrighted audio)", cfg.text.includes('src: ""'));
    ok("config wedding date drives countdown", cfg.text.includes('date: "2026-10-17"'));

    const rsvp = await get("/rsvp.html");
    ok("RSVP form has data-rsvp + fields", rsvp.text.includes("data-rsvp") && rsvp.text.includes('id="r-name"') && rsvp.text.includes('name="attending"'));

    console.log(`\n  ${pass} passed, ${fail} failed`);
  } catch (e) { console.error(e); fail++; }
  finally { server.close(); process.exit(fail ? 1 : 0); }
});
