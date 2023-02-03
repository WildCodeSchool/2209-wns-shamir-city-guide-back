import { Field, InputType } from "type-graphql";


@InputType()
export class TagType {
    @Field({nullable: true})
    id: number

    @Field()
    name: string

    @Field()
    icon: string
}
