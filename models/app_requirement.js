"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class app_requirement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      app_requirement.belongsTo(models.app,{foreignKey:'app_id'})
    }
  }
  app_requirement.init(
    {
      app_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "apps",
          key: "id",
        },
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      os_version: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      memory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      storage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      processor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      graphics: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      addition_notes: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "app_requirement",
      paranoid: true,
    }
  );
  return app_requirement;
};
