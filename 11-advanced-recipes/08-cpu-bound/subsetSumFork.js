import { EventEmitter } from 'events'
import { ProcessPool } from './processPool.js'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const workers = new ProcessPool(join(__dirname, 'workers/processWorker.js'), 2)

export class SubsetSum extends EventEmitter {
  constructor (sum, set) {
    super()
    this.sum = sum
    this.set = set
  }

  async start () {
    const worker = await workers.acquire()
    worker.send({ sum: this.sum, set: this.set })

    const onMessage = msg => {
      if (msg.event === 'end') {
        worker.removeListener('message', onMessage)
        workers.release(worker)
      }

      this.emit(msg.event, msg.data)
    }

    worker.on('message', onMessage)
  }
}
