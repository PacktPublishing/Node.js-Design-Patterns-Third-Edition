export function createProxy (subject) {
  return {
    // proxied method
    hello () {
      return `${subject.hello()} world!`
    },

    // delegated method
    goodbye (...args) {
      return subject.goodbye(...args)
    }
  }
}
