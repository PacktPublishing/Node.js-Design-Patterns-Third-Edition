import { Writable } from 'stream'
import { promises as fs } from 'fs'
import { dirname, join } from 'path'
import mkdirp from 'mkdirp-promise'

const tfs = new Writable({
  objectMode: true,
  async write (chunk, encoding, cb) {
    try {
      await mkdirp(dirname(chunk.path))
      await fs.writeFile(chunk.path, chunk.content)
      cb()
    } catch (err) {
      cb(err)
    }
  }
})

tfs.write({ path: join('files', 'file1.txt'), content: 'Hello' })
tfs.write({ path: join('files', 'file2.txt'), content: 'Node.js' })
tfs.write({ path: join('files', 'file3.txt'), content: 'streams' })
tfs.end(() => console.log('All files created'))
