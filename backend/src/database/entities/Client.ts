import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './Address';
import { Kinship } from './Kinship';

@Entity()
export class Client {

  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  birthDate: Date

  @Column()
  cpf: string

  @Column()
  rg: string

  @Column()
  telephone: string

  @Column()
  email: string

  @OneToOne(() => Address, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  address: Address

  @OneToMany(() => Kinship, kinship => kinship.client, {
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  kinships: Kinship[]
}
