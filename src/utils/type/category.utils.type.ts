import { Field, InputType } from "type-graphql";

@InputType()
export class CategoryType {
  @Field({ nullable: true })
  id: number;

  @Field()
  name: string;

  @Field()
  icon: string;

  @Field()
  color: string;
}
