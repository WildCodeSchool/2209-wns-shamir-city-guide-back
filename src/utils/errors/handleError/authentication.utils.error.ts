import { QueryFailedError } from "typeorm";
import { UserValidator } from "../../../validators/entities/user.validator.entity";
import { StatusCodeMessage } from "../../constants.utils";
import { CustomError } from "../CustomError.utils.error";
import { NotFoundError, UnauthorizedError } from "../interfaces.utils.error";


export enum AuthenticationErrorsFlag {
  EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND",
  EMAIL_ALREADY_USED = "EMAIL_ALREADY_USED",
  USERNAME_NOT_FOUND = "USERNAME_NOT_FOUND",
  USERNAME_ALREADY_USED = "USERNAME_ALREADY_USED"
}

export const handleAuthenticationError = (e: Error | QueryFailedError, data: UserValidator): void => {
  switch (e.message) {
    case AuthenticationErrorsFlag.EMAIL_NOT_FOUND:
      throw new CustomError(
        new NotFoundError(),
        `L'utilisateur/rice avec l'email ${data.email} n'existe pas en base de données`
      );
    case AuthenticationErrorsFlag.EMAIL_ALREADY_USED:
      throw new CustomError(
        new NotFoundError(),
        `L'utilisateur/rice avec l'email ${data.email} existe déjà en base de données`
      );
    case AuthenticationErrorsFlag.USERNAME_NOT_FOUND:
      throw new CustomError(
        new NotFoundError(),
        `L'utilisateur/rice avec le nom ${data.username} n'existe pas en base de données`
      );
    case AuthenticationErrorsFlag.USERNAME_ALREADY_USED:
      throw new CustomError(
        new NotFoundError(),
        `L'utilisateur/rice avec le nom ${data.username} existe déjà en base de données`
      );
    case StatusCodeMessage.UNAUTHORIZED: 
      throw new CustomError(
          new UnauthorizedError(), 
          `Vos identifiants ne sont pas corrects`
      );
  }
}
