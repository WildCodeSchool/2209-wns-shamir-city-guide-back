import { Resolver, Arg, Mutation, Query } from "type-graphql";
import City from "../../entity/City.entity";
import * as CityService from "../../service/city.service";

@Resolver(City)
export class CityResolver {
  @Query(() => [City])
  async getAllCities(): Promise<City[]> {
    const cities: City[] = await CityService.getAll();
    return cities;
  }

  @Query(() => City)
  async getTagById(@Arg("id") id: number): Promise<City> {
    return await CityService.getById(id);
  }

  @Query(() => City) 
  async getCityByName(@Arg("name") name: string): Promise<City> {
    return await CityService.getByName(name);
  }

  @Mutation(() => City)
  async createCity(
    @Arg("name") name: string,
    @Arg("latitude") latitude: number,
    @Arg("longitude") longitude: number,
    @Arg("picture") picture: string,
  ): Promise<City> {
    return await CityService.create(name, latitude, longitude, picture);
  }

  @Mutation(() => City)
  async updateCity(
    @Arg("id") id: number,
    @Arg("name") name: string,
    @Arg("latitude") latitude: number,
    @Arg("longitude") longitude: number,
    @Arg("picture") picture: string,
  ): Promise<City> {
    return await CityService.update(id, name, latitude, longitude, picture);
  }

  @Mutation(() => City)
  async deleteCity(@Arg("id") id: number): Promise<City> {
    return await CityService.deleteCity(id);
  }  
}