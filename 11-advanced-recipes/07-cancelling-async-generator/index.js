import { asyncRoutine } from './asyncRoutine.js'
import { asyncCancellable } from './asyncCancellable.js'
import { CancelError } from './cancelError.js'

const cancellable = asyncCancellable(function * () {
  const resA = yield asyncRoutine('A')
  console.log(resA)
  const resB = yield asyncRoutine('B')
  console.log(resB)
  const resC = yield asyncRoutine('C')
  console.log(resC)
})

const { promise, cancel } = cancellable()
promise.catch(err => {
  if (err instanceof CancelError) {
    console.log('Function canceled')
  }
})

setTimeout(() => {
  cancel()
}, 100)
