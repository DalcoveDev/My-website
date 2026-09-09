/* ============================================
   3D SCENE MANAGER — CORE
   ============================================ */

import * as THREE from 'three';
import { isWebGLSupported, prefersReducedMotion } from './three-utils.js';

const scenes = new Map();
let isInitialized = false;