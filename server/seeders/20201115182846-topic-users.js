
const topicUsers = require('./seedFiles/topicUsers');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('topic_users', topicUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('topic_users', null, {});
  },
};