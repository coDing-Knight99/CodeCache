import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve('./.env') });

console.log({
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_PORT: process.env.DATABASE_PORT,
  AIVEN_CLOUD_HOST: process.env.AIVEN_CLOUD_HOST,
});

console.log('Environment variables loaded.');
