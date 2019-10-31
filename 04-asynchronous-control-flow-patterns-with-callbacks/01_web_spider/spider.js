'use strict'

import fs from 'fs'
import path from 'path'
import request from 'request'
import mkdirp from 'mkdirp'
import { urlToFilename } from './utils.js'

function spider (url, cb) {
  const filename = urlToFilename(url)
  fs.access(filename, err => {
    if (err && err.code === 'ENOENT') {
      console.log(`Downloading ${url} into ${filename}`)
      request(url, (err, response, body) => {
        if (err) {
          return cb(err)
        }

        mkdirp(path.dirname(filename), err => {
          if (err) {
            return cb(err)
          }

          fs.writeFile(filename, body, err => {
            if (err) {
              return cb(err)
            }

            return cb(null, filename, true)
          })
        })
      })
    }

    return cb(null, filename, false)
  })
}

export default spider
