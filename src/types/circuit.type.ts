import "reflect-metadata";
import { Field, InputType, Int } from "type-graphql";


@InputType()
export class CircuitType {
  @Field({ nullable: true })
  id: number;

  @Field()
  name: string;

  @Field()
  picture: string;

  @Field()
  description: string;

  @Field({nullable: true})
  price: number;

  @Field()
  cityId: number;

  @Field()
  categoryId: number;

  @Field(() => [Int])
  pois: number[];
}
