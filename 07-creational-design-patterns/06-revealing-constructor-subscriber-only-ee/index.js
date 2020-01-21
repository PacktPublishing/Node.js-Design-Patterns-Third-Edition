import { makeTicker } from './ticker.js'

const ticker = makeTicker()
ticker.on('tick',
  (tickCount) => console.log(`T${tickCount % 2 === 0 ? 'i' : 'o'}ck`, tickCount))

// ticker.emit('an-event') <-- This will fail
