class Calculator {
  divide (dividend, divisor) {
    return dividend / divisor
  }

  multiply (multiplier, multiplicand) {
    return multiplier * multiplicand
  }
}

class SafeCalculator extends Calculator {
  constructor (calculator) {
    super()
    this.calculator = calculator
  }

  // proxied method
  divide (dividend, divisor) {
    // additional validation logic
    if (divisor === 0) {
      throw Error('Division by 0')
    }
    // if valid delegates to the subject
    return this.calculator.divide(dividend, divisor)
  }

  // delegated method
  multiply (...args) {
    return this.calculator.multiply(...args)
  }
}

const calculator = new Calculator()
const safeCalculator = new SafeCalculator(calculator)

console.log(safeCalculator instanceof Calculator) // true
console.log(calculator.multiply(3, 2)) // 6
console.log(safeCalculator.multiply(3, 2)) // 6
console.log(calculator.divide(4, 2)) // 2
console.log(safeCalculator.divide(4, 2)) // 2
console.log(calculator.divide(2, 0)) // Infinity
console.log(safeCalculator.divide(2, 0)) // Error('Division by 0')
