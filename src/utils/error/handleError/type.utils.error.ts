import { CustomError } from "../CustomError.utils.error";
import { NotFoundError, UnprocessableEntityError } from "../interfaces.utils.error";

export enum TypeErrorsFlag {
    ID_NOT_FOUND = "GET_BY_ID",
    NAME_NOT_FOUND = "GET_BY_NAME",
    NAME_ALREADY_USED = "NAME_ALREADY_USED",
    LOGO_ALREADY_USED = "LOGO_ALREADY_USED",
    COLOR_ALREADY_USED = "COLOR_ALREADY_USED"
}

export const handleTypeError = <T>(flag: string, data: T): void => {
    switch (flag) {
        case TypeErrorsFlag.ID_NOT_FOUND:
            throw new CustomError(
              new NotFoundError(), 
              `Le type n'existe pas en base de données`
            );
        case TypeErrorsFlag.NAME_NOT_FOUND:
            throw new CustomError(
                new NotFoundError(), 
                `Le type avec le nom ${data} n'existe pas en base de données`
            ); 
        case TypeErrorsFlag.NAME_ALREADY_USED:
            throw new CustomError(
                new UnprocessableEntityError(), 
                `Le nom ${data} est déjà utilisé, vous devez en choisir un autre`
            );
        case TypeErrorsFlag.LOGO_ALREADY_USED:
            throw new CustomError(
                new UnprocessableEntityError(), 
                `Un type possède déjà ce nom de logo, vous devez en choisir une autre`
            );
        case TypeErrorsFlag.COLOR_ALREADY_USED:
            throw new CustomError(
                new UnprocessableEntityError(), 
                `Un type possède déjà cette couleur, vous devez en choisir une autre`
            );
    }
}