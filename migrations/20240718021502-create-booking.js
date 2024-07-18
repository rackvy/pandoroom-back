'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      questId: {
        type: Sequelize.INTEGER
      },
      cost: {
        type: Sequelize.FLOAT
      },
      peopleCount: {
        type: Sequelize.INTEGER
      },
      dateTime: {
        type: Sequelize.DATE
      },
      animator: {
        type: Sequelize.BOOLEAN
      },
      extraPeople: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};