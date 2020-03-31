import { EventEmitter } from 'events'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { Worker } from 'worker_threads'

const __dirname = dirname(fileURLToPath(import.meta.url))
const workerFile = join(__dirname, 'workers/threadWorker.js')

export class SubsetSum extends EventEmitter {
  constructor (sum, set) {
    super()
    this.sum = sum
    this.set = set
  }

  async start () {
    const worker = new Worker(workerFile, {
      workerData: { sum: this.sum, set: this.set }
    })

    worker.on('message', msg => {
      this.emit(msg.event, msg.data)
    })
  }
}
