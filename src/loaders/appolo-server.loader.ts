import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { RoleResolver } from "../resolvers/role.resolver";
import { UserResolver } from "../resolvers/user.resolver";
import { AuthenticationResolver } from "../resolvers/authentication.resolver";
import { TagResolver } from "../resolvers/tag.resolver";
import { CityResolver } from "../resolvers/city.resolver";
import { PoiResolver } from "../resolvers/poi.resolver";
import { TypeResolver } from "../resolvers/type.resolver";
import { CategoryResolver } from "../resolvers/category.resolver";
import { CicuitResolver } from "../resolvers/circuit.resolver";
import { CustomError } from "../utils/errors/CustomError.utils.error";
import { BadRequestError, InternalServerError, UnauthorizedError } from "../utils/errors/interfaces.utils.error";
import * as authenticationService from "../services/authentication.service";
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
      CicuitResolver
    ],
    authChecker: async ({ context }, requiredRoles) => { 
      let isAuthentified = false;
      const userId =  context?.user?.id ? context.user.id : null; 
      // console.log("Context:", context, " | Required roles:", requiredRoles);
      // console.log("UserId:", userId);
      // console.log("User roles:", context.user.roles);
      
      
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
      console.log("Request Error : ", err), Object.keys(err);
          
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
