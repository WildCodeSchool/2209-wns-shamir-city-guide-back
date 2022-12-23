import Category from "../entity/Category.entity";
import { CustomError } from "../utils/CustomError.utils";
import { CategoryRepository } from "../repository/category.repository";
import { Repository } from "typeorm";

/**
 * Returns all categories from database
 * @returns Category[]
 */
export const getAll = async (): Promise<Category[]> => {
  const categories = await CategoryRepository.find();
  if (categories !== null) {
    return categories;
  } else {
    throw new CustomError(
      500,
      `There is a problem to load categories from the database`
    );
  }
};

/**
 * Returns category by name
 * @param {string} name
 * @returns Category
 */
export const getByName = async (
  name: string
): Promise<Category | null> => {
  const isNameExist = await CategoryRepository.findOneBy({name});
  if (isNameExist !== null) {
    return isNameExist;
  } else {
    throw new CustomError(
      500,
      `This category with name ${name} does not exist`
    );
  }
};

/**
 * Returns category by id
 * @param {number} id
 * @returns isCategoryExist
 */
export const getById = async (id: number): Promise<Category> => {
  const isCategoryExist = await CategoryRepository.findOneBy({id});
  if (isCategoryExist !== null) {
    return isCategoryExist;
  } else {
    throw new CustomError(401, `The category with id ${id} doesn't exist`);
  }
};

/**
 * Returns category by icon
 * @param {icon} string
 * @returns category
 */
export const getByIcon = async (icon: string): Promise<Category> => {
  const isIconExist = await CategoryRepository.findOneBy({icon});
  if (isIconExist !== null) {
    return isIconExist;
  } else {
    throw new CustomError(401, `The category with icon ${icon} doesn't exist`);
  }
};

/**
 * Create and return a category
 * @param name color icon
    @returns the created category
*/
export const create = async (name:string, color: string, icon: string) : Promise<Category> => {
      const category: Category | null = await getByName(name);
    if (category !== null) {
      return category;
    } else {
      return await repository.save({ name, color, icon });
    }
}

