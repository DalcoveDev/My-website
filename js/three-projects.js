/* ============================================
   PROJECTS 3D — CARD TILT EFFECT
   ============================================ */

import { isWebGLSupported, prefersReducedMotion, lerp } from './three-utils.js';

const cards = new Map();
let isActive = false;

export function initProjectTilt() {
  if (!isWebGLSupported() || prefersReducedMotion()) return;

  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach((card) => {
    const inner = card.querySelector('.project-card-inner');
    if (!inner) return;

    const state = {
      currentRotateX: 0,
      currentRotateY: 0,
      targetRotateX: 0,
      targetRotateY: 0,
      isHovering: false
    };

    cards.set(card, { inner, state });

    card.addEventListener('mouseenter', () => {
      state.isHovering = true;
    });

    card.addEventListener('mouseleave', () => {
      state.isHovering = false;
      state.targetRotateX = 0;
      state.targetRotateY = 0;
    });

    card.addEventListener('mousemove', (e) => {
      if (!state.isHovering) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      state.targetRotateY = deltaX * 3;
      state.targetRotateX = -deltaY * 3;
    });
  });

  isActive = true;
  animate();
}

function animate() {
  if (!isActive) return;

  requestAnimationFrame(animate);

  cards.forEach(({ inner, state }) => {
    state.currentRotateX = lerp(state.currentRotateX, state.targetRotateX, 0.08);
    state.currentRotateY = lerp(state.currentRotateY, state.targetRotateY, 0.08);

    if (Math.abs(state.currentRotateX) > 0.01 || Math.abs(state.currentRotateY) > 0.01) {
      inner.style.transform = `perspective(1000px) rotateX(${state.currentRotateX}deg) rotateY(${state.currentRotateY}deg)`;
    } else if (!state.isHovering) {
      inner.style.transform = '';
    }
  });
}

export function destroyProjectTilt() {
  isActive = false;
  cards.forEach(({ inner }) => {
    inner.style.transform = '';
  });
  cards.clear();
}