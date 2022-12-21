import { Column, Entity, ManyToOne, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import City from "./City.entity";
import Type from "./Type.entity";
import Circuit from "./Circuit.entity";


@ObjectType()
@Entity()
export default class PointOfInterest {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  latitude: number;

  @Field()
  @Column()
  longitude: number;

  @Field()
  @Column()
  icon: string;

  @ManyToOne(() => City, (city) => city.pointsOfInterest, { eager:true, }) city: City;
  @ManyToOne(() => Type, (type) => type.pointsOfInterest, { eager:true,}) type: Type;

  @ManyToMany(() => Circuit, (circuit) => circuit.pointsOfInterest)
  circuits: Circuit[]
}
