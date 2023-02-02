import {
  Min,
  MinLength,
  MaxLength,
  IsOptional,
  Matches,
} from "class-validator";
import { CategoryErrorValidator } from "../messages.validator";
import { CategoryType } from "../../types/category.type";
import { validateData } from "../validate.validator";
import { CustomError } from "../../utils/errors/CustomError.utils.error";
import { BadRequestError } from "../../utils/errors/interfaces.utils.error";

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

  @Matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, {
    message: CategoryErrorValidator.ICON_WRONG_FORMAT,
  })
  icon: string;

  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: CategoryErrorValidator.COLOR_WRONG_FORMAT,
  })
  color: string;
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
  const { name, icon, color } = category;
  const categoryValidator = new CategoryValidator();
  categoryValidator.name = name && name.length > 0 ? name.trim() : "";
  categoryValidator.icon = icon && icon.length > 0 ? icon.trim() : "";
  categoryValidator.color = color && color.length > 0 ? color.trim() : "";

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

  const { id, name, icon, color } = category;
  const categoryValidator = new CategoryValidator();
  categoryValidator.id = id;
  categoryValidator.name = name && name.length > 0 ? name.trim() : "";
  categoryValidator.icon = icon && icon.length > 0 ? icon.trim() : "";
  categoryValidator.color = color && color.length > 0 ? color.trim() : "";

  return await validateData(categoryValidator);
};
