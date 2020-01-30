import { getDbInstance as getDbFromA } from 'package-a'
import { getDbInstance as getDbFromB } from 'package-b'

const isSame = getDbFromA() === getDbFromB()
console.log(`Is the db instance in package-b the same as package-b? ${isSame ? 'YES' : 'NO'}`)
