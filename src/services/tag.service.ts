import "reflect-metadata";
import Tag from "../entities/Tag.entity";
import { TagRepository } from "../repositories/tag.repository";
import { QueryFailedError } from "typeorm";
import { formatString } from "../utils/string.utils";
import { TagErrorsFlag, handleTagError, handleTagObjectError } from "../utils/errors/handleError/tag.utils.error";
import { CustomError } from "../utils/errors/CustomError.utils.error";
import { InternalServerError } from "../utils/errors/interfaces.utils.error";
import { TagValidator } from "../validators/entities/tag.validator.entity";
import { DefaultIconsNames } from "../utils/constants.utils";


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
    if (e instanceof Error) handleTagError(e, id);
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
    if (e instanceof Error) handleTagError(e, name);    
    throw new CustomError(
      new InternalServerError(), 
      `Problème de connexion interne, le tag ${formatName} n'a pas été chargé`
    );
  }
};

/**
 * Create and return a tag
 * @param {TagValidator} data Tag object to create 
 * @returns created tag 
 * @throws Error: 500 Internal Server Error | 422 Unprocessable Entity
*/
export const create = async (data: TagValidator): Promise<Tag> => {
  data.name = formatString(data.name);
    
  try {
    // To avoid duplicates icons except the default one
    const tagIconAlreadyInDB = await TagRepository.findOneBy({ icon: data.icon});
    if (tagIconAlreadyInDB) data.icon = DefaultIconsNames.TAG;
    
    const createdTag = await TagRepository.save(data);
    return createdTag;
  } catch (e) {        
    if (e instanceof QueryFailedError || e instanceof Error) {
      handleTagObjectError(e, data);
    } throw new CustomError(
      new InternalServerError(), 
      `Problème de connexion interne, le tag ${data.name} n'a pas été créé`
    );
  }
};

/**
 * Update a tag in database and return it
 * @param {TagValidator} data Tag object to update
 * @returns updated tag
 *  @throws Error: 500 Internal Server Error | 404 Not Found | 422 Unprocessable Entity
 */
export const update = async (data: TagValidator): Promise<Tag> => {
  data.name = formatString(data.name);
  try {
    // To avoid duplicates icons except the default one
    const tagIconAlreadyInDB = await TagRepository.findByIconAndIfNotID(data.id, data.icon);    
    
    if (tagIconAlreadyInDB) data.icon = DefaultIconsNames.TAG;

    const tagToUpdate = await TagRepository.findOneBy({id: data.id});
    if (tagToUpdate) {
      return await TagRepository.save({...tagToUpdate, ...data});
    } else throw new Error(TagErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof QueryFailedError || e instanceof Error) {
      handleTagObjectError(e, data);
    } throw new CustomError(     
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
    if (e instanceof Error) handleTagError(e, id);
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le tag n'a pas été supprimé`
    );
  }
};
