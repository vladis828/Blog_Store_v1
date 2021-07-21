const Sequelize = require('sequelize');

/** process.env.DATABASE_URL => Heroku Database Adress*/

/**
 * !!!! Change 'yourdbname' to the actual db name !!!!
 */

const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/blog_store', {
  logging: false, // unless you like the logs
  // ...and there are many other options you may want to play with
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    }
  }
});

module.exports = db;
