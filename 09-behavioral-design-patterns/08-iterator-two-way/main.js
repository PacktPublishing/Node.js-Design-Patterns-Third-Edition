function * twoWayGenerator () {
  const what = yield null
  console.log('Hello ' + what)
}

const twoWay = twoWayGenerator()
twoWay.next()
twoWay.next('world')

console.log('Throwing an exception:')
const twoWayException = twoWayGenerator()
twoWayException.next()
twoWayException.throw(new Error())
