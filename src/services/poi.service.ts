import "reflect-metadata";
import { QueryFailedError } from "typeorm";

import Poi from "../entities/PointOfInterest.entity";
import { CustomError } from "../utils/errors/CustomError.utils.error";
import { InternalServerError } from "../utils/errors/interfaces.utils.error";
import { formatString, retrieveKeyFromDbErrorMessage } from "../utils/string.utils";
import { PoiErrorsFlag, handlePoiError } from "../utils/errors/handleError/poi.utils.error";
import { PoiValidator } from "../validators/entities/poi.validator.entity";
import { TagValidator } from "../validators/entities/tag.validator.entity";
import { PoiRepository } from "../repositories/poi.repository";
import { TagRepository } from "../repositories/tag.repository";


/**
 * Returns all points of interest from database
 * @returns PointOfInterest[] 
 * @throws Error: 500 Internal Server Error
 */
export const getAll = async (): Promise<Array<Poi>> => {
  try {
    const allPoi: Poi[] = await PoiRepository.find({
      relations: {
          tags: true,
      }
    });
    
    return allPoi;
  } catch (e) {
    throw new CustomError(
      new InternalServerError(), 
      `Problème de connexion interne, les points d'intêret n'ont pas été chargés`
    );
  }
};

/**
 * Returns a point of interest by its id from database
 * @param {number} id The id to use to retrieve a specific point of interest
 * @returns point of interest 
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const getById = async (id: number): Promise<Poi> => {
  try {
    const isPoiExist = await PoiRepository.findOneBy({id});
    if (isPoiExist) return isPoiExist;
    else throw new Error(PoiErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error && e.message === PoiErrorsFlag.ID_NOT_FOUND) handlePoiError(PoiErrorsFlag.ID_NOT_FOUND, null);
    throw new CustomError(
      new InternalServerError(), 
      `Problème de connexion interne, le point d'intêret n'a pas été chargé`
    );
  }
};

/**
 * Returns a poit of interest by its name from database
 * @param {string} name The name to use to retrieve a specific poi
 * @returns poit of interest 
 * @throws Error: 500 Internal Server Error | 404 Not Found 
 */
export const getByName = async (name: string): Promise<Poi> => {
  const formattedName = formatString(name);
  try {
    const isPoiExist = await PoiRepository.findOneBy({ name: formattedName });
    if (isPoiExist) return isPoiExist;
    else throw new Error(PoiErrorsFlag.NAME_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error && e.message === PoiErrorsFlag.NAME_NOT_FOUND) handlePoiError(PoiErrorsFlag.NAME_NOT_FOUND, name)
    throw new CustomError(
      new InternalServerError(), 
      `Problème de connexion interne, le point d'intêret ${name} n'a pas été chargé`
    );
  }
};

/**
 * Create and return a point of interest
 * @param {PoiValidator} data point of interest object to create 
 * @returns point of interest the created poi 
 * @throws Error: 500 Internal Server Error | 422 Unprocessable Entity
*/
export const create = async (
  data: PoiValidator
): Promise<Poi> => {
  data.name = formatString(data.name);
  let tagIsNotInDB = null;
  
  try {
    // Check if the localisation already exist
    const isLocalisationAlreadyExist = await PoiRepository.findByLatitudeAndByLongitude(data.latitude, data.longitude);        
    if (isLocalisationAlreadyExist) throw new Error(PoiErrorsFlag.LOCALISATION_ALREADY_USED);
    
    // Check if all tags are present in database
    if (data.tags !== null && data.tags.length > 0) {
      tagIsNotInDB = await checkIfTagsAllExist(data.tags);
    } 
    if (tagIsNotInDB) throw new Error(PoiErrorsFlag.TAG_NOT_IN_DB);
    
    const createdPoi = await PoiRepository.save(data);    
    return createdPoi;
  } catch (e) {
    if (e instanceof Error && e.message === PoiErrorsFlag.LOCALISATION_ALREADY_USED) handlePoiError(PoiErrorsFlag.LOCALISATION_ALREADY_USED, data);
    if (e instanceof Error && e.message.includes(PoiErrorsFlag.TAG_NOT_IN_DB)) handlePoiError(PoiErrorsFlag.TAG_NOT_IN_DB, tagIsNotInDB);
    if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "name") handlePoiError(PoiErrorsFlag.NAME_ALREADY_USED, data.name);
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "address") handlePoiError(PoiErrorsFlag.ADDRESS_ALREADY_USED, data.address);
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "picture") handlePoiError(PoiErrorsFlag.PICTURE_ALREADY_USER, data.picture);
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "city_id") handlePoiError(PoiErrorsFlag.CITY_NOT_IN_DB, data);
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "type_id") handlePoiError(PoiErrorsFlag.TYPE_NOT_IN_DB, data);  
    } 
    
    throw new CustomError(
      new InternalServerError(), 
      `Problème de connexion interne, le point d'intêret ${data.name} n'a pas été créé`
    );
  }
};

/**
 * Update and return a point of interest
 * @param {PoiValidator} data poi object to update
 * @returns updated poi
 * @throws Error: 500 Internal Server Error | 404 Not Found | 422 Unprocessable Entity
 */
export const update = async (
  data: PoiValidator
): Promise<Poi> => {
  data.name = formatString(data.name);
  let tagIsNotInDB = null;
  
  try {
    // Check if the id is present in database
    const isIdExistInDB = await PoiRepository.findOneBy({ id: data.id });
    if (!isIdExistInDB) throw new Error(PoiErrorsFlag.ID_NOT_FOUND); 

    // Check name the name is already present in database
    const isNameAlreadyInDB = await PoiRepository.findByNameAndIfNotID(data.id, data.name);
    if (isNameAlreadyInDB) throw new Error(PoiErrorsFlag.NAME_ALREADY_USED);
    // If the latitude and longitude change we have to verify if the new location isn't stocked in database
    // Check if the latitude and longitude are in database for all different id
    if (isIdExistInDB.latitude !== data.latitude || isIdExistInDB.longitude !== data.longitude) {
      const isLocationAlreadyExist = await PoiRepository.findByLatitudeAndByLongitudeIfNotID(
        data.id, 
        data.latitude, 
        data.longitude
      );
      if (isLocationAlreadyExist) throw new Error(PoiErrorsFlag.LOCALISATION_ALREADY_USED);
    }
    
    // Check if all tags are present in database
    if (data.tags !== null && data.tags.length > 0) {
      tagIsNotInDB = await checkIfTagsAllExist(data.tags);
    } 
    if (tagIsNotInDB) throw new Error(PoiErrorsFlag.TAG_NOT_IN_DB);

    (data.tags?.length > 0) ? isIdExistInDB.tags = [...data.tags] : isIdExistInDB.tags = [];

    return await PoiRepository.save({ ...isIdExistInDB, ...data });
  } catch (e) {
    if (e instanceof Error) {   
      if (e.message === PoiErrorsFlag.ID_NOT_FOUND) handlePoiError(PoiErrorsFlag.ID_NOT_FOUND, data.id); 
      if (e.message === PoiErrorsFlag.NAME_ALREADY_USED) handlePoiError(PoiErrorsFlag.NAME_ALREADY_USED, data.name); 
      if (e.message === PoiErrorsFlag.LOCALISATION_ALREADY_USED) handlePoiError(PoiErrorsFlag.LOCALISATION_ALREADY_USED, data);
      if (e instanceof Error && e.message.includes(PoiErrorsFlag.TAG_NOT_IN_DB)) handlePoiError(PoiErrorsFlag.TAG_NOT_IN_DB, tagIsNotInDB);
    } 
    if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "name") handlePoiError(PoiErrorsFlag.NAME_ALREADY_USED, data.name);
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "address") handlePoiError(PoiErrorsFlag.ADDRESS_ALREADY_USED, data.address);
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "picture") handlePoiError(PoiErrorsFlag.PICTURE_ALREADY_USER, data.picture);
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "city_id") handlePoiError(PoiErrorsFlag.CITY_NOT_IN_DB, data);
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "type_id") handlePoiError(PoiErrorsFlag.TYPE_NOT_IN_DB, data);   
    }
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le point d'intêret n'a pas été mis à jour`
    );
  }
};

/**
 * Delete a point of interest by its id in database
 * @param {number} id poi id
 * @returns deleted poi 
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const deletePoi = async (id: number): Promise<Poi> => {
  try {
    const poiToRemove = await PoiRepository.findOneBy({id});
    if (poiToRemove) {
      await PoiRepository.remove(poiToRemove);
      return poiToRemove;
    } else throw new Error(PoiErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error && e.message === PoiErrorsFlag.ID_NOT_FOUND) handlePoiError(PoiErrorsFlag.ID_NOT_FOUND, id); 
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le point d'intêret n'a pas été supprimé`
    );
  }
};

const checkIfTagsAllExist = async (tags: TagValidator[]): Promise<null | string> => {
  for (let i = 0; i < tags.length; i++) {
    const id = tags[i].id;
    const isTagInDB = await TagRepository.findOneBy({id});
    if (!isTagInDB) return tags[i].name;
  }
  return null;
}