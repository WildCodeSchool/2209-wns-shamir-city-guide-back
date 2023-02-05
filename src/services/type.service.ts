import "reflect-metadata";
import Type from "../entities/Type.entity";
import { TypeRepository } from "../repositories/type.repository";
import { QueryFailedError } from "typeorm";
import { formatString } from "../utils/string.utils";
import { 
    TypeErrorsFlag, 
    handleTypeError, 
    handleTypeObjectError 
} from "../utils/errors/handleError/type.utils.error";
import { CustomError } from "../utils/errors/CustomError.utils.error";
import { InternalServerError } from "../utils/errors/interfaces.utils.error";
import { TypeValidator } from "../validators/entities/type.validator.entity";


/**
 * Returns all types from database
 * @returns Type[] 
 * @throws Internal Server Error 500
 */
export const getAll = async (): Promise<Array<Type>> => {
    try {
    return await TypeRepository.find();
    } catch (e) {
    throw new CustomError(
        new InternalServerError(), 
        `Problème de connexion interne, les types n'ont pas été chargés`
    );
    }
};

/**
 * Returns a type by its id from database
 * @param {number} id The id to use to retrieve a specific type
 * @returns type 
 * @throws Error: 500 Internal Server Error | 404 Not Found 
 */
export const getById = async (id: number): Promise<Type> => {
    try {
        const isTypeExist = await TypeRepository.findOneBy({id});
        if (isTypeExist) return isTypeExist;
        else throw new Error(TypeErrorsFlag.ID_NOT_FOUND);
    } catch (e) {
        if (e instanceof Error) handleTypeError(e, null);
        throw new CustomError(
        new InternalServerError(), 
        `Problème de connexion interne, le type n'a pas été chargé`
    );
    }
};

/**
 * Returns a type by its name from database
 * @param {string} name The name to use to retrieve a specific type
 * @returns type 
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const getByName = async (name: string): Promise<Type> => {
    const formatName = formatString(name);
    try {
    const isTypeExist = await TypeRepository.findOneBy({name: formatName});
    if (isTypeExist) return isTypeExist;
    else throw new Error(TypeErrorsFlag.NAME_NOT_FOUND); 
    } catch (e) {
        if (e instanceof Error) handleTypeError(e, formatName);
        throw new CustomError(
            new InternalServerError(), 
            `Problème de connexion interne, le type ${formatName} n'a pas été chargé`
        );
    }
};

/**
 * Create and return a type
 * @param {TypeValidator} data Type object to create 
 * @returns created type 
 * @throws Error: 500 Internal Server Error | 422 Unprocessable Entity
*/
export const create = async (data: TypeValidator): Promise<Type> => {
    data.name = formatString(data.name);
    
    try {
        const createdTag = await TypeRepository.save(data);
        return createdTag;
    } catch (e) {
        if (e instanceof QueryFailedError || e instanceof Error) {
            handleTypeObjectError(e, data);
        } throw new CustomError(
            new InternalServerError(), 
            `Problème de connexion interne, le type ${data.name} n'a pas été créé`
        );
    }
};

/**
 * Update a type in database and return it
 * @param {TypeValidator} data Type object to update
 * @returns updated type
 *  @throws Error: 500 Internal Server Error | 404 Not Found | 422 Unprocessable Entity
 */
export const update = async (data: TypeValidator): Promise<Type> => {
    data.name = formatString(data.name);
    try {
        const typeToUpdate = await TypeRepository.findOneBy({id: data.id});
        if (typeToUpdate) {
            return await TypeRepository.save({...typeToUpdate, ...data});
        } else throw new Error(TypeErrorsFlag.ID_NOT_FOUND);
    } catch (e) {
        if (e instanceof QueryFailedError || e instanceof Error) {
            handleTypeObjectError(e, data);
        } throw new CustomError(
            new InternalServerError(),
            `Problème de connexion interne, le type n'a pas été mis à jour`
        );
    }
};

/**
 * Delete a type by its id in database
 * @param {number} id The id to use to delete a specific type
 * @returns deleted type 
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const deleteType = async (id: number): Promise<Type> => {
    try {
        const typeToRemove = await TypeRepository.findOneBy({id});
        if (typeToRemove) {
            return await TypeRepository.remove(typeToRemove);
        } else throw new Error(TypeErrorsFlag.ID_NOT_FOUND);
    } catch (e) {
        if (e instanceof Error) handleTypeError(e, null);
        throw new CustomError(
            new InternalServerError(),
            `Problème de connexion interne, le type n'a pas été supprimé`
        );
    }
};
