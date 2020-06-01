import superagent from 'superagent'

// The Invoker
export class Invoker {
  constructor () {
    this.history = []
  }

  run (cmd) {
    this.history.push(cmd)
    cmd.run()
    console.log('Command executed', cmd.serialize())
  }

  delay (cmd, delay) {
    setTimeout(() => {
      console.log('Executing delayed command', cmd.serialize())
      this.run(cmd)
    }, delay)
  }

  undo () {
    const cmd = this.history.pop()
    cmd.undo()
    console.log('Command undone', cmd.serialize())
  }

  async runRemotely (cmd) {
    await superagent
      .post('http://localhost:3000/cmd')
      .send({ json: cmd.serialize() })

    console.log('Command executed remotely', cmd.serialize())
  }
}
