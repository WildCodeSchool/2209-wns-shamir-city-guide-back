import { Field, InputType } from "type-graphql";
import { CleanedUserType, UserType } from "./user.type";


@InputType()
export class RoleType {
    @Field({nullable: true})
    id: number

    @Field()
    name: string
}

@InputType()
export class UpdateUserRoles {
    @Field()
    userId: number

    @Field(() => [RoleType])
    roles: RoleType[]
}