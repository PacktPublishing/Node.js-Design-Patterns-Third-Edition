const tasks = [
  (cb) => {
    console.log('Task 1')
    setTimeout(cb, 1000)
  },
  (cb) => {
    console.log('Task 2')
    setTimeout(cb, 1000)
  },
  (cb) => {
    console.log('Task 3')
    setTimeout(cb, 1000)
  }
]

function iterate (index) {
  if (index === tasks.length) {
    return finish()
  }
  const task = tasks[index]
  task(() => iterate(index + 1))
}

function finish () {
  // iteration completed
  console.log('All tasks executed')
}

iterate(0)
