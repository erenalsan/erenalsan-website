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
  initThemeSwitch();
  initNav();
  initDetector();
  initTabTitle();
  initProjectModals();
  initPhotoLightbox();
  initGokbagDroneMicroInteraction();
  initPistiCardMicroInteraction();
  initReveal();
});

/**
 * SCROLL REVEAL: elements marked data-reveal (and the timeline line) fade up once as they enter.
 */
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
  });
}

/**
 * 2. NAV: turns transparent with white text while it sits over a blue block
 */
function initNav() {
  const nav = document.getElementById("site-header");
  const blueSections = document.querySelectorAll("section.on-blue");
  if (!nav || !blueSections.length) return;

  function update() {
    const y = nav.offsetHeight / 2;
    const overBlue = Array.from(blueSections).some((s) => {
      const r = s.getBoundingClientRect();
      return r.top <= y && r.bottom >= y;
    });
    nav.classList.toggle("nav--on-blue", overBlue);
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
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
  document.addEventListener("focusin", (e) => {
    const el = e.target.closest("[data-detect]");
    if (el) show(el);
    else hide();
  });

  // While scrolling, follow the target instantly instead of easing behind it
  window.addEventListener(
    "scroll",
    () => {
      if (!target) return;
      box.classList.add("is-snapping");
      place();
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => box.classList.remove("is-snapping"), 150);
    },
    { passive: true },
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
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(scan);
        }
      },
      { passive: true },
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
      
      resetTimeout = setTimeout(() => {
        document.title = original;
      }, 1500);
    }
  });
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
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }

  window.closeProjectModal = function () {
    modal.classList.add("hidden");
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

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
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
  }

  function openLightbox(index) {
    previousFocus = document.activeElement;
    showSlide(index);
    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    lightboxImg.removeAttribute("src");
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
    if (lightbox.classList.contains("hidden")) return;
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
  initCursorFollower("gokbag-card", "mini-drone", 0.12, (x, y) => {
    if (hud) hud.textContent = `tracking x ${Math.round(x)} y ${Math.round(y)}`;
  });
}

function initPistiCardMicroInteraction() {
  // Slower ease than the drone so the card visibly trails the cursor
  initCursorFollower("pisti-card", "pisti-card-follower", 0.07);
}

/**
 * 7. EMAIL COPY TRIGGER WITH TOAST
 */
window.copyEmail = async function () {
  const emailEl = document.getElementById("contact-email");
  const copyLabel = document.getElementById("copy-label");
  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toast-text");

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
  if (toast) {
    if (toastText) toastText.textContent = `Copied ${email}. Confidence you'll write: 1.00`;
    toast.classList.remove("toast-hidden");
    toast.classList.add("toast-visible");

    setTimeout(() => {
      toast.classList.remove("toast-visible");
      toast.classList.add("toast-hidden");
    }, 2500);
  }

  setTimeout(() => {
    if (copyLabel) copyLabel.textContent = "Copy email";
  }, 2200);
};
