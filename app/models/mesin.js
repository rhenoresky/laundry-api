'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mesin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mesin.hasMany(models.Pencucian, {
        foreignKey: 'mesin_id',
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT'
      })
    }
  }
  Mesin.init({
    name: DataTypes.STRING
  }, {
    hooks: {
      afterCreate: async (mesin, options) => {
        await sequelize.models.AuditLog.create({
          table_name: 'Mesins',
          task: 'insert',
          description: `Proses insert dengan data ${JSON.stringify(mesin)}`
        })
      },
      afterDestroy: async (mesin, options) => {
        await sequelize.models.AuditLog.create({
          table_name: 'Mesins',
          task: 'Delete',
          description: `Proses delete dengan data ${JSON.stringify(mesin)}`
        })
      },
      afterUpdate: async (mesin, options) => {
        await sequelize.models.AuditLog.create({
          table_name: 'Mesins',
          task: 'Update',
          description: `Proses update dengan data ${JSON.stringify(mesin)}`
        })
      },
      afterFind: async (mesin, options) => {
        await sequelize.models.AuditLog.create({
          table_name: 'Mesins',
          task: 'Get',
          description: `Proses get dengan data ${JSON.stringify(mesin)}`
        })
      },
    },
    sequelize,
    modelName: 'Mesin',
  });
  return Mesin;
};