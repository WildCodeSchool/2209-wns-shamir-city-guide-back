import { CustomError } from "../CustomError.utils.error";
import { NotFoundError, UnprocessableEntityError } from "../interfaces.utils.error";

export enum TagErrorsFlag {
    ID_NOT_FOUND = "GET_BY_ID",
    NAME_NOT_FOUND = "GET_BY_NAME",
    NAME_ALREADY_USED = "NAME_ALREADY_USED"
}

export const handleTagError = <T>(flag: string, data: T): void => {
    switch (flag) {
        case TagErrorsFlag.ID_NOT_FOUND:
            throw new CustomError(
              new NotFoundError(), 
              `Le tag avec l'id ${data} n'existe pas en base de données`
            );
        case TagErrorsFlag.NAME_NOT_FOUND:
            throw new CustomError(
                new NotFoundError(), 
                `Le tag avec le nom ${data} n'existe pas en base de données`
            ); 
        case TagErrorsFlag.NAME_ALREADY_USED:
            throw new CustomError(
                new UnprocessableEntityError(), 
                `Le nom ${data} est déjà utilisé, vous devez en choisir un autre`
            );
    }
}