import { createReadStream, createWriteStream } from 'fs'
import { Transform, pipeline } from 'stream'
import { strict as assert } from 'assert'

const streamA = createReadStream('package.json')
const streamB = new Transform({
  transform (chunk, enc, done) {
    this.push(chunk.toString().toUpperCase())
    done()
  }
})
const streamC = createWriteStream('package-uppercase.json')

const pipelineReturn = pipeline(
  streamA,
  streamB,
  streamC,
  () => {
    // handle errors here
  }
)
assert.strictEqual(streamC, pipelineReturn) // valid

const pipeReturn = streamA.pipe(streamB).pipe(streamC)
assert.strictEqual(streamC, pipeReturn) // valid
