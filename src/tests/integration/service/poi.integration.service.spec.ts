import { DatabaseLoader } from "../../../loaders/database.loader";
import * as PoiService from "../../../services/poi.service";
import { CustomError } from "../../../utils/errors/CustomError.utils.error";
import { NotFoundError, InternalServerError, UnprocessableEntityError } from "../../../utils/errors/interfaces.utils.error";
import { StatusCodeClass, StatusCodeMessage, StatusCode } from "../../../utils/constants.utils";
import Poi from "../../../entities/PointOfInterest.entity";
import { emojiShocked } from "../../../utils/emoji.utils";
import { formatString } from "../../../utils/string.utils";
import { PoiValidator } from "../../../validators/entities/poi.validator.entity";
import { CityValidator } from "../../../validators/entities/city.validator.entity";
import { TypeValidator } from "../../../validators/entities/type.validator.entity";
import { TagValidator } from "../../../validators/entities/tag.validator.entity";


const getAll = PoiService.getAll, 
    getPoiById = PoiService.getById,
    getPoiByName = PoiService.getByName,
    create = PoiService.create,
    update = PoiService.update,
    deletePoi = PoiService.deletePoi;


// TRIGGER 500 INTERNAL ERROR
describe("integration/service/poi.service suite of tests without database connexion", () => {
    it("Should not retrieve all poi in database and throw an 500 Internal Error", async () => {
        try {
            await getAll();
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, les points d'intêret n'ont pas été chargés`);
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
                    `Problème de connexion interne, les points d'intêret n'ont pas été chargés`
                ))
        }
    });
    
    it("Should not retrieve poi by its id in database and throw an 500 Internal Error", async () => {
        try {
            await getPoiById(1);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le point d'intêret n'a pas été chargé`);
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
                    `Problème de connexion interne, le point d'intêret n'a pas été chargé`
                ))
        }
    });
    
    it("Should not retrieve poi by its name in database and throw an 500 Internal Error", async () => {
        const name = formatString("test");
        try {
            await getPoiByName(name);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le point d'intêret ${name} n'a pas été chargé`);
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
                    `Problème de connexion interne, le point d'intêret ${name} n'a pas été chargé`
                ))
        }
    });
    
    it("Should not create a poi and throw an 500 Internal Error", async () => {
        const poi = new PoiValidator();
        poi.name = formatString("test");
        poi.address = "test address";
        poi.latitude = "latitude";
        poi.longitude = "longitude";
        poi.picture = "picture";
        poi.city = new CityValidator();
        poi.city.id = 1;
        poi.city.name = "Paris";
        poi.city.latitude = "48.8588897";
        poi.city.longitude = "2.2950372";
        poi.type = new TypeValidator();
        poi.type.id = 3;
        poi.type.name = "test3";
        poi.type.logo = "test3.jpg",
        poi.type.color = "#f4f4f4";

        try {
            await create(poi);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le point d'intêret ${poi.name} n'a pas été créé`);
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
                    `Problème de connexion interne, le point d'intêret ${poi.name} n'a pas été créé`
                ))
        }
    });
    
    it("Should not update a poi and throw an 500 Internal Error", async () => {
        const poi = new PoiValidator();
        poi.id = 1;
        poi.name = formatString("test");
        poi.address = "test address";
        poi.latitude = "latitude";
        poi.longitude = "longitude";
        poi.picture = "picture";
        poi.city = new CityValidator();
        poi.city.id = 1;
        poi.city.name = "Paris";
        poi.city.latitude = "48.8588897";
        poi.city.longitude = "2.2950372";
        poi.type = new TypeValidator();
        poi.type.id = 3;
        poi.type.name = "test3";
        poi.type.logo = "test3.jpg",
        poi.type.color = "#f4f4f4";

        try {
            await update(poi);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le point d'intêret n'a pas été mis à jour`);
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
                    `Problème de connexion interne, le point d'intêret n'a pas été mis à jour`
                ))
        }
    });
    
    it("Should not delete a poi and throw an 500 Internal Error", async () => {
        try {
            await deletePoi(1);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le point d'intêret n'a pas été supprimé`);
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
                    `Problème de connexion interne, le point d'intêret n'a pas été supprimé`
                ))
        }
    });
})


// NOW WE INSTANCIATE THE DATABASE CONNECTION TO AVOID INTERNAL ERROR 500
describe("integration/service/poi.service suite of tests with database connexion", () => {
    beforeAll(async () => {
        await DatabaseLoader.openConnection(); 
    });
   
    // GET ALL
    it("Should retrieve all poi from database", async () => {
        const poiArr: Poi[] = await getAll();
        expect(poiArr).not.toBeUndefined();
        expect(poiArr).toBeDefined();
        expect(poiArr && typeof poiArr === 'object').toBe(true);
        expect(poiArr[0]).toBeInstanceOf(Poi);
        poiArr.forEach(t => {
            expect(poiArr[0]).toEqual(expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                address: expect.any(String),
                latitude: expect.any(String),
                longitude: expect.any(String),
                picture: expect.any(String)
            }));
        })
    }); 
     
    // GET BY ID
    it("Should retrieve a poi by its id", async () => {
        const poi: Poi = await getPoiById(1);
        expect(poi).not.toBeUndefined();
        expect(poi).toBeDefined();
        expect(poi && typeof poi === 'object').toBe(true);
        expect(poi).toBeInstanceOf(Poi);
        expect(poi).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            address: expect.any(String),
            latitude: expect.any(String),
            longitude: expect.any(String),
            picture: expect.any(String)
        }));
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a poi with the id 0", async () => {
        try {
            await getPoiById(0);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le point d'intêret n'existe pas en base de données");
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
                    "Le point d'intêret n'existe pas en base de données"
            ))
        }
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a poi with the id 10 wich doesn't exist in the city_guid database", async () => {
        try {
            await getPoiById(10);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le point d'intêret n'existe pas en base de données");
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
                    "Le point d'intêret n'existe pas en base de données"
                ))
        }
    });

    //GET BY NAME
    it("Should retrieve a poi by its name", async () => {
        const poi: Poi = await getPoiByName("Musée du Louvre");
        
        expect(poi).toBeDefined();
        expect(poi && typeof poi === 'object').toBe(true);
        expect(poi).toBeInstanceOf(Poi);
        expect(poi.name).toBe("Musée du Louvre");
        expect(poi).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            address: expect.any(String),
            latitude: expect.any(String),
            longitude: expect.any(String),
            picture: expect.any(String)
        }));
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a poi with an empty name", async () => {
        try {
            await getPoiByName("");
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le point d'intêret avec le nom  n'existe pas en base de données");
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
                    "Le point d'intêret avec le nom  n'existe pas en base de données"
                ))
        }
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a poi with an unknown name in database", async () => {
        try {
            await getPoiByName("Se mettre au vert");
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le point d'intêret avec le nom Se mettre au vert n'existe pas en base de données");
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
                    "Le point d'intêret avec le nom Se mettre au vert n'existe pas en base de données"
                ))
        }
    });

    // CREATE
    const poi = new PoiValidator(); 
    poi.name = "a poi name",
    poi.address = "adrress",
    poi.latitude = "23.2589",
    poi.longitude = "12.3657",
    poi.picture = "a poi picture";
    

    const city = new CityValidator();
    city.id = 1;
    city.name = "city name",
    city.latitude = "15.6418",
    city.longitude = "64.2944",
    city.picture = "picture";
    poi.city = city;

    const type = new TypeValidator();
    type.id = 1;
    type.name = "name type";
    type.logo = "logo type";
    type.color = "#fff";
    poi.type = type;

    poi.tags = [];

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a poi with a localisation wich is already used in database", async () => {
        poi.latitude = "48.8611473",
        poi.longitude = "2.3380277";

        try {
            await create(poi);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le point d'intêret avec la latitude 48.8611473 et la longitude 2.3380277 existe déjà en base de données");
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
                    "Le point d'intêret avec la latitude 48.8611473 et la longitude 2.3380277 existe déjà en base de données"
                ))
        }
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a poi with a name wich is already used in database", async () => {
        poi.name = "Musée du Louvre",
        poi.latitude = "15.6418",
        poi.longitude = "64.2944";

        try {
            await create(poi);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le point d'intêret Musée du Louvre est déjà utilisé, vous devez en choisir un autre");
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
                    "Le point d'intêret Musée du Louvre est déjà utilisé, vous devez en choisir un autre"
                ))
        }
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a poi with an address wich is already used in database", async () => {
        poi.name = "poi name",
        poi.address = "Rue de Rivoli, 75001 Paris";
        
        try {
            await create(poi);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("L'adresse Rue de Rivoli, 75001 Paris est déjà utilisée, vous devez en choisir une autre");
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
                    "L'adresse Rue de Rivoli, 75001 Paris est déjà utilisée, vous devez en choisir une autre"
                ))
        }
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a poi with an picture wich is already used in database", async () => {
        poi.address = "poi address",
        poi.picture = "musee-du-louvre.png";
        
        try {
            await create(poi);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("L'image musee-du-louvre.png est déjà utilisée, vous devez en choisir une autre");
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
                    "L'image musee-du-louvre.png est déjà utilisée, vous devez en choisir une autre"
                ))
        }
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a poi with an city wich doesn't exist in database", async () => {
        poi.address = "poi address",
        poi.picture = "poi img";
        poi.city.id = 10;
        
        try {
            await create(poi);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("La ville city name avec l'id 10 n'existe pas en base de données");
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
                    "La ville city name avec l'id 10 n'existe pas en base de données"
                ))
        }
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a poi with an type wich doesn't exist in database", async () => {
        poi.address = "poi address",
        poi.picture = "poi img";
        poi.city.id = 1;
        poi.type.id = 10;
        
        try {
            await create(poi);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le type name type avec l'id 10 n'existe pas en base de données");
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
                    "Le type name type avec l'id 10 n'existe pas en base de données"
                ))
        }
    });
    
    // UPDATE POI
    // it("Should poi when we attempt to update a poi ", async () => {
    //     poi.id = 1;
    //     poi.name = "Musée du Louvre";
    //     poi.latitude = "48.8611473";
    //     poi.longitude = "2.3380277";
    //     poi.type.id = 1;

    //     const updatedPoi = await update(poi);
        
    //     expect(updatedPoi).not.toBeUndefined();
    //     expect(updatedPoi).toBeDefined();
    //     expect(updatedPoi && typeof updatedPoi === 'object').toBe(true);
    //     expect(updatedPoi).toEqual(expect.objectContaining({
    //         id: expect.any(Number),
    //         name: expect.any(String),
    //         address: expect.any(String),
    //         latitude: expect.any(String),
    //         longitude: expect.any(String),
    //         picture: expect.any(String)
    //     }));
    // });

    it("Should trigger an error 404 Not Found when we attempt to update a poi with an id wich doesn't exist in database", async () => {
        poi.id = 10;
        poi.address = "poi address",
        poi.picture = "poi img";
        poi.city.id = 1;
        poi.type.id = 1;
        
        try {
            await update(poi);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le point d'intêret n'existe pas en base de données");
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
                    "Le point d'intêret n'existe pas en base de données"
                ))
        }
    });

    it("Should trigger an error 404 Not Found when we attempt to update a poi with a name wich doesn't exist in database", async () => {
        poi.id = 1;
        poi.name = "Rue de la Soif",
        poi.city.id = 1;
        poi.type.id = 1;
        
        try {
            await update(poi);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le point d'intêret Rue de la Soif est déjà utilisé, vous devez en choisir un autre");
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
                    "Le point d'intêret Rue de la Soif est déjà utilisé, vous devez en choisir un autre"
                ))
        }
    });

    // it("Should trigger an error 422 Unprocessable Entity when we attempt to update a poi with a localisation wich doesn't exist in database", async () => {
    //     poi.id = 1;
    //     poi.name = "Musée du Louvre",
    //     poi.latitude = "48.1140518",
    //     poi.longitude = "-1.6813832";
        
    //     try {
    //         await update(poi);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe("Le point d'intêret avec la latitude 48.1140518 et la longitude -1.6813832 existe déjà en base de données");
    //             expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //             expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(
    //             new CustomError(
    //                 new UnprocessableEntityError(), 
    //                 "Le point d'intêret avec la latitude 48.1140518 et la longitude -1.6813832 existe déjà en base de données"
    //             ))
    //     }
    // });

    // it("Should trigger an error 422 Unprocessable Entity when we attempt to update a poi with a name wich is already used in database", async () => {
    //     poi.id = 1;
    //     poi.name = "Arc de Triomphe";
    //     poi.latitude = "48.8611473",
    //     poi.longitude = "2.3380277";
    
    //     try {
    //         await update(poi);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe("Le point d'intêret Arc de Triomphe est déjà utilisé, vous devez en choisir un autre");
    //             expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //             expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(
    //             new CustomError(
    //                 new UnprocessableEntityError(), 
    //                 "Le point d'intêret Arc de Triomphe est déjà utilisé, vous devez en choisir un autre"
    //             ))
    //     }
    // });

    // it("Should trigger an error 422 Unprocessable Entity when we attempt to update a poi with an address wich is already used in database", async () => {
    //     poi.id = 1;
    //     poi.name = "poi name";
    //     poi.address = "Pl. Charles de Gaulle, 75008 Paris";
        
    
    //     try {
    //         await update(poi);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe("L'adresse Pl. Charles de Gaulle, 75008 Paris est déjà utilisée, vous devez en choisir une autre");
    //             expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //             expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(
    //             new CustomError(
    //                 new UnprocessableEntityError(), 
    //                 "L'adresse Pl. Charles de Gaulle, 75008 Paris est déjà utilisée, vous devez en choisir une autre"
    //             ))
    //     }
    // });

    // it("Should trigger an error 422 Unprocessable Entity when we attempt to update a poi with a picture wich is already used in database", async () => {
    //     poi.address = "address poi";
    //     poi.picture = "arc-de-triomphe.png";
        
    
    //     try {
    //         await update(poi);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe("L'image arc-de-triomphe.png est déjà utilisée, vous devez en choisir une autre");
    //             expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.extensions.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
    //             expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //             expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(
    //             new CustomError(
    //                 new UnprocessableEntityError(), 
    //                 "L'image arc-de-triomphe.png est déjà utilisée, vous devez en choisir une autre"
    //             ))
    //     }
    // });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a poi with a city wich doesn't exist in database", async () => {
        poi.name = "poi name";
        poi.address = "address poi";
        poi.picture = "poi img";
        poi.city.id = 10;
        
        try {
            await update(poi);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("La ville city name avec l'id 10 n'existe pas en base de données");
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
                    "La ville city name avec l'id 10 n'existe pas en base de données"
                ))
        }
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a poi with a type wich doesn't exist in database", async () => {
        poi.name = "a poi name";
        poi.address = "address poi";
        poi.picture = "poi img";
        poi.city.id = 1;
        poi.type.id = 10;
        
        try {
            await update(poi);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le type name type avec l'id 10 n'existe pas en base de données");
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
                    "Le type name type avec l'id 10 n'existe pas en base de données"
                ))
        }
    });
    
    //DELETE
    it("Should trigger an error 404 Not Found when we attempt to delete a poi with an id wich doesn't exist in database", async () => {
        try {
            await deletePoi(10);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le point d'intêret n'existe pas en base de données");
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
                    "Le point d'intêret n'existe pas en base de données"
                ))
        }
    });

});
