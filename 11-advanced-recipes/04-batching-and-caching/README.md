# 04-batching-and-caching

This sample demonstrates how asynchronous batching and caching work.

To try the sample, first install its dependencies:

```
npm install
```
  
Next, populate the database with some sample data:

```
node populateDb.js
```

The command above will create 100000 random sales transactions
in the format:

```
{amount, product}
```
  
Next, to start the server, run:

```
node server.js
```

To test the server with multiple concurrent request, simply run:

```
node loadTest.js
```

In the file `server.js`, try to swap between the various implementations
of the `totalSales()` API to compare their performances. Please note that
using the vanilla implementation (`totalSales`) the load test may 
take up to a minute or more to complete.

```
import { totalSales } from './totalSales.js'
// import {totalSales} from './totalSalesBatch.js'
// import {totalSales} from './totalSalesCache.js'
```
