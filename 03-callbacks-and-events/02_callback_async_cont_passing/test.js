/* eslint standard/no-callback-literal: 0 */

function additionAsync (a, b, cb) {
  setTimeout(() => cb(a + b), 100)
}

console.log('before')
additionAsync(1, 2, result => console.log('Result: ' + result))
console.log('after')
