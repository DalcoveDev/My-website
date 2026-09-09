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
  
  try {
    const sections = [
      'services', 'testimonials', 'skills', 'tools', 'didYouKnow',
      'repositories', 'library', 'projects', 'gallery', 'visualField'
    ];
    
    const sectionCounts = {};
    let totalItems = 0;
    
    for (const section of sections) {
      const countResult = await sql`
        SELECT COUNT(*) as count FROM items WHERE section = ${section}
      `;
      const count = parseInt(countResult[0].count, 10);
      sectionCounts[section] = count;
      totalItems += count;
    }
    
    const settingsCount = await sql`SELECT COUNT(*) as count FROM settings`;
    const imagesCount = await sql`SELECT COUNT(*) as count FROM images`;
    
    const recentItems = await sql`
      SELECT section, updated_at 
      FROM items 
      ORDER BY updated_at DESC 
      LIMIT 5
    `;
    
    const analytics = {
      timestamp: new Date().toISOString(),
      database: {
        settings: parseInt(settingsCount[0].count, 10),
        items: totalItems,
        images: parseInt(imagesCount[0].count, 10)
      },
      sections: sectionCounts,
      recentActivity: recentItems.map(item => ({
        section: item.section,
        updatedAt: item.updated_at
      }))
    };
    
    return res.status(200).json(analytics);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch analytics', details: error.message });
  }
}