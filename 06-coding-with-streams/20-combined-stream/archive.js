import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream'
import { createCompressAndEncrypt } from './combined-streams.js'

const [,, password, source] = process.argv
const archiveFile = createCompressAndEncrypt(password)
const destination = `${source}-${archiveFile.iv.toString('hex')}.gz.enc`

pipeline(
  createReadStream(source),
  archiveFile,
  createWriteStream(destination),
  (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
  }
)
