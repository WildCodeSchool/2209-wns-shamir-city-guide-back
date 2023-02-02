import {
    Min,
    MinLength,
    MaxLength,
    Matches,
    IsOptional,
  } from "class-validator";
  import { CircuitErrorValidator } from "../messages.validator";
  import { validateData } from "../validate.validator";
  import { CityValidator } from "./city.validator.entity";
  import { CategoryValidator } from "./category.validator.entity";
  import { PoiType } from "../../types/poi.type";
  import { CustomError } from "../../utils/errors/CustomError.utils.error";
  import {
    BadRequestError,
    UnprocessableEntityError,
  } from "../../utils/errors/interfaces.utils.error";
import { PoiValidator } from "./poi.validator.entity";
import { CircuitType } from "../../types/circuit.type";
  
  
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
    @MaxLength(500, {
      message: CircuitErrorValidator.DESCRIPTION_TOO_LONG,
    })
    description: string;
    
    @IsOptional()
    @Min(0, {
      message: CircuitErrorValidator.PRICE_INFERIOR_TO_0,
    })
    price: number;

    city: CityValidator;
  
    category: CategoryValidator;
    
    pois: PoiValidator[];
  }
    
  
  /**
   * Checks the validity of the pois array during the circuit creation
   * @param {PoiType[]} arr the pois to check before circuit creation
   * @returns <PoiValidator[]> the verified pois array
   * @throws Error: 400 Bad Request | 422 Unprocessable Entity
   */
  const validatePoisArray = async (arr: PoiType[]): Promise<PoiValidator[]> => {
    // Check if there is no duplicate in pois array
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i; j < arr.length; j++) {
        if (arr[i].id === arr[j].id) {
          throw new CustomError(
            new UnprocessableEntityError(),
            "Un circuit ne peut pas contenir deux fois le même point d'intérêt"
          );
        }
      }
    }

    // Check if the poi is in suitable format
    let returnedPois: PoiValidator[] = [];
    for (let i = 0; i < arr.length; i++) {
      const poiValidator = new PoiValidator();
      if (arr[i].id) poiValidator.id = arr[i].id;
      poiValidator.name = arr[i].name;
      poiValidator.address = arr[i].address;
      poiValidator.latitude = arr[i].latitude;
      poiValidator.longitude = arr[i].longitude;
      poiValidator.picture = arr[i].picture;
      poiValidator.city = arr[i].city;
      poiValidator.type = arr[i].type;
      poiValidator.tags = arr[i].tags;
      const verifiedPoi = await validateData(poiValidator);
  
      if (verifiedPoi) returnedPois.push(verifiedPoi);
      else
        throw new CustomError(
          new UnprocessableEntityError(),
          "Un ou plusieurs tags ne sont pas dans le bon format"
        );
    }
    return returnedPois;
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
    const { name, picture, description, price,  city, category, pois } = circuit;
    const circuitValidator = new CircuitValidator();
    circuitValidator.name = name && name.length > 0 ? name.trim() : "";
    circuitValidator.picture = picture && picture.length > 0 ? picture.trim() : "";
    circuitValidator.description = description && description.length > 0 ? description.trim() : "";
    circuitValidator.price = price;
    await validateData(circuitValidator);
  
    const cityValidator = new CityValidator();
    cityValidator.id = city.id;
    cityValidator.name = city.name;
    cityValidator.latitude = city.latitude;
    cityValidator.longitude = city.longitude;
    cityValidator.picture = city.picture;
    const verifiedCity = await validateData(cityValidator);
    circuitValidator.city = verifiedCity;
  
    const categoryValidator = new CategoryValidator();
    categoryValidator.id = category.id;
    categoryValidator.name = category.name;
    categoryValidator.color = category.color;
    const verifiedCategory = await validateData(categoryValidator);
    circuitValidator.category = verifiedCategory;
    
    const validatedPois = await validatePoisArray(pois);
    circuitValidator.pois = validatedPois;
  
    return circuitValidator;
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
  
    const { name, picture, description, price,  city, category, pois } = circuit;
    const circuitValidator = new CircuitValidator();
    circuitValidator.name = name && name.length > 0 ? name.trim() : "";
    circuitValidator.picture = picture && picture.length > 0 ? picture.trim() : "";
    circuitValidator.description = description && description.length > 0 ? description.trim() : "";
    circuitValidator.price = price;
    await validateData(circuitValidator);
  
    const cityValidator = new CityValidator();
    cityValidator.id = city.id;
    cityValidator.name = city.name;
    cityValidator.latitude = city.latitude;
    cityValidator.longitude = city.longitude;
    cityValidator.picture = city.picture;
    const verifiedCity = await validateData(cityValidator);
    circuitValidator.city = verifiedCity;
  
    const categoryValidator = new CategoryValidator();
    categoryValidator.id = category.id;
    categoryValidator.name = category.name;
    categoryValidator.color = category.color;
    const verifiedCategory = await validateData(categoryValidator);
    circuitValidator.category = verifiedCategory;
    
    const validatedPois = await validatePoisArray(pois);
    circuitValidator.pois = validatedPois;
  
    return circuitValidator;
  };
  