import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
// import { PointOfInterest } from "../entity/PointOfInterest.ts";

@ObjectType()
@Entity()
export default class City {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  latitude: number;

  @Field()
  @Column({type: "decimal", precision: 10, scale: 2, default: 0})
  longitude: number;

  @Field()
  @Column()
  picture: string;

//   @OneToMany(() => PointOfInterest, (pointOfInterest) => pointOfInterest.city)
//   pointOfInterest: PointOfInterest[];
}