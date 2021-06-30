const { SequelizeScopeError } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../database');

const Bag = db.define('bags', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  productId: {
    type: Sequelize.INTEGER
  },
  productName: {
    type: Sequelize.STRING
  },
  productPrice: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  paid: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = Bag;
