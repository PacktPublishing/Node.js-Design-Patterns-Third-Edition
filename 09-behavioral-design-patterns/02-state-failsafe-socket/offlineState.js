import jsonOverTcp from 'json-over-tcp-2'

export class OfflineState {
  constructor (failsafeSocket) {
    this.failsafeSocket = failsafeSocket
  }

  send (data) {
    this.failsafeSocket.queue.push(data)
  }

  activate () {
    const retry = () => {
      setTimeout(() => this.activate(), 1000)
    }

    console.log('Trying to connect...')
    this.failsafeSocket.socket = jsonOverTcp.connect(
      this.failsafeSocket.options,
      () => {
        console.log('Connection established')
        this.failsafeSocket.socket.removeListener('error', retry)
        this.failsafeSocket.changeState('online')
      }
    )
    this.failsafeSocket.socket.once('error', retry)
  }
}
