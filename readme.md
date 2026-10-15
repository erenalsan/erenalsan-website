# erenalsan.com — Personal Portfolio & Engineering Showcase

[![Site Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)](https://erenalsan.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

Personal portfolio and interactive engineering showcase of **Eren Alsan** — M.Sc. Artificial Intelligence Engineering student at the University of Passau and Full-Stack Developer.

Built with an emphasis on **zero-framework bloat**, **local-first architectures**, **tailored micro-interactions**, and an editorial **Swiss-minimalist aesthetic**.

---

## 🎨 Editorial Color Palettes

Designed to strictly eliminate "AI Slop" visual tropes (oversaturated neon gradients, heavy glassmorphism, or generic dark modes) in favor of custom-curated, warm, and sophisticated color schemes.

### ☀️ Light Theme: *Nordic Slate & Warm Paper*
- **Background (`Warm Paper`):** `#f4f4f0`
- **Cards / Containers:** `#ffffff`
- **Borders (`Slate`):** `#e2e8f0`
- **Tech Badges:** `#f1f5f9`
- **Primary Accent (`Warm Amber`):** `#d97706`
- **Typography:** `#0f172a` / muted `#64748b`

### 🌙 Dark Theme: *Deep Space Slate* (Default)
- **Background (`Obsidian`):** `#0b0f17`
- **Cards / Containers (`Slate Navy`):** `#161e2e`
- **Borders (`Steel`):** `#283548`
- **Tech Badges:** `#1e293b`
- **Primary Accent (`Sky Blue`):** `#38bdf8`
- **Typography:** `#f8fafc` / muted `#94a3b8`

---

## ✨ Features & Engineering Highlights

- **⚡ Zero-Framework Performance:** Built using pure HTML5, CSS custom properties, Tailwind CSS (via CDN), and Vanilla JavaScript for instant page loads and zero hydration overhead.
- **🛸 Top-Down Drone LERP Follower:** A smooth, interactive top-down drone cursor-tracking effect (using LERP animation) embedded within the GÖKBAĞ Autonomous Drone project card.
- **🖼️ Minimalframe Spotlight:** Showcases the local-first, GPU proxy-rendering photo processing engine built using Svelte, Canvas API, and Capacitor.
- **🪟 Interactive Modal & Lightbox System:** Uniform project cards opening detailed technical architecture modals, paired with a compact, keyboard-navigable photography slideshow in the Beyond Code section.
- **🌗 Theme Toggle with State Persistence:** Seamless switcher between *Nordic Slate & Warm Paper* and *Deep Space Slate* persisted via `localStorage`.

---

## 🛠️ Project Structure

```text
erenalsan/
├── index.html              # Semantic DOM layout
├── style.css               # Custom theme variables & typography rules
├── script.js              # Theme switcher, LERP physics, modals & overlays
├── README.md               # Documentation
└── assets/
    ├── pp.JPG              # Profile picture
    ├── Eren_Alsan_CV.pdf   # Direct download CV document
    ├── projects/           # Screenshots & diagrams for project modals
    └── photography/        # High-res photography gallery shots