import { EventEmitter } from 'events'

class DB extends EventEmitter {
  connected = false

  connect () {
    // simulate the delay of the connection
    setTimeout(() => {
      db.connected = true
      this.emit('connected')
    }, 500)
  }

  async query (queryString) {
    if (!db.connected) {
      throw new Error('Not connected yet')
    }
    console.log(`Query executed: ${queryString}`)
  }
}

export const db = new DB()
