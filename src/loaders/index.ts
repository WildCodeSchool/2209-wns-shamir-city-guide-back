import { startAppoloServer } from "./appolo-server.loader";
import { DatabaseLoader } from "./database.loaders";

export default async function () {
  await DatabaseLoader.openConnection();

  await startAppoloServer();
}
