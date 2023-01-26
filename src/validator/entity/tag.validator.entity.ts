import { Min, MinLength, MaxLength, IsOptional } from "class-validator";
import { TagErrorValidator } from "../messages.validator";
import { TagType } from "../../utils/type/tag.utils.type";
import { validateData } from "../validate.validator";
import { CustomError } from "../../utils/error/CustomError.utils.error";
import { BadRequestError } from "../../utils/error/interfaces.utils.error";

export class TagValidator {
  @IsOptional()
  @Min(1, {
    message: TagErrorValidator.ID_EQUAL_0,
  })
  id: number;

  @MinLength(1, {
    message: TagErrorValidator.NAME_TOO_SHORT,
  })
  @MaxLength(255, {
    message: TagErrorValidator.NAME_TOO_LONG,
  })
  name: string;

  @MaxLength(255, {
    message: TagErrorValidator.ICON_TOO_LONG,
  })
  icon: string;
}

/**
 * Checks the validity of the tag data during creation
 * @param {TagType} tag the tag
 * @returns <TagValidator> the verified tag
 * @throws Error: 400 Bad Request | 422 Unprocessable Entity
 */
export const validateCreationTagInput = async (
  tag: TagType
): Promise<TagValidator> => {
  if (Object.keys(tag).includes("id")) {
    throw new CustomError(
      new BadRequestError(),
      TagErrorValidator.ID_NOT_REQUIRED
    );
  }

  const { name, icon } = tag;
  const tagValidator = new TagValidator();
  tagValidator.name = name && name.length > 0 ? name.trim() : "";
  tagValidator.icon = icon && icon.length > 0 ? icon.trim() : "";
  return await validateData(tagValidator);
};

/**
 * Checks the validity of the tag data during update
 * @param {TagType} tag the tag
 * @returns <TagValidator> the verified data
 * @throws Error: 400 Bad Request | 422 Unprocessable Entity
 */
export const validateUpdateTagInput = async (
  tag: TagType
): Promise<TagValidator> => {
  if (!Object.keys(tag).includes("id")) {
    throw new CustomError(new BadRequestError(), TagErrorValidator.ID_REQUIRED);
  }

  const { id, name, icon } = tag;
  const tagValidator = new TagValidator();
  tagValidator.id = id;
  tagValidator.name = name && name.length > 0 ? name.trim() : "";
  tagValidator.icon = icon && icon.length > 0 ? icon.trim() : "";
  return await validateData(tagValidator);
};
