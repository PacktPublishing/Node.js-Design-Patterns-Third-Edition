import fs from 'fs'
import { mockEnable, mockDisable } from './mock-read-file.js'

mockEnable(Buffer.from('Hello World'))

fs.readFile('fake-path', (err, data) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(data.toString()) // 'Hello World'
})

mockDisable()
// trying to read the file again would fail with
// [Error: ENOENT: no such file or directory, open 'fake-path']
