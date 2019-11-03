'use strict'

import fs from 'fs'
import path from 'path'
import request from 'request'
import mkdirp from 'mkdirp'
import { urlToFilename, getPageLinks } from './utils.js'
import TaskQueue from './TaskQueue.js'

const spiderQueue = new TaskQueue(2)

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

function spiderLinks (currentUrl, body, nesting, cb) {
  if (nesting === 0) {
    return process.nextTick(cb)
  }

  const links = getPageLinks(currentUrl, body)
  if (links.length === 0) {
    return process.nextTick(cb)
  }

  let completed = 0
  let hasErrors = false

  function done (err) {
    if (err) {
      hasErrors = true
      return cb(err)
    }
    if (++completed === links.length && !hasErrors) {
      return cb()
    }
  }

  links.forEach(link => spider(link, nesting - 1, done))
}

function spiderTask (url, nesting, cb) {
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

        spiderLinks(url, requestContent, nesting, cb)
      })
    }

    spiderLinks(url, fileContent, nesting, cb)
  })
}

const spidering = new Set()
function spider (url, nesting, cb) {
  if (spidering.has(url)) {
    return cb()
  }

  spidering.add(url)
  spiderQueue.pushTask((done) => {
    spiderTask(url, nesting, done)
  })
  cb()
}

export default spider
