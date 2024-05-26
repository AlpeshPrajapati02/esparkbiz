"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class app extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      app.belongsTo(models.user,{foreignKey:'developer_id'})
      app.hasMany(models.app_requirement,{foreignKey:'app_id'})
      app.hasMany(models.app_media,{foreignKey:'app_id'})
      app.hasMany(models.app_has_category,{foreignKey:'app_id'})
      app.hasMany(models.app_file,{foreignKey:'app_id'})
      app.hasMany(models.app_has_category,{foreignKey:'app_id'})
      app.hasMany(models.download,{foreignKey:'app_id'})
      app.hasMany(models.payment,{foreignKey:'app_id'})
    }
  }
  app.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      release_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      version: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "1.0.0",
      },
      download_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      developer_id: {
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
      modelName: "app",
      paranoid: true,
    }
  );
  return app;
};
