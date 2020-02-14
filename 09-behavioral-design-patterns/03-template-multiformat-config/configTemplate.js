import { promises as frPromises } from 'fs'
import objectPath from 'object-path'

export class ConfigTemplate {
  async load (file) {
    console.log(`Deserializing from ${file}`)
    this.data = this._deserialize(await frPromises.readFile(file, 'utf-8'))
  }

  async save (file) {
    console.log(`Serializing to ${file}`)
    await frPromises.writeFile(file, this._serialize(this.data))
  }

  get (path) {
    return objectPath.get(this.data, path)
  }

  set (path, value) {
    return objectPath.set(this.data, path, value)
  }

  _serialize () {
    throw new Error('_serialize() must be implemented')
  }

  _deserialize () {
    throw new Error('_deserialize() must be implemented')
  }
}
