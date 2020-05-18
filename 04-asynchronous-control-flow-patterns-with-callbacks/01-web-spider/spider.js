import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { urlToFilename } from './utils.js'

export function spider (url, cb) {
  const filename = urlToFilename(url)
  fs.access(filename, err => { // [1]
    if (err && err.code === 'ENOENT') {
      console.log(`Downloading ${url} into ${filename}`)
      superagent.get(url).end((err, res) => { // [2]
        if (err) {
          cb(err)
        } else {
          mkdirp(path.dirname(filename), err => { // [3]
            if (err) {
              cb(err)
            } else {
              fs.writeFile(filename, res.text, err => { // [4]
                if (err) {
                  cb(err)
                } else {
                  cb(null, filename, true)
                }
              })
            }
          })
        }
      })
    } else {
      cb(null, filename, false)
    }
  })
}
