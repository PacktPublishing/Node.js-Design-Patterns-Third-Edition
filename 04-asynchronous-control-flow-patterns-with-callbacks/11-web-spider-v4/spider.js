'use strict'

import fs from 'fs'
import path from 'path'
import request from 'request'
import mkdirp from 'mkdirp'
import { urlToFilename, getPageLinks } from './utils.js'

function saveFile (filename, contents, cb) {
  mkdirp(path.dirname(filename), err => {
    if (err) {
      return cb(err)
    }
    fs.writeFile(filename, contents, cb)
  })
}

function download (url, filename, cb) {
  console.log(`Downloading ${url}`)
  request(url, (err, response, body) => {
    if (err) {
      return cb(err)
    }
    saveFile(filename, body, err => {
      if (err) {
        return cb(err)
      }
      console.log(`Downloaded and saved: ${url}`)
      cb(null, body)
    })
  })
}

function spiderLinks (currentUrl, body, nesting, queue) {
  if (nesting === 0) {
    return
  }

  const links = getPageLinks(currentUrl, body)
  if (links.length === 0) {
    return
  }

  links.forEach(link => spider(link, nesting - 1, queue))
}

function spiderTask (url, nesting, queue, cb) {
  const filename = urlToFilename(url)
  fs.readFile(filename, 'utf8', (err, fileContent) => {
    if (err) {
      if (err.code !== 'ENOENT') {
        return cb(err)
      }

      return download(url, filename, (err, requestContent) => {
        if (err) {
          return cb(err)
        }

        spiderLinks(url, requestContent, nesting, queue)
        return cb()
      })
    }

    spiderLinks(url, fileContent, nesting, queue)
    return cb()
  })
}

const spidering = new Set()
function spider (url, nesting, queue) {
  if (spidering.has(url)) {
    return
  }

  spidering.add(url)
  queue.pushTask((done) => {
    spiderTask(url, nesting, queue, done)
  })
}

export default spider
