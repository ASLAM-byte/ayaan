// Self-contained end-to-end check: starts the server, hits every endpoint, shuts down.
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const server = spawn(
  process.execPath,
  ["--experimental-sqlite", join(__dirname, "server.js")],
  { env: { ...process.env, NODE_OPTIONS: "", PORT: "3000" }, stdio: "inherit" }
);

const base = "http://localhost:3000";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  await sleep(1200); // let the server boot
  let pass = 0, fail = 0;
  const check = (label, cond, extra = "") => {
    if (cond) { pass++; console.log(`  ✓ ${label}`); }
    else { fail++; console.log(`  ✗ ${label} ${extra}`); }
  };

  // health
  let r = await fetch(`${base}/api/health`);
  check("GET /api/health -> 200", r.status === 200);

  // projects
  r = await fetch(`${base}/api/projects`);
  const projects = await r.json();
  check("GET /api/projects -> array of 4", Array.isArray(projects) && projects.length === 4, `(got ${projects.length})`);

  // single
  r = await fetch(`${base}/api/projects/meridian-os`);
  const one = await r.json();
  check("GET /api/projects/meridian-os", r.status === 200 && one.slug === "meridian-os");

  r = await fetch(`${base}/api/projects/nope`);
  check("GET unknown project -> 404", r.status === 404);

  // contact valid
  r = await fetch(`${base}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Test", email: "test@example.com", body: "Hi" }),
  });
  const created = await r.json();
  check("POST /api/contact valid -> 201", r.status === 201 && created.ok === true);

  // contact invalid
  r = await fetch(`${base}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "", email: "bad", body: "" }),
  });
  const bad = await r.json();
  check("POST /api/contact invalid -> 400 with errors", r.status === 400 && bad.errors.length === 3);

  // messages
  r = await fetch(`${base}/api/messages`);
  const msgs = await r.json();
  check("GET /api/messages includes new message", Array.isArray(msgs) && msgs.length >= 1);

  // static
  r = await fetch(`${base}/`);
  const html = await r.text();
  check("GET / serves index.html", r.status === 200 && html.includes("Selected Work"));

  r = await fetch(`${base}/styles.css`);
  check("GET /styles.css -> 200 css", r.status === 200 && (r.headers.get("content-type") || "").includes("css"));

  r = await fetch(`${base}/app.js`);
  check("GET /app.js -> 200 js", r.status === 200);

  console.log(`\n  ${pass} passed, ${fail} failed`);
  server.kill("SIGTERM");
  process.exit(fail ? 1 : 0);
}

main().catch((e) => {
  console.error("Smoke test error:", e);
  server.kill("SIGTERM");
  process.exit(1);
});
