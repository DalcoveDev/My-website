/* ============================================
   SKILLS 3D SCENE — TECHNOLOGY CONSTELLATION
   ============================================ */

import * as THREE from 'three';
import { registerScene } from './three-manager.js';

const SKILL_NODES = [
  { label: 'JS', category: 'lang', position: [-2.5, 1.2, 0], color: 0xf7df1e },
  { label: 'PY', category: 'lang', position: [-2.8, -0.5, 0.5], color: 0x3776ab },
  { label: 'C++', category: 'lang', position: [-2.2, -1.5, -0.3], color: 0x00599c },
  { label: 'TS', category: 'lang', position: [-3.0, 0.3, -0.2], color: 0x3178c6 },
  { label: 'HTML', category: 'lang', position: [-1.8, 1.8, 0.2], color: 0xe34f26 },

  { label: 'React', category: 'framework', position: [0, 1.5, 0.5], color: 0x61dafb },
  { label: 'Next', category: 'framework', position: [0.5, 0.2, -0.3], color: 0xffffff },
  { label: 'GSAP', category: 'framework', position: [-0.3, -1.0, 0.4], color: 0x88ce02 },
  { label: 'Node', category: 'framework', position: [0.8, -1.8, -0.2], color: 0x339933 },
  { label: 'Tail', category: 'framework', position: [-0.5, 0.8, -0.5], color: 0x06b6d4 },

  { label: 'Git', category: 'tool', position: [2.5, 1.0, 0.3], color: 0xf05032 },
  { label: 'GH', category: 'tool', position: [2.8, -0.3, -0.2], color: 0xffffff },
  { label: 'SQL', category: 'tool', position: [2.2, -1.5, 0.5], color: 0x4479a1 },
  { label: 'MG', category: 'tool', position: [3.0, 0.5, -0.4], color: 0x47a248 },
  { label: 'Vite', category: 'tool', position: [2.0, 1.8, -0.1], color: 0xbd34fe },
];

const CONNECTIONS = [
  [0, 5], [0, 6], [0, 8],
  [1, 5], [1, 8],
  [2, 8],
  [3, 5], [3, 6],
  [4, 5], [4, 9],
  [5, 9], [5, 10],
  [6, 9], [6, 10],
  [7, 10], [7, 13],
  [8, 9],
  [10, 11], [10, 12],
  [11, 12], [11, 14],
  [12, 13], [12, 14],
  [13, 14],
];

export function createSkillsScene(container) {
  if (!container) return null;

  let constellationGroup;
  const nodes = [];
  const connectionLines = [];
  let time = 0;
  let isVisible = false;

  return registerScene('skills', {
    container,
    alpha: true,
    antialias: true,
    clearColor: 0x000000,
    clearAlpha: 0,
    fov: 50,
    near: 0.1,
    far: 100,
    cameraPosition: { x: 0, y: 0, z: 7 },

    setup(scene, _camera) {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0xc8ff00, 0.5, 20);
      pointLight.position.set(0, 3, 5);
      scene.add(pointLight);

      constellationGroup = new THREE.Group();
      scene.add(constellationGroup);

      SKILL_NODES.forEach((nodeData) => {
        const size = nodeData.category === 'lang' ? 0.12 : nodeData.category === 'framework' ? 0.1 : 0.08;

        let geometry;
        if (nodeData.category === 'lang') {
          geometry = new THREE.OctahedronGeometry(size, 0);
        } else if (nodeData.category === 'framework') {
          geometry = new THREE.IcosahedronGeometry(size, 0);
        } else {
          geometry = new THREE.BoxGeometry(size, size, size);
        }

        const material = new THREE.MeshPhysicalMaterial({
          color: nodeData.color,
          metalness: 0.4,
          roughness: 0.3,
          emissive: nodeData.color,
          emissiveIntensity: 0.2,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(...nodeData.position);
        constellationGroup.add(mesh);

        nodes.push({
          data: nodeData,
          mesh,
          basePosition: new THREE.Vector3(...nodeData.position),
          phase: Math.random() * Math.PI * 2
        });
      });

      CONNECTIONS.forEach(([a, b]) => {
        const points = [
          new THREE.Vector3(...SKILL_NODES[a].position),
          new THREE.Vector3(...SKILL_NODES[b].position)
        ];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x333333,
          transparent: true,
          opacity: 0.2
        });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        constellationGroup.add(line);
        connectionLines.push({ line, a, b });
      });
    },

    update(mx, my) {
      if (!constellationGroup || !isVisible) return;

      time += 0.008;

      constellationGroup.rotation.y = mx * 0.15 + time * 0.1;
      constellationGroup.rotation.x = my * 0.08;

      nodes.forEach((node) => {
        const floatY = Math.sin(time + node.phase) * 0.03;
        const floatX = Math.cos(time * 0.7 + node.phase) * 0.02;
        node.mesh.position.y = node.basePosition.y + floatY;
        node.mesh.position.x = node.basePosition.x + floatX;
        node.mesh.rotation.x += 0.005;
        node.mesh.rotation.y += 0.008;
      });

      connectionLines.forEach(({ line, a, b }) => {
        const posA = nodes[a].mesh.position;
        const posB = nodes[b].mesh.position;
        const positions = line.geometry.attributes.position.array;
        positions[0] = posA.x;
        positions[1] = posA.y;
        positions[2] = posA.z;
        positions[3] = posB.x;
        positions[4] = posB.y;
        positions[5] = posB.z;
        line.geometry.attributes.position.needsUpdate = true;
      });
    },

    metadata: {
      setVisible(v) { isVisible = v; }
    }
  });
}