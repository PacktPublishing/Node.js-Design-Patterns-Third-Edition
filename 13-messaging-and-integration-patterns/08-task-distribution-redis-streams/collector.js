import Redis from 'ioredis'

const redisClient = new Redis()

async function main () {
  let lastRecordId = '$'
  while (true) {
    const data = await redisClient.xread(
      'BLOCK', '0', 'STREAMS', 'results_stream', lastRecordId)
    for (const [, logs] of data) {
      for (const [recordId, [, message]] of logs) {
        console.log(`Message from worker: ${message}`)
        lastRecordId = recordId
      }
    }
  }
}

main().catch(err => console.error(err))
