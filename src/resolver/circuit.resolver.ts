import { Resolver, Arg, Mutation, Query } from "type-graphql";
import Circuit from "../entity/Circuit.entity";

// @Resolver(Circuit)
// export class CicuitResolver {
//   @Query(() => [Circuit])
//   async getAllCircuits(): Promise<Circuit[]> {
//     const circuits: Circuit[] = await CircuitService.getAll();
//     return circuits;
//   }

//   @Query(() => Circuit)
//   async getCircuitById(@Arg("id") id:number): Promise<Circuit> {
//     const verifiedId = await validateInput(id);
//     return await CircuitService.getCircuitById(verifiedId);
//   }

//   @Query(() => )
// }
