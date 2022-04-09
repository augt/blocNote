const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Note extends Model {}

Note.init(
  {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "note",
  }
);

module.exports = Note;
