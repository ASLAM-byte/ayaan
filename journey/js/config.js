/* ============================================================
   JOURNEY WEDDING — Central configuration (single source of truth)
   All content original. Imagery uses free-to-use Unsplash photos.
   Change these values to reuse the site for another couple.
   ============================================================ */
(function () {
  "use strict";
  const IMG = (id, w = 1000) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;
  window.IMG = IMG;

  window.weddingConfig = {
    couple: {
      partnerOne: "Elena",
      partnerTwo: "Marco",
      monogram: "E · M",
      quote: "And so the adventure begins.",
    },
    wedding: {
      date: "2027-06-12",
      time: "16:00",
      timezone: "+02:00",
      day: "Saturday",
      dateLine: "12 . 06 . 2027",
      dateLabel: "Saturday, 12 June 2027",
    },
    venue: {
      name: "Villa Lucía",
      address: "Via delle Colline 9",
      city: "Lake Como, Italy",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=45.9847,9.2570",
      image: "photo-1464366302246-5f9e75f77d3f",
    },
    profiles: [
      { role: "The Bride", name: "Elena", desc: "A creative soul with a love for old films, strong coffee, and slow, quiet mornings. She finds beauty in small details and keeps a notebook in every coat pocket.", img: "photo-1524504388940-b1c1722653e1" },
      { role: "The Groom", name: "Marco", desc: "An adventure seeker with a kind heart and endless optimism. He collects maps, terrible jokes, and the friends who laugh at them — usually all at once.", img: "photo-1500648767791-00dcc994a43e" },
    ],
    facts: [
      { label: "First met", value: "2018", suffix: "" },
      { label: "Cups of coffee shared", value: 2140, suffix: "+", count: true },
      { label: "Favourite place", value: "Italy", suffix: "" },
      { label: "Both love", value: "Sunset walks", suffix: "" },
    ],
    journey: [
      { year: "2018", title: "How We Met", desc: "A crowded gallery opening, one shared opinion about a painting nobody else liked, and a conversation that outlasted the wine.", img: "photo-1521511897085-c4e5f8f43cf6" },
      { year: "2019", title: "Growing Together", desc: "First trips, first arguments about directions, first home with a window that never quite closed. We learned each other slowly and gladly.", img: "photo-1507525428034-b723cf961d3e" },
      { year: "2025", title: "The Proposal", desc: "On a terrace above the lake at golden hour, a question asked badly and answered instantly. Neither of us remembers the exact words — only the yes.", img: "photo-1516589178581-6cd7833ae3b2" },
      { year: "2026", title: "Forever Begins", desc: "And now, with the people we love most, we gather to begin the longest and best adventure of all.", img: "photo-1519741497674-611481863552" },
    ],
    bigDay: {
      ceremony: { title: "Ceremony", date: "12 June 2027", time: "4:00 PM", location: "The Lakeside Garden, Villa Lucía", img: "photo-1465495976277-4387d4b0b4c6" },
      reception: { title: "Reception", time: "6:30 PM onward", venue: "The Orangerie", desc: "Dinner beneath the glass roof, followed by toasts, music, and dancing under the stars.", img: "photo-1519225421980-715cb0215aed" },
      dressCode: { title: "Evening Formal", desc: "Long dresses and tailored suits in soft, warm tones. The evening turns cool by the water, so bring something for your shoulders.", img: "photo-1490481651871-ab68de25d43d" },
    },
    events: [
      { time: "4:00 PM", title: "Ceremony Begins", desc: "Please arrive fifteen minutes early to be seated comfortably in the garden.", icon: "❧" },
      { time: "5:00 PM", title: "Cocktail Hour", desc: "Enjoy drinks and light bites on the terrace while we steal away for photographs.", icon: "☕" },
      { time: "6:30 PM", title: "Reception", desc: "Dinner is served in the Orangerie, followed by heartfelt toasts and celebration.", icon: "✦" },
      { time: "8:00 PM", title: "Celebration", desc: "Join us on the dance floor as the music rises and the party continues into the night.", icon: "♪" },
    ],
    gallery: [
      "photo-1511285560929-80b456fea0bc", "photo-1469371670807-013ccf25f16a",
      "photo-1522673607200-164d1b6ce486", "photo-1470124182917-cc6e71b22ecc",
    ],
    registry: [
      { title: "Wedding Registry", desc: "A curated list of pieces to help us build our first home together — chosen with care, given with love.", cta: "View the registry", img: "photo-1522771739844-6a9f6d5f14af" },
      { title: "Honeymoon Fund", desc: "Contribute to the memories we'll cherish on our first adventure as a married couple, somewhere with a good view.", cta: "Contribute a memory", img: "photo-1507525428034-b723cf961d3e" },
    ],
    blog: [
      { slug: "love-story", cat: "Love Story", date: "Mar 2027", title: "How a Painting Started Everything", excerpt: "The gallery, the argument, and the conversation that refused to end.", img: "photo-1519741497674-611481863552" },
      { slug: "wedding-guide", cat: "Wedding Guide", date: "Feb 2027", title: "A Simple Guide for Our Guests", excerpt: "Where to stay, how to arrive, and what to expect from a lakeside evening.", img: "photo-1464366302246-5f9e75f77d3f" },
      { slug: "engagement", cat: "Engagement", date: "Jan 2027", title: "The Terrace, the Lake, and the Yes", excerpt: "How the proposal actually happened — badly rehearsed and perfectly timed.", img: "photo-1516589178581-6cd7833ae3b2" },
      { slug: "planning", cat: "Planning", date: "Dec 2026", title: "Notes From Planning a Small Wedding", excerpt: "What we kept, what we happily let go of, and what we'd tell anyone starting out.", img: "photo-1511285560929-80b456fea0bc" },
    ],
    rsvp: {
      byDate: "1 May 2027",
      bg: "photo-1519225421980-715cb0215aed",
    },
    contact: { email: "hello@elenaandmarco.love", phone: "+39 000 000 0000" },
    social: { instagram: "#", hashtag: "#ElenaAndMarco" },
  };
})();
