import { asyncRoutine } from './asyncRoutine.js'
import { createCancelWrapper } from './cancelWrapper.js'
import { CancelError } from './cancelError.js'

async function cancelable (cancelWrapper) {
  const resA = await cancelWrapper(asyncRoutine, 'A')
  console.log(resA)
  const resB = await cancelWrapper(asyncRoutine, 'B')
  console.log(resB)
  const resC = await cancelWrapper(asyncRoutine, 'C')
  console.log(resC)
}

const { cancelWrapper, cancel } = createCancelWrapper()

cancelable(cancelWrapper)
  .catch(err => {
    if (err instanceof CancelError) {
      console.log('Function canceled')
    } else {
      console.error(err)
    }
  })

setTimeout(() => {
  cancel()
}, 100)
