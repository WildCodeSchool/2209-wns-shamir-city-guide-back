import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import City from "./Category.entity";
import Category from "./Category.entity";


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

  @ManyToOne(() => City, (city) => city.circuit, { eager:true,}) city: City;
  @ManyToOne(() => Category, (category) => category.circuit, { eager:true}) category: Category;
}