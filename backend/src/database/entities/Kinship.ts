import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Client } from "./Client";

@Entity()
export class Kinship {

  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column()
  @IsNotEmpty({ message: '$property is required' })
  name: string

  @Column()
  @IsNotEmpty({ message: '$property is required' })
  kinship: string

  @ManyToOne(() => Client, client => client.kinships, {
    onDelete: 'CASCADE'
  })
  client: Client

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  constructor(kinship: Partial<Kinship>) {
    Object.assign(this, kinship)
  }
}
