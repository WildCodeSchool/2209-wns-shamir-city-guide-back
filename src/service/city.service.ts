import City from "../entity/City.entity";
import { CustomError } from "../utils/error/CustomError.utils.error";
import { CityRepository } from "../repository/city.repository";
import { QueryFailedError } from "typeorm";
import { retrieveKeyFromDbErrorMessage } from "../utils/string.utils";
import { 
  InternalServerError, 
  NotFoundError, 
  BadRequestError, 
  UnprocessableEntityError 
} from "../utils/error/interfaces.utils.error";


/**
 * Returns all cities from database
 * @returns City[] | error 500
 */
export const getAll = async (): Promise<Array<City>> => {
  try {
    return await CityRepository.find();
  } catch (e) {
    throw new CustomError(
      new InternalServerError(), 
      `There is a problem to load cities from the database`
    );
  }
};

/**
 * Returns a city by its id from database
 * @param {number} id The id to use to retrieve a specific city
 * @returns city | 404 not found | 500 Internal Server Error
 */
export const getById = async (id: number): Promise<City> => {
  try {
    const isCityExist = await CityRepository.findOneBy({id});
    if (isCityExist) return isCityExist;
    else throw new Error("id-not-found");
  } catch (e) {
    if (e instanceof Error && e.message === "id-not-found") {
      throw new CustomError(
        new NotFoundError(), 
        `The tag with the id ${id} doesn't exist in database`
      );
    }
    throw new CustomError(new InternalServerError(), `Internal connection error`);
  }
};

/**
 * Returns a city by its name from database
 * @param {string} name The name to use to retrieve a specific city
 * @returns city | 404 not found | 500 Internal Server Error
 */
export const getByName = async (name: string): Promise<City> => {
  try {
    const isCityExist = await CityRepository.findOneBy({name});
    if (isCityExist) return isCityExist;
    else throw new Error("name-not-found");
  } catch (e) {
    if (e instanceof Error && e.message === "name-not-found") {
      throw new CustomError(
        new NotFoundError(), 
        `The city with the name ${name} doesn't exist in database`
      );
    }
    throw new CustomError(new InternalServerError(), `Internal connection error`);
  }
};

/**
 * Create and return a city
 * @param {string} name city name 
 * @param {string} latitude city latitude
 * @param {string} longitude city longitude
 * @param {string} picture city picture
 * @returns city the created city | 422 Unprocessable Entity | 500 Internal Server Error
*/
export const create = async (
  name: string, 
  latitude: string,
  longitude: string,
  picture: string
): Promise<City> => {
  try {
    const isLocationAlreadyExist = await CityRepository.findByLatitudeAndByLongitude(latitude, longitude);
    if (isLocationAlreadyExist) throw new Error("location-already-exist");
    
    const createdCity = await CityRepository.save({name, latitude, longitude, picture});
    return createdCity;
  } catch (e) {
    if (e instanceof Error && e.message === "location-already-exist") {
      throw new CustomError(
        new UnprocessableEntityError(), 
        'This location already exist in database'
      );
    }
    if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      const errorKey = retrieveKeyFromDbErrorMessage(e.driverError.detail);
      switch (errorKey) {
        case "name":
          throw new CustomError(
            new UnprocessableEntityError(), 
            `The name ${name} is already used, you have to choose another one`
          );
          default:
          throw new CustomError(
            new BadRequestError(), 
            `There is a problem during the city ${name} creation`
          );
      }
    } 
    throw new CustomError(
      new InternalServerError(), 
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
 * @returns updated city | 404 Not Found | 422 Unprocessable Entity | 500 Internal Server Error
 */
export const update = async (
  id: number,
  name: string, 
  latitude: string,
  longitude: string,
  picture: string
): Promise<City> => {
  try {
    // Check if the id is present in database
    const isIdExistInDB = await CityRepository.findOneBy({id});
    if (!isIdExistInDB) throw new Error("id-not-found") 

    // Check name the name is already present in database
    const isNameAlreadyInDB = await CityRepository.findByNameAndIfNotID(id, name);
    if (isNameAlreadyInDB) throw new Error("name-already-in-db")

    // If the latitude and longitude change we have to verify if the new location isn't stocked in database
    // Check if the latitude and longitude are in database for all different id
    if (isIdExistInDB.latitude !== latitude || isIdExistInDB.longitude !== longitude) {
      const isLocationAlreadyExist = await CityRepository.findByLatitudeAndByLongitudeIfNotID(id, latitude, longitude);
      if (isLocationAlreadyExist) throw new Error("location-already-in-db");
    }
    return await CityRepository.save({...isIdExistInDB, name, latitude, longitude, picture});
    
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === "id-not-found") {
        throw new CustomError(
          new NotFoundError(), 
          `The city with the id ${id} doesn't exist in database`
        );
      } else if (e.message === "name-already-in-db") {
        throw new CustomError(
          new UnprocessableEntityError(), 
          `The city with the name ${name} already exist in database`
        );
      } else if (e.message === "location-already-in-db") {
        throw new CustomError(
          new UnprocessableEntityError(), 
          `The city with the latitude ${latitude} and longitude ${longitude} already exist in database`
        );
      }
    } 
    throw new CustomError(
      new InternalServerError(),
      `Problem to update city with id ${id}, there is probably an internal error in the database server`
    );
  }
};

/**
 * Delete a city by its id in database
 * @param {number} id city id
 * @returns deleted city | 404 Not Found | 500 Internal Server Error
 */
export const deleteCity = async (id: number): Promise<City> => {
  try {
    const cityToRemove = await CityRepository.findOneBy({id});
    if (cityToRemove) {
      await CityRepository.remove(cityToRemove);
      return cityToRemove;
    } else throw new Error("id-not-found");
  } catch (e) {
    if (e instanceof Error && e.message === "id-not-found") {
      throw new CustomError(
        new NotFoundError(), 
        `The city with the id ${id} doesn't exist in database`
      );
    } 
    throw new CustomError(
      new InternalServerError(),
      `Problem to remove city with id ${id}, there is probably an internal error in the database server`
    );
  }
};