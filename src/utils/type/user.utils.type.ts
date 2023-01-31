import { Field, InputType, ObjectType } from "type-graphql";


@InputType()
export class UserType {
    @Field({nullable: true})
    id: number

    @Field()
    username: string

    @Field()
    email: string

    @Field({nullable: true})
    password: string
}

@ObjectType()
export class AuthenticatedUserType {
    @Field()
    id: number

    @Field()
    username: string

    @Field()
    email: string

    @Field()
    token: string
}
