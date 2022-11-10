import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  @IsNotEmpty()
  firstName: string

  @Column()
  @IsNotEmpty()
  lastName: string

  @Column({
    unique: true
  })
  @IsNotEmpty()
  username: string

  @Column({
    unique: true
  })
  @IsNotEmpty()
  email: string

  @Column()
  @IsNotEmpty()
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(user: Partial<User>) {
    Object.assign(this, user)
  }
}
