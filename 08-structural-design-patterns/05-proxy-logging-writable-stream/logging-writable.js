export function createLoggingWritable (writable) {
  const proxiedWrite = new Proxy(writable.write, { // ①
    apply (target, thisArg, args) { // ②
      const [chunk] = args
      console.log('Writing', chunk)
      return target.apply(thisArg, args)
    }
  })

  const proxiedInstance = new Proxy(writable, { // ③
    get (target, propKey, receiver) { // ④
      if (propKey === 'write') {
        return proxiedWrite
      }
      return target[propKey]
    }
  })

  return proxiedInstance
}
