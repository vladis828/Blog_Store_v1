const Sequelize = require('sequelize');
const db = require('./database');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING
  },
  pictures: {
    type: Sequelize.STRING
  },
  recipe: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  type: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  }
})

module.exports = Product;
