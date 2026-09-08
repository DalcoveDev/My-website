import { writeFile, readdir } from 'fs/promises';
import { join, extname } from 'path';

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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const imagesDir = join(process.cwd(), 'images');
      const files = await readdir(imagesDir);
      const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif|webp|svg|JPG|JPEG|PNG|GIF|WEBP|SVG)$/i.test(f));
      return res.status(200).json({ images: imageFiles });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to list images', details: error.message });
    }
  }

  if (req.method === 'POST') {
    if (!verifyAuth(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      const body = Buffer.concat(chunks).toString();
      const boundary = req.headers['content-type']?.split('boundary=')[1];

      if (!boundary) {
        return res.status(400).json({ error: 'No boundary in content-type' });
      }

      const parts = body.split(`--${boundary}`);
      let filename = '';
      let fileData = null;

      for (const part of parts) {
        if (part.includes('Content-Disposition')) {
          const filenameMatch = part.match(/filename="(.+?)"/);
          if (filenameMatch) {
            filename = filenameMatch[1];
            const headerEnd = part.indexOf('\r\n\r\n') !== -1 ? part.indexOf('\r\n\r\n') : part.indexOf('\n\n');
            if (headerEnd !== -1) {
              const raw = part.slice(headerEnd + (part.includes('\r\n\r\n') ? 4 : 2));
              const endMarker = raw.lastIndexOf(`--${boundary}`);
              const content = endMarker !== -1 ? raw.slice(0, endMarker).trim() : raw.trim();
              fileData = Buffer.from(content, 'binary');
            }
          }
        }
      }

      if (!filename || !fileData) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const ext = extname(filename).toLowerCase();
      const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
      if (!allowed.includes(ext)) {
        return res.status(400).json({ error: 'File type not allowed' });
      }

      const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
      const uploadPath = join(process.cwd(), 'images', safeName);

      await writeFile(uploadPath, fileData);

      return res.status(200).json({ filename: safeName, message: 'Upload successful' });
    } catch (error) {
      return res.status(500).json({ error: 'Upload failed', details: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
