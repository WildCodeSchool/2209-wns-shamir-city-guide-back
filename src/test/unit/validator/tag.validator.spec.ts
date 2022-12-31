import "reflect-metadata";
import * as TagValidator from "../../../validator/tag.validator";
import { CustomError } from "../../../utils/error/CustomError.utils.error";
import { UnprocessableEntityError } from "../../../utils/error/interfaces.utils.error";
import { 
    StatusCodeClass, 
    StatusCodeMessage, 
    StatusCode, 
    FunctionsFlag,
    fakeFlag,
    strTooLong 
} from "../../../utils/constants.utils";

const TagByIdInput = TagValidator.TagByIdInput,
    TagByNameInput = TagValidator.TagByNameInput,
    TagCreationInput = TagValidator.TagCreationInput,
    TagUpdateInput = TagValidator.TagUpdateInput,
    flagError = TagValidator.flagErrorMessage,
    idEqual0Error = TagValidator.idEqual0ErrorMessage,
    nameTooShortErrorMessage = TagValidator.nameTooShortErrorMessage,
    nameTooLongErrorMessage = TagValidator.nameTooLongErrorMessage,
    iconTooLongErrorMessage = TagValidator.iconTooLongErrorMessage,
    validateTagInput = TagValidator.validateTagInput;


// GET TAG BY ID
test('TagValidator.validateTagInput(FunctionsFlag.GETBYID, tag{id: number > 0}) : test tag validator when id is superior to 0', async () => {
    let tag = new TagByIdInput();
    tag.id = 1;
    const test = await validateTagInput(FunctionsFlag.GETBYID, tag);
    
    expect(test).toBe("compliant data");
    expect(test).toEqual("compliant data");
    expect(test).toMatch(/compliant data/);
});

test('TagValidator.validateTagInput(FunctionsFlag.GETBYID, tag{id: 0}) : trigger error when is equal to 0', async () => {
    let tag = new TagByIdInput();
    tag.id = 0;
    try {
        await validateTagInput(FunctionsFlag.GETBYID, tag);
    } catch (e) {
        if (e instanceof CustomError) {
            expect(e.message).toBe(idEqual0Error);
            expect(e.message).toEqual(idEqual0Error);
            expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
            expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
            expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
            expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
        }
        
        expect(e).toBeDefined();
        expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), idEqual0Error))
    }
});

// GET TAG BY NAME
test('TagValidator.validateTagInput(FunctionsFlag.GETBYNAME, tag{name:"xxxxxx"}) : test tag validator when name length is superior to 0', async () => {
    let tag = new TagByNameInput();
    tag.name = "Promenade";
    const test = await validateTagInput(FunctionsFlag.GETBYNAME, tag);
    
    expect(test).toBe("compliant data");
    expect(test).toEqual("compliant data");
    expect(test).toMatch(/compliant data/);
});

test('TagValidator.validateTagInput(FunctionsFlag.GETBYNAME, tag{name:""}) : trigger error when name length is equal to 0', async () => {
    let tag = new TagByNameInput();
    tag.name = "";
    try {
        await validateTagInput(FunctionsFlag.GETBYNAME, tag);
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

test('TagValidator.validateTagInput(FunctionsFlag.GETBYNAME, tag{name: string.length > 255}) : trigger error when name length is superior to 255 characters', async () => {
    let tag = new TagByNameInput();
    tag.name = strTooLong;
    try {
        await validateTagInput(FunctionsFlag.GETBYNAME, tag);
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
test('TagValidator.validateTagInput(FunctionsFlag.CREATE, tag{name:"a tag name", icon:"an icon name" })', async () => {
    let tag = new TagCreationInput();
    tag.name = "a tag name";
    tag.icon = "an icon name"
    const test = await validateTagInput(FunctionsFlag.CREATE, tag);
    
    expect(test).toBe("compliant data");
    expect(test).toEqual("compliant data");
    expect(test).toMatch(/compliant data/);
});

test('TagValidator.validateTagInput(FunctionsFlag.CREATE, tag{name:"a tag name", icon:"" })', async () => {
    let tag = new TagCreationInput();
    tag.name = "a tag name";
    tag.icon = ""
    const test = await validateTagInput(FunctionsFlag.CREATE, tag);
    
    expect(test).toBe("compliant data");
    expect(test).toEqual("compliant data");
    expect(test).toMatch(/compliant data/);
});

test('TagValidator.validateTagInput(FunctionsFlag.CREATE, tag{name:"", icon:"an icon name" }) : trigger error when name length is equal to 0', async () => {
    let tag = new TagCreationInput();
    tag.name = "";
    tag.icon = "an icon name"
    try {
        await validateTagInput(FunctionsFlag.CREATE, tag);
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

test('TagValidator.validateTagInput(FunctionsFlag.CREATE, tag{name:str.length > 255, icon:"an icon name" }) : trigger error when name length is superior to 255 characters', async () => {
    let tag = new TagCreationInput();
    tag.name = strTooLong;
    tag.icon = "an icon name"
    try {
        await validateTagInput(FunctionsFlag.CREATE, tag);
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

test('TagValidator.validateTagInput(FunctionsFlag.CREATE, tag{name:"a tag name", icon:str.length > 255 }) : trigger error when icon length is superior to 255 characters', async () => {
    let tag = new TagCreationInput();
    tag.name = "a tag name";
    tag.icon = strTooLong;
    try {
        await validateTagInput(FunctionsFlag.CREATE, tag);
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
test('TagValidator.validateTagInput(FunctionsFlag.UPDATE, tag{id: 10, name:"a tag name", icon:"an icon name" })', async () => {
    let tag = new TagUpdateInput();
    tag.id = 10;
    tag.name = "a tag name";
    tag.icon = "an icon name"
    const test = await validateTagInput(FunctionsFlag.UPDATE, tag);
    
    expect(test).toBe("compliant data");
    expect(test).toEqual("compliant data");
    expect(test).toMatch(/compliant data/);
});

test('TagValidator.validateTagInput(FunctionsFlag.UPDATE, tag{id: 10, name:"a tag name", icon:"" })', async () => {
    let tag = new TagUpdateInput();
    tag.id = 10;
    tag.name = "a tag name";
    tag.icon = ""
    const test = await validateTagInput(FunctionsFlag.UPDATE, tag);
    
    expect(test).toBe("compliant data");
    expect(test).toEqual("compliant data");
    expect(test).toMatch(/compliant data/);
});

test('TagValidator.validateTagInput(FunctionsFlag.UPDATE, tag{id: 0, name:"", icon:"an icon name" }) : trigger error when id is equal to 0', async () => {
    let tag = new TagUpdateInput();
    tag.id = 0;
    tag.name = "";
    tag.icon = "an icon name"
    try {
        await validateTagInput(FunctionsFlag.UPDATE, tag);
    } catch (e) {
        if (e instanceof CustomError) {
            expect(e.message).toBe(idEqual0Error);
            expect(e.message).toEqual(idEqual0Error);
            expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
            expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
            expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
            expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
        }
        
        expect(e).toBeDefined();
        expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), idEqual0Error))
    }
}); 

test('TagValidator.validateTagInput(FunctionsFlag.UPDATE, tag{id: 10, name:"", icon:"an icon name" }) : trigger error when name length is equal to 0', async () => {
    let tag = new TagUpdateInput();
    tag.id = 10;
    tag.name = "";
    tag.icon = "an icon name"
    try {
        await validateTagInput(FunctionsFlag.UPDATE, tag);
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

test('TagValidator.validateTagInput(FunctionsFlag.UPDATE, tag{id: 10, name:str.length > 255, icon:"an icon name" }) : trigger error when name length is superirior to 255 characters', async () => {
    let tag = new TagUpdateInput();
    tag.id = 10;
    tag.name = strTooLong;
    tag.icon = "an icon name"
    try {
        await validateTagInput(FunctionsFlag.UPDATE, tag);
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

test('TagValidator.validateTagInput(FunctionsFlag.UPDATE, tag{id: 10, name:"a tag name", icon:str.length > 255 }) : trigger error when icon length is superior to 255 characters', async () => {
    let tag = new TagUpdateInput();
    tag.id = 10;
    tag.name = "a tag name";
    tag.icon = strTooLong;
    try {
        await validateTagInput(FunctionsFlag.UPDATE, tag);
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

// WRONG FLAG ERROR
test('TagValidator.validateTagInput(fakeFlag, tag{name:""}) : trigger error when flag doesn\'t exist', async () => {
    let tag = new TagByNameInput();
    tag.name = "Blala";
    try {
        await validateTagInput(fakeFlag, tag);
    } catch (e) {
        if (e instanceof CustomError) {
            expect(e.message).toBe(flagError);
            expect(e.message).toEqual(flagError);
            expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
            expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
            expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
            expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
        }
        
        expect(e).toBeDefined();
        expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), flagError))
    }
});



