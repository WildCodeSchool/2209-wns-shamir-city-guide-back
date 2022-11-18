import { DataSource } from "typeorm";
import config from "..";
import Tag from "../../dao/entity/Tag.entity";

const databaseConfig = new DataSource({
  type: "postgres",
  host: config.database.host_dev,
  port: Number(config.database.port),
  username: config.database.user,
  password: config.database.password!,
  database: config.database.name!,
  logging: true,
  entities: [Tag],
  subscribers: [],
  migrations: [],
  synchronize: true,
});

export default databaseConfig;
