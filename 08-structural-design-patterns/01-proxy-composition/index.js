function createSafeCalculator (subjectCalculator) {
  const proto = Object.getPrototypeOf(subjectCalculator)

  function ProxyObj () {}

  ProxyObj.prototype = Object.create(proto)

  // proxied method
  ProxyObj.prototype.divide = function (dividend, divisor) {
    // additional validation logic
    if (divisor === 0) {
      throw Error('Division by 0')
    }

    return subjectCalculator.divide(dividend, divisor)
  }

  // delegated method
  ProxyObj.prototype.multiply = function (multiplier, multiplicand) {
    return subjectCalculator.multiply(multiplier, multiplicand)
  }

  return new ProxyObj()
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
console.log(calculator.divide(2, 0)) // Infinity
console.log(safeCalculator.divide(2, 0)) // Error: Division by 0
