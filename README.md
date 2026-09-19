# Digital Wedding Invitation

An elegant, single-page digital wedding invitation — inspired by modern "Raabta"-style
scroll invites. Pure HTML, CSS and vanilla JavaScript, so it runs anywhere with **no build step**.

## ✨ Features

- Full-screen hero with the couple's names and date
- Live **countdown** to the big day
- "Our Story" section
- **Events** cards (Mehndi, Sangeet, Wedding, Reception — fully editable)
- Photo **gallery**
- **RSVP** form (works locally, or POSTs to a Formspree / Google Form / custom endpoint)
- Optional background **music** toggle
- Smooth scroll-reveal animations, fully responsive, respects reduced-motion

## 🚀 Run it

It's a static site — just open `index.html`, or serve the folder:

```bash
# from the project folder
python3 -m http.server 8080
# then open http://localhost:8080
```

## ✏️ Customise (this is all you need)

Open **`config.js`** and edit the values — names, date, story, events, gallery images,
RSVP contact, map link and music. Nothing else needs to change.

```js
window.WEDDING = {
  bride: "Aaliya",
  groom: "Ayaan",
  weddingDate: "2026-12-12T19:00:00", // drives the countdown
  weddingDateLabel: "12th December 2026",
  // ...events, gallery, rsvp, etc.
};
```

### Making RSVP save responses
By default RSVP shows a thank-you message in the browser. To actually collect responses,
create a free [Formspree](https://formspree.io) form (or use a Google Form / your own API)
and paste the endpoint URL into `config.js`:

```js
rsvp: { endpoint: "https://formspree.io/f/xxxxxxx", ... }
```

### Photos & music
- Replace the `gallery` URLs with your own photos (or drop files into an `assets/` folder
  and reference them, e.g. `"assets/photo1.jpg"`).
- Set `music: "assets/song.mp3"` to enable the music toggle.

## 📁 Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure |
| `styles.css` | Theme & layout |
| `script.js` | Countdown, RSVP, animations, music |
| `config.js` | **Your content — edit this** |

---
Made with ♥
