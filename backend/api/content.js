import sql from './db.js';

function verifyAuth(req) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return false;
  const token = auth.slice(7);
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    return decoded.startsWith('admin:');
  } catch {
    return false;
  }
}

async function ensureTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      id SERIAL PRIMARY KEY,
      key TEXT UNIQUE NOT NULL,
      value JSONB NOT NULL DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      section TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      data JSONB NOT NULL DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS images (
      id SERIAL PRIMARY KEY,
      filename TEXT NOT NULL,
      alt TEXT DEFAULT '',
      section TEXT,
      sort_order INTEGER DEFAULT 0,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  await ensureTables();

  if (req.method === 'GET') {
    try {
      const { section, limit, offset } = req.query;
      
      const settingsRows = await sql`SELECT key, value FROM settings`;
      const settings = {};
      for (const row of settingsRows) {
        settings[row.key] = row.value;
      }

      const sections = [
        'services', 'testimonials', 'skills', 'tools', 'didYouKnow',
        'repositories', 'library', 'projects', 'gallery', 'visualField'
      ];

      const targetSections = section ? [section] : sections;
      const items = {};
      const pagination = {};
      
      for (const sec of targetSections) {
        let rows;
        
        if (limit) {
          const limitNum = Math.min(parseInt(limit, 10) || 20, 100);
          const offsetNum = parseInt(offset, 10) || 0;
          
          const countResult = await sql`SELECT COUNT(*) as count FROM items WHERE section = ${sec}`;
          const total = parseInt(countResult[0].count, 10);
          
          rows = await sql`SELECT id, sort_order, data FROM items WHERE section = ${sec} ORDER BY sort_order ASC LIMIT ${limitNum} OFFSET ${offsetNum}`;
          
          pagination[sec] = {
            total,
            limit: limitNum,
            offset: offsetNum,
            hasMore: offsetNum + limitNum < total
          };
        } else {
          rows = await sql`SELECT id, sort_order, data FROM items WHERE section = ${sec} ORDER BY sort_order ASC`;
        }
        
        items[sec] = rows.map(r => ({ id: r.id, ...r.data }));
      }

      const imagesRows = await sql`SELECT id, filename, alt, section, sort_order FROM images ORDER BY sort_order ASC`;
      const images = imagesRows.map(r => ({ id: r.id, filename: r.filename, alt: r.alt, section: r.section }));

      const response = { settings, items, images };
      
      if (section && pagination[section]) {
        response.pagination = pagination[section];
      } else if (Object.keys(pagination).length > 0) {
        response.pagination = pagination;
      }

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch content', details: error.message });
    }
  }

  if (req.method === 'POST') {
    if (!verifyAuth(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const { settings, items, images } = req.body;

      if (settings) {
        for (const [key, value] of Object.entries(settings)) {
          await sql`
            INSERT INTO settings (key, value, updated_at)
            VALUES (${key}, ${value}::jsonb, NOW())
            ON CONFLICT (key) DO UPDATE SET value = ${value}::jsonb, updated_at = NOW()
          `;
        }
      }

      if (items) {
        for (const [section, sectionItems] of Object.entries(items)) {
          await sql`DELETE FROM items WHERE section = ${section}`;
          for (let i = 0; i < sectionItems.length; i++) {
            const item = sectionItems[i];
            const { id, ...data } = item;
            await sql`
              INSERT INTO items (section, sort_order, data)
              VALUES (${section}, ${i}, ${data}::jsonb)
            `;
          }
        }
      }

      if (images) {
        await sql`DELETE FROM images`;
        for (let i = 0; i < images.length; i++) {
          const img = images[i];
          await sql`
            INSERT INTO images (filename, alt, section, sort_order)
            VALUES (${img.filename}, ${img.alt || ''}, ${img.section || ''}, ${i})
          `;
        }
      }

      return res.status(200).json({ message: 'Content saved successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to save content', details: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
