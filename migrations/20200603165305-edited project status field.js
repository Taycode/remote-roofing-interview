'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'project',
      'status', {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false
      }
    )
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.changeColumn('project', 'status')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
