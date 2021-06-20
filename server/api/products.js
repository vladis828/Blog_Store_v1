const router = require('express').Router();
const { Product, Pic } = require('../db/models');


router.get('/', (req, res) => {
  Product.findAll({
    include: [Pic]
  })
    .then(products => {
      res.json(products)
    })
    .catch(err => console.log("Error:" + err))
}
);


module.exports = router;
