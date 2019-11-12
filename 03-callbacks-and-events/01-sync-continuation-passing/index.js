/* eslint standard/no-callback-literal: 0 */

function add (a, b) {
  return a + b
}

function addCps (a, b, cb) {
  cb(a + b)
}

console.log('before')
add(1, 2, result => console.log('Result: ' + result))
console.log('after')

console.log('cps: before')
addCps(1, 2, result => console.log('Result: ' + result))
console.log('cps: after')
