const Bag = require('./Bag');
const Pic = require('./Pic');
const Product = require('./Product');
const User = require('./User');


Product.hasMany(Pic);
Pic.belongsTo(Product);

User.hasMany(Bag);
Bag.belongsTo(User)

Bag.belongsTo(Product)

module.exports = {
  User,
  Bag,
  Product,
  Pic
}

