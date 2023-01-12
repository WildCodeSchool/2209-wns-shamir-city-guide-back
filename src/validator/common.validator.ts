import { Field, InputType } from "type-graphql";
import { Min, MinLength, MaxLength } from "class-validator";
import { validateData } from "./validate.validator";
import {  CommonErrorValidator } from "./messages.validator";


@InputType()
export class IdValidator{
    @Field()
    @Min(1, {
        message: CommonErrorValidator.ID_EQUAL_0
    })
    id: number
}

@InputType()
export class NameValidator {
    @Field()
    @MinLength(1, {
        message: CommonErrorValidator.NAME_TOO_SHORT
    })
    @MaxLength(255, {
        message: CommonErrorValidator.NAME_TOO_LONG
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
    return (await validateData(idValidator)).id;
}

/**
 * Function which verify resolver's name input validity
 * @param {string} name to convert entering data to the good InputType
 * @returns name if valid else throw error 422 Unprocessable Entity 
*/
export const validateNameInput = async (name: string): Promise<string> => {
    const fieldToVerify = new NameValidator();
    fieldToVerify.name = name.length > 0 ? name.trim() : '';
    return (await validateData(fieldToVerify)).name;
}