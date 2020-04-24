import zmq from 'zeromq'

async function main () {
  const sink = new zmq.Pull()
  await sink.bind('tcp://*:5017')

  for await (const rawMessage of sink) {
    console.log('Message from worker: ', rawMessage.toString())
  }
}

main().catch(err => console.error(err))
