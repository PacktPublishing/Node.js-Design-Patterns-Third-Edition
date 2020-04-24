import amqp from 'amqplib'
import { createHash } from 'crypto'
import isv from 'indexed-string-variation'

async function main () {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  const { queue } = await channel.assertQueue('tasks_queue')

  channel.consume(queue, async (rawMessage) => {
    const msg = JSON.parse(rawMessage.content.toString())
    const variationGen = isv.generator(msg.alphabet)
    for (let idx = msg.batchStart; idx <= msg.batchEnd; idx++) {
      const word = variationGen(idx)

      console.log(`Processing: ${word}`)
      const shasum = createHash('sha1')
      shasum.update(word)
      const digest = shasum.digest('hex')

      if (digest === msg.searchHash) {
        console.log(`Found! => ${word}`)
        await channel.sendToQueue('results_queue',
          Buffer.from(`Found! ${digest} => ${word}`))
      }
    }

    await channel.ack(rawMessage)
  })
}

main().catch(err => console.error(err))
