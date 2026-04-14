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
  // Adicionado para controle de propriedade
  declare userId: number;
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
    // Chave estrangeira para o usuário criador
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
    modelName: "Genre",
    tableName: "genres",
    timestamps: true, // Útil para ordenar os gêneros criados recentemente
  }
);

export default Genres;