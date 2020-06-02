'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: false
    },
    surname: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: false
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true
    }
  })
  /*
    Add altering commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    return queryInterface.createTable('users', { id: Sequelize.INTEGER });
  */
  ,

  down: (queryInterface, Sequelize) => queryInterface.dropTable('user'),
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

};
