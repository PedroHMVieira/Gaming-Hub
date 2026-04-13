import GameModel from "./GameModel";
import DevModel from "./DevModel";
import GenreModel from "./GenreModel";
import AssessmentModel from "./AssessmentModel";
import UserModel from "./UserModel";

GameModel.belongsToMany(DevModel, {
  through: "game_developers",
  as: "developers",
  foreignKey: "gameId",
  otherKey: "developerId"
});

DevModel.belongsToMany(GameModel, {
  through: "game_developers",
  as: "games",
  foreignKey: "developerId",
  otherKey: "gameId"
});

GameModel.belongsToMany(GenreModel, {
  through: "game_genres",
  as: "genres",
  foreignKey: "gameId",
  otherKey: "genreId"
});

GenreModel.belongsToMany(GameModel, {
  through: "game_genres",
  as: "games",
  foreignKey: "genreId",
  otherKey: "gameId"
});

GameModel.hasMany(AssessmentModel, {
  foreignKey: "gameId",
  as: "assessments"
});

AssessmentModel.belongsTo(GameModel, {
  foreignKey: "gameId",
  as: "game"
});

UserModel.hasMany(AssessmentModel, {
  foreignKey: "userId",
  as: "myEvaluations"
});

AssessmentModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "user"
});

export { GameModel, DevModel, GenreModel, AssessmentModel, UserModel };