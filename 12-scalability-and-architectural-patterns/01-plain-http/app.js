import { createServer } from 'http'

const { pid } = process
const server = createServer((req, res) => {
  // simulates CPU intensive work
  let i = 1e7; while (i > 0) { i-- }

  console.log(`Handling request from ${pid}`)
  res.end(`Hello from ${pid}\n`)
})

server.listen(8080, () => console.log(`Started at ${pid}`))
