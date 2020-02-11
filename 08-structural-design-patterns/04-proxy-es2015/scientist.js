const scientist = {
  name: 'nikola',
  surname: 'tesla'
}

const uppercaseScientist = new Proxy(scientist, {
  get: (target, property) => target[property].toUpperCase()
})

// prints NIKOLA TESLA
console.log(uppercaseScientist.name, uppercaseScientist.surname)
