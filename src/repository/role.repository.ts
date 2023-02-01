import Role from "../entity/Role.entity";
import databaseConfig from "../config/typeorm";

export const RoleRepository = databaseConfig.getRepository(Role).extend({});