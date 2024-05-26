'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class developer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      developer.belongsTo(models.user,{foreignKey:'user_id'})
      developer.hasMany(models.other_detail,{foreignKey:"user_id"})
    }
  }
  developer.init({
    user_id: {
      type: DataTypes.INTEGER,
      references:{
        model:"users",
        key:'id'
      },
      allowNull:false
    },
    name: {
      type: DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false
    },
    website:{
      type:DataTypes.STRING,
    },
    number_of_apps:{
      type:DataTypes.STRING,
      allowNull:false
    },
    earning_money:{
      type: DataTypes.BOOLEAN,
      allowNull:false
    },
    earning_methods:{
      type:DataTypes.JSON,
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
    modelName: 'developer',
    paranoid:true
  });
  return developer;
};