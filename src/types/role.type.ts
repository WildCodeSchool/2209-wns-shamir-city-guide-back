import { Field, InputType } from "type-graphql";
import { UserType } from "./user.type";


@InputType()
export class RoleType {
    @Field({nullable: true})
    id: number

    @Field()
    name: string
}

@InputType()
export class UpdateUserRoles {
    @Field(() => UserType)
    user: UserType

    @Field(() => [RoleType])
    roles: RoleType[]
}