import {
    Min,
    MinLength,
    MaxLength,
    Matches,
    IsOptional,
  } from "class-validator";
  import { CircuitErrorValidator } from "../messages.validator";
  import { validateData } from "../validate.validator";
  import { CustomError } from "../../utils/errors/CustomError.utils.error";
  import {
    BadRequestError,
    UnprocessableEntityError,
  } from "../../utils/errors/interfaces.utils.error";
import { CircuitType } from "../../types/circuit.type";
import { IdValidator } from "../common.validator";
  
  
  export class CircuitValidator {
    @IsOptional()
    @Min(1, {
      message: CircuitErrorValidator.ID_EQUAL_0,
    })
    id: number;
  
    @MinLength(1, {
      message: CircuitErrorValidator.NAME_TOO_SHORT,
    })
    @MaxLength(255, {
      message: CircuitErrorValidator.NAME_TOO_LONG,
    })
    name: string;
  
    @Matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, {
      message: CircuitErrorValidator.PICTURE_WRONG_FORMAT,
    })
    picture: string;
    
    @MinLength(1, {
      message: CircuitErrorValidator.DESCRIPTION_TOO_SHORT,
    })
    @MaxLength(700, {
      message: CircuitErrorValidator.DESCRIPTION_TOO_LONG,
    })
    description: string;

    @Min(1, {
      message: CircuitErrorValidator.CITY_ID_EQUAL_0,
    })
    cityId: number;
  
    @Min(1, {
      message: CircuitErrorValidator.ID_EQUAL_0,
    })
    categoryId: number;
    
    pois: number[];
  }
    
  
  /**
   * Checks the validity of the poi ids array during the circuit creation
   * @param {number[]} arr the ids array to check before circuit creation
   * @returns <IdValidator[]> the verified ids array
   * @throws Error: 400 Bad Request | 422 Unprocessable Entity
   */
  const validateIdArray = async (arr: number[]): Promise<IdValidator[]> => {
    let returnedIds: IdValidator[] = [];

    if (!arr.length) {
      throw new CustomError(
        new BadRequestError(),
        "Vous devez associez des points d'intérêt au circuit"
      )
    } 

    // Check if there is no duplicate in array
    if (arr.length > 2) {
      for (let i = 0; i < arr.length - 1; i++) {
        const idValidator = new IdValidator();
        if (arr[i]) idValidator.id = arr[i];
        const verifiedId = await validateData(idValidator);

        if (verifiedId) returnedIds.push(verifiedId);
        else
          throw new CustomError(
            new UnprocessableEntityError(),
            "Un ou plusieurs identifiants ne sont pas dans le bon format"
          );

        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i]=== arr[j]) {
            throw new CustomError(
              new UnprocessableEntityError(),
              "Un circuit ne peut pas contenir deux fois le même point d'intérêt"
            );
          }
        }
      }
    }
   
    return returnedIds;
  };
  
  /**
   * Checks the validity of the circuit data during creation
   * @param {CircuitType} circuit the circuit to check before creation
   * @returns <CircuitValidator> the verified circuit
   * @throws Error: 400 Bad Request | 422 Unprocessable Entity
   */
  export const validateCreationCircuitInput = async (
    circuit: CircuitType
  ): Promise<CircuitValidator> => {
    if (Object.keys(circuit).includes("id")) {
      throw new CustomError(
        new BadRequestError(),
        CircuitErrorValidator.ID_NOT_REQUIRED
      );
    }

    if (!Object.keys(circuit).includes("cityId")) {
      throw new CustomError(
        new BadRequestError(),
        CircuitErrorValidator.CITY_REQUIRED
      );
    }
  
    return setCircuitValidator(circuit);
  };
  
  /**
   * Checks the validity of the Circuit data during update
   * @param {CircuitType} circuit the circuit to check before update
   * @returns <CircuitValidator> the verified data
   * @throws Error: 400 Bad Request | 422 Unprocessable Entity
   */
  export const validateUpdateCircuitInput = async (
    circuit: CircuitType
  ): Promise<CircuitValidator> => {
    if (!Object.keys(circuit).includes("id")) {
      throw new CustomError(new BadRequestError(), CircuitErrorValidator.ID_REQUIRED);
    }
  
    return setCircuitValidator(circuit);
  };
  
  const setCircuitValidator = async (circuit: CircuitType): Promise<CircuitValidator> => {
    let id = null;
    if (circuit.id !== null) id = circuit.id;
    const { 
      name, 
      picture, 
      description,  
      cityId, 
      categoryId, 
      pois 
    } = circuit;
    
    const circuitValidator = new CircuitValidator();
    if (id !== null && id !== undefined) circuitValidator.id = id;

    circuitValidator.name = name && name.length > 0 ? name.trim() : "";
    circuitValidator.picture = picture && picture.length > 0 ? picture.trim() : "";
    circuitValidator.description = description && description.length > 0 ? description.trim() : "";
    circuitValidator.cityId = cityId;
    circuitValidator.categoryId = categoryId;
    

    await validateIdArray(pois);
    circuitValidator.pois = circuit.pois;
    
    return await validateData(circuitValidator);
  }
  