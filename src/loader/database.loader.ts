import databaseConfig from "../config/typeorm";
import config from "../config";
import { emojiProud, emojiWink, emojiCool } from "../utils/emoji.utils";

export class DatabaseLoader {
  public static openConnection = async () => {
    await databaseConfig.initialize();
    console.log(`${emojiCool} Database ${config.database.name} is connected and is running on port ${config.database.port}  ${emojiProud}${emojiWink}`)
<<<<<<< HEAD
<<<<<<< HEAD
=======
    await databaseConfig.initialize();
    console.log(`Database ${config.database.name} is connected and is running on port ${config.database.port}`)
>>>>>>> f1b492dede9b29bf5a52645080d7b17aca169cb0
=======
>>>>>>> bc57edbcde6c356235cf14d05f2f445d0f57ee9f
  };
}
