import { MySQLSchema } from '../src'
import util from 'util'

const mySQLSchema = new MySQLSchema({
  uri: 'mysql://root@127.0.0.1:3010/test'
})

mySQLSchema
  .getSchema()
  .then(schema => {
    console.log(util.inspect(schema, false, null, true))
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
  })
