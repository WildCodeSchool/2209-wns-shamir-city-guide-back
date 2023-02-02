import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import PointOfInterest from "./PointOfInterest.entity";

@ObjectType()
@Entity()
export default class Type {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({unique: true, length: 255})
  name: string;

  @Field()
  @Column({unique: true, length: 255})
  logo: string;

  @Field()
  @Column({unique: true, length: 255})
  color: string;
    
  @OneToMany(
    () => PointOfInterest, 
    (pointOfInterest) => pointOfInterest.type
  )
  pointsOfInterest?: PointOfInterest[];
}
