import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
//import City from "./";
//import Type from "./";


@ObjectType()
@Entity()
export default class pointOfInterest {
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

  //@ManyToOne(() => City, (city) => city.pointOfInteres, { eager:true, }) city: City;
 //@ManyToOne(() => Type, (type) => type.pointOfInterest, { eager:true,}) type: Type;

}
