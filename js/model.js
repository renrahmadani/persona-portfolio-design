/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured works, graphic design projects.
   ===================================================================== */

const Model = {
  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "ren.rahmadani@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",
    menuIndex: 0,
    projectsLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured works (hand-written) ----
  featured: [
    {
      title: "Brand Identity — UMKM Coffee House",
      tag: "BRANDING",
      color: "#e60012",
      live: false,
      url: "#",
      cta: "PREVIEW",
      img: "assets/projects/branding-coffee.png",
      desc: "Desain identitas visual lengkap meliputi logo, warna brand, tipografi, dan penerapan pada kemasan untuk kebutuhan bisnis UMKM.",
    },
    {
      title: "Social Media Campaign Kit",
      tag: "SOCIAL MEDIA",
      color: "#3dff6e",
      live: false,
      url: "#",
      cta: "VIEW DESIGN",
      img: "assets/projects/feed-ig-1.png",
      desc: "Kumpulan desain feed IG, carousel, dan story dengan konsistensi visual untuk meningkatkan engagement brand.",
    },
    {
      title: "Event Merch — Jersey Design",
      tag: "MERCHANDISE",
      color: "#f1e05a",
      live: false,
      url: "#",
      cta: "PREVIEW",
      img: "assets/projects/jersey-design.png",
      desc: "Desain jersey custom dengan konsep bold, penempatan logo strategis, serta siap untuk produksi sablon/print.",
    },
    {
      title: "Corporate Poster & Banner Set",
      tag: "PRINT",
      color: "#3178c6",
      live: false,
      url: "#",
      cta: "VIEW DESIGN",
      img: "assets/projects/banner-1.png",
      desc: "Koleksi desain banner 16:9, poster 9:16, dan materi promosi untuk kebutuhan iklan digital maupun cetak.",
    },
  ],

  // ---- Graphic Design Projects (static portfolio) ----
  graphicProjects: [
    {
      name: "brand-identity-startup",
      title: "Logo & Visual Brand — Startup Tech",
      tag: "BRANDING",
      url: "#",
      img: "assets/projects/logo-brand-1.png",
      description: "Pembuatan logo minimalis, brand guideline, serta penerapan visual identity untuk startup teknologi.",
    },
    {
      name: "social-feed-fashion",
      title: "Fashion Feed IG (1:1)",
      tag: "SOCIAL MEDIA",
      url: "#",
      img: "assets/projects/feed-ig-2.png",
      description: "Desain feed instagram dengan komposisi bersih, tipografi kekinian, dan fokus pada produk fashion.",
    },
    {
      name: "promo-banner-sale",
      title: "Promo Banner 16:9",
      tag: "PRINT",
      url: "#",
      img: "assets/projects/banner-2.png",
      description: "Banner promosi penjualan untuk web & digital display dengan penekanan call-to-action yang kuat.",
    },
    {
      name: "poster-event",
      title: "Event Poster 9:16",
      tag: "PRINT",
      url: "#",
      img: "assets/projects/poster-9x16.png",
      description: "Desain poster vertikal untuk promosi event, konser, atau kegiatan komunitas siap cetak & share.",
    },
    {
      name: "id-card-lanyard",
      title: "ID Card & Lanyard Design",
      tag: "PRINT",
      url: "#",
      img: "assets/projects/idcard-lanyard.png",
      description: "Desain kartu identitas, lanyard, dan aksesoris identitas perusahaan dengan layout fungsional & profesional.",
    },
    {
      name: "jersey-sport",
      title: "Jersey Design — Sport Team",
      tag: "MERCHANDISE",
      url: "#",
      img: "assets/projects/jersey-design-2.png",
      description: "Desain jersey tim olahraga custom, meliputi nomor punggung, nama, sponsor, dan warna tim.",
    },
    {
      name: "carousel-content",
      title: "Carousel Content Design",
      tag: "SOCIAL MEDIA",
      url: "#",
      img: "assets/projects/carousel-ig.png",
      description: "Desain carousel edukatif/marketing untuk meningkatkan reach dan storytelling brand di Instagram.",
    },
    {
      name: "marketing-kit-brand",
      title: "Marketing Kit — Banner, Poster, Pamflet",
      tag: "PRINT",
      url: "#",
      img: "assets/projects/marketing-kit.png",
      description: "Paket desain promosi lengkap (banner, poster, pamflet) dengan visual konsisten untuk kebutuhan kampanye.",
    },
  ],

  // Optional thumbnail overrides
  projectImages: {},
};
