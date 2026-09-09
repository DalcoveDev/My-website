/* ============================================
   WEBGL DETECTION UTILITIES
   ============================================ */

let webglSupported = null;
let webglContext = null;

export function isWebGLSupported() {
  if (webglSupported !== null) return webglSupported;

  try {
    const canvas = document.createElement('canvas');
    webglContext = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    webglSupported = !!webglContext;
  } catch {
    webglSupported = false;
  }

  return webglSupported;
}

export function getWebGLVersion() {
  if (!isWebGLSupported()) return 0;
  if (webglContext instanceof WebGL2RenderingContext) return 2;
  return 1;
}

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isLowPowerDevice() {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!gl) return true;

  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  if (!debugInfo) return false;

  const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  const lowPowerKeywords = ['integrated', 'intel', 'uhd', 'iris', 'vega', 'radeon pro', 'apple m1', 'apple m2'];
  const rendererLower = renderer.toLowerCase();

  return lowPowerKeywords.some(kw => rendererLower.includes(kw));
}

export function getMaxPixelRatio() {
  if (isLowPowerDevice()) return 1;
  if (window.innerWidth < 768) return 1.5;
  return Math.min(window.devicePixelRatio, 2);
}