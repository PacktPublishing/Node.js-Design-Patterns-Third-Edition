import fs from 'fs'
import { syncBuiltinESMExports } from 'module'

const originalReadFile = fs.readFile

let mockedResponse = null

function mockedReadFile (path, cb) {
  setImmediate(() => {
    cb(null, mockedResponse)
  })
}

export function mockEnable (respondWith) {
  mockedResponse = respondWith
  fs.readFile = mockedReadFile
  syncBuiltinESMExports()
}

export function mockDisable () {
  fs.readFile = originalReadFile
  syncBuiltinESMExports()
}
