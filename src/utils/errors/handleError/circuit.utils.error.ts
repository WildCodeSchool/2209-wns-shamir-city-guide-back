import Circuit from "../../../entities/Circuit.entity";
import { CircuitValidator } from "../../../validators/entities/circuit.validator.entity";
import { CustomError } from "../CustomError.utils.error";
import { NotFoundError, UnprocessableEntityError } from "../interfaces.utils.error";

export enum CircuitErrorsFlag {
    ID_NOT_FOUND = "GET_BY_ID",
    NAME_NOT_FOUND = "GET_BY_NAME",
    NAME_ALREADY_USED = "NAME_ALREADY_USED",
    PICTURE_ALREADY_USER = "PICTURE_ALREADY_USER",
    CITY_NOT_IN_DB = "CITY_NOT_IN_DB",
    CATEGORY_NOT_IN_DB = "CATEGORY_NOT_IN_DB",
    POI_NOT_IN_DB = "POI_NOT_IN_DB"
}

export const handleCircuitError = <T>(flag: string, data: T): void => {
    switch (flag) {
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
        case CircuitErrorsFlag.NAME_ALREADY_USED:
            throw new CustomError(
                new UnprocessableEntityError(), 
                `Le circuit ${data} est déjà utilisé, vous devez en choisir un autre`
            );
        case CircuitErrorsFlag.PICTURE_ALREADY_USER:
            throw new CustomError(
                new UnprocessableEntityError(), 
                `L'image ${data} est déjà utilisée, vous devez en choisir une autre`
            );
        case CircuitErrorsFlag.CITY_NOT_IN_DB:            
        if (data instanceof CircuitValidator || data instanceof Circuit) {
            throw new CustomError(
                new UnprocessableEntityError(), 
                `La ville ${data.city.name} avec l'id ${data.city.id} n'existe pas en base de données`
            );
        }
        case CircuitErrorsFlag.CATEGORY_NOT_IN_DB:            
        if (data instanceof CircuitValidator || data instanceof Circuit) {
            throw new CustomError(
                new UnprocessableEntityError(), 
                `La catégorie ${data.category.name} avec l'id ${data.category.id} n'existe pas en base de données`
            );
        }
        case CircuitErrorsFlag.POI_NOT_IN_DB:            
        throw new CustomError(
            new NotFoundError(), 
            `Le point d'intérêt ${data} n'existe pas en base de données`
        );
    }
}