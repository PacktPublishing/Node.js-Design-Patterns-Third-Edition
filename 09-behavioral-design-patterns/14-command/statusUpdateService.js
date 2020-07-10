
const statusUpdates = new Map()

// The Target
export const statusUpdateService = {
  postUpdate (status) {
    const id = Math.floor(Math.random() * 1000000)
    statusUpdates.set(id, status)
    console.log(`Status posted: ${status}`)
    return id
  },

  destroyUpdate (id) {
    statusUpdates.delete(id)
    console.log(`Status removed: ${id}`)
  }
}
