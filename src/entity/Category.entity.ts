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
  @Column()
  name: string;

  @Field()
  @Column()
  picture: string;

  @Field()
  @Column()
  color: string;

  @Field()
  @Column()
  icon: string;


  @OneToMany(() => Circuit, (circuit) => circuit.category)
  circuits: Circuit[];
}