import Circuit from "../entities/Circuit.entity";
import { CustomError } from "../utils/errors/CustomError.utils.error";
import { InternalServerError } from "../utils/errors/interfaces.utils.error";
import { formatString,retrieveKeyFromDbErrorMessage } from "../utils/string.utils";
import { CircuitErrorsFlag, handleCircuitError} from "../utils/errors/handleError/circuit.utils.error";
import { CircuitRepository } from "../repositories/circuit.repository";
import { PoiRepository } from "../repositories/poi.repository";
import { CircuitValidator } from "../validators/entities/circuit.validator.entity";
import { PoiValidator } from "../validators/entities/poi.validator.entity";
import { QueryFailedError } from "typeorm";


/**
 * Returns all circuits from database
 * @returns Circuits[]
 * @throws Error: 500 Internal Server Error
 */
export const getAll = async (): Promise<Circuit[]> => {
  try {
    const allCircuits: Circuit[] = await CircuitRepository.find();

    return allCircuits;
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
      `Problème de connexion interne, le circuit ${formatName} n'a pas été chargé`
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
  let poiIsNotInDB = null;
console.log("SERVICE circuit:", data);

  try {
    // Check if all pois are present in database
    if (data.pois !== null && data.pois.length > 0) {
      poiIsNotInDB = await checkIfPoisAllExist(data.pois);
    } 
    if (poiIsNotInDB) throw new Error(CircuitErrorsFlag.POI_NOT_IN_DB);

    console.log("YES");
    
    const createdCircuit = await CircuitRepository.save(data);
    console.log("CREATED CIRCUIT:", createdCircuit);
    
    return createdCircuit;
  } catch (e) {
    console.log("error service =>", e);
    if (e instanceof Error && e.message.includes(CircuitErrorsFlag.POI_NOT_IN_DB)) handleCircuitError(CircuitErrorsFlag.POI_NOT_IN_DB, poiIsNotInDB);

    if (e instanceof QueryFailedError && e.driverError.detail?.length) {
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "name")
        handleCircuitError(CircuitErrorsFlag.NAME_ALREADY_USED, data.name);
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "picture")
        handleCircuitError(CircuitErrorsFlag.PICTURE_ALREADY_USED, null);
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "city_id") handleCircuitError(CircuitErrorsFlag.CITY_NOT_IN_DB, data);
      if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "type_id") handleCircuitError(CircuitErrorsFlag.CATEGORY_NOT_IN_DB, data);
    }
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le circuit ${data.name} n'a pas été créé`
    );
  }
};

// /**
//  * Update and return a circuit
//  * @param {CircuitValidator} data circuit object to update
//  * @returns updated circuit
//  * @throws Error: 500 Internal Server Error | 404 Not Found | 422 Unprocessable Entity
//  */
// export const update = async (data: CircuitValidator): Promise<Circuit> => {
//   data.name = formatString(data.name);
//   try {
//     const circuitToUpdate = await CircuitRepository.findOneBy({ id: data.id });
//     if (circuitToUpdate) {
//       return await CircuitRepository.save({ ...circuitToUpdate, ...data });
//     } else throw new Error(CircuitErrorsFlag.ID_NOT_FOUND);
//   } catch (e) {
//     if (e instanceof Error && e.message === CircuitErrorsFlag.ID_NOT_FOUND)
//       handleCircuitError(CircuitErrorsFlag.ID_NOT_FOUND, data.id);
//     else if (e instanceof QueryFailedError && e.driverError.detail?.length) {
//       if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "name")
//         handleCircuitError(CircuitErrorsFlag.NAME_ALREADY_USED, data.name);
//       if (retrieveKeyFromDbErrorMessage(e.driverError.detail) === "picture")
//         handleCircuitError(CircuitErrorsFlag.PICTURE_ALREADY_USED, null);
//     }
//     throw new CustomError(
//       new InternalServerError(),
//       `Problème de connexion interne, le circuit n'a pas été mis à jour`
//     );
//   }
// };

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

const checkIfPoisAllExist = async (pois: PoiValidator[]): Promise<null | string> => {
  for (let i = 0; i < pois.length; i++) {
    const id = pois[i].id;
    const isPoiInDB = await PoiRepository.findOneBy({id});
    if (!isPoiInDB) return pois[i].name;
  }
  return null;
}