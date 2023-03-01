import Type from "../entities/Type.entity";
import databaseConfig from "../config/typeorm";

export const TypeRepository = databaseConfig.getRepository(Type).extend({
  async findByLogoAndIfNotID(id: number, logo: string): Promise<Type | null> {
    return this.createQueryBuilder("type")
        .where("logo = :logo", {logo})
        .andWhere("id != :id", {id})
        .getOne()
  }
});