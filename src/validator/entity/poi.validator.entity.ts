import { Min, MinLength, MaxLength, Matches, IsOptional } from "class-validator";
import { PoiErrorValidator } from "../messages.validator";
import { validateData } from "../validate.validator";
import { CityValidator } from "./city.validator.entity";
import { TypeValidator } from "./type.validator.entity";
import { PoiType } from "../../utils/type/poi.utils.type";
import { CustomError } from "../../utils/error/CustomError.utils.error";
import { BadRequestError } from "../../utils/error/interfaces.utils.error";


export class PoiValidator {
    @IsOptional()
    @Min(1, {
        message: PoiErrorValidator.ID_EQUAL_0
    })
    id: number

    @MinLength(1, {
        message: PoiErrorValidator.NAME_TOO_SHORT,
    })
    @MaxLength(255, {
        message: PoiErrorValidator.NAME_TOO_LONG
    })
    name: string
    
    @MinLength(1, {
        message: PoiErrorValidator.ADDRESS_TOO_SHORT,
    })
    @MaxLength(255, {
        message: PoiErrorValidator.ADDRESS_TOO_LONG
    })
    address: string
    
    @Matches(/^-?([0-8]?[0-9]|90)(\.[0-9]{1,})$/, {
        message: PoiErrorValidator.LATITUDE_FORMAT
    })
    latitude!: string
    
    @Matches(/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,})$/, {
        message: PoiErrorValidator.LONGITUDE_FORMAT
    })
    longitude!: string
    
    @MaxLength(255, {
        message: PoiErrorValidator.PICTURE_TOO_LONG
    })
    picture: string
    
    city: CityValidator
    
    type: TypeValidator
}


/**
 * Checks the validity of the poi data during creation
 * @param {PoiType} poi the poi to check before creation
 * @returns <PoiValidator> the verified poi | throw error 422 Unprocessable Entity
*/
export const validateCreationPoiInput = async (
    poi: PoiType
): Promise<PoiValidator> => {
    if (Object.keys(poi).includes("id")) {
        throw new CustomError(new BadRequestError(), PoiErrorValidator.ID_NOT_REQUIRED);
    }
    const { name, address, latitude, longitude, picture, city, type } = poi;
    const poiValidator = new PoiValidator();
    poiValidator.name = name && name.length > 0 ? name.trim() : '';
    poiValidator.address = address && address.length > 0 ? address.trim() : '';
    poiValidator.latitude = latitude && latitude.length > 0 ? latitude.trim() : '';
    poiValidator.longitude = longitude && longitude.length > 0 ? longitude.trim() : '';
    poiValidator.picture = picture && picture.length > 0 ? picture.trim() : '';
    await validateData(poiValidator);

    const cityValidator = new CityValidator();
    cityValidator.id = city.id;
    cityValidator.name = city.name;
    cityValidator.latitude = city.latitude;
    cityValidator.longitude = city.longitude;
    cityValidator.picture = city.picture;
    const verifiedCity = await validateData(cityValidator);
    poiValidator.city = verifiedCity;

    const typeValidator = new TypeValidator();
    typeValidator.id = type.id;
    typeValidator.name = type.name;
    typeValidator.logo = type.logo;
    typeValidator.color = type.color;
    const verifiedType = await validateData(typeValidator);
    poiValidator.type = verifiedType;
    
    return poiValidator;
}


/**
 * Checks the validity of the Poi data during update
 * @param {PoiType} poi the poi to check before update
 * @returns <City> the verified data | throw error 422 Unprocessable Entity
*/
export const validateUpdatePoiInput = async (
    poi: PoiType
): Promise<PoiValidator> => {
    if (!Object.keys(poi).includes("id")) {
        throw new CustomError(new BadRequestError(), PoiErrorValidator.ID_REQUIRED);
    }

    const { name, address, latitude, longitude, picture, city, type } = poi;
    const poiValidator = new PoiValidator();
    poiValidator.id = poi.id;
    poiValidator.name = name && name.length > 0 ? name.trim() : '';
    poiValidator.address = address && address.length > 0 ? address.trim() : '';
    poiValidator.latitude = latitude && latitude.length > 0 ? latitude.trim() : '';
    poiValidator.longitude = longitude && longitude.length > 0 ? longitude.trim() : '';
    poiValidator.picture = picture && picture.length > 0 ? picture.trim() : '';
    await validateData(poiValidator);

    const cityValidator = new CityValidator();
    cityValidator.id = city.id;
    cityValidator.name = city.name;
    cityValidator.latitude = city.latitude;
    cityValidator.longitude = city.longitude;
    cityValidator.picture = city.picture;
    const verifiedCity = await validateData(cityValidator);
    poiValidator.city = verifiedCity;

    const typeValidator = new TypeValidator();
    typeValidator.id = type.id;
    typeValidator.name = type.name;
    typeValidator.logo = type.logo;
    typeValidator.color = type.color;
    const verifiedType = await validateData(typeValidator);
    poiValidator.type = verifiedType;
    
    return poiValidator;
}