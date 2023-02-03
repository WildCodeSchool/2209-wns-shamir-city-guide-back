import Type from "../entities/Type.entity";
import databaseConfig from "../config/typeorm";

export const TypeRepository = databaseConfig.getRepository(Type).extend({});