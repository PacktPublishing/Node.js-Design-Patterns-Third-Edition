class StackCalculator {
  constructor () {
    this.stack = []
  }

  putValue (value) {
    this.stack.push(value)
  }

  getValue () {
    return this.stack.pop()
  }

  peekValue () {
    return this.stack[this.stack.length - 1]
  }

  clear () {
    this.stack = []
  }

  divide () {
    const divisor = this.getValue()
    const dividend = this.getValue()
    const result = dividend / divisor
    this.putValue(result)
    return result
  }

  multiply () {
    const multiplicand = this.getValue()
    const multiplier = this.getValue()
    const result = multiplier * multiplicand
    this.putValue(result)
    return result
  }
}

const enhancedCalculatorHandler = {
  get (target, property) {
    if (property === 'add') {
      // new method
      return function add () {
        const addend2 = target.getValue()
        const addend1 = target.getValue()
        const result = addend1 + addend2
        target.putValue(result)
        return result
      }
    } else if (property === 'divide') {
      // modified method
      return function () {
        // additional validation logic
        const divisor = target.peekValue()
        if (divisor === 0) {
          throw Error('Division by 0')
        }
        // if valid delegates to the subject
        return target.divide()
      }
    }

    // delegated methods and properties
    return target[property]
  }
}

const calculator = new StackCalculator()
const enhancedCalculator = new Proxy(calculator, enhancedCalculatorHandler)

console.log(enhancedCalculator instanceof StackCalculator) // true!
enhancedCalculator.putValue(4)
enhancedCalculator.putValue(3)
console.log(enhancedCalculator.add()) // 4+3 = 7
enhancedCalculator.putValue(2)
console.log(enhancedCalculator.multiply()) // 7*2 = 14
// enhancedCalculator.putValue(0)
// console.log(enhancedCalculator.divide()) // 14/0 -> Error('Division by 0')
