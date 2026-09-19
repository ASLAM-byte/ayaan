/* ============================================================
   SAGE WEDDING — Central configuration (single source of truth)
   All content original. Imagery uses free-to-use Unsplash photos.
   Change these values to reuse the site for another couple.
   ============================================================ */
(function () {
  "use strict";
  const IMG = (id, w = 1000) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;
  window.IMG = IMG;

  window.weddingConfig = {
    couple: {
      partnerOne: "Aisha",
      partnerTwo: "Rowan",
      monogram: "A · R",
      quote: "Here begins the best of it.",
    },
    wedding: {
      date: "2027-09-18",
      time: "15:30",
      timezone: "+01:00",
      day: "Saturday",
      dateLine: "18 . 09 . 2027",
      dateLabel: "Saturday, 18 September 2027",
    },
    venue: {
      name: "The Elm Barn",
      address: "Hollow Lane, Meadowfield",
      city: "Cotswolds, England",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=51.8330,-1.8433",
      image: "photo-1507504031003-b417219a0fde",
    },
    profiles: [
      { role: "The Bride", name: "Aisha", desc: "A ceramicist who measures her days in cups of tea and unglazed bowls. She loves rainy windows, secondhand bookshops, and the quiet hour before anyone else wakes.", img: "photo-1531123897727-8f129e1688ce" },
      { role: "The Groom", name: "Rowan", desc: "A trail runner and part-time cartographer of nowhere in particular. Endlessly curious, reliably late, and the first to suggest we take the long way home.", img: "photo-1506794778202-cad84cf45f1d" },
    ],
    facts: [
      { label: "First met", value: "2017", suffix: "" },
      { label: "Miles walked together", value: 3600, suffix: "+", count: true },
      { label: "Favourite escape", value: "Portugal", suffix: "" },
      { label: "Always ordering", value: "One more coffee", suffix: "" },
    ],
    journey: [
      { year: "2017", title: "How We Met", desc: "A pottery class we both signed up for to impress other people. We spent the whole term talking to each other instead, and neither of us learned to centre clay.", img: "photo-1516589178581-6cd7833ae3b2" },
      { year: "2019", title: "Growing Together", desc: "A shared flat with thin walls and a good kettle. We learned each other's silences, argued about houseplants, and quietly became a we.", img: "photo-1494774157365-9e04c6720e47" },
      { year: "2025", title: "The Proposal", desc: "Halfway up a hill neither of us had planned to climb, out of breath and out of excuses. The ring had been in a rucksack for two damp days.", img: "photo-1522673607200-164d1b6ce486" },
      { year: "2026", title: "Forever Begins", desc: "And now, in a barn full of the people we love, we take the long way home together — for good this time.", img: "photo-1519741497674-611481863552" },
    ],
    bigDay: {
      ceremony: { title: "Ceremony", date: "18 September 2027", time: "3:30 PM", location: "The Orchard, The Elm Barn", img: "photo-1465495976277-4387d4b0b4c6" },
      reception: { title: "Reception", time: "6:00 PM onward", venue: "The Threshing Barn", desc: "A long harvest table, candlelight, and dancing beneath the old oak beams until late.", img: "photo-1519225421980-715cb0215aed" },
      dressCode: { title: "Evening Formal", desc: "Long dresses and tailored suits in soft, natural tones. The barn is beautiful but breezy — a jacket or wrap is a wise idea after dusk.", img: "photo-1490481651871-ab68de25d43d" },
    },
    events: [
      { time: "3:30 PM", title: "Ceremony Begins", desc: "Please find your seat in the orchard fifteen minutes early; the ceremony starts on time, rain or shine.", icon: "❧" },
      { time: "4:30 PM", title: "Garden Reception", desc: "Sparkling, seasonal bites, and lawn games while we slip away for a handful of photographs.", icon: "☼" },
      { time: "6:00 PM", title: "Harvest Dinner", desc: "A shared feast at one long table, followed by toasts that will run slightly too long.", icon: "✦" },
      { time: "8:30 PM", title: "Dancing", desc: "The band starts, the barn doors open to the night, and we'd love to see you on the floor.", icon: "♪" },
    ],
    gallery: [
      "photo-1511285560929-80b456fea0bc", "photo-1469371670807-013ccf25f16a",
      "photo-1523438885200-e635ba2c371e", "photo-1470124182917-cc6e71b22ecc",
    ],
    registry: [
      { title: "Wedding Registry", desc: "A small, considered list to help us fill our first proper home with things made to last a lifetime.", cta: "Browse the list", img: "photo-1522771739844-6a9f6d5f14af" },
      { title: "Honeymoon Fund", desc: "Send us a little further down the coast of Portugal — a lunch, a train ticket, a night with a view.", cta: "Send us onward", img: "photo-1507525428034-b723cf961d3e" },
    ],
    blog: [
      { slug: "love-story", cat: "Love Story", date: "Apr 2027", title: "The Pottery Class That Failed Us Both", excerpt: "Neither of us can centre clay to this day. We consider it a fair trade.", img: "photo-1516589178581-6cd7833ae3b2" },
      { slug: "wedding-guide", cat: "Wedding Guide", date: "Mar 2027", title: "Getting to the Barn (and Where to Rest Your Head)", excerpt: "Trains, taxis, and the three nearby inns we'd happily stay in ourselves.", img: "photo-1507504031003-b417219a0fde" },
      { slug: "engagement", cat: "Engagement", date: "Feb 2027", title: "A Hill, a Rucksack, and Very Wet Boots", excerpt: "How the proposal actually happened — soggy, unplanned, and perfect.", img: "photo-1522673607200-164d1b6ce486" },
      { slug: "planning", cat: "Planning", date: "Jan 2027", title: "What We Kept and What We Let Go", excerpt: "Notes from planning a small barn wedding without losing our minds.", img: "photo-1511285560929-80b456fea0bc" },
    ],
    rsvp: {
      byDate: "1 August 2027",
      bg: "photo-1507504031003-b417219a0fde",
    },
    contact: { email: "hello@aishaandrowan.love", phone: "+44 20 0000 0000" },
    social: { instagram: "#", hashtag: "#AishaAndRowan" },
  };
})();
