'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class state extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      state.belongsTo(models.country,{foreignKey:'country_id'})
      state.hasMany(models.other_detail,{foreignKey:'state_id'})
    }
  }
  state.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    country_id: {
      type: DataTypes.INTEGER,
      references:{
        model:'countries',
        key:'id'
      }
    },
  }, {
    sequelize,
    modelName: 'state',
  });
  return state;
};