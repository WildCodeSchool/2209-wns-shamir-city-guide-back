import { Field, InputType, ObjectType } from "type-graphql";
import Role from "../entities/Role.entity";


@InputType()
export class UserType {
    @Field({nullable: true})
    id: number

    @Field()
    username: string

    @Field()
    email: string

    @Field({nullable: true})
    password?: string
}

@InputType()
export class CleanedUserType {
    @Field({nullable: true})
    id: number

    @Field()
    username: string

    @Field()
    email: string
}

@ObjectType()
export class RegisteredUserType {
    @Field()
    id: number

    @Field()
    username: string

    @Field()
    email: string
}

@ObjectType()
export class AuthenticatedUserType {
    @Field()
    id: number

    @Field()
    username: string

    @Field()
    email: string

    @Field(() => [Role])
    roles: Role[]

    @Field()
    token: string
}
