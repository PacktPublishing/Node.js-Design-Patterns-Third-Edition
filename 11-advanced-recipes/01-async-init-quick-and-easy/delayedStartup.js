import { db } from './db.js'

async function initialize () {
  db.connect()

  await new Promise((resolve) => {
    db.once('connected', resolve)
  })
}

async function updateLastAccess () {
  await db.query(`INSERT (${Date.now()}) INTO "LastAccesses"`)
}

initialize()
  .then(() => {
    updateLastAccess()
    setTimeout(() => {
      updateLastAccess()
    }, 600)
  })
