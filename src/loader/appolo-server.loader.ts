import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { TagResolver } from "../resolver/tag.resolver";
import { CityResolver } from "../resolver/city.resolver";
import { PoiResolver } from "../resolver/poi.resolver";

export const startAppoloServer = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    resolvers: [
      CityResolver,
      TagResolver,
      PoiResolver
    ],
  });

  const server = new ApolloServer({ 
    schema 
  });

  // We don't use server.listen here because we want to avoid the error "listen EADDRINUSE: address already in use :::4000" when we will run the tests
  return server;
};
