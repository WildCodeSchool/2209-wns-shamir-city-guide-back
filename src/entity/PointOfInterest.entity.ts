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

  @ManyToOne(() => City, (city) => city.pointsOfInterest, { eager:true, }) 
  @JoinColumn({ name: "city_id" })
  city: City;

  @ManyToOne(() => Type, (type) => type.pointsOfInterest, { eager:true,}) 
  @JoinColumn({ name: "type_id" })
  type: Type;

  @ManyToMany(() => Circuit, (circuit) => circuit.pointsOfInterest)
  circuits: Circuit[]

  @ManyToMany(() => Tag, (tag) => tag.pointsOfInterest)
  @JoinTable({ 
    name: 'point_of_interest_tag',
    joinColumn: {name: "point_of_interest_id"},
    inverseJoinColumn: {name: "tag_id"}
  })
  tags: Tag[];
}
