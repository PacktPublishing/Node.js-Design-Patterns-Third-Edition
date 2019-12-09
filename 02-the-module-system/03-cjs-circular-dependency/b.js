exports.loaded = false

const a = require('./a')

module.exports = {
  aWasLoaded: a.loaded,
  loaded: true
}
