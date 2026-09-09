/* ============================================
   HERO 3D SCENE — INTERACTIVE GEOMETRIC OBJECT
   ============================================ */

import * as THREE from 'three';
import { registerScene } from './three-manager.js';
import { lerp } from './three-utils.js';

const ACCENT_COLOR = new THREE.Color(0xc8ff00);

export function createHeroScene(container) {
  if (!container) return null;

  let mainGroup;
  let innerGroup;
  let outerRing;
  let particles;
  let currentMouseX = 0;
  let currentMouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let time = 0;

  return registerScene('hero', {
    container,
    alpha: true,
    antialias: true,
    clearColor: 0x000000,
    clearAlpha: 0,
    fov: 45,
    near: 0.1,
    far: 100,
    cameraPosition: { x: 0, y: 0, z: 6 },
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 1.2,

    setup(scene, _camera) {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
      mainLight.position.set(5, 5, 5);
      scene.add(mainLight);

      const accentLight = new THREE.PointLight(0xc8ff00, 0.8, 20);
      accentLight.position.set(-3, 2, 4);
      scene.add(accentLight);

      const rimLight = new THREE.PointLight(0x4488ff, 0.4, 15);
      rimLight.position.set(3, -2, -3);
      scene.add(rimLight);

      mainGroup = new THREE.Group();
      scene.add(mainGroup);

      const icoGeometry = new THREE.IcosahedronGeometry(1.2, 1);
      const icoMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1a1a1a,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        envMapIntensity: 1.5,
        wireframe: false
      });
      const icoMesh = new THREE.Mesh(icoGeometry, icoMaterial);
      mainGroup.add(icoMesh);

      const wireGeometry = new THREE.IcosahedronGeometry(1.25, 1);
      const wireMaterial = new THREE.MeshBasicMaterial({
        color: ACCENT_COLOR,
        wireframe: true,
        transparent: true,
        opacity: 0.15
      });
      const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
      mainGroup.add(wireMesh);

      innerGroup = new THREE.Group();
      mainGroup.add(innerGroup);

      const innerGeometry = new THREE.OctahedronGeometry(0.5, 0);
      const innerMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xc8ff00,
        metalness: 0.3,
        roughness: 0.2,
        emissive: 0xc8ff00,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.9
      });
      const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
      innerGroup.add(innerMesh);

      const ringGeometry = new THREE.TorusGeometry(1.8, 0.02, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: ACCENT_COLOR,
        transparent: true,
        opacity: 0.3
      });
      outerRing = new THREE.Mesh(ringGeometry, ringMaterial);
      outerRing.rotation.x = Math.PI * 0.5;
      mainGroup.add(outerRing);

      const secondRing = new THREE.Mesh(
        new THREE.TorusGeometry(2.0, 0.01, 16, 100),
        new THREE.MeshBasicMaterial({ color: 0x4488ff, transparent: true, opacity: 0.15 })
      );
      secondRing.rotation.x = Math.PI * 0.3;
      secondRing.rotation.y = Math.PI * 0.2;
      mainGroup.add(secondRing);

      const particleCount = 80;
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 2.5 + Math.random() * 1.5;

        positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = r * Math.cos(phi);
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particleMaterial = new THREE.PointsMaterial({
        color: ACCENT_COLOR,
        size: 0.03,
        transparent: true,
        opacity: 0.4,
        sizeAttenuation: true
      });

      particles = new THREE.Points(particleGeometry, particleMaterial);
      mainGroup.add(particles);
    },

    update(mx, my) {
      time += 0.01;

      targetMouseX = mx * 0.5;
      targetMouseY = my * 0.3;
      currentMouseX = lerp(currentMouseX, targetMouseX, 0.05);
      currentMouseY = lerp(currentMouseY, targetMouseY, 0.05);

      if (mainGroup) {
        mainGroup.rotation.y += 0.003;
        mainGroup.rotation.y += currentMouseX * 0.02;
        mainGroup.rotation.x = currentMouseY * 0.15;

        mainGroup.position.y = Math.sin(time * 0.5) * 0.05;
      }

      if (innerGroup) {
        innerGroup.rotation.x -= 0.008;
        innerGroup.rotation.z += 0.005;
        innerGroup.scale.setScalar(0.9 + Math.sin(time * 2) * 0.1);
      }

      if (outerRing) {
        outerRing.rotation.z += 0.002;
      }

      if (particles) {
        particles.rotation.y -= 0.001;
        particles.rotation.x += 0.0005;
      }
    }
  });
}