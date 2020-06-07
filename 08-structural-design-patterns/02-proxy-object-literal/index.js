class Calculator {
  divide (dividend, divisor) {
    return dividend / divisor
  }

  multiply (multiplier, multiplicand) {
    return multiplier * multiplicand
  }
}

function createSafeCalculator (calculator) {
  return {
    // proxied method
    divide (dividend, divisor) {
      // additional validation logic
      if (divisor === 0) {
        throw Error('Division by 0')
      }

      return calculator.divide(dividend, divisor)
    },

    // delegated method
    multiply (multiplier, multiplicand) {
      return calculator.multiply(multiplier, multiplicand)
    }
  }
}

const calculator = new Calculator()
const safeCalculator = createSafeCalculator(calculator)

console.log(safeCalculator instanceof Calculator) // false!
console.log(calculator.multiply(3, 2)) // 6
console.log(safeCalculator.multiply(3, 2)) // 6
console.log(calculator.divide(4, 2)) // 2
console.log(safeCalculator.divide(4, 2)) // 2
console.log(calculator.divide(2, 0)) // Infinity
console.log(safeCalculator.divide(2, 0)) // Error('Division by 0')
