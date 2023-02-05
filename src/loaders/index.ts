import { startAppoloServer } from "./appolo-server.loader";
import { DatabaseLoader } from "./database.loader";
import { emojiRocket } from "../utils/emoji.utils";


export default async function () {
  await DatabaseLoader.openConnection();
  const server = await startAppoloServer();
  
  server.listen().then(({ url }) => {
    console.log(`${emojiRocket} Appolo server ready at ${url} ${emojiRocket}`);
  });
} 
