import { QueryFailedError } from "typeorm";
import { CircuitValidator } from "../../../validators/entities/circuit.validator.entity";
import { retrieveKeyFromDbErrorMessage } from "../../string.utils";
import { CustomError } from "../CustomError.utils.error";
import { NotFoundError, UnprocessableEntityError } from "../interfaces.utils.error";

export enum CircuitErrorsFlag {
    ID_NOT_FOUND = "ID_NOT_FOUND",
    NAME_NOT_FOUND = "NAME_NOT_FOUND",
    CITY_NOT_IN_DB = "CITY_NOT_IN_DB",
    CATEGORY_NOT_IN_DB = "CATEGORY_NOT_IN_DB",
    POI_NOT_IN_DB = "POI_NOT_IN_DB"
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
        
    }
}

export const handleCircuitObjectError = (e: Error | QueryFailedError, data: CircuitValidator): void => {
    if (e instanceof Error && e.message === CircuitErrorsFlag.ID_NOT_FOUND) {
        throw new CustomError(
            new NotFoundError(),
            `Le circuit n'existe pas en base de données`
        );
    }

    if (e instanceof Error && e.message === CircuitErrorsFlag.CITY_NOT_IN_DB) {
        throw new CustomError(
            new NotFoundError(),
            `La ville ${data.city.name} n'existe pas en base de données`        
        );
    }

    if (e instanceof Error && e.message === CircuitErrorsFlag.CATEGORY_NOT_IN_DB) {
        throw new CustomError(
            new NotFoundError(),
            `La catégorie ${data.category.name} n'existe pas en base de données`        
        );
    }     
        
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

export const handleCircuitPoiObjectError = (e: Error, poiName: string): void => {
    if (e.message === CircuitErrorsFlag.POI_NOT_IN_DB) {
        throw new CustomError(
            new NotFoundError(), 
            `Le point d'intérêt ${poiName} n'existe pas en base de données`
        );
    }         
}