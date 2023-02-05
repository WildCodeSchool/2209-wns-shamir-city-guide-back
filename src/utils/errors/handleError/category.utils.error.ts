import { QueryFailedError } from "typeorm";
import { CategoryValidator } from "../../../validators/entities/category.validator.entity";
import { retrieveKeyFromDbErrorMessage } from "../../string.utils";
import { CustomError } from "../CustomError.utils.error";
import { NotFoundError, UnprocessableEntityError } from "../interfaces.utils.error";

export enum CategoryErrorsFlag {
  ID_NOT_FOUND = "ID_NOT_FOUND",
  NAME_NOT_FOUND = "NAME_NOT_FOUND",
}

export const handleCategoryError = <T>(e: Error, data: T): void => {
  switch (e.message) {
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
  }
}

export const handleCategoryObjectError = (e: Error | QueryFailedError, data: CategoryValidator): void => {
  if (e instanceof Error && e.message === CategoryErrorsFlag.ID_NOT_FOUND) {
    throw new CustomError(
      new NotFoundError(),
      `La catégorie n'existe pas en base de données`
    );
} else if (e instanceof QueryFailedError && e.driverError.detail?.length) {
    switch (retrieveKeyFromDbErrorMessage(e.driverError.detail)) {
      case "name":
        throw new CustomError(
          new UnprocessableEntityError(),
          `Le nom ${data.name} est déjà utilisé, vous devez en choisir un autre`
        );
      case "color":
        throw new CustomError(
          new UnprocessableEntityError(),
          `La couleur ${data.color} est déjà utilisée, vous devez en choisir une autre`
        );
      case "icon":
        throw new CustomError(
          new UnprocessableEntityError(),
          `L'icône ${data.icon} est déjà utilisée, vous devez en choisir une autre`
        );
    }
  }
}