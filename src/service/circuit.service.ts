import Circuit from "../entity/Circuit.entity";
import { CustomError } from "../utils/error/CustomError.utils.error";
import { InternalServerError } from "../utils/error/interfaces.utils.error";
import {
  formatString,
  retrieveKeyFromDbErrorMessage,
} from "../utils/string.utils";
import {
  CircuitErrorsFlag,
  handleCircuitError,
} from "../utils/error/handleError/Circuit.utils.error";
// import { PoiValidator } from "../validator/entity/poi.validator.entity";
// import { TagValidator } from "../validator/entity/tag.validator.entity";
// import { PoiRepository } from "../repository/poi.repository";
// import { TagRepository } from "../repository/tag.repository";

/**
 * Returns all circuits from database
 * @returns Circuits[]
 * @throws Error: 500 Internal Server Error
 */
export const getAll = async (): Promise<Array<Circuit>> => {
  try {
    const allCircuit: Circuit[] = await CircuitRepository.find({
      relations: {
        city: true,
        category: true,
      },
    });

    return allCircuit;
  } catch (e) {
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, les circuits n'ont pas été chargés`
    );
  }
};

/**
 * Returns a circuit by its id from database
 * @param {number} id The id to use to retrieve a specific circuit
 * @returns circuit
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const getById = async (id: number): Promise<Circuit> => {
  try {
    const isCircuitExist = await CircuitRepository.findOneBy({ id });
    if (isCircuitExist) return isCircuitExist;
    else throw new Error(CircuitErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error && e.message === CircuitErrorsFlag.ID_NOT_FOUND)
      handleCircuitError(CircuitErrorsFlag.ID_NOT_FOUND, null);
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le circuit n'a pas été chargé`
    );
  }
};

/**
 * Returns a circuit by its name from database
 * @param {string} name The name to use to retrieve a specific circuit
 * @returns circuit
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const getByName = async (name: string): Promise<Circuit> => {
  const formatName = formatString(name);
  try {
    const isCircuitExist = await CircuitRepository.findOneBy({
      name: formatName,
    });
    if (isCircuitExist) return isCircuitExist;
    else throw new Error(CircuitErrorsFlag.NAME_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error && e.message === CircuitErrorsFlag.NAME_NOT_FOUND)
      handleCircuitError(CircuitErrorsFlag.NAME_NOT_FOUND, name);
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le circuit ${formatname} n'a pas été chargé`
    );
  }
};

/**
 * Create and return a circuit
 * @param {CircuitValidator} data circuit object to create
 * @returns circuit the created circuit
 * @throws Error: 500 Internal Server Error | 422 Unprocessable Entity
 */
export const create = async (data: CircuitValidator): Promise<Circuit> => {
  data.name = formatString(data.name);

  try {
    const createdCircuit = await CircuitRepository.save(data);
    return createdCircuit;
  } catch (e) {
    if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "name")
        handleCircuitError(CircuitErrorsFlag.NAME_ALREADY_USED, data.name);
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "picture")
        handleCircuitError(CircuitErrorsFlag.PICTURE_ALREADY_USED, null);
    }
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le circuit ${data.name} n'a pas été créé`
    );
  }
};

/**
 * Update and return a circuit
 * @param {CircuitValidator} data circuit object to update
 * @returns updated circuit
 * @throws Error: 500 Internal Server Error | 404 Not Found | 422 Unprocessable Entity
 */
export const update = async (data: CircuitValidator): Promise<Circuit> => {
  data.name = formatString(data.name);
  try {
    const circuitToUpdate = await CircuitRepository.findOneBy({ id: data.id });
    if (circuitToUpdate) {
      return await CircuitRepository.save({ ...circuitToUpdate, ...data });
    } else throw new Error(CircuitErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error && e.message === CircuitErrorsFlag.ID_NOT_FOUND)
      handleCircuitError(CircuitErrorsFlag.ID_NOT_FOUND, data.id);
    else if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "name")
        handleCircuitError(CircuitErrorsFlag.NAME_ALREADY_USED, data.name);
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "picture")
        handleCircuitError(CircuitErrorsFlag.PICTURE_ALREADY_USED, null);
    }
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le circuit n'a pas été mis à jour`
    );
  }
};

/**
 * Delete a circuit by its id in database
 * @param {number} id circuit id
 * @returns deleted circuit
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const deleteCircuit = async (id: number): Promise<Circuit> => {
  try {
    const circuitToRemove = await CircuitRepository.findOneBy({ id });
    if (circuitToRemove) {
      await CircuitRepository.remove(circuitToRemove);
      return circuitToRemove;
    } else throw new Error(CircuitErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error && e.message === CircuitErrorsFlag.ID_NOT_FOUND)
      handleCircuitError(CircuitErrorsFlag.ID_NOT_FOUND, id);
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le circuit n'a pas été supprimé`
    );
  }
};
