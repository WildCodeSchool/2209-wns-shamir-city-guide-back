import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import configuration from "../config/index";
import { UserRepository } from "../repository/user.repository";
import { CustomError } from "../utils/error/CustomError.utils.error";
import { handleUserError, UserErrorsFlag } from "../utils/error/handleError/user.utils.error";
import { ForbiddenError, InternalServerError, UnauthorizedError } from "../utils/error/interfaces.utils.error";
import { AuthenticatedUserType } from "../utils/type/user.utils.type";
import { StatusCodeMessage } from "../utils/constants.utils";
import { UserValidator } from "../validator/entity/user.validator.entity";
import Role from "../entity/Role.entity";


/**
 * Log a user 
 * @param {UserValidator} data the credentials in order to login the user
 * @returns AuthenticatedUserType the loggued user with a token
 */
export const login = async (data: UserValidator): Promise<AuthenticatedUserType> => {
    try {
        const getUserByEmail = await UserRepository.findOneBy({ email: data.email });
        if (getUserByEmail === null) throw new Error(UserErrorsFlag.EMAIL_NOT_FOUND);
        
        const isCorrectPwd = await verifyPassword(data.password, getUserByEmail.hashedPassword);
        if (isCorrectPwd) {
            let roles: Role[] | undefined = getUserByEmail.roles ? getUserByEmail.roles : []; 
            const userPayload = {
                id: getUserByEmail.id,
                username: getUserByEmail.username,
                email: getUserByEmail.email,
                roles: roles
            }
            return {...userPayload, token: signJwt(userPayload)};
        } else {
            throw new Error(StatusCodeMessage.UNAUTHORIZED);
        }
        
    } catch (e) {
        if(e instanceof Error && e.message === UserErrorsFlag.EMAIL_NOT_FOUND) handleUserError(UserErrorsFlag.EMAIL_NOT_FOUND, data.email);

        if(e instanceof Error && e.message === StatusCodeMessage.UNAUTHORIZED) throw new CustomError(
            new UnauthorizedError(), 
            `Vos identifiants ne sont pas corrects`
        );

        throw new CustomError(
            new InternalServerError(), 
            `Problème de connexion interne, l'utilisateur n'a pas été chargé`
        );
    }
};

/**
 * Return true if the password in parameter is the same as the hashed password in parameter as well.
 * @param password password
 * @param hashedPassword hashed password
 * @returns
 */
export const verifyPassword = async (password: string, hashedPassword: string) => 
    await argon2.verify(hashedPassword, password);
    
/**
 * Return a signed payload.
 * @param payload payload to sign
 * @returns
 */
export const signJwt = (payload: any) => {
    if (configuration?.jwt_secret_key === undefined) {
        throw new Error();
    }

    return jwt.sign(payload, configuration.jwt_secret_key, {
        expiresIn: "10h",
    });
}

/**
 * Return the token payload from the token in parameter.
 * @param token token to verify
 * @returns
 */
export const verifyToken = (token: string) => {
    if (configuration?.jwt_secret_key === undefined) {
        throw new Error();
    }
    
    try {
        return jwt.verify(token, configuration.jwt_secret_key);
    } catch (e) {
        throw new Error();
    }
}

export const hasRole = async (id: number, requiredRoles: string[]) => {
    // Récup le user en DB
    const user = await UserRepository.findOneBy({id});
    
    // Vérifier les rôles
    if (
        user !== null && 
        user?.roles !== undefined &&
        user.roles.length > 0
    ) {
        for (let i = 0; i < user.roles.length; i++) {
            if (requiredRoles.includes(user.roles[i].name)) return true;
        }
    }

    if (user?.roles !== undefined && user?.roles.length > 0) {
        throw new CustomError(
            new ForbiddenError(), 
            "Vous n'avez pas le droit d'accèder à cette ressource"
        );
    }
            
    // Renvoyer vrai ou faux
    return false;
}
