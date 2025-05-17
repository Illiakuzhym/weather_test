'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Subscriptions', 'frequency', {
      type: Sequelize.ENUM('hourly', 'daily'),
      allowNull: false,
      defaultValue: 'daily'
    });

    await queryInterface.addColumn('Subscriptions', 'confirmed', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });

    await queryInterface.addColumn('Subscriptions', 'token', {
      type: Sequelize.STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Subscriptions', 'frequency');
    await queryInterface.removeColumn('Subscriptions', 'confirmed');
    await queryInterface.removeColumn('Subscriptions', 'token');
  }
};
