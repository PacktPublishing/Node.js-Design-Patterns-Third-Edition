// import multiple members of the module
import { log, Logger } from './logger.js'

log('Hello World')
const logger = new Logger('DEFAULT')
logger.log('Hello world')
