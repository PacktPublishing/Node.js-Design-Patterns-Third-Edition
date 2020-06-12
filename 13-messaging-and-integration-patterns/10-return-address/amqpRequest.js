import { nanoid } from 'nanoid'
import amqp from 'amqplib'

export class AMQPRequest {
  constructor () {
    this.correlationMap = new Map()
  }

  async initialize () {
    this.connection = await amqp.connect('amqp://localhost')
    this.channel = await this.connection.createChannel()
    const { queue } = await this.channel.assertQueue('',
      { exclusive: true })
    this.replyQueue = queue

    this.channel.consume(this.replyQueue, msg => {
      const correlationId = msg.properties.correlationId
      const handler = this.correlationMap.get(correlationId)
      if (handler) {
        handler(JSON.parse(msg.content.toString()))
      }
    }, { noAck: true })
  }

  send (queue, message) {
    return new Promise((resolve, reject) => {
      const id = nanoid()
      const replyTimeout = setTimeout(() => {
        this.correlationMap.delete(id)
        reject(new Error('Request timeout'))
      }, 10000)

      this.correlationMap.set(id, (replyData) => {
        this.correlationMap.delete(id)
        clearTimeout(replyTimeout)
        resolve(replyData)
      })

      this.channel.sendToQueue(queue,
        Buffer.from(JSON.stringify(message)),
        { correlationId: id, replyTo: this.replyQueue }
      )
    })
  }

  destroy () {
    this.channel.close()
    this.connection.close()
  }
}
