import { Min, MinLength, MaxLength, Matches, IsOptional } from "class-validator";
import { CityErrorValidator } from "../messages.validator";
import { validateData } from "../validate.validator";
import { CityType } from "../../utils/type/city.utils.type";
import { CustomError } from "../../utils/error/CustomError.utils.error";
import { BadRequestError } from "../../utils/error/interfaces.utils.error";


export class CityValidator {
    @IsOptional()
    @Min(1, {
        message: CityErrorValidator.ID_EQUAL_0
    })
    id: number
    
    @MinLength(1, {
        message: CityErrorValidator.NAME_TOO_SHORT,
    })
    @MaxLength(255, {
        message: CityErrorValidator.NAME_TOO_LONG
    })
    name: string
    
    @Matches(/^-?([0-8]?[0-9]|90)(\.[0-9]{1,})$/, {
        message: CityErrorValidator.LATITUDE_FORMAT
    })
    latitude!: string
    
    @Matches(/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,})$/, {
        message: CityErrorValidator.LONGITUDE_FORMAT
    })
    longitude!: string
    
    @MaxLength(255, {
        message: CityErrorValidator.PICTURE_TOO_LONG
    })
    picture: string
}


/**
 * Checks the validity of the city data during creation
 * @param {CityType} city the city  
 * @returns <CityValidator> the verified city
 * @throws Error: 400 Bad Request | 422 Unprocessable Entity
*/
export const validateCreationCityInput = async (
    city: CityType
): Promise<CityValidator> => {
    if (Object.keys(city).includes("id")) {
        throw new CustomError(new BadRequestError(), CityErrorValidator.ID_NOT_REQUIRED);
    }

    const cityValidator = new CityValidator();
    cityValidator.name = city.name && city.name.length > 0 ? city.name.trim() : '';
    cityValidator.latitude = city.latitude && city.latitude.length > 0 ? city.latitude.trim() : '';
    cityValidator.longitude = city.longitude && city.longitude.length > 0 ? city.longitude.trim() : '';
    cityValidator.picture = city.picture && city.picture.length > 0 ? city.picture.trim() : '';
    return await validateData(cityValidator);
}


/**
 * Checks the validity of the city data during update
 * @param {CityType} city the city  
 * @returns <CityValidator> the verified data 
 * @throws Error: 400 Bad Request | 422 Unprocessable Entity
*/
export const validateUpdateCityInput = async (
    city: CityType
): Promise<CityValidator> => {
    if (!Object.keys(city).includes("id")) {
        throw new CustomError(new BadRequestError(), CityErrorValidator.ID_REQUIRED);
    }
    
    const cityValidator = new CityValidator();
    cityValidator.id = city.id;
    cityValidator.name = city.name && city.name.length > 0 ? city.name.trim() : '';
    cityValidator.latitude = city.latitude && city.latitude.length > 0 ? city.latitude.trim() : '';
    cityValidator.longitude = city.longitude && city.longitude.length > 0 ? city.longitude.trim() : '';
    cityValidator.picture = city.picture && city.picture.length > 0 ? city.picture.trim() : '';
    return await validateData(cityValidator);
}