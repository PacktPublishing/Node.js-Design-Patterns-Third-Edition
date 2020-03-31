import { fork } from 'child_process'

class ProcessPool {
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

      worker = fork(this.file)
      worker.once('exit', code => {
        console.log(`Worker exited with code ${code}`)
        this.active = this.active.filter(w => worker !== w)
        this.pool = this.active.filter(w => worker !== w)
      })
      this.active.push(worker)
      resolve(worker)
    })
  }

  release (worker) {
    if (this.waiting.length > 0) {
      const { waitingResolve } = this.waiting.shift()
      return waitingResolve(worker)
    }
    this.active = this.active.filter(w => worker !== w)
    this.pool.push(worker)
  }
}

module.exports = ProcessPool
