import Circuit from "../entities/Circuit.entity";
import databaseConfig from "../config/typeorm";

export const CircuitRepository = databaseConfig.getRepository(Circuit).extend({
  async findAllCircuitsByCityName(name: string): Promise<Circuit[] | null> {
    return this.createQueryBuilder("circuit")
    .innerJoinAndSelect("circuit.city", "city")
    .where("city.name = :name", { name: name })
    .getMany();
}
});