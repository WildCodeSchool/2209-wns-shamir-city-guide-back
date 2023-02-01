import { CustomError } from "../CustomError.utils.error";
import {
  NotFoundError,
  UnprocessableEntityError,
} from "../interfaces.utils.error";

export enum RoleErrorsFlag {
  ID_NOT_FOUND = "GET_BY_ID",
  NAME_NOT_FOUND = "GET_BY_NAME",
  NAME_ALREADY_USED = "NAME_ALREADY_USED",
}

export const handleRoleError = <T>(flag: string, data: T): void => {
  switch (flag) {
    case RoleErrorsFlag.ID_NOT_FOUND:
      throw new CustomError(
        new NotFoundError(),
        `Le role n'existe pas en base de données`
      );
    case RoleErrorsFlag.NAME_NOT_FOUND:
      throw new CustomError(
        new NotFoundError(),
        `Le role avec le nom ${data} n'existe pas en base de données`
      );
    case RoleErrorsFlag.NAME_ALREADY_USED:
      throw new CustomError(
        new UnprocessableEntityError(),
        `Le nom ${data} est déjà utilisé, vous devez en choisir un autre`
      );
  }
};
