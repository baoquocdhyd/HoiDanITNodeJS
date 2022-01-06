'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Bảo',
      lastName: 'Quốc',
      password: '12345',
      email: 'baoquocdhyd@yahoo.com',
      address: 'W4_0702, chung cư Sunrise City, 25 Nguyễn Hữu Thọ, P. Tân Hưng, Q7, TPHCM ',
      gender: 1,
      typeRole: 'ROLE',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
