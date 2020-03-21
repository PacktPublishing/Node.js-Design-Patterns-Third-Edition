import { db } from './db.js'

db.connect()

async function updateLastAccess () {
  await db.query(`INSERT (${Date.now()}) INTO "LastAccesses"`)
}

updateLastAccess()
setTimeout(() => {
  updateLastAccess()
}, 600)
