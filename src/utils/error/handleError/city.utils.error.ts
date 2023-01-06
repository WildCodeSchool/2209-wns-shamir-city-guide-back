import City from "../../../entity/City.entity";
import { CityCreationValidator, CityUpdateValidator } from "../../../validator/entity/city.validator.entity";
import { CustomError } from "../CustomError.utils.error";
import { NotFoundError, UnprocessableEntityError } from "../interfaces.utils.error";

export enum CityErrorsFlag {
    ID_NOT_FOUND = "GET_BY_ID",
    NAME_NOT_FOUND = "GET_BY_NAME",
    NAME_ALREADY_USED = "NAME_ALREADY_USED",
    LOCALISATION_ALREADY_USED = "LOCALISATION_ALREADY_USED",
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
            if (
                data instanceof CityCreationValidator || 
                data instanceof CityUpdateValidator ||
                data instanceof City
                ) {
                throw new CustomError(
                    new UnprocessableEntityError(), 
                    `La ville avec la latitude ${data.latitude} et la longitude ${data.longitude} exist déjà en base de données`
                );
            }
    }
}