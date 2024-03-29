import databaseConfig from "../config/typeorm";
import config from "../config";
import { emojiWink, emojiPg } from "../utils/emoji.utils";
import { emojiWarning, emojiExclamation } from "../utils/emoji.utils";
import { loadData } from "../tests/database/index.test.database";
import { Environments } from "../utils/constants.utils";

export class DatabaseLoader {
  public static openConnection = async () => {
    try {
      await databaseConfig.initialize();
      console.log(
        `${emojiPg} Database ${config?.database?.name} is connected and is running on port ${config?.database?.port} ${emojiWink}`
      );
    } catch (e) {
      console.log(
        `${emojiWarning}${emojiExclamation} Error during the database instanciation: `,
        e
      ); 
    }

    //If our actual environment is 'test' we load data in the tables
    // if (
    //   config?.environment === Environments.TEST ||
    //   config?.environment === Environments.DEVELOPMENT
    // ) {
    //   try {
    //     await loadData();
    //   } catch (e) {
    //     console.log(
    //       `${emojiWarning}${emojiExclamation} Error during the data loading: `,
    //       e
    //     );
    //   }
    // }
  };
}
