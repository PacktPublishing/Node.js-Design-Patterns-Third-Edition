import { createWriteStream, createReadStream } from 'fs'
import { Readable, Transform } from 'stream'

export function concatFiles (dest, files) {
  return new Promise((resolve, reject) => {
    const destStream = createWriteStream(dest)
    Readable.from(files) // ①
      .pipe(new Transform({ // ②
        objectMode: true,
        transform (filename, enc, done) {
          const src = createReadStream(filename)
          src.pipe(destStream, { end: false })
          src.on('error', done)
          src.on('end', done) // ③
        }
      }))
      .on('error', reject)
      .on('finish', () => { // ④
        destStream.end()
        resolve()
      })
  })
}
