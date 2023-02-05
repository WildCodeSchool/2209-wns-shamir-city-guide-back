import { StatusCodeClass, StatusCodeMessage, StatusCode } from "../constants.utils";

/* CLASS FOR ERRORS RETURNED TO THE CLIENT */
export interface IError {
    statusCodeClass: string
    statusCodeMessage: string
    statusCode: number
}

export class BadRequestError implements IError {
    statusCodeClass: string = StatusCodeClass.CLIENT_ERROR
    statusCodeMessage: string = StatusCodeMessage.BAD_REQUEST
    statusCode: number = StatusCode.BAD_REQUEST
}

export class UnauthorizedError implements IError {
    statusCodeClass: string = StatusCodeClass.CLIENT_ERROR
    statusCodeMessage: string = StatusCodeMessage.UNAUTHORIZED
    statusCode: number = StatusCode.UNAUTHORIZED
}

export class ForbiddenError implements IError {
    statusCodeClass: string = StatusCodeClass.CLIENT_ERROR
    statusCodeMessage: string = StatusCodeMessage.FORBIDDEN
    statusCode: number = StatusCode.FORBIDDEN
}

export class NotFoundError implements IError {
    statusCodeClass: string = StatusCodeClass.CLIENT_ERROR
    statusCodeMessage: string = StatusCodeMessage.NOT_FOUND
    statusCode: number = StatusCode.NOT_FOUND
}

export class UnprocessableEntityError implements IError {
    statusCodeClass: string = StatusCodeClass.CLIENT_ERROR
    statusCodeMessage: string = StatusCodeMessage.UNPROCESSABLE_ENTITY
    statusCode: number = StatusCode.UNPROCESSABLE_ENTITY
}

export class InternalServerError implements IError {
    statusCodeClass: string = StatusCodeClass.SERVER_ERROR
    statusCodeMessage: string = StatusCodeMessage.INTERNAL_SERVER_ERROR
    statusCode: number = StatusCode.INTERNAL_SERVER_ERROR
}
