import { Resolver, Arg, Mutation, Query } from "type-graphql";
import Poi from "../entity/PointOfInterest.entity";
import * as PoiService from "../service/poi.service";
import { PoiType } from "../utils/type/poi.utils.type";
import { validateIdInput, validateNameInput } from "../validator/common.validator";
import { validateCreationPoiInput, validateUpdatePoiInput } from "../validator/entity/poi.validator.entity";

@Resolver(Poi)
export class PoiResolver {
  @Query(() => [Poi])
  async getAllPoi(): Promise<Poi[]> {
    const pointsOfInterest: Poi[] = await PoiService.getAll();
    return pointsOfInterest;
  }

  @Query(() => Poi)
  async getPoiById(@Arg("id") id: number): Promise<Poi> {
    const verifiedId = await validateIdInput(id);
    return await PoiService.getById(verifiedId);
  }

  @Query(() => Poi) 
  async getPoiByName(@Arg("name") name: string): Promise<Poi> {
    const verifiedName = await validateNameInput(name);
    return await PoiService.getByName(verifiedName);
  }

  @Mutation(() => Poi)
  async createPoi(
    @Arg("poi") poi: PoiType
  ): Promise<Poi> {
    const verifiedData = await validateCreationPoiInput(poi);
    return await PoiService.create(verifiedData);
  }

  @Mutation(() => Poi)
  async updatePoi(
    @Arg("poi") poi: PoiType,
  ): Promise<Poi> {
    const verifiedData = await validateUpdatePoiInput(poi);
    return await PoiService.update(verifiedData);
  }

  @Mutation(() => Poi)
  async deletePoi(@Arg("id") id: number): Promise<Poi> {
    const verifiedId = await validateIdInput(id);
    return await PoiService.deletePoi(verifiedId);
  }  
}