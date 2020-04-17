import fastify from 'fastify'
import fastifyCors from 'fastify-cors'
import { authors } from './data/authors.js'

const server = fastify({ logger: true })

server.register(fastifyCors, { origin: true })

server.get('/api/authors', async function (req, reply) {
  return authors.map(({ id, name }) => ({ id, name }))
})

server.get('/api/author/:authorId', async function (req, reply) {
  const author = authors.find(({ id }) => id === req.params.authorId)
  if (!author) {
    reply.code(404)
    return { error: 'Author not found' }
  }
  return author
})

const port = Number.parseInt(process.env.PORT) || 3001
const address = process.env.ADDRESS || '127.0.0.1'

server.listen(port, address, function (err) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
})
