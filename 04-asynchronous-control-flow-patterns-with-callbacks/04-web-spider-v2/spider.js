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

function spiderLinks (currentUrl, body, nesting, cb) {
  if (nesting === 0) {
    return process.nextTick(cb)
  }

  const links = getPageLinks(currentUrl, body) // [1]

  function iterate (index) { // [2]
    if (index === links.length) {
      return cb()
    }

    spider(links[index], nesting - 1, function (err) { // [3]
      if (err) {
        return cb(err)
      }
      iterate(index + 1)
    })
  }

  iterate(0) // [4]
}

function spider (url, nesting, cb) {
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

export default spider
