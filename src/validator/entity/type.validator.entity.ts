import { Field, InputType } from "type-graphql";
import { Min, MinLength, MaxLength } from "class-validator";
import { TypeErrorValidator } from "../messages.validator";
import { validateData } from "../validate.validator";


@InputType()
export class TypeCreationValidator  {
    @MinLength(1, {
        message: TypeErrorValidator.NAME_TOO_SHORT
    })
    @MaxLength(255, {
        message: TypeErrorValidator.NAME_TOO_LONG
    })
    name: string
    
    @MaxLength(255, {
        message: TypeErrorValidator.LOGO_TOO_LONG
    })
    logo: string
    
    @MinLength(1, {
        message: TypeErrorValidator.COLOR_TOO_SHORT,
    })
    @MaxLength(255, {
        message: TypeErrorValidator.COLOR_TOO_LONG
    })
    color: string
}

@InputType()
export class TypeValidator extends TypeCreationValidator {
    @Min(1, {
        message: TypeErrorValidator.ID_EQUAL_0
    })
    id: number
}


// /**
//  * Checks the validity of the city data during creation
//  * @param {string} name the city name 
//  * @param {string} latitude the city latitude
//  * @param {string} longitude the city latitude
//  * @param {string} picture the city latitude
//  * @returns <City> the verified data | throw error 422 Unprocessable Entity
// */
// export const validateCreationCityInput = async (
//     name: string, 
//     latitude: string,
//     longitude: string,
//     picture: string
// ): Promise<City> => {
//     const cityValidator = new CityCreationValidator();
//     cityValidator.name = name && name.length > 0 ? name.trim() : '';
//     cityValidator.latitude = latitude && latitude.length > 0 ? latitude.trim() : '';
//     cityValidator.longitude = longitude && longitude.length > 0 ? longitude.trim() : '';
//     cityValidator.picture = picture && picture.length > 0 ? picture.trim() : '';
//     return await validateData(cityValidator);
// }


// /**
//  * Checks the validity of the city data during update
//  * @param {string} name the city name 
//  * @param {string} latitude the city latitude
//  * @param {string} longitude the city latitude
//  * @param {string} picture the city latitude
//  * @returns <City> the verified data | throw error 422 Unprocessable Entity
// */
// export const validateUpdateCityInput = async (
//     id: number, 
//     name: string, 
//     latitude: string,
//     longitude: string,
//     picture: string
// ): Promise<City> => {
//     const cityValidator = new CityUpdateValidator();
//     cityValidator.id = id;
//     cityValidator.name = name && name.length > 0 ? name.trim() : '';
//     cityValidator.latitude = latitude && latitude.length > 0 ? latitude.trim() : '';
//     cityValidator.longitude = longitude && longitude.length > 0 ? longitude.trim() : '';
//     cityValidator.picture = picture && picture.length > 0 ? picture.trim() : '';
//     return await validateData(cityValidator);
// }