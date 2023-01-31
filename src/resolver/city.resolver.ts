import { Resolver, Arg, Mutation, Query, Authorized } from "type-graphql";
import City from "../entity/City.entity";
import * as CityService from "../service/city.service";
import { UserRoles } from "../utils/constants.utils";
import { CityType } from "../utils/type/city.utils.type";
import { validateIdInput, validateNameInput } from "../validator/common.validator";
import { validateCreationCityInput, validateUpdateCityInput } from "../validator/entity/city.validator.entity";

@Resolver(City)
export class CityResolver {
  @Query(() => [City])
  async getAllCities(): Promise<City[]> {
    const cities: City[] = await CityService.getAll();
    return cities;
  }

  @Query(() => City)
  async getCityById(@Arg("id") id: number): Promise<City> {
    const verifiedId = await validateIdInput(id);
    return await CityService.getById(verifiedId);
  }

  @Query(() => City) 
  async getCityByName(@Arg("name") name: string): Promise<City> {
    const verifiedName = await validateNameInput(name);
    return await CityService.getByName(verifiedName);
  }

  @Authorized([UserRoles.SUPER_ADMIN])
  @Mutation(() => City)
  async createCity(
    @Arg("city") city: CityType,
  ): Promise<City> {
    const verifiedData = await validateCreationCityInput(city);
    return await CityService.create(verifiedData);
  }

  @Authorized([UserRoles.SUPER_ADMIN])
  @Mutation(() => City)
  async updateCity(
    @Arg("city") city: CityType,
  ): Promise<City> {
    const verifiedData = await validateUpdateCityInput(city);
    return await CityService.update(verifiedData);
  }

  @Authorized([UserRoles.SUPER_ADMIN])
  @Mutation(() => City)
  async deleteCity(@Arg("id") id: number): Promise<City> {
    const verifiedId = await validateIdInput(id);
    return await CityService.deleteCity(verifiedId);
  }  
}