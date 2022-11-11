import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  
  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column()
  @IsNotEmpty({ message: '$property is required' })
  firstName: string

  @Column()
  @IsNotEmpty({ message: '$property is required' })
  lastName: string

  @Column({
    unique: true
  })
  @IsNotEmpty({ message: '$property is required' })
  username: string

  @Column({
    unique: true
  })
  @IsNotEmpty({ message: '$property is required' })
  email: string

  @Column()
  @IsNotEmpty({ message: '$property is required' })
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(user: Partial<User>) {
    Object.assign(this, user)
  }
}
