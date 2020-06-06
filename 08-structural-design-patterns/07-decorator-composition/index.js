class Calculator {
  divide (dividend, divisor) {
    return dividend / divisor
  }

  multiply (multiplier, multiplicand) {
    return multiplier * multiplicand
  }
}

function enhanceCalculator (calculator) {
  const proto = Object.getPrototypeOf(calculator)
  function EnhancedCalculator () {}
  EnhancedCalculator.prototype = Object.create(proto)

  // new method
  EnhancedCalculator.prototype.add = function (...addends) {
    return addends.reduce((a, b) => a + b, 0)
  }

  // delegated methods
  EnhancedCalculator.prototype.divide = function (...args) {
    return calculator.divide(...args)
  }
  EnhancedCalculator.prototype.multiply = function (...args) {
    return calculator.multiply(...args)
  }

  return new EnhancedCalculator(calculator)
}

const calculator = new Calculator()
const enhancedCalculator = enhanceCalculator(calculator)

console.log(enhancedCalculator instanceof Calculator) // true
console.log(enhancedCalculator.multiply(3, 2)) // uses original method
console.log(enhancedCalculator.add(4, 3, 2, 1)) // uses new method
