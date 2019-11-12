/* eslint handle-callback-err: 0 */

const fs = require('fs')
const cache = {}
function consistentReadAsync (filename, callback) {
  if (cache[filename]) {
    process.nextTick(() => callback(cache[filename]))
  } else {
    // asynchronous function
    fs.readFile(filename, 'utf8', (err, data) => {
      cache[filename] = data
      callback(data)
    })
  }
}

consistentReadAsync('data.txt', (data) => {
  console.log(data)
  // the next call will read from the cache but still be async
  consistentReadAsync('data.txt', (data) => console.log(data))
})
