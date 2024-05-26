'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('other_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model:"users",
          key:'id'
        },
        allowNull:false
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull:false
      },
      zipcode: {
        type: Sequelize.INTEGER,
        allowNull:false,
        validate:{
          len:6
        }
      },
      country_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'countries',
          key:'id'
        }
      },
      street: {
        type: Sequelize.STRING,
        allowNull:false
      },
      city: {
        type: Sequelize.STRING,
        allowNull:false
      },
      state_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'states',
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt:{
        type:Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('other_details');
  }
};