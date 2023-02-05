import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import PointOfInterest from "./PointOfInterest.entity";
import Circuit from "./Circuit.entity";
import User from "./User.entity";

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
  @Column({unique: true, length: 255})
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

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.cities, { 
    onDelete: 'SET NULL', 
    eager: true,
    nullable: true 
  }) 
  @JoinColumn({name: "user_id"})
  user: User;
}