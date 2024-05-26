"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class app_file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      app_file.belongsTo(models.app,{foreignKey:'app_Id'})
    }
  }
  app_file.init(
    {
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      platform: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      version: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      filesize: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      release_note: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
      },
      app_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "apps",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "app_file",
      paranoid: true,
    }
  );
  return app_file;
};
