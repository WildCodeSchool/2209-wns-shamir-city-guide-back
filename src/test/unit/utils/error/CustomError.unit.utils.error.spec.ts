import { CustomError } from "../../../../utils/error/CustomError.utils.error";
import * as Errors from "../../../../utils/error/interfaces.utils.error";
import { StatusCode, StatusCodeClass, StatusCodeMessage } from "../../../../utils/constants.utils";
import { 
  emojiOups, 
  emojiShocked, 
  emojiUnhappy, 
  emojiEnraged, 
  emojiFurious, 
  emojiSurprised,
  emojiWarning,
  emojiForbidden
} from "../../../../utils/emoji.utils";

describe("unit/CustomError.utils.validator suite of tests", () => {
    it("Should return Custom Error => 400 BadRequestError", async () => {
        const customError = new CustomError(new Errors.BadRequestError(), "Bad request");
        expect(customError instanceof CustomError).toBe(true);
        expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
        expect(customError.statusCode).toBe(StatusCode.BAD_REQUEST);
        expect(customError.statusCodeMessage).toBe(StatusCodeMessage.BAD_REQUEST);
        expect(customError.message).toBe("Ouups!!Something went wrong" + "\nBad request");
        expect(customError.emoji).toBe(emojiOups + emojiShocked);
    });
    
    it("Should return Custom Error => 401 UnauthorizedError", async () => {
        const customError = new CustomError(new Errors.UnauthorizedError(), "Unauthorized");
        expect(customError instanceof CustomError).toBe(true);
        expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
        expect(customError.statusCode).toBe(StatusCode.UNAUTHORIZED);
        expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNAUTHORIZED);
        expect(customError.message).toBe("Unauthorized");
        expect(customError.emoji).toBe(emojiFurious + emojiForbidden + emojiEnraged);
    });
    
    it("Should return Custom Error => 403 ForbiddenError", async () => {
        const customError = new CustomError(new Errors.ForbiddenError(), "Forbidden");
        expect(customError instanceof CustomError).toBe(true);
        expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
        expect(customError.statusCode).toBe(StatusCode.FORBIDDEN);
        expect(customError.statusCodeMessage).toBe(StatusCodeMessage.FORBIDDEN);
        expect(customError.message).toBe("Forbidden");
        expect(customError.emoji).toBe(emojiFurious + emojiForbidden + emojiEnraged);
    });
    
    it("Should return Custom Error => 404 NotFoundError", async () => {
        const customError = new CustomError(new Errors.NotFoundError(), "Not Found");
        expect(customError instanceof CustomError).toBe(true);
        expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
        expect(customError.statusCode).toBe(StatusCode.NOT_FOUND);
        expect(customError.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
        expect(customError.message).toBe("Not Found");
        expect(customError.emoji).toBe(emojiUnhappy + emojiSurprised);
    });
    
    it("Should return Custom Error => 422 UnprocessableEntityError", async () => {
        const customError = new CustomError(new Errors.UnprocessableEntityError(), "Unprocessable Entity");
        expect(customError instanceof CustomError).toBe(true);
        expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
        expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
        expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
        expect(customError.message).toBe("Unprocessable Entity");
        expect(customError.emoji).toBe(emojiUnhappy + emojiSurprised);
    });
    
    it("Should return Custom Error => 500 InternalError", async () => {
        const customError = new CustomError(new Errors.InternalServerError(), "Internal Server Error");
        expect(customError instanceof CustomError).toBe(true);
        expect(customError.statusCodeClass).toBe(StatusCodeClass.SERVER_ERROR);
        expect(customError.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);
        expect(customError.statusCodeMessage).toBe(StatusCodeMessage.INTERNAL_SERVER_ERROR);
        expect(customError.message).toBe(`${emojiShocked} Ouups!!Something went wrong\nInternal Server Error`);
        expect(customError.emoji).toBe(emojiShocked + emojiSurprised + emojiWarning);
    });
})
