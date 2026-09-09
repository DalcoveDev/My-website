import sql from '../api/db.js';

export async function ensureTable(tableName, schema) {
  try {
    await sql.unsafe(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        ${schema}
      )
    `);
    return true;
  } catch (error) {
    console.error(`Failed to ensure table ${tableName}:`, error);
    return false;
  }
}

export async function tableExists(tableName) {
  try {
    const result = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = ${tableName}
      ) as exists
    `;
    return result[0].exists;
  } catch {
    return false;
  }
}

export async function getRowCount(tableName) {
  try {
    const result = await sql.unsafe(`SELECT COUNT(*) as count FROM ${tableName}`);
    return parseInt(result[0].count, 10);
  } catch {
    return 0;
  }
}

export async function truncateTable(tableName) {
  try {
    await sql.unsafe(`TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`);
    return true;
  } catch (error) {
    console.error(`Failed to truncate table ${tableName}:`, error);
    return false;
  }
}

export async function withTransaction(callback) {
  const client = await sql.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function paginate(query, limit = 20, offset = 0) {
  const limitedQuery = sql.unsafe(
    `${query} LIMIT ${parseInt(limit, 10)} OFFSET ${parseInt(offset, 10)}`
  );
  return limitedQuery;
}

export default {
  ensureTable,
  tableExists,
  getRowCount,
  truncateTable,
  withTransaction,
  paginate
};