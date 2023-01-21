import "reflect-metadata";
import { 
    PoiValidator, 
    validateCreationPoiInput, 
    validateUpdatePoiInput 
} from "../../../validator/entity/poi.validator.entity";
import { PoiErrorValidator } from "../../../validator/messages.validator";
import { CustomError } from "../../../utils/error/CustomError.utils.error";
import { BadRequestError, UnprocessableEntityError } from "../../../utils/error/interfaces.utils.error";
import { StatusCodeClass, StatusCodeMessage, StatusCode, strTooLong } from "../../../utils/constants.utils";
import { CityValidator } from "../../../validator/entity/city.validator.entity";
import { TypeValidator } from "../../../validator/entity/type.validator.entity";
import { TagValidator } from "../../../validator/entity/tag.validator.entity";


describe("unit/validator/poi.validator suite of tests", () => {
    // CREATE POI
    it("Should return Poi when we create a poi with filled fields", async () => {
        const poi = new PoiValidator(); 
        poi.name = "a poi name",
        poi.address = "adrress",
        poi.latitude = "15.6418",
        poi.longitude = "64.2944",
        poi.picture = "a poi picture";

        const city = new CityValidator();
        city.id = 1;
        city.name = "name",
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

        const tag1 = new TagValidator();
        tag1.id = 1;
        tag1.name = "tag1 name";
        tag1.icon = "icon tag1";
        poi.tags = [tag1];

        const createdPoi = await validateCreationPoiInput(poi);
        
        expect(createdPoi instanceof PoiValidator).toBe(true);
        expect(createdPoi.name).toBe("a poi name");
        expect(createdPoi.latitude).toBe("15.6418");
        expect(createdPoi.longitude).toBe("64.2944");
        expect(createdPoi.picture).toBe("a poi picture");
    });

    it("Should return 400 Bad Request Error when we create a poi with id", async () => {
        const poi = new PoiValidator(); 
        poi.id = 10;
        poi.name = "a poi name",
        poi.address = "adrress",
        poi.latitude = "15.6418",
        poi.longitude = "64.2944",
        poi.picture = "a poi picture";

        const city = new CityValidator();
        city.id = 1;
        city.name = "name",
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

        const tag1 = new TagValidator();
        tag1.id = 0;
        tag1.name = "";
        tag1.icon = "icon tag1";
        poi.tags = [tag1];

        try {
            await validateCreationPoiInput(poi);        
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`Oups!! Quelque chose s'est mal passé\n${PoiErrorValidator.ID_NOT_REQUIRED}`);
                expect(e.message).toEqual(`Oups!! Quelque chose s'est mal passé\n${PoiErrorValidator.ID_NOT_REQUIRED}`);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.BAD_REQUEST);
                expect(e.statusCode).toEqual(StatusCode.BAD_REQUEST);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.BAD_REQUEST);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.BAD_REQUEST);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new BadRequestError(), PoiErrorValidator.ID_NOT_REQUIRED))
        }
    });


    // UPDATE POI
    it("Should return Poi when we update a poi with filled fields", async () => {
        const poi = new PoiValidator(); 
        poi.id = 1;
        poi.name = "a poi name",
        poi.address = "adrress",
        poi.latitude = "15.6418",
        poi.longitude = "64.2944",
        poi.picture = "a poi picture";

        const city = new CityValidator();
        city.id = 1;
        city.name = "name",
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

        const tag1 = new TagValidator();
        tag1.id = 1;
        tag1.name = "tag1 name";
        tag1.icon = "icon tag1";
        poi.tags = [tag1];

        const createdPoi = await validateUpdatePoiInput(poi);
        
        expect(createdPoi instanceof PoiValidator).toBe(true);
        expect(createdPoi.id).toBe(1);
        expect(createdPoi.name).toBe("a poi name");
        expect(createdPoi.latitude).toBe("15.6418");
        expect(createdPoi.longitude).toBe("64.2944");
        expect(createdPoi.picture).toBe("a poi picture");
    });

    it("Should return 400 Bad Request Error when we update a poi without id", async () => {
        const poi = new PoiValidator(); 
        poi.name = "a poi name",
        poi.address = "adrress",
        poi.latitude = "15.6418",
        poi.longitude = "64.2944",
        poi.picture = "a poi picture";

        const city = new CityValidator();
        city.id = 1;
        city.name = "name",
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

        const tag1 = new TagValidator();
        tag1.id = 0;
        tag1.name = "tag1";
        tag1.icon = "icon tag1";
        poi.tags = [tag1];

        try {
            await validateUpdatePoiInput(poi);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`Oups!! Quelque chose s'est mal passé\n${PoiErrorValidator.ID_REQUIRED}`);
                expect(e.message).toEqual(`Oups!! Quelque chose s'est mal passé\n${PoiErrorValidator.ID_REQUIRED}`);
                expect(e.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.statusCode).toBe(StatusCode.BAD_REQUEST);
                expect(e.statusCode).toEqual(StatusCode.BAD_REQUEST);
                expect(e.statusCodeMessage).toBe(StatusCodeMessage.BAD_REQUEST);
                expect(e.statusCodeMessage).toEqual(StatusCodeMessage.BAD_REQUEST);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new BadRequestError(), PoiErrorValidator.ID_REQUIRED))
        }
    });
})
