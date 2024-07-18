'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Branch.hasMany(models.Quest, { foreignKey: 'branchId', as: 'quests' });
    }
  }
  Branch.init({
    name: DataTypes.STRING,
    geo_coordinates: DataTypes.STRING,
    phone: DataTypes.STRING,
    whatsapp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Branch',
  });
  return Branch;
};