import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../config/database";

class Genres extends Model<
  InferAttributes<Genres>,
  InferCreationAttributes<Genres>
> {
  declare id: CreationOptional<number>;
  declare name: string;
}

Genres.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Genre",
    tableName: "genres",
  }
);

export default Genres;