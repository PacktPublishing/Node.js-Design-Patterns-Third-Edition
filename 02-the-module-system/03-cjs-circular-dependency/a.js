exports.loaded = false

const b = require('./b')

module.exports = {
  b,
  loaded: true // overrides the previous export
}
