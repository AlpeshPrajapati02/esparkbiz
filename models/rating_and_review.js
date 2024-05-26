"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rating_and_review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     rating_and_review.belongsTo(models.user,{foreignKey:'user_id'})
     rating_and_review.belongsTo(models.app,{foreignKey:'app_id'})
    }
  }
  rating_and_review.init(
    {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
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
      modelName: "rating_and_review",
      paranoid: true,
    }
  );
  return rating_and_review;
};
