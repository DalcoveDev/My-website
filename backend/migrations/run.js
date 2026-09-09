import { readdir, readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { neon } from '@neondatabase/serverless';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

async function runMigrations() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('DATABASE_URL environment variable is required');
    process.exit(1);
  }
  
  const sql = neon(databaseUrl);
  
  console.log('Starting database migrations...');
  
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        applied_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;
    
    const appliedMigrations = await sql`SELECT name FROM migrations ORDER BY id`;
    const applied = new Set(appliedMigrations.map(r => r.name));
    
    const migrationFiles = await readdir(__dirname);
    const sqlFiles = migrationFiles
      .filter(f => extname(f) === '.sql' && /^\d+_/.test(f))
      .sort();
    
    let count = 0;
    
    for (const file of sqlFiles) {
      if (applied.has(file)) {
        console.log(`Skipping ${file} (already applied)`);
        continue;
      }
      
      console.log(`Applying ${file}...`);
      
      const migrationSql = await readFile(join(__dirname, file), 'utf-8');
      
      await sql.unsafe(migrationSql);
      
      await sql`INSERT INTO migrations (name) VALUES (${file})`;
      
      console.log(`Applied ${file}`);
      count++;
    }
    
    console.log(`Migrations complete. Applied ${count} new migration(s).`);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();