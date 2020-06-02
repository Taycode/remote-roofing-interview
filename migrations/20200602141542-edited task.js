'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {


    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('task', 'createdAt', {
          type: Sequelize.DataTypes.DATE
        }, {transaction: t}),
        queryInterface.addColumn('task', 'updatedAt', {
          type: Sequelize.DataTypes.DATE
        }, {transaction: t})
      ])
    })
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('task', 'createdAt',
          {transaction: t}),
        queryInterface.removeColumn('task', 'updatedAt',
          {transaction: t}),
      ])
    })
  }
};
