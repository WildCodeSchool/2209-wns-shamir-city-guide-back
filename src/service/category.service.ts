import Category from "../entity/Category.entity";
import { CustomError } from "../utils/CustomError.utils";
import { CategoryRepository } from "../repository/category.repository";

/**
 * Returns all categories from database
 * @returns Category[]
 */
export const getAll = async (): Promise<Category[]> => {
  try {
    const categories = await CategoryRepository.find();
    return categories;
  } catch (e) {
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
export const getByName = async (name: string): Promise<Category> => {
  try {
    const isNameExist = await CategoryRepository.findOneBy({ name });
    if (isNameExist) return isNameExist;
    else throw new Error("name-not-found");
  } catch (e) {
    if (e instanceof Error && e.message === "name-not-found") {
      throw new CustomError(400, `The name ${name} doesn't exist`);
    }
    throw new CustomError(500, `Internal connection error`);
  }
};


//reprendre try catch
/**
 * Returns category by id
 * @param {number} id
 * @returns isCategoryExist
 */
export const getById = async (id: number): Promise<Category> => {
  const isCategoryExist = await CategoryRepository.findOneBy({ id });
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
  const isIconExist = await CategoryRepository.findOneBy({ icon });
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
export const create = async (
  name: string,
  color: string,
  icon: string
): Promise<Category> => {
  const category: Category | null = await getByName(name);
  if (category !== null) {
    return category;
  } else {
    return await CategoryRepository.save({ name, color, icon });
  }
};
