import "reflect-metadata";
import Category from "../entities/Category.entity";
import { CategoryRepository } from "../repositories/category.repository";
import { QueryFailedError } from "typeorm";
import { formatString } from "../utils/string.utils";

import {
  CategoryErrorsFlag,
  handleCategoryError,
  handleCategoryObjectError,
} from "../utils/errors/handleError/category.utils.error";

import { CustomError } from "../utils/errors/CustomError.utils.error";
import { InternalServerError } from "../utils/errors/interfaces.utils.error";
import { CategoryValidator } from "../validators/entities/category.validator.entity";
import { DefaultIconsNames } from "../utils/constants.utils";


/**
 * Returns all categories from database
 * @returns Category[]
 */
export const getAll = async (): Promise<Category[]> => {
  try {
    return await CategoryRepository.find();
  } catch (e) {
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, les catégories n'ont pas été chargées`
    );
  }
};

/**
 * Returns category by name
 * @param {string} name The name to use to retrieve a specific category
 * @returns Category
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const getByName = async (name: string): Promise<Category> => {
  const formatName = formatString(name);
  try {
    const isCategoryNameExist = await CategoryRepository.findOneBy({
      name: formatName,
    });
    if (isCategoryNameExist) return isCategoryNameExist;
    else throw new Error(CategoryErrorsFlag.NAME_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error) handleCategoryError(e, formatName);
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, la catégorie ${formatName} n'a pas été chargée`
    );
  }
};

/**
 * Returns category by id
 * @param {number} id The id to use to retrieve a specific category
 * @returns isCategoryExist
 *  * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const getById = async (id: number): Promise<Category> => {
  try {
    const isCategoryExist = await CategoryRepository.findOneBy({ id });
    if (isCategoryExist !== null) return isCategoryExist;
    else throw new Error(CategoryErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error) handleCategoryError(e, null);
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, la catégorie n'a pas été chargée`
    );
  }
};

/**
 * Create and return a category
 * @param {CategoryValidator} data Category object to create 
 * @returns the created category
 * @throws Error: 500 Internal Server Error | 422 Unprocessable Entity
*/
export const create = async (data: CategoryValidator): Promise<Category> => {
  data.name = formatString(data.name);

  try {
    // To avoid duplicates icons except the default one
    const categoryIconAlreadyInDB = await CategoryRepository.findOneBy({ icon: data.icon });
      if (categoryIconAlreadyInDB) data.icon = DefaultIconsNames.CATEGORY;

    const createdCategory = await CategoryRepository.save(data);
    return createdCategory;
  } catch (e) {
    if (e instanceof QueryFailedError || e instanceof Error) {
      handleCategoryObjectError(e, data);
    } throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, la catégorie ${data.name} n'a pas été créée`
    );
  }
};

/**
 * Update a category in database and return it
 * @param {CategoryValidator} data Category object to update
 * @returns updated category
 *  @throws Error: 500 Internal Server Error | 404 Not Found | 422 Unprocessable Entity
 */
export const update = async (data: CategoryValidator): Promise<Category> => {
  data.name = formatString(data.name);
  try {
    const categoryToUpdate = await CategoryRepository.findOneBy({
      id: data.id,
    });

    const categoryIconAlreadyInDB = await CategoryRepository.findByIconAndIfNotID(data.id, data.icon);
        if (categoryIconAlreadyInDB) data.icon = DefaultIconsNames.CATEGORY;

    if (categoryToUpdate) {
      return await CategoryRepository.save({ ...categoryToUpdate, ...data });
    } else throw new Error(CategoryErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof QueryFailedError || e instanceof Error) {
      handleCategoryObjectError(e, data);
    } throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, la catégorie n'a pas été mise à jour`
    );
  }
};

/**
 * Delete a category by its id in database
 * @param {number} id The id to use to delete a specific category
 * @returns deleted category
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const deleteCategory = async (id: number): Promise<Category> => {
  try {
    const categoryToRemove = await CategoryRepository.findOneBy({ id });
    if (categoryToRemove) {
      return await CategoryRepository.remove(categoryToRemove);
    } else throw new Error(CategoryErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error) handleCategoryError(e, null);
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, la catégorie n'a pas été supprimée`
    );
  }
};
