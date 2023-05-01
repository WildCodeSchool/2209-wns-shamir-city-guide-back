import { QueryFailedError } from "typeorm";
import { CityValidator } from "../../../validators/entities/city.validator.entity";
import { retrieveKeyFromDbErrorMessage } from "../../string.utils";
import { CustomError } from "../CustomError.utils.error";
import { NotFoundError, UnprocessableEntityError } from "../interfaces.utils.error";

export enum CityErrorsFlag {
    ID_NOT_FOUND = "ID_NOT_FOUND",
    NAME_NOT_FOUND = "NAME_NOT_FOUND",
    NAME_ALREADY_USED = "NAME_ALREADY_USED",
    LOCALISATION_ALREADY_USED = "LOCALISATION_ALREADY_USED",
    PICTURE_ALREADY_USED = "PICTURE_ALREADY_USED",
    USER_NOT_IN_DB = "USER_NOT_IN_DB",
    USERNAME_NOT_FOUND = "USERNAME_NOT_FOUND",
}


export const handleCityError = <T>(e: Error, data: T): void => {
    switch (e.message) {
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
        case CityErrorsFlag.USERNAME_NOT_FOUND:
            throw new CustomError(
                new NotFoundError(),
                `Il n'y a pas de villes reliés à l'utilisateur en base de données`
            );
    }
}

export const handleCityObjectError = (e: Error | QueryFailedError, data: CityValidator): void => {
    if (e instanceof Error && e.message === CityErrorsFlag.ID_NOT_FOUND) {
        throw new CustomError(
        new NotFoundError(),
        `La ville n'existe pas en base de données`
        );
    }

    if (e instanceof Error && e.message === CityErrorsFlag.LOCALISATION_ALREADY_USED) {
        throw new CustomError(
            new UnprocessableEntityError(), 
            `La ville avec la latitude ${data.latitude} et la longitude ${data.longitude} existe déjà en base de données`
        );
    }
            
    if (e instanceof QueryFailedError && e.driverError.detail?.length) {
        switch (retrieveKeyFromDbErrorMessage(e.driverError.detail)) {
        case "name":
            throw new CustomError(
                new UnprocessableEntityError(), 
                `Le nom de ville ${data.name} est déjà utilisé, vous devez en choisir un autre`
            );
        case "picture":            
            throw new CustomError(
                new UnprocessableEntityError(), 
                `L'image choisie pour la ville existe déjà en base de données`
            );
        case "user_id":            
            throw new CustomError(
                new NotFoundError(), 
                `L'utilisateur ${data.user.username} n'existe pas en base de données`
            );
        }
    }
  }