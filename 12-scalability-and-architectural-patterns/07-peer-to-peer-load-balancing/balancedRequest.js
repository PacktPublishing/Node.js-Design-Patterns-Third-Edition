import { request } from 'http'
const servers = [
  { host: 'localhost', port: 8081 },
  { host: 'localhost', port: 8082 }
]
let i = 0

export function balancedRequest (options) {
  return new Promise((resolve) => {
    i = (i + 1) % servers.length
    options.hostname = servers[i].host
    options.port = servers[i].port

    request(options, resolve).end()
  })
}
