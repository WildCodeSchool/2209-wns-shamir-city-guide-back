import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import PointOfInterest from "./PointOfInterest.entity";
import Circuit from "./Circuit.entity";

@ObjectType()
@Entity()
export default class City {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({unique: true, length: 255})
  name: string;

  @Field()
  @Column({length: 255})
  latitude!: string;

  @Field()
  @Column({length: 255})
  longitude!: string;

  @Field()
  @Column({length: 255})
  picture: string;

  @Field(() => [Circuit])
  @OneToMany(
    () => Circuit, 
    (circuit) => circuit.city, 
    {eager: true}
  )
  circuits?: Circuit[];

  @Field(() => [PointOfInterest])
  @OneToMany(
    () => PointOfInterest, 
    (pointOfInterest) => pointOfInterest.city,
    {eager: true}
  )
  pointsOfInterest?: PointOfInterest[];
}