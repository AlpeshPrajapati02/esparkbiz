"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class download extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      download.belongsTo(models.app,{foreignKey:'app_id'})
      download.belongsTo(models.user,{foreignKey:'user_id'})
    }
  }
  download.init(
    {
      app_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "apps",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "download",
      paranoid: true,
    }
  );
  return download;
};
