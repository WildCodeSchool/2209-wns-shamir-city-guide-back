import Circuit from "../entities/Circuit.entity";
import databaseConfig from "../config/typeorm";

export const CircuitRepository = databaseConfig.getRepository(Circuit).extend({
    async findAllCircuitsByVille(villeId :number) : Promise <Circuit | null> {
        return this.createQueryBuilder("circuit")
            .where("city=: city", {villeId})
    }

});