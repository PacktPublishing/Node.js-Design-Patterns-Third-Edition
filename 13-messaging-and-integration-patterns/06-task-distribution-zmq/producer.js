import zmq from 'zeromq'
import delay from 'delay'
import { generateTasks } from './generateTasks.js'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const BATCH_SIZE = 10000

const [, , maxLength, searchHash] = process.argv

async function main () {
  const ventilator = new zmq.Push()
  await ventilator.bind('tcp://*:5016')
  await delay(1000) // wait for all the workers to connect

  const generatorObj = generateTasks(searchHash, ALPHABET,
    maxLength, BATCH_SIZE)
  for (const task of generatorObj) {
    await ventilator.send(JSON.stringify(task))
  }
}

main().catch(err => console.error(err))
