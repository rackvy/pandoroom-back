'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.Quest, { foreignKey: 'questId', as: 'quest' });
    }
  }
  Booking.init({
    questId: DataTypes.INTEGER,
    cost: DataTypes.FLOAT,
    peopleCount: DataTypes.INTEGER,
    dateTime: DataTypes.DATE,
    animator: DataTypes.BOOLEAN,
    extraPeople: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};