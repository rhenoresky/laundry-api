'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('mesins', [
      {
        name: "Panasonic",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sharp",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Polytron",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
