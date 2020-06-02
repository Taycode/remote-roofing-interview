'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('task', {
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
    description: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: false
    },
    score: {
      allowNull: false,
      type: Sequelize.INTEGER,
      unique: false
    },
    status: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: false
    },
    userId: {
      allowNull: true,
      type: Sequelize.INTEGER,
      unique: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    projectId: {
      allowNull: true,
      type: Sequelize.INTEGER,
      unique: false,
      references: {
        model: 'project',
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('task'),
  /*
    Add reverting commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    return queryInterface.dropTable('users');
  */

};
