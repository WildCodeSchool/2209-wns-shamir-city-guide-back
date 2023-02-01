import { ApolloServer } from "apollo-server";
import { startAppoloServer } from "../../../loader/appolo-server.loader";
import * as PoiApi from "../api/poi.functionnal.api";
import { DatabaseLoader } from "../../../loader/database.loader";
import Poi from "../../../entity/PointOfInterest.entity";
import { CommonErrorValidator, PoiErrorValidator } from "../../../validator/messages.validator";
import { 
    StatusCodeClass, 
    StatusCodeMessage, 
    StatusCode, 
    strTooLong 
} from "../../../utils/constants.utils";
import { CustomError } from "../../../utils/error/CustomError.utils.error";
import { InternalServerError } from "../../../utils/error/interfaces.utils.error";
import { emojiShocked } from "../../../utils/emoji.utils";

const GET_ALL = PoiApi.GET_ALL,
    GET_POI_BY_ID = PoiApi.GET_POI_BY_ID,
    GET_POI_BY_NAME = PoiApi.GET_POI_BY_NAME,
    CREATE_POI = PoiApi.CREATE_POI,
    UPDATE_POI = PoiApi.UPDATE_POI,
    DELETE = PoiApi.DELETE;

let poiToTest = {
    name: "poi name",
    address: " poi address",
    latitude: "12.321",
    longitude: "52.321",
    picture: "picture.png",
    city: {
        id: 3,
        name: "Rennes",
        latitude: "48.1113387",
        longitude: "-1.6800198",
        picture: "rennes.png",
    },
    type: {
        id: 1,
        name: "Type1",
        logo: "type1.png",
        color: "#4d5d53"
    },
    tags: [
        {
            id: 1,
            name: "Concert",
            icon: "concert.png"
        },
        {
            id: 2,
            name: "Restaurant",
            icon: "restaurant.jpg"
        }
    ]
}

// TRIGGER ERROR 500 INTERNAL ERROR WHEN WE BY-PASS THE DATABASE CONNECTION
describe("functionnal/resolver/poi resolver suite of tests without database connexion", () => {
    let server: ApolloServer;
    beforeAll(async () => {
        server = await startAppoloServer();
    });

    // GETALL
    it("Should not retrieve all poi in database and throw an 500 Internal Error", async () => {
        try {
            await server.executeOperation({query: GET_ALL});
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

    // GETBYID
    it("Should not retrieve poi by its id in database and throw an 500 Internal Error", async () => {
        try {
            await server.executeOperation({
                query: GET_POI_BY_ID,
                variables: {id: 1}
            });
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
                    `Problème de connexion interne, le point d'intêret n'a pas été chargée`
                ))
        }
    });

    // GETBYNAME
    it("Should not retrieve poi by name in database and throw an 500 Internal Error", async () => {
        const name ="test";
        try {
            await server.executeOperation({
                query: GET_POI_BY_NAME,
                variables: {name}
            });
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

    // CREATE
    it("Should not create poi and throw an 500 Internal Error", async () => {
        try {
            await server.executeOperation({
                query: CREATE_POI,
                variables: {poiToTest}
            });
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le point d'intêret ${poiToTest.name} n'a pas été créé`);
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
                    `Problème de connexion interne, le point d'intêret ${poiToTest.name} n'a pas été créé`
                ))
        }
    });

    // UPDATE
    it("Should not update poi and throw an 500 Internal Error", async () => {
        const poiToUpdate = {id: 1, ...poiToTest};
            
            const poi = await server.executeOperation({
                query: UPDATE_POI,
                variables: {
                    poi: {...poiToUpdate}
                }
            });
            
            if (poi.errors) expect(poi.errors).toBeDefined();
            if (poi.data) expect(poi.data).not.toBeDefined();
            if (poi.errors) {
                expect(poi?.errors[0]?.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le point d'intêret n'a pas été mis à jour`);  
                const customError = poi.errors[0].extensions;
                expect(customError?.statusCodeClass).toBe(StatusCodeClass.SERVER_ERROR);
                expect(customError?.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);     
                expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.INTERNAL_SERVER_ERROR);   
            } 
    });

     // DELETE
     it("Should not delete poi and throw an 500 Internal Error", async () => {
        const deletePoiId = 1;
        
        const deleted = await server.executeOperation({
            query: DELETE,
            variables: {deletePoiId}
        });
        if (deleted.errors) expect(deleted.errors).toBeDefined();
        if (deleted.data) expect(deleted.data).not.toBeDefined();
        if (deleted.errors) {
            expect(deleted?.errors[0]?.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le point d'intêret n'a pas été supprimé`);  
            const customError = deleted.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.SERVER_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.INTERNAL_SERVER_ERROR);   
        }
    });
})

describe("functionnal/resolver/poi.resolver suite of tests with database connection", () => {
    let server: ApolloServer;

    beforeAll(async () => {
        await DatabaseLoader.openConnection();
        server = await startAppoloServer();
    });

    // GETALL
    it("Should retrieve all poi from database", async () => {
        const poiArr = await server.executeOperation({query: GET_ALL})
        
        expect(poiArr.errors).toBeUndefined();
        expect(poiArr.data?.getAllPoi).toBeDefined();
        expect(poiArr.data && typeof poiArr.data?.getAllPoi === 'object').toBe(true);
        if (poiArr.data) {
            poiArr.data.getAllPoi.forEach((c: Poi)=> {
                expect(c).toEqual(expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    address: expect.any(String),
                    latitude: expect.any(String),
                    longitude: expect.any(String),
                    picture: expect.any(String)
                }));
            })
        };
    });
    
    // GET BY ID
    it("Should retrieve a poi by its id", async () => {
        const poi = await server.executeOperation({
            query: GET_POI_BY_ID,
            variables: {id: 1}
        })

        expect(poi.errors).toBeUndefined();
        expect(poi.data?.getPoiById).toBeDefined();
        expect(poi.data?.getPoiById).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            address: expect.any(String),
            latitude: expect.any(String),
            longitude: expect.any(String),
            picture: expect.any(String)
        }));
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to retrieve a poi with the id 0", async () => {
        const poi = await server.executeOperation({
            query: GET_POI_BY_ID,
            variables: {id: 0}
        })
        
        expect(poi.errors).toBeDefined();
        expect(poi.data?.getPoiById).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe(CommonErrorValidator.ID_EQUAL_0); 
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a poi with an unknown id from database", async () => {
        const poi = await server.executeOperation({
            query: GET_POI_BY_ID,
            variables: {id: 10}
        })
        
        expect(poi.errors).toBeDefined();
        expect(poi.data?.getPoiById).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("Le point d'intêret n'existe pas en base de données"); 
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);  
        } 
    });

    //GET BY NAME
    it("Should retrieve a poi by its name", async () => {
        const poi = await server.executeOperation({
            query: GET_POI_BY_NAME,
            variables: {name: "Musée du Louvre"}
        })

        expect(poi.errors).toBeUndefined();
        expect(poi.data?.getPoiByName).toBeDefined();
        expect(poi.data?.getPoiByName).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            address: expect.any(String),
            latitude: expect.any(String),
            longitude: expect.any(String),
            picture: expect.any(String)
        }));
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to retrieve a poi with an empty name", async () => {
        const poi = await server.executeOperation({
            query: GET_POI_BY_NAME,
            variables: {name: ""}
        })
        
        expect(poi.errors).toBeDefined();
        expect(poi.data?.getPoiByName).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe(CommonErrorValidator.NAME_TOO_SHORT); 
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a poi with an unknown name from database", async () => {
        const poi = await server.executeOperation({
            query: GET_POI_BY_NAME,
            variables: {name: "lorem"}
        })
        
        expect(poi.errors).toBeDefined();
        expect(poi.data?.getPoiByName).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("Le point d'intêret avec le nom lorem n'existe pas en base de données"); 
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);  
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to retrieve a poi with a name too long than 255 characters", async () => {
        const poi = await server.executeOperation({
            query: GET_POI_BY_NAME,
            variables: {name: strTooLong}
        })
        
        expect(poi.errors).toBeDefined();
        expect(poi.data?.getPoiByName).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe(CommonErrorValidator.NAME_TOO_LONG); 
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);  
        } 
    });

    // // CREATE
    // // it("Should create and returns a poi", async () => {
    // //     const poi = await server.executeOperation({
    // //         query: CREATE_POI,
    // //         variables: {poiToTest}
    // //     })
        
    // //     if (poi.errors) expect(poi.errors[0]).toBeDefined();
    // //     expect(poi.data?.createPoi).toBeDefined();
    // //     expect(poi.data?.createPoi).toEqual(expect.objectContaining({
    // //         id: expect.any(String),
    // //         name: expect.any(String),
    // //         address: expect.any(String),
    // //         latitude: expect.any(String),
    // //         longitude: expect.any(String),
    // //         picture: expect.any(String) 
    // //     }));
    // // });

    it("Should trigger an error 400 Bad Request when we attempt to create a poi with an id", async () => {
        const poi = await server.executeOperation({
            query: CREATE_POI,
            variables: {poi: {id: 10,...poiToTest}}
        })
        
        if (poi.errors) expect(poi.errors[0]).toBeDefined();
        expect(poi.data?.getPoiByName).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("Oups!! Quelque chose s'est mal passé\nL'identifiant du point d'intêret n'est pas requis"); 
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.BAD_REQUEST);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.BAD_REQUEST);   
        } 
    }); 

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a poi with an empty name", async () => {
        poiToTest.name = "";
        const poi = await server.executeOperation({
            query: CREATE_POI,
            variables: {poi: {...poiToTest}}
        })
        
        if (poi.errors) expect(poi.errors[0]).toBeDefined();
        if (poi.data) expect(poi.data).not.toBeDefined();
        expect(poi.data?.getPoiByName).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe(PoiErrorValidator.NAME_TOO_SHORT); 
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a poi with a name wich is already used in database", async () => {
        poiToTest.name = "La Tour Eiffel";
        const poi = await server.executeOperation({
            query: CREATE_POI,
            variables: {poi: {...poiToTest}}
        })
        
        if (poi.errors) expect(poi.errors[0]).toBeDefined();
        expect(poi.data?.getPoiByName).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("Le point d'intêret La Tour Eiffel est déjà utilisé, vous devez en choisir un autre"); 
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a poi with an address wich is already used in database", async () => {
        poiToTest.name = "poi name";
        poiToTest.address = "Rue de Rivoli, 75001 Paris";
        const poi = await server.executeOperation({
            query: CREATE_POI,
            variables: {poi: {...poiToTest}}
        })
        
        if (poi.errors) expect(poi.errors[0]).toBeDefined();
        expect(poi.data?.getPoiByName).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("L'adresse Rue de Rivoli, 75001 Paris est déjà utilisée, vous devez en choisir une autre"); 
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a poi with a picture wich is already used in database", async () => {
        poiToTest.address = "poi address";
        poiToTest.picture = "musee-du-louvre.png";
        const poi = await server.executeOperation({
            query: CREATE_POI,
            variables: {poi: {...poiToTest}}
        })
        
        if (poi.errors) expect(poi.errors[0]).toBeDefined();
        expect(poi.data?.getPoiByName).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("L'image musee-du-louvre.png est déjà utilisée, vous devez en choisir une autre"); 
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    }); 

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a poi with a city wich doesn't exist in database", async () => {
        poiToTest.picture = "poi picture";
        poiToTest.city = {
            id: 30, 
            name: "test", 
            latitude: "11.3211", 
            longitude: "145.256", 
            picture: "picture test"
        }
        const poi = await server.executeOperation({
            query: CREATE_POI,
            variables: {poi: {...poiToTest}}
        })
        
        if (poi.errors) expect(poi.errors[0]).toBeDefined();
        expect(poi.data?.getPoiByName).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("La ville test avec l'id 30 n'existe pas en base de données"); 
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a poi with a type wich doesn't exist in database", async () => {
        poiToTest.city = {
            id: 3,
            name: "Rennes",
            latitude: "48.1113387",
            longitude: "-1.68001988",
            picture: "rennes.png",
        };
        poiToTest.type = {
            id: 100,
            name: "test",
            logo: "logo.png",
            color: "#343434"
        }
        
        const poi = await server.executeOperation({
            query: CREATE_POI,
            variables: {poi: {...poiToTest}}
        })
        
        if (poi.errors) expect(poi.errors[0]).toBeDefined();
        expect(poi.data?.getPoiByName).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("Le type test avec l'id 100 n'existe pas en base de données"); 
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a poi with a tag wich doesn't exist in database", async () => {
        poiToTest.type = {
            id: 1,
            name: "Type1",
            logo: "type1.png",
            color: "#4d5d53"
        },
        poiToTest.tags = [
            {id: 100, name: "test", icon: "icon test"} 
        ] 
        const poi = await server.executeOperation({
            query: CREATE_POI,
            variables: {poi: {...poiToTest}}
        })
        
        if (poi.errors) expect(poi.errors[0]).toBeDefined();
        expect(poi.data?.getPoiByName).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("Le tag test n'existe pas en base de données"); 
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    //UPDATE
    // it("Should update and returns a poi", async () => {
    //     poiToTest.name = "Gare Saint Charles";
    //     poiToTest.type = {
    //         id: 2,
    //         name: "Type2",
    //         logo: "type2.jpeg",
    //         color: "#ffa500"
    //     }
    //     poiToTest.tags = [];

    //     const poi = await server.executeOperation({
    //         query: UPDATE_POI,
    //         variables: {poi: {id: 5, ...poiToTest}}
    //     })
    //     if (poi.errors) expect(poi.errors).toBeUndefined();
    //     expect(poi.data?.updatePoi).toBeDefined();
    //     expect(poi.data?.updatePoi).toEqual(expect.objectContaining({
    //         id: expect.any(String),
    //         name: expect.any(String),
    //         address: expect.any(String),
    //         latitude: expect.any(String),
    //         longitude: expect.any(String),
    //         picture: expect.any(String)
    //     }));
    // });

    // it("Should update and returns a poi", async () => {
    //     poiToTest.tags = [
    //         {
    //             id: 4,
    //             name: "Visite",
    //             icon: "Visite.png"
    //         },
    //           {
    //             id: 5,
    //             name: "Updated Tag",
    //             icon: "update.png"
    //         }
    //     ];

    //     const poi = await server.executeOperation({
    //         query: UPDATE_POI,
    //         variables: {poi: {id: 5, ...poiToTest}}
    //     })
    //     if (poi.errors) expect(poi.errors).toBeUndefined();
    //     expect(poi.data?.updatePoi).toBeDefined();
    //     expect(poi.data?.updatePoi).toEqual(expect.objectContaining({
    //         id: expect.any(String),
    //         name: expect.any(String),
    //         address: expect.any(String),
    //         latitude: expect.any(String),
    //         longitude: expect.any(String),
    //         picture: expect.any(String)
    //     }));
    // });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a poi with an id which doesn't exist in database", async () => {
        const id = 100;
        const poi = await server.executeOperation({
            query: UPDATE_POI,
            variables: {poi: {id, ...poiToTest}}
        })
        
        if (poi.errors) expect(poi.errors).toBeDefined();
        if (poi.data) expect(poi.data).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("Le point d'intêret n'existe pas en base de données");  
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);   
        } 
    });

    it("Should trigger an error 400 Bad Request when we attempt to update a poi without id", async () => {
        const poi = await server.executeOperation({
            query: UPDATE_POI,
            variables: {poi: {...poiToTest}}
        })
        
        if (poi.errors) expect(poi.errors[0]).toBeDefined();
        expect(poi.data?.getPoiByName).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("Oups!! Quelque chose s'est mal passé\nL'identifiant du point d'intêret est requis"); 
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.BAD_REQUEST);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.BAD_REQUEST);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a poi with a name which already exist in database", async () => {
        poiToTest.name = "Gare Saint Charles";

        const poi = await server.executeOperation({
            query: UPDATE_POI,
            variables: {poi: {id: 1, ...poiToTest}}
        })
        
        if (poi.errors) expect(poi.errors).toBeDefined();
        if (poi.data) expect(poi.data).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("Le point d'intêret Gare Saint Charles est déjà utilisé, vous devez en choisir un autre");  
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a poi with a latitude and longitude wich are already used in database", async () => {
        poiToTest.latitude = "48.8737791";
        poiToTest.longitude = "2.2950372";

        const poi = await server.executeOperation({
            query: UPDATE_POI,
            variables: {poi: {id: 5, ...poiToTest}}
        })
        
        if (poi.errors) expect(poi.errors).toBeDefined();
        if (poi.data) expect(poi.data).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("Le point d'intêret avec la latitude 48.8737791 et la longitude 2.2950372 existe déjà en base de données");  
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a poi with a tag wich doesn't exist in database", async () => {
        poiToTest.latitude = "48.8791";
        poiToTest.longitude = "2.25372";
        poiToTest.tags = [
            {
                id: 1,
                name: "Concert",
                icon: "concert.png"
            },
            {
                id: 100,
                name: "Unknown tag",
                icon: ""
            }
        ]

        const poi = await server.executeOperation({
            query: UPDATE_POI,
            variables: {poi: {id: 5, ...poiToTest}}
        })
        
        if (poi.errors) expect(poi.errors).toBeDefined();
        if (poi.data) expect(poi.data).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("Le tag Unknown tag n'existe pas en base de données");  
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a poi with valid tag ", async () => {
        poiToTest = {
            name: "Gare Saint Charles",
            address: "GARE SAINT CHARLES - 118000 Marseille",
            latitude: "43.302426",
            longitude: "5.3816767",
            picture: "gare-saint-charles.png",
            city: {
                id: 1,
                name: "Marseille",
                latitude: "43.2961743",
                longitude: "5.3699525",
                picture: "marseille.png",
            },
            type: {
                id: 1,
                name: "Type1",
                logo: "type1.png",
                color: "#4d5d53"
            },
            tags: [
                {
                    id: 1,
                    name: "Concert",
                    icon: "concert.png"
                }
            ]
        }

        const poi = await server.executeOperation({
            query: UPDATE_POI,
            variables: {poi: {id: 5, ...poiToTest}}
        }) 
        
        if (poi.errors) expect(poi.errors).toBeUndefined();
        expect(poi.data?.updatePoi).toBeDefined();
        expect(poi.data?.updatePoi).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            address: expect.any(String),
            latitude: expect.any(String),
            longitude: expect.any(String),
            picture: expect.any(String)
        })); 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a poi with a name wich is already used in database", async () => {
        poiToTest.name = "Musée du Louvre";

        const poi = await server.executeOperation({
            query: UPDATE_POI,
            variables: {poi: {id: 5, ...poiToTest}}
        }) 
        
        if (poi.errors) expect(poi.errors).toBeDefined();
        if (poi.data) expect(poi.data).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("Le point d'intêret Musée du Louvre est déjà utilisé, vous devez en choisir un autre");  
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        }  
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a poi with an address wich is already used in database", async () => {
        poiToTest.name = "Gare Saint Charles";
        poiToTest.address = "Rue de Rivoli, 75001 Paris";

        const poi = await server.executeOperation({
            query: UPDATE_POI,
            variables: {poi: {id: 5, ...poiToTest}}
        })    
        
        if (poi.errors) expect(poi.errors).toBeDefined();
        if (poi.data) expect(poi.data).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("L'adresse Rue de Rivoli, 75001 Paris est déjà utilisée, vous devez en choisir une autre");  
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        }  
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a poi with a picture wich is already used in database", async () => {
        poiToTest.address = "GARE SAINT CHARLES - 118000 Marseille";
        poiToTest.picture = "musee-du-louvre.png";

        const poi = await server.executeOperation({
            query: UPDATE_POI,
            variables: {poi: {id: 5, ...poiToTest}}
        })    
        
        if (poi.errors) expect(poi.errors).toBeDefined();
        if (poi.data) expect(poi.data).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("L'image musee-du-louvre.png est déjà utilisée, vous devez en choisir une autre");  
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        }  
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a poi with a city wich doesn't exist in database", async () => {
        poiToTest.picture = "gare-saint-charles.png";
        poiToTest.city = {
            id: 12,
            name: "unknown city",
            latitude: "43.2961743",
            longitude: "5.3699525",
            picture: "marseille.png",
        }

        const poi = await server.executeOperation({
            query: UPDATE_POI,
            variables: {poi: {id: 5, ...poiToTest}}
        })    
        
        if (poi.errors) expect(poi.errors).toBeDefined();
        if (poi.data) expect(poi.data).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("La ville unknown city avec l'id 12 n'existe pas en base de données");  
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        }  
    }); 

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a poi with a type wich doesn't exist in database", async () => {
        poiToTest.picture = "gare-saint-charles.png";
        poiToTest.city = {
            id: 1,
            name: "Marseille",
            latitude: "43.2961743",
            longitude: "5.3699525",
            picture: "marseille.png",
        };
        poiToTest.type = {
            id: 100,
            name: "Unknow type",
            logo: "unknown.png",
            color: "#4d5d53"
        }

        const poi = await server.executeOperation({
            query: UPDATE_POI,
            variables: {poi: {id: 5, ...poiToTest}}
        })    
        
        if (poi.errors) expect(poi.errors).toBeDefined();
        if (poi.data) expect(poi.data).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("Le type Unknow type avec l'id 100 n'existe pas en base de données");  
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        }  
    });

    //DELETE
    // it("Should delete and returns a poi", async () => {
    //     const poi = await server.executeOperation({
    //         query: DELETE,
    //         variables: {deletePoiId: 1}
    //     })
    //     if (poi.errors) expect(poi.errors).toBeUndefined();
    //     expect(poi.data?.updatePoi).toBeDefined();
    //     expect(poi.data?.updatePoi).toEqual(expect.objectContaining({
    //         name: expect.any(String),
    //     }));
    // });

    it("Should trigger an error 404 Not Found when we attempt to delete a poi with an id wich doesn't exist in database", async () => {
        const poi = await server.executeOperation({
            query: DELETE,
            variables: {deletePoiId: 100}
        })
        
        if (poi.errors) expect(poi.errors).toBeDefined();
        if (poi.data) expect(poi.data).not.toBeDefined();
        if (poi.errors) {
            expect(poi?.errors[0]?.message).toBe("Le point d'intêret n'existe pas en base de données");  
            const customError = poi.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);   
        } 
    });
});