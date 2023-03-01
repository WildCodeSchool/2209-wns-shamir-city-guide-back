import Category from "../entities/Category.entity";
import databaseConfig from "../config/typeorm";

export const CategoryRepository = databaseConfig
  .getRepository(Category)
  .extend({
    async findByIconAndIfNotID(id: number, icon: string): Promise<Category | null> {
      return this.createQueryBuilder("category")
          .where("icon = :icon", {icon})
          .andWhere("id != :id", {id})
          .getOne()
    }
  });
