import { Resolver, Arg, Mutation, Query } from "type-graphql";
import Circuit from "../entities/Circuit.entity";
import * as CircuitService from "../services/circuit.service";
import { CircuitType } from "../types/circuit.type";
import { validateIdInput, validateNameInput } from "../validators/common.validator";
import { validateCreationCircuitInput, validateUpdateCircuitInput } from "../validators/entities/circuit.validator.entity";
import { UserRoles } from "../utils/constants.utils";


@Resolver(Circuit)
export class CicuitResolver {
  @Query(() => [Circuit])
  async getAllCircuits(): Promise<Circuit[]> {
    const circuits: Circuit[] = await CircuitService.getAll();
    return circuits;
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

}
