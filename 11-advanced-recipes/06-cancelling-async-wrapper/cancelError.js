
export class CancelError extends Error {
  constructor () {
    super('Canceled')
    this.isCancel = true
  }
}
