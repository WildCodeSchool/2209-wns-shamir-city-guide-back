import { Column, Entity, ManyToOne, ManyToMany, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import City from "./City.entity";
import Type from "./Type.entity";
import Tag from "./Tag.entity";
import Circuit from "./Circuit.entity";
import { JoinTable } from "typeorm";


@ObjectType()
@Entity()
export default class PointOfInterest {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({unique: true, length: 255})
  name: string;

  @Field()
  @Column({unique: true})
  address: string;

  @Field()
  @Column({length: 255})
  latitude: string;

  @Field()
  @Column({length: 255})
  longitude: string;

  @Field()
  @Column({unique: true, length: 255})
  picture: string;

  @ManyToOne(() => City, (city) => city.pointsOfInterest) 
  @JoinColumn({name: "city_id"})
  city: City;

  @ManyToOne(() => Type, (type) => type.pointsOfInterest) 
  @JoinColumn({name: "type_id"})
  type: Type;

  @ManyToMany(() => Circuit, (circuit) => circuit.pointsOfInterest)
  circuits?: Circuit[]
  
  @ManyToMany(() => Tag, (tag) => tag.pointsOfInterest)
  @JoinTable({ 
    name: 'point_of_interest_tag',
    joinColumn: {name: "point_of_interest_id"},
    inverseJoinColumn: {name: "tag_id"}
  })
  tags?: Tag[];
}
