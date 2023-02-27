import { Min, MinLength, MaxLength, IsOptional } from "class-validator";
import { TagErrorValidator } from "../messages.validator";
import { TagType } from "../../types/tag.type";
import { validateData } from "../validate.validator";
import { CustomError } from "../../utils/errors/CustomError.utils.error";
import { BadRequestError } from "../../utils/errors/interfaces.utils.error";

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

  @MinLength(1, {
    message: TagErrorValidator.ICON_TOO_SHORT,
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
  
  return await setTagValidator(tag);
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
  
  return await setTagValidator(tag);
};

const setTagValidator = async (tag: TagType): Promise<TagValidator> => {
  let id = null;
  if (tag.id !== null) id = tag.id;
  const { name, icon } = tag;
  
  const tagValidator = new TagValidator();
  if (id !== null) tagValidator.id = id;
  tagValidator.name = name && name.length > 0 ? name.trim() : "";
  tagValidator.icon = icon && icon.length > 0 ? icon.trim() : "";
  
  return await validateData(tagValidator);
}
