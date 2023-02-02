import "reflect-metadata";
import Role from "../entities/Role.entity";
import { RoleRepository } from "../repositories/role.repository";
import { QueryFailedError } from "typeorm";
import  { retrieveKeyFromDbErrorMessage } from "../utils/string.utils";
import {
  RoleErrorsFlag,
  handleRoleError,
} from "../utils/errors/handleError/role.utils.error";
import { CustomError } from "../utils/errors/CustomError.utils.error";
import { InternalServerError } from "../utils/errors/interfaces.utils.error";
import { RoleValidator } from "../validators/entities/role.validator.entity";


/**
 * Returns all roles from database
 * @returns Role[]
 * @throws Internal Server Error 500
 */
export const getAll = async (): Promise<Role[]> => {
  try {
    return await RoleRepository.find();
  } catch (e) {
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, les roles n'ont pas été chargés`
    );
  }
};

/**
 * Returns role by id
 * @param {number} id The id to use to retrieve a specific role
 * @returns Role
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const getById = async (id: number): Promise<Role> => {
    try {
      const isRoleExist = await RoleRepository.findOneBy({ id });
      if (isRoleExist !== null) return isRoleExist;
      else throw new Error(RoleErrorsFlag.ID_NOT_FOUND);
    } catch (e) {
      if (e instanceof Error && e.message === RoleErrorsFlag.ID_NOT_FOUND)
        handleRoleError(RoleErrorsFlag.ID_NOT_FOUND, id);
      throw new CustomError(
        new InternalServerError(),
        `Problème de connexion interne, le rôle n'a pas été chargé`
      );
    }
  };

/**
 * Returns role by name
 * @param {string} name The name to use to retrieve a specific role
 * @returns Role
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const getByName = async (name: string): Promise<Role> => {
  const formatName = name.toUpperCase();
  try {
    const isRoleNameExist = await RoleRepository.findOneBy({
      name: formatName,
    });
    if (isRoleNameExist) return isRoleNameExist;
    else throw new Error(RoleErrorsFlag.NAME_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error && e.message === RoleErrorsFlag.NAME_NOT_FOUND)
      handleRoleError(RoleErrorsFlag.NAME_NOT_FOUND, formatName);
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le rôle ${formatName} n'a pas été chargé`
    );
  }
};

/**
 * Create and return a role
 * @param {RoleValidator} data Role object to create 
 * @returns the created role
 * @throws Error: 500 Internal Server Error | 422 Unprocessable Entity

*/
export const create = async (data: RoleValidator): Promise<Role> => {
  data.name = data.name.toUpperCase();

  try {
    const createdRole = await RoleRepository.save(data);
    return createdRole;
  } catch (e) {
    if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "name")
        handleRoleError(RoleErrorsFlag.NAME_ALREADY_USED, data.name);
    }
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le rôle ${data.name} n'a pas été créé`
    );
  }
};

/**
 * Update a role in database and return it
 * @param {RoleValidator} data Role object to update
 * @returns updated role
 *  @throws Error: 500 Internal Server Error | 404 Not Found | 422 Unprocessable Entity
 */
export const update = async (data: RoleValidator): Promise<Role> => {
  data.name = data.name.toUpperCase();
  try {
    const roleToUpdate = await RoleRepository.findOneBy({
      id: data.id
    });
    if (roleToUpdate) {
      return await RoleRepository.save({ ...roleToUpdate, ...data });
    } else throw new Error(RoleErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error && e.message === RoleErrorsFlag.ID_NOT_FOUND)
      handleRoleError(RoleErrorsFlag.ID_NOT_FOUND, data.id);
    else if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "name")
        handleRoleError(RoleErrorsFlag.NAME_ALREADY_USED, data.name);
    }
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le rôle n'a pas été mise à jour`
    );
  }
};

/**
 * Delete a roole by its id in database
 * @param {number} id The id to use to delete a specific role
 * @returns deleted role
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const deleteRole = async (id: number): Promise<Role> => {
  try {
    const roleToRemove = await RoleRepository.findOneBy({ id });
    if (roleToRemove) {
      return await RoleRepository.remove(roleToRemove);
    } else throw new Error(RoleErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error && e.message === RoleErrorsFlag.ID_NOT_FOUND)
      handleRoleError(RoleErrorsFlag.ID_NOT_FOUND, id);
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le rôle n'a pas été supprimé`
    );
  }
};
