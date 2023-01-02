import { DatabaseLoader } from "../../../loader/database.loader";
import * as TagService from "../../../service/tag.service";
import { CustomError } from "../../../utils/error/CustomError.utils.error";
import { NotFoundError } from "../../../utils/error/interfaces.utils.error";
import { StatusCodeClass, StatusCodeMessage, StatusCode } from "../../../utils/constants.utils";
import Tag from "../../../entity/Tag.entity";

const getAll = TagService.getAll, 
    getTagById = TagService.getById,
    getTagByName = TagService.getByName,
    create = TagService.create,
    update = TagService.update,
    deleteTag = TagService.deleteTag;


describe("integration/service/tag.service suite of tests", () => {

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
        const tag: Tag = await getTagById(1);
        expect(tag).not.toBeUndefined();
        expect(tag).toBeDefined();
        expect(tag && typeof tag === 'object').toBe(true);
        expect(tag).toBeInstanceOf(Tag)
        expect(tag.name).toBe("Concert");
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
        const tag: Tag = await getTagByName("restaurant");
        expect(tag).not.toBeUndefined();
        expect(tag).toBeDefined();
        expect(tag && typeof tag === 'object').toBe(true);
        expect(tag).toBeInstanceOf(Tag);
        expect(tag.id).toBe(4);
        expect(tag.name).toBe("Restaurant");
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
    it("Should create a tag and returns it", async () => {
        const tag: Tag = await create({ name: "new Tag", icon: 'icon.png' });
        expect(tag).not.toBeUndefined();
        expect(tag).toBeDefined();
        expect(tag && typeof tag === 'object').toBe(true);
        expect(tag).toBeInstanceOf(Object)
        expect(tag.id).toBe(6);
        expect(tag.name).toBe("New Tag");
        expect(tag.icon).toBe("icon.png");
        expect(tag).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            icon: expect.any(String)
        }));
    });

    // UPDATE
    it("Should update a tag and returns it", async () => {
        const tag: Tag = await update({ id: 6, name: "updated Tag", icon: 'updated.png' });
        expect(tag).not.toBeUndefined();
        expect(tag).toBeDefined();
        expect(tag && typeof tag === 'object').toBe(true);
        expect(tag).toBeInstanceOf(Object)
        expect(tag.id).toBe(6);
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

    // DELETE
    it("Should delete a tag and returns it", async () => {
        const tag: Tag = await deleteTag(6);
        expect(tag).not.toBeUndefined();
        expect(tag).toBeDefined();
        expect(tag && typeof tag === 'object').toBe(true);
        expect(tag).toBeInstanceOf(Object);
        expect(tag.id).toBe(undefined);
        expect(tag.name).toBe("Updated Tag");
        expect(tag.icon).toBe("updated.png");
        expect(tag).toEqual(expect.objectContaining({
            id: undefined,
            name: expect.any(String),
            icon: expect.any(String)
        }));
    });

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