import { CustomError } from "../CustomError.utils.error";
import {
  NotFoundError,
  UnprocessableEntityError,
} from "../interfaces.utils.error";

export enum CategoryErrorsFlag {
  ID_NOT_FOUND = "GET_BY_ID",
  NAME_NOT_FOUND = "GET_BY_NAME",
  NAME_ALREADY_USED = "NAME_ALREADY_USED",
  ICON_NOT_FOUND = "GET_BY_ICON",
}

export const handleCategoryError = <T>(flag: string, data: T): void => {
  switch (flag) {
    case CategoryErrorsFlag.ID_NOT_FOUND:
      throw new CustomError(
        new NotFoundError(),
        `La catégorie n'existe pas en base de données`
      );
    case CategoryErrorsFlag.NAME_NOT_FOUND:
      throw new CustomError(
        new NotFoundError(),
        `La catégorie avec le nom ${data} n'existe pas en base de données`
      );
    case CategoryErrorsFlag.NAME_ALREADY_USED:
      throw new CustomError(
        new UnprocessableEntityError(),
        `Le nom ${data} est déjà utilisé, vous devez en choisir un autre`
      );
    case CategoryErrorsFlag.ICON_NOT_FOUND:
      throw new CustomError(
        new NotFoundError(),
        "L'icone ${data} n'existe pas en base de données"
      );
  }
};
