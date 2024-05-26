'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('developers', {
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
      name: {
        type: Sequelize.STRING,
        unique:true,
        allowNull:false
      },
      description: {
        type: Sequelize.STRING,
        allowNull:false
      },
      website:{
        type:Sequelize.STRING,
      },
      number_of_apps:{
        type:Sequelize.STRING,
        allowNull:false
      },
      earning_money:{
        type: Sequelize.BOOLEAN,
        allowNull:false
      },
      earning_methods:{
        type:Sequelize.JSON,
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
    await queryInterface.dropTable('developers');
  }
};