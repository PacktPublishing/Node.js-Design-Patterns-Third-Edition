import { SubsetSum } from '../subsetSum.js'

process.on('message', msg => {
  const subsetSum = new SubsetSum(msg.sum, msg.set)

  subsetSum.on('match', data => {
    process.send({ event: 'match', data: data })
  })

  subsetSum.on('end', data => {
    process.send({ event: 'end', data: data })
  })

  subsetSum.start()
})

process.send('ready')
