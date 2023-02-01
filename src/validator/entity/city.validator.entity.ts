import { Min, MinLength, MaxLength, Matches, IsOptional } from "class-validator";
import { CityErrorValidator } from "../messages.validator";
import { validateData } from "../validate.validator";
import { CityType } from "../../utils/type/city.utils.type";
import { CustomError } from "../../utils/error/CustomError.utils.error";
import { BadRequestError } from "../../utils/error/interfaces.utils.error";
import { UserValidator } from "./user.validator.entity";


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
    
    @Matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, {
        message: CityErrorValidator.PICTURE_WRONG_FORMAT
    })
    picture: string

    user: UserValidator;
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

    if (!Object.keys(city).includes("user")) {
        throw new CustomError(new BadRequestError(), CityErrorValidator.USER_REQUIRED);
    }
    const { name, latitude, longitude, picture, user } = city;
    
    const cityValidator = new CityValidator();
    cityValidator.name = name && name.length > 0 ? name.trim() : '';
    cityValidator.latitude = latitude && latitude.length > 0 ? latitude.trim() : '';
    cityValidator.longitude = longitude && longitude.length > 0 ? longitude.trim() : '';
    cityValidator.picture = picture && picture.length > 0 ? picture.trim() : '';
    await validateData(cityValidator);

    const userValidator = new UserValidator();
    userValidator.id = user.id;
    userValidator.username = user.username;
    userValidator.email = user.email;
    
    const verifiedUser = await validateData(userValidator);
    cityValidator.user = verifiedUser;

    return cityValidator;
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

    if (!Object.keys(city).includes("user")) {
        throw new CustomError(new BadRequestError(), CityErrorValidator.USER_REQUIRED);
    }

    const { id, name, latitude, longitude, picture, user } = city;
    
    const cityValidator = new CityValidator();
    cityValidator.id = id;
    cityValidator.name = name && name.length > 0 ? name.trim() : '';
    cityValidator.latitude = latitude && latitude.length > 0 ? latitude.trim() : '';
    cityValidator.longitude = longitude && longitude.length > 0 ? longitude.trim() : '';
    cityValidator.picture = picture && picture.length > 0 ? picture.trim() : '';
    await validateData(cityValidator);

    const userValidator = new UserValidator();
    userValidator.id = user.id;
    userValidator.username = user.username;
    userValidator.email = user.email;
    const verifiedUser = await validateData(userValidator);
    cityValidator.user = verifiedUser;

    return cityValidator;
}