import City from "../entities/City.entity";
import databaseConfig from "../config/typeorm";

export const CityRepository = databaseConfig.getRepository(City)
    .extend({
        async findByLatitudeAndByLongitude(latitude: string, longitude: string): Promise<City | null> {
            return this.createQueryBuilder("city")
                .where("latitude = :latitude", {latitude})
                .andWhere("longitude = :longitude", {longitude})
                .getOne()
        },
        async findByNameAndIfNotID(id: number, name: string): Promise<City | null> {
            return this.createQueryBuilder("city")
                .where("name = :name", {name})
                .andWhere("id != :id", {id})
                .getOne()
        },
        async findByLatitudeAndByLongitudeIfNotID(id: number, latitude: string, longitude: string): Promise<City | null> {
            return this.createQueryBuilder("city")
                .where("latitude = :latitude AND longitude = :longitude", {latitude, longitude})
                .andWhere("id != :id", {id})
                .getOne()
        },
        async findAllCitiesByUsername(username: string): Promise<City[] | null> {
            return this.createQueryBuilder("city")
            .innerJoinAndSelect("city.user", "user")
            .where("user.username = :username", { username: username })
            .getMany();
        }
    });