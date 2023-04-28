import { Resolver, Arg, Mutation, Query, Authorized, Ctx } from "type-graphql";
import Poi from "../entities/PointOfInterest.entity";
import * as PoiService from "../services/poi.service";
import { UserRoles } from "../utils/constants.utils";
import { PoiType } from "../types/poi.type";
import { validateIdInput, validateNameInput } from "../validators/common.validator";
import { validateCreationPoiInput, validateUpdatePoiInput } from "../validators/entities/poi.validator.entity";
import { MyAppContext } from "../types/context";


@Resolver(Poi)
export class PoiResolver {
  @Query(() => [Poi])
  async getAllPoi(): Promise<Poi[]> {
    const pointsOfInterest: Poi[] = await PoiService.getAll();
    return pointsOfInterest.sort((a: Poi, b: Poi) => a.name.localeCompare(b.name));

  }

  @Query(() => Poi)
  async getPoiById(@Arg("id") id: number): Promise<Poi> {
    const verifiedId = await validateIdInput(id);
    const poi = await PoiService.getById(verifiedId);
    return await PoiService.getById(verifiedId);
  }

  @Query(() => Poi) 
  async getPoiByName(@Arg("name") name: string): Promise<Poi> {
    const verifiedName = await validateNameInput(name);
    return await PoiService.getByName(verifiedName);
  }

  @Authorized([UserRoles.CITY_ADMIN])
  @Mutation(() => Poi)
  async createPoi(@Ctx() ctx: MyAppContext, @Arg("poi") poi: PoiType): Promise<Poi> {
    const verifiedData = await validateCreationPoiInput(poi);
    return await PoiService.create(verifiedData, ctx);
  }

  @Authorized([UserRoles.CITY_ADMIN])
  @Mutation(() => Poi)
  async updatePoi(@Ctx() ctx: MyAppContext, @Arg("poi") poi: PoiType): Promise<Poi> {
    const verifiedData = await validateUpdatePoiInput(poi);
    return await PoiService.update(verifiedData, ctx);
  }

  @Authorized([UserRoles.CITY_ADMIN])
  @Mutation(() => Poi)
  async deletePoi(@Ctx() ctx: MyAppContext, @Arg("id") id: number): Promise<Poi> {
    const verifiedId = await validateIdInput(id);
    return await PoiService.deletePoi(verifiedId, ctx);
  }  
}