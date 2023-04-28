import { Resolver, Arg, Mutation, Query, Authorized, Ctx } from "type-graphql";
import Circuit from "../entities/Circuit.entity";
import * as CircuitService from "../services/circuit.service";
import { validateIdInput, validateNameInput } from "../validators/common.validator";
import { validateCreationCircuitInput, validateUpdateCircuitInput } from "../validators/entities/circuit.validator.entity";
import { UserRoles } from "../utils/constants.utils";
import { CircuitType } from "../types/circuit.type";
import { MyAppContext } from "../types/context";


@Resolver(Circuit)
export class CicuitResolver {
  @Query(() => [Circuit])
  async getAllCircuits(): Promise<Circuit[]> {
    const circuits: Circuit[] = await CircuitService.getAll();
    return circuits.sort((a: Circuit, b: Circuit) => a.name.localeCompare(b.name));
  }

  @Query(() => Circuit)
  async getCircuitById(@Arg("id") id: number): Promise<Circuit> {
    const verifiedId = await validateIdInput(id);
    return await CircuitService.getById(verifiedId);
  }

  @Query(() => Circuit)
  async getCircuitByName(@Arg("name") name: string): Promise<Circuit> {
    const verifiedName = await validateNameInput(name);
    return await CircuitService.getByName(verifiedName);
  }

  @Authorized([UserRoles.CITY_ADMIN])
  @Mutation(() => Circuit)
  async createCircuit(@Ctx() ctx: MyAppContext, @Arg("circuit") circuit: CircuitType): Promise<Circuit> {
    const verifiedData = await validateCreationCircuitInput(circuit);
    return await CircuitService.create(verifiedData, ctx);
  }

  @Authorized([UserRoles.CITY_ADMIN])
  @Mutation(() => Circuit)
  async updateCircuit(@Ctx() ctx: MyAppContext, @Arg("circuit") circuit: CircuitType): Promise<Circuit> {
    const verifiedData = await validateUpdateCircuitInput(circuit);
    return await CircuitService.update(verifiedData, ctx);
    
  }
  
  @Authorized([UserRoles.CITY_ADMIN])
  @Mutation(() => Circuit)
  async deleteCircuit(@Ctx() ctx: MyAppContext, @Arg("id") id: number): Promise<Circuit> {
    const verifiedId = await validateIdInput(id);
    return await CircuitService.deleteCircuit(verifiedId, ctx);
  }

}
