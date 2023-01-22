import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { startAppoloServer } from "../../../loader/appolo-server.loader";
import * as TagApi from "../api/tag.functionnal.api";
import { DatabaseLoader } from "../../../loader/database.loader";
import Tag from "../../../entity/Tag.entity";
import { CommonErrorValidator, TagErrorValidator } from "../../../validator/messages.validator";
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

const GET_ALL = TagApi.GET_ALL,
    GET_TAG_BY_ID = TagApi.GET_TAG_BY_ID,
    GET_TAG_BY_NAME = TagApi.GET_TAG_BY_NAME,
    CREATE_TAG = TagApi.CREATE_TAG,
    UPDATE_TAG = TagApi.UPDATE_TAG,
    DELETE = TagApi.DELETE;

// TRIGGER ERROR 500 INTERNAL ERROR WHEN WE BY-PASS THE DATABASE CONNECTION
describe("functionnal/resolver/tag.resolver suite of tests without database connexion", () => {
    let server: ApolloServer;
    beforeAll(async () => {
        server = await startAppoloServer();
    });

    // GETALL
    it("Should not retrieve all tags in database and throw an 500 Internal Error", async () => {
        try {
            await server.executeOperation({query: GET_ALL});
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, les tags n'ont pas été chargés`);
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
                    `Problème de connexion interne, les tags n'ont pas été chargés`
                ))
        }
    });

    // GETBYID
    it("Should not retrieve tag by its id in database and throw an 500 Internal Error", async () => {
        try {
            await server.executeOperation({
                query: GET_TAG_BY_ID,
                variables: {id: 1}
            });
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le tag n'a pas été chargé`);
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
                    `Problème de connexion interne, le tag n'a pas été chargé`
                ))
        }
    });

    // GETBYNAME
    it("Should not retrieve tag by name in database and throw an 500 Internal Error", async () => {
        const name ="test";
        try {
            await server.executeOperation({
                query: GET_TAG_BY_NAME,
                variables: {name}
            });
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le tag ${name} n'a pas été chargé`);
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
                    `Problème de connexion interne, le tag ${name} n'a pas été chargé`
                ))
        }
    });

    // CREATE
    it("Should not create tag and throw an 500 Internal Error", async () => {
        const name = "test";
        const icon = "test.png";
        try {
            await server.executeOperation({
                query: CREATE_TAG,
                variables: {tag: {name, icon}}
            });
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le tag ${name} n'a pas été créé`);
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
                    `Problème de connexion interne, le tag ${name} n'a pas été créé`
                ))
        }
    });

    // UPDATE
    it("Should not update tag and throw an 500 Internal Error", async () => {
        const id = 3,
            name = "concert",
            icon = "test.png";
            const tag = await server.executeOperation({
                query: UPDATE_TAG,
                variables: {tag: {id, name, icon}}
            });
            
            if (tag.errors) expect(tag.errors).toBeDefined();
            if (tag.data) expect(tag.data).not.toBeDefined();
            if (tag.errors) {
                expect(tag?.errors[0]?.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le tag n'a pas été mis à jour`);  
                const customError = tag.errors[0]?.extensions;
                expect(customError?.statusCodeClass).toBe(StatusCodeClass.SERVER_ERROR);
                expect(customError?.statusCode).toBe(StatusCode.INTERNAL_SERVER_ERROR);     
                expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.INTERNAL_SERVER_ERROR);   
            } 
    });

     // DELETE
     it("Should not delete tag and throw an 500 Internal Error", async () => {
        const deleteTagId = 1;
        
        const deleted = await server.executeOperation({
            query: DELETE,
            variables: {deleteTagId}
        });
        if (deleted.errors) expect(deleted.errors).toBeDefined();
        if (deleted.data) expect(deleted.data).not.toBeDefined();
        if (deleted.errors) {
            expect(deleted?.errors[0]?.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le tag n'a pas été supprimé`);  
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
    it("Should retrieve all tags from database", async () => {
        const tags = await server.executeOperation({query: GET_ALL})
        
        expect(tags.errors).toBeUndefined();
        expect(tags.data?.getAllTags).toBeDefined();
        expect(tags.data && typeof tags.data?.getAllTags === 'object').toBe(true);
        if (tags.data) {
            tags.data.getAllTags.forEach((t: Tag)=> {
                expect(t).toEqual(expect.objectContaining({
                    id: expect.any(String),
                    name: expect.any(String),
                    icon: expect.any(String)
                }));
            })
        };
    });
    
    // GET BY ID
    it("Should retrieve a tag by its id", async () => {
        const tag = await server.executeOperation({
            query: GET_TAG_BY_ID,
            variables: {id: 1}
        })

        expect(tag.errors).toBeUndefined();
        expect(tag.data?.getTagById).toBeDefined();
        expect(tag.data?.getTagById).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            icon: expect.any(String)
        }));
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to retrieve a tag with the id 0", async () => {
        const tag = await server.executeOperation({
            query: GET_TAG_BY_ID,
            variables: {id: 0}
        })
        
        expect(tag.errors).toBeDefined();
        expect(tag.data?.getTagById).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(CommonErrorValidator.ID_EQUAL_0); 
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a tag with an unknown id from database", async () => {
        const tag = await server.executeOperation({
            query: GET_TAG_BY_ID,
            variables: {id: 10}
        })
        
        expect(tag.errors).toBeDefined();
        expect(tag.data?.getTagById).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe("Le tag n'existe pas en base de données"); 
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);  
        } 
    });

    //GET BY NAME
    it("Should retrieve a tag by its name", async () => {
        const tag = await server.executeOperation({
            query: GET_TAG_BY_NAME,
            variables: {name: "Concert"}
        })

        expect(tag.errors).toBeUndefined();
        expect(tag.data?.getTagByName).toBeDefined();
        expect(tag.data?.getTagByName).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            icon: expect.any(String)
        }));
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to retrieve a tag with an empty name", async () => {
        const tag = await server.executeOperation({
            query: GET_TAG_BY_NAME,
            variables: {name: ""}
        })
        
        expect(tag.errors).toBeDefined();
        expect(tag.data?.getTagByName).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(CommonErrorValidator.NAME_TOO_SHORT); 
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a tag with an unknown name from database", async () => {
        const tag = await server.executeOperation({
            query: GET_TAG_BY_NAME,
            variables: {name: "lorem"}
        })
        
        expect(tag.errors).toBeDefined();
        expect(tag.data?.getTagByName).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe("Le tag avec le nom Lorem n'existe pas en base de données"); 
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);  
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to retrieve a tag with a name too long than 255 characters", async () => {
        const tag = await server.executeOperation({
            query: GET_TAG_BY_NAME,
            variables: {name: strTooLong}
        })
        
        expect(tag.errors).toBeDefined();
        expect(tag.data?.getTagByName).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(CommonErrorValidator.NAME_TOO_LONG); 
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);  
        } 
    });

    //CREATE
    // it("Should create and returns a tag", async () => {
    //     const tag = await server.executeOperation({
    //         query: CREATE_TAG,
    //         variables: { name: "new Tag", icon: 'icon.png' }
    //     })
        
    //     if (tag.errors) expect(tag.errors[0]).toBeDefined();
    //     expect(tag.data?.createTag).toBeDefined();
    //     expect(tag.data?.createTag).toEqual(expect.objectContaining({
    //         id: expect.any(String),
    //         name: expect.any(String),
    //         icon: expect.any(String)
    //     }));
    // });

    it("Should trigger an error 400 Bad Request when we attempt to create a tag with an id", async () => {
        const tag = await server.executeOperation({
            query: CREATE_TAG,
            variables: {tag: {id: 10, name: "test30", icon: 'icon.png'}}
        })
        
        if (tag.errors) expect(tag.errors[0]).toBeDefined();
        expect(tag.data?.getTagByName).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe("Oups!! Quelque chose s'est mal passé\nL'identifiant du tag n'est pas requis"); 
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.BAD_REQUEST);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.BAD_REQUEST);   
        } 
    });    

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a tag with an empty name", async () => {
        const tag = await server.executeOperation({
            query: CREATE_TAG,
            variables: {tag: {name: "", icon: 'icon.png'} }
        })
        
        if (tag.errors) expect(tag.errors[0]).toBeDefined();
        if (tag.data) expect(tag.data).not.toBeDefined();
        expect(tag.data?.getTagByName).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(TagErrorValidator.NAME_TOO_SHORT); 
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a tag with a name filled by white spaces", async () => {
        const tag = await server.executeOperation({
            query: CREATE_TAG,
            variables: {tag: {name: "                 ", icon: 'icon.png'} }
        })
        
        if (tag.errors) expect(tag.errors[0]).toBeDefined();
        expect(tag.data?.getTagByName).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(TagErrorValidator.NAME_TOO_SHORT); 
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a tag with a name too long, more than 255 characters", async () => {
        const tag = await server.executeOperation({
            query: CREATE_TAG,
            variables: {tag:{name: strTooLong, icon: 'icon.png'}}
        })
        
        if (tag.errors) expect(tag.errors[0]).toBeDefined();
        expect(tag.data?.getTagByName).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(TagErrorValidator.NAME_TOO_LONG);  
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a tag with a name wich already exist in database", async () => {
        const name = formatString("promenade"),
            icon = "icon.png";
        const tag = await server.executeOperation({
            query: CREATE_TAG,
            variables: {tag:{name, icon}}
        });
        
        
        if (tag.errors) expect(tag.errors[0]).toBeDefined();
        expect(tag.data?.getTagByName).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(`Le nom ${name} est déjà utilisé, vous devez en choisir un autre`); 
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a tag with an icon too long, more than 255 characters", async () => {
        const tag = await server.executeOperation({
            query: CREATE_TAG,
            variables: {tag:{name: "new Tag name", icon: strTooLong}}
        })
        
        if (tag.errors) expect(tag.errors).toBeDefined();
        if (tag.data) expect(tag.data).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(TagErrorValidator.ICON_TOO_LONG);  
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    //UPDATE
    it("Should update and returns a tag", async () => {
        const tag = await server.executeOperation({
            query: UPDATE_TAG,
            variables: { 
                tag: {
                    id: 5, 
                    name: "updated Tag", 
                    icon: 'update.png' 
                }
            }
        })
        
        if (tag.errors) expect(tag.errors).toBeUndefined();
        expect(tag.data?.updateTag).toBeDefined();
        expect(tag.data?.updateTag).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            icon: expect.any(String)
        }));
    });

    it("Should trigger an error 400 Bad Request when we attempt to update a tag without id", async () => {
        const tag = await server.executeOperation({
            query: UPDATE_TAG,
            variables: {tag: {name: "test30", icon: 'icon.png'}}
        })
        
        if (tag.errors) expect(tag.errors[0]).toBeDefined();
        expect(tag.data?.getTagByName).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe("Oups!! Quelque chose s'est mal passé\nL'identifiant du tag est requis"); 
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.BAD_REQUEST);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.BAD_REQUEST);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a tag with an id which doesn't exist in database", async () => {
        const id = 10;
        const tag = await server.executeOperation({
            query: UPDATE_TAG,
            variables: { 
                tag: {
                    id: id, 
                    name: "updated tag", 
                    icon: "updated.png" 
                }
            }
        })
        
        if (tag.errors) expect(tag.errors).toBeDefined();
        if (tag.data) expect(tag.data).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe("Le tag n'existe pas en base de données");  
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a tag with an empty name", async () => {
        const tag = await server.executeOperation({
            query: UPDATE_TAG,
            variables: { 
                tag: {
                    id: 6, 
                    name: "", 
                    icon: "updated.png" 
                }
            }
        })
        
        if (tag.errors) expect(tag.errors).toBeDefined();
        if (tag.data) expect(tag.data).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(TagErrorValidator.NAME_TOO_SHORT);  
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a tag with a name filled by white spaces", async () => {
        const tag = await server.executeOperation({
            query: UPDATE_TAG,
            variables: { 
                tag: {
                    id: 6, 
                    name: "                 ", 
                    icon: 'icon.png' 
                }
            }
        })
        
        if (tag.errors) expect(tag.errors[0]).toBeDefined();
        expect(tag.data?.getTagByName).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(TagErrorValidator.NAME_TOO_SHORT); 
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a tag with a name too long, more than 255 characters", async () => {
        const tag = await server.executeOperation({
            query: UPDATE_TAG,
            variables: { 
                tag: {
                    id: 6, 
                    name: strTooLong, 
                    icon: 'icon.png' 
                }
            }
        })
        
        if (tag.errors) expect(tag.errors[0]).toBeDefined();
        expect(tag.data?.getTagByName).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(TagErrorValidator.NAME_TOO_LONG);  
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a tag with a name wich already exist in database", async () => {
        const name = formatString("promenade"),
            icon = "promenade.png";
        const tag = await server.executeOperation({
            query: UPDATE_TAG,
            variables: { 
                tag: {
                    id: 5, 
                    name: name, 
                    icon: icon 
                }
            }
        })
        
        if (tag.errors) expect(tag.errors[0]).toBeDefined();
        expect(tag.data?.getTagByName).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(`Le nom ${name} est déjà utilisé, vous devez en choisir un autre`);  
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a tag with an icon too long, more than 255 characters", async () => {
        const tag = await server.executeOperation({
            query: UPDATE_TAG,
            variables: { 
                tag: {
                    id: 6,
                    name: "new Tag name", 
                    icon: strTooLong 
                }
            }
        })
        
        if (tag.errors) expect(tag.errors).toBeDefined();
        if (tag.data) expect(tag.data).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(TagErrorValidator.ICON_TOO_LONG);  
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    //DELETE
    // it("Should delete a tag by its id", async () => {
    //     const tag = await server.executeOperation({
    //         query: DELETE,
    //         variables: {deleteTagId: 6}
    //     })
        
    //     expect(tag.errors).toBeUndefined();
    //     expect(tag.data?.deleteTag).toBeDefined();
    //     if (tag.data) {
    //         expect(tag.data.deleteTag).toEqual(expect.objectContaining({
    //             name: expect.any(String),
    //             icon: expect.any(String)
    //         }));
    //     };
    // });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to delete a tag with the id 0", async () => {
        const tag = await server.executeOperation({
            query: DELETE,
            variables: {deleteTagId: 0}
        })
        
        if (tag.errors) expect(tag.errors).toBeDefined();
        if (tag.data) expect(tag.data).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(CommonErrorValidator.ID_EQUAL_0);  
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 404 Not Found when we attempt to delete a tag with an id wich doesn't exist in database", async () => {
        const tag = await server.executeOperation({
            query: DELETE,
            variables: {deleteTagId: 10}
        })
        
        if (tag.errors) expect(tag.errors).toBeDefined();
        if (tag.data) expect(tag.data).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe("Le tag n'existe pas en base de données");  
            const customError = tag.errors[0].extensions;
            expect(customError?.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError?.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError?.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);   
        } 
    });
});