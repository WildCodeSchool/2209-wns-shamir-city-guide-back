import "reflect-metadata";
import { QueryFailedError } from "typeorm";

import Poi from "../entities/PointOfInterest.entity";
import Tag from "../entities/Tag.entity";
import { CustomError } from "../utils/errors/CustomError.utils.error";
import { InternalServerError } from "../utils/errors/interfaces.utils.error";
import { formatString } from "../utils/string.utils";
import { 
  PoiErrorsFlag, 
  handlePoiError, 
  handlePoiObjectError
} from "../utils/errors/handleError/poi.utils.error";
import { PoiValidator } from "../validators/entities/poi.validator.entity";
import { PoiRepository } from "../repositories/poi.repository";
import { TagRepository } from "../repositories/tag.repository";
import { CityRepository } from "../repositories/city.repository";
import { TypeRepository } from "../repositories/type.repository";
import { MyAppContext } from "../types/context";
import User from "../entities/User.entity";


/**
 * Returns all points of interest from database
 * @returns PointOfInterest[] 
 * @throws Error: 500 Internal Server Error
 */
export const getAll = async (): Promise<Array<Poi>> => {
  try {
    const allPoi: Poi[] | null = await PoiRepository.find({
      relations: ["city"]
    });
    return allPoi ? allPoi : [];
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
    const poiInDb = await PoiRepository.findOne({
      where: { id: id },
      relations: ['city'],
    });
    
    if (poiInDb) return poiInDb;
    else throw new Error(PoiErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error) handlePoiError(e, null);    
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
    if (e instanceof Error) handlePoiError(e, formattedName);    
    throw new CustomError(
      new InternalServerError(), 
      `Problème de connexion interne, le point d'intêret ${name} n'a pas été chargé`
    );
  }
};

/**
 * Returns pois which are attached to the city from database
 * @param {number} cityId The city id to use to find pois
 * @returns Pois[] pois 
 * @throws Error: 500 Internal Server Error | 404 Not Found 
 */
export const getAllByCity = async (cityId: number): Promise<Poi[]> => {
 try {
    const poisInDb = await PoiRepository.findAllPoisByCity(cityId);
    if (poisInDb) return poisInDb;
    else throw new Error(PoiErrorsFlag.NO_POIS_FOR_CITY);
  } catch (e) {
    if (e instanceof Error) handlePoiError(e, cityId);    
    throw new CustomError(
      new InternalServerError(), 
      `Problème de connexion interne, les points d'intérêt liés la ville n'ont pas été chargés`
    );
  }
}

/**
 * Create and return a point of interest
 * @param {PoiValidator} data point of interest object to create 
 * @param {MyAppContext} ctx the app context with the decoded token
 * @returns point of interest the created poi 
 * @throws Error: 500 Internal Server Error | 422 Unprocessable Entity
*/
export const create = async (
  data: PoiValidator,
  ctx: MyAppContext
): Promise<Poi> => {
  data.name = formatString(data.name);
  let tagsInDb: Tag[] | null = [];
  
  try {
    const cityInDb = await CityRepository.findOneBy({ id: data.cityId });
    // Check if city is present in database
    if (!cityInDb) throw new Error(PoiErrorsFlag.CITY_NOT_IN_DB);

    // Check if the request sender is the user attached to the city
    if (!verifyIfTwoUsersAreIdentical(ctx, cityInDb.user)) throw new Error(PoiErrorsFlag.USER_NOT_AUTHORIZED_CREATE);

    const typeInDb = await TypeRepository.findOneBy({ id: data.typeId }); 
    // Check if type is present in database
    if (!typeInDb) throw new Error(PoiErrorsFlag.TYPE_NOT_IN_DB);

    // Check if the localisation already exist
    const isLocalisationAlreadyExist = await PoiRepository.findByLatitudeAndByLongitude(data.latitude, data.longitude);        
    if (isLocalisationAlreadyExist) throw new Error(PoiErrorsFlag.LOCALISATION_ALREADY_USED);
    

    // Check if all tags are present in database
    if (data.tags !== null && data.tags.length > 0) {
      tagsInDb = await checkIfTagsAllExist(data.tags);
    } 
    if (!tagsInDb) throw new Error(PoiErrorsFlag.TAG_NOT_IN_DB);
    
    const newPoi = new Poi();
    newPoi.name = data.name;
    newPoi.address = data.address;
    newPoi.latitude = data.latitude;
    newPoi.longitude = data.longitude;
    newPoi.picture = data.picture;
    newPoi.type = typeInDb;
    newPoi.city = cityInDb;
    newPoi.tags = tagsInDb;

    return await PoiRepository.save(newPoi);    
  } catch (e) {    
    if (e instanceof Error) handlePoiError(e, data);
    if (e instanceof QueryFailedError || e instanceof Error) {
      handlePoiObjectError(e, data);
    } throw new CustomError(
      new InternalServerError(), 
      `Problème de connexion interne, le point d'intêret ${data.name} n'a pas été créé`
    );
  }
};

/**
 * Update and return a point of interest
 * @param {PoiValidator} data poi object to update
 * @param {MyAppContext} ctx the app context with the decoded token
 * @returns updated poi
 * @throws Error: 500 Internal Server Error | 404 Not Found | 422 Unprocessable Entity
 */
export const update = async (
  data: PoiValidator,
  ctx: MyAppContext
): Promise<Poi> => {
  data.name = formatString(data.name);
  let tagsInDb: Tag[] | null = [];
  
  try {
    // Check if the id is present in database
    const poiInDB = await PoiRepository.findOne({
      where: { id: data.id },
      relations: ['city'],
    });
    if (!poiInDB) throw new Error(PoiErrorsFlag.ID_NOT_FOUND); 

    // Check if city is present in database
    const cityInDb = await CityRepository.findOneBy({ id: data.cityId });
    if (!cityInDb) throw new Error(PoiErrorsFlag.CITY_NOT_IN_DB);

    // Check if request sender is the user attached to the city
    if (
      !verifyIfTwoUsersAreIdentical(ctx, cityInDb.user) ||
      !verifyIfTwoUsersAreIdentical(ctx, poiInDB.city.user)
    ) throw new Error(PoiErrorsFlag.USER_NOT_AUTHORIZED_UPDATE);

    // Check if type is present in database
    const typeInDb = await TypeRepository.findOneBy({ id: data.typeId }); 
    if (!typeInDb) throw new Error(PoiErrorsFlag.TYPE_NOT_IN_DB);
    
    // Check if the latitude and longitude are in database for all different id
    if (poiInDB.latitude !== data.latitude || poiInDB.longitude !== data.longitude) {
      const isLocationAlreadyExist = await PoiRepository
        .findByLatitudeAndByLongitudeIfNotID(
          data.id, 
          data.latitude, 
          data.longitude
        );
      if (isLocationAlreadyExist) throw new Error(PoiErrorsFlag.LOCALISATION_ALREADY_USED);
    }
    
    // Check if all tags are present in database
    if (data.tags !== null && data.tags.length > 0) {
      tagsInDb = await checkIfTagsAllExist(data.tags);
    } 
    if (!tagsInDb) throw new Error(PoiErrorsFlag.TAG_NOT_IN_DB);
    
    const newPoi = new Poi();
    newPoi.name = data.name;
    newPoi.address = data.address;
    newPoi.latitude = data.latitude;
    newPoi.longitude = data.longitude;
    newPoi.picture = data.picture;
    newPoi.type = typeInDb;
    newPoi.city = cityInDb;
    // Update poi tags
    (data.tags?.length > 0) ? newPoi.tags = [...tagsInDb] : newPoi.tags = [];

    return await PoiRepository.save({ ...poiInDB, ...newPoi });
  } catch (e) {
    if (e instanceof Error) handlePoiError(e, data);

    if (e instanceof QueryFailedError || e instanceof Error) {
      handlePoiObjectError(e, data);
    } throw new CustomError(
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
export const deletePoi = async (id: number, ctx: MyAppContext): Promise<Poi> => {
  try {
    const poiToRemove = await PoiRepository.findOne({
      where: { id: id },
      relations: ['city'],
    });

    // Check if the request sender is the user attached to the city
    // If yes we can remove the poi
    if (poiToRemove) {
      if (!verifyIfTwoUsersAreIdentical(ctx, poiToRemove?.city?.user)) throw new Error(PoiErrorsFlag.USER_NOT_AUTHORIZED_DELETE);
      
      return await PoiRepository.remove(poiToRemove);
    } else throw new Error(PoiErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error) handlePoiError(e, null);    
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le point d'intêret n'a pas été supprimé`
    );
  }
};

/**
 * Return a tags array from database or null if a tag doesn't exist
 * @param {number[]} tagIds the tag ids array
 * @returns Tag[] | null 
 * @throws Error: 500 Internal Server Error | 404 Not Found
*/
const checkIfTagsAllExist = async (tagIds: number[]): Promise<Tag[] | null> => {
  let tagsInDb: Tag[] = [];

  for (let i = 0; i < tagIds.length; i++) {
    const id = tagIds[i];
    const tagInDB = await TagRepository.findOneBy({id});

    if (!tagInDB) return null;
    else tagsInDb.push(tagInDB);
  }
  return tagsInDb;
}

/**
 * Check if the user in the context is identical to the user required for the action
 * @param {MyAppContext} senderCtx the actual context for the request sender
 * @param {User} userToCompare the user to compare with
 * @returns true if the two users are identical | false otherwise 
*/
const verifyIfTwoUsersAreIdentical = (senderCtx: MyAppContext, userToCompare: User): boolean => {
  return (
    senderCtx.user.id === userToCompare.id &&
    senderCtx.user.username === userToCompare.username &&
    senderCtx.user.email === userToCompare.email
  );
}