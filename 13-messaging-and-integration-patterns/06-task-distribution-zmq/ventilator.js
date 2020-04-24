import zmq from 'zeromq'
import delay from 'delay'

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'
const BATCH_SIZE = 10000

const [,, maxLength, searchHash] = process.argv

async function main () {
  let nVariations = 0
  for (let n = 0; n <= maxLength; n++) {
    nVariations += Math.pow(ALPHABET.length, n)
  }
  console.log('Finding the hashsum source string over ' +
    `${nVariations} possible variations`)

  const ventilator = new zmq.Push()
  await ventilator.bind('tcp://*:5016')
  await delay(1000) // wait for all the workers to connect

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
    await ventilator.send(JSON.stringify(msg))
    batchStart = batchEnd + 1
  }
}

main().catch(err => console.error(err))
