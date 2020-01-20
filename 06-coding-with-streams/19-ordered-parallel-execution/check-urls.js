import { pipeline } from 'stream'
import { createReadStream, createWriteStream } from 'fs'
import split from 'split'
import request from 'request-promise'
import throughParallel from 'through2-parallel'

pipeline(
  createReadStream(process.argv[2]),
  split(),
  throughParallel.obj(
    { concurrency: 4 },
    async function (url, enc, done) {
      if (!url) return done()
      console.log(url)
      try {
        await request.head(url, { timeout: 5 * 1000 })
        this.push(`${url} is up\n`)
      } catch (err) {
        this.push(`${url} is down\n`)
      }
      done()
    }
  ),
  createWriteStream('results.txt'),
  (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log('All urls have been checked')
  }
)
