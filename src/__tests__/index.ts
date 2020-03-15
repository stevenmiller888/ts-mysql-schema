import { MySQLSchema } from '../'

describe('MySQLSchema', () => {
  it('extracts the schema', async () => {
    const mySQLSchema = new MySQLSchema({
      uri: 'mysql://root@127.0.0.1:3310/test'
    })

    const schema = await mySQLSchema.getSchema()
    expect(schema).toMatchInlineSnapshot(`
      Object {
        "config": Object {
          "host": "127.0.0.1",
          "password": "",
          "port": "3310",
          "schema": "test",
          "scheme": "mysql",
          "username": "root",
        },
        "tables": Array [
          Object {
            "columns": Array [
              Object {
                "default": null,
                "index": null,
                "name": "id",
                "optional": false,
                "sqlType": "varbinary",
                "tsType": "string",
              },
              Object {
                "default": null,
                "index": null,
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
                "index": "primary",
                "name": "id",
                "optional": false,
                "sqlType": "varbinary",
                "tsType": "string",
              },
              Object {
                "default": "CURRENT_TIMESTAMP",
                "index": null,
                "name": "created",
                "optional": false,
                "sqlType": "timestamp",
                "tsType": "date",
              },
              Object {
                "default": "1",
                "index": null,
                "name": "enabled",
                "optional": false,
                "sqlType": "tinyint",
                "tsType": "boolean",
              },
              Object {
                "default": null,
                "index": null,
                "name": "friends",
                "optional": false,
                "sqlType": "int",
                "tsType": "number",
              },
              Object {
                "default": null,
                "index": "nonunique",
                "name": "project",
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
