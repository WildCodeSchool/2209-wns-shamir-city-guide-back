import { DataSource } from "typeorm";
import config from "..";
import { Environments } from "../../utils/constants.utils";
import Role from "../../entities/Role.entity";
import User from "../../entities/User.entity";
import Category from "../../entities/Category.entity";
import Circuit from "../../entities/Circuit.entity";
import City from "../../entities/City.entity";
import PointOfInterest from "../../entities/PointOfInterest.entity";
import Tag from "../../entities/Tag.entity";
import Type from "../../entities/Type.entity";

let letSynchronize: boolean = false;
if (
  config?.environment === Environments.TEST ||
  config?.environment === Environments.DEVELOPMENT
)
  letSynchronize = true;

let dropSchema: boolean = false;
// if (
//   config?.environment === Environments.TEST ||
//   config?.environment === Environments.DEVELOPMENT
// )
// dropSchema = true;

const databaseConfig = new DataSource({
  type: "postgres",
  host: config?.database?.host, 
  port: Number(config?.database?.port), 
  username: config?.database?.user,
  password: config?.database?.password!,
  database: config?.database?.name!,
  entities: [Role, User, Category, Circuit, City, PointOfInterest, Tag, Type],
  subscribers: [],
  migrations: [],
  dropSchema: dropSchema,
  synchronize: letSynchronize,
});

export default databaseConfig;
