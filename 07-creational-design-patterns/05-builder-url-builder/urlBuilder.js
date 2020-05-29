import { Url } from './url.js'

export class UrlBuilder {
  setProtocol (protocol) {
    this.protocol = protocol
    return this
  }

  setAuthentication (username, password) {
    this.username = username
    this.password = password
    return this
  }

  setHostname (hostname) {
    this.hostname = hostname
    return this
  }

  setPort (port) {
    this.port = port
    return this
  }

  setPathname (pathname) {
    this.pathname = pathname
    return this
  }

  setSearch (search) {
    this.search = search
    return this
  }

  setHash (hash) {
    this.hash = hash
    return this
  }

  build () {
    return new Url(this.protocol, this.username, this.password,
      this.hostname, this.port, this.pathname, this.search,
      this.hash)
  }
}
