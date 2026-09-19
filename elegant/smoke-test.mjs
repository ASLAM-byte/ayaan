// Serves the elegant folder, verifies every page + asset resolves and key hooks exist.
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
const PORT = 4621, base = `http://localhost:${PORT}`;
let pass = 0, fail = 0;
const ok = (l, c, x = "") => { if (c) { pass++; console.log("  \u2713 " + l); } else { fail++; console.log("  \u2717 " + l + " " + x); } };
const get = async (p) => { const r = await fetch(base + p); return { status: r.status, text: await r.text() }; };

server.listen(PORT, async () => {
  try {
    const en = ["/index.html", "/our-story.html", "/wedding.html", "/gallery.html", "/rsvp.html", "/faq.html", "/confirmation.html", "/404.html"];
    const ar = ["/ar/index.html", "/ar/our-story.html", "/ar/wedding.html", "/ar/gallery.html", "/ar/rsvp.html", "/ar/faq.html", "/ar/confirmation.html"];
    for (const p of [...en, ...ar]) { const r = await get(p); ok(`page ${p} -> 200`, r.status === 200); }

    const assets = ["/css/base.css", "/css/site.css", "/js/config.js", "/js/partials.js", "/js/render.js", "/js/page.js", "/js/components.js", "/js/engine.js", "/js/ui.js"];
    for (const a of assets) { const r = await get(a); ok(`asset ${a} -> 200`, r.status === 200); }

    const home = await get("/index.html");
    ok("EN home has countdown + venue + dress hooks", ["data-countdown", "data-venue-map", 'data-render="palette"'].every((h) => home.text.includes(h)));
    ok("EN home script order config→partials→render→page→components→engine→ui",
      /config\.js[\s\S]*partials\.js[\s\S]*render\.js[\s\S]*page\.js[\s\S]*components\.js[\s\S]*engine\.js[\s\S]*ui\.js/.test(home.text));
    ok("EN home data-lang=en", home.text.includes('data-lang="en"'));

    const arHome = await get("/ar/index.html");
    ok("AR home dir=rtl + data-lang=ar", arHome.text.includes('dir="rtl"') && arHome.text.includes('data-lang="ar"'));
    ok("AR home uses ../ asset paths", arHome.text.includes("../css/base.css") && arHome.text.includes("../js/config.js"));
    ok("AR home contains Arabic copy", /[\u0600-\u06FF]/.test(arHome.text));

    const cfg = await get("/js/config.js");
    ok("config has all sections", ["couple", "weddingConfig", "venue", "schedule", "story", "gallery", "faq", "dressCode", "music", "contact"].every((k) => cfg.text.includes(k)));
    ok("config music src empty (no copyrighted audio)", cfg.text.includes('src: ""'));
    ok("config date drives countdown", cfg.text.includes('date: "2027-05-22"'));

    const wedding = await get("/wedding.html");
    ok("wedding page renders schedule", wedding.text.includes('data-render="schedule"'));
    const gallery = await get("/gallery.html");
    ok("gallery page + lightbox present", gallery.text.includes("data-gallery") && gallery.text.includes("lightbox"));
    const rsvp = await get("/rsvp.html");
    ok("RSVP form structure", rsvp.text.includes("data-rsvp") && rsvp.text.includes('name="attending"'));

    console.log(`\n  ${pass} passed, ${fail} failed`);
  } catch (e) { console.error(e); fail++; }
  finally { server.close(); process.exit(fail ? 1 : 0); }
});
