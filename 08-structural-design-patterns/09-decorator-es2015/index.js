class Calculator {
  divide (dividend, divisor) {
    return dividend / divisor
  }

  multiply (multiplier, multiplicand) {
    return multiplier * multiplicand
  }
}

const enhancedCalculatorHandler = {
  get (target, property) {
    if (property === 'add') {
      // new method
      return function add (...addends) {
        return addends.reduce((a, b) => a + b, 0)
      }
    } else if (property === 'divide') {
      // modified method
      return function (dividend, divisor) {
        if (divisor === 0) {
          throw Error('Division by 0')
        }

        return target.divide(dividend, divisor)
      }
    }

    // delegated methods and properties
    return target[property]
  }
}

const calculator = new Calculator()
const enhancedCalculator = new Proxy(calculator, enhancedCalculatorHandler)

console.log(enhancedCalculator instanceof Calculator) // true
console.log(enhancedCalculator.multiply(3, 2)) // uses original method
console.log(enhancedCalculator.add(4, 3, 2, 1)) // uses new method
// console.log(enhancedCalculator.divide(3, 0)) // Error('Division by 0')
