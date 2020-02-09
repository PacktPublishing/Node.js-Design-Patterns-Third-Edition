export function createProxy (subject) {
  const proto = Object.getPrototypeOf(subject)

  function ProxyObj (subject) {
    this.subject = subject
  }

  ProxyObj.prototype = Object.create(proto)

  // proxied method
  ProxyObj.prototype.hello = function () {
    return `${this.subject.hello()} world!`
  }

  // delegated method
  ProxyObj.prototype.goodbye = function () {
    return this.subject.goodbye
      .apply(this.subject, arguments)
  }

  return new ProxyObj(subject)
}
