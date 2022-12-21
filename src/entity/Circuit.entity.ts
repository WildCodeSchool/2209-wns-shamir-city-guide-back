import { Column, Entity, ManyToOne, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import City from "./Category.entity";
import Category from "./Category.entity";
import PointOfInterest from "./PointOfInterest.entity";
import { JoinTable } from "typeorm";


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

  @ManyToOne(() => City, (city) => city.circuits, { eager:true,}) city: City;
  @ManyToOne(() => Category, (category) => category.circuits, { eager:true}) category: Category;

  @ManyToMany(() => PointOfInterest, (pointOfInterest) => pointOfInterest.circuits)@JoinTable()
  pointsOfInterest: PointOfInterest[]
}