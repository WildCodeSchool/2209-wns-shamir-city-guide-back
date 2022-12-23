import Tag from "../entity/Tag.entity";
import { CustomError } from "../utils/CustomError.utils";
import { TagRepository } from "../repository/tag.repository";
import { QueryFailedError } from "typeorm";
import { retrieveKeyFromDbErrorMessage } from "../utils/string.utils";
<<<<<<< HEAD
=======

>>>>>>> f1b492dede9b29bf5a52645080d7b17aca169cb0

/**
 * Returns all tags from database
 * @returns Tag[]
 */
export const getAll = async (): Promise<Array<Tag>> => {
  try {
    return await TagRepository.find();
  } catch (e) {
    throw new CustomError(500, `There is a problem to load tags from the database`);
  }
};

/**
 * Returns tag by id and name
 * @param {number} id
 * @param {string} name
 * @returns Tag
 */
export const getByIdAndName = async (id: number, name: string): Promise<Tag | null> => {
  try {
    return await TagRepository.findByIdAndByName(id, name);
  } catch (e) {
<<<<<<< HEAD
=======
  const tags = await TagRepository.find();
  if (tags !== null) {
    return tags;
  } else {
>>>>>>> f1b492dede9b29bf5a52645080d7b17aca169cb0
    throw new CustomError(
      500,
      `There is a problem to load the tag with the id ${id} and the name ${name} from the database`
    );
  }
};

/**
 * Returns tag by name and icon
 * @param {string} name
 * @param {string} icon
 * @returns Tag
 */
export const getByNameAndIcon = async (name: string, icon: string): Promise<Tag | null> => {
  try {
    return await TagRepository.findByNameAndByIcon(name, icon);
  } catch (e) {
<<<<<<< HEAD
    throw new CustomError(
      500,
      `There is a problem to load the tag with the name ${name} and the icon ${icon} from the database`
=======

 * Returns all tags from database
 * @returns Tag[]
 */
export const getByIdAndName = async (id: number, name: string): Promise<Tag | null> => {
  const tag: Tag | null = await TagRepository.findByIdAndByName(id, name);
  if (tag !== null) {
    return tag;
  } else {
    throw new CustomError(
      500,
      `There is a problem to load tags from the database`
>>>>>>> f1b492dede9b29bf5a52645080d7b17aca169cb0
    );
  }
};

/**
 * Returns a tag by its id from database
 * @param {number} id The id to use to retrieve a specific tag
 * @returns tag if exist null otherwise
 */
export const getById = async (id: number): Promise<Tag | null> => {
<<<<<<< HEAD
  try {
    const isTagExist = await TagRepository.findOneBy({id});
    if (isTagExist && Object.keys(isTagExist).length > 0) return isTagExist;
    else throw new Error("not-found");
  } catch (e) {
    if (e instanceof Error && e.message === "not-found") {
      throw new CustomError(401, `The tag with the id ${id} doesn't exist in database`);
    }
    throw new CustomError(500, `Internal connection error`);
=======
  const isTagExist = await TagRepository.findOneBy({
    id: id,
  });

  if (isTagExist && Object.keys(isTagExist).length > 0) {
    return isTagExist;
  } else {
    throw new CustomError(
      500,
      `There is a problem to load the tag with the name ${name} and the icon ${icon} from the database`
    );
>>>>>>> f1b492dede9b29bf5a52645080d7b17aca169cb0
  }
};

/**
 * Returns a tag by its id from database
 * @param {number} id The id to use to retrieve a specific tag
 * @returns tag if exist null otherwise
 */
export const getById = async (id: number): Promise<Tag | null> => {
  try {
<<<<<<< HEAD
    const retrievedTag = await TagRepository.findOneBy({name});
    if (retrievedTag && Object.keys(retrievedTag).length > 0) return retrievedTag;
    else throw new Error("name-not-found");
  } catch (e) {
    if (e instanceof Error && e.message === "name-not-found") {
      throw new CustomError(426, `The tag with the name ${name} doesn't exist in database`);
=======
    const isTagExist = await TagRepository.findOneBy({id});
    if (isTagExist && Object.keys(isTagExist).length > 0) return isTagExist;
    else throw new Error("id-not-found");
    const retrievedTag = await TagRepository.findOneBy({
      name,
    });
    if (retrievedTag && Object.keys(retrievedTag).length > 0) {
      return retrievedTag;
    } else {
      throw new Error("id-not-found");
    }
  } catch (e) {
    if (e instanceof Error && e.message === "not-found") {
      throw new CustomError(401, `The tag with the id ${id} doesn't exist in database`);
>>>>>>> f1b492dede9b29bf5a52645080d7b17aca169cb0
    }
    throw new CustomError(500, `Internal connection error`);
  }
};


/**
 * Create and return a tag
 * @param name tag name 
    @returns tag the created tag
*/
export const create = async (name: string, icon: string): Promise<Tag | null | undefined> => {
  try {
    const createdTag = await TagRepository.save({name, icon});
    return createdTag;
  } catch (e) {
    if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      const errorKey = retrieveKeyFromDbErrorMessage(e.driverError.detail);
      switch (errorKey) {
        case "name":
          throw new CustomError(400, `The name ${name} is already used, you have to choose another one`);
        case "icon":
          throw new CustomError(400, `The icon ${icon} is already used, you have to choose another one or rename it`);
        default:
          throw new CustomError(400, `There is a problem during the tag creation, retry later please`);
      }
    } 
    throw new CustomError(500, `There is an internal connection error`);
  }
};

/**
 * Update a tag in database and return it
 * @param {number} id existing tag id
 * @param {string} name new tag name
 * @returns updated tag
 */
export const update = async (
  id: number,
  name: string,
  icon: string
): Promise<Tag | undefined> => {
  try {
    const tagToUpdate = await TagRepository.findOneBy({id});
    if (tagToUpdate && Object.keys(tagToUpdate).length > 0) {
      return await TagRepository.save({...tagToUpdate, name, icon});
    } else throw new Error("id-not-found");
  } catch (e) {
    if (e instanceof Error && e.message === "id-not-found") {
      throw new CustomError(400, `The tag with the id ${id} doesn't exist in database`);
    } else if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      const errorKey = retrieveKeyFromDbErrorMessage(e.driverError.detail);
      switch (errorKey) {
        case "name":
          throw new CustomError(400, `The name ${name} is already used, you have to choose another one`);
        case "icon":
          throw new CustomError(400, `The icon ${icon} is already used, you have to choose another one or rename it`);
        default:
          throw new CustomError(400, `There is a problem during the tag creation, retry later please`);
      }
    } 
    throw new CustomError(
      500,
      `Problem to update tag with id ${id}, there is probably an internal error in database server`
    );
  }
};

/**
 * Delete a tag by its id in database
 * @param {number} id
 * @returns no content
 */
export const deleteTag = async (id: number): Promise<Tag | undefined> => {
  try {
    const tagToRemove = await TagRepository.findOneBy({id});
    if (tagToRemove && Object.keys(tagToRemove).length > 0) {
      return await TagRepository.remove(tagToRemove);
    } else throw new Error("id-not-found");
  } catch (e) {
    if (e instanceof Error && e.message === "id-not-found") {
      throw new CustomError(400, `The tag with the id ${id} doesn't exist in database`);
    } 
    throw new CustomError(
      500,
      `Problem to remove tag with id ${id}, there is probably an internal error in database server`
    );
  }
};
