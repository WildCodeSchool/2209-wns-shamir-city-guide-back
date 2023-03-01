import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import User from "./User.entity";

@ObjectType()
@Entity()
export default class Role {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({unique: true, length: 255})
  name: string;
  
  @ManyToMany(() => User, (user) => user.roles)
  users?: User[];
}
