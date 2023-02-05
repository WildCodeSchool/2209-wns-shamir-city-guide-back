import "reflect-metadata";
import City from "../entities/City.entity";
import { CustomError } from "../utils/errors/CustomError.utils.error";
import { CityRepository } from "../repositories/city.repository";
import { QueryFailedError } from "typeorm";
import { formatString } from "../utils/string.utils";
import { CityErrorsFlag, handleCityError, handleCityObjectError } from "../utils/errors/handleError/city.utils.error";
import { InternalServerError } from "../utils/errors/interfaces.utils.error";
import { CityValidator } from "../validators/entities/city.validator.entity";


/**
 * Returns all cities from database
 * @returns City[] 
 * @throws Error: 500 Internal Server Error
 */
export const getAll = async (): Promise<Array<City>> => {
  try {
    return await CityRepository.find();
  } catch (e) {
    throw new CustomError(
      new InternalServerError(), 
      `Problème de connexion interne, les villes n'ont pas été chargées`
    );
  }
};

/**
 * Returns a city by its id from database
 * @param {number} id The id to use to retrieve a specific city
 * @returns city 
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const getById = async (id: number): Promise<City> => {
  try {
    const isCityExist = await CityRepository.findOneBy({id});
    if (isCityExist) return isCityExist;
    else throw new Error(CityErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error) handleCityError(e, null);    throw new CustomError(
      new InternalServerError(), 
      `Problème de connexion interne, la ville n'a pas été chargée`
    );
  }
};

/**
 * Returns a city by its name from database
 * @param {string} name The name to use to retrieve a specific city
 * @returns city 
 * @throws Error: 500 Internal Server Error | 404 Not Found 
 */
export const getByName = async (name: string): Promise<City> => {
  const formattedName = formatString(name);
  try {
    const isCityExist = await CityRepository.findOneBy({ name: formattedName });
    if (isCityExist) return isCityExist;
    else throw new Error(CityErrorsFlag.NAME_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error) handleCityError(e, formattedName);    
    throw new CustomError(
      new InternalServerError(), 
      `Problème de connexion interne, la ville ${name} n'a pas été chargée`
    );
  }
};

/**
 * Create and return a city
 * @param {CityValidator} data City object to create 
 * @returns city the created city 
 * @throws Error: 500 Internal Server Error | 422 Unprocessable Entity
*/
export const create = async (
  data: CityValidator
): Promise<City> => {
  data.name = formatString(data.name);

  try {
    const isLocalisationAlreadyExist = await CityRepository.findByLatitudeAndByLongitude(data.latitude, data.longitude);    
    if (isLocalisationAlreadyExist) throw new Error(CityErrorsFlag.LOCALISATION_ALREADY_USED);
    
    const createdCity = await CityRepository.save(data);    
    return createdCity;
  } catch (e) {
    if (e instanceof QueryFailedError || e instanceof Error) {
      handleCityObjectError(e, data);
      } throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, la ville ${data.name} n'a pas été créé`
    );
  }
};

/**
 * Update a city in database and return it
 * @param {CityValidator} data City object to update
 * @returns updated city
 * @throws Error: 500 Internal Server Error | 404 Not Found | 422 Unprocessable Entity
 */
export const update = async (
  data: CityValidator
): Promise<City> => {
  data.name = formatString(data.name);
  
  try {
    // Check if the id is present in database
    const isIdExistInDB = await CityRepository.findOneBy({ id: data.id });
    if (!isIdExistInDB) throw new Error(CityErrorsFlag.ID_NOT_FOUND) 

    // Check name the name is already present in database
    const isNameAlreadyInDB = await CityRepository.findByNameAndIfNotID(data.id, data.name);
    // if (isNameAlreadyInDB) throw new Error(CityErrorsFlag.NAME_ALREADY_USED);
    // If the latitude and longitude change we have to verify if the new location isn't stocked in database
    // Check if the latitude and longitude are in database for all different id
    if (isIdExistInDB.latitude !== data.latitude || isIdExistInDB.longitude !== data.longitude) {
      const isLocationAlreadyExist = await CityRepository.findByLatitudeAndByLongitudeIfNotID(
        data.id, 
        data.latitude, 
        data.longitude
      );
      if (isLocationAlreadyExist) throw new Error(CityErrorsFlag.LOCALISATION_ALREADY_USED);
    }
   
    return await CityRepository.save({ ...isIdExistInDB, ...data });
  } catch (e) {
    if (e instanceof QueryFailedError || e instanceof Error) {
      handleCityObjectError(e, data);
      } throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, la ville ${data.name} n'a pas été mise à jour`
    );
  }
};

/**
 * Delete a city by its id in database
 * @param {number} id city id
 * @returns deleted city 
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const deleteCity = async (id: number): Promise<City> => {
  try {
    const cityToRemove = await CityRepository.findOneBy({id});
    if (cityToRemove) {
      await CityRepository.remove(cityToRemove);
      return cityToRemove;
    } else throw new Error(CityErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error) handleCityError(e, null);    
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, la ville n'a pas été supprimée`
    );
  }
};