'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Quests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      genreId: {
        type: Sequelize.INTEGER
      },
      difficultyId: {
        type: Sequelize.INTEGER
      },
      branchId: {
        type: Sequelize.INTEGER
      },
      players_count: {
        type: Sequelize.INTEGER
      },
      game_time: {
        type: Sequelize.STRING
      },
      preview_image: {
        type: Sequelize.STRING
      },
      background_image: {
        type: Sequelize.STRING
      },
      additional_images: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      description: {
        type: Sequelize.TEXT
      },
      rules: {
        type: Sequelize.TEXT
      },
      safety: {
        type: Sequelize.TEXT
      },
      additional_services: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      additional_players: {
        type: Sequelize.INTEGER
      },
      price_per_additional_player: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Quests');
  }
};