import { concatFiles } from './concat-files.js'

async function main () {
  try {
    await concatFiles(process.argv[2], process.argv.slice(3))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  console.log('All files concatenated successfully')
}
main()
