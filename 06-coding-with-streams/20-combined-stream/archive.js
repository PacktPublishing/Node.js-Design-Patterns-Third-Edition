import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream'
import { createCompressAndEncrypt } from './combined-streams.js'

const [,, password, source] = process.argv
const archiveFile = createCompressAndEncrypt(password)
const iv = archiveFile.iv.toString('hex')
const destination = `${source}.gz.enc`

pipeline(
  createReadStream(source),
  archiveFile,
  createWriteStream(destination),
  (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`${destination} created with iv: ${iv}`)
  }
)
