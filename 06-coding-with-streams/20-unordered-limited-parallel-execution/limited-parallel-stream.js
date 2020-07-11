import { Transform } from 'stream'

export class LimitedParallelStream extends Transform {
  constructor (concurrency, userTransform, opts) {
    super({ ...opts, objectMode: true })
    this.concurrency = concurrency
    this.userTransform = userTransform
    this.running = 0
    this.continueCb = null
    this.terminateCb = null
  }

  _transform (chunk, enc, done) {
    this.running++
    this.userTransform(
      chunk,
      enc,
      this.push.bind(this),
      this._onComplete.bind(this)
    )
    if (this.running < this.concurrency) {
      done()
    } else {
      this.continueCb = done
    }
  }

  _flush (done) {
    if (this.running > 0) {
      this.terminateCb = done
    } else {
      done()
    }
  }

  _onComplete (err) {
    this.running--
    if (err) {
      return this.emit('error', err)
    }
    const tmpCb = this.continueCb
    this.continueCb = null
    tmpCb && tmpCb()
    if (this.running === 0) {
      this.terminateCb && this.terminateCb()
    }
  }
}
