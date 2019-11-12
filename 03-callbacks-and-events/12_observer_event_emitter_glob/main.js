/* eslint handle-callback-err: 0 */

const glob = require('glob')

glob('data/*.txt', (error, files) => console.log(`All files found: ${JSON.stringify(files)}`))
  .on('match', match => console.log(`Match found: ${match}`))
