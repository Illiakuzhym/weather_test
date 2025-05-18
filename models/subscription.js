'use strict';
const { Model } = require('sequelize');
const { v4: uuid } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {}

  Subscription.init(
    {
      email: { type: DataTypes.STRING, allowNull: false },
      city:  { type: DataTypes.STRING, allowNull: false },
      frequency: {
        type: DataTypes.ENUM('hourly', 'daily'),
        allowNull: false
      },
      confirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
      token: { type: DataTypes.STRING, defaultValue: uuid }
    },
    {
      sequelize,
      modelName: 'Subscription',
      indexes: [{ unique: true, fields: ['email', 'city'] }]
    }
  );

  return Subscription;
};
