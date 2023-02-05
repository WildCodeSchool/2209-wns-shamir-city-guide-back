import { QueryFailedError } from "typeorm";
import { UserValidator } from "../../../validators/entities/user.validator.entity";
import { StatusCodeMessage } from "../../constants.utils";
import { CustomError } from "../CustomError.utils.error";
import { NotFoundError, UnauthorizedError } from "../interfaces.utils.error";


export enum AuthenticationErrorsFlag {
  EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND",
}

export const handleAuthenticationError = (e: Error | QueryFailedError, data: UserValidator): void => {
  switch (e.message) {
    case AuthenticationErrorsFlag.EMAIL_NOT_FOUND:
      throw new CustomError(
        new NotFoundError(),
        `L'utilisateur avec l'email ${data.email} n'existe pas en base de données`
      );
    case StatusCodeMessage.UNAUTHORIZED: 
      throw new CustomError(
          new UnauthorizedError(), 
          `Vos identifiants ne sont pas corrects`
      );
  }
}
