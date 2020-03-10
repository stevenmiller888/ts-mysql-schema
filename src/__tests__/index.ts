import { MySQLSchema } from '../'

describe('MySQLSchema', () => {
  it('extracts the schema', async () => {
    const mySQLSchema = new MySQLSchema({
      uri: 'mysql://root@127.0.0.1:3010/test'
    })

    const schema = await mySQLSchema.getSchema()
    expect(schema).toMatchInlineSnapshot(`
      Object {
        "config": Object {
          "host": "127.0.0.1",
          "password": "",
          "port": "3010",
          "schema": "test",
          "scheme": "mysql",
          "username": "root",
        },
        "tables": Array [
          Object {
            "columns": Array [
              Object {
                "default": null,
                "name": "id",
                "optional": false,
                "sqlType": "varbinary",
                "tsType": "string",
              },
              Object {
                "default": null,
                "name": "visibility",
                "optional": false,
                "sqlType": "enum",
                "tsType": "string",
              },
            ],
            "name": "posts",
          },
          Object {
            "columns": Array [
              Object {
                "default": null,
                "name": "id",
                "optional": false,
                "sqlType": "varbinary",
                "tsType": "string",
              },
              Object {
                "default": "CURRENT_TIMESTAMP",
                "name": "created",
                "optional": false,
                "sqlType": "timestamp",
                "tsType": "date",
              },
              Object {
                "default": "1",
                "name": "enabled",
                "optional": true,
                "sqlType": "tinyint",
                "tsType": "boolean",
              },
              Object {
                "default": null,
                "name": "friends",
                "optional": true,
                "sqlType": "int",
                "tsType": "number",
              },
            ],
            "name": "users",
          },
        ],
      }
    `)
  })
})
