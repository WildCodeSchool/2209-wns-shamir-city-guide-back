import { Min, MinLength, MaxLength, Matches, IsOptional } from "class-validator";
import { CityErrorValidator } from "../messages.validator";
import { validateData } from "../validate.validator";
import { CityType } from "../../types/city.type";
import { CustomError } from "../../utils/errors/CustomError.utils.error";
import { BadRequestError } from "../../utils/errors/interfaces.utils.error";
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

    @Min(1, {
        message: CityErrorValidator.USER_ID_EQUAL_0,
    })
    userId: number;
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

    if (!Object.keys(city).includes("userId")) {
        throw new CustomError(new BadRequestError(), CityErrorValidator.USER_REQUIRED);
    }

    return setCityValidator(city);
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

    if (!Object.keys(city).includes("userId")) {
        throw new CustomError(new BadRequestError(), CityErrorValidator.USER_REQUIRED);
    }

    return setCityValidator(city);
}

const setCityValidator = async (city: CityType): Promise<CityValidator> => {
    let id = null;
    if (city.id !== null) id = city.id;
    const { name, latitude, longitude, picture, userId } = city;
    
    const cityValidator = new CityValidator();
    if (id !== null) cityValidator.id = id;
    cityValidator.name = name && name.length > 0 ? name.trim() : "";
    cityValidator.latitude = latitude && latitude.length > 0 ? latitude.trim() : "";
    cityValidator.longitude = longitude && longitude.length > 0 ? longitude.trim() : "";
    cityValidator.picture = picture && picture.length > 0 ? picture.trim() : "";
    
    cityValidator.userId = userId;
  
    return await validateData(cityValidator);
  }