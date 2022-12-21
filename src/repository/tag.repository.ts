import Tag from "../entity/Tag.entity";
import databaseConfig from "../config/typeorm";

export const TagRepository = databaseConfig.getRepository(Tag)
    .extend({
        async findByIdAndByName(id: number, name: string): Promise<Tag | null> {
            return this.createQueryBuilder("tag")
                .where("id = :id", { id })
                .andWhere("name = :name", { name })
                .getOne()
        },
        async findByNameAndByIcon(name: string, icon: string): Promise<Tag | null> {
            return this.createQueryBuilder("tag")
                .where("name = :name", { name })
                .andWhere("icon = :icon", { icon })
                .getOne()
        }
});