import { balancedRequest } from './balancedRequest.js'

async function main () {
  for (let i = 0; i < 10; i++) {
    const body = await balancedRequest({ method: 'GET', path: '/' })
    console.log(`Request ${i} completed:`, body)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
