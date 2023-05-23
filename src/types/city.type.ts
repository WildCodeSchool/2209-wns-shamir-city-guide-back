import { Field, InputType } from "type-graphql";


@InputType()
export class CityType {
    @Field({nullable: true})
    id: number

    @Field()
    name: string

    @Field()
    latitude: string

    @Field()
    longitude: string

    @Field()
    picture: string

    @Field({nullable: true})
    userId: number
}
