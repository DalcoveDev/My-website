/* ============================================
   3D SCROLL INTEGRATION — GSAP + THREE.JS
   ============================================ */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isWebGLSupported, prefersReducedMotion } from './three-utils.js';
import { initSceneManager, activateScene, deactivateScene, getScene } from './three-manager.js';
import { createHeroScene } from './three-hero.js';
import { createSkillsScene } from './three-skills.js';
import { createAboutScene } from './three-about.js';
import { initProjectTilt, destroyProjectTilt } from './three-projects.js';

let is3DInitialized = false;

export function init3DScenes() {
  if (is3DInitialized) return;
  if (!isWebGLSupported() || prefersReducedMotion()) return;

  is3DInitialized = true;

  initSceneManager();

  const heroContainer = document.querySelector('.hero');
  if (heroContainer) {
    const wrapper = document.createElement('div');
    wrapper.className = 'hero-3d-container';
    heroContainer.insertBefore(wrapper, heroContainer.firstChild);
    createHeroScene(wrapper);

    gsap.to(wrapper, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => activateScene('hero'),
      onLeave: () => deactivateScene('hero'),
      onEnterBack: () => activateScene('hero'),
      onLeaveBack: () => deactivateScene('hero'),
    });
  }

  const aboutSection = document.querySelector('.about');
  if (aboutSection) {
    const wrapper = document.createElement('div');
    wrapper.className = 'about-3d-container';
    aboutSection.insertBefore(wrapper, aboutSection.firstChild);
    createAboutScene(wrapper);

    ScrollTrigger.create({
      trigger: '.about',
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        activateScene('about');
        const scene = getScene('about');
        if (scene && scene.metadata) scene.metadata.setVisible(true);
      },
      onLeave: () => {
        deactivateScene('about');
        const scene = getScene('about');
        if (scene && scene.metadata) scene.metadata.setVisible(false);
      },
      onEnterBack: () => {
        activateScene('about');
        const scene = getScene('about');
        if (scene && scene.metadata) scene.metadata.setVisible(true);
      },
      onLeaveBack: () => {
        deactivateScene('about');
        const scene = getScene('about');
        if (scene && scene.metadata) scene.metadata.setVisible(false);
      },
    });
  }

  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    const wrapper = document.createElement('div');
    wrapper.className = 'skills-3d-container';
    skillsSection.insertBefore(wrapper, skillsSection.firstChild);
    createSkillsScene(wrapper);

    ScrollTrigger.create({
      trigger: '.skills',
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        activateScene('skills');
        const scene = getScene('skills');
        if (scene && scene.metadata) scene.metadata.setVisible(true);
      },
      onLeave: () => {
        deactivateScene('skills');
        const scene = getScene('skills');
        if (scene && scene.metadata) scene.metadata.setVisible(false);
      },
      onEnterBack: () => {
        activateScene('skills');
        const scene = getScene('skills');
        if (scene && scene.metadata) scene.metadata.setVisible(true);
      },
      onLeaveBack: () => {
        deactivateScene('skills');
        const scene = getScene('skills');
        if (scene && scene.metadata) scene.metadata.setVisible(false);
      },
    });
  }

  initProjectTilt();
}