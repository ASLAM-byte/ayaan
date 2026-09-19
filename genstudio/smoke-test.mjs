// Serves the genstudio folder, verifies every page + asset resolves and key hooks exist.
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = fileURLToPath(new URL(".", import.meta.url));
const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript" };

const server = createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  try {
    const buf = await readFile(join(DIR, p));
    res.writeHead(200, { "Content-Type": MIME[extname(p)] || "text/plain" });
    res.end(buf);
  } catch { res.writeHead(404); res.end("nf"); }
});

const PORT = 4319;
const base = `http://localhost:${PORT}`;
let pass = 0, fail = 0;
const ok = (l, c, x = "") => { if (c) { pass++; console.log("  \u2713 " + l); } else { fail++; console.log("  \u2717 " + l + " " + x); } };
const get = async (p) => { const r = await fetch(base + p); return { status: r.status, text: await r.text(), type: r.headers.get("content-type") || "" }; };

server.listen(PORT, async () => {
  try {
    const pages = [
      "/index.html", "/projects.html", "/about.html", "/blog.html", "/article.html",
      "/contact.html", "/terms.html", "/privacy.html", "/404.html",
      "/projects/time-travel.html", "/projects/legal-office.html",
      "/projects/essence-studio.html", "/projects/brew-district.html",
    ];
    for (const p of pages) {
      const r = await get(p);
      ok(`page ${p} -> 200`, r.status === 200);
    }

    const assets = [
      "/css/base.css", "/css/site.css", "/css/pages.css",
      "/js/engine.js", "/js/ui.js", "/js/partials.js", "/js/data.js",
      "/js/content.js", "/js/case-study.js",
    ];
    for (const a of assets) {
      const r = await get(a);
      ok(`asset ${a} -> 200`, r.status === 200);
    }

    // Homepage key hooks
    const home = await get("/index.html");
    ok("home has hero HUMAN X AI label", home.text.includes("Human × AI"));
    ok("home has all section ids", ["campaigns","services","portfolio","reviews","process","contact"].every((id)=>home.text.includes('id="'+id+'"')));
    ok("home loads data + content + engine + ui in order",
      /partials\.js[\s\S]*data\.js[\s\S]*content\.js[\s\S]*engine\.js[\s\S]*ui\.js/.test(home.text));

    // Case study sets slug
    const cs = await get("/projects/time-travel.html");
    ok("case study sets data-slug", cs.text.includes('data-slug="time-travel"'));
    ok("case study uses ../ asset paths", cs.text.includes("../css/base.css") && cs.text.includes("../js/case-study.js"));

    // Data integrity
    const data = await get("/js/data.js");
    ok("data.js defines 4 project slugs",
      ["time-travel","legal-office","essence-studio","brew-district"].every((s)=>data.text.includes('"'+s+'"')));

    console.log(`\n  ${pass} passed, ${fail} failed`);
  } catch (e) { console.error(e); fail++; }
  finally { server.close(); process.exit(fail ? 1 : 0); }
});
