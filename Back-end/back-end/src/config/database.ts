import { Sequelize } from "sequelize";

const isTest = process.env.NODE_ENV === "test";

const sequelize = new Sequelize(
  isTest ? "projetotec5_test" : "projetotec5",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default sequelize;
