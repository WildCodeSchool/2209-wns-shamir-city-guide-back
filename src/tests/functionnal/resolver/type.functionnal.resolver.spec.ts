import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { startAppoloServer } from "../../../loaders/appolo-server.loader";
import * as TypeApi from "../api/type.functionnal.api";
import { DatabaseLoader } from "../../../loaders/database.loader";
import Type from "../../../entities/Type.entity";
import { CommonErrorValidator, TypeErrorValidator } from "../../../validators/messages.validator";
import { 
    StatusCodeClass, 
    StatusCodeMessage, 
    StatusCode, 
    strTooLong 
} from "../../../utils/constants.utils";
import { CustomError } from "../../../utils/errors/CustomError.utils.error";
import { InternalServerError } from "../../../utils/errors/interfaces.utils.error";
import { emojiShocked } from "../../../utils/emoji.utils";
import { formatString } from "../../../utils/string.utils";

const GET_ALL = TypeApi.GET_ALL,
    GET_TYPE_BY_ID = TypeApi.GET_TYPE_BY_ID,
    GET_TYPE_BY_NAME = TypeApi.GET_TYPE_BY_NAME,
    CREATE_TYPE = TypeApi.CREATE_TYPE,
    UPDATE_TYPE = TypeApi.UPDATE_TYPE,
    DELETE = TypeApi.DELETE;

// TRIGGER ERROR 500 INTERNAL ERROR WHEN WE BY-PASS THE DATABASE CONNECTION
describe("functionnal/resolver/type.resolver suite of tests without database connexion", () => {
    let server: ApolloServer;
    beforeAll(async () => {
        server = await startAppoloServer();
    });

    // GETALL
    it("Should not retrieve all types in database and throw an 500 Internal Error", async () => {
        try {
            await server.executeOperation({query: GET_ALL});
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, les types n'ont pas été chargés`);
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
                    `Problème de connexion interne, les types n'ont pas été chargés`
                ))
        }
    });

    // GETBYID
    it("Should not retrieve type by its id in database and throw an 500 Internal Error", async () => {
        try {
            await server.executeOperation({
                query: GET_TYPE_BY_ID,
                variables: {id: 1}
            });
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le type n'a pas été chargé`);
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
                    `Problème de connexion interne, le type n'a pas été chargé`
                ))
        }
    });

    // GETBYNAME
    it("Should not retrieve type by name in database and throw an 500 Internal Error", async () => {
        const name ="test";
        try {
            await server.executeOperation({
                query: GET_TYPE_BY_NAME,
                variables: {name}
            });
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le type ${name} n'a pas été chargé`);
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
                    `Problème de connexion interne, le type ${name} n'a pas été chargé`
                ))
        }
    });

    // CREATE
    it("Should not create type and throw an 500 Internal Error", async () => {
        const name = "type test",
            logo = "typetest.png",
            color = "#fff";
        try {
            await server.executeOperation({
                query: CREATE_TYPE,
                variables: {type: {name, logo, color}}
            });
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le type ${name} n'a pas été créé`);
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
                    `Problème de connexion interne, le type ${name} n'a pas été créé`
                ))
        }
    });

    // UPDATE
    it("Should not update type and throw an 500 Internal Error", async () => {
        const id = 3,
            name = "type test",
            logo = "typetest.png",
            color = "#fff";
            const tag = await server.executeOperation({
                query: UPDATE_TYPE,
                variables: {type: {id, name, logo, color}}
            });
            
            if (tag.errors) expect(tag.errors).toBeDefined();
            if (tag.data) expect(tag.data).not.toBeDefined();
            if (tag.errors) {
                expect(tag?.errors[0]?.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le type n'a pas été mis à jour`);  
                const customError = tag.errors[0].extensions;
                expect(customError?.statusCodeClass).toBe(StatusCodeClass.SERVER_ERROR);
                expect(customError?.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);     
                expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.INTERNAL_SERVER_ERROR);   
            } 
    });

     // DELETE
     it("Should not delete type and throw an 500 Internal Error", async () => {
        const deleteTypeId = 1;
        
        const deleted = await server.executeOperation({
            query: DELETE,
            variables: {deleteTypeId}
        });
        if (deleted.errors) expect(deleted.errors).toBeDefined();
        if (deleted.data) expect(deleted.data).not.toBeDefined();
        if (deleted.errors) {
            expect(deleted?.errors[0]?.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le type n'a pas été supprimé`);  
            const customError = deleted.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.SERVER_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.INTERNAL_SERVER_ERROR);   
        }  
    });
})

describe("functionnal/resolver/tag.resolver suite of tests with databse connection", () => {
    let server: ApolloServer;

    beforeAll(async () => {
        await DatabaseLoader.openConnection();
        server = await startAppoloServer();
    });

    // GETALL
    it("Should retrieve all types from database", async () => {
        const types = await server.executeOperation({query: GET_ALL})
        
        expect(types.errors).toBeUndefined();
        expect(types.data?.getAllTypes).toBeDefined();
        expect(types.data && typeof types.data?.getAllTypes === 'object').toBe(true);
        if (types.data) {
            types.data.getAllTypes.forEach((t: Type)=> {
                expect(t).toEqual(expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    logo: expect.any(String),
                    color: expect.any(String)
                }));
            })
        };
    });
    
    // GET BY ID
    it("Should retrieve a type by its id", async () => {
        const type = await server.executeOperation({
            query: GET_TYPE_BY_ID,
            variables: {id: 1}
        })

        expect(type.errors).toBeUndefined();
        expect(type.data?.getTypeById).toBeDefined();
        expect(type.data?.getTypeById).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            logo: expect.any(String),
            color: expect.any(String)
        }));
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to retrieve a type with the id 0", async () => {
        const type = await server.executeOperation({
            query: GET_TYPE_BY_ID,
            variables: {id: 0}
        })
        
        expect(type.errors).toBeDefined();
        expect(type.data?.getTypeById).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe(CommonErrorValidator.ID_EQUAL_0); 
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a type with an unknown id from database", async () => {
        const type = await server.executeOperation({
            query: GET_TYPE_BY_ID,
            variables: {id: 10}
        })
        
        expect(type.errors).toBeDefined();
        expect(type.data?.getTypeById).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe("Le type n'existe pas en base de données"); 
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);  
        } 
    });

    //GET BY NAME
    it("Should retrieve a type by its name", async () => {
        const type = await server.executeOperation({
            query: GET_TYPE_BY_NAME,
            variables: {name: "Type1"}
        })

        expect(type.errors).toBeUndefined();
        expect(type.data?.getTypeByName).toBeDefined();
        expect(type.data?.getTypeByName).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            logo: expect.any(String),
            color: expect.any(String)
        }));
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to retrieve a type with an empty name", async () => {
        const type = await server.executeOperation({
            query: GET_TYPE_BY_NAME,
            variables: {name: ""}
        })
        
        expect(type.errors).toBeDefined();
        expect(type.data?.getTypeByName).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe(CommonErrorValidator.NAME_TOO_SHORT); 
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a type with an unknown name from database", async () => {
        const type = await server.executeOperation({
            query: GET_TYPE_BY_NAME,
            variables: {name: "lorem"}
        })
        
        expect(type.errors).toBeDefined();
        expect(type.data?.getTypeByName).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe("Le type avec le nom Lorem n'existe pas en base de données"); 
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);  
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to retrieve a type with a name too long than 255 characters", async () => {
        const type = await server.executeOperation({
            query: GET_TYPE_BY_NAME,
            variables: {name: strTooLong}
        })
        
        expect(type.errors).toBeDefined();
        expect(type.data?.getTypeByName).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe(CommonErrorValidator.NAME_TOO_LONG); 
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);  
        } 
    });

    // //CREATE
    // // it("Should create and returns a tag", async () => {
    // //     const tag = await server.executeOperation({
    // //         query: CREATE_TAG,
    // //         variables: { name: "new Tag", icon: 'icon.png' }
    // //     })
        
    // //     if (tag.errors) expect(tag.errors[0]).toBeDefined();
    // //     expect(tag.data?.createTag).toBeDefined();
    // //     expect(tag.data?.createTag).toEqual(expect.objectContaining({
    // //         id: expect.any(String),
    // //         name: expect.any(String),
    // //         icon: expect.any(String)
    // //     }));
    // // });

    it("Should trigger an error 400 Bad Request when we attempt to create a type with an id", async () => {
        const type = await server.executeOperation({
            query: CREATE_TYPE,
            variables: {type: {id: 10, name: "test10", logo: 'logo.png', color: "#fff"}}
        })
        
        if (type.errors) expect(type.errors[0]).toBeDefined();
        expect(type.data?.getTypeByName).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe("Oups!! Quelque chose s'est mal passé\nL'identifiant du type n'est pas requis"); 
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.BAD_REQUEST);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.BAD_REQUEST);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a type with an empty name", async () => {
        const type = await server.executeOperation({
            query: CREATE_TYPE,
            variables: {type: {name: "", logo: 'logo.png', color: "#fff"} }
        })
        
        if (type.errors) expect(type.errors[0]).toBeDefined();
        if (type.data) expect(type.data).not.toBeDefined();
        expect(type.data?.getTypeByName).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe(TypeErrorValidator.NAME_TOO_SHORT); 
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a type with a name filled by white spaces", async () => {
        const type = await server.executeOperation({
            query: CREATE_TYPE,
            variables: {type: {name: "                 ", logo: 'logo.png', color: "#fff"} }
        })
        
        if (type.errors) expect(type.errors[0]).toBeDefined();
        expect(type.data?.getTypeByName).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe(TypeErrorValidator.NAME_TOO_SHORT); 
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a type with a name too long, more than 255 characters", async () => {
        const type = await server.executeOperation({
            query: CREATE_TYPE,
            variables: {type:{name: strTooLong, logo: 'logo.png', color: "#fff"}}
        })
        
        if (type.errors) expect(type.errors[0]).toBeDefined();
        expect(type.data?.getTypeByName).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe(TypeErrorValidator.NAME_TOO_LONG);  
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a type with a name wich already exist in database", async () => {
        const name = formatString("type1"),
            logo = "logo.png",
            color = "#343434";
        const type = await server.executeOperation({
            query: CREATE_TYPE,
            variables: {type:{name, logo, color}}
        });
        
        
        if (type.errors) expect(type.errors[0]).toBeDefined();
        expect(type.data?.getTypeByName).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe(`Le nom ${name} est déjà utilisé, vous devez en choisir un autre`); 
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a type with a logo wich is already used in database", async () => {
        const type = await server.executeOperation({
            query: CREATE_TYPE,
            variables: {type:{name: "new Type name", logo: "type1.png", color: "#fff"}}
        })
        
        if (type.errors) expect(type.errors).toBeDefined();
        if (type.data) expect(type.data).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe("Un type possède déjà ce nom de logo, vous devez en choisir une autre");  
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a type with a color wich is already used in database", async () => {
        const type = await server.executeOperation({
            query: CREATE_TYPE,
            variables: {type:{name: "new Type name", logo: "newType.png", color: "#4d5d53"}}
        })
        
        if (type.errors) expect(type.errors).toBeDefined();
        if (type.data) expect(type.data).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe("Un type possède déjà cette couleur, vous devez en choisir une autre");  
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    // //UPDATE
    it("Should update and returns a type", async () => {
        const type = await server.executeOperation({
            query: UPDATE_TYPE,
            variables: { 
                type: {
                    id: 3, 
                    name: "updated Tag", 
                    logo: 'update.png',
                    color: "#d6a5b1" 
                }
            }
        })
        
        if (type.errors) expect(type.errors).toBeUndefined();
        expect(type.data?.updateType).toBeDefined();
        expect(type.data?.updateType).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            logo: expect.any(String),
            color: expect.any(String)
        }));
    });

    it("Should trigger an error 400 Bad Request when we attempt to update a type without a id", async () => {
        const type = await server.executeOperation({
            query: UPDATE_TYPE,
            variables: {type: {name: "test30", logo: 'logo.png', color: "#fff"}}
        })
        
        if (type.errors) expect(type.errors[0]).toBeDefined();
        expect(type.data?.getTypeByName).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe("Oups!! Quelque chose s'est mal passé\nL'identifiant du type est requis"); 
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.BAD_REQUEST);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.BAD_REQUEST);   
        } 
    });    

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a type with an id which doesn't exist in database", async () => {
        const id = 10;
        const type = await server.executeOperation({
            query: UPDATE_TYPE,
            variables: { 
                type: {
                    id: id, 
                    name: "updated tag", 
                    logo: "updated.png",
                    color: "#000" 
                }
            }
        })
        
        if (type.errors) expect(type.errors).toBeDefined();
        if (type.data) expect(type.data).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe("Le type n'existe pas en base de données");  
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a type with a name wich already exist in database", async () => {
        const id = 2,
            name = formatString("type1"),
            logo = "type1.png",
            color = "#4d5d53";
        const type = await server.executeOperation({
            query: UPDATE_TYPE,
            variables: { 
                type: { id, name, logo, color }
            }
        })
        
        if (type.errors) expect(type.errors[0]).toBeDefined();
        expect(type.data?.getTypeByName).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe(`Le nom ${name} est déjà utilisé, vous devez en choisir un autre`);  
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a type with a logo wich already exist in database", async () => {
        const id = 1,
            name = formatString("new type"),
            logo = "type2.jpeg",
            color = "#4d5d53";
        const type = await server.executeOperation({
            query: UPDATE_TYPE,
            variables: { 
                type: { id, name, logo, color }
            }
        })
        
        if (type.errors) expect(type.errors[0]).toBeDefined();
        expect(type.data?.getTypeByName).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe("Un type possède déjà ce nom de logo, vous devez en choisir une autre");  
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a type with a color wich already exist in database", async () => {
        const id = 1,
            name = formatString("new type"),
            logo = "newtype.png",
            color = "#ffa500";
        const type = await server.executeOperation({
            query: UPDATE_TYPE,
            variables: { 
                type: { id, name, logo, color }
            }
        })
        
        if (type.errors) expect(type.errors[0]).toBeDefined();
        expect(type.data?.getTypeByName).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe("Un type possède déjà cette couleur, vous devez en choisir une autre");  
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

   
    // //DELETE
    // // it("Should delete a type by its id", async () => {
    // //     const type = await server.executeOperation({
    // //         query: DELETE,
    // //         variables: {deleteTypeId: 6}
    // //     })
        
    // //     expect(type.errors).toBeUndefined();
    // //     expect(type.data?.deleteType).toBeDefined();
    // //     if (type.data) {
    // //         expect(type.data.deleteType).toEqual(expect.objectContaining({
    // //             name: expect.any(String),
    // //             icon: expect.any(String)
    // //         }));
    // //     };
    // // });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to delete a type with the id 0", async () => {
        const type = await server.executeOperation({
            query: DELETE,
            variables: {deleteTypeId: 0}
        })
        
        if (type.errors) expect(type.errors).toBeDefined();
        if (type.data) expect(type.data).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe(CommonErrorValidator.ID_EQUAL_0);  
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 404 Not Found when we attempt to delete a type with an id wich doesn't exist in database", async () => {
        const type = await server.executeOperation({
            query: DELETE,
            variables: {deleteTypeId: 10}
        })
        
        if (type.errors) expect(type.errors).toBeDefined();
        if (type.data) expect(type.data).not.toBeDefined();
        if (type.errors) {
            expect(type?.errors[0]?.message).toBe("Le type n'existe pas en base de données");  
            const customError = type.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);   
        } 
    });
});