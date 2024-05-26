"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.belongsTo(models.role,{foreignKey:'role_id'})
      user.hasMany(models.app,{foreignKey:'developer_id'})
      user.hasMany(models.download,{foreignKey:'user_id'})
      user.hasMany(models.profile,{foreignKey:'user_id'})
      user.hasMany(models.rating_and_review,{foreignKey:'user_id'})
      user.hasMany(models.developer,{foreignKey:'user_id'})
      user.hasMany(models.payment,{foreignKey:'user_id'})
    }
  }
  user.init(
    {
      fname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "user",
      paranoid: true,
    }
  );
  return user;
};
