import "reflect-metadata";
import { 
    TypeValidator, 
    validateCreationTypeInput, 
    validateUpdateTypeInput 
} from "../../../validator/entity/type.validator.entity";
import { TypeErrorValidator } from "../../../validator/messages.validator";
import { CustomError } from "../../../utils/error/CustomError.utils.error";
import { BadRequestError, UnprocessableEntityError } from "../../../utils/error/interfaces.utils.error";
import { StatusCodeClass, StatusCodeMessage, StatusCode } from "../../../utils/constants.utils";


describe("unit/validator/type.validator suite of tests", () => {
    // CREATE TYPE
    it("Should return Type when we create a type with filled fields", async () => {
        const type = new TypeValidator();
        type.name = "a type name";
        type.logo = "a logo name";
        type.color = "#121212";
        const createdType = await validateCreationTypeInput(type);
        
        expect(createdType instanceof TypeValidator).toBe(true);
        expect(createdType.name).toBe("a type name");
        expect(createdType.logo).toBe("a logo name");
        expect(createdType.color).toBe("#121212");
    });

    it("Should return 422 Unprocessable Entity Error when we create a type with empty name", async () => {
        const type = new TypeValidator();
        type.name = "";
        type.logo = "a logo name";
        type.color = "#121212";

        try {
            await validateCreationTypeInput(type);           
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(TypeErrorValidator.NAME_TOO_SHORT);
                expect(e.message).toEqual(TypeErrorValidator.NAME_TOO_SHORT);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), TypeErrorValidator.NAME_TOO_SHORT))
        }
    });

    it("Should return 422 Unprocessable Entity Error when we create a type with empty logo", async () => {
        const type = new TypeValidator();
        type.name = "name";
        type.logo = "";
        type.color = "#121212";

        try {
            await validateCreationTypeInput(type);           
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(TypeErrorValidator.LOGO_TOO_SHORT);
                expect(e.message).toEqual(TypeErrorValidator.LOGO_TOO_SHORT);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), TypeErrorValidator.LOGO_TOO_SHORT))
        }
    });

    it("Should return 422 Unprocessable Entity Error when we create a type with empty color/wrong format", async () => {
        const type = new TypeValidator();
        type.name = "name";
        type.logo = "logo";
        type.color = "";

        try {
            await validateCreationTypeInput(type);           
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(TypeErrorValidator.COLOR_WRONG_FORMAT);
                expect(e.message).toEqual(TypeErrorValidator.COLOR_WRONG_FORMAT);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), TypeErrorValidator.COLOR_WRONG_FORMAT))
        }
    });

    it("Should trigger 400 Bad Request during the type creation when the id is present", async () => {
        const type = new TypeValidator();
        type.id = 10;
        type.name = "a type name";
        type.logo = "a logo name";
        type.color = "#121212";
        
        try {
            await validateCreationTypeInput(type);           
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`Oups!! Quelque chose s'est mal passé\n${TypeErrorValidator.ID_NOT_REQUIRED}`);
                expect(e.message).toEqual(`Oups!! Quelque chose s'est mal passé\n${TypeErrorValidator.ID_NOT_REQUIRED}`);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.BAD_REQUEST);
                expect(e.statusCode).toEqual(StatusCode.BAD_REQUEST);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.BAD_REQUEST);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.BAD_REQUEST);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new BadRequestError(), TypeErrorValidator.ID_NOT_REQUIRED))
        }
    });

    //UPDATE TYPE
    it("Should return Type when we update a type with filled fields", async () => {
        const type = new TypeValidator();
        type.id = 1;
        type.name = "a type name";
        type.logo = "a logo name";
        type.color = "#121212";
        const createdType = await validateUpdateTypeInput(type);
        
        expect(createdType instanceof TypeValidator).toBe(true);
        expect(createdType.name).toBe("a type name");
        expect(createdType.logo).toBe("a logo name");
        expect(createdType.color).toBe("#121212");
    });

    it("Should trigger 400 Bad Request during the type update when the id is not present", async () => {
        const type = new TypeValidator();
        type.name = "a type name";
        type.logo = "a logo name";
        type.color = "#121212";
        
        try {
            await validateUpdateTypeInput(type);           
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`Oups!! Quelque chose s'est mal passé\n${TypeErrorValidator.ID_REQUIRED}`);
                expect(e.message).toEqual(`Oups!! Quelque chose s'est mal passé\n${TypeErrorValidator.ID_REQUIRED}`);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.BAD_REQUEST);
                expect(e.statusCode).toEqual(StatusCode.BAD_REQUEST);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.BAD_REQUEST);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.BAD_REQUEST);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new BadRequestError(), TypeErrorValidator.ID_REQUIRED))
        }
    });

    it("Should return 422 Unprocessable Entity Error when we update a type with empty name", async () => {
        const type = new TypeValidator();
        type.id = 1;
        type.name = "";
        type.logo = "logo";
        type.color = "#121212";

        try {
            await validateUpdateTypeInput(type);           
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(TypeErrorValidator.NAME_TOO_SHORT);
                expect(e.message).toEqual(TypeErrorValidator.NAME_TOO_SHORT);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), TypeErrorValidator.NAME_TOO_SHORT))
        }
    });

    it("Should return 422 Unprocessable Entity Error when we update a type with empty logo", async () => {
        const type = new TypeValidator();
        type.id = 1;
        type.name = "name";
        type.logo = "";
        type.color = "#121212";

        try {
            await validateUpdateTypeInput(type);           
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(TypeErrorValidator.LOGO_TOO_SHORT);
                expect(e.message).toEqual(TypeErrorValidator.LOGO_TOO_SHORT);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), TypeErrorValidator.LOGO_TOO_SHORT))
        }
    });

    it("Should return 422 Unprocessable Entity Error when we update a type with empty color/wrong format", async () => {
        const type = new TypeValidator();
        type.id = 1;
        type.name = "name";
        type.logo = "logo";
        type.color = "";

        try {
            await validateUpdateTypeInput(type);           
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(TypeErrorValidator.COLOR_WRONG_FORMAT);
                expect(e.message).toEqual(TypeErrorValidator.COLOR_WRONG_FORMAT);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), TypeErrorValidator.COLOR_WRONG_FORMAT))
        }
    });
});
