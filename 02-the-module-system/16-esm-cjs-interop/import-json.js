// import data from './data.json' // <- this would fail
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const data = require('./data.json')

console.log(data)
