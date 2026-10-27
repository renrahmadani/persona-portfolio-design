# Persona-Style Portfolio — Rendi Rahmadani

A Persona 5 menu-inspired portfolio with modular architecture, interactive animated cursors, and stylish visual effects.

## Structure

```
├── index.html            View skeleton & HUD structure
├── css/
│   ├── style.css         Main stylesheet entry
│   └── modules/          Modular stylesheets
│       ├── base.css      Variables, reset, typography base
│       ├── bg.css        Persona stripes, halftone, spinning stars
│       ├── shell.css     HUD tags, control keys legend, clock
│       ├── screens.css   Screen layouts and interactive menus
│       ├── typography.css Ransom-note cutout lettering & jitter
│       ├── projects.css  Angular project cards & badges
│       ├── skills.css    Skewed skill meter bars
│       ├── about_contact.css Polaroid photo, paper notes, form
│       └── effects.css   Screen wipe transitions & animated cursor
├── js/
│   ├── app.js            Application entry point (ES Modules)
│   └── modules/
│       ├── model.js      Data: featured works, graphic designs, skills
│       ├── cursor.js     Persona 5 interactive animated 30-frame cursor
│       ├── audio.js      Sound effects (SFX) & unlock handling
│       ├── visuals.js    Ransom typography, low-overhead parallax, clock
│       ├── transitions.js Persona 5 slash screen wipe
│       ├── screens.js    Card, screen, and skill DOM rendering
│       ├── contact.js    Form submit relay & mailto fallback
│       └── router.js     Routing, keyboard controls, popstate
└── assets/
    ├── icon/             Web favicon & touch icon (icon.png)
    ├── sfx/select.mp3    Menu sound effect (select / confirm)
    ├── cursors/          Animated cursor sprite strips (normal.png, link.png)
    ├── menus/            Screen backgrounds (home, skills, about, contact)
    ├── menus-mobile/     Optimized WebP backgrounds for mobile devices
    ├── me.jpg            About section photo
    └── projects/         Custom project thumbnails
```

## Editing content

- Edit portfolio data, skills, and projects in **js/modules/model.js**.
- Update bio and links in **index.html**.
- Persona colors and CSS variables are configured in **css/modules/base.css**.

## Run locally

```bash
python -m http.server 8000
# or
npx serve .
```

Open http://localhost:8000 in your browser.

## Deploy

Push to GitHub and enable GitHub Pages (**Settings** → **Pages** → Deploy from branch `main` → `/` root).
