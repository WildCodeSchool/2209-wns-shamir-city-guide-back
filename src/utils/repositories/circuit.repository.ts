import Circuit from "../../entities/Circuit.entity";
import databaseConfig from "../../config/typeorm";

export const CircuitRepository = databaseConfig.getRepository(Circuit).extend({});