import { InputType } from "type-graphql";
import { Min, MinLength, MaxLength, Matches, IsOptional } from "class-validator";
import { TypeErrorValidator } from "../messages.validator";
import { validateData } from "../validate.validator";
import { TypeType } from "../../types/type.type";
import { CustomError } from "../../utils/errors/CustomError.utils.error";
import { BadRequestError } from "../../utils/errors/interfaces.utils.error";


@InputType()
export class TypeValidator  {
    @IsOptional()
    @Min(1, {
        message: TypeErrorValidator.ID_EQUAL_0
    })
    id: number

    @MinLength(1, {
        message: TypeErrorValidator.NAME_TOO_SHORT
    })
    @MaxLength(255, {
        message: TypeErrorValidator.NAME_TOO_LONG
    })
    name: string
    
    @MinLength(1, {
        message: TypeErrorValidator.LOGO_TOO_SHORT
    })
    logo: string
    
    @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
        message: TypeErrorValidator.COLOR_WRONG_FORMAT
    })
    color: string
}


/**
 * Checks the validity of the type data during creation
 * @param {TypeType} type the type 
 * @returns <TypeValidator> the verified type 
 * @throws Error: 400 Bad Request | 422 Unprocessable Entity
*/
export const validateCreationTypeInput = async (type: TypeType): Promise<TypeValidator> => {
    if (Object.keys(type).includes("id")) {
        throw new CustomError(new BadRequestError(), TypeErrorValidator.ID_NOT_REQUIRED);
    }
    
    return await setTypeValidator(type);
}


/**
 * Checks the validity of the type data during update
 * @param {TypeType} type the type 
 * @returns <TypeValidator> the verified data
 * @throws Error: 400 Bad Request | 422 Unprocessable Entity
*/
export const validateUpdateTypeInput = async (type: TypeType): Promise<TypeValidator> => {
    if (!Object.keys(type).includes("id")) {
        throw new CustomError(new BadRequestError(), TypeErrorValidator.ID_REQUIRED);
    }
    
    return await setTypeValidator(type);
}

const setTypeValidator = async (type: TypeType): Promise<TypeValidator> => {
    let id = null;
    if (type.id !== null) id = type.id;
    const { name, logo, color } = type;
    
    const typeValidator = new TypeValidator();
    if (id !== null) typeValidator.id = id;
    typeValidator.name = name && name.length > 0 ? name.trim() : "";
    typeValidator.logo = logo && logo.length > 0 ? logo.trim() : "";
    typeValidator.color = color && color.length > 0 ? color.trim() : "";
  
    return await validateData(typeValidator);
  }
  