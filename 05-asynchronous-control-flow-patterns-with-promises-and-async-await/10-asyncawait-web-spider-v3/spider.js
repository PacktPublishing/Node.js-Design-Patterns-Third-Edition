import { promises as fsPromises } from 'fs'
import { dirname } from 'path'
import superagent from 'superagent'
import mkdirp from 'mkdirp'
import { urlToFilename, getPageLinks } from './utils.js'
import { promisify } from 'util'

const mkdirpPromises = promisify(mkdirp)

async function download (url, filename) {
  console.log(`Downloading ${url}`)
  const { text: content } = await superagent.get(url)
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

const spidering = new Set()

export async function spider (url, nesting) {
  if (spidering.has(url)) {
    return
  }
  spidering.add(url)

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

  return spiderLinks(url, content, nesting)
}
