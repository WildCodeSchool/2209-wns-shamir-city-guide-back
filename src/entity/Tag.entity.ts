import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import PointOfInterest from "./PointOfInterest.entity";

@ObjectType()
@Entity()
export default class Tag {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({unique: true})
  name: string;

  @Field()
  @Column()
  icon: string;
  
  @ManyToMany(() => PointOfInterest, (pointOfInterest) => pointOfInterest.tags)
  pointsOfInterest?: PointOfInterest[];
}
