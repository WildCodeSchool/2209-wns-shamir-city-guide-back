import Role from "../entities/Role.entity";
import databaseConfig from "../config/typeorm";

export const RoleRepository = databaseConfig.getRepository(Role).extend({});