const Sequelize = require('sequelize');
const db = require('./database');

const Cart = db.define('cart', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER
  }
})

module.exports = Cart;
