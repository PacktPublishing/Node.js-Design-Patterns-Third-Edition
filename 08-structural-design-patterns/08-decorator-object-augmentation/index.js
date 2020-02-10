import { decorate } from './decorate.js'

class Greeter {
  hello (subject) {
    return `Hello ${subject}`
  }
}

const decoratedGreeter = decorate(new Greeter())
console.log(decoratedGreeter.hello('world')) // uses original method
console.log(decoratedGreeter.greetings()) // uses new method
