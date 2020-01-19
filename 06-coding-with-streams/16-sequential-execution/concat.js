import { concatFiles } from './concat-files.js'

concatFiles(process.argv[2], process.argv.slice(3), (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log('All files concatenad successfully')
})
