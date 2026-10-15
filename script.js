"use strict";

/**
 * EREN ALSAN PORTFOLIO — SCRIPT.JS
 * "Inference mode": a detection box tracks whatever you hover or focus.
 */

// Project Metadata Store for Full Interactive Modals
const PROJECTS_DATA = {
  minimalframe: {
    title: "Minimalframe",
    subtitle: "Local-First Photo Processing & Formatting Engine",
    category: "Cross-Platform PWA & Native Android",
    status: "In Progress / Active Development",
    github: "https://github.com/rnlsn326/minimalframe",
    image: "assets/projects/minimalframe.jpg",
    stack: [
      "Svelte",
      "Vite",
      "Capacitor",
      "HTML5 Canvas API",
      "JSZip",
      "exifr",
      "JavaScript (ES6+)",
    ],
    overview:
      "Engineered a 100% local (offline-first), privacy-centric cross-platform photo editing and framing engine built for professional photographers with zero server dependencies.",
    architecture: [
      "<strong>File parsing &amp; RAW processing.</strong> Local-first ingestion of JPEG/PNG and RAW (.arw, .cr2) files, with exifr extracting EXIF metadata and auto-fixing orientation.",
      "<strong>Reactive state.</strong> A central Svelte store holds presets, color palettes and margin settings, persisted locally through localStorage.",
      "<strong>Dual-mode editor &amp; effects engine.</strong> A Photo Editor tab for color and light tweaks (effectsEngine.js adds Film Grain and Soft Bloom) and a Frame &amp; EXIF tab for margins, typography and logos.",
      "<strong>Proxy rendering.</strong> Editing happens on a low-res, GPU-accelerated preview canvas for zero-lag feedback; a full-resolution off-screen canvas only runs on export, keeping memory use low on 24MP+ files.",
      "<strong>Output &amp; batching.</strong> Instant single JPEG downloads, plus an in-browser JSZip pipeline that renders many photos into one ZIP.",
      "Packaged the zero-bloat web codebase into a native Android application (.apk) using Capacitor.",
    ],
    // Rendered as the pipeline diagram in the modal. Strings are edges, objects are nodes.
    pipeline: [
      { layer: "File parsing", flow: [{ name: "Image input", detail: "JPEG / PNG / RAW" }, "→", { name: "Format check" }, "→", { name: "rawEngine.js", detail: "RAW decode + orientation" }, "→", { name: "exifr", detail: "EXIF parser" }], note: "JPEG and PNG skip the RAW decoder and go straight to exifr." },
      { layer: "State & persistence", flow: [{ name: "Core app state", detail: "Svelte reactivity" }, "⇄", { name: "localStorage", detail: "saved presets" }] },
      { layer: "Dual-mode interface", flow: [{ name: "Photo Editor tab" }, "⇄", { name: "effectsEngine.js", detail: "film grain + bloom" }, "|", { name: "Frame & EXIF tab" }], note: "Both tabs read from and write to the core state." },
      { layer: "Proxy rendering", flow: [{ name: "Live preview canvas", detail: "low-res proxy" }, "⇢", { name: "Off-screen canvas", detail: "full-res, on export" }], note: "Settings are synced from the preview to the full-res canvas." },
      { layer: "Output", flow: [{ name: "Single export", detail: "JPEG" }, "|", { name: "Batch engine", detail: "JSZip" }, "→", { name: "ZIP download", detail: "framed photos" }] },
    ],
  },
  gokbag: {
    title: "Autonomous Military Support Drone (GÖKBAĞ)",
    subtitle: "Tactical Reconnaissance & Autonomous Target Acquisition",
    category: "Autonomous Systems & Computer Vision",
    status: "Active Defense R&D",
    github: null,
    image: "assets/projects/gokbag.jpg",
    stack: ["Python", "YOLO", "OpenCV", "Embedded Systems"],
    overview:
      "AI-powered tactical drone system designed for aerial reconnaissance, autonomous search-and-rescue navigation, and real-time object tracking.",
    architecture: [
      "<strong>Frame ingestion &amp; preprocessing.</strong> Low-latency RTSP/camera capture through OpenCV, with frames resized and normalized to balance inference speed and detection accuracy on constrained hardware.",
      "<strong>YOLO object detection.</strong> A real-time deep learning pipeline that outputs bounding boxes and confidence scores for personnel, vehicles and objects.",
      "<strong>Friend-or-foe identification.</strong> A second classification pass reads visual markers to sort each detection into friendly units or active threats.",
      "<strong>Target tracking &amp; LERP.</strong> Centroid/SORT tracking predicts motion vectors and computes the target's offset (dx, dy) from frame center, which LERP interpolation turns into a smooth camera lock-on.",
      "<strong>Fail-safe state machine.</strong> On signal loss or jamming the drone hovers through a timeout window waiting for the link to recover. If it doesn't, it returns to launch along recorded GPS waypoints when battery is above 20%, or runs an emergency optical landing when GPS is degraded.",
    ],
    pipeline: [
      { layer: "Real-time perception", flow: [{ name: "Camera stream", detail: "RTSP" }, "→", { name: "OpenCV", detail: "preprocessing" }, "→", { name: "YOLO", detail: "target detector" }, "→", { name: "Friend-or-foe", detail: "FFI check" }], note: "Friendly units are logged and ignored; targets go on to tracking." },
      { layer: "Tracking", flow: [{ name: "Target tracking", detail: "centroid / SORT" }, "→", { name: "LERP engine", detail: "dx, dy lock-on" }] },
      { layer: "Fail-safe", flow: [{ name: "Signal status" }, "→", { name: "Hover & timeout", detail: "signal lost / jammed" }, "→", { name: "GPS & battery check" }], note: "If the link doesn't come back, the check picks the recovery mode below." },
      { layer: "Recovery", flow: [{ name: "Return to launch", detail: "GPS OK, battery > 20%" }, "|", { name: "Optical auto-land", detail: "low battery / GPS lost" }] },
      { layer: "Flight control", flow: [{ name: "Autonomous flight control", detail: "tracking + recovery commands" }] },
    ],
  },
  "credit-ml": {
    title: "Credit Eligibility ML Model",
    subtitle: "Predictive Banking Risk Assessment Classifier",
    category: "FinTech & Predictive Modeling",
    status: "Completed Research Model",
    github: null,
    image: "assets/projects/credit-ml.jpg",
    stack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Data Analysis"],
    overview:
      "End-to-end machine learning pipeline built to assess creditworthiness and predict loan default risk on imbalanced financial datasets.",
    architecture: [
      "Conducted extensive exploratory data analysis and feature engineering on high-dimensional demographic and financial history data.",
      "Trained ensemble classifiers (Random Forest, Gradient Boosting) utilizing SMOTE and cross-validation to maximize precision and recall on high-risk borrowers.",
      "Documented model explainability metrics using SHAP values for regulatory transparency.",
    ],
  },
  "enterprise-apex": {
    title: "Universal Polymer & Vita Global Services",
    subtitle: "Production B2B Enterprise ERP Architecture",
    category: "Enterprise Full-Stack Systems",
    status: "Live Production",
    github: null,
    image: "assets/projects/enterprise-apex.jpg",
    stack: ["Oracle APEX", "JavaScript", "REST API", "Oracle SQL", "PL/SQL"],
    overview:
      "Comprehensive enterprise web applications supporting two international commercial operations with automated workflow pipelines.",
    architecture: [
      "Designed normalized relational schemas and high-throughput PL/SQL stored procedures for inventory movements and dynamic invoice generation.",
      "Built bi-directional REST integrations with WhatsApp API and email webhooks for instantaneous automated order notifications.",
      "Implemented real-time sales margin calculators to support dynamic pricing negotiations in live multi-currency B2B deals.",
    ],
  },
  "unity-pisti": {
    title: "Unity Pişti Game & .NET 7 API",
    subtitle: "Real-time Multiplayer Turkish Card Engine",
    category: "Game Engineering & Distributed Backend",
    status: "Production Graduation Capstone",
    github: null,
    image: "assets/projects/unity-pisti.jpg",
    stack: ["Unity C#", ".NET 7 REST API", "PostgreSQL", "WebSockets"],
    overview:
      "Multiplayer adaptation of the traditional Turkish card game (Pişti) pairing an interactive Unity client with a high-concurrency .NET 7 backend.",
    architecture: [
      "Engineered server-side authoritative card game logic in .NET 7 to prevent client-side desyncs and cheating.",
      "Built authenticated player profiles, matchmaking queues, and persistent leaderboards backed by PostgreSQL.",
      "Integrated smooth particle animations and responsive UI components in Unity C#.",
    ],
  },
};

const GITHUB_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>';

document.addEventListener("DOMContentLoaded", () => {
  initQuest();
  initThemeSwitch();
  initDetector();
  initTabTitle();
  initProjectModals();
  initPhotoLightbox();
  initGokbagDroneMicroInteraction();
  initPistiCardMicroInteraction();
  initReveal();
  initViews();
  initHeroScene();
  initLab();
});

/**
 * SCROLL REVEAL: elements marked data-reveal (and the timeline line) fade up once as they enter.
 * revealNow(view) shows the ones already on screen without animating, for instant tab switches.
 */
let revealNow = () => {};

function initReveal() {
  const targets = document.querySelectorAll("[data-reveal], [data-reveal-line]");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      // Stagger only the elements that enter together, so a lone row never waits
      entries
        .filter((e) => e.isIntersecting)
        .forEach((e, i) => {
          e.target.style.transitionDelay = `${Math.min(i, 5) * 60}ms`;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        });
    },
    { rootMargin: "0px 0px -8% 0px" }
  );
  targets.forEach((el) => io.observe(el));

  revealNow = (view) => {
    view.classList.add("is-instant");
    view.querySelectorAll("[data-reveal], [data-reveal-line]").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("is-visible");
        io.unobserve(el);
      }
    });
    requestAnimationFrame(() =>
      requestAnimationFrame(() => view.classList.remove("is-instant")),
    );
  };
}

/**
 * TABS: each .view is a tab. The URL hash picks it, so #work, #experience or #contact deep-link
 * straight to the right tab (and scroll to the anchor inside it).
 */
function initViews() {
  const views = Array.from(document.querySelectorAll(".view"));
  const tabs = document.querySelectorAll("[data-tab]");
  const next = document.getElementById("next-level");
  if (!views.length) return;

  function route() {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    const view = (target && target.closest(".view")) || views[0];

    views.forEach((v) => v.classList.toggle("is-active", v === view));
    tabs.forEach((t) => {
      if (t.dataset.tab === view.id) t.setAttribute("aria-current", "page");
      else t.removeAttribute("aria-current");
    });
    const current = document.querySelector(`[data-tab="${view.id}"]`);
    const bar = current && current.parentElement;
    if (bar && bar.scrollWidth > bar.clientWidth) {
      const offset = current.getBoundingClientRect().left - bar.getBoundingClientRect().left;
      bar.scrollTo({ left: bar.scrollLeft + offset - (bar.clientWidth - current.offsetWidth) / 2, behavior: "smooth" });
    }

    view.scrollTop = 0;
    if (target && target !== view) target.scrollIntoView({ behavior: "instant", block: "nearest" });
    else window.scrollTo({ top: 0, behavior: "instant" });
    revealNow(view);

    if (next) {
      const i = views.indexOf(view);
      const to = views[(i + 1) % views.length];
      const tab = document.querySelector(`[data-tab="${to.id}"]`);
      const name = tab ? tab.textContent.replace(/^\d+/, "").trim() : to.id;
      const num = String(((i + 1) % views.length) + 1).padStart(2, "0");
      next.href = `#${to.id}`;
      next.textContent = i + 1 < views.length ? `Next level: ${num} ${name} →` : `Play again: 01 ${name} ↺`;
    }

    track("tab", view.id, views.length, "explorer");
    document.dispatchEvent(new CustomEvent("viewchange", { detail: view.id }));
  }

  window.addEventListener("hashchange", route);
  route();
}

/**
 * 1. THEME SWITCHER (Dark / Light with LocalStorage Persistence)
 */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    // Storage blocked (private mode): theme still applies for this visit
  }
}

function initThemeSwitch() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
    unlock("night");
  });
}

/**
 * 3. DETECTOR: YOLO-style box that tracks [data-detect] elements on hover/focus
 */
function confidenceFor(el) {
  if (el.dataset.conf) return el.dataset.conf;
  // Stable pseudo-confidence per label, 0.86–0.99
  let h = 0;
  for (const ch of el.dataset.detect) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return (0.86 + (h % 14) / 100).toFixed(2);
}

function initDetector() {
  const box = document.getElementById("detector");
  const label = box ? box.querySelector(".detector-label") : null;
  if (!box || !label) return;

  const PAD = 6;
  let target = null;
  let snapTimer = 0;

  function place() {
    if (!target) return;
    const r = target.getBoundingClientRect();
    box.style.transform = `translate(${r.left - PAD}px, ${r.top - PAD}px)`;
    box.style.width = `${r.width + PAD * 2}px`;
    box.style.height = `${r.height + PAD * 2}px`;
  }

  function show(el) {
    if (el === target) return;
    target = el;
    label.textContent = `${el.dataset.detect} ${confidenceFor(el)}`;
    box.classList.toggle("on-blue", !!el.closest(".on-blue"));
    box.classList.add("is-visible");
    place();
  }

  function hide() {
    target = null;
    box.classList.remove("is-visible");
  }

  document.addEventListener("pointerover", (e) => {
    const el = e.target.closest("[data-detect]");
    if (el) show(el);
    else if (target) hide();
  });
  document.documentElement.addEventListener("pointerleave", hide);
  document.addEventListener("viewchange", hide);
  document.addEventListener("focusin", (e) => {
    const el = e.target.closest("[data-detect]");
    if (el) show(el);
    else hide();
  });

  // While scrolling, follow the target instantly instead of easing behind it
  document.addEventListener(
    "scroll",
    () => {
      if (!target) return;
      box.classList.add("is-snapping");
      place();
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => box.classList.remove("is-snapping"), 150);
    },
    { passive: true, capture: true },
  );
  window.addEventListener("resize", place);

  // Phones have no hover: lock onto whatever sits in the middle of the screen while scrolling
  if (window.matchMedia("(hover: none)").matches) {
    let ticking = false;
    const scan = () => {
      ticking = false;
      const y = window.innerHeight / 2;
      let best = null;
      document.querySelectorAll("[data-detect]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom >= y && r.width > 0) {
          // Prefer the smallest (most specific) element under the centre line
          if (!best || r.width * r.height < best.area)
            best = { el, area: r.width * r.height };
        }
      });
      if (best) show(best.el);
      else hide();
    };
    document.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(scan);
        }
      },
      { passive: true, capture: true },
    );
  }
}

/**
 * 3b. TAB TITLE: the model notices when you look away
 */
function initTabTitle() {
  const original = document.title;
  let resetTimeout = null;

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (resetTimeout) clearTimeout(resetTimeout);
      document.title = "[TARGET_LOST] Out of frame...";
    } else {
      document.title = "[TARGET_FOUND] Tracking restored...";
      unlock("away");

      resetTimeout = setTimeout(() => {
        document.title = original;
      }, 1500);
    }
  });
}
/**
 * Overlay show/hide: unhide, force layout, then add .is-open so the CSS transition runs
 * from the final size. Closing waits for the 60ms exit transition before display:none.
 */
function showOverlay(el) {
  clearTimeout(el._hideTimer);
  el.classList.remove("hidden");
  void el.offsetWidth;
  el.classList.add("is-open");
}

function hideOverlay(el) {
  el.classList.remove("is-open");
  el._hideTimer = setTimeout(() => el.classList.add("hidden"), 60);
}

/**
 * 4. PROJECT CASE STUDY MODAL
 */
function initProjectModals() {
  const modal = document.getElementById("project-modal");
  const modalContent = document.getElementById("modal-content");
  const closeBtn = document.getElementById("modal-close-btn");
  const backdrop = modal ? modal.querySelector(".modal-backdrop") : null;

  if (!modal || !modalContent) return;

  let previousFocus = null;

  function openModal(projectId) {
    const data = PROJECTS_DATA[projectId];
    if (!data) return;

    const githubBtnHtml = data.github
      ? `<a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-light">${GITHUB_ICON}<span style="margin-left:8px">View on GitHub</span></a>`
      : "";
    const bulletsHtml = data.architecture.map((b) => `<li>${b}</li>`).join("");
    const pipelineHtml = data.pipeline
      ? `<h4 class="modal-h">Pipeline</h4>
        <ol class="pipeline">${data.pipeline
          .map(
            (s) => `<li class="pipe-stage">
              <p class="pipe-layer">${s.layer}</p>
              <div class="pipe-flow">${s.flow
                .map((n) =>
                  typeof n === "string"
                    ? `<span class="pipe-edge" aria-hidden="true">${n}</span>`
                    : `<span class="pipe-node">${n.name}${n.detail ? `<small>${n.detail}</small>` : ""}</span>`
                )
                .join("")}</div>
              ${s.note ? `<p class="pipe-note">${s.note}</p>` : ""}
            </li>`
          )
          .join("")}</ol>`
      : "";

    modalContent.innerHTML = `
      <p class="modal-kind">${data.category}<span class="badge modal-status">${data.status}</span></p>
      <h3 id="modal-title" class="modal-title">${data.title}</h3>
      <p class="modal-sub">${data.subtitle}</p>
      <p class="modal-text">${data.overview}</p>
      <figure class="modal-figure">
        <img src="${data.image}" alt="${data.title} screenshot" onerror="this.parentElement.remove()" />
      </figure>
      <h4 class="modal-h">How it works</h4>
      <ul class="modal-list">${bulletsHtml}</ul>
      ${pipelineHtml}
      <h4 class="modal-h">Built with</h4>
      <p class="modal-stack">${data.stack.join(", ")}</p>
      <div class="modal-actions">${githubBtnHtml}</div>
    `;

    previousFocus = document.activeElement;
    showOverlay(modal);
    modal.querySelector(".modal-dialog").scrollTop = 0;
    unlock("case");
    track("project", projectId, Object.keys(PROJECTS_DATA).length, "debrief");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }

  window.closeProjectModal = function () {
    hideOverlay(modal);
    document.body.style.overflow = "";
    if (previousFocus && typeof previousFocus.focus === "function")
      previousFocus.focus();
  };

  document.querySelectorAll("[data-project]").forEach((card) => {
    card.addEventListener("click", () => {
      openModal(card.getAttribute("data-project"));
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card.getAttribute("data-project"));
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", window.closeProjectModal);
  if (backdrop) backdrop.addEventListener("click", window.closeProjectModal);

  const dialog = modal.querySelector(".modal-dialog");
  dialog.addEventListener("scroll", () => {
    if (dialog.scrollTop > 0 && dialog.scrollTop + dialog.clientHeight >= dialog.scrollHeight - 8)
      unlock("blueprint");
  }, { passive: true });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      window.closeProjectModal();
    }
  });
}

/**
 * 5. PHOTOGRAPHY LIGHTBOX
 */
function initPhotoLightbox() {
  const lightbox = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxFallback = document.getElementById("lightbox-fallback");
  const lightboxCounter = document.getElementById("lightbox-counter");
  const closeBtn = document.getElementById("lightbox-close-btn");
  const prevBtn = document.getElementById("lightbox-prev-btn");
  const nextBtn = document.getElementById("lightbox-next-btn");
  const backdrop = lightbox
    ? lightbox.querySelector(".lightbox-backdrop")
    : null;
  const slides = [
    {
      src: "assets/photography/web/photo1.jpg",
      alt: "Santuario della Beata Vergine del Rosario di Pompei framed by foliage",
      caption: "Architectural Perspectives • Pompei, Italy",
      fallback:
        "Italian Architectural Study\nPompei • Italy\nISO 100 • 50mm • f/4.0",
    },
    {
      src: "assets/photography/web/photo2.jpg",
      alt: "Vintage car driving through historic street in Passau",
      caption: "Bavarian Street Dynamics • Passau, Germany",
      fallback:
        "Bavaria Architectural Study\nPassau • Germany\nISO 200 • 35mm • f/2.8",
    },
    {
      src: "assets/photography/web/photo3.jpg",
      alt: "Black cat sitting on a carpeted fishing boat at Foça harbor",
      caption: "Aegean Marine Solitude • Foça, Turkey",
      fallback:
        "Aegean Marine Landscapes\nFoça Harbor • Turkey\nISO 400 • 24mm • f/2.0",
    },
  ];

  if (
    !lightbox ||
    !lightboxImg ||
    !lightboxCaption ||
    !lightboxFallback ||
    !slides.length
  )
    return;

  let currentIndex = 0;
  let previousFocus = null;

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    const slide = slides[currentIndex];

    lightboxImg.classList.add("hidden");
    lightboxFallback.classList.add("hidden");
    lightboxImg.removeAttribute("src");
    lightboxImg.alt = slide.alt;
    lightboxFallback.textContent = slide.fallback;
    lightboxCaption.textContent = slide.caption;
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentIndex + 1} / ${slides.length}`;
    }

    const slideIndex = currentIndex;
    lightboxImg.onerror = () => {
      if (currentIndex !== slideIndex) return;
      lightboxImg.classList.add("hidden");
      lightboxFallback.classList.remove("hidden");
    };
    lightboxImg.onload = () => {
      if (currentIndex !== slideIndex) return;
      lightboxFallback.classList.add("hidden");
      lightboxImg.classList.remove("hidden");
    };
    lightboxImg.src = slide.src;
    track("photo", currentIndex, slides.length, "gallery");
  }

  function openLightbox(index) {
    previousFocus = document.activeElement;
    showSlide(index);
    showOverlay(lightbox);
    unlock("shutter");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    hideOverlay(lightbox);
    document.body.style.overflow = "";
    if (previousFocus && typeof previousFocus.focus === "function")
      previousFocus.focus();
  }

  function showPreviousSlide() {
    showSlide(currentIndex - 1);
  }

  function showNextSlide() {
    showSlide(currentIndex + 1);
  }

  document.querySelectorAll("[data-slide]").forEach((btn) => {
    btn.addEventListener("click", () =>
      openLightbox(Number(btn.getAttribute("data-slide"))),
    );
  });
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", showPreviousSlide);
  if (nextBtn) nextBtn.addEventListener("click", showNextSlide);
  if (backdrop) backdrop.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPreviousSlide();
    if (e.key === "ArrowRight") showNextSlide();
  });
}

/**
 * 6. CURSOR-FOLLOWER MICRO-INTERACTIONS (LERP trail inside card bounds)
 */
function initCursorFollower(cardId, followerId, ease, onMove) {
  const card = document.getElementById(cardId);
  const follower = document.getElementById(followerId);

  if (!card || !follower) return;

  let targetX = 50,
    targetY = 50;
  let currentX = 50,
    currentY = 50;
  let isHovered = false;
  let rafId = 0;

  follower.style.left = `${currentX}px`;
  follower.style.top = `${currentY}px`;

  // Loop only runs while hovered; rafId guards against double loops on quick re-entry
  function tick() {
    if (!isHovered) {
      rafId = 0;
      return;
    }
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    follower.style.left = `${currentX}px`;
    follower.style.top = `${currentY}px`;
    rafId = requestAnimationFrame(tick);
  }

  card.addEventListener("mouseenter", () => {
    isHovered = true;
    if (!rafId) rafId = requestAnimationFrame(tick);
  });

  card.addEventListener("mouseleave", () => {
    isHovered = false;
  });

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    targetX = Math.max(20, Math.min(rect.width - 20, e.clientX - rect.left));
    targetY = Math.max(20, Math.min(rect.height - 20, e.clientY - rect.top));
    if (onMove) onMove(targetX, targetY);
  });
}

function initGokbagDroneMicroInteraction() {
  const hud = document.getElementById("drone-hud");
  let moves = 0;
  initCursorFollower("gokbag-card", "mini-drone", 0.12, (x, y) => {
    if (hud) hud.textContent = `tracking x ${Math.round(x)} y ${Math.round(y)}`;
    if (++moves === 80) unlock("pilot");
  });
}

function initPistiCardMicroInteraction() {
  // Slower ease than the drone so the card visibly trails the cursor
  let moves = 0;
  initCursorFollower("pisti-card", "pisti-card-follower", 0.07, () => {
    if (++moves === 80) unlock("shark");
  });
}

/**
 * 7. EMAIL COPY TRIGGER WITH TOAST
 */
window.copyEmail = async function () {
  const emailEl = document.getElementById("contact-email");
  const copyLabel = document.getElementById("copy-label");

  if (!emailEl) return;
  const email = emailEl.textContent.trim();

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(email);
    } else {
      throw new Error("Clipboard API unavailable");
    }
  } catch (err) {
    const input = document.createElement("input");
    input.value = email;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  }

  if (copyLabel) copyLabel.textContent = "Copied";
  notify({ kicker: "Clipboard", title: "Email copied", text: `${email}. Confidence you'll write: 1.00`, icon: "✉", kind: "info" });
  unlock("signal");

  setTimeout(() => {
    if (copyLabel) copyLabel.textContent = "Copy email";
  }, 2200);
};

/**
 * 8. QUEST SYSTEM: achievements, XP, levels and the retro toasts
 */
const ACHIEVEMENTS = [
  { id: "boot", icon: "▶", title: "Player 1 ready", desc: "Load the portfolio.", xp: 10 },
  { id: "explorer", icon: "◆", title: "Explorer", desc: "Visit all six tabs.", xp: 40 },
  { id: "case", icon: "▣", title: "Case opened", desc: "Open a project case study.", xp: 20 },
  { id: "debrief", icon: "▤", title: "Full debrief", desc: "Open all five case studies.", xp: 60 },
  { id: "blueprint", icon: "≡", title: "Read the blueprint", desc: "Scroll a case study to the very end.", xp: 25 },
  { id: "pilot", icon: "⌖", title: "Drone pilot", desc: "Fly the GÖKBAĞ drone around with your cursor.", xp: 20 },
  { id: "shark", icon: "♠", title: "Card shark", desc: "Get the Pişti card to follow you around.", xp: 20 },
  { id: "shutter", icon: "◉", title: "Shutterbug", desc: "Open a photo.", xp: 15 },
  { id: "gallery", icon: "▦", title: "Gallery tour", desc: "See all three photos.", xp: 30 },
  { id: "night", icon: "☾", title: "Night shift", desc: "Switch the theme. The pixel seafront changes too.", xp: 15 },
  { id: "ahoy", icon: "⚓", title: "Ahoy!", desc: "Click the yacht on the horizon.", hint: "Something is sailing past the castle.", xp: 30, secret: true },
  { id: "castle", icon: "♜", title: "Castel dell'Ovo", desc: "Click the castle. It's the one behind me in my photo, in Naples.", hint: "The seafront has a landmark. Knock on it.", xp: 20, secret: true },
  { id: "tuner", icon: "⇆", title: "Hyperparameter tuner", desc: "Move the confidence threshold in the Vision Lab.", xp: 15 },
  { id: "sharp", icon: "⊕", title: "Sharpshooter", desc: "Tag 10 objects in one Vision Lab round.", xp: 50 },
  { id: "away", icon: "↺", title: "Target reacquired", desc: "Leave the browser tab and come back.", hint: "The page notices when you look away.", xp: 10, secret: true },
  { id: "signal", icon: "✉", title: "Signal sent", desc: "Copy my email address.", xp: 30 },
  { id: "paper", icon: "▼", title: "Paper trail", desc: "Download my CV.", xp: 30 },
  { id: "konami", icon: "↑", title: "Cheat code", desc: "↑ ↑ ↓ ↓ ← → ← → B A", hint: "Old games had codes. So does this site.", xp: 50, secret: true },
  { id: "legend", icon: "★", title: "100% complete", desc: "Unlock every other achievement.", xp: 100 },
];
const LEVELS = [
  [0, "Visitor"],
  [60, "Scout"],
  [150, "Analyst"],
  [260, "Talent hunter"],
  [400, "Recruiter elite"],
  [560, "Legend"],
];
const QUEST_KEY = "quest-v1";
const quest = loadQuest();

function freshQuest() {
  return { done: {}, seen: { tab: [], project: [], photo: [] }, best: 0, sound: true };
}

function loadQuest() {
  try {
    const saved = JSON.parse(localStorage.getItem(QUEST_KEY));
    if (saved && saved.done && saved.seen) return Object.assign(freshQuest(), saved);
  } catch (e) {
    // Storage blocked or corrupt: start a fresh run
  }
  return freshQuest();
}

function saveQuest() {
  try {
    localStorage.setItem(QUEST_KEY, JSON.stringify(quest));
  } catch (e) {
    // Storage blocked: progress lasts for this visit only
  }
}

function questXp() {
  return ACHIEVEMENTS.reduce((sum, a) => sum + (quest.done[a.id] ? a.xp : 0), 0);
}

function levelFor(xp) {
  let i = 0;
  while (i + 1 < LEVELS.length && xp >= LEVELS[i + 1][0]) i++;
  return i;
}

function unlock(id) {
  const a = ACHIEVEMENTS.find((x) => x.id === id);
  if (!a || quest.done[id]) return;
  const before = levelFor(questXp());
  quest.done[id] = Date.now();
  saveQuest();
  notify({ kicker: "Achievement unlocked", title: a.title, text: `${a.desc} +${a.xp} XP`, icon: a.icon });
  blip([523, 659, 784]);

  const lvl = levelFor(questXp());
  if (lvl > before) {
    setTimeout(() => {
      notify({ kicker: "Level up", title: `LV ${lvl + 1} · ${LEVELS[lvl][1]}`, text: "Keep exploring, there's more to find.", icon: "▲", kind: "level" });
      blip([392, 523, 659, 1047]);
    }, 500);
  }
  renderQuest(true);

  if (id !== "legend" && ACHIEVEMENTS.every((x) => x.id === "legend" || quest.done[x.id])) {
    setTimeout(() => {
      unlock("legend");
      confetti(window.innerWidth / 2, window.innerHeight / 2);
    }, 1000);
  }
}

// Counts distinct things seen (tabs, projects, photos) and unlocks once all are seen
function track(kind, value, total, achievementId) {
  const list = quest.seen[kind];
  if (!list.includes(value)) {
    list.push(value);
    saveQuest();
  }
  if (list.length >= total) unlock(achievementId);
}

function renderQuest(bump) {
  const xp = questXp();
  const lvl = levelFor(xp);
  const floor = LEVELS[lvl][0];
  const ceil = LEVELS[lvl + 1] ? LEVELS[lvl + 1][0] : floor;
  const pct = ceil > floor ? ((xp - floor) / (ceil - floor)) * 100 : 100;

  const hud = document.getElementById("xp-hud");
  if (hud) {
    hud.style.setProperty("--xp", `${pct}%`);
    hud.querySelector(".xp-level").textContent = `LV ${lvl + 1}`;
    hud.title = `${LEVELS[lvl][1]} · ${xp} XP`;
    hud.setAttribute("aria-label", `Level ${lvl + 1}, ${LEVELS[lvl][1]}, ${xp} XP. Open the quest log`);
    if (bump) {
      hud.classList.remove("is-bump");
      void hud.offsetWidth;
      hud.classList.add("is-bump");
    }
  }

  const done = ACHIEVEMENTS.filter((a) => quest.done[a.id]).length;
  const summary = document.getElementById("quest-summary");
  const fill = document.getElementById("quest-fill");
  if (summary) summary.textContent = `${done} / ${ACHIEVEMENTS.length} · ${xp} XP · LV ${lvl + 1} ${LEVELS[lvl][1]}`;
  if (fill) fill.style.width = `${(done / ACHIEVEMENTS.length) * 100}%`;

  const grid = document.getElementById("quest-grid");
  if (grid) {
    grid.innerHTML = ACHIEVEMENTS.map((a) => {
      const got = !!quest.done[a.id];
      const hidden = a.secret && !got;
      const title = hidden ? "???" : a.title;
      const desc = hidden ? a.hint : a.desc;
      return `<li class="quest${got ? " is-done" : ""}" title="${title}: ${desc} (+${a.xp} XP${got ? ", unlocked" : ""})">
        <span class="quest-icon" aria-hidden="true">${hidden ? "?" : a.icon}</span>
        <div>
          <p class="quest-title">${title}</p>
          <p class="quest-desc"><span class="quest-xp">+${a.xp}</span> ${desc}</p>
        </div>
      </li>`;
    }).join("");
  }
}

function notify({ kicker = "", title, text = "", icon = "★", kind = "", life = 4200 }) {
  const box = document.getElementById("toasts");
  if (!box) return;
  const t = document.createElement("div");
  t.className = kind ? `toast is-${kind}` : "toast";
  t.style.setProperty("--life", `${life}ms`);
  t.innerHTML = `<span class="toast-icon" aria-hidden="true"></span>
    <div><p class="toast-kicker"></p><p class="toast-title"></p><p class="toast-text"></p></div>
    <span class="toast-timer" aria-hidden="true"></span>`;
  t.querySelector(".toast-icon").textContent = icon;
  t.querySelector(".toast-kicker").textContent = kicker;
  t.querySelector(".toast-title").textContent = title;
  t.querySelector(".toast-text").textContent = text;
  box.appendChild(t);
  while (box.children.length > 3) box.firstElementChild.remove();

  const close = () => {
    if (t.classList.contains("is-leaving")) return;
    t.classList.add("is-leaving");
    setTimeout(() => t.remove(), 200);
  };
  t.addEventListener("click", close);
  setTimeout(close, life);
}

// Square-wave chiptune blips; off unless the visitor turns sound on in the quest log
let audioCtx = null;
function blip(notes) {
  if (!quest.sound) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    // Browsers start audio suspended until the first click or key press
    if (audioCtx.state === "suspended") audioCtx.resume();
    notes.forEach((f, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const t = audioCtx.currentTime + i * 0.07;
      osc.type = "square";
      osc.frequency.value = f;
      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.13);
    });
  } catch (e) {
    // No Web Audio: stay silent
  }
}

function confetti(x, y) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#ffd23f", "#2d3fe0", "#ff6b6b", "#7cf29a", "#ffffff"];
  for (let i = 0; i < 48; i++) {
    const p = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 260;
    p.className = "confetti";
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.background = colors[i % colors.length];
    p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
    p.style.setProperty("--dy", `${Math.sin(angle) * dist - 80}px`);
    p.style.setProperty("--r", `${Math.random() * 720 - 360}deg`);
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1200);
  }
}

function initQuest() {
  renderQuest(false);
  if (!quest.done.boot) setTimeout(() => unlock("boot"), 2600);

  document.querySelectorAll("a[download]").forEach((a) =>
    a.addEventListener("click", () => unlock("paper")),
  );

  const soundBtn = document.getElementById("quest-sound");
  if (soundBtn) {
    const sync = () => {
      soundBtn.textContent = `Sound: ${quest.sound ? "on" : "off"}`;
      soundBtn.setAttribute("aria-pressed", String(quest.sound));
    };
    sync();
    soundBtn.addEventListener("click", () => {
      quest.sound = !quest.sound;
      saveQuest();
      sync();
      blip([440, 660]);
    });
  }

  const resetBtn = document.getElementById("quest-reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (!window.confirm("Reset all achievements and XP?")) return;
      Object.assign(quest, freshQuest(), { sound: quest.sound });
      saveQuest();
      renderQuest(true);
      notify({ kicker: "New game", title: "Progress reset", text: "Back to LV 1. Good luck.", icon: "↺", kind: "info" });
    });
  }

  // Konami code toggles 8-bit mode
  const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let pos = 0;
  document.addEventListener("keydown", (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    pos = key === code[pos] ? pos + 1 : key === code[0] ? 1 : 0;
    if (pos < code.length) return;
    pos = 0;
    const on = document.documentElement.classList.toggle("retro");
    unlock("konami");
    notify({
      kicker: "Cheat activated",
      title: on ? "8-bit mode on" : "8-bit mode off",
      text: on ? "Enter the code again to switch back." : "Back to high resolution.",
      icon: "↑",
      kind: "info",
    });
    if (on) confetti(window.innerWidth / 2, window.innerHeight / 2);
  });
}

/**
 * 9. HERO SCENE: 8-bit Naples seafront (Castel dell'Ovo, a yacht, gulls). Day or night follows the theme.
 * Drawn at low resolution and scaled up with image-rendering: pixelated.
 */
const SCENE_PALETTES = {
  day: {
    sky: ["#1f2fb8", "#2d3fe0", "#4a68ee", "#7896f6", "#a9c2fb"],
    sea: ["#132f7d", "#1a44a3", "#2457bf"],
    glint: "#cfe0ff",
    stone: ["#f0d9a4", "#d9b97e", "#b8955f", "#7d6440"],
    wall: ["#6e655d", "#4f4741", "#8a8076"],
    rock: ["#ece6dc", "#c4bcaf", "#8f877b"],
    brick: ["#b9643f", "#8e4a2e", "#d98a5f"],
    window: "#3a2c1c",
    cloud: ["#ffffff", "#d7e2ff"],
    hull: ["#ffffff", "#b9c2d8"],
    cabin: "#2b3a66",
    bird: "#ffffff",
    lamp: "#23232e",
    lampLight: "#4a4a5a",
    orb: ["#fff6d0", "#ffd23f"],
  },
  night: {
    sky: ["#04061a", "#0a1030", "#121b4a", "#1b2766", "#283a85"],
    sea: ["#050a24", "#091236", "#0e1a48"],
    glint: "#9fb0ff",
    stone: ["#8a7a62", "#6c5d47", "#4e4232", "#2f271d"],
    wall: ["#2c2a33", "#1d1b22", "#3b3844"],
    rock: ["#5e5b68", "#45424f", "#2c2a33"],
    brick: ["#5a3326", "#43251b", "#6e4030"],
    window: "#ffd23f",
    cloud: ["#3a4580", "#2a3366"],
    hull: ["#c9cfe0", "#7e86a0"],
    cabin: "#ffd23f",
    bird: "#c9cfe0",
    lamp: "#14141c",
    lampLight: "#ffd23f",
    orb: ["#f4f1e0", "#bdb9a6"],
  },
};
const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const BOAT_SPRITE = [
  "......hh......",
  "....hhhhhh....",
  "..hhccccccchh.",
  "hhhhhhhhhhhhhh",
  ".ssssssssssss.",
];
const GULL_SPRITES = [
  ["#...#", ".#.#.", "..#.."],
  [".....", "##.##", "..#.."],
];

function seeded(seed) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

function drawSprite(g, rows, x, y, colors) {
  rows.forEach((row, j) => {
    for (let i = 0; i < row.length; i++) {
      const col = colors[row[i]];
      if (!col) continue;
      g.fillStyle = col;
      g.fillRect(x + i, y + j, 1, 1);
    }
  });
}

// Fills rows y0..y1 with a dithered gradient through the given colour stops
function ditherBands(g, w, y0, y1, stops, spread) {
  for (let y = y0; y < y1; y++) {
    const t = Math.min(1, (y - y0) / spread) * (stops.length - 1);
    const i = Math.min(Math.floor(t), stops.length - 2);
    const f = t - i;
    for (let x = 0; x < w; x++) {
      g.fillStyle = f * 16 > BAYER4[(y & 3) * 4 + (x & 3)] ? stops[i + 1] : stops[i];
      g.fillRect(x, y, 1, 1);
    }
  }
}

function initHeroScene() {
  const hero = document.getElementById("hero");
  const canvas = document.getElementById("hero-scene");
  if (!hero || !canvas || !canvas.getContext) return;
  const portrait = hero.querySelector(".portrait");
  const ctx = canvas.getContext("2d");
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrowMq = window.matchMedia("(max-width: 899px)");

  let W = 0, H = 0, P = 1;
  let L = null; // layout + prebuilt layers
  let frame = 0, boatX = 0, timer = 0, onScreen = true;

  function resize() {
    const r = hero.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const dpr = window.devicePixelRatio || 1;
    const target = Math.min(8, Math.max(4, r.width / 240));
    P = Math.max(1, Math.round(target * dpr)) / dpr; // whole device pixels per art pixel
    W = Math.ceil(r.width / P);
    H = Math.ceil(r.height / P);
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = `${W * P}px`;
    canvas.style.height = `${H * P}px`;
    build();
    draw();
  }

  function layer() {
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    return c;
  }

  function build() {
    const night = document.documentElement.getAttribute("data-theme") === "dark";
    const c = SCENE_PALETTES[night ? "night" : "day"];
    const rand = seeded(7);
    const narrow = narrowMq.matches;
    const hr = hero.getBoundingClientRect();
    const pr = portrait ? portrait.getBoundingClientRect() : null;

    // The framed portrait hangs on the castle tower: the tower is built around the frame,
    // with battlements above it and wall below it down to the rocks
    const M = 5;
    let cx, CW, ty, by;
    const hz = narrow && pr ? Math.ceil((pr.bottom - hr.top) / P) + 6 : Math.round(H * 0.68);
    if (pr) {
      const pt = Math.floor((pr.top - hr.top) / P);
      cx = Math.floor((pr.left - hr.left) / P) - M;
      CW = Math.ceil(pr.width / P) + M * 2;
      ty = pt - 14;
      by = Math.max(hz + 5, Math.ceil((pr.bottom - hr.top) / P) + 10);
    } else {
      CW = 40;
      cx = W - CW - 3;
      by = hz + 5;
      ty = by - 60;
    }
    const CH = by - ty;
    const brickH = 7;
    const bx = narrow ? 0 : Math.round(W * 0.48);
    const orbX = narrow ? Math.round(W * 0.8) : Math.round(W * 0.5);
    const orbY = narrow ? Math.max(8, Math.round(hz * 0.2)) : Math.round(hz * 0.2);

    const back = layer();
    const g = back.getContext("2d");
    ditherBands(g, W, 0, hz, c.sky, hz);
    ditherBands(g, W, hz, H, c.sea, Math.max(1, (H - hz) * 0.6));

    // Sun or moon with a dithered halo
    for (let dy = -9; dy <= 9; dy++) {
      for (let dx = -9; dx <= 9; dx++) {
        const d = dx * dx + dy * dy;
        if (d <= 25) g.fillStyle = c.orb[0];
        else if (d <= 30) g.fillStyle = c.orb[1];
        else if (d <= 72 && ((dx + dy) & 1) === 0 && ((dx ^ dy) & 2) === 0) g.fillStyle = c.orb[0] + "55";
        else continue;
        g.fillRect(orbX + dx, orbY + dy, 1, 1);
      }
    }
    if (night) {
      g.fillStyle = c.orb[1];
      [[-2, -1], [1, 2], [2, -2], [-1, 2]].forEach(([dx, dy]) => g.fillRect(orbX + dx, orbY + dy, 1, 1));
    }

    const front = layer();
    const f = front.getContext("2d");
    const px = (x, y, w, h, col) => {
      f.fillStyle = col;
      f.fillRect(x, y, w, h);
    };

    // Breakwater running out to sea from the castle
    px(cx + CW, hz - 1, W - cx - CW, 4, c.wall[0]);
    px(cx + CW, hz - 1, W - cx - CW, 1, c.wall[2]);
    for (let x = cx + CW + 3; x < W; x += 7) px(x, hz, 1, 3, c.wall[1]);

    // Lower wing with its own battlements, to the right of the tower when there's room for it
    const wingW = 18;
    const wingH = Math.round(CH * 0.42);
    const wx = W - (cx + CW) >= wingW + 2 ? cx + CW : null;
    if (wx !== null) {
      px(wx, by - wingH, wingW, wingH, c.stone[2]);
      for (let x = wx; x < wx + wingW; x += 4) px(x, by - wingH - 2, 2, 2, c.stone[2]);
      px(wx + 7, by - wingH + 5, 2, 3, c.window);
    }

    // Main tower: sunlit left face, shaded right face, flared base, stone texture
    for (let y = ty; y < by; y++) {
      const flare = Math.max(0, Math.floor((y - (by - 12)) / 3));
      for (let x = cx - flare; x < cx + CW + flare; x++) {
        const shade = x > cx + CW * 0.68;
        let col = shade ? c.stone[2] : c.stone[1];
        const r = rand();
        if (r < 0.07) col = shade ? c.stone[3] : c.stone[2];
        else if (r > 0.96 && !shade) col = c.stone[0];
        if (x === cx - flare) col = c.stone[0];
        px(x, y, 1, 1, col);
      }
    }
    for (let x = cx; x < cx + CW; x += 5) px(x, ty - 3, 3, 3, x > cx + CW * 0.68 ? c.stone[2] : c.stone[1]);
    // Cornice and the machicolation ledge halfway down, as in the photo
    px(cx - 1, ty + 1, CW + 2, 1, c.stone[0]);
    for (let x = cx; x < cx + CW; x += 2) px(x, ty + 2, 1, 1, c.stone[3]);
    const ledge = ty + Math.round(CH * 0.45);
    px(cx - 1, ledge, CW + 2, 1, c.stone[0]);
    for (let x = cx; x < cx + CW; x += 3) px(x, ledge + 1, 2, 1, c.stone[3]);
    // Windows above the frame (lit at night)
    const win = [[0.15, 7], [0.45, 7], [0.75, 7]];
    win.forEach(([fx, wy]) => {
      const wx = cx + Math.round(CW * fx);
      px(wx, ty + wy, 3, 3, c.window);
      px(wx + 1, ty + wy - 1, 1, 1, c.window);
      if (night) {
        f.fillStyle = "rgba(255, 210, 63, 0.25)";
        f.fillRect(wx - 1, ty + wy + 3, 5, 1);
      }
    });

    // Rocks piled in a band along the base, out to the right edge
    const rockX = cx - 6;
    const rockY = Math.min(by, H - brickH - 2);
    for (let i = 0; i < Math.round((W - rockX) / 3); i++) {
      const rx = Math.round(rockX + rand() * (W - rockX));
      const ry = Math.round(rockY - 3 + rand() * 5);
      const rr = 2 + Math.round(rand() * 2);
      for (let dy = -rr; dy <= rr; dy++) {
        for (let dx = -rr - 1; dx <= rr + 1; dx++) {
          if (dx * dx * 0.7 + dy * dy > rr * rr) continue;
          px(rx + dx, ry + dy, 1, 1, dy < -rr / 3 && dx < 0 ? c.rock[0] : dy > rr / 3 ? c.rock[2] : c.rock[1]);
        }
      }
    }

    // Brick ledge in the foreground
    const y0 = H - brickH;
    px(bx, y0, W - bx, brickH, c.brick[0]);
    px(bx, y0, W - bx, 1, c.brick[2]);
    for (let y = y0 + 3; y < H; y += 3) px(bx, y, W - bx, 1, c.brick[1]);
    for (let y = y0 + 1, row = 0; y < H; y += 3, row++) {
      for (let x = bx + (row % 2) * 3; x < W; x += 6) px(x, y, 1, 2, c.brick[1]);
    }

    // Street lamp in front of the castle
    const lx = narrow ? cx + CW + 5 : cx - 4;
    const lampTop = ty + Math.round(CH * 0.35);
    px(lx, lampTop, 1, rockY - lampTop, c.lamp);
    px(lx - 1, rockY - 2, 3, 2, c.lamp);
    px(lx - 1, lampTop - 5, 3, 1, c.lamp);
    px(lx - 1, lampTop - 4, 3, 4, c.lamp);
    px(lx, lampTop - 3, 1, 2, c.lampLight);
    if (night) {
      for (let dy = -7; dy <= 7; dy++) {
        for (let dx = -7; dx <= 7; dx++) {
          if (dx * dx + dy * dy > 49 || ((dx + dy) & 1)) continue;
          px(lx + dx, lampTop - 2 + dy, 1, 1, "rgba(255, 210, 63, 0.22)");
        }
      }
    }

    // Clouds, pre-rendered once each
    const clouds = [0, 1, 2].map((i) => {
      const w = 18 + Math.round(rand() * 14);
      const img = document.createElement("canvas");
      img.width = w + 4;
      img.height = 9;
      const cg = img.getContext("2d");
      for (let k = 0; k < 4; k++) {
        const ccx = 3 + Math.round((k / 3) * (w - 4));
        const r = k === 1 || k === 2 ? 4 : 3;
        for (let dy = -r; dy <= 0; dy++) {
          for (let dx = -r; dx <= r; dx++) {
            if (dx * dx + dy * dy > r * r) continue;
            cg.fillStyle = dy === 0 ? c.cloud[1] : c.cloud[0];
            cg.fillRect(ccx + dx, 8 + dy, 1, 1);
          }
        }
      }
      return { img, x: rand() * W, y: Math.round(hz * (0.08 + i * 0.13)), v: 0.04 + rand() * 0.05 };
    });

    const stars = night
      ? Array.from({ length: Math.round((W * hz) / 380) }, () => ({ x: Math.floor(rand() * W), y: Math.floor(rand() * hz * 0.85) }))
      : [];
    const gulls = night
      ? []
      : [0, 1, 2].map((i) => ({ x: rand() * W, y: Math.round(hz * (0.2 + rand() * 0.35)), v: 0.3 + rand() * 0.25, p: i * 3 }));

    L = { c, night, hz, cx, CW, ty, by, wx, wingW, brickH, orbX, back, front, clouds, stars, gulls };
    if (!boatX) boatX = Math.round(W * 0.15);
  }

  function draw() {
    if (!L) return;
    const { c, hz } = L;
    ctx.drawImage(L.back, 0, 0);

    L.stars.forEach((st, i) => {
      if ((frame + i * 7) % 48 < 40) {
        ctx.fillStyle = i % 6 ? "#cfd6ff" : "#ffd23f";
        ctx.fillRect(st.x, st.y, 1, 1);
      }
    });
    L.clouds.forEach((cl) => {
      const span = W + cl.img.width;
      const x = ((cl.x + frame * cl.v) % span) - cl.img.width;
      ctx.drawImage(cl.img, Math.round(x), cl.y);
    });

    // Moving glints on the water, denser in the sun/moon path
    ctx.fillStyle = c.glint;
    const seaEnd = H - L.brickH;
    for (let y = hz + 2; y < seaEnd; y += 2) {
      for (let x = (y * 7) % 9; x < W; x += 9) {
        const near = Math.abs(x - L.orbX) < 4 + (y - hz) / 3;
        if ((x * 7 + y * 13 + frame) % (near ? 5 : 43) === 0) ctx.fillRect(x, y, 2, 1);
      }
    }

    // Yacht on the horizon, sliding behind the castle
    const bxr = Math.round(boatX);
    drawSprite(ctx, BOAT_SPRITE, bxr, hz - 4, { h: c.hull[0], s: c.hull[1], c: c.cabin });
    if (frame % 4 < 2) {
      ctx.fillStyle = c.glint;
      ctx.fillRect(bxr - 2, hz, 2, 1);
    }

    ctx.drawImage(L.front, 0, 0);

    L.gulls.forEach((gl) => {
      const x = ((gl.x + frame * gl.v) % (W + 10)) - 5;
      const y = gl.y + Math.round(Math.sin((frame + gl.p * 5) / 6) * 2);
      drawSprite(ctx, GULL_SPRITES[((frame >> 1) + gl.p) & 1], Math.round(x), y, { "#": c.bird });
    });
  }

  function tick() {
    timer = 0;
    if (!onScreen || document.hidden) return;
    frame++;
    boatX += 0.25;
    if (boatX > W + 2) boatX = -16;
    draw();
    timer = setTimeout(tick, 1000 / 12); // 12 fps, on purpose: it's 8-bit
  }

  function start() {
    if (still) {
      draw();
      return;
    }
    if (!timer) tick();
  }

  // Hit-test clicks on the background through the text block, ignoring real controls
  function sceneHit(e) {
    if (!L || e.target.closest("a, button, .portrait")) return null;
    const r = canvas.getBoundingClientRect();
    const x = (e.clientX - r.left) / P;
    const y = (e.clientY - r.top) / P;
    if (x >= boatX - 2 && x <= boatX + 16 && y >= L.hz - 7 && y <= L.hz + 3) return "ahoy";
    const right = L.wx === null ? L.cx + L.CW : L.wx + L.wingW;
    if (x >= L.cx && x <= right && y >= L.ty - 3 && y <= L.by) return "castle";
    return null;
  }
  hero.addEventListener("click", (e) => {
    const hit = sceneHit(e);
    if (hit) unlock(hit);
  });
  hero.addEventListener("pointermove", (e) => {
    hero.style.cursor = sceneHit(e) ? "pointer" : "";
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      if (onScreen) start();
    }).observe(hero);
  }
  if ("ResizeObserver" in window) {
    let pending = 0;
    new ResizeObserver(() => {
      cancelAnimationFrame(pending);
      pending = requestAnimationFrame(resize);
    }).observe(hero);
  } else {
    window.addEventListener("resize", resize);
  }
  new MutationObserver(() => {
    build();
    draw();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  document.addEventListener("visibilitychange", start);

  resize();
  start();
}

/**
 * 10. VISION LAB: confidence-threshold toy, plus "you are the model" (a 20-second tagging game)
 */
const LAB_OBJECTS = [
  { label: "drone", conf: 0.93, colors: { o: "#8fa2ff", "#": "#e8ecff", r: "#ff5b5b" },
    rows: ["oo.....oo", "oo.....oo", "..#...#..", "...###...", "...#r#...", "...###...", "..#...#..", "oo.....oo", "oo.....oo"] },
  { label: "cat", conf: 0.71, colors: { "#": "#1c1c28", y: "#ffd23f", w: "#3a3a4e" },
    rows: [".#...#....", ".##.##....", ".#####....", ".#y#y#...#", ".#####...#", "..####..#.", "..#######.", "..#w#..#w."] },
  { label: "hockey puck", conf: 0.57, colors: { "#": "#22222e", h: "#55556a" },
    rows: [".hhhhhh.", "hhhhhhhh", "########", ".######."] },
  { label: "fish", conf: 0.82, colors: { "#": "#5fd0c8", o: "#0b1030", d: "#3aa39c" },
    rows: ["....####....#", "..########.##", ".#o#########.", "..dddddddd.##", "....dddd....#"] },
  { label: "playing card", conf: 0.66, colors: { k: "#14213d", w: "#f6f7f9" },
    rows: ["kkkkkkk", "kwwwwwk", "kwwkwwk", "kwkkkwk", "kwkkkwk", "kwwkwwk", "kwwwwwk", "kkkkkkk"] },
  { label: "seagull", conf: 0.47, colors: { "#": "#f6f7f9", y: "#ffd23f" },
    rows: ["#.......#", ".##...##.", "...###y..", "....#...."] },
  { label: "car", conf: 0.88, colors: { "#": "#ff6b6b", w: "#cfe0ff", o: "#14213d" },
    rows: ["...#####...", "..#ww#ww#..", "###########", "###########", ".oo.....oo."] },
];
const LAB_GHOSTS = ["toaster", "person", "ufo", "hot dog", "traffic light"];

function initLab() {
  const canvas = document.getElementById("lab-arena");
  const input = document.getElementById("lab-thresh-input");
  const out = document.getElementById("lab-thresh-out");
  const threshWrap = document.getElementById("lab-thresh");
  const startBtn = document.getElementById("lab-start");
  const stats = document.getElementById("lab-stats");
  const note = document.getElementById("lab-note");
  const modeBtns = document.querySelectorAll("[data-mode]");
  if (!canvas || !canvas.getContext || !input) return;

  const ctx = canvas.getContext("2d");
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const autoNote = note ? note.textContent : "";
  let w = 0, h = 0, sc = 4;
  let mode = "auto";
  let thresh = Number(input.value);
  let objects = [], ghosts = [], effects = [];
  let round = null; // { endAt, score, misses }
  let raf = 0, last = 0, onScreen = false, statsText = "";

  function place(o) {
    o.x = Math.random() * Math.max(1, w - o.w);
    o.y = Math.random() * Math.max(1, h - o.h);
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    if (!w || !h) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
    sc = Math.max(3, Math.round(w / 110));
    if (!objects.length) {
      objects = LAB_OBJECTS.map((o, i) => {
        const angle = Math.random() * Math.PI * 2;
        return { ...o, phase: i * 1.7, vx: Math.cos(angle), vy: Math.sin(angle), speed: 22 + Math.random() * 26 };
      });
      ghosts = LAB_GHOSTS.map((label, i) => ({
        label,
        conf: 0.12 + Math.random() * 0.3,
        phase: i * 2.3,
        bw: 40 + Math.random() * 60,
        bh: 30 + Math.random() * 50,
        fx: Math.random(),
        fy: Math.random(),
      }));
    }
    objects.forEach((o) => {
      o.w = o.rows[0].length * sc;
      o.h = o.rows.length * sc;
      place(o);
    });
  }

  const confOf = (o, t) => Math.min(0.99, Math.max(0.01, o.conf + 0.08 * Math.sin(t / 900 + o.phase)));

  function box(x, y, bw, bh, color, label, dashed) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.setLineDash(dashed ? [5, 4] : []);
    ctx.strokeRect(x, y, bw, bh);
    ctx.setLineDash([]);
    if (!label) return;
    ctx.font = "600 11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    const tw = ctx.measureText(label).width + 10;
    const ly = y - 17 < 0 ? y + bh : y - 17;
    ctx.fillStyle = color;
    ctx.fillRect(x - 1, ly, tw, 17);
    ctx.fillStyle = "#14213d";
    ctx.fillText(label, x + 4, ly + 12);
  }

  function frame(now) {
    raf = 0;
    if (!onScreen || document.hidden) return;
    const dt = Math.min(0.05, (now - (last || now)) / 1000);
    last = now;

    const moving = round || !still;
    const speedMul = round ? 2.4 : 1;
    if (moving) {
      objects.forEach((o) => {
        o.x += o.vx * o.speed * speedMul * dt;
        o.y += o.vy * o.speed * speedMul * dt;
        if (o.x < 0 || o.x > w - o.w) { o.vx *= -1; o.x = Math.min(Math.max(o.x, 0), w - o.w); }
        if (o.y < 0 || o.y > h - o.h) { o.vy *= -1; o.y = Math.min(Math.max(o.y, 0), h - o.h); }
      });
    }

    // Radar backdrop
    ctx.fillStyle = "#0b1030";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#151e4f";
    for (let x = 0; x < w; x += 32) ctx.fillRect(x, 0, 1, h);
    for (let y = 0; y < h; y += 32) ctx.fillRect(0, y, w, 1);
    ctx.fillStyle = "rgba(140, 155, 255, 0.08)";
    ctx.fillRect(0, (now / 20) % h, w, 3);

    objects.forEach((o) => {
      o.rows.forEach((row, j) => {
        for (let i = 0; i < row.length; i++) {
          const col = o.colors[row[i]];
          if (!col) continue;
          ctx.fillStyle = col;
          ctx.fillRect(Math.round(o.x) + i * sc, Math.round(o.y) + j * sc, sc, sc);
        }
      });
    });

    let text = "";
    if (round) {
      const left = Math.max(0, round.endAt - now);
      text = `time ${(left / 1000).toFixed(1)}s · tagged ${round.score} · false positives ${round.misses}`;
      if (!left) endRound();
    } else if (mode === "auto") {
      let tp = 0, fp = 0;
      objects.forEach((o) => {
        const c = confOf(o, now);
        if (c >= thresh) {
          tp++;
          box(o.x - 4, o.y - 4, o.w + 8, o.h + 8, "#ffd23f", `${o.label} ${c.toFixed(2)}`);
        } else {
          box(o.x - 4, o.y - 4, o.w + 8, o.h + 8, "#6b7499", "missed", true);
        }
      });
      ghosts.forEach((gh) => {
        const c = confOf(gh, now);
        if (c < thresh) return;
        fp++;
        const gx = gh.fx * (w - gh.bw) + Math.sin(now / 2000 + gh.phase) * 10;
        const gy = gh.fy * (h - gh.bh) + Math.cos(now / 2400 + gh.phase) * 8;
        box(gx, gy, gh.bw, gh.bh, "#ff6b6b", `${gh.label} ${c.toFixed(2)}`);
      });
      const precision = tp + fp ? tp / (tp + fp) : 1;
      const recall = tp / objects.length;
      text = `TP ${tp} · FP ${fp} · FN ${objects.length - tp} · precision ${precision.toFixed(2)} · recall ${recall.toFixed(2)}`;
    } else {
      text = quest.best ? `best round: ${quest.best} tagged` : "press start, then click the objects";
    }

    effects = effects.filter((fx) => now - fx.at < 600);
    effects.forEach((fx) => box(fx.x, fx.y, fx.w, fx.h, fx.color, fx.label));

    if (stats && text !== statsText) {
      stats.textContent = text;
      statsText = text;
    }
    // Confidences wobble even when objects stand still, so repaint every frame while on screen
    raf = requestAnimationFrame(frame);
  }

  function run() {
    if (!raf && onScreen && w) {
      last = 0;
      raf = requestAnimationFrame(frame);
    }
  }

  function setMode(next) {
    if (round) return;
    mode = next;
    modeBtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === mode)));
    threshWrap.classList.toggle("hidden", mode !== "auto");
    startBtn.classList.toggle("hidden", mode !== "play");
    if (note) {
      note.textContent = mode === "auto"
        ? autoNote
        : "Your turn to be the detector. Click as many objects as you can in 20 seconds. Clicking empty space counts as a false positive.";
    }
  }

  function startRound() {
    round = { endAt: performance.now() + 20000, score: 0, misses: 0 };
    startBtn.disabled = true;
    startBtn.textContent = "Round running…";
    objects.forEach(place);
  }

  function endRound() {
    const { score, misses } = round;
    round = null;
    startBtn.disabled = false;
    startBtn.textContent = "Play again";
    const best = score > quest.best;
    if (best) {
      quest.best = score;
      saveQuest();
    }
    notify({
      kicker: best ? "New high score" : "Round over",
      title: `${score} tagged`,
      text: `${misses} false positive${misses === 1 ? "" : "s"}. Best: ${quest.best}.`,
      icon: "⊕",
      kind: "info",
    });
    if (score >= 10) unlock("sharp");
  }

  canvas.addEventListener("pointerdown", (e) => {
    if (!round) return;
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const now = performance.now();
    const pad = 6; // forgiving hitbox for touch
    const hit = objects.find((o) => x >= o.x - pad && x <= o.x + o.w + pad && y >= o.y - pad && y <= o.y + o.h + pad);
    if (hit) {
      round.score++;
      effects.push({ x: hit.x - 4, y: hit.y - 4, w: hit.w + 8, h: hit.h + 8, color: "#7cf29a", label: `${hit.label} +1`, at: now });
      place(hit);
    } else {
      round.misses++;
      effects.push({ x: x - 20, y: y - 20, w: 40, h: 40, color: "#ff6b6b", label: `background 0.0${1 + Math.floor(Math.random() * 9)}`, at: now });
    }
  });

  input.addEventListener("input", () => {
    thresh = Number(input.value);
    if (out) out.textContent = thresh.toFixed(2);
    unlock("tuner");
  });
  modeBtns.forEach((b) => b.addEventListener("click", () => setMode(b.dataset.mode)));
  startBtn.addEventListener("click", startRound);

  if ("ResizeObserver" in window) new ResizeObserver(() => { resize(); run(); }).observe(canvas);
  else window.addEventListener("resize", resize);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => {
      onScreen = entries[0].isIntersecting;
      run();
    }).observe(canvas);
  } else {
    onScreen = true;
  }
  document.addEventListener("visibilitychange", run);
  resize();
  run();
}
