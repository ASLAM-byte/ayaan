/* ============================================================
   WEDDING — Interactive components
   Countdown · Gallery/Lightbox · FAQ · Music player · RSVP
   ============================================================ */
(function () {
  "use strict";
  const cfg = window.weddingConfig;
  const lang = document.body.dataset.lang === "ar" ? "ar" : "en";
  const t = window.i18n[lang];
  const L = (o) => (o && typeof o === "object" ? o[lang] : o);
  const isAr = lang === "ar";
  const arDigits = "٠١٢٣٤٥٦٧٨٩";
  const toAr = (s) => String(s).replace(/[0-9]/g, (d) => arDigits[+d]);
  const fmt = (n) => { const s = String(n).padStart(2, "0"); return isAr ? toAr(s) : s; };

  /* ---------- Countdown ---------- */
  const cdGrid = document.querySelector("[data-countdown]");
  if (cdGrid) {
    const target = new Date(`${cfg.wedding.date}T${cfg.wedding.time}:00${cfg.wedding.timezone}`).getTime();
    const past = document.querySelector("[data-countdown-past]");
    const units = { days: cdGrid.querySelector('[data-cd="days"]'), hours: cdGrid.querySelector('[data-cd="hours"]'), minutes: cdGrid.querySelector('[data-cd="minutes"]'), seconds: cdGrid.querySelector('[data-cd="seconds"]') };
    const prev = {};
    function setUnit(el, val) {
      if (!el) return;
      const str = fmt(val);
      if (prev[el.dataset.cd] === str) return;
      prev[el.dataset.cd] = str;
      const span = el.querySelector(".tick") || el;
      if (!window.WED || !window.WED.REDUCED) {
        span.style.opacity = "0"; span.style.transform = "translateY(-6px)";
        setTimeout(() => { span.textContent = str; span.style.opacity = "1"; span.style.transform = "translateY(0)"; }, 130);
      } else { span.textContent = str; }
    }
    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        cdGrid.style.display = "none";
        if (past) past.hidden = false;
        clearInterval(timer);
        return;
      }
      setUnit(units.days, Math.floor(diff / 864e5));
      setUnit(units.hours, Math.floor((diff % 864e5) / 36e5));
      setUnit(units.minutes, Math.floor((diff % 36e5) / 6e4));
      setUnit(units.seconds, Math.floor((diff % 6e4) / 1e3));
    }
    tick();
    const timer = setInterval(tick, 1000);
  }

  /* ---------- Gallery + Lightbox ---------- */
  const gGrid = document.querySelector("[data-gallery]");
  if (gGrid) {
    const IMG = window.IMG;
    cfg.gallery.forEach((g, i) => {
      const a = document.createElement("button");
      a.className = `g-item ${g.ratio} img-mask`;
      a.type = "button";
      a.dataset.i = i;
      a.setAttribute("aria-label", `${isAr ? "عرض الصورة" : "View photo"} ${i + 1}`);
      a.dataset.cursor = isAr ? "عرض" : "VIEW";
      a.innerHTML = `<img src="${IMG(g.id, 800)}" alt="${isAr ? "لحظة من قصتنا" : "A moment from our story"} ${i + 1}" loading="lazy" />`;
      gGrid.appendChild(a);
    });

    const lb = document.querySelector(".lightbox");
    const lbImg = lb.querySelector(".lightbox__img");
    const lbCount = lb.querySelector(".lightbox__count");
    let idx = 0;
    const total = cfg.gallery.length;
    const show = (i) => {
      idx = (i + total) % total;
      lbImg.src = window.IMG(cfg.gallery[idx].id, 1600);
      lbCount.textContent = isAr ? `${toAr(idx + 1)} / ${toAr(total)}` : `${idx + 1} / ${total}`;
    };
    const open = (i) => { show(i); lb.classList.add("open"); document.body.classList.add("no-scroll"); };
    const close = () => { lb.classList.remove("open"); document.body.classList.remove("no-scroll"); };
    gGrid.querySelectorAll(".g-item").forEach((el) => el.addEventListener("click", () => open(+el.dataset.i)));
    lb.querySelector(".lightbox__close").addEventListener("click", close);
    lb.querySelector(".lightbox__prev").addEventListener("click", () => show(idx - 1));
    lb.querySelector(".lightbox__next").addEventListener("click", () => show(idx + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") show(isAr ? idx - 1 : idx + 1);
      if (e.key === "ArrowLeft") show(isAr ? idx + 1 : idx - 1);
    });
    if (window.WED_bindCursor) window.WED_bindCursor();
  }

  /* ---------- FAQ ---------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-item__q");
    const panel = item.querySelector(".faq-item__a");
    const inner = item.querySelector(".faq-item__a-inner");
    btn.addEventListener("click", () => {
      const open = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((o) => { if (o !== item) { o.classList.remove("open"); o.querySelector(".faq-item__q").setAttribute("aria-expanded", "false"); o.querySelector(".faq-item__a").style.height = "0px"; } });
      item.classList.toggle("open", !open);
      btn.setAttribute("aria-expanded", String(!open));
      panel.style.height = open ? "0px" : inner.offsetHeight + "px";
    });
  });
  window.addEventListener("resize", () => {
    document.querySelectorAll(".faq-item.open").forEach((o) => { o.querySelector(".faq-item__a").style.height = o.querySelector(".faq-item__a-inner").offsetHeight + "px"; });
  });

  /* ---------- Music player (gesture-gated) ---------- */
  const player = document.querySelector(".player");
  if (player && cfg.music && cfg.music.tracks.length) {
    const tracks = cfg.music.tracks;
    let cur = 0, audio = null, playing = false;
    const titleEl = player.querySelector("[data-player-title]");
    const toggle = player.querySelector("[data-player-toggle]");
    const render = () => { titleEl.textContent = `${L(tracks[cur].title)} — ${L(tracks[cur].artist)}`; };
    const ensureAudio = () => {
      if (audio) return;
      audio = new Audio();
      audio.loop = tracks.length === 1;
      audio.addEventListener("ended", () => next());
    };
    const load = () => { ensureAudio(); const src = tracks[cur].src; audio.src = src || ""; };
    const play = () => {
      ensureAudio();
      if (!tracks[cur].src) { // No audio file configured — animate visualizer only.
        playing = true; player.classList.remove("paused"); toggle.textContent = "❚❚"; render(); return;
      }
      load(); audio.play().then(() => { playing = true; player.classList.remove("paused"); toggle.textContent = "❚❚"; }).catch(() => {});
    };
    const pause = () => { playing = false; player.classList.add("paused"); toggle.textContent = "▶"; if (audio) audio.pause(); };
    const next = () => { cur = (cur + 1) % tracks.length; render(); if (playing) play(); };
    const prev = () => { cur = (cur - 1 + tracks.length) % tracks.length; render(); if (playing) play(); };
    toggle.addEventListener("click", () => (playing ? pause() : play()));
    player.querySelector("[data-player-next]").addEventListener("click", next);
    player.querySelector("[data-player-prev]").addEventListener("click", prev);
    render();
  }

  /* ---------- RSVP form ---------- */
  const form = document.querySelector("[data-rsvp]");
  if (form) {
    const status = form.querySelector(".form-status");
    const submitBtn = form.querySelector("[type=submit]");
    const setErr = (name, msg) => {
      const wrap = form.querySelector(`[data-field="${name}"]`);
      if (!wrap) return;
      wrap.classList.toggle("error", !!msg);
      const e = wrap.querySelector(".field__err");
      if (e) e.textContent = msg || "";
    };
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const name = form.querySelector("#r-name").value.trim();
      const email = form.querySelector("#r-email").value.trim();
      const attend = form.querySelector('input[name="attending"]:checked');
      let bad = false;
      setErr("name", name ? "" : t.rsvp.errName); if (!name) bad = true;
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      setErr("email", emailOk ? "" : t.rsvp.errEmail); if (!emailOk) bad = true;
      setErr("attending", attend ? "" : t.rsvp.errAttend); if (!attend) bad = true;
      if (bad) { status.textContent = ""; return; }

      // Submitting state → persist locally → redirect to confirmation.
      submitBtn.disabled = true;
      status.textContent = t.rsvp.sending;
      const data = {
        name, email, attending: attend.value,
        guests: form.querySelector("#r-guests") ? form.querySelector("#r-guests").value : "",
        diet: form.querySelector("#r-diet") ? form.querySelector("#r-diet").value : "",
        message: form.querySelector("#r-message") ? form.querySelector("#r-message").value : "",
        song: form.querySelector("#r-song") ? form.querySelector("#r-song").value : "",
      };
      try { localStorage.setItem("wedding_rsvp", JSON.stringify(data)); } catch (e) {}
      setTimeout(() => { window.location.href = "youre-in.html"; }, 700);
    });
    // Clear error on input
    form.querySelectorAll("input, select, textarea").forEach((el) =>
      el.addEventListener("input", () => { const w = el.closest("[data-field]"); if (w) { w.classList.remove("error"); const e = w.querySelector(".field__err"); if (e) e.textContent = ""; } })
    );
  }

  /* ---------- Confirmation petals ---------- */
  const confirm = document.querySelector("[data-confirm]");
  if (confirm && !(window.WED && window.WED.REDUCED)) {
    for (let i = 0; i < 14; i++) {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.style.left = Math.random() * 100 + "vw";
      petal.style.animationDuration = 6 + Math.random() * 6 + "s";
      petal.style.animationDelay = -Math.random() * 8 + "s";
      petal.style.background = ["#c39a95", "#b79c81", "#7d8a6f"][i % 3];
      confirm.appendChild(petal);
    }
  }
})();
