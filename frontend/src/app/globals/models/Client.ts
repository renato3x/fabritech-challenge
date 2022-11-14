import { Address } from "./Address"
import { Kinship } from "./Kinship"

export interface Client {
  id?: number
  firstName: string
  lastName: string
  birthDate: Date
  cpf: string
  rg: string
  telephone: string
  email: string
  address: Address
  kinships: Kinship[]
  createdAt?: Date
  updatedAt?: Date
}
