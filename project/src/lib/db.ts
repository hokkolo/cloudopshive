import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'cloudsopshive.mysql.database.azure.com',
  user: 'cloudops',
  password: 'CLOUDops@94',
  database: 'cloudopshive',
  ssl: {
    rejectUnauthorized: true
  }
});

export async function query(sql: string, params: any[] = []) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export async function createTables() {
  const queries = [
    `CREATE TABLE IF NOT EXISTS inquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      selected_plan VARCHAR(100) NOT NULL,
      requirements TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  ];

  for (const sql of queries) {
    try {
      await query(sql);
    } catch (error) {
      console.error('Error creating table:', error);
      throw error;
    }
  }
}

// Initialize tables
createTables().catch(console.error);