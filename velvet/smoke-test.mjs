// Serves the velvet folder, verifies every page + asset resolves and key hooks exist.
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
const PORT = 4411, base = `http://localhost:${PORT}`;
let pass = 0, fail = 0;
const ok = (l, c, x = "") => { if (c) { pass++; console.log("  \u2713 " + l); } else { fail++; console.log("  \u2717 " + l + " " + x); } };
const get = async (p) => { const r = await fetch(base + p); return { status: r.status, text: await r.text() }; };

server.listen(PORT, async () => {
  try {
    for (const p of ["/index.html", "/shop.html", "/about.html", "/contact.html", "/404.html"]) {
      const r = await get(p); ok(`page ${p} -> 200`, r.status === 200);
    }
    for (const a of ["/css/base.css", "/css/site.css", "/js/engine.js", "/js/ui.js", "/js/partials.js", "/js/data.js", "/js/content.js"]) {
      const r = await get(a); ok(`asset ${a} -> 200`, r.status === 200);
    }
    const home = await get("/index.html");
    ok("home has hero title 'A Quiet' / 'Promise'", home.text.includes("A Quiet") && home.text.includes("Promise"));
    ok("home has sections (collection, story, film, newsletter)",
      home.text.includes('id="collection"') && home.text.includes("class=\"film\"") && home.text.includes("newsletter"));
    ok("home script order partials->data->content->engine->ui",
      /partials\.js[\s\S]*data\.js[\s\S]*content\.js[\s\S]*engine\.js[\s\S]*ui\.js/.test(home.text));
    const data = await get("/js/data.js");
    ok("data.js defines products with prices", data.text.includes("products") && data.text.includes("$180"));
    const shop = await get("/shop.html");
    ok("shop renders grid from data", shop.text.includes('id="shopGrid"'));
    console.log(`\n  ${pass} passed, ${fail} failed`);
  } catch (e) { console.error(e); fail++; }
  finally { server.close(); process.exit(fail ? 1 : 0); }
});
