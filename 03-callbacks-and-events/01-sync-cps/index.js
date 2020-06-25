/* eslint standard/no-callback-literal: 0 */

function addCps (a, b, callback) {
  callback(a + b)
}

console.log('before')
addCps(1, 2, result => console.log(`Result: ${result}`))
console.log('after')
