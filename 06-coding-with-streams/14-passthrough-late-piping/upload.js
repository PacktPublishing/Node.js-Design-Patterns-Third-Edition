import axios from 'axios'

export function upload (filename, contentStream) {
  return axios.post(
    'http://localhost:3000',
    contentStream,
    {
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-Filename': filename
      }
    }
  )
}
