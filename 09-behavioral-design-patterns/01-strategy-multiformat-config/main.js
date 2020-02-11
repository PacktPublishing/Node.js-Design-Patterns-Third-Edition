import { Config } from './config.js'
import { jsonStrategy, iniStrategy } from './strategies.js'

(async function () {
  const jsonConfig = new Config(jsonStrategy)
  await jsonConfig.read('samples/conf.json')
  jsonConfig.set('book.nodejs', 'design patterns')
  await jsonConfig.save('samples/conf_mod.json')

  const iniConfig = new Config(iniStrategy)
  await iniConfig.read('samples/conf.ini')
  iniConfig.set('book.nodejs', 'design patterns')
  await iniConfig.save('samples/conf_mod.ini')
})()
