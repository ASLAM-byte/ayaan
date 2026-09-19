/* ============================================================
   SAGE WEDDING — Interactive components
   Couple carousel · Countdown · RSVP (states) · Blog drag
   ============================================================ */
(function () {
  "use strict";
  const cfg = window.weddingConfig;

  /* ---- Couple carousel (mobile prev/next) ---- */
  const stage = document.querySelector(".couple__stage");
  if (stage) {
    const profiles = [...stage.querySelectorAll(".profile")];
    let cur = 0;
    const show = (i) => { cur = (i + profiles.length) % profiles.length; profiles.forEach((p, n) => p.classList.toggle("active", n === cur)); };
    const prev = stage.querySelector("[data-couple-prev]");
    const next = stage.querySelector("[data-couple-next]");
    if (prev) prev.addEventListener("click", () => show(cur - 1));
    if (next) next.addEventListener("click", () => show(cur + 1));
  }

  /* ---- Countdown ---- */
  const cdGrid = document.querySelector("[data-countdown]");
  if (cdGrid) {
    const target = new Date(`${cfg.wedding.date}T${cfg.wedding.time}:00${cfg.wedding.timezone}`).getTime();
    const past = document.querySelector("[data-countdown-past]");
    const units = { days: cdGrid.querySelector('[data-cd="days"]'), hours: cdGrid.querySelector('[data-cd="hours"]'), minutes: cdGrid.querySelector('[data-cd="minutes"]'), seconds: cdGrid.querySelector('[data-cd="seconds"]') };
    const prev = {};
    const pad = (n) => String(n).padStart(2, "0");
    const setUnit = (elx, val) => {
      if (!elx) return;
      const str = elx.dataset.cd === "days" ? String(val) : pad(val);
      if (prev[elx.dataset.cd] === str) return;
      prev[elx.dataset.cd] = str;
      const span = elx.querySelector(".tick") || elx;
      if (!window.WED || !window.WED.REDUCED) { span.style.opacity = "0"; span.style.transform = "translateY(-6px)"; setTimeout(() => { span.textContent = str; span.style.opacity = "1"; span.style.transform = "translateY(0)"; }, 130); }
      else span.textContent = str;
    };
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { cdGrid.style.display = "none"; if (past) past.hidden = false; clearInterval(timer); return; }
      setUnit(units.days, Math.floor(diff / 864e5));
      setUnit(units.hours, Math.floor((diff % 864e5) / 36e5));
      setUnit(units.minutes, Math.floor((diff % 36e5) / 6e4));
      setUnit(units.seconds, Math.floor((diff % 6e4) / 1e3));
    };
    tick();
    const timer = setInterval(tick, 1000);
  }

  /* ---- RSVP form ---- */
  const form = document.querySelector("[data-rsvp-form]");
  if (form) {
    const status = form.querySelector(".form-status");
    const submitBtn = form.querySelector("[type=submit]");
    const success = document.querySelector("[data-rsvp-success]");
    const setErr = (name, msg) => { const w = form.querySelector(`[data-field="${name}"]`); if (!w) return; w.classList.toggle("error", !!msg); const e = w.querySelector(".field__err"); if (e) e.textContent = msg || ""; };
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const name = form.querySelector("#r-name").value.trim();
      const email = form.querySelector("#r-email").value.trim();
      const attend = form.querySelector('input[name="attending"]:checked');
      let bad = false;
      setErr("name", name ? "" : "Please tell us your name."); if (!name) bad = true;
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setErr("email", emailOk ? "" : "Please enter a valid email."); if (!emailOk) bad = true;
      setErr("attending", attend ? "" : "Please let us know if you can come."); if (!attend) bad = true;
      if (bad) { status.textContent = ""; return; }
      submitBtn.disabled = true;
      status.textContent = "Sending…";
      const data = { name, email, phone: (form.querySelector("#r-phone") || {}).value || "", attending: attend.value, guests: (form.querySelector("#r-guests") || {}).value || "", diet: (form.querySelector("#r-diet") || {}).value || "", message: (form.querySelector("#r-message") || {}).value || "" };
      try { localStorage.setItem("sage_rsvp", JSON.stringify(data)); } catch (e) {}
      setTimeout(() => {
        if (success) { form.style.display = "none"; success.hidden = false; success.querySelector("[data-success-name]").textContent = name; }
        else { status.textContent = "Thank you — your RSVP is in."; }
      }, 700);
    });
    form.querySelectorAll("input, select, textarea").forEach((elx) => elx.addEventListener("input", () => { const w = elx.closest("[data-field]"); if (w) { w.classList.remove("error"); const e = w.querySelector(".field__err"); if (e) e.textContent = ""; } }));
  }

  /* ---- Drag-scroll carousels ---- */
  document.querySelectorAll("[data-drag]").forEach((track) => {
    let down = false, sx, ss;
    track.addEventListener("pointerdown", (e) => { down = true; sx = e.pageX; ss = track.scrollLeft; track.setPointerCapture(e.pointerId); track.style.cursor = "grabbing"; });
    track.addEventListener("pointermove", (e) => { if (down) track.scrollLeft = ss - (e.pageX - sx); });
    const up = () => { down = false; track.style.cursor = "grab"; };
    track.addEventListener("pointerup", up); track.addEventListener("pointercancel", up);
  });
})();
