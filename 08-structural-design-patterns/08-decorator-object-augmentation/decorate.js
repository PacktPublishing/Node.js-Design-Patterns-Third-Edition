export function decorate (component) {
  // new method
  component.greetings = () => {
    return 'Hi!'
  }
  return component
}
