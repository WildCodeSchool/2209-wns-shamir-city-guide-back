import { Resolver, Arg, Mutation, Query, Authorized } from "type-graphql";
import Role from "../entity/Role.entity";
import { validateIdInput, validateNameInput } from "../validator/common.validator";
import * as RoleService from "../service/role.service";
import { RoleValidator, validateCreationRoleInput, validateUpdateRoleInput } from "../validator/entity/role.validator.entity";
import { RoleType } from "../utils/type/role.utils.type";


@Resolver(Role)
export class RoleResolver {
  @Query(() => [Role])
  async getAllRoles(): Promise<Role[]> {
    const roles: Role[] = await RoleService.getAll();
    return roles;
  }

  @Query(() => Role)
  async getRoleById(@Arg("id") id: number): Promise<Role> {
    const verifiedId: number = await validateIdInput(id);
    return await RoleService.getById(verifiedId);
  }

  @Query(() => Role) 
  async getRoleByName(@Arg("name") name: string): Promise<Role> {  
    const verifiedName: string = await validateNameInput(name);
    return await RoleService.getByName(verifiedName);
  }

  @Mutation(() => Role)
  async createRole(
    @Arg("role") role: RoleType
  ): Promise<Role> {
    const verifiedData: RoleValidator = await validateCreationRoleInput(role);
    return await RoleService.create(verifiedData);
  }

  @Mutation(() => Role)
  async updateRole(
    @Arg("role") role: RoleType
  ): Promise<Role> {
    const verifiedData: RoleValidator = await validateUpdateRoleInput(role);
    return await RoleService.update(verifiedData);
  }

  @Mutation(() => Role)
  async deleteRole(@Arg("id") id: number): Promise<Role> {
    const verifiedId = await validateIdInput(id);
    return await RoleService.deleteRole(verifiedId);
  }
}