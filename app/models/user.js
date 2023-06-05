'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Pencucian, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks: {
      afterCreate: async (user, options) => {
        await sequelize.models.AuditLog.create({
          table_name: 'Users',
          task: 'insert',
          description: `Proses insert dengan data ${JSON.stringify(user)}`
        })
      },
      afterDestroy: async (user, options) => {
        await sequelize.models.AuditLog.create({
          table_name: 'Users',
          task: 'Delete',
          description: `Proses delete dengan data ${JSON.stringify(user)}`
        })
      },
      afterUpdate: async (user, options) => {
        await sequelize.models.AuditLog.create({
          table_name: 'Users',
          task: 'Update',
          description: `Proses update dengan data ${JSON.stringify(user)}`
        })
      },
      afterFind: async (user, options) => {
        await sequelize.models.AuditLog.create({
          table_name: 'Users',
          task: 'Get',
          description: `Proses get dengan data ${JSON.stringify(user)}`
        })
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};