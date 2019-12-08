import { EventEmitter } from 'events'

export class TaskQueue extends EventEmitter {
  constructor (concurrency) {
    super()
    this.concurrency = concurrency
    this.running = 0
    this.queue = []
  }

  runTask (task) {
    return new Promise((resolve, reject) => {
      this.queue.push(() => {
        const taskPromise = task()
        taskPromise.then(resolve, reject)
        return taskPromise
      })
      process.nextTick(this.next.bind(this))
    })
  }

  next () {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift()
      task().then(() => {
        this.running--
        this.next()
      })
      this.running++
    }
  }
}
