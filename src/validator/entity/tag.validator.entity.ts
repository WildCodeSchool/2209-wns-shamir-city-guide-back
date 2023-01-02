import { Field, InputType } from "type-graphql";
import { Min, MinLength, MaxLength } from "class-validator";
import {
    idEqual0ErrorMessage,
    nameTooShortErrorMessage,
    nameTooLongErrorMessage,
    iconTooLongErrorMessage 
} from "../messages.validator";
import Tag from "../../entity/Tag.entity";
import { validateData } from "../validate.validator";


@InputType()
export class TagCreationValidator {
    @Field()
    @MinLength(1, {
        message: nameTooShortErrorMessage,
    })
    @MaxLength(255, {
        message: nameTooLongErrorMessage
    })
    name: string

    @Field()
    @MaxLength(255, {
        message: iconTooLongErrorMessage
    })
    icon: string
}

@InputType()
export class TagUpdateValidator extends TagCreationValidator {
    @Field()
    @Min(1, {
        message: idEqual0ErrorMessage
    })
    id: number
}


/**
 * Checks the validity of the tag data during creation
 * @param {string} name the tag name 
 * @param {string} icon the tag icon
 * @returns <Tag> the verified data | throw error 422 Unprocessable Entity
*/
export const validateCreationTagInput = async (name: string, icon: string): Promise<Tag> => {
    const tagValidator = new TagCreationValidator();
    tagValidator.name = name && name.length > 0 ? name.trim() : '';
    tagValidator.icon = icon && icon.length > 0 ? icon.trim() : '';
    const verifiedData = await validateData(tagValidator);
    return verifiedData;
}


/**
 * Checks the validity of the tag data during update
 * @param {number} id the tag id
 * @param {string} name the tag name 
 * @param {string} icon the tag icon
 * @returns <Tag> the verified data | throw error 422 Unprocessable Entity
*/
export const validateUpdateTagInput = async (id: number, name: string, icon: string): Promise<Tag> => {
    const tagValidator = new TagUpdateValidator();
    tagValidator.id = id;
    tagValidator.name = name && name.length > 0 ? name.trim() : '';
    tagValidator.icon = icon && icon.length > 0 ? icon.trim() : '';
    const verifiedData = await validateData(tagValidator);
    return verifiedData;
}