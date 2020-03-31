import nunjucks from 'nunjucks'

export function sayHello (name) {
  if (typeof __BROWSER__ !== 'undefined') {
    // client side code
    const template = '<h1>Hello <i>{{ name }}</i></h1>'
    return nunjucks.renderString(template, { name })
  }

  // Node.js code
  return `Hello \u001b[1m${name}\u001b[0m`
}
