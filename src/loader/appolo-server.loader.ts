import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { TagResolver } from "../resolver/tag.resolver";
import { CityResolver } from "../resolver/city.resolver";
import { PoiResolver } from "../resolver/poi.resolver";
import { TypeResolver } from "../resolver/type.resolver";
import { CustomError } from "../utils/error/CustomError.utils.error";
import { BadRequestError, InternalServerError } from "../utils/error/interfaces.utils.error";


export const startAppoloServer = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    resolvers: [
      CityResolver,
      TagResolver,
      TypeResolver,
      PoiResolver
    ],
  });

  const server = new ApolloServer({ 
    schema,
    formatError: (err) => {
      if (
        err.extensions.code === 'GRAPHQL_VALIDATION_FAILED' ||
        err.extensions.code === 'BAD_USER_INPUT' ||
        err.extensions.code === 'BAD_USER_INPUT' ||
        err.extensions.code === 'BAD_REQUEST'
      ) {
        throw new CustomError(new BadRequestError(), "La requête n'est pas dans le format attendu");
      } else if (
        err.extensions.code === 'INTERNAL_SERVER_ERROR'
      ) {
        throw new CustomError(new InternalServerError(), "La requête n'est pas dans le format attendu");

      } return err;
    },
  });

  // We don't use server.listen here because we want to avoid the error "listen EADDRINUSE: address already in use :::4000" when we will run the tests
  return server;
};
