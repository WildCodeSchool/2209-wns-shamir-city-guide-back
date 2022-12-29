import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { TagResolver } from "../graphql/resolver/tag.resolver";
import { CityResolver } from "../graphql/resolver/city.resolver";
import { emojiRocket } from "../utils/emoji.utils";

export const startAppoloServer = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    resolvers: [
      CityResolver,
      TagResolver
    ],
  });

  const server = new ApolloServer({ 
    schema 
  });

  server.listen().then(({ url }) => {
    console.log(`${emojiRocket}  Appolo server ready at ${url}`);
  });

  return server;
};
