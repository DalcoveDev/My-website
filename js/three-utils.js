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