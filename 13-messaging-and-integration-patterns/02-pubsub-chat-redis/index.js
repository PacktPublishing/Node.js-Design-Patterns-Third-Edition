import { createServer } from 'http'
import staticHandler from 'serve-handler'
import ws from 'ws'
import Redis from 'ioredis'

const redisSub = new Redis()
const redisPub = new Redis()

// serve static files
const server = createServer((req, res) => {
  return staticHandler(req, res, { public: 'www' })
})

const wss = new ws.Server({ server })
wss.on('connection', ws => {
  console.log('Client connected')
  ws.on('message', msg => {
    console.log(`Message: ${msg}`)
    redisPub.publish('chat_messages', msg)
  })
})

redisSub.subscribe('chat_messages')
redisSub.on('message', (channel, msg) => {
  for (const client of wss.clients) {
    if (client.readyState === ws.OPEN) {
      client.send(msg)
    }
  }
})

server.listen(process.argv[2] || 8080)
