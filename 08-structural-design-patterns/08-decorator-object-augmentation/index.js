class Calculator {
  divide (dividend, divisor) {
    return dividend / divisor
  }

  multiply (multiplier, multiplicand) {
    return multiplier * multiplicand
  }
}

function enhanceCalculator (calculator) {
  // new method
  calculator.add = function (...addends) {
    return addends.reduce((a, b) => a + b, 0)
  }
  return calculator
}

const calculator = new Calculator()
const enhancedCalculator = enhanceCalculator(calculator)

console.log(enhancedCalculator instanceof Calculator) // true
console.log(enhancedCalculator.multiply(3, 2)) // uses original method
console.log(enhancedCalculator.add(4, 3, 2, 1)) // uses new method
