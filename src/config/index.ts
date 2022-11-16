import dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/.env' });

export default {
  server_port: process.env.SERVER_PORT,
  secret: process.env.SERVER_SECRET,
  database: {
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host_dev: process.env.DB_HOST_DEV,
  },
}