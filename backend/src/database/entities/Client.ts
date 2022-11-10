import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { Address } from './Address';
import { Kinship } from './Kinship';
import { IsNotEmpty } from 'class-validator'

@Entity()
@Unique(['cpf', 'rg', 'telephone', 'email'])
export class Client {

  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column()
  @IsNotEmpty({ message: '$property is required' })
  firstName: string

  @Column()
  @IsNotEmpty({ message: '$property is required' })
  lastName: string

  @Column()
  @IsNotEmpty({ message: '$property is required' })
  birthDate: Date

  @Column({
    unique: true
  })
  @IsNotEmpty({ message: '$property is required' })
  cpf: string

  @Column({
    unique: true
  })
  @IsNotEmpty({ message: '$property is required' })
  rg: string

  @Column({
    unique: true
  })
  @IsNotEmpty({ message: '$property is required' })
  telephone: string

  @Column({
    unique: true
  })
  @IsNotEmpty({ message: '$property is required' })
  email: string

  @OneToOne(() => Address, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  @IsNotEmpty({ message: '$property is required' })
  address: Address

  @OneToMany(() => Kinship, kinship => kinship.client, {
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  kinships: Kinship[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(user: Partial<Client>) {
    Object.assign(this, user)
  }
}
