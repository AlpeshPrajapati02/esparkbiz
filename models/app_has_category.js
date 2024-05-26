"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class app_has_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      app_has_category.belongsTo(models.app,{foreignKey:'app_id'})
      app_has_category.belongsTo(models.category,{foreignKey:'category_id'})
    }
  }
  app_has_category.init(
    {
      app_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "apps",
          key: "id",
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "app_has_category",
      paranoid: true,
    }
  );
  return app_has_category;
};
