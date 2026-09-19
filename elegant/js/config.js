/* ============================================================
   ELEGANT WEDDING — Central configuration (single source of truth)
   All content is original. Imagery uses free-to-use Unsplash photos.
   Music uses empty src placeholders (no copyrighted audio).
   Change these values to reuse the site for another couple.
   ============================================================ */
(function () {
  "use strict";
  const IMG = (id, w = 1000) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;
  window.IMG = IMG;

  window.weddingConfig = {
    couple: {
      firstPartner: { en: "Noor", ar: "نور" },
      secondPartner: { en: "Yusuf", ar: "يوسف" },
      monogram: "N · Y",
    },
    wedding: {
      date: "2027-05-22",
      time: "17:00",
      timezone: "+02:00",
      dateLabel: { en: "Saturday, the twenty-second of May, two thousand twenty-seven", ar: "السبت، الثاني والعشرون من مايو، عام ألفين وسبعة وعشرين" },
      dateShort: { en: "22 May 2027", ar: "٢٢ مايو ٢٠٢٧" },
    },
    venue: {
      name: { en: "Château des Oliviers", ar: "قصر الزيتون" },
      address: { en: "Chemin des Cyprès 4", ar: "طريق السرو ٤" },
      city: { en: "Aix-en-Provence, France", ar: "إكس أون بروفانس، فرنسا" },
      mapUrl: "https://www.google.com/maps/search/?api=1&query=43.5297,5.4474",
      image: "photo-1464366302246-5f9e75f77d3f",
    },
    schedule: [
      { key: "ceremony", time: "5:00 PM", timeAr: "٥:٠٠ مساءً", title: { en: "Ceremony", ar: "المراسم" }, place: { en: "The Cypress Terrace", ar: "شرفة السرو" }, desc: { en: "We exchange our vows as the afternoon light falls through the olive grove.", ar: "نتبادل عهودنا بينما يتسلل ضوء الأصيل من بين أشجار الزيتون." } },
      { key: "cocktails", time: "6:00 PM", timeAr: "٦:٠٠ مساءً", title: { en: "Cocktails", ar: "الكوكتيل" }, place: { en: "The Lower Garden", ar: "الحديقة السفلى" }, desc: { en: "Drinks, small bites, and slow conversation beneath the plane trees.", ar: "مشروبات وقضمات خفيفة وأحاديث هادئة تحت أشجار الدلب." } },
      { key: "dinner", time: "7:30 PM", timeAr: "٧:٣٠ مساءً", title: { en: "Dinner", ar: "العشاء" }, place: { en: "The Long Table", ar: "المائدة الطويلة" }, desc: { en: "A seated dinner at one long candlelit table under the open sky.", ar: "عشاء على مائدةٍ طويلة واحدة على ضوء الشموع تحت السماء المفتوحة." } },
      { key: "dancing", time: "9:30 PM", timeAr: "٩:٣٠ مساءً", title: { en: "Dancing", ar: "الرقص" }, place: { en: "The Courtyard", ar: "الفناء" }, desc: { en: "Music, dancing, and celebration until the very last song.", ar: "موسيقى ورقص واحتفال حتى آخر أغنية." } },
    ],
    story: {
      intro: { en: "Some stories begin loudly. Ours began with a quiet afternoon and a conversation neither of us wanted to end.", ar: "بعض القصص تبدأ بصخب. أما قصتنا فبدأت بأصيلٍ هادئ وحديثٍ لم يرغب أيٌّ منّا في أن ينتهي." },
      timeline: [
        { year: "2018", title: { en: "The Beginning", ar: "البداية" }, place: { en: "A bookshop café", ar: "مقهى مكتبة" }, desc: { en: "We reached for the same worn paperback and spent the next four hours forgetting the coffee going cold between us.", ar: "امتدّت يدانا إلى الكتاب القديم نفسه، وقضينا الساعات الأربع التالية ننسى القهوة تبرد بيننا." }, img: "photo-1521511897085-c4e5f8f43cf6" },
        { year: "2019", title: { en: "The First Adventure", ar: "أول مغامرة" }, place: { en: "The northern coast", ar: "الساحل الشمالي" }, desc: { en: "A missed ferry turned into three days of cliff paths, cold sea, and the certainty that we travelled well together.", ar: "تحوّلت عبّارةٌ فاتتنا إلى ثلاثة أيامٍ من دروب الجروف والبحر البارد ويقينٍ بأننا نُسافر معًا على خير ما يكون." }, img: "photo-1507525428034-b723cf961d3e" },
        { year: "2021", title: { en: "The Years Between", ar: "السنوات بينهما" }, place: { en: "A small kitchen", ar: "مطبخٌ صغير" }, desc: { en: "Ordinary days made extraordinary — burnt dinners, better ones, a home slowly built out of small kindnesses.", ar: "أيامٌ عادية صارت استثنائية — عشاءٌ محترق، وآخر أفضل، وبيتٌ يُبنى ببطءٍ من لطائف صغيرة." }, img: "photo-1494774157365-9e04c6720e47" },
        { year: "2026", title: { en: "The Question", ar: "السؤال" }, place: { en: "The olive grove", ar: "بستان الزيتون" }, desc: { en: "At golden hour, among the trees that will one day stand behind us, one question and one very easy answer.", ar: "في ساعة الغروب، بين الأشجار التي ستقف خلفنا يومًا ما، سؤالٌ واحد وجوابٌ سهلٌ جدًّا." }, img: "photo-1516589178581-6cd7833ae3b2" },
        { year: "2027", title: { en: "The Next Chapter", ar: "الفصل التالي" }, place: { en: "With all of you", ar: "بحضوركم جميعًا" }, desc: { en: "And now, with the people we love gathered in one place, the story turns to its most important page.", ar: "والآن، وقد اجتمع من نحب في مكانٍ واحد، تنتقل القصة إلى أهمّ صفحاتها." }, img: "photo-1519741497674-611481863552" },
      ],
    },
    gallery: [
      { id: "photo-1519225421980-715cb0215aed", ratio: "portrait" },
      { id: "photo-1511285560929-80b456fea0bc", ratio: "landscape" },
      { id: "photo-1465495976277-4387d4b0b4c6", ratio: "feature" },
      { id: "photo-1523438885200-e635ba2c371e", ratio: "portrait" },
      { id: "photo-1469371670807-013ccf25f16a", ratio: "landscape" },
      { id: "photo-1522673607200-164d1b6ce486", ratio: "portrait" },
      { id: "photo-1470124182917-cc6e71b22ecc", ratio: "landscape" },
      { id: "photo-1525258946800-98cfd641d0de", ratio: "portrait" },
      { id: "photo-1487530811176-3780de880c2d", ratio: "landscape" },
    ],
    dressCode: {
      title: { en: "Warm Formal", ar: "أناقة دافئة" },
      description: { en: "A garden evening in late spring. We invite you in soft, warm tones — think olive, terracotta, sand, and ivory. Elegant, but easy to move and dance in.", ar: "أمسيةٌ في الحديقة في أواخر الربيع. ندعوكم بألوانٍ دافئة هادئة — الزيتوني والطوبي والرملي والعاجي. أناقةٌ يسهل معها الحركة والرقص." },
      palette: [
        { name: { en: "Ivory", ar: "عاجي" }, hex: "#efe6d6" },
        { name: { en: "Sand", ar: "رملي" }, hex: "#cbb696" },
        { name: { en: "Olive", ar: "زيتوني" }, hex: "#55603f" },
        { name: { en: "Terracotta", ar: "طوبي" }, hex: "#b06a4a" },
        { name: { en: "Charcoal", ar: "فحمي" }, hex: "#23201b" },
      ],
    },
    faq: [
      { q: { en: "When should I arrive?", ar: "متى ينبغي أن أصل؟" }, a: { en: "Please arrive by 4:30 PM so we can begin the ceremony together at 5:00 PM sharp.", ar: "يرجى الوصول بحلول الساعة ٤:٣٠ مساءً لنبدأ المراسم معًا في تمام الساعة ٥:٠٠ مساءً." } },
      { q: { en: "Can I bring a guest?", ar: "هل يمكنني إحضار مرافق؟" }, a: { en: "Your invitation lists the seats reserved in your name. If you'd like to bring someone, please note it in your RSVP.", ar: "توضح دعوتكم المقاعد المحجوزة باسمكم. إن رغبتم بإحضار مرافق، فيرجى ذكر ذلك عند تأكيد الحضور." } },
      { q: { en: "Is the celebration outdoors?", ar: "هل الاحتفال في الهواء الطلق؟" }, a: { en: "Yes — the ceremony and dinner are outdoors on grass and gravel, so choose your footwear kindly. Wraps are wise once the sun sets.", ar: "نعم — المراسم والعشاء في الهواء الطلق على العشب والحصى، فاختاروا أحذيتكم بعناية. ويُستحسن اصطحاب ما يقيكم البرد بعد الغروب." } },
      { q: { en: "Are children welcome?", ar: "هل الأطفال مرحّب بهم؟" }, a: { en: "We adore them, but we've planned an adults-only evening so every parent can dance freely. Thank you for understanding.", ar: "نحبهم كثيرًا، لكننا خططنا لأمسيةٍ للكبار فقط كي يرقص كل والدٍ بحرية. شكرًا لتفهمكم." } },
      { q: { en: "Where should I stay?", ar: "أين أقيم؟" }, a: { en: "We've gathered a short list of nearby places we love; you'll find it in your invitation envelope and on request by email.", ar: "أعددنا قائمةً قصيرة بأماكن قريبة نحبها؛ ستجدونها في مظروف الدعوة وعند الطلب عبر البريد الإلكتروني." } },
      { q: { en: "May I take photos?", ar: "هل يمكنني التقاط الصور؟" }, a: { en: "During the ceremony we ask for an unplugged moment. Afterwards, please photograph everything and share it with us.", ar: "خلال المراسم نرجو لحظةً بلا هواتف. وبعدها، صوّروا كل شيء وشاركونا إياه." } },
    ],
    music: {
      // Empty src placeholders — no copyrighted audio. Add your own licensed files.
      tracks: [
        { title: { en: "Provence, Slowly", ar: "بروفانس، على مهل" }, artist: { en: "House Selection", ar: "اختيار الليلة" }, src: "" },
        { title: { en: "The Last Song", ar: "الأغنية الأخيرة" }, artist: { en: "House Selection", ar: "اختيار الليلة" }, src: "" },
      ],
    },
    contact: { email: "hello@noorandyusuf.wedding", phone: "+33 4 00 00 00 00" },
    social: { instagram: "#", hashtag: "#NoorAndYusuf" },
  };

  /* ---- i18n UI strings ---- */
  window.i18n = {
    en: {
      dir: "ltr", lang: "en", langLabel: "EN", altLang: "العربية",
      nav: { story: "Our Story", wedding: "The Wedding", gallery: "Gallery", faq: "FAQ", rsvp: "RSVP", home: "Home" },
      home: {
        heroInvite: "Together with their families",
        scrollHint: "Scroll",
        countdownLabel: "Until we say I do",
        cd: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
        past: "Married, and grateful — thank you for celebrating with us.",
        inviteKicker: "The Invitation",
        invite: "With grateful hearts and no small amount of joy, we invite our favourite people to gather where our next chapter begins.",
        storyKicker: "How we met", storyTitle: "Our Story", storyCta: "Read our story",
        dressKicker: "What to wear",
        venueKicker: "The Setting", venueTitle: "The Venue", directions: "Get Directions",
        rsvpCta: "RSVP",
      },
      story: { kicker: "Our Story", title: "The Long Way to Here" },
      wedding: { kicker: "The Day", title: "The Wedding", scheduleKicker: "The Order of the Evening" },
      gallery: { kicker: "Moments", title: "Gallery", lede: "A few of the frames we've collected on the way here." },
      faq: { kicker: "Details", title: "Good to Know" },
      rsvp: {
        kicker: "Kindly reply", title: "Will You Join Us?", note: "We hope to hear from you by the first of April, 2027.",
        name: "Full Name", email: "Email", attending: "Will you attend?", yes: "Joyfully accepts", no: "Regretfully declines",
        guests: "Number of Guests", diet: "Dietary Requirements", song: "A song to dance to (optional)", message: "A note for us",
        submit: "Send RSVP", sending: "Sending…",
        errName: "Please tell us your name.", errEmail: "Please enter a valid email.", errAttend: "Please let us know if you can come.",
      },
      confirm: { title: "We'll See You There.", sub: "Your reply is in, and we couldn't be happier. Thank you for celebrating with us.", home: "Back Home" },
      nf: { title: "This page wandered off.", sub: "Let's walk you back to the beginning.", cta: "Back Home" },
      player: { now: "Now Playing" },
      footer: { made: "With love", invite: "You're invited" },
    },
    ar: {
      dir: "rtl", lang: "ar", langLabel: "ع", altLang: "EN",
      nav: { story: "قصتنا", wedding: "يوم الزفاف", gallery: "المعرض", faq: "الأسئلة", rsvp: "تأكيد الحضور", home: "الرئيسية" },
      home: {
        heroInvite: "بمشاركة عائلتيهما",
        scrollHint: "اسحب للأسفل",
        countdownLabel: "حتى نقول نعم",
        cd: { days: "يوم", hours: "ساعة", minutes: "دقيقة", seconds: "ثانية" },
        past: "تزوّجنا، وامتلأت قلوبنا امتنانًا — شكرًا لمشاركتنا الفرح.",
        inviteKicker: "الدعوة",
        invite: "بقلوبٍ مفعمة بالامتنان وفرحٍ لا يُخفى، ندعو أعزّ الناس إلينا للاجتماع حيث يبدأ فصلنا التالي.",
        storyKicker: "كيف التقينا", storyTitle: "قصتنا", storyCta: "اقرأ قصتنا",
        dressKicker: "قواعد اللباس",
        venueKicker: "المكان", venueTitle: "القاعة", directions: "الاتجاهات",
        rsvpCta: "تأكيد الحضور",
      },
      story: { kicker: "قصتنا", title: "الطريق الطويل إلى هنا" },
      wedding: { kicker: "اليوم", title: "يوم الزفاف", scheduleKicker: "ترتيب الأمسية" },
      gallery: { kicker: "لحظات", title: "المعرض", lede: "بعضٌ من الصور التي جمعناها في طريقنا إلى هنا." },
      faq: { kicker: "تفاصيل", title: "معلومات مفيدة" },
      rsvp: {
        kicker: "نرجو الرد", title: "هل تشاركوننا؟", note: "نأمل أن نسمع منكم قبل الأول من أبريل ٢٠٢٧.",
        name: "الاسم الكامل", email: "البريد الإلكتروني", attending: "هل ستحضرون؟", yes: "سأحضر بكل سرور", no: "أعتذر عن الحضور",
        guests: "عدد الضيوف", diet: "متطلبات غذائية", song: "أغنية نرقص عليها (اختياري)", message: "كلمة لنا",
        submit: "إرسال التأكيد", sending: "جارٍ الإرسال…",
        errName: "الرجاء كتابة اسمكم.", errEmail: "الرجاء إدخال بريد إلكتروني صحيح.", errAttend: "الرجاء إعلامنا بإمكانية حضوركم.",
      },
      confirm: { title: "نراكم هناك.", sub: "وصلنا ردّكم، ولا يسعنا وصف سعادتنا. شكرًا لمشاركتنا الاحتفال.", home: "العودة للرئيسية" },
      nf: { title: "هذه الصفحة تاهت قليلًا.", sub: "لنُعِدكم إلى البداية.", cta: "العودة للرئيسية" },
      player: { now: "يُعزف الآن" },
      footer: { made: "بكل حب", invite: "أنتم مدعوون" },
    },
  };
})();
