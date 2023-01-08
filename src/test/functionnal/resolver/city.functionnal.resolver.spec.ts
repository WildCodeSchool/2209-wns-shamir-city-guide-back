import { ApolloServer } from "apollo-server";
import { startAppoloServer } from "../../../loader/appolo-server.loader";
import * as CityApi from "../api/city.functionnal.api";
import { DatabaseLoader } from "../../../loader/database.loader";
import City from "../../../entity/City.entity";
import { 
    idEqual0ErrorMessage, 
    nameTooShortErrorMessage, 
    nameTooLongErrorMessage, 
    latitudeFormatErrorMessage,
    longitudeFormatErrorMessage,
    pictureTooLongErrorMessage 
} from "../../../validator/messages.validator";
import { 
    StatusCodeClass, 
    StatusCodeMessage, 
    StatusCode, 
    strTooLong 
} from "../../../utils/constants.utils";
import { CustomError } from "../../../utils/error/CustomError.utils.error";
import { InternalServerError } from "../../../utils/error/interfaces.utils.error";
import { emojiShocked } from "../../../utils/emoji.utils";
import { formatString } from "../../../utils/string.utils";

const GET_ALL = CityApi.GET_ALL,
    GET_CITY_BY_ID = CityApi.GET_CITY_BY_ID,
    GET_CITY_BY_NAME = CityApi.GET_CITY_BY_NAME,
    CREATE_CITY = CityApi.CREATE_CITY,
    UPDATE_CITY = CityApi.UPDATE_CITY,
    DELETE = CityApi.DELETE;


// TRIGGER ERROR 500 INTERNAL ERROR WHEN WE BY-PASS THE DATABASE CONNECTION
describe("functionnal/resolver/city resolver suite of tests without database connexion", () => {
    let server: ApolloServer;
    beforeAll(async () => {
        server = await startAppoloServer();
    });

    // GETALL
    it("Should not retrieve all cities in database and throw an 500 Internal Error", async () => {
        try {
            await server.executeOperation({query: GET_ALL});
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Ouups!!Something went wrong\nProblème de connexion interne, les villes n'ont pas été chargées`);
                expect(e.statusCodeClass).toBe(StatusCodeClass.SERVER_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.SERVER_ERROR);
                expect(e.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.statusCode).toEqual(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.INTERNAL_SERVER_ERROR);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.INTERNAL_SERVER_ERROR);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new InternalServerError(), 
                    `Problème de connexion interne, les villes n'ont pas été chargées`
                ))
        }
    });

    // GETBYID
    it("Should not retrieve city by its id in database and throw an 500 Internal Error", async () => {
        try {
            await server.executeOperation({
                query: GET_CITY_BY_ID,
                variables: {id: 1}
            });
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Ouups!!Something went wrong\nProblème de connexion interne, la ville n'a pas été chargée`);
                expect(e.statusCodeClass).toBe(StatusCodeClass.SERVER_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.SERVER_ERROR);
                expect(e.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.statusCode).toEqual(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.INTERNAL_SERVER_ERROR);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.INTERNAL_SERVER_ERROR);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new InternalServerError(), 
                    `Problème de connexion interne, la ville n'a pas été chargée`
                ))
        }
    });

    // GETBYNAME
    it("Should not retrieve city by name in database and throw an 500 Internal Error", async () => {
        const name ="test";
        try {
            await server.executeOperation({
                query: GET_CITY_BY_NAME,
                variables: {name}
            });
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Ouups!!Something went wrong\nProblème de connexion interne, la ville ${name} n'a pas été chargée`);
                expect(e.statusCodeClass).toBe(StatusCodeClass.SERVER_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.SERVER_ERROR);
                expect(e.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.statusCode).toEqual(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.INTERNAL_SERVER_ERROR);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.INTERNAL_SERVER_ERROR);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new InternalServerError(), 
                    `Problème de connexion interne, la ville ${name} n'a pas été chargée`
                ))
        }
    });

    // CREATE
    it("Should not create city and throw an 500 Internal Error", async () => {
        const name = "test",
            latitude = "123.321",
            longitude = "852.321",
            picture = "picture.png";
        try {
            await server.executeOperation({
                query: CREATE_CITY,
                variables: {name, latitude, longitude, picture}
            });
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Ouups!!Something went wrong\nProblème de connexion interne, la ville ${name} n'a pas été créée`);
                expect(e.statusCodeClass).toBe(StatusCodeClass.SERVER_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.SERVER_ERROR);
                expect(e.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.statusCode).toEqual(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.INTERNAL_SERVER_ERROR);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.INTERNAL_SERVER_ERROR);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new InternalServerError(), 
                    `Problème de connexion interne, la ville ${name} n'a pas été créée`
                ))
        }
    });

    // UPDATE
    it("Should not update city and throw an 500 Internal Error", async () => {
        const updateCityId = 3,
            name = "test",
            latitude = "12.321",
            longitude = "85.321",
            picture = "picture.png";
            const tag = await server.executeOperation({
                query: UPDATE_CITY,
                variables: {updateCityId, name, latitude, longitude, picture}
            });
            
            if (tag.errors) expect(tag.errors).toBeDefined();
            if (tag.data) expect(tag.data).not.toBeDefined();
            if (tag.errors) {
                expect(tag?.errors[0]?.message).toBe(`${emojiShocked} Ouups!!Something went wrong\nProblème de connexion interne, la ville n'a pas été mise à jour`);  
                const customError = tag.errors[0].extensions?.exception;
                expect(customError.statusCodeClass).toBe(StatusCodeClass.SERVER_ERROR);
                expect(customError.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);     
                expect(customError.statusCodeMessage).toBe(StatusCodeMessage.INTERNAL_SERVER_ERROR);   
            } 
    });

     // DELETE
     it("Should not delete city and throw an 500 Internal Error", async () => {
        const deleteCityId = 1;
        
        const deleted = await server.executeOperation({
            query: DELETE,
            variables: {deleteCityId}
        });
        if (deleted.errors) expect(deleted.errors).toBeDefined();
        if (deleted.data) expect(deleted.data).not.toBeDefined();
        if (deleted.errors) {
            expect(deleted?.errors[0]?.message).toBe(`${emojiShocked} Ouups!!Something went wrong\nProblème de connexion interne, la ville n'a pas été supprimée`);  
            const customError = deleted.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.SERVER_ERROR);
            expect(customError.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.INTERNAL_SERVER_ERROR);   
        }
    });
})

describe("functionnal/resolver/city.resolver suite of tests with database connection", () => {
    let server: ApolloServer;

    beforeAll(async () => {
        await DatabaseLoader.openConnection();
        server = await startAppoloServer();
    });

    // GETALL
    it("Should retrieve all cities from database", async () => {
        const cities = await server.executeOperation({query: GET_ALL})
        
        expect(cities.errors).toBeUndefined();
        expect(cities.data?.getAllCities).toBeDefined();
        expect(cities.data && typeof cities.data?.getAllCities === 'object').toBe(true);
        if (cities.data) {
            cities.data.getAllCities.forEach((c: City)=> {
                expect(c).toEqual(expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    latitude: expect.any(String),
                    longitude: expect.any(String),
                    picture: expect.any(String)
                }));
            })
        };
    });
    
    // GET BY ID
    it("Should retrieve a city by its id", async () => {
        const city = await server.executeOperation({
            query: GET_CITY_BY_ID,
            variables: {id: 1}
        })

        expect(city.errors).toBeUndefined();
        expect(city.data?.getCityById).toBeDefined();
        expect(city.data?.getCityById).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            latitude: expect.any(String),
            longitude: expect.any(String),
            picture: expect.any(String)
        }));
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to retrieve a city with the id 0", async () => {
        const city = await server.executeOperation({
            query: GET_CITY_BY_ID,
            variables: {id: 0}
        })
        
        expect(city.errors).toBeDefined();
        expect(city.data?.getCityById).not.toBeDefined();
        if (city.errors) {
            expect(city?.errors[0]?.message).toBe(idEqual0ErrorMessage); 
            const customError = city.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a city with an unknown id from database", async () => {
        const city = await server.executeOperation({
            query: GET_CITY_BY_ID,
            variables: {id: 10}
        })
        
        expect(city.errors).toBeDefined();
        expect(city.data?.getCityById).not.toBeDefined();
        if (city.errors) {
            expect(city?.errors[0]?.message).toBe("La ville n'existe pas en base de données"); 
            const customError = city.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);  
        } 
    });

    //GET BY NAME
    it("Should retrieve a city by its name", async () => {
        const city = await server.executeOperation({
            query: GET_CITY_BY_NAME,
            variables: {name: "paris"}
        })

        expect(city.errors).toBeUndefined();
        expect(city.data?.getCityByName).toBeDefined();
        expect(city.data?.getCityByName).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            latitude: expect.any(String),
            longitude: expect.any(String),
            picture: expect.any(String)
        }));
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to retrieve a city with an empty name", async () => {
        const city = await server.executeOperation({
            query: GET_CITY_BY_NAME,
            variables: {name: ""}
        })
        
        expect(city.errors).toBeDefined();
        expect(city.data?.getCityByName).not.toBeDefined();
        if (city.errors) {
            expect(city?.errors[0]?.message).toBe(nameTooShortErrorMessage); 
            const customError = city.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a city with an unknown name from database", async () => {
        const city = await server.executeOperation({
            query: GET_CITY_BY_NAME,
            variables: {name: "lorem"}
        })
        
        expect(city.errors).toBeDefined();
        expect(city.data?.getCityByName).not.toBeDefined();
        if (city.errors) {
            expect(city?.errors[0]?.message).toBe("La ville avec le nom lorem n'existe pas en base de données"); 
            const customError = city.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);  
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to retrieve a city with a name too long than 255 characters", async () => {
        const city = await server.executeOperation({
            query: GET_CITY_BY_NAME,
            variables: {name: strTooLong}
        })
        
        expect(city.errors).toBeDefined();
        expect(city.data?.getCityByName).not.toBeDefined();
        if (city.errors) {
            expect(city?.errors[0]?.message).toBe(nameTooLongErrorMessage); 
            const customError = city.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);  
        } 
    });

    // // CREATE
    // it("Should create and returns a city", async () => {
    //     const city = await server.executeOperation({
    //         query: CREATE_CITY,
    //         variables: { 
    //             name: "new city", 
    //             latitude: "654.456",
    //             longitude: "846.264",
    //             picture: 'picture.png' 
    //         }
    //     })
        
    //     if (city.errors) expect(city.errors[0]).toBeDefined();
    //     expect(city.data?.createCity).toBeDefined();
    //     expect(city.data?.createCity).toEqual(expect.objectContaining({
    //         id: expect.any(String),
    //         name: expect.any(String),
    //         latitude: expect.any(String),
    //         longitude: expect.any(String),
    //         picture: expect.any(String) 
    //     }));
    // });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a city with an empty name", async () => {
        const city = await server.executeOperation({
            query: CREATE_CITY,
            variables: { 
                name: "", 
                latitude: "654.456",
                longitude: "846.264",
                picture: 'picture.png' 
            }
        })
        
        if (city.errors) expect(city.errors[0]).toBeDefined();
        if (city.data) expect(city.data).not.toBeDefined();
        expect(city.data?.getCityByName).not.toBeDefined();
        if (city.errors) {
            expect(city?.errors[0]?.message).toBe(nameTooShortErrorMessage); 
            const customError = city.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a city with a name filled by white spaces", async () => {
        const city = await server.executeOperation({
            query: CREATE_CITY,
            variables: { 
                name: "    ", 
                latitude: "654.496",
                longitude: "846.5884",
                picture: 'picture.png' 
            }
        })
        
        if (city.errors) expect(city.errors[0]).toBeDefined();
        expect(city.data?.getCityByName).not.toBeDefined();
        if (city.errors) {
            expect(city?.errors[0]?.message).toBe(nameTooShortErrorMessage); 
            const customError = city.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a city with a name wich is already used in database", async () => {
        const formattedName = formatString("paris");
        const city = await server.executeOperation({
            query: CREATE_CITY,
            variables: { 
                name: "paris", 
                latitude: "54.4596",
                longitude: "46.5458",
                picture: 'paris.png' 
            }
        })
        
        if (city.errors) expect(city.errors[0]).toBeDefined();
        expect(city.data?.getCityByName).not.toBeDefined();
        if (city.errors) {
            expect(city?.errors[0]?.message).toBe(`Le nom de ville ${formattedName} est déjà utilisé, vous devez en choisir un autre`); 
            const customError = city.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a city with a name too long, more than 255 characters", async () => {
        const city = await server.executeOperation({
            query: CREATE_CITY,
            variables: { 
                name: strTooLong, 
                latitude: "654.496",
                longitude: "846.5884",
                picture: 'paris.png' 
            }
        })
        
        if (city.errors) expect(city.errors[0]).toBeDefined();
        expect(city.data?.getCityByName).not.toBeDefined();
        if (city.errors) {
            expect(city?.errors[0]?.message).toBe(nameTooLongErrorMessage);  
            const customError = city.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a city with an latitude too short", async () => {
        const city = await server.executeOperation({
            query: CREATE_CITY,
            variables: { 
                name: "Los Angeles", 
                latitude: "",
                longitude: "86.5884",
                picture: 'la.png' 
            }
        })
        
        if (city.errors) expect(city.errors).toBeDefined();
        if (city.data) expect(city.data).not.toBeDefined();
        if (city.errors) {
            expect(city?.errors[0]?.message).toBe(latitudeFormatErrorMessage);  
            const customError = city.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a city with an latitude too long", async () => {
        const city = await server.executeOperation({
            query: CREATE_CITY,
            variables: { 
                name: "Los Angeles", 
                latitude: strTooLong,
                longitude: "84.5884",
                picture: 'la.png' 
            }
        })
        
        if (city.errors) expect(city.errors).toBeDefined();
        if (city.data) expect(city.data).not.toBeDefined();
        if (city.errors) {
            expect(city?.errors[0]?.message).toBe(latitudeFormatErrorMessage);  
            const customError = city.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a city with an longitude too short", async () => {
        const city = await server.executeOperation({
            query: CREATE_CITY,
            variables: { 
                name: "Los Angeles", 
                latitude: "86.5884",
                longitude: "",
                picture: 'la.png' 
            }
        })
        
        if (city.errors) expect(city.errors).toBeDefined();
        if (city.data) expect(city.data).not.toBeDefined();
        if (city.errors) {
            expect(city?.errors[0]?.message).toBe(longitudeFormatErrorMessage);  
            const customError = city.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a city with an longitude too long", async () => {
        const city = await server.executeOperation({
            query: CREATE_CITY,
            variables: { 
                name: "Los Angeles", 
                latitude: "86.5884",
                longitude: strTooLong,
                picture: 'la.png' 
            }
        })
        
        if (city.errors) expect(city.errors).toBeDefined();
        if (city.data) expect(city.data).not.toBeDefined();
        if (city.errors) {
            expect(city?.errors[0]?.message).toBe(longitudeFormatErrorMessage);  
            const customError = city.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a city with an picture too long", async () => {
        const city = await server.executeOperation({
            query: CREATE_CITY,
            variables: { 
                name: "Los Angeles", 
                latitude: "46.5884",
                longitude: "46.5884",
                picture: strTooLong 
            }
        })
        
        if (city.errors) expect(city.errors).toBeDefined();
        if (city.data) expect(city.data).not.toBeDefined();
        if (city.errors) {
            expect(city?.errors[0]?.message).toBe(pictureTooLongErrorMessage);  
            const customError = city.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    //UPDATE
    it("Should update and returns a city", async () => {
        const city = await server.executeOperation({
            query: UPDATE_CITY,
            variables: { 
                updateCityId: 5, 
                name: "Los Angeles", 
                latitude: "86.5884",
                longitude: "64.963",
                picture: 'la.png'  
            }
        })
        if (city.errors) expect(city.errors).toBeUndefined();
        expect(city.data?.updateCity).toBeDefined();
        expect(city.data?.updateCity).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            latitude: expect.any(String),
            longitude: expect.any(String),
            picture: expect.any(String)
        }));
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a city with an id which doesn't exist in databse", async () => {
        const city = await server.executeOperation({
            query: UPDATE_CITY,
            variables: { 
                updateCityId: 10, 
                name: "Rio", 
                latitude: "52.159",
                longitude: "66.738",
                picture: 'rio.png'  
            }
        })
        
        if (city.errors) expect(city.errors).toBeDefined();
        if (city.data) expect(city.data).not.toBeDefined();
        if (city.errors) {
            expect(city?.errors[0]?.message).toBe(`La ville n'existe pas en base de données`);  
            const customError = city.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a city with a latitude and longitude wich are already used in database", async () => {
        const city = await server.executeOperation({
            query: UPDATE_CITY,
            variables: { 
                updateCityId: 5, 
                name: "Rio", 
                latitude: "48.1113387",
                longitude: "-1.6800198",
                picture: 'rio.png'
            }
        })
        
        if (city.errors) expect(city.errors).toBeDefined();
        if (city.data) expect(city.data).not.toBeDefined();
        if (city.errors) {
            expect(city?.errors[0]?.message).toBe("La ville avec la latitude 48.1113387 et la longitude -1.6800198 exist déjà en base de données");  
            const customError = city.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    //DELETE
    it("Should trigger an error 404 Not Found when we attempt to delete a city with an id wich doesn't exist in database", async () => {
        const city = await server.executeOperation({
            query: DELETE,
            variables: {deleteCityId: 10}
        })
        
        if (city.errors) expect(city.errors).toBeDefined();
        if (city.data) expect(city.data).not.toBeDefined();
        if (city.errors) {
            expect(city?.errors[0]?.message).toBe("La ville n'existe pas en base de données");  
            const customError = city.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);   
        } 
    });
});