
import { Readable } from 'stream'
import Chance from 'chance'

const chance = new Chance()

export class RandomStream extends Readable {
  constructor (opts) {
    super(opts)
    this.emittedLength = 0
  }

  _read (size) {
    const chunk = chance.string({ length: size }) // ①
    this.push(chunk, 'utf8') // ②
    this.emittedLength += chunk.length
    if (chance.bool({ likelihood: 5 })) { // ③
      this.push(null)
    }
  }
}
