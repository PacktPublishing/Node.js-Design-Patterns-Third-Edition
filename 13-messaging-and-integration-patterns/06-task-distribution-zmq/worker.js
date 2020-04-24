import zmq from 'zeromq'
import { createHash } from 'crypto'
import isv from 'indexed-string-variation'

async function main () {
  const fromVentilator = new zmq.Pull()
  const toSink = new zmq.Push()

  fromVentilator.connect('tcp://localhost:5016')
  toSink.connect('tcp://localhost:5017')

  for await (const rawMessage of fromVentilator) {
    const msg = JSON.parse(rawMessage.toString())
    const variationGen = isv.generator(msg.alphabet)
    for (let idx = msg.batchStart; idx <= msg.batchEnd; idx++) {
      const word = variationGen(idx)

      console.log(`Processing: ${word}`)
      const shasum = createHash('sha1')
      shasum.update(word)
      const digest = shasum.digest('hex')

      if (digest === msg.searchHash) {
        console.log(`Found! => ${word}`)
        await toSink.send(`Found! ${digest} => ${word}`)
      }
    }
  }
}

main().catch(err => console.error(err))
