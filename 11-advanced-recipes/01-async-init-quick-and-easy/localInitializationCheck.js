import { db } from './db.js'

db.connect()

async function updateLastAccess () {
  if (!db.connected) {
    await new Promise((resolve) => {
      db.once('connected', resolve)
    })
  }

  await db.query(`INSERT (${Date.now()}) INTO "LastAccesses"`)
}

updateLastAccess()
setTimeout(() => {
  updateLastAccess()
}, 600)
