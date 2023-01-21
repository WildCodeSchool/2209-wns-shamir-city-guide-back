import "reflect-metadata";
import { validateIdInput, validateNameInput } from "../../../validator/common.validator";
import { 
    TagValidator, 
    validateCreationTagInput, 
    validateUpdateTagInput 
} from "../../../validator/entity/tag.validator.entity";
import { CommonErrorValidator, TagErrorValidator } from "../../../validator/messages.validator";
import { CustomError } from "../../../utils/error/CustomError.utils.error";
import { BadRequestError, UnprocessableEntityError } from "../../../utils/error/interfaces.utils.error";
import { StatusCodeClass, StatusCodeMessage, StatusCode, strTooLong } from "../../../utils/constants.utils";
import Tag from "../../../entity/Tag.entity";


describe("unit/validator/tag.validator suite of tests", () => {
    // GET TAG BY ID
    it("Should return tag when id is superior to 0", async () => {
        const test = await validateIdInput(1);
        
        expect(test).toBe(1);
        expect(test).toEqual(1);
    });
    
    it('Should trigger 422 Unprocessable Entity Error when is equal to 0', async () => {
        try {
            await validateIdInput(0);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CommonErrorValidator.ID_EQUAL_0);
                expect(e.message).toEqual(CommonErrorValidator.ID_EQUAL_0);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CommonErrorValidator.ID_EQUAL_0))
        }
    });
    
    // GET TAG BY NAME
    it("Should return tag when name length is superior to 0", async () => {
        const test = await validateNameInput("Promenade");
        expect(test).toBe("Promenade");
        expect(test).toEqual("Promenade");
        expect(test).toMatch("Promenade");
    });
    
    it('Should trigger 422 Unprocessable Entity Error when name length is equal to 0', async () => {
        try {
            await validateNameInput("");
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CommonErrorValidator.NAME_TOO_SHORT);
                expect(e.message).toEqual(CommonErrorValidator.NAME_TOO_SHORT);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CommonErrorValidator.NAME_TOO_SHORT))
        }
    }); 
    
    it('Should trigger 422 Unprocessable Entity Error when name length is superior to 255 characters', async () => {
        try {
            await validateNameInput(strTooLong);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CommonErrorValidator.NAME_TOO_LONG);
                expect(e.message).toEqual(CommonErrorValidator.NAME_TOO_LONG);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CommonErrorValidator.NAME_TOO_LONG))
        }
    });
    
    // CREATE TAG
    it("Should return Tag when we create a tag with filled fields", async () => {
        const tag = new TagValidator();
        tag.name = "a tag name";
        tag.icon = "an icon name";
        const createdTag = await validateCreationTagInput(tag);
        
        expect(createdTag instanceof TagValidator).toBe(true);
        expect(createdTag.name).toBe("a tag name");
        expect(createdTag.icon).toBe("an icon name");
    });
    
    it("Should return Tag when we create a tag with non-empty name and empty icon", async () => {
        const tag = new TagValidator();
        tag.name = "a tag name";
        tag.icon = "";
        const createdTag = await validateCreationTagInput(tag);
        
        expect(createdTag instanceof TagValidator).toBe(true);
        expect(createdTag.name).toBe("a tag name");
        expect(createdTag.icon).toBe("");
    });

    it("Should return Tag when we create a tag with non-empty name and icon filled with white-spaces", async () => {
        const tag = new TagValidator();
        tag.name = "a tag name";
        tag.icon = "     ";
        const createdTag = await validateCreationTagInput(tag);
        
        expect(createdTag instanceof TagValidator).toBe(true);
        expect(createdTag.name).toBe("a tag name");
        expect(createdTag.icon).toBe("");
    });

    it("Should return Tag when we create a tag with non-empty name and icon wich need to be trimed", async () => {
        const tag = new TagValidator();
        tag.name = "a tag name";
        tag.icon = "   tag-name.png  ";
        const createdTag = await validateCreationTagInput(tag);
        
        expect(createdTag instanceof TagValidator).toBe(true);
        expect(createdTag.name).toBe("a tag name");
        expect(createdTag.icon).toBe("tag-name.png");
    });

    it('Should trigger 400 Bad Request Error during the tag creation when an id is present', async () => {
        const tag = new TagValidator();
        tag.id = 1;
        tag.name = "name";
        tag.icon = "an icon name";
        
        try {
            await validateCreationTagInput(tag);            
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`Oups!! Quelque chose s'est mal passé\n${TagErrorValidator.ID_NOT_REQUIRED}`);
                expect(e.message).toEqual(`Oups!! Quelque chose s'est mal passé\n${TagErrorValidator.ID_NOT_REQUIRED}`);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.BAD_REQUEST);
                expect(e.statusCode).toEqual(StatusCode.BAD_REQUEST);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.BAD_REQUEST);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.BAD_REQUEST);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new BadRequestError(), TagErrorValidator.ID_NOT_REQUIRED))
        }
    }); 
    
    it('Should trigger 422 Unprocessable Entity Error during the tag creation when name length is equal to 0', async () => {
        const tag = new TagValidator();
        tag.name = "";
        tag.icon = "an icon name";
        
        try {
            await validateCreationTagInput(tag);            
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(TagErrorValidator.NAME_TOO_SHORT);
                expect(e.message).toEqual(TagErrorValidator.NAME_TOO_SHORT);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), TagErrorValidator.NAME_TOO_SHORT))
        }
    }); 
    
    it('Should trigger 422 Unprocessable Entity Error during the creation tag when name length is superior to 255 characters', async () => {
        const tag = new TagValidator();
        tag.name = strTooLong;
        tag.icon = "an icon name";

        try {
            await validateCreationTagInput(tag);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(TagErrorValidator.NAME_TOO_LONG);
                expect(e.message).toEqual(TagErrorValidator.NAME_TOO_LONG);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), TagErrorValidator.NAME_TOO_LONG))
        }
    }); 
    
    it('Should trigger 422 Unprocessable Entity Error during the tag creation when icon length is superior to 255 characters', async () => {
        const tag = new TagValidator();
        tag.name = "name";
        tag.icon = strTooLong;

        try {
            await validateCreationTagInput(tag);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(TagErrorValidator.ICON_TOO_LONG);
                expect(e.message).toEqual(TagErrorValidator.ICON_TOO_LONG);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), TagErrorValidator.ICON_TOO_LONG))
        }
    });
    
    // UPDATE TAG
    it("Should return update tag when we update a tag with all filled fields", async () => {
        const tag = new TagValidator();
        tag.id = 10;
        tag.name = "an updated tag name";
        tag.icon = "an updated icon name";
        const updatedTag = await validateUpdateTagInput(tag);
        
        expect(updatedTag instanceof TagValidator).toBe(true);
        expect(updatedTag.name).toBe("an updated tag name");
        expect(updatedTag.icon).toBe("an updated icon name");
    });
    
    it("Should return updated tag when we update a tag with non-empty id and name and empty icon", async () => {
        const tag = new TagValidator();
        tag.id = 10;
        tag.name = "name";
        tag.icon = "";
        const updatedTag = await validateUpdateTagInput(tag);
        
        expect(updatedTag instanceof TagValidator).toBe(true);
        expect(updatedTag.name).toBe("name");
        expect(updatedTag.icon).toBe("");
    });

    it("Should return Tag when we update a tag with non-empty name and icon filled with white-spaces", async () => {
        const tag = new TagValidator();
        tag.id = 10;
        tag.name = "a tag name";
        tag.icon = "     ";
        const updatedTag = await validateUpdateTagInput(tag);
        
        expect(updatedTag instanceof TagValidator).toBe(true);
        expect(updatedTag.name).toBe("a tag name");
        expect(updatedTag.icon).toBe("");
    });

    it("Should return Tag when we update a tag with non-empty name and icon wich need to be trimed", async () => {
        const tag = new TagValidator();
        tag.id = 10;
        tag.name = "a tag name";
        tag.icon = "   tag-name.png  ";
        const updatedTag = await validateUpdateTagInput(tag);
        
        expect(updatedTag instanceof TagValidator).toBe(true);
        expect(updatedTag.name).toBe("a tag name");
        expect(updatedTag.icon).toBe("tag-name.png");
    });

    it('Should trigger 422 Unprocessable Entity Error during the tag creation when an id is not present', async () => {
        const tag = new TagValidator();
        tag.name = "name";
        tag.icon = "an icon name";
        
        try {
            await validateUpdateTagInput(tag);            
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`Oups!! Quelque chose s'est mal passé\n${TagErrorValidator.ID_REQUIRED}`);
                expect(e.message).toEqual(`Oups!! Quelque chose s'est mal passé\n${TagErrorValidator.ID_REQUIRED}`);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.BAD_REQUEST);
                expect(e.statusCode).toEqual(StatusCode.BAD_REQUEST);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.BAD_REQUEST);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.BAD_REQUEST);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new BadRequestError(), TagErrorValidator.ID_REQUIRED))
        }
    }); 
    
    it('Should trigger 422 Unprocessable Entity Error during the tag update when id is equal to 0', async () => {
        const tag = new TagValidator();
        tag.id = 0;
        tag.name = "name";
        tag.icon = "icon";
        
        try {
            await validateUpdateTagInput(tag);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(TagErrorValidator.ID_EQUAL_0);
                expect(e.message).toEqual(TagErrorValidator.ID_EQUAL_0);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), TagErrorValidator.ID_EQUAL_0))
        }
    }); 
    
    it('Should trigger 422 Unprocessable Entity Error during the update tag when name length is equal to 0', async () => {
        const tag = new TagValidator();
        tag.id = 10;
        tag.name = "";
        tag.icon = "icon";
        
        try {
            await validateUpdateTagInput(tag);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(TagErrorValidator.NAME_TOO_SHORT);
                expect(e.message).toEqual(TagErrorValidator.NAME_TOO_SHORT);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), TagErrorValidator.NAME_TOO_SHORT))
        }
    }); 
    
    it('Should trigger 422 Unprocessable Entity Error during the tag update when name length is superior to 255 characters', async () => {
        const tag = new TagValidator();
        tag.id = 10;
        tag.name = strTooLong;
        tag.icon = "icon";
        
        try {
            await validateUpdateTagInput(tag);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(TagErrorValidator.NAME_TOO_LONG);
                expect(e.message).toEqual(TagErrorValidator.NAME_TOO_LONG);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), TagErrorValidator.NAME_TOO_LONG))
        }
    });
    
    it('Should trigger 422 Unprocessable Entity Error during the tag update when icon length is superior to 255 characters', async () => {
        const tag = new TagValidator();
        tag.id = 10;
        tag.name = "name";
        tag.icon = strTooLong;

        try {
            await validateUpdateTagInput(tag);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(TagErrorValidator.ICON_TOO_LONG);
                expect(e.message).toEqual(TagErrorValidator.ICON_TOO_LONG);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), TagErrorValidator.ICON_TOO_LONG));
        }
    });
})
