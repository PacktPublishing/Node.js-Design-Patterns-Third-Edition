const moduleB = require('./moduleB')

module.exports = {
  run: () => {
    moduleB.log()
  }
}
