import { Sequelize } from "sequelize";

if (
  !process.env.DATABASE_NAME ||
  !process.env.DATABASE_USERNAME ||
  !process.env.DATABASE_PASSWORD ||
  !process.env.DATABASE_PORT ||
  !process.env.AIVEN_CLOUD_HOST
) {
  throw new Error("Missing database environment variables!");
}

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.AIVEN_CLOUD_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "mysql",
  }
);

export default sequelize;
