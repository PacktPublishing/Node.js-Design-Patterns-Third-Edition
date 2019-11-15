function asyncOperation (cb) {
  process.nextTick(cb)
}

function task1 (cb) {
  asyncOperation(() => {
    task2(cb)
  })
}

function task2 (cb) {
  asyncOperation(() => {
    task3(cb)
  })
}

function task3 (cb) {
  asyncOperation(() => {
    cb() // finally executes the callback
  })
}

task1(() => {
  // executed when task1, task2 and task3 are completed
  console.log('tasks 1, 2 and 3 executed')
})
