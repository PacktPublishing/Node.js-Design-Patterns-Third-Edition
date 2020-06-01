function delayError (milliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(`Error after ${milliseconds}ms`))
    }, milliseconds)
  })
}

async function errorNotCaught () {
  try {
    return delayError(1000)
  } catch (err) {
    console.error('Error caught by the async function: ' +
      err.message)
  }
}

errorNotCaught()
  .catch(err => console.error('Error caught by the caller: ' +
    err.message))
