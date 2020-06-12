class Calculator {
  divide (dividend, divisor) {
    return dividend / divisor
  }

  multiply (multiplier, multiplicand) {
    return multiplier * multiplicand
  }
}

function patchCalculator (calculator) {
  // new method
  calculator.add = function (...addends) {
    return addends.reduce((a, b) => a + b, 0)
  }

  // modified method
  const divideOrig = calculator.divide
  calculator.divide = (dividend, divisor) => {
    if (divisor === 0) {
      throw Error('Division by 0')
    }

    return divideOrig(dividend, divisor)
  }

  return calculator
}

const calculator = new Calculator()
const enhancedCalculator = patchCalculator(calculator)

console.log(enhancedCalculator instanceof Calculator) // true
console.log(enhancedCalculator.multiply(3, 2)) // 6
console.log(enhancedCalculator.add(4, 3, 2, 1)) // 10
console.log(calculator.add(4, 3, 2, 1)) // 10!
// console.log(enhancedCalculator.divide(3, 0)) // Error('Division by 0')
