export function createProxy (subject) {
  const helloOrig = subject.hello
  subject.hello = () => (helloOrig.call(this) + ' world!')

  return subject
}
