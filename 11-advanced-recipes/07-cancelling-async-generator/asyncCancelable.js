import { CancelError } from './cancelError.js'

export function asyncCancelable (generatorFunction) {
  return function (...args) {
    const generatorObject = generatorFunction(...args)
    let cancelRequested = false

    function cancel () {
      cancelRequested = true
    }

    const promise = new Promise((resolve, reject) => {
      function nextStep (prevResult) {
        if (cancelRequested) {
          return reject(new CancelError())
        }

        if (prevResult && prevResult.then) {
          return prevResult
            .then(result => {
              nextStep(result)
            }, err => {
              try {
                nextStep(generatorObject.throw(err))
              } catch (err2) {
                reject(err2)
              }
            })
        }

        try {
          const { value, done } = generatorObject.next(prevResult)
          if (done) {
            return resolve(value)
          }
          nextStep(value)
        } catch (err) {
          reject(err)
        }
      }

      nextStep()
    })

    return { promise, cancel }
  }
}
