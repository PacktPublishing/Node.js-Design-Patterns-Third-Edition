import * as fs from 'fs'
// or import { readFile } from 'fs'
import { mockEnable, mockDisable } from './mock-read-file.js'

mockEnable(Buffer.from('Hello World'))

fs.readFile('fake-path', (err, data) => {
  if (err) {
    console.error(err) // This would fail here because we are not using the mocked version here
    process.exit(1)
  }
  console.log(data.toString())
})

mockDisable()
