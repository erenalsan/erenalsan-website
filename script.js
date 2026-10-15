'use strict';

/**
 * EREN ALSAN PORTFOLIO — SCRIPT.JS
 * Swiss-Minimalist Precision Interactions
 */

// Project Metadata Store for Full Interactive Modals
const PROJECTS_DATA = {
  'minimalframe': {
    title: 'Minimalframe',
    subtitle: 'Local-First Photo Processing & Formatting Engine',
    category: 'Cross-Platform PWA & Native Android',
    status: 'In Progress / Active Development',
    github: 'https://github.com/rnlsn326/minimalframe',
    image: 'assets/projects/minimalframe.jpg',
    stack: ['Svelte', 'Vite', 'Capacitor', 'HTML5 Canvas API', 'JSZip', 'JavaScript (ES6+)'],
    overview: 'Engineered a 100% local (offline-first), privacy-centric cross-platform photo editing and framing engine built for professional photographers with zero server dependencies.',
    architecture: [
      'Implemented a proxy-rendering architecture to eliminate mobile/low-end device bottlenecks, processing 24MP+ RAW/JPEG previews with GPU hardware acceleration to maintain a smooth 60fps UI experience.',
      'Developed a custom HTML5 Canvas rendering engine featuring dynamic aspect ratio calculations, automatic EXIF metadata parsing (camera model, focal length, aperture, shutter speed), typographic overlays, and custom watermark integration.',
      'Built an in-memory batch export pipeline using JSZip for one-click multi-image processing alongside a persistent preset system backed by localStorage.',
      'Packaged the zero-bloat web codebase into an optimized native Android application (.apk) using Capacitor.'
    ]
  },
  'gokbag': {
    title: 'Autonomous Military Support Drone (GÖKBAĞ)',
    subtitle: 'Tactical Reconnaissance & Autonomous Target Acquisition',
    category: 'Autonomous Systems & Computer Vision',
    status: 'Active Defense R&D',
    github: null,
    image: 'assets/projects/gokbag.jpg',
    stack: ['Python', 'YOLO', 'OpenCV', 'Embedded Systems'],
    overview: 'AI-powered tactical drone system designed for aerial reconnaissance, autonomous search-and-rescue navigation, and real-time object tracking.',
    architecture: [
      'Trained and optimized custom YOLO models for aerial friend-or-foe classification under varying light and thermal conditions.',
      'Integrated OpenCV video pipelines for real-time edge bounding box prediction with sub-50ms inference latency.',
      'Built robust fail-safe autonomous return-to-home procedures and GPS-waypoint tracking algorithms.'
    ]
  },
  'credit-ml': {
    title: 'Credit Eligibility ML Model',
    subtitle: 'Predictive Banking Risk Assessment Classifier',
    category: 'FinTech & Predictive Modeling',
    status: 'Completed Research Model',
    github: null,
    image: 'assets/projects/credit-ml.jpg',
    stack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Data Analysis'],
    overview: 'End-to-end machine learning pipeline built to assess creditworthiness and predict loan default risk on imbalanced financial datasets.',
    architecture: [
      'Conducted extensive exploratory data analysis and feature engineering on high-dimensional demographic and financial history data.',
      'Trained ensemble classifiers (Random Forest, Gradient Boosting) utilizing SMOTE and cross-validation to maximize precision and recall on high-risk borrowers.',
      'Documented model explainability metrics using SHAP values for regulatory transparency.'
    ]
  },
  'enterprise-apex': {
    title: 'Universal Polymer & Vita Global Services',
    subtitle: 'Production B2B Enterprise ERP Architecture',
    category: 'Enterprise Full-Stack Systems',
    status: 'Live Production',
    github: null,
    image: 'assets/projects/enterprise-apex.jpg',
    stack: ['Oracle APEX', 'JavaScript', 'REST API', 'Oracle SQL', 'PL/SQL'],
    overview: 'Comprehensive enterprise web applications supporting two international commercial operations with automated workflow pipelines.',
    architecture: [
      'Designed normalized relational schemas and high-throughput PL/SQL stored procedures for inventory movements and dynamic invoice generation.',
      'Built bi-directional REST integrations with WhatsApp API and email webhooks for instantaneous automated order notifications.',
      'Implemented real-time sales margin calculators to support dynamic pricing negotiations in live multi-currency B2B deals.'
    ]
  },
  'unity-pisti': {
    title: 'Unity Pişti Game & .NET 7 API',
    subtitle: 'Real-time Multiplayer Turkish Card Engine',
    category: 'Game Engineering & Distributed Backend',
    status: 'Production Graduation Capstone',
    github: null,
    image: 'assets/projects/unity-pisti.jpg',
    stack: ['Unity C#', '.NET 7 REST API', 'PostgreSQL', 'WebSockets'],
    overview: 'Multiplayer adaptation of the traditional Turkish card game (Pişti) pairing an interactive Unity client with a high-concurrency .NET 7 backend.',
    architecture: [
      'Engineered server-side authoritative card game logic in .NET 7 to prevent client-side desyncs and cheating.',
      'Built authenticated player profiles, matchmaking queues, and persistent leaderboards backed by PostgreSQL.',
      'Integrated smooth particle animations and responsive UI components in Unity C#.'
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  initThemeSwitch();
  initMobileNav();
  initProjectModals();
  initPhotoLightbox();
  initGokbagDroneMicroInteraction();
  initPistiCardMicroInteraction();
});

/**
 * 1. THEME SWITCHER (Dark / Light with LocalStorage Persistence)
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);

  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    document.body.classList.remove('dark');
    document.body.classList.add('light');
  } else {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    document.body.classList.add('dark');
    document.body.classList.remove('light');
  }

  localStorage.setItem('theme', theme);

  // Sync icon display
  const sunIcons = document.querySelectorAll('.theme-sun-icon');
  const moonIcons = document.querySelectorAll('.theme-moon-icon');
  if (theme === 'light') {
    sunIcons.forEach(i => i.style.setProperty('display', 'none', 'important'));
    moonIcons.forEach(i => i.style.setProperty('display', 'block', 'important'));
  } else {
    sunIcons.forEach(i => i.style.setProperty('display', 'block', 'important'));
    moonIcons.forEach(i => i.style.setProperty('display', 'none', 'important'));
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

function initThemeSwitch() {
  const desktopBtn = document.getElementById('theme-toggle');
  const mobileBtn = document.getElementById('mobile-theme-toggle');

  if (desktopBtn) desktopBtn.addEventListener('click', toggleTheme);
  if (mobileBtn) mobileBtn.addEventListener('click', toggleTheme);

  const initial = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(initial);
}

/**
 * 2. MOBILE NAVIGATION DRAWER
 */
function initMobileNav() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-nav');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

/**
 * 3. INTERACTIVE PROJECT MODAL OVERLAY
 */
function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const closeBtn = document.getElementById('modal-close-btn');
  const backdrop = modal ? modal.querySelector('.modal-backdrop') : null;

  if (!modal || !modalContent) return;

  function openModal(projectId) {
    const data = PROJECTS_DATA[projectId];
    if (!data) return;

    let githubBtnHtml = '';
    if (data.github) {
      githubBtnHtml = `
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-solid inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-medium rounded transition-all">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          <span>View on GitHub</span>
          <i data-lucide="external-link" class="w-3 h-3"></i>
        </a>
      `;
    }

    const techTagsHtml = data.stack.map(s => `<span class="tag-pill">${s}</span>`).join(' ');
    const bulletsHtml = data.architecture.map(b => `
      <li class="flex items-start gap-2 text-xs text-muted leading-relaxed">
        <span class="text-accent mt-0.5 font-mono">&gt;</span>
        <span class="text-main">${b}</span>
      </li>
    `).join('');

    modalContent.innerHTML = `
      <div>
        <div class="flex items-center justify-between gap-2 mb-2 font-mono text-[11px] text-muted">
          <span>${data.category}</span>
          <span class="text-accent font-medium">${data.status}</span>
        </div>
        <h3 id="modal-title" class="text-xl sm:text-2xl font-bold text-main tracking-tight mb-1">${data.title}</h3>
        <p class="font-mono text-xs text-accent mb-4">${data.subtitle}</p>
        <p class="text-xs text-muted leading-relaxed mb-4">${data.overview}</p>
      </div>

      <!-- Image Blueprint Box -->
      <div class="rounded border card-divider p-3 bg-black/20 text-center font-mono text-[11px] text-muted">
        <img 
          src="${data.image}" 
          alt="${data.title} Blueprint" 
          class="w-full h-44 object-cover rounded mb-2"
          onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');" 
        />
        <div class="hidden py-10 flex flex-col items-center justify-center gap-1.5">
          <i data-lucide="terminal" class="w-5 h-5 text-accent mb-1"></i>
          <span class="text-main font-medium">[ARCHITECTURAL BLUEPRINT PLACEHOLDER]</span>
          <span class="text-[10px] text-muted">${data.image}</span>
        </div>
      </div>

      <!-- Tech Stack -->
      <div>
        <div class="font-mono text-[11px] text-main font-semibold mb-2 uppercase tracking-wide">Technology Stack</div>
        <div class="flex flex-wrap gap-1.5">${techTagsHtml}</div>
      </div>

      <!-- Architectural Highlights -->
      <div>
        <div class="font-mono text-[11px] text-main font-semibold mb-2 uppercase tracking-wide">Key Architectural Highlights</div>
        <ul class="space-y-2">${bulletsHtml}</ul>
      </div>

      <!-- Footer Action -->
      <div class="pt-4 border-t card-divider flex items-center justify-between">
        ${githubBtnHtml}
        <button onclick="closeProjectModal()" class="btn-outline px-3.5 py-1.5 text-xs font-mono rounded cursor-pointer">
          Close
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    if (window.lucide) lucide.createIcons();
  }

  window.closeProjectModal = function() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.project-card[data-project]').forEach(card => {
    card.addEventListener('click', () => {
      const pId = card.getAttribute('data-project');
      openModal(pId);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.getAttribute('data-project'));
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', window.closeProjectModal);
  if (backdrop) backdrop.addEventListener('click', window.closeProjectModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      window.closeProjectModal();
    }
  });
}

/**
 * 4. PHOTOGRAPHY LIGHTBOX
 */
function initPhotoLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxFallback = document.getElementById('lightbox-fallback');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');
  const openVisualsBtn = document.getElementById('open-visuals-btn');
  const backdrop = lightbox ? lightbox.querySelector('.lightbox-backdrop') : null;
  const slides = [
    {
      src: 'assets/photography/photo1.jpg',
      alt: 'Architectural study in Passau',
      caption: 'Architectural Perspectives • Passau, Germany',
      fallback: 'Bavaria Architectural Study\nPassau • Germany\nISO 100 • 35mm • f/2.8'
    },
    {
      src: 'assets/photography/photo2.jpg',
      alt: 'Mediterranean coastline',
      caption: 'Mediterranean Coastlines • Aegean Water Solitude',
      fallback: 'Aegean Marine Landscapes\nCoastlines • Freediving Grounds\nISO 200 • 50mm • f/1.8'
    },
    {
      src: 'assets/photography/photo3.jpg',
      alt: 'Urban geometry',
      caption: 'Urban Geometry & Textures in the wild',
      fallback: 'Urban Silhouettes & Textures\nLight & Geometry Contrast\nISO 400 • 24mm • f/4.0'
    }
  ];

  if (!lightbox || !lightboxImg || !lightboxCaption || !lightboxFallback || !slides.length) return;

  let currentIndex = 0;
  let previousFocus = null;

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    const slide = slides[currentIndex];

    lightboxImg.classList.add('hidden');
    lightboxFallback.classList.add('hidden');
    lightboxImg.removeAttribute('src');
    lightboxImg.alt = slide.alt;
    lightboxFallback.textContent = slide.fallback;
    lightboxCaption.textContent = slide.caption;
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentIndex + 1} / ${slides.length}`;
    }

    const slideIndex = currentIndex;
    lightboxImg.onerror = () => {
      if (currentIndex !== slideIndex) return;
      lightboxImg.classList.add('hidden');
      lightboxFallback.classList.remove('hidden');
    };
    lightboxImg.onload = () => {
      if (currentIndex !== slideIndex) return;
      lightboxFallback.classList.add('hidden');
      lightboxImg.classList.remove('hidden');
    };
    lightboxImg.src = slide.src;
  }

  function openLightbox(index) {
    previousFocus = document.activeElement;
    showSlide(index);
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.add('hidden');
    lightboxImg.removeAttribute('src');
    document.body.style.overflow = '';
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  }

  function showPreviousSlide() {
    showSlide(currentIndex - 1);
  }

  function showNextSlide() {
    showSlide(currentIndex + 1);
  }

  if (openVisualsBtn) openVisualsBtn.addEventListener('click', () => openLightbox(0));
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', showPreviousSlide);
  if (nextBtn) nextBtn.addEventListener('click', showNextSlide);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPreviousSlide();
    if (e.key === 'ArrowRight') showNextSlide();
  });
}

/**
 * 5. CURSOR-FOLLOWER MICRO-INTERACTIONS (LERP trail inside card bounds)
 */
function initCursorFollower(cardId, followerId, ease, onMove) {
  const card = document.getElementById(cardId);
  const follower = document.getElementById(followerId);

  if (!card || !follower) return;

  let targetX = 50, targetY = 50;
  let currentX = 50, currentY = 50;
  let isHovered = false;
  let rafId = 0;

  follower.style.left = `${currentX}px`;
  follower.style.top = `${currentY}px`;

  // Loop only runs while hovered; rafId guards against double loops on quick re-entry
  function tick() {
    if (!isHovered) { rafId = 0; return; }
    currentX += (targetX - currentX) * ease;
    currentY += (targetY - currentY) * ease;
    follower.style.left = `${currentX}px`;
    follower.style.top = `${currentY}px`;
    rafId = requestAnimationFrame(tick);
  }

  card.addEventListener('mouseenter', () => {
    isHovered = true;
    if (!rafId) rafId = requestAnimationFrame(tick);
  });

  card.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    targetX = Math.max(20, Math.min(rect.width - 20, e.clientX - rect.left));
    targetY = Math.max(20, Math.min(rect.height - 20, e.clientY - rect.top));
    if (onMove) onMove(targetX, targetY);
  });
}

function initGokbagDroneMicroInteraction() {
  const hud = document.getElementById('drone-hud');
  initCursorFollower('gokbag-card', 'mini-drone', 0.12, (x, y) => {
    if (hud) hud.textContent = `RADAR: [X:${Math.round(x)} Y:${Math.round(y)}]`;
  });
}

function initPistiCardMicroInteraction() {
  // Slower ease than the drone so the card visibly trails the cursor
  initCursorFollower('pisti-card', 'pisti-card-follower', 0.07);
}

/**
 * 6. EMAIL COPY TRIGGER WITH TOAST
 */
window.copyEmail = async function() {
  const emailEl = document.getElementById('contact-email');
  const copyLabel = document.getElementById('copy-label');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');

  if (!emailEl) return;
  const email = emailEl.textContent.trim();

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(email);
    } else {
      throw new Error('Clipboard API unavailable');
    }
  } catch (err) {
    const input = document.createElement('input');
    input.value = email;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }

  if (copyLabel) copyLabel.textContent = 'Copied!';
  if (toast) {
    if (toastText) toastText.textContent = `Copied ${email} to clipboard!`;
    toast.classList.remove('toast-hidden');
    toast.classList.add('toast-visible');

    setTimeout(() => {
      toast.classList.remove('toast-visible');
      toast.classList.add('toast-hidden');
    }, 2500);
  }

  setTimeout(() => {
    if (copyLabel) copyLabel.textContent = 'Copy';
  }, 2200);
};
