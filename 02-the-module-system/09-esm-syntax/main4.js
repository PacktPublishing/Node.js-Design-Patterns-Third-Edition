// name clash
import { log } from './logger.js'
// const log = console.log // <- this would generate a "SyntaxError: Identifier 'log' has already been declared" error
log('Hello world')
