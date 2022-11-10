import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
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

  @Column()
  @IsNotEmpty({ message: '$property is required' })
  cpf: string

  @Column()
  @IsNotEmpty({ message: '$property is required' })
  rg: string

  @Column()
  @IsNotEmpty({ message: '$property is required' })
  telephone: string

  @Column()
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

  constructor(user: Partial<Client>) {
    Object.assign(this, user)
  }
}
