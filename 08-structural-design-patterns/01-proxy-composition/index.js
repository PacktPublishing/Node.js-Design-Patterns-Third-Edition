class StackCalculator {
  constructor () {
    this.stack = []
  }

  putValue (value) {
    this.stack.push(value)
  }

  peekValue () {
    return this.stack[this.stack.length - 1]
  }

  divide () {
    const divisor = this.stack.pop()
    const dividend = this.stack.pop()
    return dividend / divisor
  }

  multiply () {
    const multiplicand = this.stack.pop()
    const multiplier = this.stack.pop()
    return multiplier * multiplicand
  }
}

class SafeCalculator {
  constructor (calculator) {
    this.calculator = calculator
  }

  // proxied method
  divide () {
    // additional validation logic
    const divisor = this.calculator.peekValue()
    if (divisor === 0) {
      throw Error('Division by 0')
    }
    // if valid delegates to the subject
    return this.calculator.divide()
  }

  // delegated methods
  putValue (...args) {
    return this.calculator.putValue(...args)
  }

  peekValue () {
    return this.calculator.peekValue()
  }

  multiply (...args) {
    return this.calculator.multiply(...args)
  }
}

const calculator = new StackCalculator()
const safeCalculator = new SafeCalculator(calculator)

calculator.putValue(3)
calculator.putValue(2)
console.log(calculator.multiply()) // 3*2 = 6

safeCalculator.putValue(3)
safeCalculator.putValue(2)
console.log(safeCalculator.multiply()) // 3*2 = 6

calculator.putValue(4)
calculator.putValue(0)
console.log(calculator.divide()) // 4/0 = Infinity

safeCalculator.putValue(4)
safeCalculator.putValue(0)
console.log(safeCalculator.divide()) // 4/0 -> Error('Division by 0')
