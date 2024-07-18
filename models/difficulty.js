'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Difficulty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Difficulty.hasMany(models.Quest, { foreignKey: 'difficultyId', as: 'quests' });
    }
  }
  Difficulty.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Difficulty',
  });
  return Difficulty;
};