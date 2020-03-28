
export class CancelError extends Error {
  constructor () {
    super('Canceled')
    this.isCanceled = true
  }
}
