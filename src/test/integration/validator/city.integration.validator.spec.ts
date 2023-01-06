import "reflect-metadata";
import { validateIdInput, validateNameInput } from "../../../validator/common.validator";
import { 
    CityCreationValidator, 
    CityUpdateValidator, 
    validateCreationCityInput, 
    validateUpdateCityInput 
} from "../../../validator/entity/city.validator.entity";
import { 
    idEqual0ErrorMessage,
    nameTooShortErrorMessage,
    nameTooLongErrorMessage,
    latitudeTooShortErrorMessage,
    latitudeTooLongErrorMessage,
    longitudeTooShortErrorMessage,
    longitudeTooLongErrorMessage,
    pictureTooLongErrorMessage
} from "../../../validator/messages.validator";
import { CustomError } from "../../../utils/error/CustomError.utils.error";
import { UnprocessableEntityError } from "../../../utils/error/interfaces.utils.error";
import { StatusCodeClass, StatusCodeMessage, StatusCode, strTooLong } from "../../../utils/constants.utils";


describe("unit/validator/city.validator suite of tests", () => {
    // CREATE CITY
    it("Should return City when we create a city with filled fields", async () => {
        const name = " a city name   ",
            latitude = "159.618",
            longitude = "642.294",
            picture = "a picture name",
            tag = await validateCreationCityInput(name, latitude, longitude, picture);
        
        expect(tag instanceof CityCreationValidator).toBe(true);
        expect(tag.name).toBe("a city name");
        expect(tag.latitude).toBe("159.618");
        expect(tag.longitude).toBe("642.294");
        expect(tag.picture).toBe("a picture name");
    });

    it("Should return City when we create a city with filled fields and white spaces to trim in name", async () => {
        const name = "a city name",
            latitude = "159.618",
            longitude = "642.294",
            picture = "a picture name",
            city = await validateCreationCityInput(name, latitude, longitude, picture);
        
        expect(city instanceof CityCreationValidator).toBe(true);
        expect(city.name).toBe("a city name");
        expect(city.latitude).toBe("159.618");
        expect(city.longitude).toBe("642.294");
        expect(city.picture).toBe("a picture name");
    });

    it("Should return an error 422 Unprocessable Entity when we create a city with empty name", async () => {
        const name = "",
            latitude = "159.618",
            longitude = "642.294",
            picture = "a picture name";
        try {
            await validateCreationCityInput(name, latitude, longitude, picture);
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

    it("Should return an error 422 Unprocessable Entity when we create a city with a name to long", async () => {
        const name = strTooLong,
            latitude = "159.618",
            longitude = "642.294",
            picture = "a picture name";
        try {
            await validateCreationCityInput(name, latitude, longitude, picture);
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

    it("Should return an error 422 Unprocessable Entity when we create a city with empty latitude", async () => {
        const name = "name",
            latitude = "",
            longitude = "642.294",
            picture = "a picture name";
        try {
            await validateCreationCityInput(name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(latitudeTooShortErrorMessage);
                expect(e.message).toEqual(latitudeTooShortErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), latitudeTooShortErrorMessage))
        }
    });
    
    it("Should return an error 422 Unprocessable Entity when we create a city with too short latitude", async () => {
        const name = "name",
            latitude = "124",
            longitude = "642.294",
            picture = "a picture name";
        try {
            await validateCreationCityInput(name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(latitudeTooShortErrorMessage);
                expect(e.message).toEqual(latitudeTooShortErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), latitudeTooShortErrorMessage))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we create a city with too long latitude", async () => {
        const name = "name",
            latitude = strTooLong,
            longitude = "642.294",
            picture = "a picture name";
        try {
            await validateCreationCityInput(name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(latitudeTooLongErrorMessage);
                expect(e.message).toEqual(latitudeTooLongErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), latitudeTooLongErrorMessage))
        }
    });
    
    it("Should return an error 422 Unprocessable Entity when we create a city with empty longitude", async () => {
        const name = "name",
            latitude = "123.32156",
            longitude = "",
            picture = "a picture name";
        try {
            await validateCreationCityInput(name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(longitudeTooShortErrorMessage);
                expect(e.message).toEqual(longitudeTooShortErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), longitudeTooShortErrorMessage))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we create a city with to short longitude", async () => {
        const name = "name",
            latitude = "123.32156",
            longitude = "32.4",
            picture = "a picture name";
        try {
            await validateCreationCityInput(name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(longitudeTooShortErrorMessage);
                expect(e.message).toEqual(longitudeTooShortErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), longitudeTooShortErrorMessage))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we create a city with too long longitude", async () => {
        const name = "name",
            latitude = "123.963",
            longitude = strTooLong,
            picture = "a picture name";
        try {
            await validateCreationCityInput(name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(longitudeTooLongErrorMessage);
                expect(e.message).toEqual(longitudeTooLongErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), longitudeTooLongErrorMessage))
        }
    });

    it("Should return a City when we create a city with empty picture", async () => {
        const name = "name",
            latitude = "123.963",
            longitude = "369.753",
            picture = "",
            city = await validateCreationCityInput(name, latitude, longitude, picture);
        
        expect(city instanceof CityCreationValidator).toBe(true);
        expect(city.name).toBe("name");
        expect(city.latitude).toBe("123.963");
        expect(city.longitude).toBe("369.753");
        expect(city.picture).toBe("");
    });
    
    // UPDATE TAG
    it("Should return update city when we update a city with all filled fields", async () => {
        const id = 5, 
            name = "an updated city name",
            latitude = "159.618",
            longitude = "642.294",
            picture = "a picture name",
            tag = await validateUpdateCityInput(id, name, latitude, longitude, picture);
        
        expect(tag instanceof CityUpdateValidator).toBe(true);
        expect(tag.name).toBe("an updated city name");
        expect(tag.picture).toBe("a picture name");
    });

    it("Should return update city when we update a city with an empty picture", async () => {
        const id = 5, 
            name = "an updated city name",
            latitude = "159.618",
            longitude = "642.294",
            picture = "",
            tag = await validateUpdateCityInput(id, name, latitude, longitude, picture);
        
        expect(tag instanceof CityUpdateValidator).toBe(true);
        expect(tag.name).toBe("an updated city name");
        expect(tag.picture).toBe("");
    });

    it("Should return an error 422 Unprocessable Entity when we update a city with empty name", async () => {
        const id = 4, 
            name = "",
            latitude = "159.618",
            longitude = "642.294",
            picture = "a picture name";
        try {
            await validateUpdateCityInput(id, name, latitude, longitude, picture);
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

    it("Should return an error 422 Unprocessable Entity when we update a city with a name to long", async () => {
        const id = 4, 
            name = strTooLong,
            latitude = "159.618",
            longitude = "642.294",
            picture = "a picture name";
        try {
            await validateUpdateCityInput(id, name, latitude, longitude, picture);
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

    it("Should return an error 422 Unprocessable Entity when we update a city with empty latitude", async () => {
        const id = 4, 
            name = "name",
            latitude = "",
            longitude = "642.294",
            picture = "a picture name";
        try {
            await validateUpdateCityInput(id, name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(latitudeTooShortErrorMessage);
                expect(e.message).toEqual(latitudeTooShortErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), latitudeTooShortErrorMessage))
        }
    });
    
    it("Should return an error 422 Unprocessable Entity when we update a city with too short latitude", async () => {
        const id = 4,
            name = "name",
            latitude = "124",
            longitude = "642.294",
            picture = "a picture name";
        try {
            await validateUpdateCityInput(id, name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(latitudeTooShortErrorMessage);
                expect(e.message).toEqual(latitudeTooShortErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), latitudeTooShortErrorMessage))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we update a city with too long latitude", async () => {
        const id = 4,
            name = "name",
            latitude = strTooLong,
            longitude = "642.294",
            picture = "a picture name";
        try {
            await validateUpdateCityInput(id, name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(latitudeTooLongErrorMessage);
                expect(e.message).toEqual(latitudeTooLongErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), latitudeTooLongErrorMessage))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we update a city with empty longitude", async () => {
        const id = 4, 
            name = "name",
            latitude = "642.294",
            longitude = "",
            picture = "a picture name";
        try {
            await validateUpdateCityInput(id, name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(longitudeTooShortErrorMessage);
                expect(e.message).toEqual(longitudeTooShortErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), longitudeTooShortErrorMessage))
        }
    });
    
    it("Should return an error 422 Unprocessable Entity when we update a city with too short longitude", async () => {
        const id = 4,
            name = "name",
            latitude = "124.963",
            longitude = "642",
            picture = "a picture name";
        try {
            await validateUpdateCityInput(id, name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(longitudeTooShortErrorMessage);
                expect(e.message).toEqual(longitudeTooShortErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), longitudeTooShortErrorMessage))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we update a city with too long longitude", async () => {
        const id = 4,
            name = "name",
            latitude = "642.294",
            longitude = strTooLong,
            picture = "a picture name";
        try {
            await validateUpdateCityInput(id, name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(longitudeTooLongErrorMessage);
                expect(e.message).toEqual(longitudeTooLongErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), longitudeTooLongErrorMessage))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we update a city with too long picture", async () => {
        const id = 4,
            name = "name",
            latitude = "642.294",
            longitude = "642.294",
            picture = strTooLong;
        try {
            await validateUpdateCityInput(id, name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(pictureTooLongErrorMessage);
                expect(e.message).toEqual(pictureTooLongErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), pictureTooLongErrorMessage))
        }
    });
})
