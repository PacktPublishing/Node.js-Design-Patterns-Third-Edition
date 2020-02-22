export function createProxy (subject) {
  const proto = Object.getPrototypeOf(subject)

  function ProxyObj () {}

  ProxyObj.prototype = Object.create(proto)

  // proxied method
  ProxyObj.prototype.hello = function () {
    return `${subject.hello()} world!`
  }

  // delegated method
  ProxyObj.prototype.goodbye = function (...args) {
    return subject.goodbye(...args)
  }

  return new ProxyObj()
}
