import { createReplyChannel } from './createReplyChannel.js'

const registerReplyHandler = createReplyChannel(process)

registerReplyHandler((req, reply) => {
  setTimeout(() => {
    reply({ sum: req.a + req.b })
  }, req.delay)
})

process.send('ready')
