// avoid name clash
import { log as log2 } from './logger.js'
const log = console.log

log('message from log')
log2('message from log2')
