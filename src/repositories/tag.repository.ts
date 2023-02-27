import "reflect-metadata";
import Tag from "../entities/Tag.entity";
import databaseConfig from "../config/typeorm";

export const TagRepository = databaseConfig.getRepository(Tag).extend({
  async findByIconAndIfNotID(id: number, icon: string): Promise<Tag | null> {
    return this.createQueryBuilder("city")
        .where("icon = :icon", {icon})
        .andWhere("id != :id", {id})
        .getOne()
  }
});