/* ============================================
   DALCOVE PORTFOLIO — CENTRALIZED ANIMATION SYSTEM
   ============================================ */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* --- GLOBAL CONFIG --- */
const CONFIG = {
  ease: 'power3.out',
  easeIn: 'power3.in',
  easeInOut: 'power3.inOut',
  duration: 1,
  stagger: 0.08,
};

/* --- UTILITIES --- */

function splitTextToChars(el) {
  const text = el.textContent;
  el.innerHTML = '';
  [...text].forEach(char => {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = char === ' ' ? '\u00A0' : char;
    el.appendChild(span);
  });
  return el.querySelectorAll('.char');
}

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

  /* Smooth scroll for nav links */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: target, offsetY: 80 },
          ease: 'power3.inOut',
        });
      }
    });
  });
}

/* --- PRELOADER --- */
function initPreloader() {
  return new Promise((resolve) => {
    const preloader = document.getElementById('preloader');
    const nameEl = document.getElementById('preloader-name');
    const subEl = preloader.querySelector('.preloader-sub');

    if (prefersReducedMotion()) {
      gsap.set(preloader, { opacity: 0 });
      document.body.classList.remove('loading');
      resolve();
      return;
    }

    document.body.classList.add('loading');
    const chars = splitTextToChars(nameEl);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.classList.remove('loading');
        resolve();
      }
    });

    tl.to(subEl, { opacity: 1, duration: 0.5, delay: 0.3 })
      .to(chars, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.4,
        stagger: 0.04,
        ease: 'power2.out',
      }, '-=0.2')
      .to(subEl, { opacity: 0, duration: 0.3 }, '+=0.5')
      .to(nameEl, {
        letterSpacing: '0.4em',
        duration: 0.8,
        ease: 'power2.inOut',
      }, '-=0.2')
      .to(preloader, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      }, '+=0.3');
  });
}

/* --- HERO --- */
function initHero() {
  const titleLine = document.querySelector('.hero-title-line');
  const subtitle = document.querySelector('.hero-subtitle');
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');

  if (prefersReducedMotion()) {
    gsap.set([titleLine, subtitle], { opacity: 1 });
    return;
  }

  const tl = gsap.timeline({ delay: 0.2 });

  tl.from(titleLine, {
    yPercent: 110,
    duration: 1.2,
    ease: 'power3.out',
  })
  .from(subtitle, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.5')
  .from(scrollIndicator, {
    opacity: 0,
    duration: 0.6,
  }, '-=0.3');

  /* Hero parallax on scroll */
  gsap.to('.hero-content', {
    yPercent: -30,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });
}

/* --- ABOUT --- */
function initAbout() {
  const image = document.querySelector('.about-image');
  const titleSpans = document.querySelectorAll('.about-title span');
  const texts = document.querySelectorAll('.about-text');
  const label = document.querySelector('.about .section-label');
  const linePath = document.querySelector('#about-line path');

  if (prefersReducedMotion()) {
    gsap.set([image, ...titleSpans, ...texts, label], { opacity: 1, clipPath: 'none', y: 0, filter: 'blur(0px)' });
    return;
  }

  /* Image reveal from left */
  gsap.to(image, {
    clipPath: 'inset(0 0% 0 0)',
    duration: 1.4,
    ease: 'power3.inOut',
    scrollTrigger: {
      trigger: '.about',
      start: 'top 70%',
      toggleActions: 'play none none none',
    }
  });

  /* Stagger content */
  gsap.from(label, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.about',
      start: 'top 60%',
    }
  });

  gsap.from(titleSpans, {
    opacity: 0,
    y: 40,
    filter: 'blur(4px)',
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.about-title',
      start: 'top 75%',
    }
  });

  gsap.from(texts, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.about-text',
      start: 'top 80%',
    }
  });

  /* SVG line draw */
  if (linePath) {
    const length = linePath.getTotalLength();
    gsap.set(linePath, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(linePath, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.about',
        start: 'top 50%',
        end: 'bottom 50%',
        scrub: true,
      }
    });
  }
}

/* --- SERVICES --- */
const servicesData = [
  { title: 'Software Development', desc: 'Custom software solutions built with modern technologies and thoughtful architecture.' },
  { title: 'Web Development', desc: 'Performant, responsive, and visually intentional web experiences.' },
  { title: 'Digital Media', desc: 'Creative media production blending technology with visual storytelling.' },
  { title: 'Creative Development', desc: 'Experimental and interactive digital experiences that push creative boundaries.' },
  { title: 'UI/UX Design', desc: 'User-centered interfaces that balance aesthetics with functionality.' },
  { title: 'Interactive Experiences', desc: 'Immersive digital installations and interactive web applications.' },
  { title: 'Content & Media Management', desc: 'Strategic content systems and media pipeline optimization.' },
  { title: 'Digital Solutions', desc: 'End-to-end digital strategy, implementation, and deployment.' },
];

function renderServiceItem(service, index) {
  return `
    <div class="service-item" data-cursor="VIEW">
      <span class="service-num">${String(index + 1).padStart(2, '0')}</span>
      <h3>${service.title}</h3>
      <p>${service.desc}</p>
    </div>
  `;
}

function initServices() {
  const listEl = document.getElementById('services-list');
  const expandedListEl = document.getElementById('services-expanded-list');
  const viewMoreBtn = document.getElementById('services-view-more');
  const expandedEl = document.getElementById('services-expanded');
  const closeBtn = document.getElementById('services-close');
  const title = document.querySelector('.services-title');
  const label = document.querySelector('.services .section-label');

  /* Render primary services (first 4) */
  const primaryCount = 4;
  listEl.innerHTML = servicesData.slice(0, primaryCount)
    .map((s, i) => renderServiceItem(s, i)).join('');

  /* Render all services in expanded view */
  expandedListEl.innerHTML = servicesData
    .map((s, i) => renderServiceItem(s, i)).join('');

  /* View More toggle */
  viewMoreBtn.addEventListener('click', () => {
    expandedEl.classList.add('is-active');
    gsap.fromTo(expandedEl, { opacity: 0 }, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
    gsap.from('.services-expanded-list .service-item', {
      opacity: 0,
      y: 30,
      duration: 0.5,
      stagger: 0.06,
      ease: 'power2.out',
      delay: 0.2,
    });
  });

  closeBtn.addEventListener('click', () => {
    gsap.to(expandedEl, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => expandedEl.classList.remove('is-active'),
    });
  });

  if (prefersReducedMotion()) {
    gsap.set([title, label], { opacity: 1, y: 0 });
    return;
  }

  gsap.from(label, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    scrollTrigger: {
      trigger: '.services',
      start: 'top 70%',
    }
  });

  gsap.from(title, {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.services',
      start: 'top 60%',
    }
  });

  gsap.from('.services-list .service-item', {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.services-list',
      start: 'top 80%',
    }
  });

  gsap.from(viewMoreBtn, {
    opacity: 0,
    duration: 0.6,
    scrollTrigger: {
      trigger: viewMoreBtn,
      start: 'top 90%',
    }
  });
}

/* --- PROJECTS --- */
function initProjects() {
  const intro = document.querySelector('.projects-intro');
  const introTitle = document.querySelector('.projects-intro-title');
  const introLabel = document.querySelector('.projects .section-label');
  const scrollHint = document.querySelector('.projects-scroll-hint');
  const stack = document.getElementById('projects-stack');
  const cards = document.querySelectorAll('.project-card');

  if (prefersReducedMotion()) {
    gsap.set([introTitle, introLabel, scrollHint, ...cards], { opacity: 1, y: 0 });
    return;
  }

  /* Intro animations */
  gsap.from(introLabel, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    scrollTrigger: { trigger: intro, start: 'top 70%' }
  });

  gsap.from(introTitle, {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: { trigger: intro, start: 'top 60%' }
  });

  gsap.from(scrollHint, {
    opacity: 0,
    duration: 0.6,
    scrollTrigger: { trigger: intro, start: 'top 50%' }
  });

  /* Stacked card-deck system
     Each card starts below the viewport (yPercent: 100)
     and slides up to cover the previous card as user scrolls.
     The stack is pinned so cards accumulate in view. */

  /* Set initial state: all cards below viewport */
  cards.forEach((card, i) => {
    if (i === 0) {
      /* First card is already visible */
      gsap.set(card, { yPercent: 0 });
    } else {
      /* Subsequent cards start below */
      gsap.set(card, { yPercent: 100 });
    }
  });

  /* Pin the stack and animate cards sliding up */
  ScrollTrigger.create({
    trigger: stack,
    start: 'top top',
    end: () => `+=${window.innerHeight * (cards.length - 1)}`,
    pin: true,
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const totalCards = cards.length;

      for (let i = 0; i < totalCards; i++) {
        const card = cards[i];
        if (i === 0) continue; /* First card stays put */

        /* Each card covers the previous one over a segment of total progress */
        const segmentStart = (i - 1) / (totalCards - 1);
        const segmentEnd = i / (totalCards - 1);
        const segmentProgress = Math.max(0, Math.min(1, (progress - segmentStart) / (segmentEnd - segmentStart)));

        /* Card slides from below (100%) to covering position (0%) */
        const yPercent = 100 - (segmentProgress * 100);
        gsap.set(card, { yPercent: yPercent });
      }
    }
  });
}

/* --- HORIZONTAL VISUAL FIELD --- */
function initVisualField() {
  const track = document.querySelector('.visual-field-track');
  const section = document.querySelector('.visual-field');
  const cards = document.querySelectorAll('.vf-card');

  if (!track || !section || prefersReducedMotion()) return;

  const totalScroll = track.scrollWidth - section.offsetWidth;

  gsap.to(track, {
    x: () => -totalScroll,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${totalScroll}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    }
  });

  /* Stagger cards entrance */
  gsap.from(cards, {
    opacity: 0,
    y: 40,
    rotation: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
    }
  });
}

/* --- GALLERY --- */
function initGallery() {
  const items = document.querySelectorAll('.gallery-item');
  const title = document.querySelector('.gallery-title');
  const label = document.querySelector('.gallery .section-label');

  if (prefersReducedMotion()) {
    gsap.set([title, label, ...items], { opacity: 1, y: 0 });
    return;
  }

  gsap.from(label, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    scrollTrigger: { trigger: '.gallery', start: 'top 70%' }
  });

  gsap.from(title, {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.gallery', start: 'top 60%' }
  });

  gsap.from(items, {
    opacity: 0,
    y: 60,
    scale: 0.95,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.gallery-grid',
      start: 'top 80%',
    }
  });
}

/* --- TESTIMONIALS --- */
const testimonialsData = [
  {
    quote: 'Dalcove brings a rare combination of technical precision and creative vision. Every project feels like a work of art.',
    name: 'Sarah Mensah',
    role: 'Creative Director, Lumina Studio',
  },
  {
    quote: 'Working with Dalcove transformed our digital presence. The attention to interaction and detail is unmatched.',
    name: 'Jean-Pierre Hakizimana',
    role: 'Founder, TechFlow Africa',
  },
  {
    quote: 'The immersive experience Dalcove created for our exhibition redefined what our visitors expected from digital art.',
    name: 'Amara Okafor',
    role: 'Curator, Digital Arts Festival',
  },
];

function renderTestimonial(data) {
  return `
    <div class="testimonial-item">
      <blockquote class="testimonial-quote">"${data.quote}"</blockquote>
      <div class="testimonial-author">
        <span class="testimonial-name">${data.name}</span>
        <span class="testimonial-role">${data.role}</span>
      </div>
    </div>
  `;
}

function initTestimonials() {
  const activeEl = document.getElementById('testimonial-active');
  const nextBtn = document.getElementById('testimonial-next');
  const progressEl = document.getElementById('testimonial-progress');
  const title = document.querySelector('.testimonials-title');
  const label = document.querySelector('.testimonials .section-label');

  let currentIndex = 0;
  const total = testimonialsData.length;

  function showTestimonial(index, direction = 'next') {
    const outY = direction === 'next' ? -30 : 30;
    const inY = direction === 'next' ? 30 : -30;

    gsap.to(activeEl, {
      opacity: 0,
      y: outY,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        activeEl.innerHTML = renderTestimonial(testimonialsData[index]);
        progressEl.textContent = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
        gsap.fromTo(activeEl,
          { opacity: 0, y: inY },
          { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
        );
      }
    });
  }

  /* Initial render */
  activeEl.innerHTML = renderTestimonial(testimonialsData[0]);
  progressEl.textContent = `01 / ${String(total).padStart(2, '0')}`;

  /* Next button */
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % total;
    showTestimonial(currentIndex, 'next');
  });

  if (prefersReducedMotion()) {
    gsap.set([title, label], { opacity: 1, y: 0 });
    return;
  }

  gsap.from(label, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    scrollTrigger: { trigger: '.testimonials', start: 'top 70%' }
  });

  gsap.from(title, {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.testimonials', start: 'top 60%' }
  });

  gsap.from('.testimonial-viewer', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.testimonial-viewer', start: 'top 85%' }
  });
}

/* --- CONTACT --- */
function initContact() {
  const title = document.querySelector('.contact-title');
  const titleSpans = document.querySelectorAll('.contact-title span');
  const label = document.querySelector('.contact .section-label');
  const formGroups = document.querySelectorAll('.form-group');
  const submitBtn = document.querySelector('.form-submit');
  const contactDetails = document.querySelectorAll('.contact-detail, .contact-social');

  if (prefersReducedMotion()) {
    gsap.set([label, ...titleSpans, ...formGroups, submitBtn, ...contactDetails], { opacity: 1, y: 0 });
    return;
  }

  gsap.from(label, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    scrollTrigger: { trigger: '.contact', start: 'top 70%' }
  });

  gsap.from(titleSpans, {
    opacity: 0,
    y: 60,
    filter: 'blur(4px)',
    duration: 1,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: { trigger: title, start: 'top 75%' }
  });

  gsap.from(formGroups, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.contact-form', start: 'top 80%' }
  });

  gsap.from(submitBtn, {
    opacity: 0,
    y: 20,
    duration: 0.6,
    scrollTrigger: { trigger: submitBtn, start: 'top 90%' }
  });

  gsap.from(contactDetails, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.contact-info', start: 'top 80%' }
  });
}

/* --- SKILLS DATA --- */
const skillsData = {
  languages: [
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", experience: "ADD EXPERIENCE", usedFor: "Interactive web applications", extra: "Frontend / Backend / Full-stack" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", experience: "ADD EXPERIENCE", usedFor: "Automation, data processing, scripting", extra: "Backend / Automation" },
    { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", experience: "ADD EXPERIENCE", usedFor: "Systems programming, performance-critical applications", extra: "Systems / Performance" },
    { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", experience: "ADD EXPERIENCE", usedFor: "Semantic markup and web structure", extra: "Web Fundamentals" },
    { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", experience: "ADD EXPERIENCE", usedFor: "Visual design, layouts, animations", extra: "Styling / Layout" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", experience: "ADD EXPERIENCE", usedFor: "Type-safe JavaScript development", extra: "Frontend / Backend" },
  ],
  frameworks: [
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", experience: "ADD EXPERIENCE", usedFor: "Interactive web applications", extra: "Frontend / UI / Component Architecture" },
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", experience: "ADD EXPERIENCE", usedFor: "Full-stack React applications", extra: "SSR / SSG / Full-stack" },
    { name: "GSAP", logo: "https://raw.githubusercontent.com/nicedoc/gsap-logo/master/gsap-logo.svg", experience: "ADD EXPERIENCE", usedFor: "Cinematic animations and scroll-driven experiences", extra: "Animation / Scroll / Motion" },
    { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", experience: "ADD EXPERIENCE", usedFor: "Backend APIs and server-side logic", extra: "Backend / APIs" },
    { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", experience: "ADD EXPERIENCE", usedFor: "Utility-first styling and rapid UI development", extra: "Styling / Design Systems" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", experience: "ADD EXPERIENCE", usedFor: "Server-side JavaScript runtime", extra: "Backend / Runtime" },
  ],
  tools: [
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", experience: "ADD EXPERIENCE", usedFor: "Version control and collaboration", extra: "Version Control" },
    { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", experience: "ADD EXPERIENCE", usedFor: "Code hosting and collaboration", extra: "Collaboration / CI/CD" },
    { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", experience: "ADD EXPERIENCE", usedFor: "Relational database management", extra: "Database / SQL" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", experience: "ADD EXPERIENCE", usedFor: "Advanced relational database operations", extra: "Database / SQL" },
    { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", experience: "ADD EXPERIENCE", usedFor: "NoSQL document-based database", extra: "Database / NoSQL" },
    { name: "PocketBase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pocketbase/pocketbase-original.svg", experience: "ADD EXPERIENCE", usedFor: "Lightweight backend-as-a-service", extra: "Backend / BaaS" },
    { name: "Vite", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg", experience: "ADD EXPERIENCE", usedFor: "Frontend build tooling and dev server", extra: "Build / Tooling" },
  ],
};

/* --- SKILLS --- */
function initSkills() {
  const wall = document.getElementById('skills-wall');
  if (!wall) return;

  const columns = [
    { el: document.getElementById('skills-col-1'), track: document.querySelector('#skills-col-1 .skills-track'), data: skillsData.languages, dir: 1, speed: 1 },
    { el: document.getElementById('skills-col-2'), track: document.querySelector('#skills-col-2 .skills-track'), data: skillsData.frameworks, dir: -1, speed: 0.7 },
    { el: document.getElementById('skills-col-3'), track: document.querySelector('#skills-col-3 .skills-track'), data: skillsData.tools, dir: 1, speed: 1.2 },
  ];

  const infoPanel = document.getElementById('skills-info-panel');
  const infoName = document.getElementById('skills-info-name');
  const infoExp = document.getElementById('skills-info-exp');
  const infoUsed = document.getElementById('skills-info-used');
  const infoExtra = document.getElementById('skills-info-extra');
  const infoExtraRow = document.getElementById('skills-info-extra-row');

  if (prefersReducedMotion()) {
    columns.forEach(col => {
      col.data.forEach(skill => col.track.appendChild(createSkillItem(skill)));
    });
    return;
  }

  /* Build items — store skill data index on each item */
  columns.forEach(col => {
    col.data.forEach((skill, i) => {
      const item = createSkillItem(skill);
      item.dataset.skillIdx = i;
      col.track.appendChild(item);
    });
    /* Duplicate sets for seamless loop */
    const html = col.track.innerHTML;
    col.track.insertAdjacentHTML('beforeend', html);
    col.track.insertAdjacentHTML('beforeend', html);
  });

  /* Create GSAP animations */
  const animations = columns.map(col => {
    const itemH = col.track.querySelector('.skill-item').offsetHeight + 24;
    const totalH = col.data.length * itemH;
    return gsap.to(col.track, {
      y: col.dir === 1 ? -totalH : totalH,
      duration: totalH / (25 * col.speed),
      ease: 'none',
      repeat: -1,
    });
  });

  /* Hover interactions */
  let activeItem = null;
  let activeColIdx = -1;

  function showInfo(skill, item, colIdx) {
    if (activeItem === item) return;
    if (activeItem) hideInfo();

    activeItem = item;
    activeColIdx = colIdx;

    infoName.textContent = skill.name;
    infoExp.textContent = skill.experience;
    infoUsed.textContent = skill.usedFor;

    if (skill.extra) {
      infoExtra.textContent = skill.extra;
      infoExtraRow.style.display = '';
    } else {
      infoExtraRow.style.display = 'none';
    }

    infoPanel.classList.add('is-visible');
    animations[colIdx].pause();
    item.classList.add('is-active');

    const rect = item.getBoundingClientRect();
    const panelW = 240;
    let left = rect.right + 16;
    let top = rect.top;
    if (left + panelW > window.innerWidth) left = rect.left - panelW - 16;
    if (top + 140 > window.innerHeight) top = window.innerHeight - 160;
    infoPanel.style.left = left + 'px';
    infoPanel.style.top = top + 'px';
  }

  function hideInfo() {
    if (!activeItem) return;
    activeItem.classList.remove('is-active');
    activeItem = null;
    infoPanel.classList.remove('is-visible');
    if (activeColIdx >= 0) {
      animations[activeColIdx].resume();
      activeColIdx = -1;
    }
  }

  /* Attach hover events */
  columns.forEach((col, colIdx) => {
    col.track.querySelectorAll('.skill-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        const idx = parseInt(item.dataset.skillIdx, 10);
        showInfo(col.data[idx], item, colIdx);
      });
      item.addEventListener('mouseleave', hideInfo);
    });
  });

  /* Touch support */
  wall.addEventListener('click', (e) => {
    const item = e.target.closest('.skill-item');
    if (!item) { hideInfo(); return; }

    const colIdx = columns.findIndex(col => col.track.contains(item));
    if (colIdx < 0) return;

    if (activeItem === item) { hideInfo(); return; }

    const idx = parseInt(item.dataset.skillIdx, 10);
    showInfo(columns[colIdx].data[idx], item, colIdx);
  });
}

function createSkillItem(skill) {
  const item = document.createElement('div');
  item.className = 'skill-item';
  item.setAttribute('tabindex', '0');
  item.setAttribute('role', 'button');
  item.setAttribute('aria-label', skill.name);

  const logoWrap = document.createElement('div');
  logoWrap.className = 'skill-logo-wrap';

  const img = document.createElement('img');
  img.className = 'skill-logo';
  img.src = skill.logo;
  img.alt = skill.name;
  img.loading = 'lazy';
  img.onerror = () => {
    img.style.display = 'none';
    const fallback = document.createElement('span');
    fallback.className = 'skill-logo-fallback';
    fallback.textContent = skill.name.charAt(0);
    logoWrap.appendChild(fallback);
  };

  logoWrap.appendChild(img);
  item.appendChild(logoWrap);

  const name = document.createElement('span');
  name.className = 'skill-name';
  name.textContent = skill.name;
  item.appendChild(name);

  return item;
}

/* --- CONTACT FORM --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Message Sent';
    btn.style.pointerEvents = 'none';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.pointerEvents = '';
      form.reset();
    }, 2500);
  });
}

/* --- INIT --- */
async function init() {
  await initPreloader();
  initNav();
  initCursor();
  initHero();
  initAbout();
  initServices();
  initProjects();
  initVisualField();
  initSkills();
  initGallery();
  initTestimonials();
  initContact();
  initContactForm();

  /* Refresh ScrollTrigger after all sections are set up */
  ScrollTrigger.refresh();
}

document.addEventListener('DOMContentLoaded', init);
