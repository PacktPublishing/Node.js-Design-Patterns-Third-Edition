const scientist = {
  name: 'nikola',
  surname: 'tesla',
  fullName () {
    return `${this.name} ${this.surname}`
  }
}

const uppercaseScientist = new Proxy(scientist, {
  get: (target, property) => {
    if (property === 'fullName') {
      return function () {
        return `${this.name.toUpperCase()} ${this.surname.toUpperCase()}`
      }
    }

    return target[property]
  }
})

console.log(scientist.fullName()) // nikola tesla
console.log(uppercaseScientist.fullName()) // NIKOLA TESLA
