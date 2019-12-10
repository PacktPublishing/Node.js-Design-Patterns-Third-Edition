/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "private" }] */

const myModule = (() => {
  const privateFoo = () => {}
  const privateBar = []

  const exported = {
    publicFoo: () => {},
    publicBar: () => {}
  }

  return exported
})() // once the parenthesis here are parsed, the function will be invoked

console.log(myModule)
console.log(myModule.privateFoo, myModule.privateBar)
