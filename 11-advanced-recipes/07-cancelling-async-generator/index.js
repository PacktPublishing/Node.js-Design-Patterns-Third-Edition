import { asyncRoutine } from './asyncRoutine.js'
import { asyncCancelable } from './asyncCancelable.js'

const cancelableFunction = asyncCancelable(function * cancelableFunction () {
  const resA = yield asyncRoutine('A')
  console.log(resA)
  const resB = yield asyncRoutine('B')
  console.log(resB)
  const resC = yield asyncRoutine('C')
  console.log(resC)
})

const { promise, cancel } = cancelableFunction()
promise.catch(err => {
  if (err.isCancel) {
    console.log('Function canceled')
  }
})

setTimeout(() => {
  cancel()
}, 100)
