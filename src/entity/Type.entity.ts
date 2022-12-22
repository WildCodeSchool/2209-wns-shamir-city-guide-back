import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import PointOfInterest from "./PointOfInterest.entity";

@ObjectType()
@Entity()
export default class Type {
  @Field(() => ID)
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
  logo: string;

  @Field()
  @Column({
    unique: true
  })
  color: string;
    
  @OneToMany(() => PointOfInterest, (pointOfInterest) => pointOfInterest.type)
  pointsOfInterest: PointOfInterest[];
}
