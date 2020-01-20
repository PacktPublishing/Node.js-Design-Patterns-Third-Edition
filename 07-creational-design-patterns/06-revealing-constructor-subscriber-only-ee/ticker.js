import { SubscriberOnlyEE } from './subscriberOnlyEE.js'

export function makeTicker () {
  return new SubscriberOnlyEE((emit) => {
    let tickCount = 0
    setInterval(() => emit('tick', tickCount++), 1000)
  })
}
