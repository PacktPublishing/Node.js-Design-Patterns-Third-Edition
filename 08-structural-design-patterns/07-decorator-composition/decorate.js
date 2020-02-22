export function decorate (component) {
  const proto = Object.getPrototypeOf(component)
  function Decorator () {}
  Decorator.prototype = Object.create(proto)

  // new method
  Decorator.prototype.greetings = function () {
    return 'Hi!'
  }

  // delegated method
  Decorator.prototype.hello = function (...args) {
    return component.hello(...args)
  }

  return new Decorator(component)
}
