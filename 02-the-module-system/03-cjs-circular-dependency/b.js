exports.loaded = false

const a = require('./a')

module.exports = {
  a,
  loaded: true // overrides the previous export
}
