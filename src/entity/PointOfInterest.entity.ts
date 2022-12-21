import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import City from "./City.entity";
import Type from "./Type.entity";


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

  @ManyToOne(() => City, (city) => city.pointOfInterest, { eager:true, }) city: City;
  @ManyToOne(() => Type, (type) => type.pointOfInterest, { eager:true,}) type: Type;

}
