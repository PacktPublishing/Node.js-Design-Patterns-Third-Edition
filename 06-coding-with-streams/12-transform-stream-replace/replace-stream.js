import { Transform } from 'stream'

export class ReplaceStream extends Transform {
  constructor (searchStr, replaceStr, opts) {
    super({ ...opts, defaultEncoding: 'utf8' })
    this.searchStr = searchStr
    this.replaceStr = replaceStr
    this.tail = ''
  }

  _transform (chunk, encoding, cb) {
    const pieces = (this.tail + chunk).split(this.searchStr)
    const lastPiece = pieces[pieces.length - 1]
    const tailLen = this.searchStr.length - 1
    this.tail = lastPiece.slice(-tailLen)
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailLen)

    this.push(pieces.join(this.replaceStr))
    cb()
  }

  _flush (cb) {
    this.push(this.tail)
    cb()
  }
}
