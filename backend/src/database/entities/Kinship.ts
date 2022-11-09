import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";

@Entity()
export class Kinship {

  @PrimaryGeneratedColumn('increment')
  id?: number

  @Column()
  name: string

  @Column()
  kinship: string

  @ManyToOne(() => Client, client => client.kinships, {
    onDelete: 'CASCADE'
  })
  client: Client
}
