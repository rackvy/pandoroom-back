'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cake extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cake.belongsTo(models.CakeSupplier, { foreignKey: 'supplierId', as: 'supplier' });
    }
  }
  Cake.init({
    picture: DataTypes.STRING,
    name: DataTypes.STRING,
    priceWeight: DataTypes.STRING,
    supplierId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cake',
  });
  return Cake;
};