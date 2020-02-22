export function createLoggingWritable (writable) {
  return new Proxy(writable, { // ①
    get (target, propKey, receiver) { // ②
      if (propKey === 'write') { // ③
        return function (...args) { // ④
          const [chunk] = args
          console.log('Writing', chunk)
          return writable.write(...args)
        }
      }
      return target[propKey] // ⑤
    }
  })
}
