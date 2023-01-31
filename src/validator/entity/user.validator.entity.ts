import { InputType } from "type-graphql";
import { Min, MinLength, MaxLength, Matches, IsOptional } from "class-validator";
import { UserErrorValidator } from "../messages.validator";
import { validateData } from "../validate.validator";
import { UserType } from "../../utils/type/user.utils.type";
import { CustomError } from "../../utils/error/CustomError.utils.error";
import { BadRequestError } from "../../utils/error/interfaces.utils.error";


@InputType()
export class UserValidator  {
    @IsOptional()
    @Min(1, {
        message: UserErrorValidator.ID_EQUAL_0
    })
    id: number

    @MinLength(1, {
        message: UserErrorValidator.USERNAME_TOO_SHORT
    })
    @MaxLength(255, {
        message: UserErrorValidator.USERNAME_TOO_LONG
    })
    username: string
    
    @Matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, {
        message: UserErrorValidator.EMAIL_WRONG_FORMAT
    })
    @MaxLength(255, {
        message: UserErrorValidator.EMAIL_TOO_LONG
    })
    email: string
    
    @IsOptional()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&-_]{8,}$/, {
        message: UserErrorValidator.PASSWORD_WRONG_FORMAT
    })
    password: string
}


/**
 * Checks the validity of the user data during creation
 * @param {UserType} type the type 
 * @returns <UserValidator> the verified user 
 * @throws Error: 400 Bad Request | 422 Unprocessable Entity
*/
export const validateCreationUserInput = async (user: UserType): Promise<UserValidator> => {
    if (Object.keys(user).includes("id")) {
        throw new CustomError(new BadRequestError(), UserErrorValidator.ID_NOT_REQUIRED);
    }

    if (!Object.keys(user).includes("password")) {
        throw new CustomError(new BadRequestError(), UserErrorValidator.PASSWORD_REQUIRED);
    }

    const { username, email, password } = user;
    const userValidator = new UserValidator();
    userValidator.username = username && username.length > 0 ? username.trim() : '';
    userValidator.email = email && email.length > 0 ? email.trim() : '';
    userValidator.password = password && password.length > 0 ? password.trim() : '';
    return await validateData(userValidator);
}


/**
 * Checks the validity of the user data during update
 * @param {UserType} user the user 
 * @returns <UserValidator> the verified data
 * @throws Error: 400 Bad Request | 422 Unprocessable Entity
*/
export const validateUpdateUserInput = async (user: UserType): Promise<UserValidator> => {
    if (!Object.keys(user).includes("id")) {
        throw new CustomError(new BadRequestError(), UserErrorValidator.ID_REQUIRED);
    }

    const { id, username, email, password } = user;
    const userValidator = new UserValidator();
    userValidator.id = id;
    userValidator.username = username && username.length > 0 ? username.trim() : '';
    userValidator.email = email && email.length > 0 ? email.trim() : '';
    return await validateData(userValidator);
} 

/**
 * Checks the validity of the user data during authentication/login
 * @param {UserType} user the user with a password
 * @returns <UserValidator> the verified data
 * @throws Error: 400 Bad Request | 422 Unprocessable Entity
*/
export const validateLoginUserInput = async (user: UserType): Promise<UserValidator> => {
    if (Object.keys(user).includes("id")) {
        throw new CustomError(new BadRequestError(), UserErrorValidator.ID_NOT_REQUIRED);
    }

    if (!Object.keys(user).includes("password")) {
        throw new CustomError(new BadRequestError(), UserErrorValidator.PASSWORD_REQUIRED);
    }

    const { id, username, email, password } = user;
    const userValidator = new UserValidator();
    userValidator.id = id;
    userValidator.username = username && username.length > 0 ? username.trim() : '';
    userValidator.email = email && email.length > 0 ? email.trim() : '';
    userValidator.password = password && password.length > 0 ? password.trim() : '';
    return await validateData(userValidator);
} 