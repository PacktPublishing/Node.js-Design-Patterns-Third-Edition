import { createWriteStream, createReadStream } from 'fs'
import { Readable, Transform } from 'stream'

export function concatFiles (dest, files, cb) {
  const destStream = createWriteStream(dest)

  Readable.from(files) // ①
    .pipe(new Transform({ // ②
      transform (chunk, enc, done) {
        const src = createReadStream(chunk)
        src.pipe(destStream, { end: false })
        src.on('error', done)
        src.on('end', done) // ③
      }
    }))
    .on('error', cb)
    .on('finish', () => { // ④
      destStream.end()
      cb()
    })
}
