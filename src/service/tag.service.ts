import Tag from "../entity/Tag.entity";
import { TagRepository } from "../repository/tag.repository";
import { QueryFailedError } from "typeorm";
import { retrieveKeyFromDbErrorMessage, formatString } from "../utils/string.utils";
import { CustomError } from "../utils/error/CustomError.utils.error";
import { 
  InternalServerError, 
  NotFoundError, 
  BadRequestError, 
  UnprocessableEntityError 
} from "../utils/error/interfaces.utils.error";


/**
 * Returns all tags from database
 * @returns Tag[] | 500 Internal Server Error
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
 * @returns tag | 404 Not Found | 500 Internal Server Error
 */
export const getById = async (id: number): Promise<Tag> => {
  try {
    const isTagExist = await TagRepository.findOneBy({id});
    if (isTagExist) return isTagExist;
    else throw new Error("id-not-found");
  } catch (e) {
    if (e instanceof Error && e.message === "id-not-found") {
      throw new CustomError(
        new NotFoundError(), 
        `Le tag avec l'id ${id} n'existe pas en base de données`
      );
    }
    throw new CustomError(
      new InternalServerError(), 
      `Problème de connexion interne, le tag n'a pas été chargé`
    );
  }
};

/**
 * Returns a tag by its name from database
 * @param {string} name The name to use to retrieve a specific tag
 * @returns tag | 404 Not Found | 500 Internal Server Error
 */
export const getByName = async (name: string): Promise<Tag> => {
  const formatName = formatString(name);
  try {
    const isTagExist = await TagRepository.findOneBy({name: formatName});
    if (isTagExist) return isTagExist;
    else throw new Error("name-not-found"); 
  } catch (e) {
    if (e instanceof Error && e.message === "name-not-found") {      
      throw new CustomError(
        new NotFoundError(), 
        `Le tag avec le nom ${name} n'existe pas en base de données`
      );
    }
    throw new CustomError(
      new InternalServerError(), 
      `Problème de connexion interne, le tag ${name} n'a pas été chargé`
    );
  }
};


/**
 * Create and return a tag
 * @param {Tag} data Tag object to create 
 * @returns tag | 422 Unprocessable Entity | 400 Bad Request | 500 Internal Server Error
*/
export const create = async (data: Tag): Promise<Tag> => {
  const name = formatString(data.name),
    icon = data.icon;
  try {
    const createdTag = await TagRepository.save({name, icon});
    return createdTag;
  } catch (e) {
    if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      const errorKey = retrieveKeyFromDbErrorMessage(e.driverError.detail);
      switch (errorKey) {
        case "name":
          throw new CustomError(
            new UnprocessableEntityError(), 
            `Le nom ${name} est déjà utilisé, vous devez en choisir un autre`
          );
        default:
          throw new CustomError(
            new BadRequestError(), 
            `Il y a un problème lors de la création du tag ou dans le format de la requête`
          );
      }
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
 * @returns updated tag | 400 Bad Request | 404 Not Found | 422 Unprocessable Entity | 500 Internal Server Error
 */
export const update = async (data: Tag): Promise<Tag> => {
  const {id, icon} = data,
    name = formatString(data.name);
  try {
    const tagToUpdate = await TagRepository.findOneBy({id});
    if (tagToUpdate) {
      return await TagRepository.save({...tagToUpdate, name, icon});
    } else throw new Error("id-not-found");
  } catch (e) {
    if (e instanceof Error && e.message === "id-not-found") {
      throw new CustomError(
        new NotFoundError(), 
        `Le tag avec l'id ${id} n'existe pas en base de données`
      );
    } else if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      const errorKey = retrieveKeyFromDbErrorMessage(e.driverError.detail);
      switch (errorKey) {
        case "name":
          throw new CustomError(
            new UnprocessableEntityError(), 
            `Le nom ${name} est déjà utilisé, vous devez en choisir un autre`
          );
        default:
          throw new CustomError(
            new BadRequestError(), 
            `Il y a un problème lors de la création du tag ou dans le format de la requête`
          );
      }
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
 * @returns deleted tag | 404 Not Found | 500 Internal Server Error
 */
export const deleteTag = async (id: number): Promise<Tag> => {
  try {
    const tagToRemove = await TagRepository.findOneBy({id});
    if (tagToRemove) {
      return await TagRepository.remove(tagToRemove);
    } else throw new Error("id-not-found");
  } catch (e) {
    if (e instanceof Error && e.message === "id-not-found") {
      throw new CustomError(
        new NotFoundError(), 
        `Le tag avec l'id ${id} n'existe pas en base de données`
      );
    } 
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le tag n'a pas été supprimé`
    );
  }
};
