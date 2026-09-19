/* ============================================================
   VELVET PROMISE — Shared data (original copy, free-to-use imagery)
   ============================================================ */
(function () {
  "use strict";
  const IMG = (id, w = 900) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

  window.VP_DATA = {
    IMG,
    products: [
      { name: "The Midnight Slip", cat: "Silk Slip", price: "$180", tag: "New", main: "photo-1595777457583-95e059d581b8", alt: "photo-1594633312681-425c7b97ccd1" },
      { name: "Aubade Robe", cat: "Silk Robe", price: "$240", tag: "New", main: "photo-1585487000160-6ebcfceb0d03", alt: "photo-1571908599407-cdb918ed83bf" },
      { name: "Promise Bralette", cat: "Lace Bralette", price: "$95", tag: null, main: "photo-1596993100471-c3905dafa78e", alt: "photo-1617922001439-4a2e6562f328" },
      { name: "Velvet Evening Gown", cat: "Eveningwear", price: "$420", tag: null, main: "photo-1566174053879-31528523f8ae", alt: "photo-1539008835657-9e8e9680c956" },
      { name: "Rosewood Camisole", cat: "Silk Camisole", price: "$120", tag: null, main: "photo-1618932260643-eee4a2f652a6", alt: "photo-1583846717393-dc2412c95ed7" },
      { name: "The Confession Set", cat: "Lace Set", price: "$160", tag: "Limited", main: "photo-1617331721458-bd3bd3f9c7f8", alt: "photo-1602573991155-21f0143bb45b" },
    ],
  };
})();
