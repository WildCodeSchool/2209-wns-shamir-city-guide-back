import "reflect-metadata";
import Tag from "../../entities/Tag.entity";
import databaseConfig from "../../config/typeorm";

export const TagRepository = databaseConfig.getRepository(Tag).extend({});