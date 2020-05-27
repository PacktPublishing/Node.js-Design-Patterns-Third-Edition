import { Transform } from 'stream'

export class SumProfit extends Transform {
  constructor (options = {}) {
    options.objectMode = true
    super(options)
    this.total = 0
  }

  _transform (record, enc, cb) {
    this.total += Number.parseFloat(record.profit)
    cb()
  }

  _flush (cb) {
    this.push(this.total.toString())
    cb()
  }
}
