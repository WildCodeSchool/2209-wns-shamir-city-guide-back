import { Resolver, Arg, Mutation, Query, Authorized } from "type-graphql";
import Role from "../entities/Role.entity";
import { validateIdInput, validateNameInput } from "../validators/common.validator";
import * as RoleService from "../services/role.service";
import { RoleValidator, validateCreationRoleInput, validateUpdateRoleInput } from "../validators/entities/role.validator.entity";
import { RoleType } from "../types/role.type";
import { UserRoles } from "../utils/constants.utils";


@Resolver(Role)
export class RoleResolver {
  @Query(() => [Role])
  // //@Authorized([UserRoles.SUPER_ADMIN])
  async getAllRoles(): Promise<Role[]> {
    const roles: Role[] = await RoleService.getAll();
    return roles.sort((a: Role, b: Role) => a.name.localeCompare(b.name));

  }

  // @Authorized([UserRoles.SUPER_ADMIN])
  @Query(() => Role)
  async getRoleById(@Arg("id") id: number): Promise<Role> {
    const verifiedId: number = await validateIdInput(id);
    return await RoleService.getById(verifiedId);
  }

  // @Authorized([UserRoles.SUPER_ADMIN])
  @Query(() => Role) 
  async getRoleByName(@Arg("name") name: string): Promise<Role> {  
    const verifiedName: string = await validateNameInput(name);
    return await RoleService.getByName(verifiedName);
  }

  // @Authorized([UserRoles.SUPER_ADMIN])
  @Mutation(() => Role)
  async createRole(
    @Arg("role") role: RoleType
  ): Promise<Role> {
    const verifiedData: RoleValidator = await validateCreationRoleInput(role);
    return await RoleService.create(verifiedData);
  }

  // @Authorized([UserRoles.SUPER_ADMIN])
  @Mutation(() => Role)
  async updateRole(
    @Arg("role") role: RoleType
  ): Promise<Role> {
    const verifiedData: RoleValidator = await validateUpdateRoleInput(role);
    return await RoleService.update(verifiedData);
  }

  // @Authorized([UserRoles.SUPER_ADMIN])
  @Mutation(() => Role)
  async deleteRole(@Arg("id") id: number): Promise<Role> {
    const verifiedId = await validateIdInput(id);
    return await RoleService.deleteRole(verifiedId);
  }
}