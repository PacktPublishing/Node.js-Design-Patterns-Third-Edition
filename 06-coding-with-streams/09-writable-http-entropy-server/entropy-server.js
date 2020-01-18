import { createServer } from 'http'
import Chance from 'chance'

const chance = new Chance()

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' }) // ①
  while (chance.bool({ likelihood: 95 })) { // ②
    res.write(`${chance.string()}\n`) // ③
  }
  res.end('\n\n') // ④
  res.on('finish', () => console.log('All data sent')) // ⑤
})

server.listen(8080, () => {
  console.log('listening on http://localhost:8080')
})
