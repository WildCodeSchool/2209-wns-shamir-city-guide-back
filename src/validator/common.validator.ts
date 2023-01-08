import { Field, InputType } from "type-graphql";
import { Min, MinLength, MaxLength, Matches } from "class-validator";
import { validateData } from "./validate.validator";
import {  
    idEqual0ErrorMessage, 
    nameTooShortErrorMessage, 
    nameTooLongErrorMessage,
    latitudeFormatErrorMessage,
    longitudeFormatErrorMessage 
} from "./messages.validator";


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

@InputType()
export class LatitudeAndLongitudeValidator {
    @Field()
    @Matches(/^-?([0-8]?[0-9]|90)(\.[0-9]{1,})$/, {
        message: latitudeFormatErrorMessage
    })
    latitude: string
    
    @Field()
    @Matches(/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,})$/, {
        message: longitudeFormatErrorMessage
    })
    longitude: string
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