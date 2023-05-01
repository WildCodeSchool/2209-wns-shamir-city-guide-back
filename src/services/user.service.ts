import User from "../entities/User.entity";
import { UserRepository } from "../repositories/user.repository";
import { QueryFailedError } from "typeorm";
import { formatString } from "../utils/string.utils";
import { 
    UserErrorsFlag, 
    handleUserError, 
    handleUserObjectError,
    handleUserRoleObjectError
} from "../utils/errors/handleError/user.utils.error";
import { CustomError } from "../utils/errors/CustomError.utils.error";
import { InternalServerError } from "../utils/errors/interfaces.utils.error";
import { UserValidator } from "../validators/entities/user.validator.entity";
import * as argon2 from "argon2";
import { RoleRepository } from "../repositories/role.repository";
import { RoleValidator } from "../validators/entities/role.validator.entity";
import { UserRoles } from "../utils/constants.utils";


/**
 * Return all users rfrom database
 * @returns User[]
 * @throws Error: 500 Internal Server Error 
 */
export const getAll = async (): Promise<User[]> => {
    try {
        return await UserRepository.find();
    } catch (e) {
        throw new CustomError(
        new InternalServerError(), 
            `Problème de connexion interne, les utilisateurs n'a pas été chargés`
        );
    }
};

/**
 * Return the user relative to the given id
 * @param {number} id user id
 * @returns User
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const getById = async (id: number): Promise<User> => {
    try {
        const isUserExist = await UserRepository.findOneBy({id});
        if (isUserExist) return isUserExist;
        else throw new Error(UserErrorsFlag.ID_NOT_FOUND);
    } catch (e) {
        if (e instanceof Error) handleUserError(e, null);
        throw new CustomError(
            new InternalServerError(), 
            `Problème de connexion interne, l'utilisateur n'a pas été chargé`
        );
    }
};

/**
 * Return the user relative to the given username
 * @param {string} username user username
 * @returns User
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const getByUsername = async (username: string): Promise<User> => {
    try {
        const isUserExist = await UserRepository.findOneBy({username});
        if (isUserExist) return isUserExist;
        else throw new Error(UserErrorsFlag.USERNAME_NOT_FOUND);
    } catch (e) {
        if (e instanceof Error) handleUserError(e, username);
        throw new CustomError(
            new InternalServerError(), 
            `Problème de connexion interne, l'utilisateur n'a pas été chargé`
        );
    }
};

/**
 * Return the user relative to the given email
 * @param {string} email user email
 * @returns User
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const getByEmail = async (email: string): Promise<User> => {
    try {
        const isUserExist = await UserRepository.findOneBy({email});
        if (isUserExist) return isUserExist;
        else throw new Error(UserErrorsFlag.EMAIL_NOT_FOUND);
    } catch (e) {
        if (e instanceof Error) handleUserError(e, email);
        throw new CustomError(
            new InternalServerError(), 
            `Problème de connexion interne, l'utilisateur n'a pas été chargé`
        );
    }
};

/**
 * Create a new user in the database
 * @param {User} data the user to create
 * @returns User the created user
 * @throws Error: 500 Internal Server Error | 422 Unprocessable Entity
 */
export const createUser = async (data: UserValidator): Promise<User> => {
    const newUser = new User();
    newUser.username = formatString(data.username);
    newUser.email = data.email;
    try {
        newUser.hashedPassword = await argon2.hash(data.password);

        const defaultRole = await RoleRepository.findOneBy({ name: UserRoles.USER });
        if (defaultRole !== null) newUser.roles = [defaultRole];
        return await UserRepository.save(newUser);
    } catch (e) {
        if (e instanceof QueryFailedError || e instanceof Error) handleUserObjectError(e, data);
        throw new CustomError(
            new InternalServerError(),
            `Problème de connexion interne, l'utilisateur ${formatString(data.username)} n'a pas été créé`
        );
    }
};

/**
 * Update a user in the database
 * @param {User} data the user to update
 * @returns User the updated user
 * @throws Error: 500 Internal Server Error | 422 Unprocessable Entity | 404 Not Found
 */
export const updateUser = async (data: UserValidator): Promise<User> => {
    data.username = formatString(data.username);
    try {
        const userToUpdate = await UserRepository.findOneBy({id: data.id});
        if (userToUpdate) {
            return await UserRepository.save({...userToUpdate, ...data});
        } else throw new Error(UserErrorsFlag.ID_NOT_FOUND);
    } catch (e) {
        if (e instanceof QueryFailedError || e instanceof Error) handleUserObjectError(e, data);
        throw new CustomError(
            new InternalServerError(),
            `Problème de connexion interne, l'utilisateur ${formatString(data.username)} n'a pas été mis à jour`
        );
    }
};

/**
 * Update user roles
 * @param {User} user the user to update
 * @param {Role[]} roles the roles array to update for user
 * @returns User the updated user
 * @throws Error: 500 Internal Server Error | 422 Unprocessable Entity | 404 Not Found
 */
export const updateUserRoles = async (userId: number, roles: RoleValidator[]): Promise<User> => {
    let roleIsNotInDB = null;

    try {
        const userToUpdate = await UserRepository.findOneBy({id: userId});
        if (userToUpdate) {
            // Check if all tags are present in database
            if (roles !== null && roles.length > 0) {
                roleIsNotInDB = await checkIfRolesAllExist(roles);
            } 
            if (roleIsNotInDB) throw new Error(UserErrorsFlag.ROLE_NOT_IN_DB);
        
            (roles?.length > 0) ? userToUpdate.roles = [...roles] : userToUpdate.roles = [];

            return await UserRepository.save({...userToUpdate});
        } else throw new Error(UserErrorsFlag.ID_NOT_FOUND);
    } catch (e) {
        if (
            e instanceof Error && 
            e.message === UserErrorsFlag.ROLE_NOT_IN_DB &&
            roleIsNotInDB !== null
        ) handleUserRoleObjectError(e, roleIsNotInDB);
        else if (e instanceof Error) handleUserError(e, null)
        throw new CustomError(
            new InternalServerError(),
            `Problème de connexion interne, l'utilisateur n'a pas été mis à jour`
        );
    }
};

/**  
 * Delete an user by its id in database
 * @param {number} id user id
 * @returns deleted user 
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const deleteUser = async (id: number): Promise<User> => {
    try {
      const userToRemove = await UserRepository.findOneBy({id});
      if (userToRemove) {
        await UserRepository.remove(userToRemove);
        return userToRemove;
      } else throw new Error(UserErrorsFlag.ID_NOT_FOUND);
    } catch (e) {
        if (e instanceof Error) handleUserError(e, null);
        throw new CustomError(
            new InternalServerError(),
            `Problème de connexion interne, l'utilisateur n'a pas été supprimé`
        );
    }
};

/**  
 * Check if all roles exist in database
 * @param {RoleValidator[]} roles roles array
 * @returns string | null the tag name wich not exist in database or null if all the tags exist 
 */
const checkIfRolesAllExist = async (roles: RoleValidator[]): Promise<null | string> => {
    for (let i = 0; i < roles.length; i++) {
      const id = roles[i].id;
      const isRoleInDB = await RoleRepository.findOneBy({id});
      if (!isRoleInDB) return roles[i].name;
    }
    return null;
};
