/*
 * ============================================================
 *  WEDDING INVITATION CONFIG
 *  Edit everything about the invite here — no other file needed.
 * ============================================================
 */
window.WEDDING = {
  // --- Couple ---
  bride: "Aaliya",
  groom: "Ayaan",
  hashtag: "#AaliyaWedsAyaan",
  // Short line under the names on the hero
  tagline: "Together with their families, request the honour of your presence",

  // --- The big day (used for the countdown). Format: YYYY-MM-DDTHH:MM:SS ---
  weddingDate: "2026-12-12T19:00:00",
  weddingDateLabel: "12th December 2026",

  // --- Our Story ---
  story: {
    howWeMet:
      "What began as a chance meeting over a cup of chai grew into a friendship, and then into a love we could never have imagined.",
    theProposal:
      "Under a sky full of stars, one question changed everything — and the answer was an easy, joyful yes.",
    quote:
      "Two hearts, one journey — and a lifetime of togetherness begins.",
  },

  // --- Events ---
  events: [
    {
      name: "Mehndi",
      date: "10th December 2026",
      time: "4:00 PM onwards",
      venue: "The Garden Courtyard",
      address: "12 Rosewood Lane, Hyderabad",
      icon: "🌿",
    },
    {
      name: "Sangeet",
      date: "11th December 2026",
      time: "7:00 PM onwards",
      venue: "Grand Ballroom, The Palace",
      address: "Palace Road, Hyderabad",
      icon: "🎶",
    },
    {
      name: "Wedding",
      date: "12th December 2026",
      time: "7:00 PM onwards",
      venue: "The Royal Lawns",
      address: "Palace Road, Hyderabad",
      icon: "💍",
    },
    {
      name: "Reception",
      date: "13th December 2026",
      time: "8:00 PM onwards",
      venue: "Crystal Hall, The Palace",
      address: "Palace Road, Hyderabad",
      icon: "🥂",
    },
  ],

  // --- Gallery (use your own image URLs or local files in /assets) ---
  gallery: [
    "https://picsum.photos/seed/wed1/600/800",
    "https://picsum.photos/seed/wed2/600/800",
    "https://picsum.photos/seed/wed3/600/800",
    "https://picsum.photos/seed/wed4/600/800",
    "https://picsum.photos/seed/wed5/600/800",
    "https://picsum.photos/seed/wed6/600/800",
  ],

  // --- RSVP ---
  rsvp: {
    // Where the form posts. Leave "" to just show a thank-you message locally.
    // You can paste a Formspree / Google Form endpoint here later.
    endpoint: "",
    contactPhone: "+91 98765 43210",
    contactEmail: "rsvp@aaliyaandayaan.com",
    lastDateToRsvp: "30th November 2026",
  },

  // --- Location map (Google Maps embed / directions link) ---
  mapLink: "https://maps.google.com/?q=Hyderabad",

  // --- Background music (optional). Put an mp3 in /assets and set the path. ---
  music: "", // e.g. "assets/music.mp3"
};
