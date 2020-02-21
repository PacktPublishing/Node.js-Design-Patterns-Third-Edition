import { Matrix } from './matrix.js'

const matrix2x2 = new Matrix([
  ['11', '12'],
  ['21', '22']
])

console.log('for...of:')
for (const element of matrix2x2) {
  console.log(element)
}

console.log('spread operator:')
const flattenedMatrix = [...matrix2x2]
console.log(flattenedMatrix)

console.log('destructuring assignment:')
const [oneOne, oneTwo, twoOne, twoTwo] = matrix2x2
console.log(oneOne, oneTwo, twoOne, twoTwo)
