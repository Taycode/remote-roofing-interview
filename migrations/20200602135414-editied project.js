'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {


    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('project', 'createdAt', {
          type: Sequelize.DataTypes.DATE
        }, {transaction: t}),
        queryInterface.addColumn('project', 'updatedAt', {
          type: Sequelize.DataTypes.DATE
        }, {transaction: t})
      ])
    })
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('project', 'createdAt',
          {transaction: t}),
        queryInterface.removeColumn('project', 'updatedAt',
          {transaction: t}),
      ])
    })
  }
};
