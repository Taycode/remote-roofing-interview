'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {


    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('user', 'createdAt', {
          type: Sequelize.DataTypes.DATE
        }, {transaction: t}),
        queryInterface.addColumn('user', 'updatedAt', {
          type: Sequelize.DataTypes.DATE
        }, {transaction: t})
      ])
    })
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('user', 'createdAt',
          {transaction: t}),
        queryInterface.removeColumn('user', 'updatedAt',
          {transaction: t}),
      ])
    })
  }
};
