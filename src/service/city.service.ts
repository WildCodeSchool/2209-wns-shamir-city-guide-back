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
      throw new CustomError(400, `The tag with the id ${id} doesn't exist in database`);
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
      throw new CustomError(400, 'This location already exist in database');
    }
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
      console.log("STEP LOCATION");
      const isLocationAlreadyExist = await CityRepository.findByLatitudeAndByLongitudeAndIfNotID(id, latitude, longitude);
      console.log("IS LOCATION ALREADU USED =>", isLocationAlreadyExist);
      
      if (isLocationAlreadyExist) throw new Error("location-already-in-db");
    }
    return await CityRepository.save({...isIdExistInDB, name, latitude, longitude, picture});
    
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === "id-not-found") {
        throw new CustomError(400, `The city with the id ${id} doesn't exist in database`);
      } else if (e.message === "name-already-in-db") {
        throw new CustomError(400, `The city with the name ${name} already exist in database`);
      } else if (e.message === "location-already-in-db") {
        throw new CustomError(400, `The city with the latitude ${latitude} and longitude ${longitude} already exist in database`);
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
    console.log("city to remove =>", cityToRemove);
    if (cityToRemove) {
      const deletedCity = await CityRepository.remove(cityToRemove);
      console.log("deleted city =>", deletedCity);
      return cityToRemove;
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