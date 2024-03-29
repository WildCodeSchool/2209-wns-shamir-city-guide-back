import "reflect-metadata";
import { validateIdInput, validateNameInput, validateEmailInput } from "../../../validators/common.validator";
import { CustomError } from "../../../utils/errors/CustomError.utils.error";
import { StatusCode, StatusCodeClass, StatusCodeMessage } from "../../../utils/constants.utils";
import { CommonErrorValidator } from "../../../validators/messages.validator";


describe("unit/validator/common.validator suite of tests", () => {
    it("Should return 1", async () => {
        const result = await validateIdInput(1);
        expect(result).toBe(1);
        expect(typeof result === "number").toBe(true);
    })

    it("Should return test", async () => {
        const result = await validateNameInput("test");
        expect(result).toBe("test");
        expect(typeof result === "string").toBe(true);
    })

    it("Should return test", async () => {
        const result = await validateEmailInput("test@gmail.com");
        expect(result).toBe("test@gmail.com");
        expect(typeof result === "string").toBe(true);
    })

    it("Should return an error 422 Unprocessable Entity", async () => {
        try {
            await validateNameInput("");
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CommonErrorValidator.NAME_TOO_SHORT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
        }
    })

    it("Should return an error 422 Unprocessable Entity", async () => {
        try {
            await validateEmailInput("");
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CommonErrorValidator.EMAIL_WRONG_FORMAT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
        }
    })
})