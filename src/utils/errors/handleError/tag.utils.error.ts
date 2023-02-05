import { QueryFailedError } from "typeorm";
import { TagValidator } from "../../../validators/entities/tag.validator.entity";
import { retrieveKeyFromDbErrorMessage } from "../../string.utils";
import { CustomError } from "../CustomError.utils.error";
import {
  NotFoundError,
  UnprocessableEntityError,
} from "../interfaces.utils.error";

export enum TagErrorsFlag {
  ID_NOT_FOUND = "ID_NOT_FOUND",
  NAME_NOT_FOUND = "NAME_NOT_FOUND",
}

export const handleTagError = <T>(e: Error | QueryFailedError, data: T): void => {
  switch (e.message) {
    case TagErrorsFlag.ID_NOT_FOUND:
      throw new CustomError(
        new NotFoundError(),
        `Le tag n'existe pas en base de données`
      );
    case TagErrorsFlag.NAME_NOT_FOUND:
      throw new CustomError(
        new NotFoundError(),
        `Le tag avec le nom ${data} n'existe pas en base de données`
      );
  }
}

export const handleTagObjectError = (e: Error | QueryFailedError, data: TagValidator): void => {
  if (e instanceof Error && e.message === TagErrorsFlag.ID_NOT_FOUND) {
      throw new CustomError(
        new NotFoundError(),
        `Le tag n'existe pas en base de données`
      );
  } else if (e instanceof QueryFailedError && e.driverError.detail?.length) {
    if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "name") {
      throw new CustomError(
        new UnprocessableEntityError(),
        `Le nom ${data.name} est déjà utilisé, vous devez en choisir un autre`
      );
    }
  }
}