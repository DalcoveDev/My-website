const rateLimitStore = new Map();

const DEFAULT_OPTIONS = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100,
  message: 'Too many requests, please try again later'
};

export function rateLimit(options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };
  
  return (req, res) => {
    const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    
    if (!rateLimitStore.has(clientIP)) {
      rateLimitStore.set(clientIP, { count: 1, resetTime: now + config.windowMs });
      setHeaders(res, config.maxRequests, config.maxRequests - 1, config.windowMs);
      return true;
    }
    
    const clientData = rateLimitStore.get(clientIP);
    
    if (now > clientData.resetTime) {
      clientData.count = 1;
      clientData.resetTime = now + config.windowMs;
      setHeaders(res, config.maxRequests, config.maxRequests - 1, config.windowMs);
      return true;
    }
    
    clientData.count++;
    
    const remaining = Math.max(0, config.maxRequests - clientData.count);
    setHeaders(res, config.maxRequests, remaining, Math.ceil((clientData.resetTime - now) / 1000));
    
    if (clientData.count > config.maxRequests) {
      res.status(429).json({ error: config.message });
      return false;
    }
    
    return true;
  };
}

function setHeaders(res, limit, remaining, reset) {
  res.setHeader('X-RateLimit-Limit', limit.toString());
  res.setHeader('X-RateLimit-Remaining', remaining.toString());
  res.setHeader('X-RateLimit-Reset', reset.toString());
}

export function cleanupOldEntries() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

setInterval(cleanupOldEntries, 5 * 60 * 1000);

export default rateLimit;