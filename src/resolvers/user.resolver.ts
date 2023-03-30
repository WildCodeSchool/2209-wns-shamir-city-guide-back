import { Resolver, Arg, Mutation, Query, Authorized } from "type-graphql";
import User from "../entities/User.entity";
import {
  validateIdInput,
  validateNameInput,
  validateEmailInput
} from "../validators/common.validator";
import * as UserService from "../services/user.service";
import {
  UserValidator,
  validateCreationUserInput,
  validateUpdateUserInput,
} from "../validators/entities/user.validator.entity";
import { UserType } from "../types/user.type";
import { RoleValidator, validateRoleArrayInput } from "../validators/entities/role.validator.entity";
import { UpdateUserRoles } from "../types/role.type";
import { UserRoles } from "../utils/constants.utils";


@Resolver(User)
export class UserResolver { 
  // @Authorized([UserRoles.SUPER_ADMIN])
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    const users: User[] = await UserService.getAll();
    return users.sort((a: User, b: User) => a.username.localeCompare(b.username));

  }

  //([UserRoles.SUPER_ADMIN])
  @Query(() => User)
  async getUserById(@Arg("id") id: number): Promise<User> {
    const verifiedId: number = await validateIdInput(id);
    return await UserService.getById(verifiedId);
  }

  //([UserRoles.SUPER_ADMIN])
  @Query(() => User)
  async getUserByUsername(@Arg("username") username: string): Promise<User> {
    const verifiedUsername: string = await validateNameInput(username);
    return await UserService.getByUsername(verifiedUsername);
  }

  //([UserRoles.SUPER_ADMIN])
  @Query(() => User)
  async getUserByEmail(@Arg("email") email: string): Promise<User> {
    const verifiedEmail: string = await validateEmailInput(email);
    return await UserService.getByEmail(verifiedEmail);
  }

  //([UserRoles.SUPER_ADMIN])
  @Mutation(() => User)
  async createUser(@Arg("user") user: UserType): Promise<User> {
    const verifiedData: UserValidator = await validateCreationUserInput(user);
    return await UserService.createUser(verifiedData);
  }

  //([UserRoles.SUPER_ADMIN])
  @Mutation(() => User)
  async updateUser(@Arg("user") user: UserType): Promise<User> {
    const verifiedData: UserValidator = await validateUpdateUserInput(user);
    return await UserService.updateUser(verifiedData);
  }

  // /([UserRoles.SUPER_ADMIN])
  @Mutation(() => User)
  async updateUserRoles(
    @Arg("payload") payload: UpdateUserRoles, 
  ): Promise<User> {
    const verifiedUserData: UserValidator = await validateUpdateUserInput(payload.user);
    const verifiedUserRoles: RoleValidator[] = await validateRoleArrayInput(payload.roles);
    return await UserService.updateUserRoles(verifiedUserData, verifiedUserRoles);
  }

  //([UserRoles.SUPER_ADMIN])
  @Mutation(() => User)
  async deleteUser(@Arg("id") id: number): Promise<User> {
    const verifiedId = await validateIdInput(id);
    return await UserService.deleteUser(verifiedId);
  }
}
