const A_CHAR_CODE = 65
const Z_CHAR_CODE = 90

function makeAlphabetIterator () {
  let currCode = A_CHAR_CODE

  return {
    next () {
      const currChar = String.fromCodePoint(currCode)
      if (currCode > Z_CHAR_CODE) {
        return { done: true }
      }

      currCode++
      return { value: currChar, done: false }
    }
  }
}

const iterator = makeAlphabetIterator()
let iterationResult = iterator.next()
while (!iterationResult.done) {
  console.log(iterationResult.value)
  iterationResult = iterator.next()
}
