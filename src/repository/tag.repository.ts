import Tag from "../entity/Tag.entity";
import databaseConfig from "../config/typeorm";

export const TagRepository = databaseConfig.getRepository(Tag).extend({
    async findByIdAndByName(id: number, name: string) {
        return this.createQueryBuilder("tag")
            .where("tag.id = :id", { id })
            .andWhere("tag.name = :name", { name })
            .getOne()
    },
})