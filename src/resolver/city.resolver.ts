import { Resolver, Arg, Mutation, Query } from "type-graphql";
import City from "../entity/City.entity";
import * as CityService from "../service/city.service";
import { formatString } from "../utils/string.utils";
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

  @Mutation(() => City)
  async createCity(
    @Arg("name") name: string,
    @Arg("latitude") latitude: string,
    @Arg("longitude") longitude: string,
    @Arg("picture") picture: string,
  ): Promise<City> {
    const verifiedData = await validateCreationCityInput(
      name,
      latitude,
      longitude,
      picture
    )
    return await CityService.create(verifiedData);
  }

  @Mutation(() => City)
  async updateCity(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Arg("latitude") latitude: string,
    @Arg("longitude") longitude: string,
    @Arg("picture") picture: string,
  ): Promise<City> {
    const verifiedData = await validateUpdateCityInput(
      id,
      name,
      latitude,
      longitude,
      picture
    )
    return await CityService.update(verifiedData);
  }

  @Mutation(() => City)
  async deleteCity(@Arg("id") id: number): Promise<City> {
    const verifiedId = await validateIdInput(id);
    return await CityService.deleteCity(verifiedId);
  }  
}