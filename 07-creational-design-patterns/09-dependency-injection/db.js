import sqlite3 from 'sqlite3'

const initQuery = `CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

export function makeDb (dbPath) {
  return new Promise((resolve, reject) => {
    const dbInstance = new sqlite3.Database(dbPath)
    dbInstance.run(initQuery, (err) => {
      if (err) {
        return reject(err)
      }

      resolve(dbInstance)
    })
  })
}
