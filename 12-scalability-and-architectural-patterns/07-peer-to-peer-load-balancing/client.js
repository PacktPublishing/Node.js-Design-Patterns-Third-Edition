import { balancedRequest } from './balancedRequest.js'

async function main () {
  for (let i = 0; i < 10; i++) {
    const response = await balancedRequest({ method: 'GET', path: '/' })
    const body = await new Promise((resolve, reject) => {
      let responseBody = ''
      response.on('data', chunk => {
        responseBody += chunk.toString()
      })
      response.on('end', () => resolve(responseBody))
      response.on('error', reject)
    })
    console.log(`Request ${i} completed:`, body)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
