import Category from "../../entities/Category.entity";
import databaseConfig from "../../config/typeorm";

export const CategoryRepository = databaseConfig
  .getRepository(Category)
  .extend({});
