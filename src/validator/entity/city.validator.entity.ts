import { Field, InputType } from "type-graphql";
import { Min, MinLength, MaxLength } from "class-validator";
import {
    idEqual0ErrorMessage,
    nameTooShortErrorMessage,
    nameTooLongErrorMessage,
    latitudeTooShortErrorMessage,
    latitudeTooLongErrorMessage,
    longitudeTooShortErrorMessage,
    longitudeTooLongErrorMessage,
    pictureTooLongErrorMessage 
} from "../messages.validator";
import City from "../../entity/City.entity";
import { validateData } from "../validate.validator";


@InputType()
export class CityCreationValidator {
    @Field()
    @MinLength(1, {
        message: nameTooShortErrorMessage,
    })
    @MaxLength(255, {
        message: nameTooLongErrorMessage
    })
    name: string

    @Field()
    @MinLength(6, {
        message: latitudeTooShortErrorMessage,
    })
    @MaxLength(255, {
        message: latitudeTooLongErrorMessage
    })
    latitude: string
    
    @Field()
    @MinLength(6, {
        message: longitudeTooShortErrorMessage,
    })
    @MaxLength(255, {
        message: longitudeTooLongErrorMessage
    })
    longitude: string

    @Field()
    @MaxLength(255, {
        message: pictureTooLongErrorMessage
    })
    picture: string
}

@InputType()
export class CityUpdateValidator extends CityCreationValidator {
    @Field()
    @Min(1, {
        message: idEqual0ErrorMessage
    })
    id: number
}


/**
 * Checks the validity of the city data during creation
 * @param {string} name the city name 
 * @param {string} latitude the city latitude
 * @param {string} longitude the city latitude
 * @param {string} picture the city latitude
 * @returns <City> the verified data | throw error 422 Unprocessable Entity
*/
export const validateCreationCityInput = async (
    name: string, 
    latitude: string,
    longitude: string,
    picture: string
): Promise<City> => {
    const cityValidator = new CityCreationValidator();
    cityValidator.name = name && name.length > 0 ? name.trim() : '';
    cityValidator.latitude = latitude && latitude.length > 0 ? latitude.trim() : '';
    cityValidator.longitude = longitude && longitude.length > 0 ? longitude.trim() : '';
    cityValidator.picture = picture && picture.length > 0 ? picture.trim() : '';
    return await validateData(cityValidator);
}


/**
 * Checks the validity of the city data during update
 * @param {string} name the city name 
 * @param {string} latitude the city latitude
 * @param {string} longitude the city latitude
 * @param {string} picture the city latitude
 * @returns <City> the verified data | throw error 422 Unprocessable Entity
*/
export const validateUpdateCityInput = async (
    id: number, 
    name: string, 
    latitude: string,
    longitude: string,
    picture: string
): Promise<City> => {
    const cityValidator = new CityUpdateValidator();
    cityValidator.id = id;
    cityValidator.name = name && name.length > 0 ? name.trim() : '';
    cityValidator.latitude = latitude && latitude.length > 0 ? latitude.trim() : '';
    cityValidator.longitude = longitude && longitude.length > 0 ? longitude.trim() : '';
    cityValidator.picture = picture && picture.length > 0 ? picture.trim() : '';
    return await validateData(cityValidator);
}