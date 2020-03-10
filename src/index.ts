import { Connection, createConnection, QueryError } from 'mysql2'
import { parse, MySQLConnectionConfig } from 'ts-mysql-uri'
import { sqlTypeToTsType } from './lib/sql-type-to-ts-type'
import { SqlDataType } from './lib/data-types'
import sql, { Sql } from 'sql-template-tag'

export type Schema = {
  config: MySQLConnectionConfig
  tables: SchemaTables
}

export type SchemaTables = SchemaTable[]

export type SchemaColumns = SchemaColumn[]

export interface SchemaTable {
  readonly name: string
  readonly columns: SchemaColumns
}

export interface SchemaColumn {
  readonly name: string
  readonly tsType: string
  readonly sqlType: string
  readonly optional: boolean
  readonly default: string | null
}

interface QueryTable {
  table_name: string
}

interface QueryColumn {
  column_name: string
  data_type: SqlDataType
  is_nullable: string
  column_default: string
}

export interface MySQLSchemaOptions {
  readonly uri: string
}

export * from './lib/data-types'
export * from './lib/sql-type-to-ts-type'

export class MySQLSchema {
  private readonly connection: Connection
  private readonly config: MySQLConnectionConfig

  public constructor(options: MySQLSchemaOptions) {
    this.connection = createConnection({ uri: options.uri })
    this.config = parse(options.uri)
  }

  public async getSchema(): Promise<Schema> {
    const tables = await this.queryTables()

    this.connection.end()

    return { config: this.config, tables }
  }

  private async queryTables(): Promise<SchemaTables> {
    const results = await this.query<QueryTable>(
      sql`
        SELECT table_name FROM information_schema.columns
        WHERE table_schema = ${this.config.schema}
        GROUP BY table_name`
    )

    const names = results.map(result => result.table_name)
    const tables = names.map(async name => {
      return {
        name,
        columns: await this.queryColumns(name)
      }
    })

    return Promise.all(tables)
  }

  private async queryColumns(tableName: string): Promise<SchemaColumns> {
    const columns = await this.query<QueryColumn>(
      sql`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_name = ${tableName}
        AND table_schema = ${this.config.schema}`
    )

    return columns.map(column => {
      return {
        name: column.column_name,
        sqlType: column.data_type,
        tsType: sqlTypeToTsType(column.data_type),
        optional: column.is_nullable === 'YES',
        default: column.column_default
      }
    })
  }

  private query<T>(sql: Sql): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.connection?.query(sql, (error: QueryError, results: Array<T>) => {
        if (error) {
          return reject(error)
        }
        return resolve(results)
      })
    })
  }
}
