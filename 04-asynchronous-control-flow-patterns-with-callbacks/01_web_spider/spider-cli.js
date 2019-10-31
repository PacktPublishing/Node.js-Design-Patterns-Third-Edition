'use strict'

import spider from './spider.js'

spider(process.argv[2], (err, filename, downloaded) => {
  if (err) {
    return console.error(err)
  }

  if (downloaded) {
    return console.log(`Completed the download of "${filename}"`)
  }

  console.log(`"${filename}" was already downloaded`)
})
