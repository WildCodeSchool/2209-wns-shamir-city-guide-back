import { Min, MinLength, MaxLength, IsOptional } from "class-validator";
import { RoleErrorValidator } from "../messages.validator";
import { RoleType } from "../../types/role.type";
import { validateData } from "../validate.validator";
import { CustomError } from "../../utils/errors/CustomError.utils.error";
import { BadRequestError } from "../../utils/errors/interfaces.utils.error";

export class RoleValidator {
  @IsOptional()
  @Min(1, {
    message: RoleErrorValidator.ID_EQUAL_0,
  })
  id: number;

  @MinLength(1, {
    message: RoleErrorValidator.NAME_TOO_SHORT,
  })
  @MaxLength(255, {
    message: RoleErrorValidator.NAME_TOO_LONG,
  })
  name: string;
}

/**
 * Checks the validity of the role data during creation
 * @param {RoleType} role the role
 * @returns <RoleValidator> the verified role
 * @throws Error: 400 Bad Request | 422 Unprocessable Entity
 */
export const validateCreationRoleInput = async (
  role: RoleType
): Promise<RoleValidator> => {
  if (Object.keys(role).includes("id")) {
    throw new CustomError(
      new BadRequestError(),
      RoleErrorValidator.ID_NOT_REQUIRED
    );
  }

  return await setRoleValidator(role);
};

/**
 * Checks the validity of the role data during update
 * @param {RoleType} role the role
 * @returns <RoleValidator> the verified data
 * @throws Error: 400 Bad Request | 422 Unprocessable Entity
 */
export const validateUpdateRoleInput = async (
  role: RoleType
): Promise<RoleValidator> => {
  if (!Object.keys(role).includes("id")) {
    throw new CustomError(new BadRequestError(), RoleErrorValidator.ID_REQUIRED);
  }

  return await setRoleValidator(role);
};


/**
 * Checks the validity of the roles data in array of roles
 * @param {RoleValidator[]} roles the roles array
 * @returns <RoleValidator[]> the verified data
 * @throws Error: 400 Bad Request | 422 Unprocessable Entity
 */
export const validateRoleArrayInput = async (roles: RoleValidator[]): Promise<RoleValidator[]> => {
  for (let i = 0; i < roles.length; i++) {
    if (!Object.keys(roles[i]).includes("id")) {
      throw new CustomError(new BadRequestError(), RoleErrorValidator.ID_REQUIRED);
    }
    
    await setRoleValidator(roles[i]);
  } 

  return roles;
};

const setRoleValidator = async (role: RoleType): Promise<RoleValidator> => {
  let id = null;
  if (role.id !== null) id = role.id;
  const { name } = role;
  
  const roleValidator = new RoleValidator();
  if (id !== null) roleValidator.id = id;
  roleValidator.name = name && name.length > 0 ? name.trim() : "";

  return await validateData(roleValidator);
}
