export default function log (message) {
  console.log(message)
}

export function info (message) {
  log(`info: ${message}`)
}
