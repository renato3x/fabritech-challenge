import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Address } from './entities/Address'
import { Client } from './entities/Client'
import { Kinship } from './entities/Kinship'
import { User } from './entities/User'

export const dataSource: DataSource = new DataSource({
  type: process.env.DATABASE_TYPE as any,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [Address, Client, Kinship, User],
  extra: {
    trustServerCertificate: true
  }
})
