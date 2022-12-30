import dotenv from 'dotenv';
dotenv.config();
import { docker, laptop } from '../utils/emoji.utils';

const environnement =  process.env.NODE_ENV;
console.log(`${docker} Actual environment: ${environnement} ${laptop}`);

type Configuration = {
  secret: string | undefined
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
  secret: process.env.SERVER_SECRET,
  database: {
    port: process.env.DB_PORT,
    name: process.env.DB_NAME_DEV,
    user: process.env.DB_USER_DEV,
    password: process.env.DB_PASSWORD_DEV,
    host: process.env.DB_HOST_DEV,
  },
}

const testConfiguration: Configuration = {
  secret: process.env.SERVER_SECRET,
  database: {
    port: process.env.DB_PORT,
    name: process.env.DB_NAME_TEST,
    user: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
    host: process.env.DB_HOST_TEST,
  },
}

let configuration: Configuration | undefined;

if (environnement === 'development') configuration = developmentConfiguration;
else if (environnement === 'test') configuration = testConfiguration;

export default configuration;

