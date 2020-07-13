import { Worker } from 'worker_threads'

export class ThreadPool {
  constructor (file, poolMax) {
    this.file = file
    this.poolMax = poolMax
    this.pool = []
    this.active = []
    this.waiting = []
  }

  acquire () {
    return new Promise((resolve, reject) => {
      let worker
      if (this.pool.length > 0) {
        worker = this.pool.pop()
        this.active.push(worker)
        return resolve(worker)
      }

      if (this.active.length >= this.poolMax) {
        return this.waiting.push({ resolve, reject })
      }

      worker = new Worker(this.file)
      worker.once('online', () => {
        this.active.push(worker)
        resolve(worker)
      })
      worker.once('exit', code => {
        console.log(`Worker exited with code ${code}`)
        this.active = this.active.filter(w => worker !== w)
        this.pool = this.pool.filter(w => worker !== w)
      })
    })
  }

  release (worker) {
    if (this.waiting.length > 0) {
      const { resolve } = this.waiting.shift()
      return resolve(worker)
    }
    this.active = this.active.filter(w => worker !== w)
    this.pool.push(worker)
  }
}
