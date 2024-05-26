'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      country.hasMany(models.state,{foreignKey:'country_id'})
      country.hasMany(models.other_detail,{foreignKey:'country_id'})
    }
  }
  country.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'country',
  });
  return country;
};