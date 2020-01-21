import EventEmitter from 'events'

export class SubscriberOnlyEE extends EventEmitter {
  constructor (executor) {
    super()
    const emit = this.emit.bind(this)
    delete this.emit
    executor(emit)
  }
}
