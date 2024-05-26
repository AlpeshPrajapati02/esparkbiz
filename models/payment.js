'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      payment.belongsTo(models.user,{foreignKey:'user_id'})
      payment.belongsTo(models.app,{foreignKey:'app_id'})
    }
  }
  payment.init({
    user_id: {
      type: DataTypes.INTEGER,
      references:{
        model:'users',
        key:'id'
      },
      allowNull:false
    },
    payment: {
      type: DataTypes.FLOAT,
      allowNull:false
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull:false
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
    modelName: 'payment',
    paranoid:true
  });
  return payment;
};