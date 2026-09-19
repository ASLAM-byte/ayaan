/* ============================================================
   WEDDING — Central configuration (single source of truth)
   All content is original. Imagery uses free-to-use Unsplash photos.
   Change these values to reuse the site for another couple.
   ============================================================ */
(function () {
  "use strict";
  const IMG = (id, w = 1000) => `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

  window.IMG = IMG;

  window.weddingConfig = {
    couple: {
      partnerOne: { en: "Layla", ar: "ليلى" },
      partnerTwo: { en: "Adam", ar: "آدم" },
      monogram: "L & A",
    },

    wedding: {
      // Configurable date/time drives the live countdown.
      date: "2026-10-17",
      time: "16:30",
      timezone: "+03:00",
      dateLabel: { en: "Saturday, 17 October 2026", ar: "السبت، ١٧ أكتوبر ٢٠٢٦" },
    },

    venue: {
      name: { en: "Villa Selene", ar: "فيلا سيلينِه" },
      address: { en: "Old Coast Road, Bay of Almonds", ar: "طريق الساحل القديم، خليج اللوز" },
      city: { en: "Sidon, Lebanon", ar: "صيدا، لبنان" },
      mapUrl: "https://www.google.com/maps/search/?api=1&query=33.5606,35.3758",
      image: "photo-1519225421980-715cb0215aed",
    },

    schedule: [
      { key: "arrival", time: "4:00 PM", timeAr: "٤:٠٠ مساءً", title: { en: "Arrival", ar: "الوصول" }, desc: { en: "Welcome drinks in the olive garden.", ar: "مشروبات الترحيب في حديقة الزيتون." } },
      { key: "ceremony", time: "4:30 PM", timeAr: "٤:٣٠ مساءً", title: { en: "Ceremony", ar: "المراسم" }, desc: { en: "Vows beneath the cypress arch.", ar: "تبادل العهود تحت قوس السرو." } },
      { key: "dinner", time: "6:00 PM", timeAr: "٦:٠٠ مساءً", title: { en: "Dinner", ar: "العشاء" }, desc: { en: "A long table under the evening sky.", ar: "مائدة طويلة تحت سماء المساء." } },
      { key: "dancing", time: "8:00 PM", timeAr: "٨:٠٠ مساءً", title: { en: "Dancing", ar: "الرقص" }, desc: { en: "Music and celebration until late.", ar: "الموسيقى والاحتفال حتى وقت متأخر." } },
    ],

    dressCode: {
      title: { en: "Garden Formal", ar: "أناقة الحديقة" },
      description: {
        en: "We invite you to dress in soft, earthy tones — think warm neutrals, sage, and dusty rose. Comfortable elegance for a garden evening.",
        ar: "ندعوكم لارتداء ألوان ترابية هادئة — درجات محايدة دافئة، وأخضر المريمية، والوردي الباهت. أناقة مريحة لأمسية في الحديقة.",
      },
      swatches: [
        { name: { en: "Ivory", ar: "عاجي" }, hex: "#efe7da" },
        { name: { en: "Sage", ar: "مريمية" }, hex: "#7d8a6f" },
        { name: { en: "Sepia", ar: "بني" }, hex: "#8a6d52" },
        { name: { en: "Dusty Rose", ar: "وردي باهت" }, hex: "#c39a95" },
        { name: { en: "Charcoal", ar: "فحمي" }, hex: "#2a2420" },
      ],
    },

    story: {
      intro: {
        en: "It began with a wrong train and a shared umbrella. Everything after felt like the right direction.",
        ar: "بدأت القصة بقطارٍ خاطئ ومظلةٍ نتشاركها. وكل ما تلا ذلك بدا وكأنه الاتجاه الصحيح.",
      },
      timeline: [
        { year: "2019", title: { en: "The First Hello", ar: "أول لقاء" }, desc: { en: "A rained-out platform in the old city, one umbrella between two strangers, and a conversation that missed three trains.", ar: "رصيفٌ غمره المطر في المدينة القديمة، ومظلةٌ واحدة بين غريبين، وحديثٌ أضاع ثلاثة قطارات." }, img: "photo-1522673607200-164d1b6ce486" },
        { year: "2020", title: { en: "The First Adventure", ar: "أول مغامرة" }, desc: { en: "A spontaneous drive to the coast that turned into a week of small towns, long dinners, and no plans at all.", ar: "رحلةٌ عفوية إلى الساحل تحوّلت إلى أسبوعٍ من البلدات الصغيرة والعشاء الطويل وبلا أي خطط." }, img: "photo-1503516459261-40c66117780a" },
        { year: "2022", title: { en: "A New Chapter", ar: "فصلٌ جديد" }, desc: { en: "A small apartment with a stubborn window and a lemon tree on the balcony. The first place that felt like ours.", ar: "شقةٌ صغيرة بنافذةٍ عنيدة وشجرة ليمون على الشرفة. أول مكانٍ شعرنا أنه لنا." }, img: "photo-1494774157365-9e04c6720e47" },
        { year: "2025", title: { en: "The Question", ar: "السؤال" }, desc: { en: "Back on that same coast, at golden hour, with a ring hidden badly in a coat pocket. The answer was never in doubt.", ar: "عدنا إلى ذلك الساحل نفسه، في ساعة الغروب، وخاتمٌ مخبأٌ بإهمال في جيب معطف. لم يكن الجواب موضع شك." }, img: "photo-1516589178581-6cd7833ae3b2" },
        { year: "2026", title: { en: "The Beginning", ar: "البداية" }, desc: { en: "And now, with the people we love most, we begin the rest of it together.", ar: "والآن، مع أحب الناس إلينا، نبدأ بقية العمر معًا." }, img: "photo-1519741497674-611481863552" },
      ],
    },

    gallery: [
      { id: "photo-1465495976277-4387d4b0b4c6", ratio: "portrait" },
      { id: "photo-1511285560929-80b456fea0bc", ratio: "landscape" },
      { id: "photo-1523438885200-e635ba2c371e", ratio: "portrait" },
      { id: "photo-1519741497674-611481863552", ratio: "feature" },
      { id: "photo-1525258946800-98cfd641d0de", ratio: "portrait" },
      { id: "photo-1469371670807-013ccf25f16a", ratio: "landscape" },
      { id: "photo-1522673607200-164d1b6ce486", ratio: "portrait" },
      { id: "photo-1470124182917-cc6e71b22ecc", ratio: "landscape" },
    ],

    faq: [
      { q: { en: "Can I bring a guest?", ar: "هل يمكنني إحضار مرافق؟" }, a: { en: "Your invitation will note the number of seats reserved in your name. If you'd like to bring someone, just mention it in your RSVP and we'll do our best.", ar: "ستوضح دعوتكم عدد المقاعد المحجوزة باسمكم. إذا رغبتم بإحضار مرافق، اذكروا ذلك في تأكيد الحضور وسنبذل جهدنا." } },
      { q: { en: "What should I wear?", ar: "ماذا ألبس؟" }, a: { en: "Garden formal in soft, earthy tones. The ceremony is outdoors on grass, so choose your footwear kindly.", ar: "أناقة الحديقة بألوان ترابية هادئة. المراسم في الهواء الطلق على العشب، فاختاروا أحذيتكم بعناية." } },
      { q: { en: "Is there parking?", ar: "هل يتوفر موقف سيارات؟" }, a: { en: "Yes — complimentary valet is available at the villa gate from 3:30 PM.", ar: "نعم — تتوفر خدمة صف السيارات المجانية عند بوابة الفيلا من الساعة ٣:٣٠ مساءً." } },
      { q: { en: "Are children welcome?", ar: "هل الأطفال مرحّب بهم؟" }, a: { en: "We love your little ones, but this evening we've planned an adults-only celebration. Thank you for understanding.", ar: "نحب صغاركم، لكننا خططنا لأمسيةٍ للكبار فقط. شكرًا لتفهمكم." } },
      { q: { en: "What time should I arrive?", ar: "متى ينبغي أن أصل؟" }, a: { en: "Please arrive by 4:00 PM for welcome drinks. The ceremony begins promptly at 4:30 PM.", ar: "يرجى الوصول بحلول الساعة ٤:٠٠ مساءً لمشروبات الترحيب. تبدأ المراسم في تمام الساعة ٤:٣٠ مساءً." } },
      { q: { en: "Can I share photos?", ar: "هل يمكنني مشاركة الصور؟" }, a: { en: "During the ceremony, we ask for a phones-away moment. Afterwards, please share freely with our hashtag #LaylaAndAdam.", ar: "خلال المراسم، نرجو لحظةً بلا هواتف. بعد ذلك، شاركوا الصور بحرية مع وسمنا #ليلى_وآدم." } },
    ],

    contact: {
      email: "hello@laylaandadam.love",
      phone: "+961 3 000 000",
    },

    music: {
      // Silent placeholder tones so playback works with no external/copyrighted audio.
      // Replace `src` with your own licensed audio files.
      tracks: [
        { title: { en: "Golden Hour", ar: "ساعة الغروب" }, artist: { en: "Ambient Set", ar: "مجموعة هادئة" }, src: "" },
        { title: { en: "The First Dance", ar: "الرقصة الأولى" }, artist: { en: "Ambient Set", ar: "مجموعة هادئة" }, src: "" },
      ],
    },

    social: {
      instagram: "#",
      hashtag: "#LaylaAndAdam",
    },
  };

  /* ---- i18n UI strings ---- */
  window.i18n = {
    en: {
      dir: "ltr", lang: "en", langLabel: "EN", altLang: "AR", altHref: "ar/",
      nav: { story: "Our Story", day: "Wedding Day", gallery: "Gallery", faq: "FAQ", rsvp: "RSVP" },
      home: {
        heroInvite: "Together with their families",
        countdownLabel: "Counting the days",
        cd: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
        past: "Today, and always.",
        welcomeKicker: "The Invitation",
        welcome: "Two lives, one beautiful beginning. We would love to celebrate this moment with the people who mean the most to us.",
        storyKicker: "How it started",
        storyCta: "Our Story",
        scheduleKicker: "The Evening",
        scheduleTitle: "Wedding Day",
        venueKicker: "Where",
        venueTitle: "The Venue",
        directions: "Get Directions",
        dressKicker: "What to wear",
        galleryKicker: "Moments",
        galleryTitle: "Gallery",
        faqTitle: "Good to Know",
        rsvpCta: "RSVP",
        scrollHint: "Scroll",
      },
      story: { kicker: "Our Story", title: "The Long Way Here", back: "Home" },
      rsvp: {
        kicker: "Join us", title: "Kindly Respond", note: "Please reply by 1 September 2026.",
        name: "Full Name", email: "Email", attending: "Will you attend?",
        yes: "Joyfully accepts", no: "Regretfully declines",
        guests: "Number of Guests", diet: "Dietary Requirements", message: "A note for us", song: "Song Request (optional)",
        submit: "Send RSVP", sending: "Sending…",
        errName: "Please tell us your name.", errEmail: "Please enter a valid email.", errAttend: "Please let us know if you can come.",
      },
      youreIn: { title: "We'll See You There.", sub: "Your RSVP is in. Thank you for celebrating with us.", home: "Back Home", cal: "Add to Calendar" },
      nf: { title: "This Page Took a Wrong Turn.", sub: "Let's find your way back.", cta: "Back Home" },
      player: { now: "Now Playing" },
      footer: { made: "With love", rights: "All rights reserved." },
    },
    ar: {
      dir: "rtl", lang: "ar", langLabel: "ع", altLang: "EN", altHref: "../",
      nav: { story: "قصتنا", day: "يوم الزفاف", gallery: "المعرض", faq: "الأسئلة", rsvp: "تأكيد الحضور" },
      home: {
        heroInvite: "بمشاركة عائلتيهما",
        countdownLabel: "نعدّ الأيام",
        cd: { days: "يوم", hours: "ساعة", minutes: "دقيقة", seconds: "ثانية" },
        past: "اليوم، وإلى الأبد.",
        welcomeKicker: "الدعوة",
        welcome: "حياتان، وبدايةٌ واحدة جميلة. يسعدنا أن نحتفل بهذه اللحظة مع أعزّ الناس إلى قلوبنا.",
        storyKicker: "كيف بدأت",
        storyCta: "قصتنا",
        scheduleKicker: "الأمسية",
        scheduleTitle: "يوم الزفاف",
        venueKicker: "المكان",
        venueTitle: "القاعة",
        directions: "الاتجاهات",
        dressKicker: "قواعد اللباس",
        galleryKicker: "لحظات",
        galleryTitle: "المعرض",
        faqTitle: "معلومات مفيدة",
        rsvpCta: "تأكيد الحضور",
        scrollHint: "اسحب للأسفل",
      },
      story: { kicker: "قصتنا", title: "الطريق الطويل إلى هنا", back: "الرئيسية" },
      rsvp: {
        kicker: "شاركونا", title: "نرجو تأكيد الحضور", note: "يرجى الرد قبل ١ سبتمبر ٢٠٢٦.",
        name: "الاسم الكامل", email: "البريد الإلكتروني", attending: "هل ستحضرون؟",
        yes: "سأحضر بكل سرور", no: "أعتذر عن الحضور",
        guests: "عدد الضيوف", diet: "متطلبات غذائية", message: "كلمة لنا", song: "طلب أغنية (اختياري)",
        submit: "إرسال التأكيد", sending: "جارٍ الإرسال…",
        errName: "الرجاء كتابة اسمكم.", errEmail: "الرجاء إدخال بريد إلكتروني صحيح.", errAttend: "الرجاء إعلامنا بإمكانية حضوركم.",
      },
      youreIn: { title: "نراكم هناك.", sub: "تم استلام تأكيدكم. شكرًا لمشاركتنا الاحتفال.", home: "العودة للرئيسية", cal: "أضف إلى التقويم" },
      nf: { title: "هذه الصفحة سلكت المنعطف الخاطئ.", sub: "لنُعِدك إلى الطريق.", cta: "العودة للرئيسية" },
      player: { now: "يُعزف الآن" },
      footer: { made: "بكل حب", rights: "جميع الحقوق محفوظة." },
    },
  };
})();
