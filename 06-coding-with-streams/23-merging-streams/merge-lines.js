import { createReadStream, createWriteStream } from 'fs'
import split from 'split'

const dest = process.argv[2]
const sources = process.argv.slice(3)

const destStream = createWriteStream(dest)

let endCount = 0
for (const source of sources) {
  const sourceStream = createReadStream(source, { highWaterMark: 16 })
  sourceStream.on('end', () => {
    if (++endCount === sources.length) {
      destStream.end()
      console.log(`${dest} created`)
    }
  })
  sourceStream
    .pipe(split((line) => line + '\n'))
    .pipe(destStream, { end: false })
}
