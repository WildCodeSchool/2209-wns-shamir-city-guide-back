import { Field, InputType } from "type-graphql";
import { UserType } from "./user.type";


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
    user: UserType
}
