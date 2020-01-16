import { Image } from './image.js'

// Factory function
function createImage (name) {
  return new Image(name)
}

// Factory invocation
const image = createImage('photo.jpeg')

console.log(image)
