import { Image } from './image.js'

export class ImageJpeg extends Image {
  constructor (path) {
    if (!path.match(/\.jpe?g$/)) {
      throw new Error(`${path} is not a JPEG image`)
    }
    super(path)
  }
}
