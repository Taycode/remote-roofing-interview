'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'project',
      'project_status_key'
    )
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeConstraint(
      'project',
      'project_status_key'
    )
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
