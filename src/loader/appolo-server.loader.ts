import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { RoleResolver } from "../resolver/role.resolver";
import { UserResolver } from "../resolver/user.resolver";
import { AuthenticationResolver } from "../resolver/authentication.resolver";
import { TagResolver } from "../resolver/tag.resolver";
import { CityResolver } from "../resolver/city.resolver";
import { PoiResolver } from "../resolver/poi.resolver";
import { TypeResolver } from "../resolver/type.resolver";
import { CategoryResolver } from "../resolver/category.resolver";
import { CustomError } from "../utils/error/CustomError.utils.error";
import { BadRequestError, InternalServerError, UnauthorizedError } from "../utils/error/interfaces.utils.error";
import * as authenticationService from "../service/authentication.service";
import configuration from "../config";


export const startAppoloServer = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    resolvers: [
      RoleResolver,
      UserResolver,
      AuthenticationResolver,
      CityResolver,
      TagResolver,
      TypeResolver,
      PoiResolver,
      CategoryResolver,
    ],
    authChecker: async ({ context }, requiredRoles) => { 
      console.log(context);
      
      let isAuthentified = false;
      const userId =  context?.user?.id ? context.user.id : null; 
      
      if (userId && await authenticationService.hasRole(userId, requiredRoles)) {  
        isAuthentified = true;
      }

      if (!isAuthentified && requiredRoles.length > 0) {
        throw new CustomError(
          new UnauthorizedError(), 
          "Vous devez être authentifié pour accéder à cette ressource"
        );
      }
        
      return isAuthentified;
    },
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
        return new CustomError(new BadRequestError(), "La requête n'est pas dans le format attendu\n" + err.message);
      } else if (
        err.extensions.code === 'INTERNAL_SERVER_ERROR'
      ) {
        return new CustomError(new InternalServerError(), "Erreur interne au serveur");
      } return err;
    },
    context: ({ req }) => {      
      if (
        req?.headers.authorization === undefined ||
        configuration?.jwt_secret_key === undefined
      ) {
        return {};
      } else {
        try {          
          const token = req.headers.authorization.split("Bearer ")[1];
          const userPayload = authenticationService.verifyToken(token);
          
          return { user: userPayload };
        } catch (e) {
          return {};
        }
      }
    },
  });

  // We don't use server.listen here because we want to avoid the error "listen EADDRINUSE: address already in use :::4000" when we will run the tests
  return server;
};
