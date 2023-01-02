import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { startAppoloServer } from "../../../loader/appolo-server.loader";
import * as TagApi from "../api/tag.test.functionnal.api";
import { DatabaseLoader } from "../../../loader/database.loader";
import Tag from "../../../entity/Tag.entity";
import { 
    idEqual0ErrorMessage, 
    nameTooShortErrorMessage, 
    nameTooLongErrorMessage, 
    iconTooLongErrorMessage 
} from "../../../validator/messages.validator";
import { 
    StatusCodeClass, 
    StatusCodeMessage, 
    StatusCode, 
    strTooLong 
} from "../../../utils/constants.utils";

const GET_ALL = TagApi.GET_ALL,
    GET_TAG_BY_ID = TagApi.GET_TAG_BY_ID,
    GET_TAG_BY_NAME = TagApi.GET_TAG_BY_NAME,
    CREATE_TAG = TagApi.CREATE_TAG,
    UPDATE_TAG = TagApi.UPDATE_TAG,
    DELETE = TagApi.DELETE;

describe("functionnal/resolver/tag.resolver suite of tests", () => {
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
            expect(tag?.errors[0]?.message).toBe(idEqual0ErrorMessage); 
            const customError = tag.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
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
            expect(tag?.errors[0]?.message).toBe("Le tag avec l'id 10 n'existe pas en base de données"); 
            const customError = tag.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);  
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
            expect(tag?.errors[0]?.message).toBe(nameTooShortErrorMessage); 
            const customError = tag.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
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
            expect(tag?.errors[0]?.message).toBe("Le tag avec le nom lorem n'existe pas en base de données"); 
            const customError = tag.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);  
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
            expect(tag?.errors[0]?.message).toBe(nameTooLongErrorMessage); 
            const customError = tag.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);  
        } 
    });

    //CREATE
    it("Should create and returns a tag", async () => {
        const tag = await server.executeOperation({
            query: CREATE_TAG,
            variables: { name: "new Tag", icon: 'icon.png' }
        })
        
        if (tag.errors) expect(tag.errors[0]).toBeDefined();
        expect(tag.data?.createTag).toBeDefined();
        expect(tag.data?.createTag).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            icon: expect.any(String)
        }));
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a tag with an empty name", async () => {
        const tag = await server.executeOperation({
            query: CREATE_TAG,
            variables: { name: "", icon: 'icon.png' }
        })
        
        if (tag.errors) expect(tag.errors[0]).toBeDefined();
        if (tag.data) expect(tag.data).not.toBeDefined();
        expect(tag.data?.getTagByName).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(nameTooShortErrorMessage); 
            const customError = tag.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a tag with a name filled by white spaces", async () => {
        const tag = await server.executeOperation({
            query: CREATE_TAG,
            variables: { name: "                 ", icon: 'icon.png' }
        })
        
        if (tag.errors) expect(tag.errors[0]).toBeDefined();
        expect(tag.data?.getTagByName).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(nameTooShortErrorMessage); 
            const customError = tag.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a tag with a name too long, more than 255 characters", async () => {
        const tag = await server.executeOperation({
            query: CREATE_TAG,
            variables: { name: strTooLong, icon: 'icon.png' }
        })
        
        if (tag.errors) expect(tag.errors[0]).toBeDefined();
        expect(tag.data?.getTagByName).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(nameTooLongErrorMessage);  
            const customError = tag.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to create a tag with an icon too long, more than 255 characters", async () => {
        const tag = await server.executeOperation({
            query: CREATE_TAG,
            variables: { name: "new Tag name", icon: strTooLong }
        })
        
        if (tag.errors) expect(tag.errors).toBeDefined();
        if (tag.data) expect(tag.data).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(iconTooLongErrorMessage);  
            const customError = tag.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    //UPDATE
    it("Should update and returns a tag", async () => {
        const tag = await server.executeOperation({
            query: UPDATE_TAG,
            variables: { 
                updateTagId: 6, 
                name: "updated Tag", 
                icon: 'update.png' 
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

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a tag with an empty name", async () => {
        const tag = await server.executeOperation({
            query: UPDATE_TAG,
            variables: { 
                updateTagId: 6, 
                name: "", 
                icon: "updated.png" 
            }
        })
        
        if (tag.errors) expect(tag.errors).toBeDefined();
        if (tag.data) expect(tag.data).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(nameTooShortErrorMessage);  
            const customError = tag.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a tag with a name filled by white spaces", async () => {
        const tag = await server.executeOperation({
            query: UPDATE_TAG,
            variables: { 
                updateTagId: 6, 
                name: "                 ", 
                icon: 'icon.png' 
            }
        })
        
        if (tag.errors) expect(tag.errors[0]).toBeDefined();
        expect(tag.data?.getTagByName).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(nameTooShortErrorMessage); 
            const customError = tag.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a tag with a name too long, more than 255 characters", async () => {
        const tag = await server.executeOperation({
            query: UPDATE_TAG,
            variables: { 
                updateTagId: 6, 
                name: strTooLong, 
                icon: 'icon.png' 
            }
        })
        
        if (tag.errors) expect(tag.errors[0]).toBeDefined();
        expect(tag.data?.getTagByName).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(nameTooLongErrorMessage);  
            const customError = tag.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to update a tag with an icon too long, more than 255 characters", async () => {
        const tag = await server.executeOperation({
            query: UPDATE_TAG,
            variables: { 
                updateTagId: 6,
                name: "new Tag name", 
                icon: strTooLong 
            }
        })
        
        if (tag.errors) expect(tag.errors).toBeDefined();
        if (tag.data) expect(tag.data).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(iconTooLongErrorMessage);  
            const customError = tag.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
        } 
    });

    //DELETE
    it("Should delete a tag by its id", async () => {
        const tag = await server.executeOperation({
            query: DELETE,
            variables: {deleteTagId: 6}
        })
        
        expect(tag.errors).toBeUndefined();
        expect(tag.data?.deleteTag).toBeDefined();
        if (tag.data) {
            expect(tag.data.deleteTag).toEqual(expect.objectContaining({
                name: expect.any(String),
                icon: expect.any(String)
            }));
        };
    });

    it("Should trigger an error 422 Unprocessable Entity when we attempt to delete a tag with the id 0", async () => {
        const tag = await server.executeOperation({
            query: DELETE,
            variables: {deleteTagId: 0}
        })
        
        if (tag.errors) expect(tag.errors).toBeDefined();
        if (tag.data) expect(tag.data).not.toBeDefined();
        if (tag.errors) {
            expect(tag?.errors[0]?.message).toBe(idEqual0ErrorMessage);  
            const customError = tag.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);   
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
            expect(tag?.errors[0]?.message).toBe("Le tag avec l'id 10 n'existe pas en base de données");  
            const customError = tag.errors[0].extensions?.exception;
            expect(customError.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
            expect(customError.statusCode).toBe(StatusCode.NOT_FOUND);     
            expect(customError.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);   
        } 
    });
});