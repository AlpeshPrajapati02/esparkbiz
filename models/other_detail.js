'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class other_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      other_detail.belongsTo(models.developer,{foreignKey:"user_id"})
      other_detail.belongsTo(models.country,{foreignKey:'country_id'})
      other_detail.belongsTo(models.state,{foreignKey:'state_id'})
    }
  }
  other_detail.init({
    user_id: {
      type: DataTypes.INTEGER,
      references:{
        model:"users",
        key:'id'
      },
      allowNull:false
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull:false
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate:{
        len:6
      }
    },
    country_id: {
      type: DataTypes.INTEGER,
      references:{
        model:'countries',
        key:'id'
      }
    },
    street: {
      type: DataTypes.STRING,
      allowNull:false
    },
    city: {
      type: DataTypes.STRING,
      allowNull:false
    },
    state_id: {
      type: DataTypes.INTEGER,
      references:{
        model:'states',
        key:'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt:{
      type:DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'other_detail',
    paranoid:true
  });
  return other_detail;
};