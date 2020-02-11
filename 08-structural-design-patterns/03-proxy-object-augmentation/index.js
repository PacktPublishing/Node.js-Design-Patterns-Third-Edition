import { createProxy } from './create-proxy.js'

class Greeter {
  hello () {
    return 'Hello'
  }

  goodbye () {
    return 'Goodbye'
  }
}

const greeter = new Greeter()
const proxy = createProxy(greeter)

console.log(proxy.hello())
console.log(proxy.goodbye())
