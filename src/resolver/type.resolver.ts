import { Resolver, Arg, Mutation, Query, Authorized } from "type-graphql";
import Type from "../entity/Type.entity";
import { validateIdInput, validateNameInput } from "../validator/common.validator";
import * as TypeService from "../service/type.service";
import { TypeValidator, validateCreationTypeInput, validateUpdateTypeInput } from "../validator/entity/type.validator.entity";
import { TypeType } from "../utils/type/type.utils.type";
import { UserRoles } from "../utils/constants.utils";


@Resolver(Type)
export class TypeResolver {
  @Query(() => [Type])
  async getAllTypes(): Promise<Type[]> {
    const types: Type[] = await TypeService.getAll();
    return types;
  }
  
  @Query(() => Type)
  async getTypeById(@Arg("id") id: number): Promise<Type> {
    const verifiedId: number = await validateIdInput(id);
    return await TypeService.getById(verifiedId);
  }

  @Query(() => Type) 
  async getTypeByName(@Arg("name") name: string): Promise<Type> {  
    const verifiedName: string = await validateNameInput(name);
    return await TypeService.getByName(verifiedName);
  }
  
  @Authorized([UserRoles.SUPER_ADMIN])
  @Mutation(() => Type)
  async createType(
    @Arg("type") type: TypeType
  ): Promise<Type> {
    const verifiedData: TypeValidator = await validateCreationTypeInput(type);
    return await TypeService.create(verifiedData);
  }

  @Authorized([UserRoles.SUPER_ADMIN])
  @Mutation(() => Type)
  async updateType(
    @Arg("type") type: TypeType
  ): Promise<Type> {
    const verifiedData: TypeValidator = await validateUpdateTypeInput(type);
    return await TypeService.update(verifiedData);
  }

  @Authorized([UserRoles.SUPER_ADMIN])
  @Mutation(() => Type)
  async deleteType(@Arg("id") id: number): Promise<Type> {
    const verifiedId = await validateIdInput(id);
    return await TypeService.deleteType(verifiedId);
  }
}
