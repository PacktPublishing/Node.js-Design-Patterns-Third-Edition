class Calculator {
  divide (dividend, divisor) {
    return dividend / divisor
  }

  multiply (multiplier, multiplicand) {
    return multiplier * multiplicand
  }
}

const safeCalculatorHandler = {
  get: (target, property) => {
    if (property === 'divide') {
      // proxied method
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
const safeCalculator = new Proxy(calculator, safeCalculatorHandler)

console.log(safeCalculator instanceof Calculator) // true!
console.log(calculator.multiply(3, 2)) // 6
console.log(safeCalculator.multiply(3, 2)) // 6
console.log(calculator.divide(4, 2)) // 2
console.log(safeCalculator.divide(4, 2)) // 2
console.log(calculator.divide(2, 0)) // Infinity
console.log(safeCalculator.divide(2, 0)) // Error('Division by 0')
