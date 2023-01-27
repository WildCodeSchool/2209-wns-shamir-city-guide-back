import "reflect-metadata";
import Category from "../entity/Category.entity";
import { CategoryRepository } from "../repository/category.repository";
import { QueryFailedError } from "typeorm";
import {
  retrieveKeyFromDbErrorMessage,
  formatString,
} from "../utils/string.utils";

import {
  CategoryErrorsFlag,
  handleCategoryError,
} from "../utils/error/handleError/category.utils.error";

import { CustomError } from "../utils/error/CustomError.utils.error";
import { InternalServerError } from "../utils/error/interfaces.utils.error";
import { CategoryValidator } from "../validator/entity/category.validator.entity";

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
      `Problème de connexion interne, les catégories n'ont pas été chargés`
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
    if (e instanceof Error && e.message === CategoryErrorsFlag.NAME_NOT_FOUND)
      handleCategoryError(CategoryErrorsFlag.NAME_NOT_FOUND, formatName);
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
    if (e instanceof Error && e.message === CategoryErrorsFlag.ID_NOT_FOUND)
      handleCategoryError(CategoryErrorsFlag.ID_NOT_FOUND, id);
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, la catégorie n'a pas été chargée`
    );
  }
};

/**
 * Returns category by icon
 * @param {icon} string
 * @returns category
 */
export const getByIcon = async (icon: string): Promise<Category> => {
  const formatIcon = formatString(icon);
  try {
    const isIconExist = await CategoryRepository.findOneBy({ icon });
    if (isIconExist !== null) return isIconExist;
    else throw new Error(CategoryErrorsFlag.ICON_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error && e.message === CategoryErrorsFlag.ICON_NOT_FOUND)
      handleCategoryError(CategoryErrorsFlag.ICON_NOT_FOUND, formatIcon);
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, l'icone ${formatIcon} n'a pas été chargé`
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
    const createdCategory = await CategoryRepository.save(data);
    return createdCategory;
  } catch (e) {
    if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "name")
        handleCategoryError(CategoryErrorsFlag.NAME_ALREADY_USED, data.name);
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "icon")
        handleCategoryError(CategoryErrorsFlag.ICON_ALREADY_USED, data.icon);
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "color")
        handleCategoryError(CategoryErrorsFlag.COLOR_ALREADY_USED, data.color);
    }
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, la categorie ${data.name} n'a pas été créée`
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
    if (categoryToUpdate) {
      return await CategoryRepository.save({ ...categoryToUpdate, ...data });
    } else throw new Error(CategoryErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error && e.message === CategoryErrorsFlag.ID_NOT_FOUND)
      handleCategoryError(CategoryErrorsFlag.ID_NOT_FOUND, data.id);
    else if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "name")
        handleCategoryError(CategoryErrorsFlag.NAME_ALREADY_USED, data.name);
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "icon")
        handleCategoryError(CategoryErrorsFlag.ICON_ALREADY_USED, data.icon);
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "color")
        handleCategoryError(CategoryErrorsFlag.COLOR_ALREADY_USED, data.color);
    }
    throw new CustomError(
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
    if (e instanceof Error && e.message === CategoryErrorsFlag.ID_NOT_FOUND)
      handleCategoryError(CategoryErrorsFlag.ID_NOT_FOUND, id);
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, la catégorie n'a pas été supprimée`
    );
  }
};
