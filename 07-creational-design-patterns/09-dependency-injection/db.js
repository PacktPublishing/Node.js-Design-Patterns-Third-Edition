import sqlite3 from 'sqlite3'

export function createDb (dbFile) {
  return new sqlite3.Database(dbFile)
}
