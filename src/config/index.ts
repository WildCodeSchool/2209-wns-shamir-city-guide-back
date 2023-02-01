import dotenv from 'dotenv';
dotenv.config();
import { emojiDocker, emojiLaptop } from '../utils/emoji.utils';

const environment =  process.env.NODE_ENV;
console.log(`${emojiDocker} Actual environment: ${environment} ${emojiLaptop}`);

type Configuration = {
  environment: string | undefined
  jwt_secret_key: string | undefined
  database: Database | undefined
}

type Database = {
  port: string | undefined
  name: string | undefined
  user: string | undefined
  password: string | undefined
  host: string | undefined
}

const developmentConfiguration: Configuration = {
  environment:  process.env.NODE_ENV,
  jwt_secret_key: process.env.SERVER_JWT_SECRET_KEY,
  database: {
    port: process.env.DB_PORT,
    name: process.env.DB_NAME_DEV,
    user: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    host: process.env.DB_HOST_DEV,
  },
}

const testConfiguration: Configuration = {
  environment: process.env.NODE_ENV,
  jwt_secret_key: process.env.SERVER_JWT_SECRET_KEY,
  database: {
    port: process.env.DB_PORT,
    name: process.env.DB_NAME_TEST,
    user: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
    host: process.env.DB_HOST_TEST,
  },
}

let configuration: Configuration | undefined;

if (environment === 'development') configuration = developmentConfiguration;
else if (environment === 'test') configuration = testConfiguration;

export default configuration;

