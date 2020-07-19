import { createServer } from 'http'
import consul from 'consul'
import portfinder from 'portfinder'
import { nanoid } from 'nanoid'

const serviceType = process.argv[2]
const { pid } = process

async function main () {
  const consulClient = consul()

  const port = await portfinder.getPortPromise() // ①
  const address = process.env.ADDRESS || 'localhost'
  const serviceId = nanoid()

  function registerService () { // ②
    consulClient.agent.service.register({
      id: serviceId,
      name: serviceType,
      address,
      port,
      tags: [serviceType]
    }, () => {
      console.log(`${serviceType} registered successfully`)
    })
  }

  function unregisterService (err) { // ③
    err && console.error(err)
    console.log(`deregistering ${serviceId}`)
    consulClient.agent.service.deregister(serviceId, () => {
      process.exit(err ? 1 : 0)
    })
  }

  process.on('exit', unregisterService) // ④
  process.on('uncaughtException', unregisterService)
  process.on('SIGINT', unregisterService)

  const server = createServer((req, res) => { // ⑤
    let i = 1e7; while (i > 0) { i-- }
    console.log(`Handling request from ${pid}`)
    res.end(`${serviceType} response from ${pid}\n`)
  })

  server.listen(port, address, () => {
    registerService()
    console.log(`Started ${serviceType} at ${pid} on port ${port}`)
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
