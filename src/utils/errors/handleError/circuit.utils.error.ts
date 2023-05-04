import { QueryFailedError } from "typeorm";
import { CircuitValidator } from "../../../validators/entities/circuit.validator.entity";
import { retrieveKeyFromDbErrorMessage } from "../../string.utils";
import { CustomError } from "../CustomError.utils.error";
import { ForbiddenError, NotFoundError, UnprocessableEntityError } from "../interfaces.utils.error";

export enum CircuitErrorsFlag {
    ID_NOT_FOUND = "ID_NOT_FOUND",
    NAME_NOT_FOUND = "NAME_NOT_FOUND",
    CITY_NOT_IN_DB = "CITY_NOT_IN_DB",
    NO_CIRCUITS_FOR_CITY = "NO_CIRCUITS_FOR_CITY",
    CATEGORY_NOT_IN_DB = "CATEGORY_NOT_IN_DB",
    POI_NOT_IN_DB = "POI_NOT_IN_DB",
    USER_NOT_AUTHORIZED_CREATE = "USER_NOT_AUTHORIZED_CREATE",
    USER_NOT_AUTHORIZED_UPDATE = "USER_NOT_AUTHORIZED_UPDATE",
    USER_NOT_AUTHORIZED_DELETE = "USER_NOT_AUTHORIZED_DELETE"
}

export const handleCircuitError = <T>(e: Error, data: T): void => {
    switch (e.message) {
        case CircuitErrorsFlag.ID_NOT_FOUND:
            throw new CustomError(
              new NotFoundError(), 
              `Le circuit n'existe pas en base de données`
            );
        case CircuitErrorsFlag.NAME_NOT_FOUND:
            throw new CustomError(
                new NotFoundError(), 
                `Le circuit avec le nom ${data} n'existe pas en base de données`
            ); 
        case CircuitErrorsFlag.CITY_NOT_IN_DB:
            throw new CustomError(
                new NotFoundError(), 
                `La ville n'existe pas en base de données`
            ); 
        case CircuitErrorsFlag.NO_CIRCUITS_FOR_CITY:
            throw new CustomError(
                new NotFoundError(), 
                `Cette ville ne contient pas encore de circuits`
            ); 
        case CircuitErrorsFlag.CATEGORY_NOT_IN_DB:
            throw new CustomError(
                new NotFoundError(), 
                `La catégory n'existe pas en base de données`
            ); 
        case CircuitErrorsFlag.POI_NOT_IN_DB:
            throw new CustomError(
                new NotFoundError(), 
                `Un ou plusieurs points d'intérêt n'existent pas en base de données`
            ); 
        case CircuitErrorsFlag.USER_NOT_AUTHORIZED_CREATE:
            throw new CustomError(
                new ForbiddenError(), 
                `Vous n'êtes pas autorisé à créer ce circuit`
            );
        case CircuitErrorsFlag.USER_NOT_AUTHORIZED_UPDATE:
            throw new CustomError(
                new ForbiddenError(), 
                `Vous n'êtes pas autorisé à effectuer une action sur ce circuit`
            );
        case CircuitErrorsFlag.USER_NOT_AUTHORIZED_DELETE:
            throw new CustomError(
                new ForbiddenError(), 
                `Vous n'êtes pas autorisé à supprimer ce circuit`
            );
    }
}

export const handleCircuitObjectError = (e: Error | QueryFailedError, data: CircuitValidator): void => {
    if (e instanceof QueryFailedError && e.driverError.detail?.length) {
        switch (retrieveKeyFromDbErrorMessage(e.driverError.detail)) {
            case "name":
                throw new CustomError(
                    new UnprocessableEntityError(),
                    `Le circuit ${data.name} est déjà utilisé, vous devez en choisir un autre`
                );
            case "picture":
                throw new CustomError(
                    new UnprocessableEntityError(), 
                    `L'image du circuit est déjà utilisée, vous devez en choisir une autre`
                );    
        }
    }
}