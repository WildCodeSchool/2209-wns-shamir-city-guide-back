import Poi from "../../../entity/PointOfInterest.entity";
import { PoiValidator } from "../../../validator/entity/poi.validator.entity";
import { CustomError } from "../CustomError.utils.error";
import { NotFoundError, UnprocessableEntityError } from "../interfaces.utils.error";

export enum PoiErrorsFlag {
    ID_NOT_FOUND = "GET_BY_ID",
    NAME_NOT_FOUND = "GET_BY_NAME",
    NAME_ALREADY_USED = "NAME_ALREADY_USED",
    ADDRESS_ALREADY_USED = "ADDRESS_ALREADY_USED",
    LOCALISATION_ALREADY_USED = "LOCALISATION_ALREADY_USED",
    PICTURE_ALREADY_USER = "PICTURE_ALREADY_USER",
    CITY_NOT_IN_DB = "CITY_NOT_IN_DB",
    TYPE_NOT_IN_DB = "TYPE_NOT_IN_DB"
}

export const handlePoiError = <T>(flag: string, data: T): void => {
    switch (flag) {
        case PoiErrorsFlag.ID_NOT_FOUND:
            throw new CustomError(
              new NotFoundError(), 
              `Le point d'intêret n'existe pas en base de données`
            );
        case PoiErrorsFlag.NAME_NOT_FOUND:
            throw new CustomError(
                new NotFoundError(), 
                `Le point d'intêret avec le nom ${data} n'existe pas en base de données`
            ); 
        case PoiErrorsFlag.NAME_ALREADY_USED:
            throw new CustomError(
                new UnprocessableEntityError(), 
                `Le point d'intêret ${data} est déjà utilisé, vous devez en choisir un autre`
            );
        case PoiErrorsFlag.ADDRESS_ALREADY_USED:
            throw new CustomError(
                new UnprocessableEntityError(), 
                `L'adresse ${data} est déjà utilisée, vous devez en choisir une autre`
            );
        case PoiErrorsFlag.PICTURE_ALREADY_USER:
            throw new CustomError(
                new UnprocessableEntityError(), 
                `L'image ${data} est déjà utilisée, vous devez en choisir une autre`
            );
        case PoiErrorsFlag.LOCALISATION_ALREADY_USED:            
            if (
                data instanceof PoiValidator || data instanceof Poi) {
                throw new CustomError(
                    new UnprocessableEntityError(), 
                    `Le point d'intêret avec la latitude ${data.latitude} et la longitude ${data.longitude} existe déjà en base de données`
                );
            }
        case PoiErrorsFlag.CITY_NOT_IN_DB:            
        if (data instanceof PoiValidator || data instanceof Poi) {
            throw new CustomError(
                new UnprocessableEntityError(), 
                `La ville ${data.city.name} avec l'id ${data.city.id} n'existe pas en base de données`
            );
        }
        case PoiErrorsFlag.TYPE_NOT_IN_DB:            
        if (data instanceof PoiValidator || data instanceof Poi) {
            throw new CustomError(
                new UnprocessableEntityError(), 
                `Le type ${data.type.name} avec l'id ${data.type.id} n'existe pas en base de données`
            );
        }
    }
}