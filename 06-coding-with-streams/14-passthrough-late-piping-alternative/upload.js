import axios from 'axios'
import { PassThrough } from 'stream'

export function uploadStream (filename) {
  const connector = new PassThrough()

  axios
    .post(
      'http://localhost:3000',
      connector,
      {
        headers: {
          'Content-Type': 'application/octet-stream',
          'X-Filename': filename
        }
      }
    )
    .catch((err) => {
      connector.emit(err)
    })

  return connector
}
