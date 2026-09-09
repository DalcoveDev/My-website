/* ============================================
   3D SCENE MANAGER — CORE
   ============================================ */

import * as THREE from 'three';
import { isWebGLSupported, prefersReducedMotion, getMaxPixelRatio, createWebGLFallback, cleanupRenderer, throttle } from './three-utils.js';

const scenes = new Map();
let isInitialized = false;
let rafId = null;
let mouseX = 0;
let mouseY = 0;

export function initSceneManager() {
  if (isInitialized) return;
  if (!isWebGLSupported() || prefersReducedMotion()) return;

  isInitialized = true;

  document.addEventListener('mousemove', throttle((e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  }, 16));

  startRenderLoop();
}

function startRenderLoop() {
  function animate() {
    rafId = requestAnimationFrame(animate);

    scenes.forEach((sceneData) => {
      if (!sceneData.active || !sceneData.renderer) return;

      if (sceneData.update) {
        sceneData.update(mouseX, mouseY);
      }

      sceneData.renderer.render(sceneData.scene, sceneData.camera);
    });
  }

  animate();
}