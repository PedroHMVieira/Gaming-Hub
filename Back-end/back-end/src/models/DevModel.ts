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
  declare userId: number;
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Developers",
    tableName: "developers",
    timestamps: true,
  }
);

export default Developers;