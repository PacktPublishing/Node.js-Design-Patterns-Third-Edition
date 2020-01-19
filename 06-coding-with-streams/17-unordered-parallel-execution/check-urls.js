import { pipeline } from 'stream'
import { createReadStream, createWriteStream } from 'fs'
import split from 'split'
import request from 'request-promise'
import { ParallelStream } from './parallel-stream.js'

pipeline(
  createReadStream(process.argv[2]), // ①
  split(), // ②
  new ParallelStream( // ③
    async (url, enc, push, done) => {
      if (!url) return done()
      try {
        await request.head(url, { timeout: 5 * 1000 })
        push(`${url} is up\n`)
      } catch (err) {
        push(`${url} is down\n`)
      }
      done()
    }
  ),
  createWriteStream('results.txt'), // ④
  (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log('All urls have been checked')
  }
)
