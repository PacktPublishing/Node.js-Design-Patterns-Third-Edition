export function decorate (component) {
  function greetings () {
    return 'Hi!'
  }

  const decoratedComponent = new Proxy(component, {
    get (target, propKey, receiver) {
      if (propKey === 'greetings') {
        return greetings.bind(target)
      }
      return target[propKey]
    }
  })

  return decoratedComponent
}
