import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import configuration from "../config/index";
import { UserRepository } from "../repositories/user.repository";
import { CustomError } from "../utils/errors/CustomError.utils.error";
import { UserErrorsFlag } from "../utils/errors/handleError/user.utils.error";
import { ForbiddenError, InternalServerError } from "../utils/errors/interfaces.utils.error";
import { AuthenticatedUserType } from "../types/user.type";
import { StatusCodeMessage } from "../utils/constants.utils";
import { handleAuthenticationError } from "../utils/errors/handleError/authentication.utils.error";
import { UserValidator } from "../validators/entities/user.validator.entity";
import Role from "../entities/Role.entity";
import User from "../entities/User.entity";
import { formatString } from "../utils/string.utils";


/**
 * Log a user 
 * @param {UserValidator} data the credentials in order to login the user
 * @returns AuthenticatedUserType the loggued user with a token
 */
export const login = async (data: UserValidator): Promise<AuthenticatedUserType> => {
    try {
        const getUserByEmail: User | null = await UserRepository.findOneBy({ email: data.email });
        if (getUserByEmail === null && getUserByEmail !== undefined) throw new Error(UserErrorsFlag.EMAIL_NOT_FOUND);
        const getUserByName: User | null = await UserRepository.findOneBy({ username: formatString(data.username) });
        if (getUserByName === null && getUserByName !== undefined) throw new Error(UserErrorsFlag.USERNAME_NOT_FOUND);

        const isCorrectPwd = await verifyPassword(data.password, getUserByEmail.hashedPassword);
        if (isCorrectPwd) {
            let roles: Role[] | undefined = getUserByEmail.roles ? getUserByEmail.roles : []; 
            const userPayload = {
                id: getUserByEmail.id,
                username: getUserByEmail.username,
                email: getUserByEmail.email,
                roles: roles
            }
            const userTokenPayload = {
                id: getUserByEmail.id,
                username: getUserByEmail.username,
                email: getUserByEmail.email
            }
            return {...userPayload, token: signJwt(userTokenPayload)};
        } else {
            throw new Error(StatusCodeMessage.UNAUTHORIZED);
        }
        
    } catch (e) {
        console.log("Authentication error =>", e);
        if(e instanceof Error) handleAuthenticationError(e, data);

        throw new CustomError(
            new InternalServerError(), 
            `Problème de connexion interne, l'utilisateur ${data.username} n'a pas pu se connecter`
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
        expiresIn: "1day",
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
