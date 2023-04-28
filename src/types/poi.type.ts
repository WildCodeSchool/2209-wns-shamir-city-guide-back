import "reflect-metadata";
import { Field, InputType, Int } from "type-graphql";


@InputType()
export class PoiType {
  @Field({ nullable: true })
  id: number;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  latitude: string;

  @Field()
  longitude: string;

  @Field()
  picture: string;

  @Field({ nullable: true })
  cityId: number;

  @Field()
  typeId: number;

  @Field(() => [Int])
  tags: number[];
}
