const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "blocNoteDB",
  "Administrateur",
  "Pass2022+test",
  {
    dialect: "sqlite",
    host: "./config/dbFile.sqlite",
  }
);

module.exports = sequelize;
