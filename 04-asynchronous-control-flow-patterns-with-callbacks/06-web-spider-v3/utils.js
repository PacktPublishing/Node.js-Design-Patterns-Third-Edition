import path from 'path'
import { URL } from 'url'
import slug from 'slug'
import cheerio from 'cheerio'

function getLinkUrl (currentUrl, element) {
  const parsedLink = new URL(element.attribs.href || '', currentUrl)
  const currentParsedUrl = new URL(currentUrl)
  if (parsedLink.hostname !== currentParsedUrl.hostname ||
    !parsedLink.pathname) {
    return null
  }
  return parsedLink.toString()
};

export function urlToFilename (url) {
  const parsedUrl = new URL(url)
  const urlPath = parsedUrl.pathname.split('/')
    .filter(function (component) {
      return component !== ''
    })
    .map(function (component) {
      return slug(component, { remove: null })
    })
    .join('/')
  let filename = path.join(parsedUrl.hostname, urlPath)
  if (!path.extname(filename).match(/htm/)) {
    filename += '.html'
  }

  return filename
}

export function getPageLinks (currentUrl, body) {
  return Array.from(cheerio.load(body)('a'))
    .map(function (element) {
      return getLinkUrl(currentUrl, element)
    })
    .filter(Boolean)
};
