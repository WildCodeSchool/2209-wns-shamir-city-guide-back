import "reflect-metadata";
import { Field, InputType } from "type-graphql";
import Tag from "../../entity/Tag.entity";
import Type from "../../entity/Type.entity";
import { CityType } from "./city.utils.type";
import { TagType } from "./tag.utils.type";
import { TypeType } from "./type.utils.type";

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

  @Field()
  city: CityType;

  @Field()
  type: TypeType;

  @Field(() => [TagType], { nullable: true })
  tags: TagType[];
}
