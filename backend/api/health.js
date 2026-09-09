import sql from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'unknown',
    version: process.env.npm_package_version || '1.0.0'
  };
  
  try {
    await sql`SELECT 1`;
    healthCheck.database = 'connected';
  } catch (error) {
    healthCheck.database = 'disconnected';
    healthCheck.status = 'degraded';
    healthCheck.databaseError = error.message;
  }
  
  const statusCode = healthCheck.status === 'healthy' ? 200 : 503;
  
  return res.status(statusCode).json(healthCheck);
}