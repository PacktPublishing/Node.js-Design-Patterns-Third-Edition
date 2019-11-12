'use strict'

const EventEmitter = require('events').EventEmitter

class SyncEmit extends EventEmitter {
  constructor () {
    super()
    this.emit('ready')
  }
}

const syncEmit = new SyncEmit()
syncEmit.on('ready', () => console.log('Object is ready to be used'))

// nothing will be printed as the event is dispatched before the listener is added
