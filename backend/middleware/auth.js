export function verifyAuth(req) {
  const auth = req.headers.authorization;
  
  if (!auth || !auth.startsWith('Bearer ')) {
    return { valid: false, error: 'No authorization header' };
  }
  
  const token = auth.slice(7);
  
  if (!token) {
    return { valid: false, error: 'Empty token' };
  }
  
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    
    if (!decoded.startsWith('admin:')) {
      return { valid: false, error: 'Invalid token format' };
    }
    
    const timestamp = parseInt(decoded.split(':')[1], 10);
    
    if (isNaN(timestamp)) {
      return { valid: false, error: 'Invalid token timestamp' };
    }
    
    const tokenAge = Date.now() - timestamp;
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (tokenAge > maxAge) {
      return { valid: false, error: 'Token expired' };
    }
    
    return { valid: true, admin: true };
  } catch {
    return { valid: false, error: 'Invalid token' };
  }
}

export function requireAuth(req, res) {
  const authResult = verifyAuth(req);
  
  if (!authResult.valid) {
    res.status(401).json({ error: 'Unauthorized', details: authResult.error });
    return false;
  }
  
  return true;
}

export default { verifyAuth, requireAuth };