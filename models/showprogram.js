'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShowProgram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ShowProgram.belongsTo(models.ShowProgramSupplier, { foreignKey: 'supplierId', as: 'supplier' });
    }
  }
  ShowProgram.init({
    picture: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    supplierId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ShowProgram',
  });
  return ShowProgram;
};