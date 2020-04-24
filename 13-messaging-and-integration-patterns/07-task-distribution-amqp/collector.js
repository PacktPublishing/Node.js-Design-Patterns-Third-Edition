import amqp from 'amqplib'

async function main () {
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  const { queue } = await channel.assertQueue('results_queue')
  channel.consume(queue, msg => {
    console.log(`Message from worker: ${msg.content.toString()}`)
  })
}

main().catch(err => console.error(err))
