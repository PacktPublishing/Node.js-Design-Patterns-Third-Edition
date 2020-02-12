import { resolve } from 'path'

export function createFSAdapter (db) {
  return ({
    readFile (filename, options, cb) {
      if (typeof options === 'function') {
        cb = options
        options = {}
      } else if (typeof options === 'string') {
        options = { encoding: options }
      }

      db.get(resolve(filename), { // ①
        valueEncoding: options.encoding
      },
      (err, value) => {
        if (err) {
          if (err.type === 'NotFoundError') { // ②
            err = new Error(`ENOENT, open "${filename}"`)
            err.code = 'ENOENT'
            err.errno = 34
            err.path = filename
          }
          return cb && cb(err)
        }
        cb && cb(null, value) // ③
      })
    },

    writeFile (filename, contents, options, cb) {
      if (typeof options === 'function') {
        cb = options
        options = {}
      } else if (typeof options === 'string') {
        options = { encoding: options }
      }

      db.put(resolve(filename), contents, {
        valueEncoding: options.encoding
      }, cb)
    }
  })
}
