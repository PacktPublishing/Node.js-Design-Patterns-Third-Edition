
function * fruitGenerator () {
  yield 'peach'
  yield 'watermelon'
  return 'summer'
}

const fruitGeneratorObj = fruitGenerator()
console.log(fruitGeneratorObj.next())
console.log(fruitGeneratorObj.next())
console.log(fruitGeneratorObj.next())

console.log('Using for...of:')

for (const fruit of fruitGenerator()) {
  console.log(fruit)
}
