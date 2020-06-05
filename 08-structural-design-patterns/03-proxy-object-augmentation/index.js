function createSafeCalculator (subjectCalculator) {
  const divideOrig = subjectCalculator.divide
  subjectCalculator.divide = (dividend, divisor) => {
    if (divisor === 0) {
      throw Error('Division by 0')
    }

    return divideOrig.call(subjectCalculator, dividend, divisor)
  }

  return subjectCalculator
}

class Calculator {
  divide (dividend, divisor) {
    return dividend / divisor
  }

  multiply (multiplier, multiplicand) {
    return multiplier * multiplicand
  }
}

const calculator = new Calculator()
const safeCalculator = createSafeCalculator(calculator)

console.log(calculator.multiply(3, 2)) // 6
console.log(safeCalculator.multiply(3, 2)) // 6
console.log(calculator.divide(4, 2)) // 2
console.log(safeCalculator.divide(4, 2)) // 2
// console.log(calculator.divide(2, 0)) // Error: Division by 0
console.log(safeCalculator.divide(2, 0)) // Error: Division by 0
