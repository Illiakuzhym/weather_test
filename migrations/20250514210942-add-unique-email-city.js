'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Subscriptions', {
      fields: ['email', 'city'],
      type: 'unique',
      name: 'unique_email_city'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Subscriptions', 'unique_email_city');
  }
};
