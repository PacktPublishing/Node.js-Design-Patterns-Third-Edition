export class TaskQueuePC {
  constructor (concurrency) {
    this.taskQueue = []
    this.consumerQueue = []

    // spawn consumers
    for (let i = 0; i < concurrency; i++) {
      this.consumer()
    }
  }

  async consumer () {
    while (true) {
      try {
        const task = await this.getNextTask()
        await task()
      } catch (err) {
        console.error(err)
      }
    }
  }

  getNextTask () {
    return new Promise((resolve) => {
      if (this.taskQueue.length !== 0) {
        return resolve(this.taskQueue.shift())
      }

      this.consumerQueue.push(resolve)
    })
  }

  runTask (task) {
    return new Promise((resolve, reject) => {
      const taskWrapper = () => {
        const taskPromise = task()
        taskPromise.then(resolve, reject)
        return taskPromise
      }

      if (this.consumerQueue.length !== 0) {
        // there is a sleeping consumer available, use it to run our task
        const consumer = this.consumerQueue.shift()
        consumer(taskWrapper)
      } else {
        // all consumers are busy, enqueue the task
        this.taskQueue.push(taskWrapper)
      }
    })
  }
}
