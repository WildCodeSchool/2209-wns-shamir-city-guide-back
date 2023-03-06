import "reflect-metadata";
import { Min, Max, Length, Contains, IsInt, IsEmail, IsDate } from "class-validator";
import { StatusCode, StatusCodeClass, StatusCodeMessage, strTooLong } from "../../../utils/constants.utils";
import { IdValidator, NameValidator } from "../../../validators/common.validator";
import { CustomError } from "../../../utils/errors/CustomError.utils.error";
import { validateData } from "../../../validators/validate.validator";
import { CommonErrorValidator } from "../../../validators/messages.validator";


describe("unit/validator/validate.validator suite of tests", () => {
    it('Should return number passed in argument', async () => {
        const test1 = await validateData(1),
        test2 = await validateData(2),
        test3 = await validateData(5),
        test4 = await validateData(10),
        test5 = await validateData(100);

        expect(test1).toBe(1);
        expect(test2).toBe(2);
        expect(test3).toBe(5);
        expect(test4).toBe(10);
        expect(test5).toBe(100);
        expect(test1).toStrictEqual(1);
        expect(test2).toStrictEqual(2);
        expect(test3).toStrictEqual(5);
        expect(test4).toStrictEqual(10);
        expect(test5).toStrictEqual(100);

        expect(test1).not.toBe(2);
        expect(test2).not.toBe(5);       
        expect(test3).not.toBe(10);
        expect(test4).not.toBe(100);    
        expect(test5).not.toBe(0);
    });

    it('Should return IdValidator object when when we try to validate an id instanceof IdValidator', async () => {
        const idValidator1 = new IdValidator();
        idValidator1.id = 1;
        const validate1 = await validateData(idValidator1);
        expect(validate1).toBe(idValidator1);
        expect(validate1.id).toBe(1);
        expect(validate1 instanceof IdValidator).toBe(true);

        const idValidator2 = new IdValidator();
        idValidator2.id = 2;
        const validate2 = await validateData(idValidator2);
        expect(validate2).toBe(idValidator2);
        expect(validate2.id).toBe(2);
        expect(validate2 instanceof IdValidator).toBe(true);

        const idValidator3 = new IdValidator();
        idValidator3.id = 5;
        const validate3 = await validateData(idValidator3);
        expect(validate3).toBe(idValidator3);
        expect(validate3.id).toBe(5);
        expect(validate3 instanceof IdValidator).toBe(true);

        const idValidator4 = new IdValidator();
        idValidator4.id = 10;
        const validate4 = await validateData(idValidator4);
        expect(validate4).toBe(idValidator4);
        expect(validate4.id).toBe(10);
        expect(validate4 instanceof IdValidator).toBe(true);

        const idValidator5 = new IdValidator();
        idValidator5.id = 100;
        const validate5 = await validateData(idValidator5);
        expect(validate5).toBe(idValidator5);
        expect(validate5.id).toBe(100);
        expect(validate5 instanceof IdValidator).toBe(true); 
    });

    it('Should return error 422 Unprocessable Entity when we try to validate an IdValidator id equal to 0', async () => {
        const idValidator = new IdValidator();
        idValidator.id = 0;
        try {
            await validateData(idValidator);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CommonErrorValidator.ID_EQUAL_0);
                expect(e.message).toEqual(CommonErrorValidator.ID_EQUAL_0);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            expect(e).toBeDefined();
        }
    });

    it('Should return string passed in argument', async () => {
        const test1 = await validateData("str1"),
        test2 = await validateData("str2"),
        test3 = await validateData("s t r 3"),
        test4 = await validateData(""),
        test5 = await validateData("   g  ");

        expect(test1).toBe("str1");
        expect(test2).toBe("str2");
        expect(test3).toBe("s t r 3");
        expect(test4).toBe("");
        expect(test5).toBe("   g  ");
        expect(test1).toStrictEqual("str1");
        expect(test2).toStrictEqual("str2");
        expect(test3).toStrictEqual("s t r 3");
        expect(test4).toStrictEqual("");
        expect(test5).toStrictEqual("   g  ");

        expect(test1).not.toBe("not this string");
        expect(test2).not.toBe("5");       
        expect(test3).not.toBe("no result");
        expect(test4).not.toBe("  ");    
        expect(test5).not.toBe("");
    });

    it('Should return NameValidator object when when we try to validate a name instanceof NameValidator wich is not empty', async () => {
        const nameValidator1 = new NameValidator();
        nameValidator1.name = "a name";
        const validate1 = await validateData(nameValidator1);
        expect(validate1).toBe(nameValidator1);
        expect(validate1.name).toBe("a name");
        expect(validate1 instanceof NameValidator).toBe(true);

        const nameValidator2 = new NameValidator();
        nameValidator2.name = "an other name";
        const validate2 = await validateData(nameValidator2);
        expect(validate2).toBe(nameValidator2);
        expect(validate2.name).toBe("an other name");
        expect(validate2 instanceof NameValidator).toBe(true);

        const nameValidator3 = new NameValidator();
        nameValidator3.name = "s t r 3";
        const validate3 = await validateData(nameValidator3);
        expect(validate3).toBe(nameValidator3);
        expect(validate3.name).toBe("s t r 3");
        expect(validate3 instanceof NameValidator).toBe(true);

        const nameValidator4 = new NameValidator();
        nameValidator4.name = "   ";
        const validate4 = await validateData(nameValidator4);
        expect(validate4).toBe(nameValidator4);
        expect(validate4.name).toBe("   ");
        expect(validate4 instanceof NameValidator).toBe(true);

        const nameValidator5 = new NameValidator();
        nameValidator5.name = "   g  ";
        const validate5 = await validateData(nameValidator5);
        expect(validate5).toBe(nameValidator5);
        expect(validate5.name).toBe("   g  ");
        expect(validate5 instanceof NameValidator).toBe(true);
    });

    it('Should return error 422 Unprocessable Entity when we try to validate an NameValidator name empty', async () => {
        const nameValidator = new NameValidator();
        nameValidator.name = "";
        try {
            await validateData(nameValidator);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CommonErrorValidator.NAME_TOO_SHORT);
                expect(e.message).toEqual(CommonErrorValidator.NAME_TOO_SHORT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            expect(e).toBeDefined();
        }
    });

    it('Should return error 422 Unprocessable Entity when we try to validate an NameValidator name to long', async () => {
        const nameValidator = new NameValidator();
        nameValidator.name = strTooLong;
        try {
            await validateData(nameValidator);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CommonErrorValidator.NAME_TOO_LONG);
                expect(e.message).toEqual(CommonErrorValidator.NAME_TOO_LONG);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            expect(e).toBeDefined();
        }
    });


    /**********************************************************************/
    // CLASS TEST
    class TestValidator {
        @Length(10, 20, {
            message: 'Le titre doit être de 10-20 characters'
        })
        title: string;
      
        @Contains('hello', {
            message: 'Le text doit contenir le mot hello'
        })
        text: string;
      
        @IsInt()
        @Min(0, {
            message: 'Le rating doit être un entier au moins égal à 0'
        })
        @Max(10, {
            message: 'Le rating doit être un entier inférieur à 10'
        })
        rating: number;
      
        @IsEmail()
        email: string;
      
        @IsDate({
            message: "La date doit avoir le format d'une date"
        })
        createDate: Date;
      }

      it('Should return Test passed in argument', async () => {
        const test = new TestValidator();
        test.title = "Un titre pour tester";
        test.text = "Un texte qui doit contenir hello";
        test.rating = 6;
        test.email = "unemaildetest@gmail.com";
        const now = new Date();
        test.createDate = now;

        const validateTest = await validateData(test);

        expect(validateTest).toBeDefined();
        expect(validateTest instanceof TestValidator).toBe(true);
        expect(validateTest.title).toBe("Un titre pour tester");
        expect(validateTest.text).toBe("Un texte qui doit contenir hello");
        expect(validateTest.rating).toBe(6);
        expect(validateTest.email).toBe("unemaildetest@gmail.com");
        expect(validateTest.createDate).toBe(now);
    });

    it('Should return error 422 Unprocessable Entity due to a title too short', async () => {
        const test = new TestValidator();
        test.title = "titre";
        test.text = "Un texte qui doit contenir hello";
        test.rating = 6;
        test.email = "unemaildetest@gmail.com";
        const now = new Date();
        test.createDate = now;

        try {
            await validateData(test);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le titre doit être de 10-20 characters");
                expect(e.message).toEqual("Le titre doit être de 10-20 characters");
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            expect(e).toBeDefined();
        }
    });

    it('Should return error 422 Unprocessable Entity due to a title too long', async () => {
        const test = new TestValidator();
        test.title = "titre really really really too long";
        test.text = "Un texte qui doit contenir hello";
        test.rating = 6;
        test.email = "unemaildetest@gmail.com";
        const now = new Date();
        test.createDate = now;

        try {
            await validateData(test);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le titre doit être de 10-20 characters");
                expect(e.message).toEqual("Le titre doit être de 10-20 characters");
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            expect(e).toBeDefined();
        }
    });

    it("Should return error 422 Unprocessable Entity due to a text which doesn't contains 'hello'", async () => {
        const test = new TestValidator();
        test.title = "Un titre pour tester";
        test.text = "Un texte qui doit contenir mais ne contient pas le mot attendu";
        test.rating = 6;
        test.email = "unemaildetest@gmail.com";
        const now = new Date();
        test.createDate = now;

        try {
            await validateData(test);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le text doit contenir le mot hello");
                expect(e.message).toEqual("Le text doit contenir le mot hello");
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            expect(e).toBeDefined();
        }
    });

    it("Should return error 422 Unprocessable Entity due to a rating which is inferior to 0", async () => {
        const test = new TestValidator();
        test.title = "Un titre pour tester";
        test.text = "Un texte qui contient hello";
        test.rating = -1;
        test.email = "unemaildetest@gmail.com";
        const now = new Date();
        test.createDate = now;

        try {
            await validateData(test);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le rating doit être un entier au moins égal à 0");
                expect(e.message).toEqual("Le rating doit être un entier au moins égal à 0");
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            expect(e).toBeDefined();
        }
    });
    
    it("Should return error 422 Unprocessable Entity due to a rating which is superior to 10", async () => {
        const test = new TestValidator();
        test.title = "Un titre pour tester";
        test.text = "Un texte qui contient hello";
        test.rating = 11;
        test.email = "unemaildetest@gmail.com";
        const now = new Date();
        test.createDate = now;

        try {
            await validateData(test);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le rating doit être un entier inférieur à 10");
                expect(e.message).toEqual("Le rating doit être un entier inférieur à 10");
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            expect(e).toBeDefined();
        }
    });

    it("Should return error 422 Unprocessable Entity due to an email with an invalid syntax", async () => {
        const test = new TestValidator();
        test.title = "Un titre pour tester";
        test.text = "Un texte qui contient hello";
        test.rating = 6;
        test.email = "unemaildetest@gmail";
        const now = new Date();
        test.createDate = now;

        try {
            await validateData(test);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("email must be an email");
                expect(e.message).toEqual("email must be an email");
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            expect(e).toBeDefined();
        }
    });

    it("Should return error 422 Unprocessable Entity due to an email with an invalid syntax", async () => {
        const test = new TestValidator();
        test.title = "Un titre pour tester";
        test.text = "Un texte qui contient hello";
        test.rating = 6;
        test.email = "unemaildetestgmail";
        const now = new Date();
        test.createDate = now;

        try {
            await validateData(test);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("email must be an email");
                expect(e.message).toEqual("email must be an email");
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            expect(e).toBeDefined();
        }
    });
});