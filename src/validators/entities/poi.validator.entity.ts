import {
  Min,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from "class-validator";
import { PoiErrorValidator } from "../messages.validator";
import { validateData } from "../validate.validator";
import { PoiType } from "../../types/poi.type";
import { CustomError } from "../../utils/errors/CustomError.utils.error";
import {
  BadRequestError,
  UnprocessableEntityError,
} from "../../utils/errors/interfaces.utils.error";
import { IdValidator } from "../common.validator";


export class PoiValidator {
  @IsOptional()
  @Min(1, {
    message: PoiErrorValidator.ID_EQUAL_0,
  })
  id: number;

  @MinLength(1, {
    message: PoiErrorValidator.NAME_TOO_SHORT,
  })
  @MaxLength(255, {
    message: PoiErrorValidator.NAME_TOO_LONG,
  })
  name: string;

  @MinLength(1, {
    message: PoiErrorValidator.ADDRESS_TOO_SHORT,
  })
  @MaxLength(255, {
    message: PoiErrorValidator.ADDRESS_TOO_LONG,
  })
  address: string;

  @Matches(/^-?([0-8]?[0-9]|90)(\.[0-9]{1,})$/, {
    message: PoiErrorValidator.LATITUDE_FORMAT,
  })
  latitude!: string;

  @Matches(/^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,})$/, {
    message: PoiErrorValidator.LONGITUDE_FORMAT,
  })
  longitude!: string;

  @Matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, {
    message: PoiErrorValidator.PICTURE_WRONG_FORMAT,
  })
  picture: string;
  
  @Min(1, {
    message: PoiErrorValidator.CITY_ID_EQUAL_0,
  })
  cityId: number;

  @Min(1, {
    message: PoiErrorValidator.TYPE_ID_EQUAL_0,
  })
  typeId: number;

  @IsOptional()
  tags: number[];
}

const validateIdArray = async (arr: number[]): Promise<IdValidator[]> => {
  let returnedIds: IdValidator[] = [];
  for (let i = 0; i < arr.length; i++) {
    const idValidator = new IdValidator();
    if (arr[i]) idValidator.id = arr[i];
    const verifiedId = await validateData(idValidator);

    if (verifiedId) returnedIds.push(verifiedId);
    else
      throw new CustomError(
        new UnprocessableEntityError(),
        "Un ou plusieurs identifiants ne sont pas dans le bon format"
      );

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i]=== arr[j]) {
        throw new CustomError(
          new UnprocessableEntityError(),
          "Un point d'intérêt ne peut pas contenir deux fois le même tag"
        );
      }
    }
  }
  return returnedIds;
};

/**
 * Checks the validity of the poi data during creation
 * @param {PoiType} poi the poi to check before creation
 * @returns <PoiValidator> the verified poi
 * @throws Error: 400 Bad Request | 422 Unprocessable Entity
 */
export const validateCreationPoiInput = async (
  poi: PoiType
): Promise<PoiValidator> => {
  if (Object.keys(poi).includes("id")) {
    throw new CustomError(
      new BadRequestError(),
      PoiErrorValidator.ID_NOT_REQUIRED
    );
  }

  if (!Object.keys(poi).includes("cityId")) {
    throw new CustomError(
      new BadRequestError(),
      PoiErrorValidator.CITY_REQUIRED
    );
  }

  return setPoiValidator(poi);
};

/**
 * Checks the validity of the Poi data during update
 * @param {PoiType} poi the poi to check before update
 * @returns <City> the verified data
 * @throws Error: 400 Bad Request | 422 Unprocessable Entity
 */
export const validateUpdatePoiInput = async (
  poi: PoiType
): Promise<PoiValidator> => {
  if (!Object.keys(poi).includes("id")) {
    throw new CustomError(new BadRequestError(), PoiErrorValidator.ID_REQUIRED);
  }

  return setPoiValidator(poi);
};

export const setPoiValidator = async (poi: PoiType): Promise<PoiValidator> => {
  let id = null;
  if (poi.id !== null) id = poi.id;
  const { 
    name, 
    address, 
    latitude, 
    longitude, 
    picture, 
    cityId, 
    typeId 
  } = poi;
  
  const poiValidator = new PoiValidator();
  if (id !== null && id !== undefined) poiValidator.id = id;
  
  poiValidator.name = name && name.length > 0 ? name.trim() : "";
  poiValidator.address = address && address.length > 0 ? address.trim() : "";
  poiValidator.latitude = latitude && latitude.length > 0 ? latitude.trim() : "";
  poiValidator.longitude = longitude && longitude.length > 0 ? longitude.trim() : "";
  poiValidator.picture = picture && picture.length > 0 ? picture.trim() : "";
  poiValidator.cityId = cityId;
  poiValidator.typeId = typeId;

  await validateData(poiValidator);
  

  if (poi.tags !== null && poi.tags !== undefined && poi.tags.length > 0) {
    await validateIdArray(poi.tags);
    poiValidator.tags = poi.tags;
  } else poiValidator.tags = [];

  return await validateData(poiValidator);
}
