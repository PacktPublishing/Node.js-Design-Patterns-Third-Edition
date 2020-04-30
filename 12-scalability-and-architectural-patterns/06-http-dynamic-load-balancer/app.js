import { createServer } from 'http'
import consul from 'consul'
import portfinder from 'portfinder'

const serviceType = process.argv[2]
const { pid } = process

async function main () {
  const consulClient = consul()

  const port = await portfinder.getPortPromise() // ①
  const serviceId = `${serviceType}:${port}`

  function registerService () { // ②
    consulClient.agent.service.register({
      id: serviceId,
      name: serviceType,
      address: 'localhost',
      port,
      tags: [serviceType]
    }, () => {
      console.log(`${serviceType} registered successfully`)
    })
  }

  function unregisterService (err) { // ③
    err && console.error(err)
    consulClient.agent.service.deregister(serviceId, () => {
      process.exit(err ? 1 : 0)
    })
  }

  process.on('exit', unregisterService) // ④
  process.on('uncaughtException', unregisterService)

  const server = createServer((req, res) => { // ⑤
    let i = 1e7; while (i > 0) { i-- }
    console.log(`Handling request from ${pid}`)
    res.end(`${serviceType} response from ${pid}\n`)
  })

  server.listen(port, () => {
    registerService()
    console.log(`Started ${serviceType} at ${pid} on port ${port}`)
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
