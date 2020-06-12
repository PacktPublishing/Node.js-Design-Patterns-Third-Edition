class Calculator {
  divide (dividend, divisor) {
    return dividend / divisor
  }

  multiply (multiplier, multiplicand) {
    return multiplier * multiplicand
  }
}

class EnhancedCalculator extends Calculator {
  constructor (calculator) {
    super()
    this.calculator = calculator
  }

  // new method
  add (...addends) {
    return addends.reduce((a, b) => a + b, 0)
  }

  // modified method
  divide (dividend, divisor) {
    if (divisor === 0) {
      throw Error('Division by 0')
    }

    return this.calculator(dividend, divisor)
  }

  // delegated method
  multiply (...args) {
    return this.calculator.multiply(...args)
  }
}

const calculator = new Calculator()
const enhancedCalculator = new EnhancedCalculator(calculator)

console.log(enhancedCalculator instanceof Calculator) // true
console.log(enhancedCalculator.add(4, 3, 2, 1)) // 10
console.log(enhancedCalculator.multiply(3, 2)) // 6
// console.log(enhancedCalculator.divide(3, 0)) // Error('Division by 0')
