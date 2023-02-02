import { Resolver, Arg, Mutation } from "type-graphql";
import User from "../entity/User.entity";
import * as AuthenticationService from "../service/authentication.service";
import {
  UserValidator,
  validateLoginUserInput,
} from "../validator/entity/user.validator.entity";
import { AuthenticatedUserType, UserType } from "../utils/type/user.utils.type";

@Resolver(User)
export class AuthenticationResolver {
  @Mutation(() => AuthenticatedUserType)
  async login(@Arg("user") user: UserType): Promise<AuthenticatedUserType> {
    const verifiedUser: UserValidator = await validateLoginUserInput(user);
    return await AuthenticationService.login(verifiedUser);
  }
}
