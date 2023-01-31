import { Resolver, Arg, Mutation, Query, Authorized } from "type-graphql";
import User from "../entity/User.entity";
import {
  validateIdInput,
  validateNameInput,
  validateEmailInput
} from "../validator/common.validator";
import * as UserService from "../service/user.service";
import {
  UserValidator,
  validateCreationUserInput,
  validateUpdateUserInput,
} from "../validator/entity/user.validator.entity";
import { UserType } from "../utils/type/user.utils.type";
import { RoleValidator, validateRoleArrayInput } from "../validator/entity/role.validator.entity";
import { UpdateUserRoles } from "../utils/type/role.utils.type";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    const users: User[] = await UserService.getAll();
    return users;
  }

  @Authorized(["ADMIN", "USER"])
  @Query(() => User)
  async getUserById(@Arg("id") id: number): Promise<User> {
    const verifiedId: number = await validateIdInput(id);
    return await UserService.getById(verifiedId);
  }

  @Query(() => User)
  async getUserByUsername(@Arg("username") username: string): Promise<User> {
    const verifiedUsername: string = await validateNameInput(username);
    return await UserService.getByUsername(verifiedUsername);
  }

  @Query(() => User)
  async getUserByEmail(@Arg("email") email: string): Promise<User> {
    const verifiedEmail: string = await validateEmailInput(email);
    return await UserService.getByEmail(verifiedEmail);
  }

  @Mutation(() => User)
  async createUser(@Arg("user") user: UserType): Promise<User> {
    const verifiedData: UserValidator = await validateCreationUserInput(user);
    return await UserService.createUser(verifiedData);
  }

  @Mutation(() => User)
  async updateUser(@Arg("user") user: UserType): Promise<User> {
    const verifiedData: UserValidator = await validateUpdateUserInput(user);
    return await UserService.updateUser(verifiedData);
  }

  @Mutation(() => User)
  async updateUserRoles(
    @Arg("payload") payload: UpdateUserRoles, 
  ): Promise<User> {
    const verifiedUserData: UserValidator = await validateUpdateUserInput(payload.user);
    const verifiedUserRoles: RoleValidator[] = await validateRoleArrayInput(payload.roles);
    return await UserService.updateUserRoles(verifiedUserData, verifiedUserRoles);
  }

  @Mutation(() => User)
  async deleteUser(@Arg("id") id: number): Promise<User> {
    const verifiedId = await validateIdInput(id);
    return await UserService.deleteUser(verifiedId);
  }
}
