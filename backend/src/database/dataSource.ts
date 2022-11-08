import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Address } from './entities/Address'
import { Client } from './entities/Client'

export const dataSource: DataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  port: 1433,
  username: "sa",
  password: "IXT%)_1069",
  database: "fabritech_challenge",
  synchronize: true,
  logging: false,
  entities: [Address, Client],
  extra: {
    trustServerCertificate: true
  }
})
