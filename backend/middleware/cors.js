const CORS_CONFIG = {
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400
};

export function setCorsHeaders(res, options = {}) {
  const config = { ...CORS_CONFIG, ...options };
  
  res.setHeader('Access-Control-Allow-Origin', config.origin);
  res.setHeader('Access-Control-Allow-Methods', config.methods.join(', '));
  res.setHeader('Access-Control-Allow-Headers', config.allowedHeaders.join(', '));
  res.setHeader('Access-Control-Max-Age', config.maxAge.toString());
  
  return res;
}

export function handleCorsOptions(req, res) {
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    return res.status(200).end();
  }
  return null;
}

export default { setCorsHeaders, handleCorsOptions };