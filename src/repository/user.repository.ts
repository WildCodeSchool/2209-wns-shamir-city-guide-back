import User from "../entity/User.entity";
import databaseConfig from "../config/typeorm";

export const UserRepository = databaseConfig.getRepository(User).extend({});