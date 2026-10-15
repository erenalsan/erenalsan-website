# erenalsan.com — Personal Portfolio & Engineering Showcase

[![Site Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)](https://erenalsan.com)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

Personal portfolio and interactive engineering showcase of **Eren Alsan** — M.Sc. Artificial Intelligence Engineering student at the University of Passau and Full-Stack Developer.

The site runs in **"inference mode"**: it behaves like a computer-vision model looking at its own page. A YOLO-style detection box tracks whatever you hover or tab to and labels it with a class and confidence score, and the hero portrait "locks on" with detections when the page loads.

---

## 🎨 Design System

| Token | Light | Dark |
|---|---|---|
| Background (`Fog` / `Navy`) | `#e9ebef` | `#0e1430` |
| Text (`Ink`) | `#14213d` | `#eceef5` |
| Secondary text (`Slate`) | `#566079` | `#a0a8c3` |
| Accent (`Ultramarine`) | `#2d3fe0` | `#8c9bff` |
| Hero and contact blocks | `#2d3fe0` | `#2433c4` |
| Detection labels (`Signal`) | `#ffd23f` | `#ffd23f` |

- **Type:** San Francisco through the system font stack (SF Pro and SF Mono on Apple devices, Inter elsewhere). Apple's licence doesn't allow self-hosting SF on the web.
- **Section order (recruiter first):** hero with quick facts and CV, Work, Experience & education, Skills, Beyond the code (pursuits and photos), Contact.
- **Images:** the page loads resized copies (`assets/pp-web.jpg`, `assets/photography/web/`); the full-resolution originals are kept alongside.
- The theme follows the system setting until the visitor picks one; the choice persists via `localStorage`.

---

## ✨ Features

- **🎯 Detector cursor:** add `data-detect="label"` (and optionally `data-conf="0.99"`) to any element to make it detectable. It also works on keyboard focus.
- **🛸 Drone and 🂡 card followers:** LERP cursor trails inside the GÖKBAĞ and Pişti rows.
- **🪟 Case-study modal and photo lightbox:** keyboard accessible (Esc, arrow keys), with focus returned on close.
- **⚡ No frameworks:** plain HTML, CSS custom properties and vanilla JavaScript. Icons are inline SVG, so there are no Tailwind or icon CDNs.

---

## 🛠️ Project Structure

```text
erenalsan/
├── index.html              # Semantic DOM layout
├── style.css               # Custom theme variables & typography rules
├── script.js              # Theme, detector, LERP followers, modal & lightbox
├── README.md               # Documentation
└── assets/
    ├── pp.JPG              # Profile picture
    ├── Eren_Alsan_CV.pdf   # Direct download CV document
    ├── projects/           # Screenshots & diagrams for project modals
    └── photography/        # High-res photography gallery shots