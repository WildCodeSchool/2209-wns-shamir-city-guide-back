import PointOfInterest from "../entities/PointOfInterest.entity";
import databaseConfig from "../config/typeorm";

export const PoiRepository = databaseConfig.getRepository(PointOfInterest).extend({
    async findByLatitudeAndByLongitude(latitude: string, longitude: string): Promise<PointOfInterest | null> {
        return this.createQueryBuilder("poi")
            .where("latitude = :latitude", {latitude})
            .andWhere("longitude = :longitude", {longitude})
            .getOne()
    },
    async findByNameAndIfNotID(id: number, name: string): Promise<PointOfInterest | null> {
        return this.createQueryBuilder("poi")
            .where("name = :name", {name})
            .andWhere("id != :id", {id})
            .getOne()
    },
    async findByLatitudeAndByLongitudeIfNotID(id: number, latitude: string, longitude: string): Promise<PointOfInterest | null> {
        return this.createQueryBuilder("poi")
            .where("latitude = :latitude AND longitude = :longitude", {latitude, longitude})
            .andWhere("id != :id", {id})
            .getOne()
    },
    async findAllPoisByCity(cityId: number): Promise<PointOfInterest[] | null> {
        return this.createQueryBuilder("poi")
        .innerJoinAndSelect("poi.city", "city")
        .where("city.id = :id", { id: cityId })
        .getMany();
    }
});