export function decorate (component) {
  const proto = Object.getPrototypeOf(component)

  function Decorator (component) {
    this.component = component
  }

  Decorator.prototype = Object.create(proto)

  // new method
  Decorator.prototype.greetings = function () {
    return 'Hi!'
  }

  // delegated method
  Decorator.prototype.hello = function () {
    return this.component.hello.apply(this.component, arguments)
  }

  return new Decorator(component)
}
