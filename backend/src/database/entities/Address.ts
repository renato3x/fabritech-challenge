import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
  
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column()
  city: string
  
  @Column()
  name: string

  @Column()
  cep: string

  @Column()
  number: number

  @Column()
  district: string

  @Column()
  state: string

  @Column()
  complement: string
}
