function delay (milliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date())
    }, milliseconds)
  })
}

console.log(`Delaying...${new Date().getSeconds()}s`)

delay(1000)
  .then(newDate => {
    console.log(`Done ${newDate.getSeconds()}s`)
  })
