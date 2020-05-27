import { createReadStream } from 'fs'
import { createGunzip } from 'zlib'
import parse from 'csv-parse'
import { FilterByCountry } from './filter-by-country.js'
import { SumProfit } from './sum-profit.js'

const csvParser = parse({ columns: true })

// A small difference from the code presented in the book is that
// here we have gzipped the data to keep the download size of the repository
// as small as possible. For this reason we added an extra step that decompresses
// the data on the fly. The final result doesn't change
createReadStream('data.csv.gz')
  .pipe(createGunzip())
  .pipe(csvParser)
  .pipe(new FilterByCountry('Italy'))
  .pipe(new SumProfit())
  .pipe(process.stdout)
