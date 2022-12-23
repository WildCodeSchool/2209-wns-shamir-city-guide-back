import City from "../entity/City.entity";
import { CustomError } from "../utils/CustomError.utils";
import { CityRepository } from "../repository/city.repository";
import { QueryFailedError } from "typeorm";
import { retrieveKeyFromDbErrorMessage } from "../utils/string.utils";


/**
 * Returns all cities from database
 * @returns City[]
 */
export const getAll = async (): Promise<Array<City>> => {
  try {
    return await CityRepository.find();
  } catch (e) {
    throw new CustomError(500, `There is a problem to load cities from the database`);
  }
};

/**
 * Returns a city by its id from database
 * @param {number} id The id to use to retrieve a specific city
 * @returns city if exist null otherwise
 */
export const getById = async (id: number): Promise<City> => {
  try {
    const isCityExist = await CityRepository.findOneBy({id});
    if (isCityExist) return isCityExist;
    else throw new Error("id-not-found");
  } catch (e) {
    if (e instanceof Error && e.message === "id-not-found") {
      throw new CustomError(401, `The tag with the id ${id} doesn't exist in database`);
    }
    throw new CustomError(500, `Internal connection error`);
  }
};

/**
 * Returns a city by its name from database
 * @param {string} name The name to use to retrieve a specific city
 * @returns city if exist null otherwise
 */
export const getByName = async (name: string): Promise<City> => {
  try {
    const isCityExist = await CityRepository.findOneBy({name});
    if (isCityExist) return isCityExist;
    else throw new Error("name-not-found");
  } catch (e) {
    if (e instanceof Error && e.message === "name-not-found") {
      throw new CustomError(400, `The city with the name ${name} doesn't exist in database`);
    }
    throw new CustomError(500, `Internal connection error`);
  }
};

/**
 * Create and return a city
 * @param {string} name city name 
 * @param {string} latitude city latitude
 * @param {string} longitude city longitude
 * @param {string} picture city picture
 * @returns city the created city
*/
export const create = async (
  name: string, 
  latitude: number,
  longitude: number,
  picture: string
): Promise<City> => {
  try {
    const createdCity = await CityRepository.save({name, latitude, longitude, picture});
    return createdCity;
  } catch (e) {
    if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      const errorKey = retrieveKeyFromDbErrorMessage(e.driverError.detail);
      switch (errorKey) {
        case "name":
          throw new CustomError(400, `The name ${name} is already used, you have to choose another one`);
        case "picture":
          throw new CustomError(400, `The picture ${picture} is already used, you have to choose another one or rename it`);
        default:
          throw new CustomError(400, `There is a problem during the city creation, retry later please`);
      }
    } 
    throw new CustomError(
      500, 
      `Problem to create the city ${name}, there is probably an internal error in the database server`
    );
  }
};

/**
 * Update a city in database and return it
 * @param {string} name city name 
 * @param {string} latitude city latitude
 * @param {string} longitude city longitude
 * @param {string} picture city picture
 * @returns updated city
 */
export const update = async (
  id: number,
  name: string, 
  latitude: number,
  longitude: number,
  picture: string
): Promise<City> => {
  try {
    const cityToUpdate = await CityRepository.findOneBy({id});
    if (cityToUpdate) {
      return await CityRepository.save({...cityToUpdate, name, latitude, longitude, picture});
    } else throw new Error("id-not-found");
  } catch (e) {
    if (e instanceof Error && e.message === "id-not-found") {
      throw new CustomError(400, `The city with the id ${id} doesn't exist in database`);
    } else if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      const errorKey = retrieveKeyFromDbErrorMessage(e.driverError.detail);
      switch (errorKey) {
        case "name":
          throw new CustomError(400, `The name ${name} is already used, you have to choose another one`);
        case "picture":
          throw new CustomError(400, `The picture ${picture} is already used, you have to choose another one or rename it`);
        default:
          throw new CustomError(400, `There is a problem during the city ${name} update, retry later please`);
      }
    } 
    throw new CustomError(
      500,
      `Problem to update city with id ${id}, there is probably an internal error in the database server`
    );
  }
};

/**
 * Delete a city by its id in database
 * @param {number} id city id
 * @returns deleted city
 */
export const deleteCity = async (id: number): Promise<City> => {
  try {
    const cityToRemove = await CityRepository.findOneBy({id});
    if (cityToRemove) {
      return await CityRepository.remove(cityToRemove);
    } else throw new Error("id-not-found");
  } catch (e) {
    if (e instanceof Error && e.message === "id-not-found") {
      throw new CustomError(400, `The city with the id ${id} doesn't exist in database`);
    } 
    throw new CustomError(
      500,
      `Problem to remove city with id ${id}, there is probably an internal error in the database server`
    );
  }
};