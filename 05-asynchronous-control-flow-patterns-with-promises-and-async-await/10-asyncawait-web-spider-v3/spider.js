import { promises as fsPromises } from 'fs'
import { dirname } from 'path'
import request from 'request-promise-native'
import mkdirp from 'mkdirp'
import { urlToFilename, getPageLinks } from './utils.js'
import { promisify } from 'util'

const mkdirpPromises = promisify(mkdirp)

async function download (url, filename) {
  console.log(`Downloading ${url}`)
  const content = await request(url)
  await mkdirpPromises(dirname(filename))
  await fsPromises.writeFile(filename, content)
  console.log(`Downloaded and saved: ${url}`)
  return content
}

async function spiderLinks (currentUrl, content, nesting) {
  if (nesting === 0) {
    return
  }

  const links = getPageLinks(currentUrl, content)
  const promises = links.map(link => spider(link, nesting - 1))

  return Promise.all(promises)
}

export async function spider (url, nesting) {
  const filename = urlToFilename(url)
  let content
  try {
    content = await fsPromises.readFile(filename, 'utf8')
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }

    content = await download(url, filename)
  }

  await spiderLinks(url, content, nesting)
}
