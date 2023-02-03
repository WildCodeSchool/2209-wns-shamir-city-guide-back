import { Column, Entity, ManyToOne, ManyToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import City from "./City.entity";
import Category from "./Category.entity";
import PointOfInterest from "./PointOfInterest.entity";
import { JoinTable } from "typeorm";


@ObjectType()
@Entity()
export default class Circuit {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({unique: true, length: 255})
  name: string;

  @Field()
  @Column({unique: true, length: 255})
  picture: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({nullable: true})
  price: number;

  @ManyToOne(() => City, (city) => city.circuits, {
    onDelete: 'CASCADE'
  }) 
  @JoinColumn({ name: "city_id" })
  city: City;
 
  @Field()
  @ManyToOne(() => Category, (category) => category.circuits, { 
      eager:true,
      onDelete: 'SET NULL',
      nullable: true
    }
  )
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Field(() => [PointOfInterest])
  @ManyToMany(() => PointOfInterest, (pointOfInterest) => pointOfInterest.circuits, {eager: true})
  @JoinTable({ 
    name: 'circuit_point_of_interest',
    joinColumn: {name: "circuit_id"},
    inverseJoinColumn: {name: "point_of_interest_id"}
  }) 
  pointsOfInterest: PointOfInterest[]
}