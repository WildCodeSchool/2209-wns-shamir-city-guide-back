import { QueryFailedError } from "typeorm";
import { UserValidator } from "../../../validators/entities/user.validator.entity";
import { retrieveKeyFromDbErrorMessage } from "../../string.utils";
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
  ROLE_NOT_IN_DB = "ROLE_NOT_IN_DB",
}


export const handleUserError = <T>(e: Error, data: T): void => {
  switch (e.message) {
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
    case UserErrorsFlag.EMAIL_NOT_FOUND:
      throw new CustomError(
        new NotFoundError(),
        `L'email ${data} n'existe pas en base de données`
      );
  }
}

export const handleUserObjectError = (e: Error | QueryFailedError, data: UserValidator): void => {
  if (e instanceof Error && e.message === UserErrorsFlag.ID_NOT_FOUND) {
    throw new CustomError(
      new NotFoundError(),
      `La catégorie n'existe pas en base de données`
    );
  } 
  
  if (e instanceof QueryFailedError && e.driverError.detail?.length) {
    switch (retrieveKeyFromDbErrorMessage(e.driverError.detail)) {
      case "username":
        throw new CustomError(
          new UnprocessableEntityError(),
          `Le nom ${data.username} est déjà utilisé, vous devez en choisir un autre`
        );
      case "email":
        throw new CustomError(
          new UnprocessableEntityError(),
          `L'email ${data.email} est déjà utilisé, vous devez en choisir un autre`
        );
    }
  }
}

export const handleUserRoleObjectError = (e: Error, roleName: string): void => {
  if (e.message === UserErrorsFlag.ROLE_NOT_IN_DB) {
      throw new CustomError(
          new NotFoundError(), 
          `Le rôle ${roleName} n'existe pas en base de données`
      );
  }         
}
