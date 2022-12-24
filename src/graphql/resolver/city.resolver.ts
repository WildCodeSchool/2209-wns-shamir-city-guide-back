import { Resolver, Arg, Mutation, Query } from "type-graphql";
import City from "../../entity/City.entity";
import * as CityService from "../../service/city.service";
import { formatString } from "../../utils/string.utils";

@Resolver(City)
export class CityResolver {
  @Query(() => [City])
  async getAllCities(): Promise<City[]> {
    const cities: City[] = await CityService.getAll();
    return cities;
  }

  @Query(() => City)
  async getCityById(@Arg("id") id: number): Promise<City> {
    return await CityService.getById(id);
  }

  @Query(() => City) 
  async getCityByName(@Arg("name") name: string): Promise<City> {
    return await CityService.getByName(formatString(name));
  }

  @Mutation(() => City)
  async createCity(
    @Arg("name") name: string,
    @Arg("latitude") latitude: string,
    @Arg("longitude") longitude: string,
    @Arg("picture") picture: string,
  ): Promise<City> {
    return await CityService.create(formatString(name), latitude, longitude, picture);
  }

  @Mutation(() => City)
  async updateCity(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Arg("latitude") latitude: string,
    @Arg("longitude") longitude: string,
    @Arg("picture") picture: string,
  ): Promise<City> {
    return await CityService.update(id, formatString(name), latitude, longitude, picture);
  }

  @Mutation(() => City)
  async deleteCity(@Arg("id") id: number): Promise<City> {
    return await CityService.deleteCity(id);
  }  
}