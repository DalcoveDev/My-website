/* ============================================
   RESOURCE HUB — EDITORIAL ARCHIVE SCRIPT
   ============================================ */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { loadContent, getItems } from './content-loader.js';

gsap.registerPlugin(ScrollTrigger);

/* --- GLOBAL CONFIG --- */
const CONFIG = {
  ease: 'power3.out',
  easeIn: 'power3.in',
  easeInOut: 'power3.inOut',
  duration: 1,
  stagger: 0.08,
};

/* --- UTILITIES --- */
function isTouchDevice() {
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* --- CUSTOM CURSOR --- */
function initCursor() {
  if (isTouchDevice()) return;

  const cursor = document.getElementById('cursor');
  const dot = cursor.querySelector('.cursor-dot');
  const label = cursor.querySelector('.cursor-label');
  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  gsap.ticker.add(() => {
    gsap.set(cursor, { x: mouseX, y: mouseY });
  });

  document.querySelectorAll('[data-cursor]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('is-hovering');
      label.textContent = el.dataset.cursor;
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-hovering');
      label.textContent = '';
    });
  });
}

/* --- NAVIGATION --- */
function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('active');
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('active');
    });
  });
}

/* --- RESOURCE HUB DATA --- */
let resourceHubData = {
  tools: [
    { name: "VS Code", category: "Development", description: "A lightweight but powerful source code editor.", whyUseful: "My primary code editor with extensive extension support.", url: "https://code.visualstudio.com" },
    { name: "Figma", category: "Design", description: "A collaborative interface design tool.", whyUseful: "Essential for UI/UX design and prototyping.", url: "https://www.figma.com" },
    { name: "GitHub", category: "Development", description: "A platform for version control and collaboration.", whyUseful: "Used for all my project repositories and collaboration.", url: "https://github.com" },
    { name: "Vite", category: "Development", description: "A fast build tool for modern web projects.", whyUseful: "Lightning fast development server and build tool.", url: "https://vitejs.dev" },
    { name: "GSAP", category: "Development", description: "GreenSock Animation Platform for web animations.", whyUseful: "The animation library I use for cinematic experiences.", url: "https://greensock.com/gsap" },
    { name: "Blender", category: "Design", description: "A free and open-source 3D creation suite.", whyUseful: "For 3D modeling and creative technology projects.", url: "https://www.blender.org" },
    { name: "Notion", category: "Productivity", description: "A connected workspace for notes, tasks, and wikis.", whyUseful: "Perfect for organizing projects and documentation.", url: "https://www.notion.so" },
    { name: "Terminal", category: "Development", description: "Command-line interface for system operations.", whyUseful: "Essential for Git, package management, and scripting.", url: "" },
  ],
  didYouKnow: [
    { id: 1, content: "The first computer bug was an actual bug — a moth found trapped in a Harvard Mark II computer in 1947.", category: "Technology History", date: "2026-01-15" },
    { id: 2, content: "JavaScript was created in just 10 days by Brendan Eich in 1995, yet it became the most widely used programming language in the world.", category: "Development", date: "2026-02-10" },
    { id: 3, content: "The first website ever made is still online. It was created by Tim Berners-Lee at CERN in 1991.", category: "Web Development", date: "2026-03-05" },
    { id: 4, content: "CSS was first proposed by Håkon Wium Lie in 1994, and it took until 1996 for it to become a W3C recommendation.", category: "Web Development", date: "2026-04-20" },
    { id: 5, content: "The average webpage in 2025 weighs over 2MB, compared to just 14KB for the first website in 1991.", category: "Web Development", date: "2026-05-12" },
  ],
  repositories: [
    { name: "Portfolio Website", description: "A cinematic digital portfolio showcasing creative technology and web development work.", tags: ["HTML", "CSS", "JavaScript", "GSAP"], status: "Active", github: "https://github.com/dalcove", demo: "" },
    { name: "Interactive Data Platform", description: "A real-time data visualization platform with scroll-driven narratives.", tags: ["React", "D3.js", "Node.js"], status: "In Development", github: "https://github.com/dalcove", demo: "" },
    { name: "Digital Art Exhibition", description: "A curated online exhibition platform for digital artworks.", tags: ["HTML/CSS", "GSAP", "Canvas"], status: "Completed", github: "https://github.com/dalcove", demo: "" },
  ],
  library: [
    { name: "MDN Web Docs", category: "Documentation", description: "Comprehensive documentation for web technologies including HTML, CSS, and JavaScript.", url: "https://developer.mozilla.org" },
    { name: "GSAP Documentation", category: "Development", description: "Official documentation for GreenSock Animation Platform.", url: "https://greensock.com/docs" },
    { name: "Awwwards", category: "Design", description: "A platform showcasing the best in web design and development.", url: "https://www.awwwards.com" },
    { name: "CSS-Tricks", category: "Development", description: "Articles, tutorials, and techniques for web developers.", url: "https://css-tricks.com" },
    { name: "Coursera", category: "Learning", description: "Online courses from top universities and companies.", url: "https://www.coursera.org" },
    { name: "GitHub Explore", category: "Open Source", description: "Discover open source projects and repositories.", url: "https://github.com/explore" },
    { name: "Behance", category: "Design", description: "A platform for creative professionals to showcase their work.", url: "https://www.behance.net" },
    { name: "freeCodeCamp", category: "Learning", description: "Free coding courses and certifications.", url: "https://www.freecodecamp.org" },
  ]
};

async function refreshResourceHubData() {
  try {
    const loadedTools = getItems('tools');
    const loadedDYK = getItems('didYouKnow');
    const loadedRepos = getItems('repositories');
    const loadedLib = getItems('library');
    if (loadedTools.length > 0) resourceHubData.tools = loadedTools;
    if (loadedDYK.length > 0) resourceHubData.didYouKnow = loadedDYK;
    if (loadedRepos.length > 0) resourceHubData.repositories = loadedRepos;
    if (loadedLib.length > 0) resourceHubData.library = loadedLib;
  } catch {}
}

/* --- RESOURCE HUB --- */
function initResourceHub() {
  initTools();
  initDidYouKnow();
  initRepositories();
  initResources();
}

/* ============================================
   TOOLS — EDITORIAL INDEX ROWS
   ============================================ */

function renderToolRow(tool, index) {
  const num = String(index + 1).padStart(2, '0');
  const linkHtml = tool.url
    ? `<a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="rh-tool-action" data-cursor="OPEN">OPEN TOOL <span class="rh-tool-arrow">→</span></a>`
    : '';

  return `
    <div class="rh-tool-row" data-cursor="VIEW">
      <span class="rh-tool-num">${num}</span>
      <div class="rh-tool-main">
        <span class="rh-tool-category">${tool.category}</span>
        <h4 class="rh-tool-name">${tool.name}</h4>
      </div>
      <p class="rh-tool-desc">${tool.description}</p>
      ${linkHtml}
    </div>
  `;
}

function initTools() {
  const listEl = document.getElementById('rh-tools-list');
  const expandedListEl = document.getElementById('rh-tools-expanded-list');
  const viewMoreBtn = document.getElementById('rh-tools-view-more');
  const expandedEl = document.getElementById('rh-tools-expanded');
  const closeBtn = document.getElementById('rh-tools-close');

  if (!listEl) return;

  const primaryCount = 4;
  listEl.innerHTML = resourceHubData.tools.slice(0, primaryCount)
    .map((t, i) => renderToolRow(t, i)).join('');

  expandedListEl.innerHTML = resourceHubData.tools.slice(primaryCount)
    .map((t, i) => renderToolRow(t, i + primaryCount)).join('');

  viewMoreBtn.addEventListener('click', () => {
    expandedEl.classList.add('is-active');

    const newRows = expandedListEl.querySelectorAll('.rh-tool-row');
    gsap.fromTo(newRows,
      { opacity: 0, y: 20, clipPath: 'inset(0 0 100% 0)' },
      {
        opacity: 1,
        y: 0,
        clipPath: 'inset(0 0 0% 0)',
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      }
    );

    viewMoreBtn.style.display = 'none';

    // Re-init cursor on new elements
    if (!isTouchDevice()) {
      const cursor = document.getElementById('cursor');
      const label = cursor.querySelector('.cursor-label');
      newRows.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('is-hovering');
          label.textContent = el.dataset.cursor;
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('is-hovering');
          label.textContent = '';
        });
      });
    }
  });

  closeBtn.addEventListener('click', () => {
    const rows = expandedListEl.querySelectorAll('.rh-tool-row');
    gsap.to(rows, {
      opacity: 0,
      y: -15,
      duration: 0.3,
      stagger: 0.04,
      ease: 'power2.in',
      onComplete: () => {
        expandedEl.classList.remove('is-active');
        viewMoreBtn.style.display = '';
        gsap.set(rows, { opacity: 0, y: 0 });
      }
    });
  });
}

/* ============================================
   DID YOU KNOW — ARTISTIC VIEWER
   ============================================ */

function renderDidYouKnowItem(item) {
  const num = '#' + String(item.id).padStart(3, '0');
  const year = new Date(item.date).getFullYear();

  return `
    <div class="rh-dyk-item">
      <span class="rh-dyk-num">${num}</span>
      <p class="rh-dyk-content">${item.content}</p>
      <span class="rh-dyk-meta">DALCOVE / ${year}</span>
    </div>
  `;
}

function initDidYouKnow() {
  const activeEl = document.getElementById('rh-dyk-active');
  const prevBtn = document.getElementById('rh-dyk-prev');
  const nextBtn = document.getElementById('rh-dyk-next');
  const progressEl = document.getElementById('rh-dyk-progress');

  if (!activeEl) return;

  let currentIndex = 0;
  const total = resourceHubData.didYouKnow.length;

  function showItem(index, direction = 'next') {
    const outY = direction === 'next' ? -40 : 40;
    const inY = direction === 'next' ? 40 : -40;

    gsap.to(activeEl, {
      opacity: 0,
      y: outY,
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        activeEl.innerHTML = renderDidYouKnowItem(resourceHubData.didYouKnow[index]);
        progressEl.textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

        gsap.fromTo(activeEl,
          { opacity: 0, y: inY, clipPath: 'inset(100% 0 0 0)' },
          { opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)', duration: 0.55, ease: 'power3.out' }
        );
      }
    });
  }

  activeEl.innerHTML = renderDidYouKnowItem(resourceHubData.didYouKnow[0]);
  progressEl.textContent = `01 / ${String(total).padStart(2, '0')}`;

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + total) % total;
    showItem(currentIndex, 'prev');
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % total;
    showItem(currentIndex, 'next');
  });
}

/* ============================================
   REPOSITORIES — ARCHIVE INDEX ROWS
   ============================================ */

function renderRepoRow(repo, index) {
  const num = String(index + 1).padStart(2, '0');
  const tagsHtml = repo.tags.map(t => `<span>${t}</span>`).join('');

  return `
    <div class="rh-repo-row" data-cursor="VIEW">
      <span class="rh-repo-num">${num}</span>
      <div class="rh-repo-main">
        <h4 class="rh-repo-name">${repo.name}</h4>
        <div class="rh-repo-tags">${tagsHtml}</div>
        <p class="rh-repo-desc">${repo.description}</p>
      </div>
      <a href="${repo.github}" target="_blank" rel="noopener noreferrer" class="rh-repo-action" data-cursor="OPEN">GITHUB <span class="rh-repo-arrow">→</span></a>
    </div>
  `;
}

function initRepositories() {
  const listEl = document.getElementById('rh-repos-list');
  if (!listEl) return;

  listEl.innerHTML = resourceHubData.repositories
    .map((r, i) => renderRepoRow(r, i)).join('');

  // Init cursor on repo rows
  if (!isTouchDevice()) {
    const cursor = document.getElementById('cursor');
    const label = cursor.querySelector('.cursor-label');
    listEl.querySelectorAll('[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('is-hovering');
        label.textContent = el.dataset.cursor;
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-hovering');
        label.textContent = '';
      });
    });
  }
}

/* ============================================
   RESOURCES / REFERENCES — LIBRARY LIST
   ============================================ */

function renderResourceRow(resource) {
  const categorySlug = resource.category.toLowerCase().replace(/\s+/g, '-');

  return `
    <div class="rh-resource-row" data-category="${categorySlug}" data-cursor="VIEW">
      <div class="rh-resource-main">
        <span class="rh-resource-category">${resource.category}</span>
        <h4 class="rh-resource-name">${resource.name}</h4>
        <p class="rh-resource-desc">${resource.description}</p>
      </div>
      <a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="rh-resource-action" data-cursor="OPEN">OPEN <span class="rh-resource-arrow">→</span></a>
    </div>
  `;
}

function initResources() {
  const listEl = document.getElementById('rh-resources-list');
  const filterBtns = document.querySelectorAll('.rh-filter-btn');

  if (!listEl) return;

  listEl.innerHTML = resourceHubData.library
    .map(r => renderResourceRow(r)).join('');

  // Init cursor on resource rows
  if (!isTouchDevice()) {
    const cursor = document.getElementById('cursor');
    const label = cursor.querySelector('.cursor-label');
    listEl.querySelectorAll('[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('is-hovering');
        label.textContent = el.dataset.cursor;
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('is-hovering');
        label.textContent = '';
      });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;
      const items = listEl.querySelectorAll('.rh-resource-row');

      items.forEach(item => {
        const matches = filter === 'all' || item.dataset.category === filter;
        if (matches) {
          item.classList.remove('is-hidden');
          gsap.fromTo(item,
            { opacity: 0, y: 15, clipPath: 'inset(0 0 100% 0)' },
            { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.45, ease: 'power3.out' }
          );
        } else {
          item.classList.add('is-hidden');
        }
      });
    });
  });
}

/* ============================================
   SCROLL ANIMATIONS — EDITORIAL ENTRANCE
   ============================================ */

function initScrollAnimations() {
  if (prefersReducedMotion()) {
    gsap.set('.rh-hero-eyebrow, .rh-hero-title, .rh-hero-desc, .rh-hero-meta, .rh-section-header, .rh-tool-row, .rh-dyk-title, .rh-dyk-center, .rh-dyk-controls, .rh-repo-row, .rh-filters, .rh-resource-row', {
      opacity: 1, y: 0, clipPath: 'none'
    });
    return;
  }

  /* --- HERO --- */
  gsap.from('.rh-hero-eyebrow', {
    opacity: 0,
    y: 15,
    duration: 0.8,
    delay: 0.2,
  });

  gsap.from('.rh-hero-title', {
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.3,
  });

  gsap.from('.rh-hero-desc', {
    opacity: 0,
    y: 25,
    duration: 0.9,
    ease: 'power2.out',
    delay: 0.6,
  });

  gsap.from('.rh-hero-meta', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.8,
  });

  /* --- TOOLS SECTION --- */
  const toolsHeader = document.querySelector('#rh-tools .rh-section-header');
  if (toolsHeader) {
    gsap.from(toolsHeader, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#rh-tools',
        start: 'top 75%',
      }
    });
  }

  const toolRows = document.querySelectorAll('#rh-tools-list .rh-tool-row');
  if (toolRows.length) {
    gsap.from(toolRows, {
      opacity: 0,
      y: 20,
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#rh-tools-list',
        start: 'top 80%',
      }
    });
  }

  const viewMoreBtn = document.querySelector('#rh-tools-view-more');
  if (viewMoreBtn) {
    gsap.from(viewMoreBtn, {
      opacity: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: viewMoreBtn,
        start: 'top 90%',
      }
    });
  }

  /* --- DID YOU KNOW SECTION --- */
  gsap.from('.rh-dyk-title', {
    opacity: 0,
    x: -40,
    duration: 0.9,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#rh-did-you-know',
      start: 'top 70%',
    }
  });

  gsap.from('.rh-dyk-center', {
    opacity: 0,
    y: 30,
    duration: 0.9,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#rh-did-you-know',
      start: 'top 65%',
    }
  });

  gsap.from('.rh-dyk-controls', {
    opacity: 0,
    x: 30,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#rh-did-you-know',
      start: 'top 60%',
    }
  });

  /* --- REPOSITORIES SECTION --- */
  const reposHeader = document.querySelector('#rh-repositories .rh-section-header');
  if (reposHeader) {
    gsap.from(reposHeader, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#rh-repositories',
        start: 'top 75%',
      }
    });
  }

  const repoRows = document.querySelectorAll('#rh-repos-list .rh-repo-row');
  if (repoRows.length) {
    gsap.from(repoRows, {
      opacity: 0,
      y: 20,
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.6,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#rh-repos-list',
        start: 'top 80%',
      }
    });
  }

  /* --- RESOURCES SECTION --- */
  const resourcesHeader = document.querySelector('#rh-resources .rh-section-header');
  if (resourcesHeader) {
    gsap.from(resourcesHeader, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#rh-resources',
        start: 'top 75%',
      }
    });
  }

  gsap.from('#rh-filters', {
    opacity: 0,
    y: 15,
    duration: 0.6,
    scrollTrigger: {
      trigger: '#rh-filters',
      start: 'top 85%',
    }
  });

  const resourceRows = document.querySelectorAll('#rh-resources-list .rh-resource-row');
  if (resourceRows.length) {
    gsap.from(resourceRows, {
      opacity: 0,
      y: 20,
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#rh-resources-list',
        start: 'top 80%',
      }
    });
  }
}

/* --- INIT --- */
async function init() {
  await loadContent();
  await refreshResourceHubData();

  initNav();
  initCursor();
  initResourceHub();
  initScrollAnimations();
}

document.addEventListener('DOMContentLoaded', init);
