import { DatabaseLoader } from "../../../loaders/database.loader";
import * as TypeService from "../../../services/type.service";
import { CustomError } from "../../../utils/errors/CustomError.utils.error";
import { NotFoundError, InternalServerError, UnprocessableEntityError } from "../../../utils/errors/interfaces.utils.error";
import { StatusCodeClass, StatusCodeMessage, StatusCode } from "../../../utils/constants.utils";
import Type from "../../../entities/Type.entity";
import { emojiShocked } from "../../../utils/emoji.utils";
import { formatString } from "../../../utils/string.utils";
import { TypeValidator } from "../../../validators/entities/type.validator.entity";


const getAll = TypeService.getAll, 
    getTypeById = TypeService.getById,
    getTypeByName = TypeService.getByName,
    create = TypeService.create,
    update = TypeService.update,
    deleteType = TypeService.deleteType;


// TRIGGER 500 INTERNAL ERROR
describe("integration/service/type.service suite of tests without database connexion", () => {
    it("Should not retrieve all types in database and throw an 500 Internal Error", async () => {
        try {
            await getAll();
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
    
    it("Should not retrieve type by its id in database and throw an 500 Internal Error", async () => {
        try {
            await getTypeById(1);
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
    
    it("Should not retrieve type by its name in database and throw an 500 Internal Error", async () => {
        const name = formatString("test");
        try {
            await getTypeByName(name);
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
    
    it("Should not create a type and throw an 500 Internal Error", async () => {
        const type = new TypeValidator();
        type.name = formatString("test");
        type.logo = "test.png";
        type.color = "#000000"
        try {
            await create(type);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le type ${type.name} n'a pas été créé`);
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
                    `Problème de connexion interne, le type ${type.name} n'a pas été créé`
                ))
        }
    });
    
    it("Should not update a type and throw an 500 Internal Error", async () => {
        const type = new TypeValidator();
        type.id = 5;
        type.name = formatString("test");
        type.logo = "test.png";
        type.color = "#000000"

        try {
            await update(type);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le type n'a pas été mis à jour`);
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
                    `Problème de connexion interne, le type n'a pas été mis à jour`
                ))
        }
    });
    
    it("Should not delete a type and throw an 500 Internal Error", async () => {
        try {
            await deleteType(1);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`${emojiShocked} Oups!! Quelque chose s'est mal passé\nProblème de connexion interne, le type n'a pas été supprimé`);
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
                    `Problème de connexion interne, le type n'a pas été supprimé`
                ))
        }
    });
})


// NOW WE INSTANCIATE THE DATABASE CONNECTION TO AVOID INTERNAL ERROR 500
describe("integration/service/type.service suite of tests with database connexion", () => {
    beforeAll(async () => {
        await DatabaseLoader.openConnection(); 
    });
   
    // GET ALL
    it("Should retrieve all types in database", async () => {
        const types: Type[] = await getAll();
        expect(types).not.toBeUndefined();
        expect(types).toBeDefined();
        expect(types && typeof types === 'object').toBe(true);
        expect(types[0]).toBeInstanceOf(Type);
        types.forEach(t => {
            expect(types[0]).toEqual(expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                logo: expect.any(String),
                color: expect.any(String)
            }));
        })
    }); 
     
    // // GET BY ID
    // it("Should retrieve a type by its id", async () => {
    //     const type: Type = await getTypeById(2);
    //     expect(type).not.toBeUndefined();
    //     expect(type).toBeDefined();
    //     expect(type && typeof type === 'object').toBe(true);
    //     expect(type).toBeInstanceOf(Type)
    //     expect(type).toEqual(expect.objectContaining({
    //         id: expect.any(Number),
    //         name: expect.any(String),
    //         logo: expect.any(String),
    //         color: expect.any(String)
    //     }));
    // });

    // it("Should trigger an error 404 Not Found when we attempt to retrieve a type with the id 0", async () => {
    //     try {
    //         await getTypeById(0);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe("Le type n'existe pas en base de données");
    //             expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCode).toBe(StatusCode.NOT_FOUND);
    //             expect(e.extensions.statusCode).toEqual(StatusCode.NOT_FOUND);
    //             expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
    //             expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.NOT_FOUND);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(
    //             new CustomError(
    //                 new NotFoundError(), 
    //                 `Le type n'existe pas en base de données`
    //         ))
    //     }
    // });

    // it("Should trigger an error 404 Not Found when we attempt to retrieve a type with the id 10 wich doesn't exist in the city_guid database", async () => {
    //     try {
    //         await getTypeById(10);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe("Le type n'existe pas en base de données");
    //             expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCode).toBe(StatusCode.NOT_FOUND);
    //             expect(e.extensions.statusCode).toEqual(StatusCode.NOT_FOUND);
    //             expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
    //             expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.NOT_FOUND);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(
    //             new CustomError(
    //                 new NotFoundError(), 
    //                 "Le type n'existe pas en base de données"
    //             ))
    //     }
    // });

    // // GET BY NAME
    // it("Should retrieve a type by its name", async () => {
    //     const type: Type = await getTypeByName("Type1");
        
    //     expect(type).toBeDefined();
    //     expect(type && typeof type === 'object').toBe(true);
    //     expect(type).toBeInstanceOf(Type);
    //     expect(type.name).toBe("Type1");
    //     expect(type).toEqual(expect.objectContaining({
    //         id: expect.any(Number),
    //         name: expect.any(String),
    //         logo: expect.any(String),
    //         color: expect.any(String)
    //     }));
    // });

    // it("Should trigger an error 404 Not Found when we attempt to retrieve a type with an empty name", async () => {
    //     try {
    //         await getTypeByName("");
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe("Le type avec le nom  n'existe pas en base de données");
    //             expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCode).toBe(StatusCode.NOT_FOUND);
    //             expect(e.extensions.statusCode).toEqual(StatusCode.NOT_FOUND);
    //             expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
    //             expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.NOT_FOUND);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(
    //             new CustomError(
    //                 new NotFoundError(), 
    //                 "Le type avec le nom  n'existe pas en base de données"
    //             ))
    //     }
    // });

    // it("Should trigger an error 404 Not Found when we attempt to retrieve a type with an unknown name in database", async () => {
    //     try {
    //         await getTypeByName("Type1");
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe("Le type avec le nom Type1 n'existe pas en base de données");
    //             expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCode).toBe(StatusCode.NOT_FOUND);
    //             expect(e.extensions.statusCode).toEqual(StatusCode.NOT_FOUND);
    //             expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
    //             expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.NOT_FOUND);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(
    //             new CustomError(
    //                 new NotFoundError(), 
    //                 "Le type avec le nom Type1 n'existe pas en base de données"
    //             ))
    //     }
    // });

    // // CREATE
    // // it("Should create a type and returns it", async () => {
    // //     const type: Type = await create({ name: "type4", logo: "type4.png", color: "#343434" });
    // //     expect(type).not.toBeUndefined();
    // //     expect(type).toBeDefined();
    // //     expect(type && typeof type === 'object').toBe(true);
    // //     expect(type).toBeInstanceOf(Object)
    // //     expect(type.name).toBe("Type4");
    // //     expect(type.logo).toBe("type4.png");
    // //     expect(type.color).toBe("#343434");
    // //     expect(type).toEqual(expect.objectContaining({
    // //         id: expect.any(Number),
    // //         name: expect.any(String),
    // //         logo: expect.any(String),
    // //         color: expect.any(String)
    // //     }));
    // // });
    

    // it("Should return an error 422 Unprocessable Entity if we attempt to create a type with a name which already exist in database", async () => {
    //     const type = new TypeValidator();
    //     type.name = formatString("type1");
    //     type.logo = "type1.jpeg";
    //     type.color = "#4d5d53";
    //     try {
    //         await create(type);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe(`Le nom ${type.name} est déjà utilisé, vous devez en choisir un autre`);
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
    //                 `Le nom ${type.name} est déjà utilisé, vous devez en choisir un autre`
    //             ))
    //     }
    // });

    // it("Should return an error 422 Unprocessable Entity if we attempt to create a type with a logo which already exist in database", async () => {
    //     const type = new TypeValidator();
    //     type.name = formatString("typeBeta");
    //     type.logo = "type1.png";
    //     type.color = "#4d5d53";
    //     try {
    //         await create(type);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe(`Un type possède déjà ce nom de logo, vous devez en choisir une autre`);
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
    //                 `Un type possède déjà ce nom de logo, vous devez en choisir une autre`
    //             ))
    //     }
    // });

    // it("Should return an error 422 Unprocessable Entity if we attempt to create a type with a color which already exist in database", async () => {
    //     const type = new TypeValidator();
    //     type.name = formatString("typeBeta");
    //     type.logo = "typebeta.png";
    //     type.color = "#4d5d53";
    //     try {
    //         await create(type);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe(`Un type possède déjà cette couleur, vous devez en choisir une autre`);
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
    //                 `Un type possède déjà cette couleur, vous devez en choisir une autre`
    //             ))
    //     }
    // });

    // // UPDATE
    // it("Should update a type and returns it", async () => {
    //     const type: Type = await update({ id: 3, name: "updated Type", logo: 'updated.png', color: "#fff" });
    //     expect(type).not.toBeUndefined();
    //     expect(type).toBeDefined();
    //     expect(type && typeof type === 'object').toBe(true);
    //     expect(type).toBeInstanceOf(Object)
    //     expect(type.id).toBe(3);
    //     expect(type.name).toBe("Updated Type");
    //     expect(type.logo).toBe("updated.png");
    //     expect(type.color).toBe("#fff");
    //     expect(type).toEqual(expect.objectContaining({
    //         id: expect.any(Number),
    //         name: expect.any(String),
    //         logo: expect.any(String),
    //         color: expect.any(String)
    //     }));
    // });

    // it("Should return an error 404 NOT FOUND if we update a type with an id which doesn't exist in database", async () => {
    //     try {
    //         await update({ id: 10, name: "updated Type", logo: 'updated.png', color: "#fff" });
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe("Le type n'existe pas en base de données");
    //             expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCode).toBe(StatusCode.NOT_FOUND);
    //             expect(e.extensions.statusCode).toEqual(StatusCode.NOT_FOUND);
    //             expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
    //             expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.NOT_FOUND);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(
    //             new CustomError(
    //                 new NotFoundError(), 
    //                 "Le type n'existe pas en base de données"
    //             ))
    //     }
    // });

    // it("Should return an error 422 Unprocessable Entity if we attempt to update a type with a name which already exist in database", async () => {
    //     const type = new TypeValidator();
    //     type.id = 1;
    //     type.name = formatString("updated Type");
    //     type.logo = "updated.png";
    //     type.color = "#000";
    //     try {
    //         await update(type);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe(`Le nom ${type.name} est déjà utilisé, vous devez en choisir un autre`);
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
    //                 `Le nom ${type.name} est déjà utilisé, vous devez en choisir un autre`
    //             ))
    //     }
    // });

    // it("Should return an error 422 Unprocessable Entity if we attempt to update a type with a logo which already exist in database", async () => {
    //     const type = new TypeValidator();
    //     type.id = 1;
    //     type.name = formatString("updated Typebeta");
    //     type.logo = "updated.png";
    //     type.color = "#000";
    //     try {
    //         await update(type);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe(`Un type possède déjà ce nom de logo, vous devez en choisir une autre`);
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
    //                 `Un type possède déjà ce nom de logo, vous devez en choisir une autre`
    //             ))
    //     }
    // });

    // it("Should return an error 422 Unprocessable Entity if we attempt to update a type with a color which already exist in database", async () => {
    //     const type = new TypeValidator();
    //     type.id = 1;
    //     type.name = formatString("updated Typebeta");
    //     type.logo = "updated-typebeta.png";
    //     type.color = "#fff";
    //     try {
    //         await update(type);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe(`Un type possède déjà cette couleur, vous devez en choisir une autre`);
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
    //                 `Un type possède déjà cette couleur, vous devez en choisir une autre`
    //             ))
    //     }
    // });

    // // DELETE
    // // it("Should delete a tag and returns it", async () => {
    // //     const tag: Tag = await deleteTag(6);
    // //     expect(tag).not.toBeUndefined();
    // //     expect(tag).toBeDefined();
    // //     expect(tag && typeof tag === 'object').toBe(true);
    // //     expect(tag).toBeInstanceOf(Object);
    // //     expect(tag.id).toBe(undefined);
    // //     expect(tag).toEqual(expect.objectContaining({
    // //         id: undefined,
    // //         name: expect.any(String),
    // //         icon: expect.any(String)
    // //     }));
    // // });

    // it("Should return an error 404 NOT FOUND if we delete a type with an id which doesn't exist in database", async () => {
    //     try {
    //         await deleteType(10);
    //     } catch (e) {
    //         if (e instanceof CustomError) {
    //             expect(e.message).toBe("Le type n'existe pas en base de données");
    //             expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
    //             expect(e.extensions.statusCode).toBe(StatusCode.NOT_FOUND);
    //             expect(e.extensions.statusCode).toEqual(StatusCode.NOT_FOUND);
    //             expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.NOT_FOUND);
    //             expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.NOT_FOUND);
    //         }
            
    //         expect(e).toBeDefined();
    //         expect(e).toStrictEqual(
    //             new CustomError(
    //                 new NotFoundError(), 
    //                 "Le type n'existe pas en base de données"
    //             ))
    //     }
    // });
});
