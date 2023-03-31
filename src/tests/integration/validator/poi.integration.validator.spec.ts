import "reflect-metadata";
import { 
    PoiValidator, 
    validateCreationPoiInput, 
    validateUpdatePoiInput 
} from "../../../validators/entities/poi.validator.entity";
import { PoiErrorValidator } from "../../../validators/messages.validator";
import { CustomError } from "../../../utils/errors/CustomError.utils.error";
import { BadRequestError } from "../../../utils/errors/interfaces.utils.error";
import { StatusCodeClass, StatusCodeMessage, StatusCode } from "../../../utils/constants.utils";
import { CityValidator } from "../../../validators/entities/city.validator.entity";
import { TypeValidator } from "../../../validators/entities/type.validator.entity";
import { TagValidator } from "../../../validators/entities/tag.validator.entity";

const poiToTest = new PoiValidator(); 
poiToTest .name = "a poi name",
poiToTest .address = "adrress",
poiToTest .latitude = "15.641800",
poiToTest .longitude = "64.294400",
poiToTest .picture = "https://poiNameTest.png";

const cityToTest = new CityValidator();
cityToTest.id = 1;
cityToTest.name = "name",
cityToTest.latitude = "53.349800600",
cityToTest.longitude = "-6.260296400",
cityToTest.picture = "https://cityNameTest.png";

const typeToTest = new TypeValidator();
typeToTest.id = 1;
typeToTest.name = "name type";
typeToTest.logo = "logo type";
typeToTest.color = "#fff";

const tagToTest = new TagValidator();
tagToTest.id = 1;
tagToTest.name = "tag1 name";
tagToTest.icon = "icon tag1";

poiToTest.city = cityToTest;
poiToTest.type = typeToTest;
poiToTest.tags = [tagToTest];

const poiToTestForUpdate = {...poiToTest, id: 1};


describe("unit/validator/poi.validator suite of tests", () => {
    // CREATE POI
    it("Should return Poi when we create a poi with filled fields", async () => {
        const poi = poiToTest;
        const createdPoi = await validateCreationPoiInput(poi);
        
        expect(createdPoi instanceof PoiValidator).toBe(true);
        expect(createdPoi.name).toBe("a poi name");
        expect(createdPoi.latitude).toBe("15.641800");
        expect(createdPoi.longitude).toBe("64.294400");
        expect(createdPoi.picture).toBe("https://poiNameTest.png");
    });

    it("Should return 400 Bad Request Error when we create a poi with id", async () => {
        const poi = poiToTest; 
        poi.id = 10;

        try {
            await validateCreationPoiInput(poi);        
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`Oups!! Quelque chose s'est mal passé\n${PoiErrorValidator.ID_NOT_REQUIRED}`);
                expect(e.message).toEqual(`Oups!! Quelque chose s'est mal passé\n${PoiErrorValidator.ID_NOT_REQUIRED}`);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.BAD_REQUEST);
                expect(e.extensions.statusCode).toEqual(StatusCode.BAD_REQUEST);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.BAD_REQUEST);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.BAD_REQUEST);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new BadRequestError(), PoiErrorValidator.ID_NOT_REQUIRED))
        }
    });


    // UPDATE POI
    it("Should return Poi when we update a poi with filled fields", async () => {
        const poi = poiToTestForUpdate; 
        const createdPoi = await validateUpdatePoiInput(poi);
        
        expect(createdPoi instanceof PoiValidator).toBe(true);
        expect(createdPoi.id).toBe(1);
        expect(createdPoi.name).toBe("a poi name");
        expect(createdPoi.latitude).toBe("15.641800");
        expect(createdPoi.longitude).toBe("64.294400");
        expect(createdPoi.picture).toBe("https://poiNameTest.png");
    });

    it("Should return 400 Bad Request Error when we update a poi without id", async () => {
        const poi = poiToTest; 

        try {
            await validateUpdatePoiInput(poi);
        } catch (e) {
            if (e instanceof CustomError) {
                expect(e.message).toBe(`Oups!! Quelque chose s'est mal passé\n${PoiErrorValidator.ID_REQUIRED}`);
                expect(e.message).toEqual(`Oups!! Quelque chose s'est mal passé\n${PoiErrorValidator.ID_REQUIRED}`);
                expect(e.extensions.statusCodeClass).toBe(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCodeClass).toEqual(StatusCodeClass.CLIENT_ERROR);
                expect(e.extensions.statusCode).toBe(StatusCode.BAD_REQUEST);
                expect(e.extensions.statusCode).toEqual(StatusCode.BAD_REQUEST);
                expect(e.extensions.statusCodeMessage).toBe(StatusCodeMessage.BAD_REQUEST);
                expect(e.extensions.statusCodeMessage).toEqual(StatusCodeMessage.BAD_REQUEST);
            }
            
            expect(e).toBeDefined();
            expect(e).toStrictEqual(new CustomError(new BadRequestError(), PoiErrorValidator.ID_REQUIRED))
        }
    });
})
