import { DatabaseLoader } from "../../../loaders/database.loader";
import * as CityService from "../../../services/city.service";
import { CustomError } from "../../../utils/errors/CustomError.utils.error";
import { NotFoundError, InternalServerError, UnprocessableEntityError } from "../../../utils/errors/interfaces.utils.error";
import { StatusCodeClass, StatusCodeMessage, StatusCode } from "../../../utils/constants.utils";
import { emojiShocked } from "../../../utils/emoji.utils";
import { formatString } from "../../../utils/string.utils";
import { CityValidator } from "../../../validators/entities/city.validator.entity";
import { CityErrorsFlag, handleCityError } from "../../../utils/errors/handleError/city.utils.error";
import City from "../../../entities/City.entity";

const getAll = CityService.getAll, 
    getCityById = CityService.getById,
    getCityByName = CityService.getByName,
    create = CityService.create, 
    update = CityService.update,
    deleteCity = CityService.deleteCity;


// TRIGGER 500 INTERNAL ERROR
describe("integration/service/city.service suite of tests without database connexion", () => {
    it("Should not retrieve all cities in database and throw an 500 Internal Error", async () => {
        try {
            await getAll();
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, les villes n'ont pas été chargées`);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.SERVER_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.SERVER_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.extensions.statusCode).toEqual(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.INTERNAL_SERVER_ERROR);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.INTERNAL_SERVER_ERROR);
            }
            
            expect(e).toBeDefined(); 
            expect(e).toStrictEqual(
                new CustomError(
                    new InternalServerError(), 
                    `Problème de connexion interne, les villes n'ont pas été chargées`
                ))
        }
    });
    
    it("Should not retrieve city by its id in database and throw an 500 Internal Error", async () => {
        try {
            await getCityById(1);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, la ville n'a pas été chargée`);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.SERVER_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.SERVER_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.extensions.statusCode).toEqual(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.INTERNAL_SERVER_ERROR);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.INTERNAL_SERVER_ERROR);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new InternalServerError(), 
                    `Problème de connexion interne, la ville n'a pas été chargée`
                ))
        }
    });
    
    it("Should not retrieve tag by its name in database and throw an 500 Internal Error", async () => {
        const name = "test";
        try {
            await getCityByName(name);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, la ville ${name} n'a pas été chargée`);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.SERVER_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.SERVER_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.extensions.statusCode).toEqual(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.INTERNAL_SERVER_ERROR);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.INTERNAL_SERVER_ERROR);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new InternalServerError(), 
                    `Problème de connexion interne, la ville ${name} n'a pas été chargée`
                ))
        }
    });
    
    it("Should not create a city and throw an 500 Internal Error", async () => {
        const name = formatString("name"),
            latitude = "123.321",
            longitude = "321.123",
            picture = "picture.png";
        const city = new CityValidator();
        city.name = name;
        city.latitude = latitude;
        city.longitude = longitude;
        city.picture = picture;
        try {
            await create(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, la ville ${name} n'a pas été créée`);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.SERVER_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.SERVER_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.extensions.statusCode).toEqual(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.INTERNAL_SERVER_ERROR);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.INTERNAL_SERVER_ERROR);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new InternalServerError(), 
                    `Problème de connexion interne, la ville ${name} n'a pas été créée`
                ))
        }
    });
    
    it("Should not update a city and throw an 500 Internal Error", async () => {
        const city = new CityValidator();
        city.id = 5,
        city.name = formatString("test"),
        city.latitude = "369.125",
        city.longitude = "852.465",
        city.picture = "";
        try {
            await update(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, la ville n'a pas été mise à jour`);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.SERVER_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.SERVER_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.extensions.statusCode).toEqual(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.INTERNAL_SERVER_ERROR);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.INTERNAL_SERVER_ERROR);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new InternalServerError(), 
                    `Problème de connexion interne, la ville n'a pas été mise à jour`
                ))
        }
    });
    
    it("Should not delete a tag and throw an 500 Internal Error", async () => {
        try {
            await deleteCity(1);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, la ville n'a pas été supprimée`);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.SERVER_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.SERVER_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.extensions.statusCode).toEqual(StatusCode.INTERNAL_SERVER_ERROR);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.INTERNAL_SERVER_ERROR);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.INTERNAL_SERVER_ERROR);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new InternalServerError(), 
                    `Problème de connexion interne, la ville n'a pas été supprimée`
                ))
        }
    });
});


// NOW WE INSTANCIATE THE DATABASE CONNECTION TO AVOID INTERNAL ERROR 500
describe("integration/service/city.service suite of tests with database connexion", () => {
    beforeAll(async () => {
        await DatabaseLoader.openConnection();
    });


    // GET ALL
    it("Should retrieve all cities in database", async () => {
        
        const cities: City[] = await getAll();
        expect(cities).not.toBeUndefined();
        expect(cities).toBeDefined();
        expect(cities && typeof cities === 'object').toBe(true);
        expect(cities[0]).toBeInstanceOf(City);
        cities.forEach(t => {
            expect(cities[0]).toEqual(expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                latitude: expect.any(String),
                longitude: expect.any(String),
                picture: expect.any(String)
            }));
        })
    }); 
     
    // GET BY ID
    it("Should retrieve a city by its id", async () => {
        const city: City = await getCityById(1);
        expect(city).not.toBeUndefined();
        expect(city).toBeDefined();
        expect(city && typeof city === 'object').toBe(true);
        expect(city).toBeInstanceOf(City)
        expect(city).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            latitude: expect.any(String),
            longitude: expect.any(String),
            picture: expect.any(String)
        }));
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a city with the id 0", async () => {
        try {
            await getCityById(0);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`La ville n'existe pas en base de données`);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.NOT_FOUND);
                expect(e.extensions.statusCode).toEqual(StatusCode.NOT_FOUND);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.NOT_FOUND);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new NotFoundError(),
                    `La ville n'existe pas en base de données`
                )
            );
        }
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a city with the id 10 wich doesn't exist in the city_guid database", async () => {
        try {
            await getCityById(10);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`La ville n'existe pas en base de données`);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.NOT_FOUND);
                expect(e.extensions.statusCode).toEqual(StatusCode.NOT_FOUND);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.NOT_FOUND);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new NotFoundError(),
                    `La ville n'existe pas en base de données`
            ));
        }
    });

    //GET BY NAME
    it("Should retrieve a city by its name", async () => {
        const city: City = await getCityByName("rennes");
        
        expect(city).toBeDefined();
        expect(city && typeof city === 'object').toBe(true);
        expect(city).toBeInstanceOf(City);
        expect(city.name).toBe("Rennes");
        expect(city).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            latitude: expect.any(String),
            longitude: expect.any(String),
            picture: expect.any(String)
        }));
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a city with an empty name", async () => {
        try {
            await getCityByName("");
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("La ville avec le nom  n'existe pas en base de données");
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.NOT_FOUND);
                expect(e.extensions.statusCode).toEqual(StatusCode.NOT_FOUND);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.NOT_FOUND);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new NotFoundError(),
                    "La ville avec le nom  n'existe pas en base de données"
            )
            )
        }
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a city with an unknown name in database", async () => {
        const name = "Se mettre au vert";
        try {
            await getCityByName(name);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`La ville avec le nom ${name} n'existe pas en base de données`);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.NOT_FOUND);
                expect(e.extensions.statusCode).toEqual(StatusCode.NOT_FOUND);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.NOT_FOUND);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new NotFoundError(), 
                    `La ville avec le nom ${name} n'existe pas en base de données`
                ))
        }
    });


    // CREATE
    // it("Should create a city and returns it", async () => {
    //     const city = new City();
    //     city.name = "madrid";
    //     city.latitude = "458.2967";
    //     city.longitude = "568.1832";
    //     city.picture = 'madrid.png';
    //     const createdCity: City = await create(city);
    //     expect(createdCity).not.toBeUndefined();
    //     expect(createdCity).toBeDefined();
    //     expect(createdCity && typeof createdCity === 'object').toBe(true);
    //     expect(createdCity).toBeInstanceOf(Object)
    //     expect(createdCity.id).toBe(6);
    //     expect(createdCity.name).toBe("Madrid");
    //     expect(createdCity.picture).toBe("madrid.png");
    //     expect(createdCity).toEqual(expect.objectContaining({
    //         id: expect.any(Number),
    //         name: expect.any(String),
    //         latitude: expect.any(String),
    //         longitude: expect.any(String),
    //         picture: expect.any(String)
    //     }));
    // });

    it("Should return an error 422 Unprocessable Entity if we attempt to create a city with a name which already exist in database", async () => {
        const city = new CityValidator();
        city.name = "Rennes";
        city.latitude = "48.1113387";
        city.longitude = "-1.6800";
        city.picture = ""
        try {
            await create(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`Le nom de ville ${city.name} est déjà utilisé, vous devez en choisir un autre`);
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
                    `Le nom de ville ${city.name} est déjà utilisé, vous devez en choisir un autre`
                ))
        }
    });
    
    it("Should return an error 422 Unprocessable Entity if we attempt to create a city with a localisation which already exist in database", async () => {
        const city = new CityValidator(),
            latitude = "48.1113387",
            longitude = "-1.6800198";
        city.name = "x";
        city.latitude = latitude;
        city.longitude =longitude;
        city.picture = 'x.png';
        try {
            await create(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`La ville avec la latitude ${latitude} et la longitude ${longitude} existe déjà en base de données`);
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
                    `La ville avec la latitude ${latitude} et la longitude ${longitude} existe déjà en base de données`
                ))
        }
    });

    // UPDATE
    it("Should update a city and returns it", async () => {
        const city = new CityValidator();
        city.id = 4;
        city.name = "avignon";
        city.latitude = "456.856";
        city.longitude = "489.753";
        city.picture = "avignon.png";
        const updatedCity: City = await update(city);
        expect(updatedCity).not.toBeUndefined();
        expect(updatedCity).toBeDefined();
        expect(updatedCity && typeof updatedCity === 'object').toBe(true);
        expect(updatedCity).toBeInstanceOf(Object)
        expect(updatedCity.name).toBe("Avignon");
        expect(updatedCity.latitude).toBe("456.856");
        expect(updatedCity.longitude).toBe("489.753");
        expect(updatedCity.picture).toBe("avignon.png");
        expect(updatedCity).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            latitude: expect.any(String),
            longitude: expect.any(String),
            picture: expect.any(String)
        }));
    });

    it("Should return an error 404 NOT FOUND if we update a city with an id which doesn't exist in database", async () => {
        const city = new CityValidator();
        city.id = 4;
        city.name = "avignon";
        city.latitude = "456.856";
        city.longitude = "489.753";
        city.picture = "avignon.png";
        try {
            await update(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("La ville avec l'id 4 n'existe pas en base de données");
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.NOT_FOUND);
                expect(e.extensions.statusCode).toEqual(StatusCode.NOT_FOUND);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.NOT_FOUND);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new NotFoundError(), 
                    "La ville avec l'id 4 n'existe pas en base de données"
                ))
        }
    });

    it("Should return an error 422 Unprocessable Entity if we attempt to update a city with a name which already exist in database", async () => {
        const city = new CityValidator();
        city.id = 4;
        city.name = "New York";
        city.latitude = "456.856";
        city.longitude = "489.753";
        city.picture = "avignon.png";
        try {
            await update(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`Le nom ${city.name} est déjà utilisé, vous devez en choisir un autre`);
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
                    `Le nom ${city.name} est déjà utilisé, vous devez en choisir un autre`
                ))
        }
    });

    it("Should return an error 422 Unprocessable Entity if we attempt to update a city with a localisation which already exist in database", async () => {
        const city = new CityValidator();
        city.id = 4;
        city.name = "x";
        city.latitude = "48.1113387";
        city.longitude = "-1.6800198";
        city.picture = "x.png";
        try {
            await update(city);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("La ville avec la latitude 48.1113387 et la longitude -1.6800198 existe déjà en base de données");
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
                    "La ville avec la latitude 48.1113387 et la longitude -1.6800198 existe déjà en base de données"
                ))
        }
    });

    // // DELETE
    // it("Should delete a city and returns it", async () => {
    //     const city: City = await deleteTag(5);
    //     expect(city).not.toBeUndefined();
    //     expect(city).toBeDefined();
    //     expect(city && typeof city === 'object').toBe(true);
    //     expect(city).toBeInstanceOf(Object);
    //     expect(city.id).toBe(undefined);
    //     expect(city.name).toBe("Updated city");
    //     expect(city.icon).toBe("updated.png");
    //     expect(city).toEqual(expect.objectContaining({
    //      id: expect.any(Number),
    //      name: expect.any(String),
    //      latitude: expect.any(String),
    //      longitude: expect.any(String),
    //      picture: expect.any(String)
    //     }));
    // });

    it("Should return an error 404 NOT FOUND if we delete a city with an id which doesn't exist in database", async () => {
        try {
            await deleteCity(10);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("La ville n'existe pas en base de données");
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.NOT_FOUND);
                expect(e.extensions.statusCode).toEqual(StatusCode.NOT_FOUND);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.NOT_FOUND);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new NotFoundError(), 
                    "La ville n'existe pas en base de données"
                ))
        }
    });
});
