import { Field, InputType } from "type-graphql";
import { Min, MinLength, MaxLength, validate } from "class-validator";
import { CustomError } from "../utils/error/CustomError.utils.error";
import { FunctionsFlag } from "../utils/constants.utils";
import { UnprocessableEntityError } from "../utils/error/interfaces.utils.error";

// Error messages
const idEqual0Error = "The tag id have to be superior than 0";
const nameTooShortError = "The given name length for the tag is too short. The minimal length is 1 character, but actual is 0";
const nameTooLongError = "The given name length for the tag is too long. The maximal length is $constraint1 character";
const iconTooLongError = "The given icon length for the tag is too long. The maximal length is $constraint1 character";

@InputType()
export class TagById {
    @Field()
    @Min(0, {
        message: idEqual0Error
    })
    id: number
}

@InputType()
export class TagByName {
    @Field()
    @MinLength(1, {
        message: nameTooShortError
    })
    @MaxLength(255, {
        message: nameTooLongError
    })
    name: string
}

@InputType()
export class TagCreationInput {
    @Field()
    @MinLength(1, {
        message: nameTooShortError,
    })
    @MaxLength(255, {
        message: nameTooLongError
    })
    name: string

    @Field()
    @MaxLength(255, {
        message: iconTooLongError
    })
    icon: string
}

@InputType()
export class TagUpdateInput extends TagCreationInput {
    @Field()
    @Min(1, {
        message: idEqual0Error
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
export const validateTagInput = async (flag: string, data: TagTypeValidator): Promise<void> => {
    let tag;
    switch (flag) {
        case FunctionsFlag.GETBYID:
            tag = new TagById();
            if (data.id) tag.id = data.id;
            break;
        case FunctionsFlag.GETBYNAME:
            tag = new TagByName();
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
            return;
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
}
