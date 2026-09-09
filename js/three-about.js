/* ============================================
   ABOUT 3D SCENE — ABSTRACT SCULPTURE
   ============================================ */

import * as THREE from 'three';
import { registerScene } from './three-manager.js';
import { lerp } from './three-utils.js';

const ACCENT = new THREE.Color(0xc8ff00);

export function createAboutScene(container) {
  if (!container) return null;

  let sculptureGroup;
  let time = 0;
  let _isVisible = false;
  let _currentOpacity = 0;
  let targetOpacity = 0;

  return registerScene('about', {
    container,
    alpha: true,
    antialias: true,
    clearColor: 0x000000,
    clearAlpha: 0,
    fov: 40,
    near: 0.1,
    far: 100,
    cameraPosition: { x: 0, y: 0, z: 5 },

    setup(scene, _camera) {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xffffff, 1.0);
      mainLight.position.set(3, 4, 5);
      scene.add(mainLight);

      const accentLight = new THREE.PointLight(0xc8ff00, 0.6, 15);
      accentLight.position.set(-2, 1, 3);
      scene.add(accentLight);

      const rimLight = new THREE.PointLight(0x6644ff, 0.3, 12);
      rimLight.position.set(2, -2, -2);
      scene.add(rimLight);

      sculptureGroup = new THREE.Group();
      scene.add(sculptureGroup);

      const torusKnotGeometry = new THREE.TorusKnotGeometry(0.8, 0.25, 128, 32);
      const torusKnotMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1a1a1a,
        metalness: 0.95,
        roughness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        transparent: true,
        opacity: 1
      });
      const torusKnot = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
      sculptureGroup.add(torusKnot);

      const wireGeometry = new THREE.TorusKnotGeometry(0.85, 0.27, 64, 16);
      const wireMaterial = new THREE.MeshBasicMaterial({
        color: ACCENT,
        wireframe: true,
        transparent: true,
        opacity: 0.08
      });
      const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
      sculptureGroup.add(wireMesh);

      const sphereGeometry = new THREE.SphereGeometry(0.15, 32, 32);
      const sphereMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xc8ff00,
        metalness: 0.3,
        roughness: 0.2,
        emissive: 0xc8ff00,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.9
      });

      const orbitCount = 5;
      for (let i = 0; i < orbitCount; i++) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
        const angle = (i / orbitCount) * Math.PI * 2;
        const radius = 1.4;
        sphere.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.3,
          Math.sin(angle) * radius
        );
        sphere.userData = { angle, radius, speed: 0.3 + i * 0.1 };
        sculptureGroup.add(sphere);
      }

      const ringGeometry = new THREE.RingGeometry(1.2, 1.22, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x4488ff,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI * 0.5;
      sculptureGroup.add(ring);
    },

    update(mx, my) {
      if (!sculptureGroup) return;

      time += 0.005;

      sculptureGroup.rotation.y += 0.002;
      sculptureGroup.rotation.x = my * 0.1;

      sculptureGroup.children.forEach((child) => {
        if (child.userData && child.userData.angle !== undefined) {
          const newAngle = child.userData.angle + time * child.userData.speed;
          const r = child.userData.radius;
          child.position.x = Math.cos(newAngle) * r;
          child.position.z = Math.sin(newAngle) * r;
          child.position.y = Math.sin(newAngle) * r * 0.3;
          child.scale.setScalar(0.8 + Math.sin(time * 2 + child.userData.angle) * 0.2);
        }
      });
    },

    metadata: {
      setVisible(v) {
        _isVisible = v;
        targetOpacity = v ? 1 : 0;
      },
      updateOpacity() {
        if (!sculptureGroup) return;
        _currentOpacity = lerp(_currentOpacity, targetOpacity, 0.05);
        sculptureGroup.traverse((obj) => {
          if (obj.material && obj.material.opacity !== undefined) {
            obj.material.opacity = _currentOpacity * (obj.material.userData?.baseOpacity || obj.material.opacity);
          }
        });
      }
    }
  });
}