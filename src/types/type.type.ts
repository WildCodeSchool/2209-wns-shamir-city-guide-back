import { Field, InputType } from "type-graphql";


@InputType()
export class TypeType {
    @Field({nullable: true})
    id: number

    @Field()
    name: string

    @Field()
    logo: string

    @Field()
    color: string
}
