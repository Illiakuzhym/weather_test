'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class Subscription extends Model {
    static associate(models) {
      // зв'язки якщо будуть
    }
  }

  Subscription.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Subscription',
    indexes: [
      {
        unique: true,
        fields: ['email', 'city']
      }
    ]
  });

  return Subscription;
};