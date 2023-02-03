import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import City from "./City.entity";
import Role from "./Role.entity";

@ObjectType()
@Entity()
export default class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({unique: true})
  username: string;

  @Field()
  @Column({unique: true})
  email: string;

  @Column()
  hashedPassword: string;

  @Field(() => [Role])
  @ManyToMany(() => Role, (role) => role.users, {
    cascade: true,
    eager: true
  })
  @JoinTable({ 
    name: 'user_role',
    joinColumn: {name: "user_id"},
    inverseJoinColumn: {name: "role_id"},
  })
  roles?: Role[];

  @OneToMany(
    () => City, 
    (city) => city.user
  )
  cities?: City[];
}