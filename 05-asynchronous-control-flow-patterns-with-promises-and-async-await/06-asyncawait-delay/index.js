function delay (milliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date())
    }, milliseconds)
  })
}

async function playingWithDelays () {
  console.log('Delaying...', new Date())

  const dateAfterOneSecond = await delay(1000)
  console.log(dateAfterOneSecond)

  const dateAfterThreeSeconds = await delay(3000)
  console.log(dateAfterThreeSeconds)

  return 'done'
}

playingWithDelays()
  .then(result => {
    console.log(`After 4 seconds: ${result}`)
  })
