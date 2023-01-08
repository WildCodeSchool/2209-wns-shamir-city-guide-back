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
    latitudeFormatErrorMessage,
    longitudeFormatErrorMessage,
    pictureTooLongErrorMessage
} from "../../../validator/messages.validator";
import { CustomError } from "../../../utils/error/CustomError.utils.error";
import { UnprocessableEntityError } from "../../../utils/error/interfaces.utils.error";
import { StatusCodeClass, StatusCodeMessage, StatusCode, strTooLong } from "../../../utils/constants.utils";


describe("unit/validator/city.validator suite of tests", () => {
    // CREATE CITY
    it("Should return City when we create a city with filled fields", async () => {
        const name = " a city name   ",
            latitude = "15.6418",
            longitude = "64.2944",
            picture = "a picture name",
            tag = await validateCreationCityInput(name, latitude, longitude, picture);
        
        expect(tag instanceof CityCreationValidator).toBe(true);
        expect(tag.name).toBe("a city name");
        expect(tag.latitude).toBe("15.6418");
        expect(tag.longitude).toBe("64.2944");
        expect(tag.picture).toBe("a picture name");
    });

    it("Should return City when we create a city with filled fields and white spaces to trim in name", async () => {
        const name = "a city name",
            latitude = "15.6418",
            longitude = "64.2944",
            picture = "a picture name",
            city = await validateCreationCityInput(name, latitude, longitude, picture);
        
        expect(city instanceof CityCreationValidator).toBe(true);
        expect(city.name).toBe("a city name");
        expect(city.latitude).toBe("15.6418");
        expect(city.longitude).toBe("64.2944");
        expect(city.picture).toBe("a picture name");
    });

    it("Should return an error 422 Unprocessable Entity when we create a city with empty name", async () => {
        const name = "",
            latitude = "15.6148",
            longitude = "62.2944",
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
            latitude = "15.6148",
            longitude = "64.2944",
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
            longitude = "64.2494",
            picture = "a picture name";
        try {
            await validateCreationCityInput(name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(latitudeFormatErrorMessage);
                expect(e.message).toEqual(latitudeFormatErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), latitudeFormatErrorMessage))
        }
    });
    
    it("Should return an error 422 Unprocessable Entity when we create a city with too short latitude", async () => {
        const name = "name",
            latitude = "124",
            longitude = "64.2944",
            picture = "a picture name";
        try {
            await validateCreationCityInput(name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(latitudeFormatErrorMessage);
                expect(e.message).toEqual(latitudeFormatErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), latitudeFormatErrorMessage))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we create a city with too long latitude", async () => {
        const name = "name",
            latitude = strTooLong,
            longitude = "64.2944",
            picture = "a picture name";
        try {
            await validateCreationCityInput(name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(latitudeFormatErrorMessage);
                expect(e.message).toEqual(latitudeFormatErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), latitudeFormatErrorMessage))
        }
    });
    
    it("Should return an error 422 Unprocessable Entity when we create a city with empty longitude", async () => {
        const name = "name",
            latitude = "12.32156",
            longitude = "",
            picture = "a picture name";
        try {
            await validateCreationCityInput(name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(longitudeFormatErrorMessage);
                expect(e.message).toEqual(longitudeFormatErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), longitudeFormatErrorMessage))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we create a city with to short longitude", async () => {
        const name = "name",
            latitude = "12.321546",
            longitude = "32.4",
            picture = "a picture name";
        try {
            await validateCreationCityInput(name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(latitudeFormatErrorMessage);
                expect(e.message).toEqual(latitudeFormatErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), latitudeFormatErrorMessage))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we create a city with too long longitude", async () => {
        const name = "name",
            latitude = "12.9643",
            longitude = strTooLong,
            picture = "a picture name";
        try {
            await validateCreationCityInput(name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(longitudeFormatErrorMessage);
                expect(e.message).toEqual(longitudeFormatErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), longitudeFormatErrorMessage))
        }
    });

    it("Should return a City when we create a city with empty picture", async () => {
        const name = "name",
            latitude = "12.9643",
            longitude = "39.7453",
            picture = "",
            city = await validateCreationCityInput(name, latitude, longitude, picture);
        
        expect(city instanceof CityCreationValidator).toBe(true);
        expect(city.name).toBe("name");
        expect(city.latitude).toBe("12.9643");
        expect(city.longitude).toBe("39.7453");
        expect(city.picture).toBe("");
    });
    
    // UPDATE TAG
    it("Should return update city when we update a city with all filled fields", async () => {
        const id = 5, 
            name = "an updated city name",
            latitude = "15.6148",
            longitude = "64.2944",
            picture = "a picture name",
            tag = await validateUpdateCityInput(id, name, latitude, longitude, picture);
        
        expect(tag instanceof CityUpdateValidator).toBe(true);
        expect(tag.name).toBe("an updated city name");
        expect(tag.picture).toBe("a picture name");
    });

    it("Should return update city when we update a city with an empty picture", async () => {
        const id = 5, 
            name = "an updated city name",
            latitude = "15.6418",
            longitude = "64.2944",
            picture = "",
            tag = await validateUpdateCityInput(id, name, latitude, longitude, picture);
        
        expect(tag instanceof CityUpdateValidator).toBe(true);
        expect(tag.name).toBe("an updated city name");
        expect(tag.picture).toBe("");
    });

    it("Should return an error 422 Unprocessable Entity when we update a city with empty name", async () => {
        const id = 4, 
            name = "",
            latitude = "15.6148",
            longitude = "64.2944",
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
            latitude = "15.6148",
            longitude = "64.2944",
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
            longitude = "62.2944",
            picture = "a picture name";
        try {
            await validateUpdateCityInput(id, name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(latitudeFormatErrorMessage);
                expect(e.message).toEqual(latitudeFormatErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), latitudeFormatErrorMessage))
        }
    });
    
    it("Should return an error 422 Unprocessable Entity when we update a city with too short latitude", async () => {
        const id = 4,
            name = "name",
            latitude = "124",
            longitude = "62.2944",
            picture = "a picture name";
        try {
            await validateUpdateCityInput(id, name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(latitudeFormatErrorMessage);
                expect(e.message).toEqual(latitudeFormatErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), latitudeFormatErrorMessage))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we update a city with too long latitude", async () => {
        const id = 4,
            name = "name",
            latitude = strTooLong,
            longitude = "64.2944",
            picture = "a picture name";
        try {
            await validateUpdateCityInput(id, name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(latitudeFormatErrorMessage);
                expect(e.message).toEqual(latitudeFormatErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), latitudeFormatErrorMessage))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we update a city with empty longitude", async () => {
        const id = 4, 
            name = "name",
            latitude = "64.2944",
            longitude = "",
            picture = "a picture name";
        try {
            await validateUpdateCityInput(id, name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(longitudeFormatErrorMessage);
                expect(e.message).toEqual(longitudeFormatErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), longitudeFormatErrorMessage))
        }
    });
    
    it("Should return an error 422 Unprocessable Entity when we update a city with too short longitude", async () => {
        const id = 4,
            name = "name",
            latitude = "14.9643",
            longitude = "64.123",
            picture = "a picture name";
        try {
            await validateUpdateCityInput(id, name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(longitudeFormatErrorMessage);
                expect(e.message).toEqual(longitudeFormatErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), longitudeFormatErrorMessage))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we update a city with wrong format for longitude", async () => {
        const id = 4,
            name = "name",
            latitude = "64.294",
            longitude = "46.g255",
            picture = "a picture name";
        try {
            await validateUpdateCityInput(id, name, latitude, longitude, picture);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(longitudeFormatErrorMessage);
                expect(e.message).toEqual(longitudeFormatErrorMessage);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), longitudeFormatErrorMessage))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we update a city with too long picture", async () => {
        const id = 4,
            name = "name",
            latitude = "62.294",
            longitude = "62.294",
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
