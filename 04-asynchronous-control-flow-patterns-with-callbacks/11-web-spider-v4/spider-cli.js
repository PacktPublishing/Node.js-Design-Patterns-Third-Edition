'use strict'

import TaskQueue from './TaskQueue.js'
import spider from './spider.js'

const url = process.argv[2]
const nesting = Number.parseInt(process.argv[3]) || 1
const parallel = Number.parseInt(process.argv[4]) || 2

const spiderQueue = new TaskQueue(parallel)
spiderQueue.on('error', console.error)
spiderQueue.on('empty', () => console.log('Download complete'))

spider(url, nesting, spiderQueue)
