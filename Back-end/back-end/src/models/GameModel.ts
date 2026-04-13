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
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Game",
    tableName: "games",
  }
);

export default Game;