const SUPPORTED_LANGUAGES = ['it', 'en', 'es']
const chosenLanguage = process.argv[2]

if (!SUPPORTED_LANGUAGES.includes(chosenLanguage)) {
  console.error('The language specified is not supported')
  process.exit(1)
}

const translationModule = `./strings-${chosenLanguage}.js`
import(translationModule)
  .then((module) => {
    console.log(module.HELLO)
  })
