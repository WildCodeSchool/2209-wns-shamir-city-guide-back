import { Min, MinLength, MaxLength, IsOptional } from "class-validator";
import { CategoryErrorValidator } from "../messages.validator";
import { CategoryType } from "../../utils/type/category.utils.type";
import { validateData } from "../validate.validator";
import { CustomError } from "../../utils/error/CustomError.utils.error";
import { BadRequestError } from "../../utils/error/interfaces.utils.error";

export class CategoryValidator {
  @IsOptional()
  @Min(1, {
    message: CategoryErrorValidator.ID_EQUAL_0,
  })
  id: number;

  @MinLength(1, {
    message: CategoryErrorValidator.NAME_TOO_SHORT,
  })
  @MaxLength(255, {
    message: CategoryErrorValidator.NAME_TOO_LONG,
  })
  name: string;

  @MaxLength(255, {
    message: CategoryErrorValidator.ICON_TOO_LONG,
  })
  icon: string;
}

/**
 * Checks the validity of the catgory data during creation
 * @param {CategoryType} category the category
 * @returns <CategoryValidator> the verified category
 * @throws Error: 400 Bad Request | 422 Unprocessable Entity
 */
export const validateCreationCategoryInput = async (
  category: CategoryType
): Promise<CategoryValidator> => {
  if (Object.keys(category).includes("id")) {
    throw new CustomError(
      new BadRequestError(),
      CategoryErrorValidator.ID_NOT_REQUIRED
    );
  }
  const { name, icon } = category;
  const categoryValidator = new CategoryValidator();
  categoryValidator.name = name && name.length > 0 ? name.trim() : "";
  categoryValidator.icon = icon && icon.length > 0 ? icon.trim() : "";
  return await validateData(categoryValidator);
};

/**
 * Checks the validity of the category data during update
 * @param {CategoryType} category the category
 * @returns <CategoryValidator> the verified data
 * @throws Error: 400 Bad Request | 422 Unprocessable Entity
 */
export const validateUpdateCategoryInput = async (
  category: CategoryType
): Promise<CategoryValidator> => {
  if (!Object.keys(category).includes("id")) {
    throw new CustomError(
      new BadRequestError(),
      CategoryErrorValidator.ID_REQUIRED
    );
  }

  const { id, name, icon } = category;
  const categoryValidator = new CategoryValidator();
  categoryValidator.id = id;
  categoryValidator.name = name && name.length > 0 ? name.trim() : "";
  categoryValidator.icon = icon && icon.length > 0 ? icon.trim() : "";
  return await validateData(categoryValidator);
};
