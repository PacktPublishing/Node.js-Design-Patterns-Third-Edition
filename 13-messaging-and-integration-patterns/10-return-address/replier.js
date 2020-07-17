import { AMQPReply } from './amqpReply.js'

async function main () {
  const reply = new AMQPReply('requests_queue')
  await reply.initialize()

  reply.handleRequests(req => {
    console.log('Request received', req)
    return { sum: req.a + req.b }
  })
}

main().catch(err => console.error(err))
