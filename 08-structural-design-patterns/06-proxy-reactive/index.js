import { createObservable } from './create-observable.js'

const invoice = {
  partial: 100,
  discount: 10,
  vat: 20
}
let total

function calculateTotal () {
  total = invoice.partial - invoice.discount + invoice.vat
  console.log('NEW TOTAL:', total)
}

const observableInvoice = createObservable(invoice, calculateTotal)

observableInvoice.partial = 200 // NEW TOTAL: 210
observableInvoice.discount = 50 // NEW TOTAL: 170
observableInvoice.vat = 30 // NEW TOTAL: 180
