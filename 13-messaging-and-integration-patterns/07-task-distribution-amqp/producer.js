import amqp from 'amqplib'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const BATCH_SIZE = 10000

const [, , maxLength, searchHash] = process.argv

async function main () {
  let nVariations = 0
  for (let n = 0; n <= maxLength; n++) {
    nVariations += Math.pow(ALPHABET.length, n)
  }
  console.log('Finding the hashsum source string over ' +
    `${nVariations} possible variations`)

  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createConfirmChannel()
  await channel.assertQueue('tasks_queue')

  let batchStart = 1
  while (batchStart <= nVariations) {
    const batchEnd = Math.min(
      batchStart + BATCH_SIZE, nVariations)
    const msg = {
      searchHash,
      alphabet: ALPHABET,
      batchStart,
      batchEnd
    }
    await channel.sendToQueue('tasks_queue',
      Buffer.from(JSON.stringify(msg)))
    batchStart = batchEnd + 1
  }

  await channel.waitForConfirms()
  channel.close()
  connection.close()
}

main().catch(err => console.error(err))
