import City from "../../../entity/City.entity";
import { CityValidator } from "../../../validator/entity/city.validator.entity";
import { CustomError } from "../CustomError.utils.error";
import { NotFoundError, UnprocessableEntityError } from "../interfaces.utils.error";

export enum CityErrorsFlag {
    ID_NOT_FOUND = "GET_BY_ID",
    NAME_NOT_FOUND = "GET_BY_NAME",
    NAME_ALREADY_USED = "NAME_ALREADY_USED",
    LOCALISATION_ALREADY_USED = "LOCALISATION_ALREADY_USED",
    PICTURE_ALREADY_USED = "PICTURE_ALREADY_USED",
    USER_NOT_IN_DB = "USER_NOT_IN_DB"
}

export const handleCityError = <T>(flag: string, data: T): void => {    
    switch (flag) {
        case CityErrorsFlag.ID_NOT_FOUND:
            throw new CustomError(
              new NotFoundError(), 
              `La ville n'existe pas en base de données`
            );
        case CityErrorsFlag.NAME_NOT_FOUND:
            throw new CustomError(
                new NotFoundError(), 
                `La ville avec le nom ${data} n'existe pas en base de données`
            ); 
        case CityErrorsFlag.NAME_ALREADY_USED:
            throw new CustomError(
                new UnprocessableEntityError(), 
                `Le nom de ville ${data} est déjà utilisé, vous devez en choisir un autre`
            );
        case CityErrorsFlag.LOCALISATION_ALREADY_USED:            
            if (data instanceof CityValidator || data instanceof City) {
                throw new CustomError(
                    new UnprocessableEntityError(), 
                    `La ville avec la latitude ${data.latitude} et la longitude ${data.longitude} existe déjà en base de données`
                );
            }
        case CityErrorsFlag.PICTURE_ALREADY_USED:            
            throw new CustomError(
                new UnprocessableEntityError(), 
                `L'image avec l'url' ${data} existe déjà en base de données`
            );
        case CityErrorsFlag.USER_NOT_IN_DB:            
        throw new CustomError(
            new NotFoundError(), 
            `L'utilisateur ${data} n'existe pas en base de données`
        );
    }
}