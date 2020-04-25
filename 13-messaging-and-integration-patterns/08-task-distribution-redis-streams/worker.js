import Redis from 'ioredis'
import { processTask } from './processTask.js'

const redisClient = new Redis()
const [, , consumerName] = process.argv

async function main () {
  await redisClient.xgroup('CREATE', 'tasks_stream',
    'workers_group', '$', 'MKSTREAM')
    .catch(() => console.log('Consumer group already exists'))

  const [[, records]] = await redisClient.xreadgroup(
    'GROUP', 'workers_group', consumerName, 'STREAMS',
    'tasks_stream', '0')
  for (const [recordId, [, rawTask]] of records) {
    await processAndAck(recordId, rawTask)
  }

  while (true) {
    const [[, records]] = await redisClient.xreadgroup(
      'GROUP', 'workers_group', consumerName, 'BLOCK', '0',
      'COUNT', '1', 'STREAMS', 'tasks_stream', '>')
    for (const [recordId, [, rawTask]] of records) {
      await processAndAck(recordId, rawTask)
    }
  }
}

async function processAndAck (recordId, rawTask) {
  const found = processTask(JSON.parse(rawTask))
  if (found) {
    console.log(`Found! => ${found}`)
    await redisClient.xadd('results_stream', '*', 'result',
      `Found: ${found}`)
  }

  await redisClient.xack('tasks_stream', 'workers_group', recordId)
}

main().catch(err => console.error(err))
