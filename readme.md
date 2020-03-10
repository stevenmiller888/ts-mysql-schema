# ts-mysql-schema

![Alt Text](https://github.com/stevenmiller888/ts-mysql-schema/workflows/CI/badge.svg)

> A schema extractor for MySQL.

![Alt Text](https://github.com/stevenmiller888/ts-mysql-schema/raw/master/.github/code.png)

## Installation

```shell
yarn add ts-mysql-schema
# or
npm install ts-mysql-schema
```

## Usage

```typescript
import { MySQLSchema } from 'ts-mysql-schema'

const mySQLSchema = new MySQLSchema({
  uri: 'mysql://root@127.0.0.1:3010/test'
})

const schema = await mySQLSchema.getSchema()
console.log(schema)
```

## Credit

The code is mostly derived from Netto Farah's awesome [mysql-schema-ts](https://github.com/nettofarah/mysql-schema-ts) library. The difference here is that instead of returning the converted TypeScript interfaces, we're just returning the schema.

## Related

- [ts-mysql-parser](https://github.com/stevenmiller888/ts-mysql-parser) - A standalone, grammar-complete MySQL parser
- [ts-mysql-uri](https://github.com/stevenmiller888/ts-mysql-uri) - Parse a MySQL connection URI
- [ts-antlr4-scanner](https://github.com/stevenmiller888/ts-antlr4-scanner) - A scanner for antlr4-based lexers

## License

[MIT](https://tldrlegal.com/license/mit-license)

---

> [stevenmiller888.github.io](https://stevenmiller888.github.io) &nbsp;&middot;&nbsp;
> GitHub [@stevenmiller888](https://github.com/stevenmiller888) &nbsp;&middot;&nbsp;
> Twitter [@stevenmiller888](https://twitter.com/stevenmiller888)
