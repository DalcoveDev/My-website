/* ============================================
   WEBGL DETECTION UTILITIES
   ============================================ */

let webglSupported = null;

export function isWebGLSupported() {
  if (webglSupported !== null) return webglSupported;

  try {
    const canvas = document.createElement('canvas');
    webglSupported = !!(canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    webglSupported = false;
  }

  return webglSupported;
}