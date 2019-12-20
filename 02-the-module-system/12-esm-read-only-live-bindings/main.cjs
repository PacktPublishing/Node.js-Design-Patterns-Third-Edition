const counter = require('./counter.cjs')

console.log(counter.count) // prints 0
counter.increment()
console.log(counter.count) // prints 1
counter.count++
console.log(counter.count) // prints 2
counter.increment()
console.log(counter.count) // prints 3
