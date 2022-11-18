import databaseConfig from "../config/typeorm";
import config from "../config";

export class DatabaseLoader {
  public static openConnection = async () => {
    console.log("DB PASSWORD =>", config.database.password);
    databaseConfig
      .initialize()
      .then(() => {
        console.log(
          `Database ${config.database.name} is connected and is running on port ${config.database.port}`
        );
      })
      .catch((err) => {
        console.error(err);
        throw new Error("Unable to connect to database");
      });
  };
}
