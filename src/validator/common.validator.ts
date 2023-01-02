import { Field, InputType } from "type-graphql";
import { Min, MinLength, MaxLength } from "class-validator";
import { validateData } from "./validate.validator";
import {  idEqual0ErrorMessage, nameTooShortErrorMessage, nameTooLongErrorMessage } from "./messages.validator";


@InputType()
export class IdValidator{
    @Field()
    @Min(1, {
        message: idEqual0ErrorMessage
    })
    id: number
}

@InputType()
export class NameValidator {
    @Field()
    @MinLength(1, {
        message: nameTooShortErrorMessage
    })
    @MaxLength(255, {
        message: nameTooLongErrorMessage
    })
    name: string
}


/**
 * Function which verify resolver's id input validity
 * @param {number} id to convert entering data to the good InputType 
 * @returns id if valid else throw error 422 Unprocessable Entity 
*/
export const validateIdInput = async (id: number): Promise<number> => {
    const idValidator = new IdValidator();
    idValidator.id = id;
    const verifiedId = await validateData(idValidator);
    return verifiedId.id;
}

/**
 * Function which verify resolver's name input validity
 * @param {string} name to convert entering data to the good InputType
 * @returns name if valid else throw error 422 Unprocessable Entity 
*/
export const validateNameInput = async (name: string): Promise<string> => {
    const fieldToVerify = new NameValidator();
    fieldToVerify.name = name.length > 0 ? name.trim() : '';
    const verifiedName = await validateData(fieldToVerify);
    return verifiedName.name;
}
