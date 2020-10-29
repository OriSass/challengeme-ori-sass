
const topics = require('./seedFiles/topics');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('topics', topics, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('topics', null, {});
  },
};