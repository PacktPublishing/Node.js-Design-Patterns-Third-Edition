export function levelSubscribe (db) {
  db.subscribe = (pattern, listener) => { // ①
    db.on('put', (key, val) => { // ②
      const match = Object.keys(pattern).every(
        k => (pattern[k] === val[k]) // ③
      )
      if (match) {
        listener(key, val) // ④
      }
    })
  }

  return db
}
