import PointOfInterest from "../entity/PointOfInterest.entity";
import databaseConfig from "../config/typeorm";

export const PointOfInterestRepository = databaseConfig.getRepository(PointOfInterest).extend({});