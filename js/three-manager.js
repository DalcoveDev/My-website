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

export function registerScene(id, config) {
  if (!isWebGLSupported() || prefersReducedMotion()) {
    if (config.container) {
      createWebGLFallback(config.container);
    }
    return null;
  }

  const container = config.container;
  if (!container) return null;

  const width = container.clientWidth;
  const height = container.clientHeight;

  const renderer = new THREE.WebGLRenderer({
    alpha: config.alpha !== false,
    antialias: config.antialias !== false,
    powerPreference: 'low-power'
  });

  renderer.setSize(width, height);
  renderer.setPixelRatio(getMaxPixelRatio());
  renderer.setClearColor(config.clearColor || 0x000000, config.clearAlpha || 0);

  if (config.toneMapping) {
    renderer.toneMapping = config.toneMapping;
    renderer.toneMappingExposure = config.toneMappingExposure || 1;
  }

  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  if (config.fog) {
    scene.fog = new THREE.Fog(config.fog.color, config.fog.near, config.fog.far);
  }

  const camera = new THREE.PerspectiveCamera(config.fov || 50, width / height, config.near || 0.1, config.far || 1000);
  if (config.cameraPosition) {
    camera.position.set(config.cameraPosition.x || 0, config.cameraPosition.y || 0, config.cameraPosition.z || 5);
  }
  if (config.cameraLookAt) {
    camera.lookAt(new THREE.Vector3(config.cameraLookAt.x || 0, config.cameraLookAt.y || 0, config.cameraLookAt.z || 0));
  }

  const sceneData = {
    id,
    container,
    renderer,
    scene,
    camera,
    active: false,
    setup: config.setup || null,
    update: config.update || null,
    destroy: config.destroy || null,
    metadata: config.metadata || {}
  };

  if (config.setup) {
    config.setup(scene, camera, container);
  }

  scenes.set(id, sceneData);
  return sceneData;
}

export function activateScene(id) {
  const sceneData = scenes.get(id);
  if (sceneData) {
    sceneData.active = true;
  }
}

export function deactivateScene(id) {
  const sceneData = scenes.get(id);
  if (sceneData) {
    sceneData.active = false;
  }
}

export function destroyScene(id) {
  const sceneData = scenes.get(id);
  if (!sceneData) return;

  if (sceneData.destroy) {
    sceneData.destroy(sceneData.scene, sceneData.camera, sceneData.renderer);
  }

  cleanupRenderer(sceneData.renderer, sceneData.scene);
  scenes.delete(id);
}

export function getScene(id) {
  return scenes.get(id) || null;
}

export function destroyAllScenes() {
  scenes.forEach((_, id) => destroyScene(id));
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  isInitialized = false;
}

export function getMousePosition() {
  return { x: mouseX, y: mouseY };
}