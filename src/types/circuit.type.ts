import "reflect-metadata";
import { Field, InputType } from "type-graphql";
import { CityType } from "./city.type";
import { CategoryType } from "./category.type";
import { PoiType } from "./poi.type";

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
  city: CityType;

  @Field()
  category: CategoryType;

  @Field(() => [PoiType])
  pois: PoiType[];
}
