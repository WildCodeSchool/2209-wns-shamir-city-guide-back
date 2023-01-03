import "reflect-metadata";
import { validateIdInput, validateNameInput } from "../../../validator/common.validator";
import { 
    TagCreationValidator, 
    TagUpdateValidator, 
    validateCreationTagInput, 
    validateUpdateTagInput 
} from "../../../validator/entity/tag.validator.entity";
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
    it("Should return tag when id is superior to 0", async () => {
        const test = await validateIdInput(1);
        
        expect(test).toBe(1);
        expect(test).toEqual(1);
    });
    
    it('Should trigger error when is equal to 0', async () => {
        try {
            await validateIdInput(0);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(idEqual0ErrorMessage);
                expect(e.message).toEqual(idEqual0ErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), idEqual0ErrorMessage))
        }
    });
    
    // GET TAG BY NAME
    it("Should return tag when name length is superior to 0", async () => {
        const test = await validateNameInput("Promenade");
        expect(test).toBe("Promenade");
        expect(test).toEqual("Promenade");
        expect(test).toMatch("Promenade");
    });
    
    it('Should trigger error when name length is equal to 0', async () => {
        try {
            await validateNameInput("");
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(nameTooShortErrorMessage);
                expect(e.message).toEqual(nameTooShortErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), nameTooShortErrorMessage))
        }
    }); 
    
    it('Should trigger error when name length is superior to 255 characters', async () => {
        try {
            await validateNameInput(strTooLong);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(nameTooLongErrorMessage);
                expect(e.message).toEqual(nameTooLongErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), nameTooLongErrorMessage))
        }
    });
    
    // CREATE TAG
    it("Should return Tag when we create a tag with filled fields", async () => {
        const name = "a tag name",
            icon = "an icon name",
            tag = await validateCreationTagInput(name, icon);
        
        expect(tag instanceof TagCreationValidator).toBe(true);
        expect(tag.name).toBe("a tag name");
        expect(tag.icon).toBe("an icon name");
    });
    
    it("Should return Tag when we create a tag with non-empty name and empty icon", async () => {
        const name = "a tag name",
            icon = "",
            tag = await validateCreationTagInput(name, icon);
        
        expect(tag instanceof TagCreationValidator).toBe(true);
        expect(tag.name).toBe("a tag name");
        expect(tag.icon).toBe("");
    });

    it("Should return Tag when we create a tag with non-empty name and icon filled with white-spaces", async () => {
        const name = "a tag name",
            icon = "     ",
            tag = await validateCreationTagInput(name, icon);
        
        expect(tag instanceof TagCreationValidator).toBe(true);
        expect(tag.name).toBe("a tag name");
        expect(tag.icon).toBe("");
    });

    it("Should return Tag when we create a tag with non-empty name and icon wich need to be trimed", async () => {
        const name = "a tag name",
            icon = "   tag-name.png  ",
            tag = await validateCreationTagInput(name, icon);
        
        expect(tag instanceof TagCreationValidator).toBe(true);
        expect(tag.name).toBe("a tag name");
        expect(tag.icon).toBe("tag-name.png");
    });
    
    it('Should trigger error during the tag creation when name length is equal to 0', async () => {
        const name = "",
            icon = "an icon name";
        try {
            await validateCreationTagInput(name, icon);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(nameTooShortErrorMessage);
                expect(e.message).toEqual(nameTooShortErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), nameTooShortErrorMessage))
        }
    }); 
    
    it('Should trigger error during the creation tag when name length is superior to 255 characters', async () => {
        const name = strTooLong,
            icon = "an icon name";
        try {
            await validateCreationTagInput(name, icon);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(nameTooLongErrorMessage);
                expect(e.message).toEqual(nameTooLongErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), nameTooLongErrorMessage))
        }
    }); 
    
    it('Should trigger error during the tag creation when icon length is superior to 255 characters', async () => {
        const name = "a tag name",
            icon = strTooLong;
        try {
            await validateCreationTagInput(name, icon);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(iconTooLongErrorMessage);
                expect(e.message).toEqual(iconTooLongErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), iconTooLongErrorMessage))
        }
    });
    
    // UPDATE TAG
    it("Should return update tag when we update a tag with all filled fields", async () => {
        const id = 10,
            name = "an updated tag name",
            icon = "an updated icon name",
            tag = await validateUpdateTagInput(id, name, icon);
        
        expect(tag instanceof TagUpdateValidator).toBe(true);
        expect(tag.name).toBe("an updated tag name");
        expect(tag.icon).toBe("an updated icon name");
    });
    
    it("Should return updated tag when we update a tag with non-empty id and name and empty icon", async () => {
        const id = 10,
            name = "an updated tag name",
            icon = "",
            tag = await validateUpdateTagInput(id, name, icon);
        
        expect(tag instanceof TagUpdateValidator).toBe(true);
        expect(tag.name).toBe("an updated tag name");
        expect(tag.icon).toBe("");
    });

    it("Should return Tag when we update a tag with non-empty name and icon filled with white-spaces", async () => {
        const id = 10,
            name = "a tag name",
            icon = "     ",
            tag = await validateUpdateTagInput(id, name, icon);
        
        expect(tag instanceof TagUpdateValidator).toBe(true);
        expect(tag.name).toBe("a tag name");
        expect(tag.icon).toBe("");
    });

    it("Should return Tag when we update a tag with non-empty name and icon wich need to be trimed", async () => {
        const id = 10,
        name = "a tag name",
            icon = "   tag-name.png  ",
            tag = await validateUpdateTagInput(id, name, icon);
        
        expect(tag instanceof TagUpdateValidator).toBe(true);
        expect(tag.name).toBe("a tag name");
        expect(tag.icon).toBe("tag-name.png");
    });
    
    it('Should trigger during the tag update error when id is equal to 0', async () => {
        const id = 0,
            name = "",
            icon = "an icon name";
        try {
            await validateUpdateTagInput(id, name, icon);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(idEqual0ErrorMessage);
                expect(e.message).toEqual(idEqual0ErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), idEqual0ErrorMessage))
        }
    }); 
    
    it('Should trigger error during the update tag when name length is equal to 0', async () => {
        const id = 10,
            name = "",
            icon = "an icon name";
        try {
            await validateUpdateTagInput(id, name, icon);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(nameTooShortErrorMessage);
                expect(e.message).toEqual(nameTooShortErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), nameTooShortErrorMessage))
        }
    }); 
    
    it('Should trigger error during the tag update when name length is superirior to 255 characters', async () => {
        const id = 10,
            name = strTooLong,
            icon = "an icon name";
        try {
            await validateUpdateTagInput(id, name, icon);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(nameTooLongErrorMessage);
                expect(e.message).toEqual(nameTooLongErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), nameTooLongErrorMessage))
        }
    });
    
    it('Should trigger error during the tag update when icon length is superior to 255 characters', async () => {
        const id = 10,
            name = "a tag name",
            icon = strTooLong;
        try {
            await validateUpdateTagInput(id, name, icon);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(iconTooLongErrorMessage);
                expect(e.message).toEqual(iconTooLongErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), iconTooLongErrorMessage))
        }
    });
})
