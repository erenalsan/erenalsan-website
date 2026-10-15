# erenalsan.com — Personal Portfolio & Engineering Showcase

[![Site Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)](https://erenalsan.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

Personal portfolio and interactive engineering showcase of **Eren Alsan** — M.Sc. Artificial Intelligence Engineering student at the University of Passau and Full-Stack Developer.

Built with an emphasis on **zero-framework bloat**, **local-first architectures**, **tailored micro-interactions**, and an editorial **Swiss-minimalist aesthetic**.

---

## 🎨 Editorial Color Palettes

Designed to strictly eliminate "AI Slop" visual tropes (oversaturated neon gradients, heavy glassmorphism, or generic dark modes) in favor of custom-curated, warm, and sophisticated color schemes.

### ☀️ Light Theme: *Golden Summer Fields*
- **Background (`Cornsilk`):** `#fefae0`
- **Cards / Containers (`Papaya Whip`):** `#faedcd`
- **Borders (`Beige`):** `#e9edc9`
- **Primary Accent (`Light Bronze`):** `#d4a373`
- **Subtle Accent (`Dry Sage`):** `#ccd5ae`
- **Typography:** `#2b2b2b` (Slate Charcoal)

### 🌙 Dark Theme: *Space Indigo & Lilac Ash* (Default)
- **Background (`Space Indigo`):** `#22223b`
- **Cards / Containers (`Dusty Grape`):** `#4a4e69`
- **Borders (`Lilac Ash`):** `#9a8c98`
- **Primary Accent (`Almond Silk`):** `#c9ada7`
- **Typography (`Seashell`):** `#f2e9e4`

---

## ✨ Features & Engineering Highlights

- **⚡ Zero-Framework Performance:** Built using pure HTML5, CSS custom properties, Tailwind CSS (via CDN), and Vanilla JavaScript for instant page loads and zero hydration overhead.
- **🛸 Top-Down Drone LERP Follower:** A smooth, interactive top-down drone cursor-tracking effect (using LERP animation) embedded within the GÖKBAĞ Autonomous Drone project card.
- **🖼️ Minimalframe Spotlight:** Showcases the local-first, GPU proxy-rendering photo processing engine built using Svelte, Canvas API, and Capacitor.
- **🪟 Interactive Modal & Lightbox System:** Uniform project cards opening detailed technical architecture modals, paired with a photography gallery lightbox.
- **🌗 Theme Toggle with State Persistence:** Seamless switcher between *Golden Summer Fields* and *Space Indigo* persisted via `localStorage`.

---

## 🛠️ Project Structure

```text
erenalsan/
├── index.html              # Semantic DOM layout
├── style.css               # Custom theme variables & typography rules
├── script.js              # Theme switcher, LERP physics, modals & overlays
├── README.md               # Documentation
└── assets/
    ├── pp.jpeg             # Profile picture
    ├── Eren_Alsan_CV.pdf   # Direct download CV document
    ├── projects/           # Screenshots & diagrams for project modals
    └── photography/        # High-res photography gallery shots