const Sequelize = require('sequelize');
const db = require('../database');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNunll: false,
    validate: {
      isEmail: true,
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

module.exports = User;

