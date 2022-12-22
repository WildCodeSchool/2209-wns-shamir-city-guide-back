import { startAppoloServer } from "./appolo-server.loader";
import { DatabaseLoader } from "./database.loader";

export default async function () {
  await DatabaseLoader.openConnection();
  
  await startAppoloServer();
}
