import { PassThrough } from 'stream'
import AWS from 'aws-sdk'

const bucketName = process.argv[2] // ①
const keyName = process.argv[3]
const s3 = new AWS.S3()
const objectContent = new PassThrough()

const upload = s3.upload({ // ②
  Bucket: bucketName,
  Key: keyName,
  Body: objectContent
})

upload.send((err, result) => { // ③
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log('Upload completed', result)
})

objectContent.write('Hello ') // ④
objectContent.write('World!')
objectContent.end()
