import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import Circuit from "./Circuit.entity"

@ObjectType()
@Entity()
export default class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    unique: true,
    length: 255
  })
  name: string;

  @Field()
  @Column({
    unique: true,
    length: 7
  })
  color: string;

  @Field()
  @Column({length: 255})
  icon: string;


  @OneToMany(() => Circuit, (circuit) => circuit.category)
  circuits: Circuit[];
}