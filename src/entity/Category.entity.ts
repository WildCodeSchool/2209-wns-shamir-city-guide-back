import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
<<<<<<< HEAD
import Circuit from "./Circuit.entity"
=======
import Circuit from "../entity/Circuit.entity";
>>>>>>> 90ab06357821a6c0ae430e8610297b2741c363d1

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


  @OneToMany(() => Circuit, (circuit) => circuit.category, {
    eager: true,
  })
  circuit: Circuit[];

}