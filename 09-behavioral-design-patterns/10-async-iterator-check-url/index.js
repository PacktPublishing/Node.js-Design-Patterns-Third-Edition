import { CheckUrl } from './checkUrl.js'

(async () => {
  const checkUrl = new CheckUrl([
    'https://nodejsdesignpatterns.com',
    'https://example.com',
    'https://mustbedownforsurehopefully.com'
  ])

  for await (const status of checkUrl) {
    console.log(status)
  }
})()
