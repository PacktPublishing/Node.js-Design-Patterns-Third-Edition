export function createProxy (subject) {
  return {
    // proxied method
    hello: () => (subject.hello() + ' world!'),

    // delegated method
    goodbye: () => (subject.goodbye.apply(subject, arguments))
  }
}
