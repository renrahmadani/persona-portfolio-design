# Persona 5 Portfolio — Rendi Rahmadani

Web portofolio interaktif terinspirasi UI/UX game **Persona 5** (Phantom Thieves), dibangun dengan arsitektur modular ES Modules, animasi kursor kustom 30-frame, efek suara dinamis, dan palet warna visual merah-hitam-putih yang tajam.

---

## Fitur Utama

- **Estetika Khas Persona 5:** Tipografi cutout *ransom-note* dengan jitter acak deterministik, layout bersudut tajam (*skewed* & *clip-path*), background halftone, garis dinamis, dan bintang berputar.
- **Kursor Interaktif 30-Frame:** Diambil langsung dari format *.ani Persona 5 (`assets/cursors/normal.png` dan `link.png`) dengan frame rate 20 FPS (50ms), deteksi hover instan pada seluruh elemen interaktif, serta fallback aman pada perangkat layar sentuh.
- **Transisi Layar Slash Wipe:** Efek transisi multi-layer tiga warna (merah, hitam, putih) yang menyapu layar dengan akselerasi GPU (`translate3d`).
- **Audio Feedback SFX:** Efek suara navigasi menu (`assets/sfx/select.mp3`) dengan mekanisme unlock otomatis sesuai standar autoplay browser modern.
- **Arsitektur Modular (Max < 1000 Baris):** Setiap file kode JavaScript dan CSS dipisah menjadi modul tunggal berorientasi fungsi, ringan, dan bebas dari redundansi.
- **Routing Aman (Hash & History):** Navigasi mulus berbasis hash (`#projects`, `#skills`, `#about`, `#contact`) yang bebas dari error 404 saat di-deploy ke GitHub Pages atau subdirektori.
- **Form Kontak Pintar:** Form asinkron dengan proteksi honeypot anti-spam (`_honey`) via relay API dan fallback instan ke aplikasi email lokal (`mailto:`).
- **Optimasi Performa & Aset:** Parallax background otomatis berhenti saat mouse diam, gambar latar responsif menggunakan WebP di layar mobile, serta favicon PNG 512x512.

---

## Struktur Folder Project

```
c:\Users\Rene\Documents\SEO\
├── index.html                  # Struktur markup utama, HUD & container screen
├── README.md                   # Dokumentasi teknis project
│
├── css/
│   ├── style.css               # Entry stylesheet pengimpor modul CSS
│   └── modules/                # Modul CSS terpisah
│       ├── base.css            # Variabel palet warna, typography reset
│       ├── bg.css              # Layer animasi background (stripes, halftone, stars)
│       ├── shell.css           # HUD status bar atas & bawah, jam digital
│       ├── screens.css         # Layout screen utama & sub-screen
│       ├── typography.css      # Ransom-note letter styling & jitter
│       ├── projects.css        # Grid kartu portofolio & styling badge
│       ├── skills.css          # Meteran progress bar keahlian bergaya Persona
│       ├── about_contact.css   # Layout polaroid foto, paper notes, form kontak
│       ├── effects.css         # Transisi wipe & styling kursor kustom
│       └── mobile.css          # Optimasi layout, touch hitbox & breakpoint mobile
│
├── js/
│   ├── app.js                  # Entry point aplikasi (ES Modules bootstrap)
│   └── modules/                # Modul logika JavaScript (Single Responsibility)
│       ├── model.js            # Store data karya, keahlian, dan state aplikasi
│       ├── cursor.js           # Engine pelacak & animator sprite kursor Persona 5
│       ├── audio.js            # Pengelola audio SFX & gesture unlocker
│       ├── visuals.js          # Generator tipografi ransom, parallax loop, jam HUD
│       ├── transitions.js      # Handler animasi screen wipe 3-pane slash
│       ├── screens.js          # Renderer DOM kartu karya & bar keahlian
│       ├── contact.js          # Pengelola submit form & relay email
│       └── router.js           # Sistem navigasi, keyboard listener, & popstate
│
└── assets/
    ├── icon/                   # Favicon & icon web (icon.png 512x512)
    ├── cursors/                # Sprite strip kursor (normal.png, link.png)
    ├── menus/                  # Background resolusi penuh WebP (home, skills, about, contact)
    ├── menus-mobile/           # Background WebP teroptimasi untuk perangkat mobile
    ├── sfx/                    # Efek suara navigasi (select.mp3)
    └── me.webp                 # Foto profil polaroid WebP (dengan fallback me.jpg)
```

---

## Kontrol Navigasi

| Tombol / Aksi | Fungsi |
| :--- | :--- |
| **`↑` / `↓` (Arrow Keys)** | Memilih item menu utama pada layar Home |
| **`Enter`** | Mengonfirmasi & membuka halaman yang dipilih |
| **`Esc`** | Kembali ke layar Home (*Back*) |
| **Klik Nama Header** | Pintasan cepat kembali ke layar Home |
| **Klik Menu / Tombol** | Navigasi mouse dengan suara dan animasi kursor gloved hand |

---


## Menjalankan Secara Lokal

Karena project menggunakan standar **ES Modules (`import`/`export`)**, browser modern memerlukan web server lokal (protokol `http://`) untuk memuat modul JavaScript tanpa terblokir kebijakan keamanan CORS lokal (`file://`).

Jalankan perintah berikut di terminal:

```powershell
# Menggunakan Python bawaan:
python -m http.server 8000

# Atau menggunakan Node.js / npx:
npx serve .
```

Buka URL di browser:
```
http://localhost:8000
```

---

## Deployment (GitHub Pages)

1. Push seluruh folder project ke repository GitHub Anda.
2. Buka repository di GitHub: **Settings** → **Pages**.
3. Di bagian **Build and deployment** > **Branch**, pilih branch `main` (atau `master`) dan folder `/ (root)`.
4. Klik **Save**. Website portofolio akan langsung online secara otomatis.
