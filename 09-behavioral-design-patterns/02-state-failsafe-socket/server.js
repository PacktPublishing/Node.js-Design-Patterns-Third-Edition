import jsonOverTcp from 'json-over-tcp-2'

const server = jsonOverTcp.createServer({ port: 5000 })
server.on('connection', socket => {
  socket.on('data', data => {
    console.log('Client data', data)
  })
})

server.listen(5000, () => console.log('Server started'))
