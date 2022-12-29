import { DataSource } from "typeorm";
import config from "..";
import Category from "../../entity/Category.entity";
import Circuit from "../../entity/Circuit.entity";
import City from "../../entity/City.entity";
import PointOfInterest from "../../entity/PointOfInterest.entity";
import Tag from "../../entity/Tag.entity";
import Type from "../../entity/Type.entity";

const databaseConfig = new DataSource({
  type: "postgres",
  host: config?.database?.host,
  port: Number(config?.database?.port),
  username: config?.database?.user,
  password: config?.database?.password!,
  database: config?.database?.name!,
  entities: [Category, Circuit, City, PointOfInterest, Tag, Type],
  subscribers: [],
  migrations: [],
  synchronize: true,
});

export default databaseConfig;
