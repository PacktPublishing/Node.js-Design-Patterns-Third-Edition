export class OnlineState {
  constructor (failsafeSocket) {
    this.failsafeSocket = failsafeSocket
  }

  send (data) {
    this.failsafeSocket.socket.write(data)
  }

  activate () {
    this.failsafeSocket.queue.forEach(data => {
      this.failsafeSocket.socket.write(data)
    })
    this.failsafeSocket.queue = []

    this.failsafeSocket.socket.once('error', () => {
      this.failsafeSocket.changeState('offline')
    })
  }
}
