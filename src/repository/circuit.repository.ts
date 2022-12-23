import Circuit from "../entity/Circuit.entity";
import databaseConfig from "../config/typeorm";

export const CircuitRepository = databaseConfig.getRepository(Circuit).extend({});