class Calculator {
  divide (dividend, divisor) {
    return dividend / divisor
  }

  multiply (multiplier, multiplicand) {
    return multiplier * multiplicand
  }
}

export function enhanceCalculator (calculator) {
  function add (...addends) {
    return addends.reduce((a, b) => a + b, 0)
  }

  const enhancedCalculator = new Proxy(calculator, {
    get (target, propKey, receiver) {
      if (propKey === 'add') {
        return add.bind(target)
      }
      return target[propKey]
    }
  })

  return enhancedCalculator
}

const calculator = new Calculator()
const enhancedCalculator = enhanceCalculator(calculator)

console.log(enhancedCalculator instanceof Calculator) // true
console.log(enhancedCalculator.multiply(3, 2)) // uses original method
console.log(enhancedCalculator.add(4, 3, 2, 1)) // uses new method
