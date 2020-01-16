import { Image } from './image.js'

export class ImageGif extends Image {
  constructor (path) {
    if (!path.match(/\.gif/)) {
      throw new Error(`${path} is not a GIF image`)
    }
    super(path)
  }
}
