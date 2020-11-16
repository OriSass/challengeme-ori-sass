'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: "TopicUser",
        foreignKey: "topic_id",
      });
    }
  };
  Topic.init({
    name: DataTypes.STRING,
    demandCounter: DataTypes.INTEGER,
    category: DataTypes.STRING,
    authorized: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: "topics",
    modelName: "Topic"
  });
  return Topic;
};