import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import sqlite3 from 'sqlite3'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbInstance = new sqlite3.Database(join(__dirname, 'data.sqlite'))

const initQuery = `CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

dbInstance.run(initQuery, (err) => {
  if (err) {
    console.error('Cannot initialize database', err)
    process.exit(1)
  }
})

export const db = dbInstance
