import { validate } from "class-validator";
import { CustomError } from "../utils/errors/CustomError.utils.error";
import { UnprocessableEntityError } from "../utils/errors/interfaces.utils.error";


/**
 * Checks the validity of the data based on the class @InputType() provided by type-graphql
 * @param {T} data the passed data
 * @returns <T> the verified data | throw error 422 Unprocessable Entity
*/
export const validateData = async <T>(data: T): Promise<T> => {
    let errorMessage = '';
    
    if (data) {
        try { 
            const foundErrors = await validate(data); 
                                               
            if (foundErrors.length > 0) {
                const firstError = foundErrors[0].constraints;
                if (firstError) {
                    errorMessage = Object.values(firstError)[0];
                    throw new Error("error-validation")
                } 
            } 
        } catch (e) {
            if (e instanceof Error && e.message === "error-validation") {
                throw new CustomError(new UnprocessableEntityError(), errorMessage);
            }
        }
    } 
    return data;
}