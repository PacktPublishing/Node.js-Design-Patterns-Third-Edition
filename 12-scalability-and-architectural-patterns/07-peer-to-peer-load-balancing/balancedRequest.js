import { request } from 'http'
import getStream from 'get-stream'

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

    request(options, (response) => {
      resolve(getStream(response))
    }).end()
  })
}
