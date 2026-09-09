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