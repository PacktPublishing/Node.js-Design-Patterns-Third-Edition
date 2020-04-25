import isv from 'indexed-string-variation'
import { createHash } from 'crypto'

export function processTask (task) {
  const variationGen = isv.generator(task.alphabet)
  console.log('Processing from ' +
    `${variationGen(task.batchStart)} (${task.batchStart}) ` +
    `to ${variationGen(task.batchEnd)} (${task.batchEnd})`)

  for (let idx = task.batchStart; idx <= task.batchEnd; idx++) {
    const word = variationGen(idx)
    const shasum = createHash('sha1')
    shasum.update(word)
    const digest = shasum.digest('hex')

    if (digest === task.searchHash) {
      return word
    }
  }
}
