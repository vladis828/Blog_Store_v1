const Sequelize = require('sequelize');
const db = require('./database');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  pictures: {
    type: Sequelize.STRING
  },
  recipe: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER
  },
  type: {
    type: Sequelize.STRING,
    validate: {
      isIN: [['Breakfast', 'Main', 'Dessert']]
    }
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Product;
