import Tag from "../entity/Tag.entity";
import { TagRepository } from "../repository/tag.repository";
import { QueryFailedError } from "typeorm";
import { retrieveKeyFromDbErrorMessage, formatString } from "../utils/string.utils";
import { TagErrorsFlag, handleTagError } from "../utils/error/handleError/tag.utils.error";
import { CustomError } from "../utils/error/CustomError.utils.error";
import { InternalServerError } from "../utils/error/interfaces.utils.error";


/**
 * Returns all tags from database
 * @returns Tag[] 
 * @throws Internal Server Error 500
 */
export const getAll = async (): Promise<Array<Tag>> => {
  try {
    return await TagRepository.find();
  } catch (e) {
    throw new CustomError(
      new InternalServerError(), 
      `Problème de connexion interne, les tags n'ont pas été chargés`
    );
  }
};

/**
 * Returns a tag by its id from database
 * @param {number} id The id to use to retrieve a specific tag
 * @returns tag 
 * @throws Error: 500 Internal Server Error | 404 Not Found 
 */
export const getById = async (id: number): Promise<Tag> => {
  try {
    const isTagExist = await TagRepository.findOneBy({id});
    if (isTagExist) return isTagExist;
    else throw new Error(TagErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if(e instanceof Error && e.message === TagErrorsFlag.ID_NOT_FOUND) handleTagError(TagErrorsFlag.ID_NOT_FOUND, id);
    throw new CustomError(
      new InternalServerError(), 
      `Problème de connexion interne, le tag n'a pas été chargé`
  );
  }
};

/**
 * Returns a tag by its name from database
 * @param {string} name The name to use to retrieve a specific tag
 * @returns tag 
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const getByName = async (name: string): Promise<Tag> => {
  const formatName = formatString(name);
  try {
    const isTagExist = await TagRepository.findOneBy({name: formatName});
    if (isTagExist) return isTagExist;
    else throw new Error(TagErrorsFlag.NAME_NOT_FOUND); 
  } catch (e) {
    if (e instanceof Error && e.message === TagErrorsFlag.NAME_NOT_FOUND) handleTagError(TagErrorsFlag.NAME_NOT_FOUND, formatName)
    throw new CustomError(
      new InternalServerError(), 
      `Problème de connexion interne, le tag ${formatName} n'a pas été chargé`
    );
  }
};


/**
 * Create and return a tag
 * @param {Tag} data Tag object to create 
 * @returns created tag 
 * @throws Error: 500 Internal Server Error | 422 Unprocessable Entity
*/
export const create = async (data: Tag): Promise<Tag> => {
  const name = formatString(data.name),
    icon = data.icon;
    
  try {
    const createdTag = await TagRepository.save({name, icon});
    return createdTag;
  } catch (e) {
    if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "name") handleTagError(TagErrorsFlag.NAME_ALREADY_USED, name);
    } 
    throw new CustomError(
      new InternalServerError(), 
      `Problème de connexion interne, le tag ${name} n'a pas été créé`
    );
  }
};

/**
 * Update a tag in database and return it
 * @param {Tag} data Tag object to update
 * @returns updated tag
 *  @throws Error: 500 Internal Server Error | 404 Not Found | 422 Unprocessable Entity
 */
export const update = async (data: Tag): Promise<Tag> => {
  const {id, icon} = data,
    name = formatString(data.name);
  try {
    const tagToUpdate = await TagRepository.findOneBy({id});
    if (tagToUpdate) {
      return await TagRepository.save({...tagToUpdate, name, icon});
    } else throw new Error(TagErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error && e.message === TagErrorsFlag.ID_NOT_FOUND) handleTagError(TagErrorsFlag.ID_NOT_FOUND, id); 
    else if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "name") handleTagError(TagErrorsFlag.NAME_ALREADY_USED, name);
    } 
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le tag n'a pas été mis à jour`
    );
  }
};

/**
 * Delete a tag by its id in database
 * @param {number} id The id to use to delete a specific tag
 * @returns deleted tag 
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const deleteTag = async (id: number): Promise<Tag> => {
  try {
    const tagToRemove = await TagRepository.findOneBy({id});
    if (tagToRemove) {
      return await TagRepository.remove(tagToRemove);
    } else throw new Error(TagErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error && e.message === TagErrorsFlag.ID_NOT_FOUND) handleTagError(TagErrorsFlag.ID_NOT_FOUND, id);
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le tag n'a pas été supprimé`
    );
  }
};
