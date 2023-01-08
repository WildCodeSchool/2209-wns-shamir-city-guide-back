import "reflect-metadata";
import { validateIdInput, validateNameInput } from "../../../validator/common.validator";
import { CustomError } from "../../../utils/error/CustomError.utils.error";
import { StatusCode, StatusCodeClass, StatusCodeMessage } from "../../../utils/constants.utils";


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

    it("Should return an error 422 Unprocessable Entity", async () => {
        try {
            await validateNameInput("");
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("La longueur du prénom est trop courte. La longueur minimale est de 1 caractère, mais la valeur actuelle est de 0");
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
        }
    })
})