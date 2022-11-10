import { IsNotEmpty } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Address {
  
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column()
  @IsNotEmpty({ message: '$property is required' })
  city: string
  
  @Column()
  @IsNotEmpty({ message: '$property is required' })
  name: string

  @Column()
  @IsNotEmpty({ message: '$property is required' })
  cep: string

  @Column()
  @IsNotEmpty({ message: '$property is required' })
  number: number

  @Column()
  @IsNotEmpty({ message: '$property is required' })
  district: string

  @Column()
  @IsNotEmpty({ message: '$property is required' })
  state: string

  @Column()
  @IsNotEmpty({ message: '$property is required' })
  complement: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(address: Partial<Address>) {
    Object.assign(this, address)
  }
}
