import { QueryFailedError } from "typeorm";
import { PoiValidator } from "../../../validators/entities/poi.validator.entity";
import { retrieveKeyFromDbErrorMessage } from "../../string.utils";
import { CustomError } from "../CustomError.utils.error";
import { ForbiddenError, NotFoundError, UnprocessableEntityError } from "../interfaces.utils.error";

export enum PoiErrorsFlag {
    ID_NOT_FOUND = "ID_NOT_FOUND",
    NAME_NOT_FOUND = "NAME_NOT_FOUND",
    LOCALISATION_ALREADY_USED = "LOCALISATION_ALREADY_USED",
    CITY_NOT_IN_DB = "CITY_NOT_IN_DB",
    NO_POIS_FOR_CITY = "NO_POIS_FOR_CITY",
    TYPE_NOT_IN_DB = "TYPE_NOT_IN_DB",
    TAG_NOT_IN_DB = "TAG_NOT_IN_DB",
    USER_NOT_AUTHORIZED_CREATE = "USER_NOT_AUTHORIZED_CREATE",
    USER_NOT_AUTHORIZED_UPDATE = "USER_NOT_AUTHORIZED_UPDATE",
    USER_NOT_AUTHORIZED_DELETE = "USER_NOT_AUTHORIZED_DELETE"
}

export const handlePoiError = <T>(e: Error, data: T): void => {
    switch (e.message) {
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
        case PoiErrorsFlag.CITY_NOT_IN_DB:
            throw new CustomError(
                new NotFoundError(), 
                `La ville n'existe pas en base de données`
            );
        case PoiErrorsFlag.NO_POIS_FOR_CITY:
            throw new CustomError(
                new NotFoundError(), 
                `Cette ville ne contient pas encore de points d'intérêt`
            );
        case PoiErrorsFlag.TYPE_NOT_IN_DB:
            throw new CustomError(
                new NotFoundError(), 
                `Le type n'existe pas en base de données`
            );
        case PoiErrorsFlag.TAG_NOT_IN_DB:
            throw new CustomError(
                new NotFoundError(), 
                `Un ou plusieurs tags n'existent pas en base de données`
            );
        case PoiErrorsFlag.USER_NOT_AUTHORIZED_CREATE:
            throw new CustomError(
                new ForbiddenError(), 
                `Vous n'êtes pas autorisé à créer ce point d'intérêt`
            );
        case PoiErrorsFlag.USER_NOT_AUTHORIZED_UPDATE:
            throw new CustomError(
                new ForbiddenError(), 
                `Vous n'êtes pas autorisé à effectuer des actions sur ce point d'intérêt`
            );
        case PoiErrorsFlag.USER_NOT_AUTHORIZED_DELETE:
            throw new CustomError(
                new ForbiddenError(), 
                `Vous n'êtes pas autorisé à supprimer ce point d'intérêt`
            );
    }
}

export const handlePoiObjectError = (e: Error | QueryFailedError, data: PoiValidator): void => {
    if (e instanceof Error && e.message === PoiErrorsFlag.LOCALISATION_ALREADY_USED) {             
        throw new CustomError(
            new UnprocessableEntityError(), 
            `Le point d'intêret avec la latitude ${data.latitude} et la longitude ${data.longitude} existe déjà en base de données`
        );
    }

    if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      switch (retrieveKeyFromDbErrorMessage(e.driverError.detail)) {
        case "name":
          throw new CustomError(
            new UnprocessableEntityError(),
            `Le nom ${data.name} est déjà utilisé, vous devez en choisir un autre`
          );
        case "address":
            throw new CustomError(
                new UnprocessableEntityError(), 
                `L'adresse ${data.address} est déjà utilisée, vous devez en choisir une autre`
            );
        case "picture":
            throw new CustomError(
                new UnprocessableEntityError(), 
                `L'image choisie pour le point d'intérêt est déjà utilisée, vous devez en choisir une autre`
            );
      }
    }
}
