import "reflect-metadata";
import { IdValidator, NameValidator, validateIdInput } from "../../../validator/common.validator";
import { TagCreationValidator, TagUpdateValidator } from "../../../validator/entity/tag.validator.entity";
import { 
    idEqual0ErrorMessage,
    nameTooShortErrorMessage,
    nameTooLongErrorMessage,
    iconTooLongErrorMessage
} from "../../../validator/messages.validator";
import { CustomError } from "../../../utils/error/CustomError.utils.error";
import { UnprocessableEntityError } from "../../../utils/error/interfaces.utils.error";
import { StatusCodeClass, StatusCodeMessage, StatusCode, strTooLong } from "../../../utils/constants.utils";


describe("unit/validator/tag.validator suite of tests", () => {
    // GET TAG BY ID
    it("Should return 'compliant data' when id is superior to 0", async () => {
        const test = await validateIdInput(1);
        
        expect(test).toBe(1);
        expect(test).toEqual(1);
    });
    
    // it('Should trigger error when is equal to 0', async () => {
    //     let tag = new TagByIdInput();
    //     tag.id = 0;
    //     try {
    //         await validateTagInput(FunctionsFlag.GETBYID, tag);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe(idEqual0Error);
    //             expect(e.message).toEqual(idEqual0Error);
    //             expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), idEqual0Error))
    //     }
    // });
    
    // // GET TAG BY NAME
    // it("Should return 'compliant data' when name length is superior to 0", async () => {
    //     let tag = new TagByNameInput();
    //     tag.name = "Promenade";
    //     const test = await validateTagInput(FunctionsFlag.GETBYNAME, tag);
        
    //     expect(test).toBe("compliant data");
    //     expect(test).toEqual("compliant data");
    //     expect(test).toMatch(/compliant data/);
    // });
    
    // it('Should trigger error when name length is equal to 0', async () => {
    //     let tag = new TagByNameInput();
    //     tag.name = "";
    //     try {
    //         await validateTagInput(FunctionsFlag.GETBYNAME, tag);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe(nameTooShortErrorMessage);
    //             expect(e.message).toEqual(nameTooShortErrorMessage);
    //             expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), nameTooShortErrorMessage))
    //     }
    // }); 
    
    // it('Should trigger error when name length is superior to 255 characters', async () => {
    //     let tag = new TagByNameInput();
    //     tag.name = strTooLong;
    //     try {
    //         await validateTagInput(FunctionsFlag.GETBYNAME, tag);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe(nameTooLongErrorMessage);
    //             expect(e.message).toEqual(nameTooLongErrorMessage);
    //             expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), nameTooLongErrorMessage))
    //     }
    // });
    
    // // CREATE TAG
    // it("Should return 'compliant data' when we create a tag with filled fields", async () => {
    //     let tag = new TagCreationInput();
    //     tag.name = "a tag name";
    //     tag.icon = "an icon name"
    //     const test = await validateTagInput(FunctionsFlag.CREATE, tag);
        
    //     expect(test).toBe("compliant data");
    //     expect(test).toEqual("compliant data");
    //     expect(test).toMatch(/compliant data/);
    // });
    
    // it("Should return 'compliant data' when we create a tag with non-empty name and empty icon", async () => {
    //     let tag = new TagCreationInput();
    //     tag.name = "a tag name";
    //     tag.icon = ""
    //     const test = await validateTagInput(FunctionsFlag.CREATE, tag);
        
    //     expect(test).toBe("compliant data");
    //     expect(test).toEqual("compliant data");
    //     expect(test).toMatch(/compliant data/);
    // });
    
    // it('Should trigger error when name length is equal to 0', async () => {
    //     let tag = new TagCreationInput();
    //     tag.name = "";
    //     tag.icon = "an icon name"
    //     try {
    //         await validateTagInput(FunctionsFlag.CREATE, tag);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe(nameTooShortErrorMessage);
    //             expect(e.message).toEqual(nameTooShortErrorMessage);
    //             expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), nameTooShortErrorMessage))
    //     }
    // }); 
    
    // it('Should trigger error when name length is superior to 255 characters', async () => {
    //     let tag = new TagCreationInput();
    //     tag.name = strTooLong;
    //     tag.icon = "an icon name"
    //     try {
    //         await validateTagInput(FunctionsFlag.CREATE, tag);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe(nameTooLongErrorMessage);
    //             expect(e.message).toEqual(nameTooLongErrorMessage);
    //             expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), nameTooLongErrorMessage))
    //     }
    // }); 
    
    // it('Should trigger error when icon length is superior to 255 characters', async () => {
    //     let tag = new TagCreationInput();
    //     tag.name = "a tag name";
    //     tag.icon = strTooLong;
    //     try {
    //         await validateTagInput(FunctionsFlag.CREATE, tag);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe(iconTooLongErrorMessage);
    //             expect(e.message).toEqual(iconTooLongErrorMessage);
    //             expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), iconTooLongErrorMessage))
    //     }
    // });
    
    // // UPDATE TAG
    // it("Should return 'compliant-data' when we update a tag with all filled fields", async () => {
    //     let tag = new TagUpdateInput();
    //     tag.id = 10;
    //     tag.name = "a tag name";
    //     tag.icon = "an icon name"
    //     const test = await validateTagInput(FunctionsFlag.UPDATE, tag);
        
    //     expect(test).toBe("compliant data");
    //     expect(test).toEqual("compliant data");
    //     expect(test).toMatch(/compliant data/);
    // });
    
    // it("Should return 'compliant data' when we create a tag with non-empty id and name and empty icon", async () => {
    //     let tag = new TagUpdateInput();
    //     tag.id = 10;
    //     tag.name = "a tag name";
    //     tag.icon = ""
    //     const test = await validateTagInput(FunctionsFlag.UPDATE, tag);
        
    //     expect(test).toBe("compliant data");
    //     expect(test).toEqual("compliant data");
    //     expect(test).toMatch(/compliant data/);
    // });
    
    // it('Should trigger error when id is equal to 0', async () => {
    //     let tag = new TagUpdateInput();
    //     tag.id = 0;
    //     tag.name = "";
    //     tag.icon = "an icon name"
    //     try {
    //         await validateTagInput(FunctionsFlag.UPDATE, tag);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe(idEqual0Error);
    //             expect(e.message).toEqual(idEqual0Error);
    //             expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), idEqual0Error))
    //     }
    // }); 
    
    // it('Should trigger error when name length is equal to 0', async () => {
    //     let tag = new TagUpdateInput();
    //     tag.id = 10;
    //     tag.name = "";
    //     tag.icon = "an icon name"
    //     try {
    //         await validateTagInput(FunctionsFlag.UPDATE, tag);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe(nameTooShortErrorMessage);
    //             expect(e.message).toEqual(nameTooShortErrorMessage);
    //             expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), nameTooShortErrorMessage))
    //     }
    // }); 
    
    // it('Should trigger error when name length is superirior to 255 characters', async () => {
    //     let tag = new TagUpdateInput();
    //     tag.id = 10;
    //     tag.name = strTooLong;
    //     tag.icon = "an icon name"
    //     try {
    //         await validateTagInput(FunctionsFlag.UPDATE, tag);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe(nameTooLongErrorMessage);
    //             expect(e.message).toEqual(nameTooLongErrorMessage);
    //             expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), nameTooLongErrorMessage))
    //     }
    // });
    
    // it('Should trigger error when icon length is superior to 255 characters', async () => {
    //     let tag = new TagUpdateInput();
    //     tag.id = 10;
    //     tag.name = "a tag name";
    //     tag.icon = strTooLong;
    //     try {
    //         await validateTagInput(FunctionsFlag.UPDATE, tag);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe(iconTooLongErrorMessage);
    //             expect(e.message).toEqual(iconTooLongErrorMessage);
    //             expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), iconTooLongErrorMessage))
    //     }
    // });
    
    // // WRONG FLAG ERROR
    // it('Should trigger error when flag doesn\'t exist', async () => {
    //     let tag = new TagByNameInput();
    //     tag.name = "Blala";
    //     try {
    //         await validateTagInput(fakeFlag, tag);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe(flagError);
    //             expect(e.message).toEqual(flagError);
    //             expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //             expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), flagError))
    //     }
    // });
})
