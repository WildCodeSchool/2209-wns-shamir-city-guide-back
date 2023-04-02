import "reflect-metadata";
import { 
    CityValidator, 
    validateCreationCityInput, 
    validateUpdateCityInput 
} from "../../../validators/entities/city.validator.entity";
import { CityErrorValidator } from "../../../validators/messages.validator";
import { UserValidator } from "../../../validators/entities/user.validator.entity";
import { CustomError } from "../../../utils/errors/CustomError.utils.error";
import { BadRequestError, UnprocessableEntityError } from "../../../utils/errors/interfaces.utils.error";
import { StatusCodeClass, StatusCodeMessage, StatusCode, strTooLong } from "../../../utils/constants.utils";

const cityToTest = new CityValidator(); 
cityToTest.name = " a city name   ",
cityToTest.latitude = "15.641800",
cityToTest.longitude = "64.294400",
cityToTest.picture = "https://cityNameTest.png";

const userToTest = new UserValidator();
userToTest.id = 1;
userToTest.username = "Test"
userToTest.email = "test@gmail.com";
userToTest.password = "Test2023$";

cityToTest.user = userToTest;

const cityToTestForUpdate = {...cityToTest, id: 1};


describe("unit/validator/city.validator suite of tests", () => {
    // CREATE CITY
    it("Should return City when we create a city with filled fields", async () => {
        const city = {...cityToTest}; 
        const createdCity = await validateCreationCityInput(city);
        
        expect(createdCity instanceof CityValidator).toBe(true);
        expect(createdCity.name).toBe("a city name");
        expect(createdCity.latitude).toBe("15.641800");
        expect(createdCity.longitude).toBe("64.294400");
        expect(createdCity.picture).toBe("https://cityNameTest.png");
    });

    it("Should return City when we create a city with filled fields and white spaces to trim in name", async () => {
        const city = {...cityToTest};
        const createdCity = await validateCreationCityInput(city);
        
        expect(createdCity instanceof CityValidator).toBe(true);
        expect(createdCity.name).toBe("a city name");
        expect(createdCity.latitude).toBe("15.641800");
        expect(createdCity.longitude).toBe("64.294400");
        expect(createdCity.picture).toBe("https://cityNameTest.png");
    });

    it('Should trigger 400 Bad Request Error during the city creation when an id is present', async () => {
        const city = {...cityToTest};
        
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
        const city = {...cityToTest}; 
        city.name = "";
        
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
        const city = {...cityToTest}; 
        city.name = strTooLong;

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
        const city = {...cityToTest}; 
        city.latitude = "";

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
        const city = {...cityToTest}; 
        city.latitude = "124";
        
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
        const city = {...cityToTest};
        city.latitude = strTooLong;
        
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
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.LATITUDE_FORMAT));
        }
    });
    
    it("Should return an error 422 Unprocessable Entity when we create a city with empty longitude", async () => {
        const city = {...cityToTest};
        city.longitude = "";
       
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
        const city = {...cityToTest};
        city.longitude = "32.4";
        
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
        const city = {...cityToTest};
        city.longitude = strTooLong;

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
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.LONGITUDE_FORMAT));
            cityToTest.longitude = "64.294400";
        }
    });

    it("Should return an error 422 Unprocessable Entity City when we create a city with empty picture", async () => {
        const city = {...cityToTest};
        city.picture = "";

        try {
            await validateCreationCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.PICTURE_WRONG_FORMAT);
                expect(e.message).toEqual(CityErrorValidator.PICTURE_WRONG_FORMAT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.PICTURE_WRONG_FORMAT));
        }
    });
    
    // UPDATE CITY
    it("Should return update city when we update a city with all filled fields", async () => {
        const city = {...cityToTestForUpdate}; 
        const updatedCity = await validateUpdateCityInput(city);
        
        expect(updatedCity instanceof CityValidator).toBe(true);
        expect(updatedCity.name).toBe("a city name");
        expect(updatedCity.picture).toBe("https://cityNameTest.png");
    });

    it("Should return an error 422 Unprocessable Entity when we update a city with an empty picture", async () => {
        const city = {...cityToTestForUpdate};
        city.picture = "";
        
        try {
            await validateUpdateCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.PICTURE_WRONG_FORMAT);
                expect(e.message).toEqual(CityErrorValidator.PICTURE_WRONG_FORMAT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.PICTURE_WRONG_FORMAT));
        }
    });

    it('Should trigger 400 Bad Request Error during the city update when an id is not present', async () => {
        const city = {...cityToTest};
        
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
        const city = {...cityToTestForUpdate}; 
        city.name = "";
        
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
        const city = {...cityToTestForUpdate};
        city.name = strTooLong;

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
        const city = {...cityToTestForUpdate};
        city.latitude = "";

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
        const city = {...cityToTestForUpdate};
        city.latitude = "124";

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
        const city = {...cityToTestForUpdate};
        city.latitude = strTooLong;

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
        const city = {...cityToTestForUpdate};
        city.longitude = "";

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
        const city = {...cityToTestForUpdate};
        city.longitude = "6424";

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
        const city = {...cityToTestForUpdate};
        city.longitude = "64.29g44";

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
        const city = {...cityToTestForUpdate};
        city.picture = strTooLong;

        try {
            await validateUpdateCityInput(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(CityErrorValidator.PICTURE_WRONG_FORMAT);
                expect(e.message).toEqual(CityErrorValidator.PICTURE_WRONG_FORMAT);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new UnprocessableEntityError(), CityErrorValidator.PICTURE_WRONG_FORMAT))
        }
    });
})
