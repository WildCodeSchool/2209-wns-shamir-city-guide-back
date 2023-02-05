import { QueryFailedError } from "typeorm";
import { TypeValidator } from "../../../validators/entities/type.validator.entity";
import { retrieveKeyFromDbErrorMessage } from "../../string.utils";
import { CustomError } from "../CustomError.utils.error";
import {
  NotFoundError,
  UnprocessableEntityError,
} from "../interfaces.utils.error";

export enum TypeErrorsFlag {
  ID_NOT_FOUND = "ID_NOT_FOUND",
  NAME_NOT_FOUND = "NAME_NOT_FOUND"
}


export const handleTypeError = <T>(e: Error, data: T): void => {
  switch (e.message) {
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
  }
}

export const handleTypeObjectError = (e: Error | QueryFailedError, data: TypeValidator): void => {
  if (e instanceof Error && e.message === TypeErrorsFlag.ID_NOT_FOUND) {
    throw new CustomError(
      new NotFoundError(),
      `Le type n'existe pas en base de données`
    );
  }

  if (e instanceof QueryFailedError && e.driverError.detail?.length) {
    switch (retrieveKeyFromDbErrorMessage(e.driverError.detail)) {
      case "name":
        throw new CustomError(
          new UnprocessableEntityError(),
          `Le nom ${data.name} est déjà utilisé, vous devez en choisir un autre`
        );
      case "logo":
        throw new CustomError(
          new UnprocessableEntityError(),
          `Le logo ${data.logo} est déjà utilisé, vous devez en choisir un autre`
        );
      case "color":
        throw new CustomError(
          new UnprocessableEntityError(),
          `La couleur ${data.color} est déjà utilisée, vous devez en choisir une autre`
        );
    }
  }
}
