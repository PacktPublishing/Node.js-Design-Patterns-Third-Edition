import { asyncRoutine } from './asyncRoutine.js'
import { createCancelWrapper } from './cancelWrapper.js'

async function cancelableFunction (cancelWrapper) {
  const resA = await cancelWrapper(asyncRoutine, 'A')
  console.log(resA)
  const resB = await cancelWrapper(asyncRoutine, 'B')
  console.log(resB)
  const resC = await cancelWrapper(asyncRoutine, 'C')
  console.log(resC)
}

const { cancelWrapper, cancel } = createCancelWrapper()

cancelableFunction(cancelWrapper)
  .catch(err => {
    if (err.isCancel) {
      console.log('Function canceled')
    }
  })

setTimeout(() => {
  cancel()
}, 100)
