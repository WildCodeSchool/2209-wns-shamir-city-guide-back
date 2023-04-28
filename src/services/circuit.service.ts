import Circuit from "../entities/Circuit.entity";
import Poi from "../entities/PointOfInterest.entity";
import { CustomError } from "../utils/errors/CustomError.utils.error";
import { InternalServerError } from "../utils/errors/interfaces.utils.error";
import { formatString } from "../utils/string.utils";
import { 
  CircuitErrorsFlag, 
  handleCircuitError, 
  handleCircuitObjectError
} from "../utils/errors/handleError/circuit.utils.error";
import { CircuitRepository } from "../repositories/circuit.repository";
import { PoiRepository } from "../repositories/poi.repository";
import { CircuitValidator } from "../validators/entities/circuit.validator.entity";
import { QueryFailedError } from "typeorm";
import { CityRepository } from "../repositories/city.repository";
import { CategoryRepository } from "../repositories/category.repository";
import { MyAppContext } from "../types/context";
import User from "../entities/User.entity";


/**
 * Returns all circuits from database
 * @returns Circuits[]
 * @throws Error: 500 Internal Server Error
 */
export const getAll = async (): Promise<Circuit[]> => {
  try {
    const allCircuits: Circuit[] = await CircuitRepository.find({
      relations: ["city"]
    });

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
    const circuitExist = await CircuitRepository.findOne({
      where: { id: id },
      relations: ['city'],
    });
    if (circuitExist) return circuitExist;
    else throw new Error(CircuitErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error) handleCircuitError(e, null);
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
    const circuitExist = await CircuitRepository.findOneBy({
      name: formatName,
    });
    if (circuitExist) return circuitExist;
    else throw new Error(CircuitErrorsFlag.NAME_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error) handleCircuitError(e, name);
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le circuit ${formatName} n'a pas été chargé`
    );
  }
};

/**
 * Create and return a circuit
 * @param {CircuitValidator} data circuit object to create
 * @param {MyAppContext} ctx the app context with the decoded token
 * @returns circuit the created circuit
 * @throws Error: 500 Internal Server Error | 422 Unprocessable Entity
 */
export const create = async (data: CircuitValidator, ctx: MyAppContext): Promise<Circuit> => {
  data.name = formatString(data.name);
  let poisInDb: Poi[] | null = [];

  try {
    // Check if city is present in database
    const cityInDb = await CityRepository.findOneBy({ id: data.cityId });
    if (!cityInDb) throw new Error(CircuitErrorsFlag.CITY_NOT_IN_DB);
    
    // Check if the request sender is the user attached to the city
    if (!verifyIfTwoUsersAreIdentical(ctx, cityInDb.user)) throw new Error(CircuitErrorsFlag.USER_NOT_AUTHORIZED_CREATE);

    // Check if category is present in database
    const categoryInDb = await CategoryRepository.findOneBy({ id: data.categoryId }); 
    if (!categoryInDb) throw new Error(CircuitErrorsFlag.CATEGORY_NOT_IN_DB);

    // Check if all pois are present in database
    poisInDb = await checkIfPoisAllExist(data.pois);
    if (!poisInDb) throw new Error(CircuitErrorsFlag.POI_NOT_IN_DB);
    
    const newCircuit: Circuit = new Circuit();
    newCircuit.name = data.name;
    newCircuit.picture = data.picture;
    newCircuit.description = data.description;
    newCircuit.city = cityInDb;
    newCircuit.category = categoryInDb;
    newCircuit.pointsOfInterest = poisInDb;

    return await CircuitRepository.save(newCircuit);    
  } catch (e) {
    if (e instanceof Error) handleCircuitError(e, data);
    if (e instanceof QueryFailedError || e instanceof Error) {
      handleCircuitObjectError(e, data);
     } throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le circuit ${data.name} n'a pas été créé`
    );
  }
};

/**
 * Update and return a circuit
 * @param {CircuitValidator} data circuit object to update
 * @param {MyAppContext} ctx the app context with the decoded token
 * @returns updated circuit
 * @throws Error: 500 Internal Server Error | 404 Not Found | 422 Unprocessable Entity
 */
export const update = async (data: CircuitValidator, ctx: MyAppContext): Promise<Circuit> => {
  data.name = formatString(data.name);
  let poisInDb: Poi[] | null = [];

  try { 
    // Check if circuit is present in database
    const circuitInDb = await CircuitRepository.findOne({
      where: { id: data.id },
      relations: ['city'],
    });;
    if (!circuitInDb) throw new Error(CircuitErrorsFlag.ID_NOT_FOUND); 

    // Check if city is present in database
    const cityInDb = await CityRepository.findOneBy({ id: data.cityId });
    if (!cityInDb) throw new Error(CircuitErrorsFlag.CITY_NOT_IN_DB);

    // Check if request sender is the user attached to the city
    if (
      !verifyIfTwoUsersAreIdentical(ctx, cityInDb.user) ||
      !verifyIfTwoUsersAreIdentical(ctx, circuitInDb.city.user)
    ) throw new Error(CircuitErrorsFlag.USER_NOT_AUTHORIZED_UPDATE);

    // Check if category is present in database
    const categoryInDb = await CategoryRepository.findOneBy({ id: data.categoryId }); 
    if (!categoryInDb) throw new Error(CircuitErrorsFlag.CATEGORY_NOT_IN_DB);

    // Check if all pois are present in database
    poisInDb = await checkIfPoisAllExist(data.pois);
    if (!poisInDb) throw new Error(CircuitErrorsFlag.POI_NOT_IN_DB);
    
    const newCircuit: Circuit = new Circuit();
    newCircuit.name = data.name;
    newCircuit.picture = data.picture;
    newCircuit.description = data.description;
    newCircuit.city = cityInDb;
    newCircuit.category = categoryInDb;
    // Update circuit pois
    (data.pois?.length > 0) ? newCircuit.pointsOfInterest = [...poisInDb] : newCircuit.pointsOfInterest = [];
    
    return await CircuitRepository.save({ ...circuitInDb, ...newCircuit });
  } catch (e) {
    if (e instanceof Error) handleCircuitError(e, data);
    if (e instanceof QueryFailedError || e instanceof Error) {
      handleCircuitObjectError(e, data);
    } throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le circuit ${data.name} n'a pas été créé`
    );
  }
};

/**
 * Delete a circuit by its id in database
 * @param {number} id circuit id
 * @param {MyAppContext} ctx the app context with the decoded token
 * @returns deleted circuit
 * @throws Error: 500 Internal Server Error | 404 Not Found
 */
export const deleteCircuit = async (id: number, ctx: MyAppContext): Promise<Circuit> => {
  try {
    const circuitToRemove = await CircuitRepository.findOne({
      where: { id: id },
      relations: ['city'],
    });

    // Check if the request sender is the user attached to the city related to the circuit to delete
    // If yes we can remove the circuit
    if (circuitToRemove) {
      if (!verifyIfTwoUsersAreIdentical(ctx, circuitToRemove?.city?.user)) throw new Error(CircuitErrorsFlag.USER_NOT_AUTHORIZED_DELETE);

      return await CircuitRepository.remove(circuitToRemove);
    } else throw new Error(CircuitErrorsFlag.ID_NOT_FOUND);
  } catch (e) {
    if (e instanceof Error) handleCircuitError(e, null);
    throw new CustomError(
      new InternalServerError(),
      `Problème de connexion interne, le circuit n'a pas été supprimé`
    );
  }
};

/**
 * Return a pois array from database or null if a poi doesn't exist
 * @param {number[]} poisIds the poi ids array
 * @returns Poi[] | null 
 * @throws Error: 500 Internal Server Error | 404 Not Found
*/
const checkIfPoisAllExist = async (poisIds: number[]): Promise<Poi[] | null> => {
  let poisInDb: Poi[] = [];

  for (let i = 0; i < poisIds.length; i++) {
    const id = poisIds[i];
    const poiInDB = await PoiRepository.findOneBy({id});
    
    if (!poiInDB) return null;
    else poisInDb.push(poiInDB);
  }
  return poisInDb;
}

/**
 * Check if the user in the context is identical to the user required for the action
 * @param {MyAppContext} senderCtx the actual context for the request sender
 * @param {User} userToCompare the user to compare with
 * @returns true if the two users are identical | false otherwise 
*/
const verifyIfTwoUsersAreIdentical = (senderCtx: MyAppContext, userToCompare: User): boolean => {
  return (
    senderCtx.user.id === userToCompare.id &&
    senderCtx.user.username === userToCompare.username &&
    senderCtx.user.email === userToCompare.email
  );
}