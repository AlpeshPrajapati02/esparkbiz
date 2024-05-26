"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("app_requirements", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      app_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "apps",
          key: "id",
        },
      },
      platform: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      os_version: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      memory: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      storage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      processor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      graphics: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      addition_notes: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("app_requirements");
  },
};
