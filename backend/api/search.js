import sql from './db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { q, section, limit = '20', offset = '0' } = req.query;
  
  if (!q || q.trim().length === 0) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  const searchTerm = `%${q.toLowerCase()}%`;
  const limitNum = Math.min(parseInt(limit, 10) || 20, 100);
  const offsetNum = parseInt(offset, 10) || 0;
  
  try {
    const results = [];
    
    const sections = section ? [section] : [
      'services', 'testimonials', 'skills', 'tools', 'didYouKnow',
      'repositories', 'library', 'projects', 'gallery', 'visualField'
    ];
    
    for (const sec of sections) {
      const rows = await sql`
        SELECT id, section, sort_order, data 
        FROM items 
        WHERE section = ${sec} 
        AND LOWER(data::text) LIKE ${searchTerm}
        ORDER BY sort_order ASC
        LIMIT ${limitNum}
        OFFSET ${offsetNum}
      `;
      
      for (const row of rows) {
        results.push({
          id: row.id,
          section: row.section,
          sortOrder: row.sort_order,
          data: row.data,
          relevance: calculateRelevance(row.data, q)
        });
      }
    }
    
    results.sort((a, b) => b.relevance - a.relevance);
    
    const paginatedResults = results.slice(0, limitNum);
    
    return res.status(200).json({
      query: q,
      total: results.length,
      limit: limitNum,
      offset: offsetNum,
      results: paginatedResults
    });
  } catch (error) {
    return res.status(500).json({ error: 'Search failed', details: error.message });
  }
}

function calculateRelevance(data, query) {
  const jsonStr = JSON.stringify(data).toLowerCase();
  const queryLower = query.toLowerCase();
  let score = 0;
  
  let index = jsonStr.indexOf(queryLower);
  while (index !== -1) {
    score += 10;
    index = jsonStr.indexOf(queryLower, index + 1);
  }
  
  if (data.title && data.title.toLowerCase().includes(queryLower)) score += 20;
  if (data.name && data.name.toLowerCase().includes(queryLower)) score += 20;
  if (data.desc && data.desc.toLowerCase().includes(queryLower)) score += 15;
  if (data.description && data.description.toLowerCase().includes(queryLower)) score += 15;
  
  return score;
}