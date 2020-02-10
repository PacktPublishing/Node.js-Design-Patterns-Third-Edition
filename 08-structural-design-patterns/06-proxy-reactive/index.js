import { createObservable } from './create-observable.js'

function calculateTotal (invoice) { // ①
  return invoice.subtotal -
    invoice.discount +
    invoice.vat
}

const invoice = {
  subtotal: 100,
  discount: 10,
  vat: 20
}
let total = calculateTotal(invoice)
console.log(`Starting total: ${total}`)

const obsInvoice = createObservable( // ②
  invoice,
  ({ prop, prev, curr }) => {
    total = calculateTotal(invoice)
    console.log(`TOTAL: ${total} (${prop} changed: ${prev} -> ${curr})`)
  }
)

// ③
obsInvoice.subtotal = 200 // TOTAL: 210
obsInvoice.discount = 20 // TOTAL: 200
obsInvoice.discount = 20 // no change: doesn't trigger the observer
obsInvoice.vat = 30 // TOTAL: 210

console.log(`Final total: ${total}`)
