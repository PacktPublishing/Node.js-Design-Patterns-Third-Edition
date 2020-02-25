import { createServer } from 'http'

const server = createServer(async (request, response) => {
  if (request.url !== '/cmd') {
    response.writeHead(400)
    response.end()
    return
  }

  let data = ''
  for await (const chunk of request) {
    data += chunk
  }

  console.log(`Received the command: ${data}`)
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify({ ok: true }))
})

server.listen(3000, () => {
  console.log('Server started')
})
