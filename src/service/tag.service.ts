import Tag from "../entity/Tag.entity";
import { CustomError } from "../utils/CustomError.utils";
import { TagRepository } from "../repository/tag.repository";

/**
 * Returns all tags from database
 * @returns Tag[]
 */
export const getAll = async (): Promise<Array<Tag>> => {
  const tags = await TagRepository.find();
  if (tags !== null) {
    return tags;
  } else {
    throw new CustomError(
      500,
      `There is a problem to load tags from the database`
    );
  }
};

/**
 * Returns tag by id and name
 * @param {number} id
 * @param {string} name
 * @returns Tag
 */
export const getByIdAndName = async (id: number, name: string): Promise<Tag | null> => {
  const tag: Tag | null = await TagRepository.findByIdAndByName(id, name);
  if (tag !== null) {
    return tag;
  } else {
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
  const tag: Tag | null = await TagRepository.findByNameAndByIcon(name, icon);
  if (tag !== null) {
    return tag;
  } else {
    throw new CustomError(
      500,
      `There is a problem to load the tag with the name ${name} and the icon ${icon} from the database`
    );
  }
};

/**
 * Returns a tag by its id from database
 *
 * @param {number} id The id to use to retrieve a specific tag
 * @returns tag if exist null otherwise
 */
export const getById = async (id: number): Promise<Tag | null> => {
  const isTagExist = await TagRepository.findOneBy({
    id: id,
  });

  if (isTagExist && Object.keys(isTagExist).length > 0) {
    return isTagExist;
  } else {
    throw new CustomError(
      401,
      `The tag with the id ${id} doesn't exist in database`
    );
  }
};

/**
 * Retrieve a tag by name.
 * @param name tag name
 * @returns the tag if exist null otherwise
 */
export const getByName = async (name: string): Promise<Tag | null> => {
  try {
    const retrievedTag = await TagRepository.findOneBy({
      name,
    });
    if (retrievedTag && Object.keys(retrievedTag).length > 0) {
      return retrievedTag;
    } else {
      throw new Error("not-found");
    }
  } catch (e) {
    if (e instanceof Error && e.message === "not-found") {
      throw new CustomError(
        426,
        `The tag with the name ${name} not found in database`
      );
    }
    throw new CustomError(500, `Internal connection error`);
  }
};

/**
 * Verify if a tag doesn't already exist in database before creation.
 * @param name tag name
 * @returns bool true or false
 */
export const verifyIfNotExistByName = async (
  name: string
): Promise<boolean> => {
  try {
    const retrievedTag = await TagRepository.findOneBy({
      name,
    });
    if (retrievedTag && Object.keys(retrievedTag).length > 0) {
      throw new Error("name-already-found");
    } else {
      return true;
    }
  } catch (e) {
    if (e instanceof Error && e.message === "name-already-found") {
      throw new Error("name-already-found");
    } else {
      throw new CustomError(500, `Internal connection error`);
    }
  }
};

/**
 * Create and return a tag
 * @param name tag name 
    @returns tag the created tag
*/
export const create = async (name: string, icon: string): Promise<Tag | null | undefined> => {
  try {
    const isTagNotExist = await verifyIfNotExistByName(name);
    if (isTagNotExist) {
      try {
        const createdTag = await TagRepository.save({ name, icon });
        return createdTag;
      } catch (e) {
        throw new Error("creation-error");
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === "name-already-found") {
        throw new CustomError(400, `The tag ${name} already exist in database`);
      } else if (e.message === "creation-error") {
        throw new CustomError(400, `Error during the skill creation`);
      }
    }
    throw new CustomError(500, `Internal connection error`);
  }
};

/**
 * Update a tag in database and return it
 * @param {number} tagId existing tag id
 * @param {string} name new tag name
 * @returns updated tag
 */
export const update = async (
  tagId: number,
  name: string,
  icon: string
): Promise<Tag | undefined> => {
  try {
    const isNameAlreadyExist = await verifyIfNotExistByName(name);
    const tagToUpdate = await getById(tagId);

    if (
      isNameAlreadyExist &&
      tagToUpdate !== null &&
      Object.keys(tagToUpdate).length > 0
    ) {
      const updatedTag = { ...tagToUpdate, name, icon };
      return await TagRepository.save(updatedTag);
    }
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === "name-already-found") {
        throw new CustomError(400, `The tag ${name} already exist in database`);
      }
    }
    throw new CustomError(
      500,
      `Problem to update tag with id ${tagId}, it probably doesn't exist in database`
    );
  }
};

/**
 * Delete a tag by its id in database
 * @param {number} tagId
 * @returns no content
 */
export const deleteTag = async (tagId: number): Promise<Tag | undefined> => {
  try {
    const tagToRemove = await getById(tagId);
    if (tagToRemove && Object.keys(tagToRemove).length > 0) {
      return await TagRepository.remove(tagToRemove);
    }
  } catch (e) {
    throw new CustomError(
      400,
      `Problem to remove tag with id ${tagId}, it probably doesn't exist in database`
    );
  }
};
