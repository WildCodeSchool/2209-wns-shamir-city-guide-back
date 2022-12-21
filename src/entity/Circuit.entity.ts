import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
//import City from "./";
//import Circuit from "./";


@ObjectType()
@Entity()
export default class Circuit {
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
  description: string;

  @Field()
  @Column()
  price: number;

//@ManyToOne(() => City, (city) => city.circuit, { eager:true,}) city: City;
//@ManyToOne(() => category, (category) => category.circuit, { eager:true}) category: Category;

}