import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Address } from './entities/Address'
import { Client } from './entities/Client'
import { Kinship } from './entities/Kinship'
import { User } from './entities/User'

export const dataSource: DataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  port: 1433,
  username: "sa",
  password: "IXT%)_1069",
  database: "fabritech_challenge",
  synchronize: true,
  logging: false,
  entities: [Address, Client, Kinship, User],
  extra: {
    trustServerCertificate: true
  },
  dropSchema: true
})
