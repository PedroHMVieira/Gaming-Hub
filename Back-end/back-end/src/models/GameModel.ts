import sequelize from "../config/database";
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToManyAddAssociationsMixin,
} from "sequelize";

import AssessmentModel from "./AssessmentModel";

class Game extends Model<
  InferAttributes<Game, { omit: "assessments" }>,
  InferCreationAttributes<Game, { omit: "assessments" }>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare description: string;
  declare userId: number;
  declare coverImage: CreationOptional<string | null>;
  declare assessments?: AssessmentModel[];

  declare addDevelopers: BelongsToManyAddAssociationsMixin<any, number>;
  declare addGenres: BelongsToManyAddAssociationsMixin<any, number>;
}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
    coverImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Game",
    tableName: "games",
    timestamps: true,
  }
);

export default Game;