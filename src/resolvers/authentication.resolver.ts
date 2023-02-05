import { Resolver, Arg, Mutation } from "type-graphql";
import User from "../entities/User.entity";
import * as AuthenticationService from "../services/authentication.service";
import {
  UserValidator,
  validateLoginUserInput,
} from "../validators/entities/user.validator.entity";
import { AuthenticatedUserType, UserType } from "../types/user.type";

@Resolver(User)
export class AuthenticationResolver {
  @Mutation(() => AuthenticatedUserType)
  async login(@Arg("user") user: UserType): Promise<AuthenticatedUserType> {
    const verifiedUser: UserValidator = await validateLoginUserInput(user);
    return await AuthenticationService.login(verifiedUser);
  }
}
