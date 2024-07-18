'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Quest.belongsTo(models.Genre, { foreignKey: 'genreId', as: 'genre' });
      Quest.belongsTo(models.Difficulty, { foreignKey: 'difficultyId', as: 'difficulty' });
      Quest.belongsTo(models.Branch, { foreignKey: 'branchId', as: 'branch' });
    }
  }
  Quest.init({
    name: DataTypes.STRING,
    genreId: DataTypes.INTEGER,
    difficultyId: DataTypes.INTEGER,
    branchId: DataTypes.INTEGER,
    players_count: DataTypes.INTEGER,
    game_time: DataTypes.STRING,
    preview_image: DataTypes.STRING,
    background_image: DataTypes.STRING,
    additional_images: DataTypes.ARRAY(DataTypes.STRING),
    description: DataTypes.TEXT,
    rules: DataTypes.TEXT,
    safety: DataTypes.TEXT,
    additional_services: DataTypes.ARRAY(DataTypes.STRING),
    additional_players: DataTypes.INTEGER,
    price_per_additional_player: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Quest',
  });
  return Quest;
};