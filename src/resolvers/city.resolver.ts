import { Resolver, Arg, Mutation, Query, Authorized } from "type-graphql";
import City from "../entities/City.entity";
import * as CityService from "../services/city.service";
import { UserRoles } from "../utils/constants.utils";
import { CityType } from "../types/city.type";
import { validateIdInput, validateNameInput } from "../validators/common.validator";
import { validateCreationCityInput, validateUpdateCityInput } from "../validators/entities/city.validator.entity";

@Resolver(City)
export class CityResolver {
  @Query(() => [City])
  async getAllCities(): Promise<City[]> {
    const cities: City[] = await CityService.getAll();
    return cities.sort((a: City, b: City) => a.name.localeCompare(b.name));
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
  @Query(() => [City]) 
  async getCitiesByUsername(@Arg("username") username: string): Promise<City[]> {
    const verifiedName = await validateNameInput(username);
    const cities = await CityService.getAllByUsername(verifiedName)
    return cities.sort((a: City, b: City) => a.name.localeCompare(b.name));
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