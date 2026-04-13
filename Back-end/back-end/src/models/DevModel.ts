import sequelize from "../config/database";
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

class Developers extends Model<
  InferAttributes<Developers>,
  InferCreationAttributes<Developers>
> {
  declare id: CreationOptional<number>;
  declare name: string;
}

Developers.init(
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
    modelName: "Developers",
    tableName: "developers",
  }
);

export default Developers;