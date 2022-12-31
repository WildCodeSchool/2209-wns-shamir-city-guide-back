import { Field, InputType } from "type-graphql";
import { Min, MinLength, MaxLength, validate } from "class-validator";
import { CustomError } from "../utils/error/CustomError.utils.error";
import { FunctionsFlag } from "../utils/constants.utils";
import { UnprocessableEntityError } from "../utils/error/interfaces.utils.error";

// Error messages
export const flagErrorMessage = "wrong flag provided",
    idEqual0ErrorMessage = "The tag id have to be superior than 0",  
    nameTooShortErrorMessage = "The given name length for the tag is too short. The minimal length is 1 character, but actual is 0",
    nameTooLongErrorMessage = "The given name length for the tag is too long. The maximal length is 255 character",
    iconTooLongErrorMessage = "The given icon length for the tag is too long. The maximal length is 255 character";

@InputType()
export class TagByIdInput {
    @Field()
    @Min(0, {
        message: idEqual0ErrorMessage
    })
    id: number
}

@InputType()
export class TagByNameInput {
    @Field()
    @MinLength(1, {
        message: nameTooShortErrorMessage
    })
    @MaxLength(255, {
        message: nameTooLongErrorMessage
    })
    name: string
}

@InputType()
export class TagCreationInput {
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
export class TagUpdateInput extends TagCreationInput {
    @Field()
    @Min(1, {
        message: idEqual0ErrorMessage
    })
    id: number
}

export type TagTypeValidator = {
    id?: number
    name?: string
    icon?:  string
}

/**
 * Function which verify resolver's inputs validity
 * @param {string} flag to convert entering data to the good InputType
 * @param {CustomTagType} data 
 * @returns void
*/
export const validateTagInput = async (flag: string, data: TagTypeValidator): Promise<string> => {
    let tag;
    switch (flag) {
        case FunctionsFlag.GETBYID:
            tag = new TagByIdInput();
            if (data.id) tag.id = data.id;
            break;
        case FunctionsFlag.GETBYNAME:
            tag = new TagByNameInput();
            data.name && data.name.length > 0 ? tag.name = data.name : tag.name = '';
            break;
        case FunctionsFlag.CREATE:
            tag = new TagCreationInput();
            data.name && data.name.length > 0 ? tag.name = data.name : tag.name = '';
            data.icon && data.icon.length > 0 ? tag.icon = data.icon : tag.icon = '';
            break;
        case FunctionsFlag.UPDATE:
            tag = new TagUpdateInput();
            if (data.id) tag.id = data.id;
            data.name && data.name.length > 0 ? tag.name = data.name : tag.name = '';
            data.icon && data.icon.length > 0 ? tag.icon = data.icon : tag.icon = '';
            break;
        default:
            throw new CustomError(new UnprocessableEntityError(), flagErrorMessage);
    }

    let errorMessage = '';
    if (tag) {
        try {
            const foundErrors = await validate(tag);
            if (foundErrors.length > 0) {
                const firstError = foundErrors[0].constraints;
                
                if (firstError) {
                    errorMessage = Object.values(firstError)[0];
                    throw new Error("error-validation")
                } 
            } 
        } catch (e) {
            if (e instanceof Error && e.message === "error-validation") {
                throw new CustomError(new UnprocessableEntityError(), errorMessage);
            }
        }
    }
    return 'compliant data';
}
