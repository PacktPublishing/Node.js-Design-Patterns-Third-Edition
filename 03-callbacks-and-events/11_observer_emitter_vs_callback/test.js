/* eslint handle-callback-err: 0 */

const EventEmitter = require('events').EventEmitter

function helloEvents () {
  const eventEmitter = new EventEmitter()
  setTimeout(() => eventEmitter.emit('hello', 'hello world'), 100)
  return eventEmitter
}

function helloCallback (cb) {
  setTimeout(() => cb(null, 'hello world'), 100)
}

helloEvents().on('hello', (message) => console.log(message))
helloCallback((err, message) => console.log(message))
