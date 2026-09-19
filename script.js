/* ============================================================
   Wedding invitation — behaviour
   Reads everything from window.WEDDING (config.js)
   ============================================================ */
(function () {
  "use strict";

  var W = window.WEDDING || {};
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- Populate text ---------- */
  function setText(id, value) {
    var el = $(id);
    if (el && value != null) el.textContent = value;
  }

  function populate() {
    document.title = W.bride + " & " + W.groom + " — Wedding Invitation";

    setText("loaderNames", W.bride + " & " + W.groom);
    setText("heroBride", W.bride);
    setText("heroGroom", W.groom);
    setText("heroDate", W.weddingDateLabel);
    setText("heroTagline", W.tagline);

    if (W.story) {
      setText("storyMet", W.story.howWeMet);
      setText("storyProposal", W.story.theProposal);
      setText("storyQuote", W.story.quote);
    }

    setText("footerNames", W.bride + " & " + W.groom);
    setText("footerHashtag", W.hashtag);

    var mapBtn = $("mapBtn");
    if (mapBtn && W.mapLink) mapBtn.href = W.mapLink;

    if (W.rsvp) {
      var note = "We would be honoured to celebrate with you. Kindly respond by " +
        (W.rsvp.lastDateToRsvp || "the date on your invitation") + ".";
      setText("rsvpNote", note);
      var contactBits = [];
      if (W.rsvp.contactPhone) contactBits.push("Call: " + W.rsvp.contactPhone);
      if (W.rsvp.contactEmail) contactBits.push("Email: " + W.rsvp.contactEmail);
      setText("rsvpContact", contactBits.join("  •  "));
    }
  }

  /* ---------- Events ---------- */
  function renderEvents() {
    var grid = $("eventsGrid");
    if (!grid || !Array.isArray(W.events)) return;
    grid.innerHTML = W.events.map(function (e) {
      return (
        '<div class="event-card reveal">' +
        '<div class="event-icon">' + (e.icon || "❤") + "</div>" +
        "<h3>" + esc(e.name) + "</h3>" +
        '<p class="e-line">' + esc(e.date) + "</p>" +
        '<p class="e-line">' + esc(e.time) + "</p>" +
        '<p class="e-venue">' + esc(e.venue) + "</p>" +
        '<p class="e-line">' + esc(e.address) + "</p>" +
        "</div>"
      );
    }).join("");
  }

  /* ---------- Gallery ---------- */
  function renderGallery() {
    var grid = $("galleryGrid");
    if (!grid || !Array.isArray(W.gallery)) return;
    grid.innerHTML = W.gallery.map(function (src, i) {
      return '<img src="' + esc(src) + '" alt="Gallery photo ' + (i + 1) +
        '" loading="lazy" />';
    }).join("");
  }

  /* ---------- Countdown ---------- */
  var cdTimer;
  function startCountdown() {
    var target = new Date(W.weddingDate).getTime();
    if (isNaN(target)) return;

    function tick() {
      var now = Date.now();
      var diff = target - now;
      if (diff <= 0) {
        setText("cdDays", 0); setText("cdHours", 0);
        setText("cdMins", 0); setText("cdSecs", 0);
        var heading = document.querySelector("#countdown .script-heading");
        if (heading) heading.textContent = "Today is the day! 🎉";
        clearInterval(cdTimer);
        return;
      }
      var d = Math.floor(diff / 864e5);
      var h = Math.floor((diff % 864e5) / 36e5);
      var m = Math.floor((diff % 36e5) / 6e4);
      var s = Math.floor((diff % 6e4) / 1e3);
      setText("cdDays", d);
      setText("cdHours", pad(h));
      setText("cdMins", pad(m));
      setText("cdSecs", pad(s));
    }
    tick();
    cdTimer = setInterval(tick, 1000);
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ---------- RSVP ---------- */
  function initRsvp() {
    var form = $("rsvpForm");
    if (!form) return;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var status = $("rsvpStatus");
      var name = ($("rsvpName").value || "").trim();
      var attending = $("rsvpAttending").value;
      if (!name || !attending) {
        status.textContent = "Please add your name and let us know if you'll attend.";
        return;
      }

      var data = {
        name: name,
        phone: ($("rsvpPhone").value || "").trim(),
        attending: attending,
        guests: ($("rsvpGuests").value || "").trim(),
        message: ($("rsvpMessage").value || "").trim(),
      };

      var endpoint = (W.rsvp && W.rsvp.endpoint) || "";
      var thanks = attending === "yes"
        ? "Thank you, " + name + "! We can't wait to celebrate with you. 💛"
        : "Thank you for letting us know, " + name + ". You'll be missed! 🤍";

      if (!endpoint) {
        status.textContent = thanks;
        form.reset();
        return;
      }

      var btn = $("rsvpSubmit");
      btn.disabled = true;
      status.textContent = "Sending…";
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (r) {
          if (!r.ok) throw new Error("bad response");
          status.textContent = thanks;
          form.reset();
        })
        .catch(function () {
          status.textContent =
            "Sorry, something went wrong. Please contact us directly to RSVP.";
        })
        .finally(function () { btn.disabled = false; });
    });
  }

  /* ---------- Music ---------- */
  function initMusic() {
    if (!W.music) return;
    var btn = $("musicToggle");
    var audio = new Audio(W.music);
    audio.loop = true;
    btn.hidden = false;
    var playing = false;
    btn.addEventListener("click", function () {
      if (playing) {
        audio.pause();
        btn.classList.remove("playing");
      } else {
        audio.play().catch(function () {});
        btn.classList.add("playing");
      }
      playing = !playing;
    });
  }

  /* ---------- Loader ---------- */
  function hideLoader() {
    var loader = $("loader");
    if (loader) setTimeout(function () { loader.classList.add("hidden"); }, 600);
  }

  /* ---------- Helpers ---------- */
  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    populate();
    renderEvents();
    renderGallery();
    startCountdown();
    initReveal();
    initRsvp();
    initMusic();
  });
  window.addEventListener("load", hideLoader);
})();
