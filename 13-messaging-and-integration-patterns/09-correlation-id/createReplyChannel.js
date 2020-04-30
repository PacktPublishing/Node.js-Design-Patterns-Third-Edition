
export function createReplyChannel (channel) {
  return function registerHandler (handler) {
    channel.on('message', message => {
      if (message.type !== 'request') {
        return
      }

      handler(message.data, replyData => {
        channel.send({
          type: 'response',
          data: replyData,
          inReplyTo: message.id
        })
      })
    })
  }
}
