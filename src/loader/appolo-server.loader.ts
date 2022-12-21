import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { TagResolver } from "../graphql/resolver/tag.resolver";
import { rocket } from "../utils/emoji.utils";

export const startAppoloServer = async (): Promise<any> => {
  const schema = await buildSchema({
    resolvers: [TagResolver],
  });

  const server = new ApolloServer({ schema });

  server.listen().then(({ url }) => {
    console.log(`${rocket}  Appolo server ready at ${url}`);
  });
};
