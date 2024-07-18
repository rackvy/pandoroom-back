'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CakeSupplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CakeSupplier.init({
    name: DataTypes.STRING,
    contact: DataTypes.STRING,
    phone: DataTypes.STRING,
    whatsapp: DataTypes.STRING,
    tg: DataTypes.STRING,
    email: DataTypes.STRING,
    companyDetails: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'CakeSupplier',
  });
  return CakeSupplier;
};