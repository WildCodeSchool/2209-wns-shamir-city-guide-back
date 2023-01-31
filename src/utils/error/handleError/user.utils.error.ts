import { CustomError } from "../CustomError.utils.error";
import {
  NotFoundError,
  UnprocessableEntityError,
} from "../interfaces.utils.error";

export enum UserErrorsFlag {
  ID_NOT_FOUND = "ID_NOT_FOUND",
  USERNAME_NOT_FOUND = "USERNAME_NOT_FOUND",
  USERNAME_ALREADY_USED = "USERNAME_ALREADY_USED",
  EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND",
  EMAIL_ALREADY_USED = "EMAIL_ALREADY_USED",
  ROLE_NOT_IN_DB = "ROLE_NOT_IN_DB"
}

export const handleUserError = <T>(flag: string, data: T): void => {
  switch (flag) {
    case UserErrorsFlag.ID_NOT_FOUND:
      throw new CustomError(
        new NotFoundError(),
        `L'utilisateur n'existe pas en base de données`
      );
    case UserErrorsFlag.USERNAME_NOT_FOUND:
      throw new CustomError(
        new NotFoundError(),
        `L'utilisateur avec le nom ${data} n'existe pas en base de données`
      );
    case UserErrorsFlag.USERNAME_ALREADY_USED:
      throw new CustomError(
        new UnprocessableEntityError(),
        `Le nom ${data} est déjà utilisé, vous devez en choisir un autre`
      );
    case UserErrorsFlag.EMAIL_NOT_FOUND:
      throw new CustomError(
        new NotFoundError(),
        `L'utilisateur avec l'email ${data} n'existe pas en base de données`
      );
    case UserErrorsFlag.EMAIL_ALREADY_USED:
      throw new CustomError(
        new UnprocessableEntityError(),
        `L'email ${data} est déjà utilisé, vous devez en choisir un autre`
      );
    case UserErrorsFlag.ROLE_NOT_IN_DB:
    throw new CustomError(
      new NotFoundError(),
      `Le role ${data} n'existe pas en base de données`
    );
  }
};
