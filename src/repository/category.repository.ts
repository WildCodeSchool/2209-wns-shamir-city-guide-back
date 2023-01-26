import Category from "../entity/Category.entity";
import databaseConfig from "../config/typeorm";

export const CategoryRepository = databaseConfig
  .getRepository(Category)
  .extend({});
