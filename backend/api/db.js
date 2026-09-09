import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is required');
}

const sql = neon(databaseUrl, {
  fullResults: false,
  fetchOptions: {
    cache: 'no-store'
  }
});

export async function testConnection() {
  try {
    await sql`SELECT 1`;
    return { success: true, message: 'Database connection successful' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function getConnectionInfo() {
  try {
    const result = await sql`SELECT current_database(), current_user, version()`;
    return {
      database: result[0].current_database,
      user: result[0].current_user,
      version: result[0].version
    };
  } catch {
    return null;
  }
}

export default sql;
