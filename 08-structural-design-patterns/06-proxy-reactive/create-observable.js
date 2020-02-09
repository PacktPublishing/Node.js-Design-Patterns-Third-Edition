export function createObservable (target, listener) {
  const observable = new Proxy(target, {
    set (obj, prop, value) {
      obj[prop] = value
      listener(observable)
      return true
    }
  })

  return observable
}
