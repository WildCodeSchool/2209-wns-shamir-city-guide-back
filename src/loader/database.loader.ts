import databaseConfig from "../config/typeorm";
import config from "../config";
import { proud, wink } from "../utils/emoji.utils";

export class DatabaseLoader {
  public static openConnection = async () => {
    await databaseConfig.initialize();
    console.log(`Database ${config.database.name} is connected and is running on port ${config.database.port}  ${proud}${wink}`)
  };
}
