import "reflect-metadata";
import { 
    CityValidator, 
    validateCreationCityInput, 
    validateUpdateCityInput 
} from "../../../validators/entities/city.validator.entity";
import { CityErrorValidator } from "../../../validators/messages.validator";
import { CustomError } from "../../../utils/errors/CustomError.utils.error";
import { BadRequestError, UnprocessableEntityError } from "../../../utils/errors/interfaces.utils.error";
import { StatusCodeClass, StatusCodeMessage, StatusCode, strTooLong } from "../../../utils/constants.utils";


describe("unit/validator/city.validator suite of tests", () => {
    // CREATE CITY
    it("Should return City when we create a city with filled fields", async () => {
        const city = new CityValidator(); 
        city.name = " a city name   ",
        city.latitude = "15.6418",
        city.longitude = "64.2944",
        city.picture = "a picture name";
        const createdCity = await validateCreationCityInput(city);
        
        expect(createdCity instanceof CityValidator).toBe(true);
        expect(createdCity.name).toBe("a city name");
        expect(createdCity.latitude).toBe("15.6418");
        expect(createdCity.longitude).toBe("64.2944");
        expect(createdCity.picture).toBe("a picture name");
    });

    it("Should return City when we create a city with filled fields and white spaces to trim in name", async () => {
        const city = new CityValidator();
        city.name = "a city name";
        city.latitude = "15.6418";
        city.longitude = "64.2944";
        city.picture = "a picture name";
        const createdCity = await validateCreationCityInput(city);
        
        expect(createdCity instanceof CityValidator).toBe(true);
        expect(createdCity.name).toBe("a city name");
        expect(createdCity.latitude).toBe("15.6418");
        expect(createdCity.longitude).toBe("64.2944");
        expect(createdCity.picture).toBe("a picture name");
    });

    it('Should trigger 400 Bad Request Error during the city creation when an id is present', async () => {
        const city = new CityValidator();
        city.id = 1;
        city.name = "a city name";
        city.latitude = "15.6418";
        city.longitude = "64.2944";
        city.picture = "a picture name";
        
        try {
            await validateCreationCityInput(city);            
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`Oups!! Quelque chose s'est mal passé\n${CityErrorValidator.ID_NOT_REQUIRED}`);
                expect(e.message).toEqual(`Oups!! Quelque chose s'est mal passé\n${CityErrorValidator.ID_NOT_REQUIRED}`);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.BAD_REQUEST);
                expect(e.extensions.statusCode).toEqual(StatusCode.BAD_REQUEST);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.BAD_REQUEST);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.BAD_REQUEST);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new BadRequestError(), CityErrorValidator.ID_NOT_REQUIRED))
        }
    }); 

    it("Should return an error 422 Unprocessable Entity when we create a city with empty name", async () => {
        const city = new CityValidator(); 
        city.name = "",
        city.latitude = "15.6418",
        city.longitude = "64.2944",
        city.picture = "a picture name";
        
        try {
            await validateCreationCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.NAME_TOO_SHORT);
                expect(e.message).toEqual(CityErrorValidator.NAME_TOO_SHORT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.NAME_TOO_SHORT))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we create a city with a name to long", async () => {
        const city = new CityValidator(); 
        city.name = strTooLong,
        city.latitude = "15.6418",
        city.longitude = "64.2944",
        city.picture = "a picture name";
        try {
            await validateCreationCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.NAME_TOO_LONG);
                expect(e.message).toEqual(CityErrorValidator.NAME_TOO_LONG);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.NAME_TOO_LONG))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we create a city with empty latitude", async () => {
        const city = new CityValidator(); 
        city.name = "new city",
        city.latitude = "",
        city.longitude = "64.2944",
        city.picture = "a picture name";

        try {
            await validateCreationCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.LATITUDE_FORMAT);
                expect(e.message).toEqual(CityErrorValidator.LATITUDE_FORMAT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.LATITUDE_FORMAT))
        }
    });
    
    it("Should return an error 422 Unprocessable Entity when we create a city with too short latitude", async () => {
        const city = new CityValidator(); 
        city.name = "new city",
        city.latitude = "124",
        city.longitude = "64.2944",
        city.picture = "a picture name";
        
        try {
            await validateCreationCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.LATITUDE_FORMAT);
                expect(e.message).toEqual(CityErrorValidator.LATITUDE_FORMAT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.LATITUDE_FORMAT))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we create a city with too long latitude", async () => {
        const city = new CityValidator(); 
        city.name = "new city",
        city.latitude = strTooLong,
        city.longitude = "64.2944",
        city.picture = "a picture name";
        
        try {
            await validateCreationCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.LATITUDE_FORMAT);
                expect(e.message).toEqual(CityErrorValidator.LATITUDE_FORMAT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.LATITUDE_FORMAT))
        }
    });
    
    it("Should return an error 422 Unprocessable Entity when we create a city with empty longitude", async () => {
        const city = new CityValidator(); 
        city.name = "new city",
        city.latitude = "12.32156",
        city.longitude = "",
        city.picture = "a picture name";
       
        try {
            await validateCreationCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.LONGITUDE_FORMAT);
                expect(e.message).toEqual(CityErrorValidator.LONGITUDE_FORMAT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.LONGITUDE_FORMAT))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we create a city with to short longitude", async () => {
        const city = new CityValidator(); 
        city.name = "new city",
        city.latitude = "12.32156",
        city.longitude = "32.4",
        city.picture = "a picture name";
        
        try {
            await validateCreationCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.LONGITUDE_FORMAT);
                expect(e.message).toEqual(CityErrorValidator.LONGITUDE_FORMAT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.LONGITUDE_FORMAT))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we create a city with too long longitude", async () => {
        const city = new CityValidator(); 
        city.name = "new city",
        city.latitude = "12.32156",
        city.longitude = strTooLong,
        city.picture = "a picture name";

        try {
            await validateCreationCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.LONGITUDE_FORMAT);
                expect(e.message).toEqual(CityErrorValidator.LONGITUDE_FORMAT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.LONGITUDE_FORMAT))
        }
    });

    it("Should return a City when we create a city with empty picture", async () => {
        const city = new CityValidator(); 
        city.name = "name",
        city.latitude = "12.32156",
        city.longitude = "39.7453",
        city.picture = "";
        const createdCity = await validateCreationCityInput(city);
        
        expect(createdCity instanceof CityValidator).toBe(true);
        expect(createdCity.name).toBe("name");
        expect(createdCity.latitude).toBe("12.32156");
        expect(createdCity.longitude).toBe("39.7453");
        expect(createdCity.picture).toBe("");
    });
    
    // UPDATE CITY
    it("Should return update city when we update a city with all filled fields", async () => {
        const city = new CityValidator(); 
        city.id = 5;
        city.name = "an updated city name",
        city.latitude = "15.6148",
        city.longitude = "64.2944",
        city.picture = "a picture name";
        const updatedCity = await validateUpdateCityInput(city);
        
        expect(updatedCity instanceof CityValidator).toBe(true);
        expect(updatedCity.name).toBe("an updated city name");
        expect(updatedCity.picture).toBe("a picture name");
    });

    it("Should return update city when we update a city with an empty picture", async () => {
        const city = new CityValidator(); 
        city.id = 5;
        city.name = "an updated city name",
        city.latitude = "15.6148",
        city.longitude = "64.2944",
        city.picture = "";
        const updatedCity = await validateUpdateCityInput(city);
        
        expect(updatedCity instanceof CityValidator).toBe(true);
        expect(updatedCity.name).toBe("an updated city name");
        expect(updatedCity.picture).toBe("");
    });

    it('Should trigger 400 Bad Request Error during the city update when an id is not present', async () => {
        const city = new CityValidator();
        city.name = "a city name";
        city.latitude = "15.6418";
        city.longitude = "64.2944";
        city.picture = "a picture name";
        
        try {
            await validateUpdateCityInput(city);            
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`Oups!! Quelque chose s'est mal passé\n${CityErrorValidator.ID_REQUIRED}`);
                expect(e.message).toEqual(`Oups!! Quelque chose s'est mal passé\n${CityErrorValidator.ID_REQUIRED}`);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.BAD_REQUEST);
                expect(e.extensions.statusCode).toEqual(StatusCode.BAD_REQUEST);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.BAD_REQUEST);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.BAD_REQUEST);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new BadRequestError(), CityErrorValidator.ID_REQUIRED))
        }
    }); 

    it("Should return an error 422 Unprocessable Entity when we update a city with empty name", async () => {
        const city = new CityValidator(); 
        city.id = 5;
        city.name = "",
        city.latitude = "15.6148",
        city.longitude = "64.2944",
        city.picture = "a picture name";
        
        try {
            await validateUpdateCityInput(city);  
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.NAME_TOO_SHORT);
                expect(e.message).toEqual(CityErrorValidator.NAME_TOO_SHORT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new UnprocessableEntityError(), 
                    CityErrorValidator.NAME_TOO_SHORT
                ))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we update a city with a name to long", async () => {
        const city = new CityValidator(); 
        city.id = 5;
        city.name = strTooLong,
        city.latitude = "15.6148",
        city.longitude = "64.2944",
        city.picture = "a picture name";

        try {
            await validateUpdateCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.NAME_TOO_LONG);
                expect(e.message).toEqual(CityErrorValidator.NAME_TOO_LONG);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(
                new UnprocessableEntityError(), 
                CityErrorValidator.NAME_TOO_LONG
            ))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we update a city with empty latitude", async () => {
        const city = new CityValidator(); 
        city.id = 5;
        city.name = "a city name",
        city.latitude = "",
        city.longitude = "64.2944",
        city.picture = "a picture name";

        try {
            await validateUpdateCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.LATITUDE_FORMAT);
                expect(e.message).toEqual(CityErrorValidator.LATITUDE_FORMAT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.LATITUDE_FORMAT))
        }
    });
    
    it("Should return an error 422 Unprocessable Entity when we update a city with too short latitude", async () => {
        const city = new CityValidator(); 
        city.id = 5;
        city.name = "a city name",
        city.latitude = "124",
        city.longitude = "64.2944",
        city.picture = "a picture name";

        try {
            await validateUpdateCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.LATITUDE_FORMAT);
                expect(e.message).toEqual(CityErrorValidator.LATITUDE_FORMAT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.LATITUDE_FORMAT))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we update a city with too long latitude", async () => {
        const city = new CityValidator(); 
        city.id = 5;
        city.name = "a city name",
        city.latitude = strTooLong,
        city.longitude = "64.2944",
        city.picture = "a picture name";

        try {
            await validateUpdateCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.LATITUDE_FORMAT);
                expect(e.message).toEqual(CityErrorValidator.LATITUDE_FORMAT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.LATITUDE_FORMAT))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we update a city with empty longitude", async () => {
        const city = new CityValidator(); 
        city.id = 5;
        city.name = "a city name",
        city.latitude = "64.2944",
        city.longitude = "",
        city.picture = "a picture name";

        try {
            await validateUpdateCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.LONGITUDE_FORMAT);
                expect(e.message).toEqual(CityErrorValidator.LONGITUDE_FORMAT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.LONGITUDE_FORMAT))
        }
    });
    
    it("Should return an error 422 Unprocessable Entity when we update a city with too short longitude", async () => {
        const city = new CityValidator(); 
        city.id = 5;
        city.name = "a city name",
        city.latitude = "12.3697",
        city.longitude = "6424",
        city.picture = "a picture name";

        try {
            await validateUpdateCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.LONGITUDE_FORMAT);
                expect(e.message).toEqual(CityErrorValidator.LONGITUDE_FORMAT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.LONGITUDE_FORMAT))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we update a city with wrong format for longitude", async () => {
        const city = new CityValidator(); 
        city.id = 5;
        city.name = "a city name",
        city.latitude = "64.2369",
        city.longitude = "64.29g44",
        city.picture = "a picture name";

        try {
            await validateUpdateCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.LONGITUDE_FORMAT);
                expect(e.message).toEqual(CityErrorValidator.LONGITUDE_FORMAT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.LONGITUDE_FORMAT))
        }
    });

    it("Should return an error 422 Unprocessable Entity when we update a city with too long picture", async () => {
        const city = new CityValidator(); 
        city.id = 5;
        city.name = "a city name",
        city.latitude = "64.2944",
        city.longitude = "64.2944",
        city.picture = strTooLong;

        try {
            await validateUpdateCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.PICTURE_TOO_LONG);
                expect(e.message).toEqual(CityErrorValidator.PICTURE_TOO_LONG);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.PICTURE_TOO_LONG))
        }
    });
})
