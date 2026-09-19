// Serves the ocha folder, checks pages load and reference the right assets, then exits.
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
  } catch {
    res.writeHead(404); res.end("nf");
  }
});

const PORT = 4173;
const base = `http://localhost:${PORT}`;
let pass = 0, fail = 0;
const ok = (label, cond, extra = "") => {
  if (cond) { pass++; console.log("  \u2713 " + label); }
  else { fail++; console.log("  \u2717 " + label + " " + extra); }
};

server.listen(PORT, async () => {
  try {
    // index.html
    let r = await fetch(base + "/");
    let html = await r.text();
    ok("GET / -> 200", r.status === 200);
    ok("index references css/base.css", html.includes("css/base.css"));
    ok("index references css/site.css", html.includes("css/site.css"));
    ok("index loads content.js, anim.js, main.js",
      html.includes("js/content.js") && html.includes("js/anim.js") && html.includes("js/main.js"));
    ok("hero statement present", html.includes("romanticizing everyday life"));
    ok("all section ids present",
      ["specials","reviews","team","merch","community","journal","faq","order"]
        .every((id) => html.includes('id="' + id + '"')),
      );

    // assets resolve
    for (const a of ["css/base.css","css/site.css","css/article.css","js/content.js","js/anim.js","js/main.js","js/article.js"]) {
      const ar = await fetch(base + "/" + a);
      ok("asset " + a + " -> 200", ar.status === 200);
    }

    // journal.html
    r = await fetch(base + "/journal.html");
    html = await r.text();
    ok("GET /journal.html -> 200", r.status === 200);
    ok("journal references article.css/article.js", html.includes("css/article.css") && html.includes("js/article.js"));
    ok("journal has related grid", html.includes('id="relatedGrid"'));

    console.log(`\n  ${pass} passed, ${fail} failed`);
  } catch (e) {
    console.error("Error:", e);
    fail++;
  } finally {
    server.close();
    process.exit(fail ? 1 : 0);
  }
});
