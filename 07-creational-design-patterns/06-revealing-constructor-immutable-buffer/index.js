import { ImmutableBuffer } from './immutableBuffer.js'

const hello = 'Hello!'
const immutable = new ImmutableBuffer(hello.length,
  ({ write }) => {
    write(hello)
  })

console.log(String.fromCharCode(immutable.readInt8(0)))

// the following line will throw
// "TypeError: immutable.write is not a function"

// immutable.write('Hello?')
