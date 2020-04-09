import { EventEmitter } from 'events'

class DB extends EventEmitter {
  connected = false
  commandsQueue = []

  async query (queryString) {
    if (!this.connected) {
      console.log(`Request queued: ${queryString}`)

      return new Promise((resolve, reject) => {
        const command = () => {
          this.query(queryString)
            .then(resolve, reject)
        }
        this.commandsQueue.push(command)
      })
    }
    console.log(`Query executed: ${queryString}`)
  }

  connect () {
    // simulate the delay of the connection
    setTimeout(() => {
      this.connected = true
      this.emit('connected')
      this.commandsQueue.forEach(command => command())
      this.commandsQueue = []
    }, 500)
  }
}

export const db = new DB()
