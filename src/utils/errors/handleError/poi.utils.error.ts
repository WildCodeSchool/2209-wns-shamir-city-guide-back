import { QueryFailedError } from "typeorm";
import { PoiValidator } from "../../../validators/entities/poi.validator.entity";
import { retrieveKeyFromDbErrorMessage } from "../../string.utils";
import { CustomError } from "../CustomError.utils.error";
import { NotFoundError, UnprocessableEntityError } from "../interfaces.utils.error";

export enum PoiErrorsFlag {
    ID_NOT_FOUND = "ID_NOT_FOUND",
    NAME_NOT_FOUND = "NAME_NOT_FOUND",
    LOCALISATION_ALREADY_USED = "LOCALISATION_ALREADY_USED",
    TAG_NOT_IN_DB = "TAG_NOT_IN_DB"
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
    }
}

export const handlePoiObjectError = (e: Error | QueryFailedError, data: PoiValidator): void => {
    if (e instanceof Error && e.message === PoiErrorsFlag.ID_NOT_FOUND) {
      throw new CustomError(
        new NotFoundError(),
        `Le point d'intêret n'existe pas en base de données`
      );
    }

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
        case "city_id":            
            throw new CustomError(
                new UnprocessableEntityError(), 
                `La ville ${data.city.name} n'existe pas en base de données`
            );
        case "type_id":            
            throw new CustomError(
                new UnprocessableEntityError(), 
                `Le type ${data.type.name} n'existe pas en base de données`
            );
      }
    }
}

export const handlePoiTagObjectError = (e: Error, tagName: string): void => {
    if (e.message === PoiErrorsFlag.TAG_NOT_IN_DB) {
        throw new CustomError(
            new NotFoundError(), 
            `Le tag ${tagName} n'existe pas en base de données`
        );
    }         
}