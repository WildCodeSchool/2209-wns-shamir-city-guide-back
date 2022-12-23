import Category from "../entity/Category.entity";
import { CustomError } from "../utils/CustomError.utils";
import { CategoryRepository } from "../repository/category.repository";

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
  id: number,
  name: string
): Promise<Category> => {
  const category = await CategoryRepository.findByName(name);
  if (category !== null) {
    return category;
  } else {
    throw new CustomError(500, `This category's name isn't correct`);
  }
};

/**
 * Returns category by id
 * @param {number} id
 * @returns Category
 */
export const getById = async (id: number): Promise<Category> => {
  const isCategoryExist = await CategoryRepository.findById(id);
  if (isCategoryExist !== null) {
    return isCategoryExist;
  } else {
    throw new CustomError(401, `The category with id ${id} doesn't exist`);
  }
};
