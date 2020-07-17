import { createReplyChannel } from './createReplyChannel.js'

const registerReplyHandler = createReplyChannel(process)

registerReplyHandler(req => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ sum: req.a + req.b })
    }, req.delay)
  })
})

process.send('ready')
