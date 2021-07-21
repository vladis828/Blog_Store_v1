const Sequelize = require('sequelize');

/** process.env.DATABASE_URL => Heroku Database Adress*/

/**
 * !!!! Change 'yourdbname' to the actual db name !!!!
 */
let db;
if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL, {
    logging: false, // unless you like the logs
    // ...and there are many other options you may want to play with
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // <<<<<<< YOU NEED THIS TO AVOID SequelizeConnectionError: self signed certificate
      }
    }
  })
} else {
  db = new Sequelize('postgres://localhost:5432/blog_store', {
    logging: false
  })
};

module.exports = db;
