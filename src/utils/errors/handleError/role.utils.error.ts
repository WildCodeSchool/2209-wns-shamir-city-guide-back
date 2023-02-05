import { QueryFailedError } from "typeorm";
import { RoleValidator } from "../../../validators/entities/role.validator.entity";
import { retrieveKeyFromDbErrorMessage } from "../../string.utils";
import { CustomError } from "../CustomError.utils.error";
import {
  NotFoundError,
  UnprocessableEntityError,
} from "../interfaces.utils.error";

export enum RoleErrorsFlag {
  ID_NOT_FOUND = "ID_NOT_FOUND",
  NAME_NOT_FOUND = "NAME_NOT_FOUND"
}


export const handleRoleError = <T>(e: Error, data: T): void => {
  switch (e.message) {
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
  }
}

export const handleRoleObjectError = (e: Error | QueryFailedError, data: RoleValidator): void => {
  if (e instanceof Error && e.message === RoleErrorsFlag.ID_NOT_FOUND) {
    throw new CustomError(
      new NotFoundError(),
      `Le role n'existe pas en base de données`
    );
} else if (e instanceof QueryFailedError && e.driverError.detail?.length) {
    switch (retrieveKeyFromDbErrorMessage(e.driverError.detail)) {
      case "name":
        throw new CustomError(
          new UnprocessableEntityError(),
          `Le nom ${data.name} est déjà utilisé, vous devez en choisir un autre`
        );
    }
  }
}