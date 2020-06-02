'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('project', {
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
    body: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: false
    },
    status: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true
    },
    userId: {
      allowNull: true,
      type: Sequelize.INTEGER,
      unique: false,
      references: {
        model: 'user',
        key: 'id'
      }
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
