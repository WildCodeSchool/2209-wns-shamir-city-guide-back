import { DataSource } from "typeorm";
import config from "..";
import { Environments } from "../../utils/constants.utils";
import Category from "../../entity/Category.entity";
import Circuit from "../../entity/Circuit.entity";
import City from "../../entity/City.entity";
import PointOfInterest from "../../entity/PointOfInterest.entity";
import Tag from "../../entity/Tag.entity";
import Type from "../../entity/Type.entity";

let letSynchronize: boolean = false;
if (config?.environment === Environments.TEST || config?.environment === Environments.DEVELOPMENT) letSynchronize = true;

let dropSchema: boolean = false;
if (config?.environment === Environments.TEST) dropSchema = true;

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
  dropSchema: dropSchema,
  synchronize: letSynchronize, 
});

export default databaseConfig;
