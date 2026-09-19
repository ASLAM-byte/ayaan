/* ============================================================
   OCHA — Content data + rendering
   All copy is original; imagery uses Unsplash (free to use).
   Edit these arrays to change the site content.
   ============================================================ */
(function () {
  "use strict";

  const IMG = (id, w = 900) =>
    `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

  /* -------------------- Data -------------------- */
  const specials = [
    { name: "Ceremonial Matcha Latte", price: "$4.00", desc: "First-harvest ceremonial grade, whisked to a jade froth and poured over cold milk. The purest expression of the leaf.", img: "photo-1515823064-d6e0c04616a7" },
    { name: "Iced Matcha Latte", price: "$4.50", desc: "Our house blend shaken over ice — grassy, sweet, and impossibly smooth. The everyday order.", img: "photo-1536256263959-770b48d82b0a" },
    { name: "Dirty Matcha", price: "$5.50", desc: "A shot of espresso crashing into cold matcha. Two rituals, one cup, twice the momentum.", img: "photo-1610970881699-44a5587cab8b" },
    { name: "Vanilla Matcha Latte", price: "$5.00", desc: "Madagascar vanilla folded through stone-ground matcha. Soft, warm, and quietly indulgent.", img: "photo-1461023058943-07fcbe16d735" },
    { name: "Hojicha Cream Latte", price: "$5.50", desc: "Roasted green tea with a toasty, caramel depth, crowned with a cloud of lightly sweet cream.", img: "photo-1517701550927-30cf4ba1dba5" },
    { name: "Strawberry Matcha Latte", price: "$6.00", desc: "Crushed strawberries layered under a matcha pour. Pink meets green — main-character energy.", img: "photo-1553530666-ba11a7da3888" },
    { name: "Black Sesame Matcha Royale", price: "$6.50", desc: "Nutty black sesame and matcha in a slow, luxurious swirl. Our most requested off-menu regular.", img: "photo-1592663527359-cf6642f54cff" },
    { name: "Matcha Cloud", price: "$6.00", desc: "Whipped matcha foam floating over chilled milk. Barely a drink, mostly a mood.", img: "photo-1564890369478-c89ca6d9cde9" },
  ];

  const reviews = [
    { name: "Thea", quote: "I told myself I'd just grab a matcha and leave. <span>Three hours later,</span> I was still here." },
    { name: "Sage", quote: "The matcha is amazing, but honestly it's the vibe. Every visit feels like a <span>soft reset</span> for my brain." },
    { name: "Olivia", quote: "This place has become my <span>third place.</span> I come for matcha, stay for the atmosphere." },
    { name: "Willow", quote: "The only thing more consistent than my matcha order is me <span>telling everyone</span> to come here." },
    { name: "Arabella", quote: "It's giving <span>main character</span> morning energy in the best possible way." },
    { name: "Penelope", quote: "I came once because TikTok convinced me. Now I have a favorite seat, a regular order, and <span>zero regrets.</span>" },
  ];

  const team = [
    { name: "Selene", role: "Head Barista", img: "photo-1544005313-94ddf0286df2" },
    { name: "Ines", role: "Barista", img: "photo-1524504388940-b1c1722653e1" },
    { name: "Lucinda", role: "Logistics Manager", img: "photo-1438761681033-6461ffad8d80" },
    { name: "Nina", role: "Chief Chef", img: "photo-1573496359142-b8d87734a5a2" },
    { name: "Aylin", role: "Barista", img: "photo-1494790108377-be9c29b29330" },
    { name: "Bianca", role: "Barista", img: "photo-1487412720507-e7ab37603c6f" },
    { name: "Savanah", role: "Barista", img: "photo-1534528741775-53994a69daeb" },
    { name: "Raina", role: "Community Manager", img: "photo-1531123897727-8f129e1688ce" },
  ];

  const merch = [
    { title: "The Everyday Basic", price: "40", main: "photo-1521572163474-6864f9cf17ab", alt: "photo-1503341504253-dff4815485f1" },
    { title: "For Slow Starts", price: "55", main: "photo-1618354691373-d851c5c3a990", alt: "photo-1620799140408-edc6dcb6d633" },
    { title: "The Lounge Uniform", price: "65", main: "photo-1556905055-8f358a7a47b2", alt: "photo-1552374196-c4e7ffc6e126" },
    { title: "Simple and Functional", price: "35", main: "photo-1523381210434-271e8be1f52b", alt: "photo-1434389677669-e08b4cac3105" },
    { title: "The Ceremonial Kit", price: "80", main: "photo-1564890369478-c89ca6d9cde9", alt: "photo-1515823064-d6e0c04616a7" },
  ];

  const events = [
    { cat: "Ritual", title: "Ceremonial Club", img: "photo-1536256263959-770b48d82b0a" },
    { cat: "Social", title: "Match Point & Matcha", img: "photo-1595435934249-5df7ed86e1c0" },
    { cat: "Outdoors", title: "Matcha Rally", img: "photo-1470137237906-d8a4f71e1966" },
    { cat: "Sport", title: "Matcha on the Fairway", img: "photo-1587174486073-ae5e5cff23aa" },
    { cat: "Movement", title: "Matcha Flow", img: "photo-1518611012118-696072aa579a" },
    { cat: "Weekly", title: "The Matcha Bar", img: "photo-1514432324607-a09d9b4aefdd" },
    { cat: "Drive", title: "Matcha Motor Club", img: "photo-1503376780353-7e6692767b70" },
    { cat: "Dining", title: "Dinner & Ceremonials", img: "photo-1414235077428-338989a2e8c0" },
    { cat: "Tasting", title: "The Taste Society", img: "photo-1447933601403-0c6688de566e" },
    { cat: "Weekend", title: "Saturday Sessions", img: "photo-1517248135467-4c7edcad34c4" },
  ];

  const articles = [
    { cat: "Culture", date: "Jul 2026", title: "Summer Matcha Nights Are Coming Near You", excerpt: "Late-open evenings, cold pours, and a soundtrack for the golden hour crowd.", img: "photo-1464347744102-11db6282f854" },
    { cat: "Wellness", date: "Jun 2026", title: "The Calm-Energy Science of Matcha Wellness", excerpt: "How L-theanine and caffeine team up for focus without the crash.", img: "photo-1544787219-7f47ccb76574" },
    { cat: "How-To", date: "May 2026", title: "How to Whisk a Flawless Bowl at Home", excerpt: "Water temperature, the W-motion, and the three mistakes everyone makes.", img: "photo-1515823064-d6e0c04616a7" },
    { cat: "Origin", date: "Apr 2026", title: "From Shade-Grown Leaf to Stone-Ground Powder", excerpt: "A quiet journey from the tea fields of Uji to the bowl in your hands.", img: "photo-1552693673-1bf958298935" },
  ];

  const faqs = [
    { q: "Is the matcha actually good?", a: "Genuinely, yes. We source first- and second-harvest ceremonial and premium grades, store them cold, and whisk to order. No dusty bulk powder, no shortcuts." },
    { q: "Can I come alone?", a: "Always. A huge part of our crowd comes solo — to read, to work, or to simply sit. There's a seat with your name on it, and no pressure to be anything but present." },
    { q: "Do I need experience to join events?", a: "Not at all. Our ceremonies, flows, and tastings are built for absolute beginners as much as regulars. Curiosity is the only requirement." },
    { q: "Can I bring my dog?", a: "Well-behaved dogs are welcome on our patio, and we keep a water bowl and treats behind the bar. Your good boy is a valued member of the community." },
    { q: "Do you have dairy-free options?", a: "Oat, almond, macadamia, and coconut are all on the house menu at no extra charge. Most of our signature drinks were designed dairy-free first." },
    { q: "Will I stay longer than planned?", a: "Statistically, yes. We've made peace with it. Free refills on filtered water, fast wifi, and outlets at every seat may be partly to blame." },
  ];

  /* -------------------- Render helpers -------------------- */
  const el = (html) => {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  };
  const mount = (sel, nodes) => {
    const host = document.querySelector(sel);
    if (!host) return;
    nodes.forEach((n) => host.appendChild(n));
  };

  /* Specials */
  mount(
    ".menu-list",
    specials.map((s, i) =>
      el(`
      <div class="menu-item" role="listitem" tabindex="0" data-cursor="VIEW">
        <span class="menu-item__idx">0${i + 1}</span>
        <span class="menu-item__name">${s.name}</span>
        <span class="menu-item__price">${s.price}</span>
        <p class="menu-item__desc">${s.desc}</p>
      </div>`)
    )
  );
  mount(
    ".specials__preview",
    specials.map((s) =>
      el(`
      <figure>
        <img src="${IMG(s.img, 900)}" alt="${s.name}" loading="lazy" />
        <figcaption><strong>${s.name}</strong><span>${s.price}</span></figcaption>
      </figure>`)
    )
  );

  /* Reviews */
  mount(
    ".reviews-list",
    reviews.map((r) =>
      el(`
      <article class="review" data-reveal>
        <h3 class="review__name">${r.name}</h3>
        <p class="review__quote fade-up">${r.quote}</p>
      </article>`)
    )
  );

  /* Team */
  mount(
    ".team__grid",
    team.map((m) =>
      el(`
      <figure class="member fade-up" data-stagger-item data-cursor="MEET">
        <div class="member__img img-mask">
          <img src="${IMG(m.img, 700)}" alt="${m.name}, ${m.role} at OCHA" loading="lazy" />
        </div>
        <figcaption class="member__meta">
          <span class="member__name">${m.name}</span>
          <span class="member__role">${m.role}</span>
        </figcaption>
      </figure>`)
    )
  );

  /* Merch */
  mount(
    ".merch .hscroll",
    merch.map((p) =>
      el(`
      <article class="product" data-cursor="VIEW">
        <div class="product__media">
          <img class="main" src="${IMG(p.main, 800)}" alt="${p.title}" loading="lazy" />
          <img class="alt" src="${IMG(p.alt, 800)}" alt="${p.title} alternate view" loading="lazy" />
        </div>
        <div class="product__meta">
          <h3 class="product__title">${p.title}</h3>
          <span class="product__buy ulink">Buy now @ $${p.price}</span>
        </div>
      </article>`)
    )
  );

  /* Events */
  mount(
    ".events",
    events.map((e) =>
      el(`
      <a class="event fade-up" href="#" data-stagger-item data-cursor="EXPLORE">
        <img src="${IMG(e.img, 900)}" alt="${e.title}" loading="lazy" />
        <div class="event__row">
          <div>
            <span class="event__cat">${e.cat}</span>
            <h3 class="event__title">${e.title}</h3>
          </div>
          <span class="event__arrow" aria-hidden="true">↗</span>
        </div>
      </a>`)
    )
  );

  /* Articles */
  mount(
    ".journal .hscroll",
    articles.map((a) =>
      el(`
      <article class="article" data-cursor="READ">
        <a href="journal.html" class="article__media img-mask">
          <img src="${IMG(a.img, 800)}" alt="${a.title}" loading="lazy" />
        </a>
        <div class="article__tags"><span>${a.cat}</span><span>${a.date}</span></div>
        <a href="journal.html" class="article__title">${a.title}</a>
        <p class="article__excerpt">${a.excerpt}</p>
        <a href="journal.html" class="article__more ulink">Read more →</a>
      </article>`)
    )
  );

  /* FAQ */
  mount(
    ".faq-list",
    faqs.map((f, i) =>
      el(`
      <div class="faq-item">
        <button class="faq-item__q" aria-expanded="false" aria-controls="faq-a-${i}">
          <span>${f.q}</span>
          <span class="faq-item__icon" aria-hidden="true"></span>
        </button>
        <div class="faq-item__a" id="faq-a-${i}" role="region">
          <div class="faq-item__a-inner">${f.a}</div>
        </div>
      </div>`)
    )
  );
})();
