import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const dataSource: DataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  port: 1433,
  username: "sa",
  password: "IXT%)_1069",
  database: "fabritech_challenge",
  synchronize: true,
  logging: true,
  entities: [],
  extra: {
    trustServerCertificate: true
  }
})
