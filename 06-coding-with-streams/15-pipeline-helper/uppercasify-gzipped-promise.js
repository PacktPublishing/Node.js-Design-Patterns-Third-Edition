import { createGzip, createGunzip } from 'zlib'
import { Transform, pipeline } from 'stream'
import { promisify } from 'util'

const pipelinePromise = promisify(pipeline)

const uppercasify = new Transform({
  transform (chunk, enc, cb) {
    this.push(chunk.toString().toUpperCase())
    cb()
  }
})

async function main () {
  try {
    await pipelinePromise(
      process.stdin,
      createGunzip(),
      uppercasify,
      createGzip(),
      process.stdout
    )
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main()
