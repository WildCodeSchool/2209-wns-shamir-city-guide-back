import "reflect-metadata";
import { Field, InputType } from "type-graphql";
import { CityType } from "./city.type";
import { TagType } from "./tag.type";
import { TypeType } from "./type.type";

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
  city: CityType;

  @Field()
  type: TypeType;

  @Field(() => [TagType], { nullable: true })
  tags: TagType[];
}
