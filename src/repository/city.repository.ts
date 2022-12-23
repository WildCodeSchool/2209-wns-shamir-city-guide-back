import City from "../entity/City.entity";
import databaseConfig from "../config/typeorm";

export const CityRepository = databaseConfig.getRepository(City).extend({});