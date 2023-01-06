import { DatabaseLoader } from "../../../loader/database.loader";
import * as TagService from "../../../service/tag.service";
import { CustomError } from "../../../utils/error/CustomError.utils.error";
import { NotFoundError, InternalServerError, UnprocessableEntityError } from "../../../utils/error/interfaces.utils.error";
import { StatusCodeClass, StatusCodeMessage, StatusCode } from "../../../utils/constants.utils";
import Tag from "../../../entity/Tag.entity";
import { emojiShocked } from "../../../utils/emoji.utils";
import { formatString } from "../../../utils/string.utils";


const getAll = TagService.getAll, 
    getTagById = TagService.getById,
    getTagByName = TagService.getByName,
    create = TagService.create,
    update = TagService.update,
    deleteTag = TagService.deleteTag;


// TRIGGER 500 INTERNAL ERROR
describe("integration/service/tag.service suite of tests without database connexion", () => {
    it("Should not retrieve all tags in database and throw an 500 Internal Error", async () => {
        try {
            await getAll();
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Ouups!!Something went wrong\nProblème de connexion interne, les tags n'ont pas été chargés`);
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
                    `Problème de connexion interne, les tags n'ont pas été chargés`
                ))
        }
    });
    
    it("Should not retrieve tag by its id in database and throw an 500 Internal Error", async () => {
        try {
            await getTagById(1);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Ouups!!Something went wrong\nProblème de connexion interne, le tag n'a pas été chargé`);
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
                    `Problème de connexion interne, le tag n'a pas été chargé`
                ))
        }
    });
    
    it("Should not retrieve tag by its name in database and throw an 500 Internal Error", async () => {
        const name = formatString("test");
        try {
            await getTagByName(name);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Ouups!!Something went wrong\nProblème de connexion interne, le tag ${name} n'a pas été chargé`);
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
                    `Problème de connexion interne, le tag ${name} n'a pas été chargé`
                ))
        }
    });
    
    it("Should not create a tag and throw an 500 Internal Error", async () => {
        const tag = new Tag();
        tag.name = formatString("test");
        tag.icon = "test.png";
        try {
            await create(tag);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Ouups!!Something went wrong\nProblème de connexion interne, le tag ${tag.name} n'a pas été créé`);
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
                    `Problème de connexion interne, le tag ${tag.name} n'a pas été créé`
                ))
        }
    });
    
    it("Should not update a tag and throw an 500 Internal Error", async () => {
        const tag = new Tag();
        tag.id = 5;
        tag.name = formatString("test");
        tag.icon = "test.png";
        try {
            await update(tag);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Ouups!!Something went wrong\nProblème de connexion interne, le tag n'a pas été mis à jour`);
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
                    `Problème de connexion interne, le tag n'a pas été mis à jour`
                ))
        }
    });
    
    it("Should not delete a tag and throw an 500 Internal Error", async () => {
        try {
            await deleteTag(1);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Ouups!!Something went wrong\nProblème de connexion interne, le tag n'a pas été supprimé`);
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
                    `Problème de connexion interne, le tag n'a pas été supprimé`
                ))
        }
    });
})


// NOW WE INSTANCIATE THE DATABASE CONNECTION TO AVOID INTERNAL ERROR 500
describe("integration/service/tag.service suite of tests with database connexion", () => {
    beforeAll(async () => {
        await DatabaseLoader.openConnection(); 
    });
   
    // GET ALL
    it("Should retrieve all tags in database", async () => {
        const tags: Tag[] = await getAll();
        expect(tags).not.toBeUndefined();
        expect(tags).toBeDefined();
        expect(tags && typeof tags === 'object').toBe(true);
        expect(tags[0]).toBeInstanceOf(Tag);
        tags.forEach(t => {
            expect(tags[0]).toEqual(expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                icon: expect.any(String)
            }));
        })
    }); 
     
    // GET BY ID
    it("Should retrieve a tag by its id", async () => {
        const tag: Tag = await getTagById(2);
        expect(tag).not.toBeUndefined();
        expect(tag).toBeDefined();
        expect(tag && typeof tag === 'object').toBe(true);
        expect(tag).toBeInstanceOf(Tag)
        expect(tag).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            icon: expect.any(String)
        }));
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a tag with the id 0", async () => {
        try {
            await getTagById(0);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le tag avec l'id 0 n'existe pas en base de données");
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.NOT_FOUND);
                expect(e.statusCode).toEqual(StatusCode.NOT_FOUND);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.NOT_FOUND);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new NotFoundError(), 
                    "Le tag avec l'id 0 n'existe pas en base de données"
            ))
        }
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a tag with the id 10 wich doesn't exist in the city_guid database", async () => {
        try {
            await getTagById(10);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le tag avec l'id 10 n'existe pas en base de données");
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.NOT_FOUND);
                expect(e.statusCode).toEqual(StatusCode.NOT_FOUND);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.NOT_FOUND);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new NotFoundError(), 
                    "Le tag avec l'id 10 n'existe pas en base de données"
                ))
        }
    });

    //GET BY NAME
    it("Should retrieve a tag by its name", async () => {
        const tag: Tag = await getTagByName("Concert");
        
        expect(tag).toBeDefined();
        expect(tag && typeof tag === 'object').toBe(true);
        expect(tag).toBeInstanceOf(Tag);
        expect(tag.name).toBe("Concert");
        expect(tag).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            icon: expect.any(String)
        }));
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a tag with an empty name", async () => {
        try {
            await getTagByName("");
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le tag avec le nom  n'existe pas en base de données");
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.NOT_FOUND);
                expect(e.statusCode).toEqual(StatusCode.NOT_FOUND);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.NOT_FOUND);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new NotFoundError(), 
                    "Le tag avec le nom  n'existe pas en base de données"
                ))
        }
    });

    it("Should trigger an error 404 Not Found when we attempt to retrieve a tag with an unknown name in database", async () => {
        try {
            await getTagByName("Se mettre au vert");
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le tag avec le nom Se mettre au vert n'existe pas en base de données");
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.NOT_FOUND);
                expect(e.statusCode).toEqual(StatusCode.NOT_FOUND);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.NOT_FOUND);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new NotFoundError(), 
                    "Le tag avec le nom Se mettre au vert n'existe pas en base de données"
                ))
        }
    });

    // CREATE
    // it("Should create a tag and returns it", async () => {
    //     const tag: Tag = await create({ name: "culturel", icon: 'culturel.png' });
    //     expect(tag).not.toBeUndefined();
    //     expect(tag).toBeDefined();
    //     expect(tag && typeof tag === 'object').toBe(true);
    //     expect(tag).toBeInstanceOf(Object)
    //     expect(tag.name).toBe("Culturel");
    //     expect(tag.icon).toBe("culturel.png");
    //     expect(tag).toEqual(expect.objectContaining({
    //         id: expect.any(Number),
    //         name: expect.any(String),
    //         icon: expect.any(String)
    //     }));
    // });
    

    it("Should return an error 422 Unprocessable Entity if we attempt to create a tag with a name which already exist in database", async () => {
        const tag = new Tag();
        tag.name = formatString("culturel");
        tag.icon = "icon.jpeg";
        try {
            await create(tag);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`Le nom ${tag.name} est déjà utilisé, vous devez en choisir un autre`);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new UnprocessableEntityError(), 
                    `Le nom ${tag.name} est déjà utilisé, vous devez en choisir un autre`
                ))
        }
    });

    // UPDATE
    it("Should update a tag and returns it", async () => {
        const tag: Tag = await update({ id: 5, name: "updated Tag", icon: 'updated.png' });
        expect(tag).not.toBeUndefined();
        expect(tag).toBeDefined();
        expect(tag && typeof tag === 'object').toBe(true);
        expect(tag).toBeInstanceOf(Object)
        expect(tag.id).toBe(5);
        expect(tag.name).toBe("Updated Tag");
        expect(tag.icon).toBe("updated.png");
        expect(tag).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            icon: expect.any(String)
        }));
    });

    it("Should return an error 404 NOT FOUND if we update a tag with an id which doesn't exist in database", async () => {
        try {
            await update({ id: 10, name: "new Tag", icon: 'icon.png' });
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le tag avec l'id 10 n'existe pas en base de données");
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.NOT_FOUND);
                expect(e.statusCode).toEqual(StatusCode.NOT_FOUND);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.NOT_FOUND);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new NotFoundError(), 
                    "Le tag avec l'id 10 n'existe pas en base de données"
                ))
        }
    });

    it("Should return an error 422 Unprocessable Entity if we attempt to update a tag with a name which already exist in database", async () => {
        const tag = new Tag();
        tag.id = 1;
        tag.name = formatString("updated Tag");
        tag.icon = "icon.jpeg";
        try {
            await update(tag);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`Le nom ${tag.name} est déjà utilisé, vous devez en choisir un autre`);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCode).toEqual(StatusCode.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.UNPROCESSABLE_ENTITY);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.UNPROCESSABLE_ENTITY);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new UnprocessableEntityError(), 
                    `Le nom ${tag.name} est déjà utilisé, vous devez en choisir un autre`
                ))
        }
    });

    // DELETE
    // it("Should delete a tag and returns it", async () => {
    //     const tag: Tag = await deleteTag(6);
    //     expect(tag).not.toBeUndefined();
    //     expect(tag).toBeDefined();
    //     expect(tag && typeof tag === 'object').toBe(true);
    //     expect(tag).toBeInstanceOf(Object);
    //     expect(tag.id).toBe(undefined);
    //     expect(tag).toEqual(expect.objectContaining({
    //         id: undefined,
    //         name: expect.any(String),
    //         icon: expect.any(String)
    //     }));
    // });

    it("Should return an error 404 NOT FOUND if we delete a tag with an id which doesn't exist in database", async () => {
        try {
            await deleteTag(10);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe("Le tag avec l'id 10 n'existe pas en base de données");
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.NOT_FOUND);
                expect(e.statusCode).toEqual(StatusCode.NOT_FOUND);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.NOT_FOUND);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(
                new CustomError(
                    new NotFoundError(), 
                    "Le tag avec l'id 10 n'existe pas en base de données"
                ))
        }
    });
});
