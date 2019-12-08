import { promises as fsPromises } from 'fs'
import { dirname } from 'path'
import request from 'request-promise-native'
import mkdirp from 'mkdirp'
import { urlToFilename, getPageLinks } from './utils.js'
import { promisify } from 'util'

const mkdirpPromises = promisify(mkdirp)

function download (url, filename) {
  console.log(`Downloading ${url}`)
  let body
  return request(url)
    .then(htmlString => {
      body = htmlString
      return mkdirpPromises(dirname(filename))
    })
    .then(() => fsPromises.writeFile(filename, body))
    .then(() => {
      console.log(`Downloaded and saved: ${url}`)
      return body
    })
}

function spiderLinks (currentUrl, content, nesting) {
  let promise = Promise.resolve()
  if (nesting === 0) {
    return promise
  }
  const links = getPageLinks(currentUrl, content)
  for (const link of links) {
    promise = promise.then(() => spider(link, nesting - 1))
  }

  return promise
}

export function spider (url, nesting) {
  const filename = urlToFilename(url)
  return fsPromises.readFile(filename, 'utf8')
    .catch((err) => {
      if (err.code !== 'ENOENT') {
        throw err
      }

      // The file doesn't exists, so let’s download it
      return download(url, filename)
    })
    .then((content) => (spiderLinks(url, content, nesting)))
}
