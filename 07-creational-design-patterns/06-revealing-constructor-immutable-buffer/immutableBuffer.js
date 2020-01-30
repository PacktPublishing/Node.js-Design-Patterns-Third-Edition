const MODIFIER_NAMES = ['swap', 'write', 'fill']

export class ImmutableBuffer {
  constructor (size, executor) {
    const buffer = Buffer.alloc(size)
    const modifiers = {}
    for (const prop in buffer) {
      if (typeof buffer[prop] !== 'function') {
        continue
      }

      if (MODIFIER_NAMES.some(m => prop.startsWith(m))) {
        modifiers[prop] = buffer[prop].bind(buffer)
      } else {
        this[prop] = buffer[prop].bind(buffer)
      }
    }

    executor(modifiers)
  }
}
