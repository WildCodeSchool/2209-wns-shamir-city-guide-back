import { Column, Entity, ManyToOne, ManyToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
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
  @Column({
    unique: true
  })
  name: string;

  @Field()
  @Column({
    unique: true
  })
  picture: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({
    nullable: true
  })
  price: number;

  @ManyToOne(() => City, (city) => city.circuits, { eager:true,}) 
  @JoinColumn({ name: "city_id" })
  city: City;

  @ManyToOne(() => Category, (category) => category.circuits, { eager:true})
  @JoinColumn({ name: "categorie_id" })
  category: Category;

  @ManyToMany(() => PointOfInterest, (pointOfInterest) => pointOfInterest.circuits)
  @JoinTable({ 
    name: 'circuit_point_of_interest',
    joinColumn: {name: "circuit_id"},
    inverseJoinColumn: {name: "point_of_interest_id"}
  })
  pointsOfInterest: PointOfInterest[]
}