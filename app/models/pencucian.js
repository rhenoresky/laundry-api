'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pencucian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pencucian.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      })
      Pencucian.belongsTo(models.Mesin, {
        foreignKey: 'mesin_id',
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      })
    }
  }
  Pencucian.init({
    kode: DataTypes.STRING,
    berat: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    mesin_id: DataTypes.INTEGER
  }, {
    hooks: {
      afterCreate: async (pencucian, options) => {
        await sequelize.models.AuditLog.create({
          table_name: 'Pencucians',
          task: 'insert',
          description: `Proses insert dengan data ${JSON.stringify(pencucian)}`
        })
      },
      afterDestroy: async (pencucian, options) => {
        await sequelize.models.AuditLog.create({
          table_name: 'Pencucians',
          task: 'Delete',
          description: `Proses delete dengan data ${JSON.stringify(pencucian)}`
        })
      },
      afterUpdate: async (pencucian, options) => {
        await sequelize.models.AuditLog.create({
          table_name: 'Pencucians',
          task: 'Update',
          description: `Proses update dengan data ${JSON.stringify(pencucian)}`
        })
      },
      afterFind: async (pencucian, options) => {
        await sequelize.models.AuditLog.create({
          table_name: 'Pencucians',
          task: 'Get',
          description: `Proses get dengan data ${JSON.stringify(pencucian)}`
        })
      },
    },
    sequelize,
    modelName: 'Pencucian',
  });
  return Pencucian;
};