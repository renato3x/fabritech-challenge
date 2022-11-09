import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './Address';

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
}
