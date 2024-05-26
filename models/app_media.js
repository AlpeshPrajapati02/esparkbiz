"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class app_media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      app_media.belongsTo(models.app,{foreignKey:'app_id'})
    }
  }
  app_media.init(
    {
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "app_media",
      paranoid: true,
    }
  );
  return app_media;
};
