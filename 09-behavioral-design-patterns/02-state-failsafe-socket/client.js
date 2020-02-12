import { FailsafeSocket } from './failsafeSocket.js'

const failsafeSocket = new FailsafeSocket({ port: 5000 })

setInterval(() => {
  // send current memory usage
  failsafeSocket.send(process.memoryUsage())
}, 1000)
