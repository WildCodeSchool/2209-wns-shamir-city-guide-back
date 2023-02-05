import User from "../entities/User.entity";
import databaseConfig from "../config/typeorm";

export const UserRepository = databaseConfig.getRepository(User).extend({});